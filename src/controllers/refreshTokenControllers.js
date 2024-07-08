const usersModel = require("../models/Users.js")
const refreshTokenModels = require("../models/RefreshToken.js")

const jwt = require("jsonwebtoken")
const SECRET = "pode_ser_qualquer_coisa"
const refreshSECRET = "essa_e_a_secret_do_refresh_token"

const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const REFRESH_TOKEN_ERROR = ERROR_CODES.REFRESH_TOKEN_ERROR

class refreshTokenController {
    async newToken(req, res) {

        const { refreshToken } = req.body

        const refreshTokenInDb = await refreshTokenModels.findOne({token: refreshToken})
        if(!refreshTokenInDb){
            // return res.status(404).json({msg: "O refresh token não foi encontrado no banco"})
            throw new AppError(REFRESH_TOKEN_ERROR.DOESNT_EXIST)
        }

        const userId = req.userId
        const usuario = await usersModel.findOne({_id: userId})

        if(!usuario){
            // return res.status(404).json({msg: "REFRESHToken não esta atribuido a um usuario"})
            throw new AppError(REFRESH_TOKEN_ERROR.DOESNT_EXIST)
        }

        const newtoken = jwt.sign({userId: usuario._id}, SECRET, { expiresIn: '10m' })
        const newRefreshToken = jwt.sign({userId: usuario._id}, refreshSECRET, { expiresIn: '7d' })

        const newRefreshTokenDb = {
            user_id: usuario._id,
            token: newRefreshToken
        }
        await refreshTokenModels.create(newRefreshTokenDb)

        await refreshTokenModels.findOneAndDelete({token: refreshToken})

        res.json({ newtoken, newRefreshToken })

    }

    async delete(req, res){

        const { refreshToken } = req.body
        await refreshTokenModels.findOneAndDelete({token: refreshToken})

        res.status(201).json({msg: "refreshToken deletado com sucesso"})
            
    }

}

module.exports = refreshTokenController