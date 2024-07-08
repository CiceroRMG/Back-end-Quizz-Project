const usersModel = require("../models/Users.js")

const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const TOKEN_ERROR = ERROR_CODES.TOKEN_ERROR

class userTokenController {
    async get(req, res) {

        const userId = req.userId

        const usuario = await usersModel.findOne({_id: userId})

        if(!usuario){
            // return res.status(400).json({msg: "Token não esta atribuido a um usuario"})
            throw new AppError(TOKEN_ERROR.DOESNT_EXIST)
        }

        res.json({ usuario })

    }

    async getType(req, res) {

        const userId = req.userId

        const usuario = await usersModel.findOne({_id: userId})

        if(!usuario){
            // return res.status(401).json({msg: "Token não esta atribuido a um usuario"})
            throw new AppError(TOKEN_ERROR.DOESNT_EXIST)
        }

        res.json({ usuario: usuario.tipo })

    }

}

module.exports = userTokenController