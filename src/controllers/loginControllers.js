const usersModel = require("../models/Users.js")
const refreshTokenModels = require("../models/RefreshToken.js")
const { compare } = require("bcrypt")

const jwt = require("jsonwebtoken")
const SECRET = "pode_ser_qualquer_coisa"
const refreshSECRET = "essa_e_a_secret_do_refresh_token"

const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const USER_ERROR =  ERROR_CODES.USER_ERROR

class loginController {
    async authentication(req, res) {

        const { matricula, email, senha } = req.body

        let usuario;

        if(email){
            usuario = await usersModel.findOne({email: email})
        }

        if(matricula){
            usuario = await usersModel.findOne({matricula: matricula})
        }

        if(!usuario){
            // return res.status(401).json({msg: "Login inválido"})
            throw new AppError(USER_ERROR.INVALID_LOGIN)
        }

        const senhaValida = await compare(senha, usuario.senha)

        if(!senhaValida){
            // return res.status(401).json({msg: "Senha inválida"})
            throw new AppError(USER_ERROR.INVALID_LOGIN)
        }

        // gerando um token -> (payload, secret, options)
        const token = jwt.sign({userId: usuario._id}, SECRET, { expiresIn: '10m' })
        const refreshToken = jwt.sign({userId: usuario._id}, refreshSECRET, { expiresIn: '7d' })
        

        const refreshTokenDb = {
            user_id: usuario._id,
            token: refreshToken,
        }
        await refreshTokenModels.create(refreshTokenDb)


        res.json({ token, refreshToken, userId: usuario._id, tipo: usuario.tipo })

    }
}

module.exports = loginController