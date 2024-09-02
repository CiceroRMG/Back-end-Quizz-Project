const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const repostasModel = require("../models/Repostas.js")

require('dotenv').config()

class respostas {
    async create(req, res){

        const { quiz_id, tempo, repostas } = req.body

        const userId = req.userId

        const disciplina = {
            quiz_id : quiz_id,
            aluno_id : userId,
            tempo : tempo,
            repostas: repostas
        }

        const respostas = await repostasModel.create(disciplina)
    
        res.status(201).json({respostas}) 

    }

}

module.exports = respostas