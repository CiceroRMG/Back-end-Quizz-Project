const usersModel = require("../models/Users.js")
const refreshTokenModels = require("../models/RefreshToken.js")

const jwt = require("jsonwebtoken")
const SECRET = "pode_ser_qualquer_coisa"
const refreshSECRET = "essa_e_a_secret_do_refresh_token"


class refreshTokenController {
    async newToken(req, res) {
        const { refreshToken } = req.body

        const refreshTokenInDb = await refreshTokenModels.findOne({token: refreshToken})
        if(!refreshTokenInDb){
            return res.status(404).json({msg: "O refresh token não foi encontrado no banco"})
        }

        const userId = req.userId
        const usuario = await usersModel.findOne({_id: userId})

        if(!usuario){
           return res.status(404).json({msg: "Token não esta atribuido a um usuario"})
        }

        const newtoken = jwt.sign({userId: usuario._id}, SECRET, { expiresIn: '1m' })
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