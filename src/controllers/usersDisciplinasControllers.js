const usersDisciplinasModel = require("../models/UsersDisciplinas.js")
const usersModel = require("../models/Users.js")
const disciplinasModel = require("../models/Disciplinas.js")

const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const USER_ERROR =  ERROR_CODES.USER_ERROR
const RELATION_ERROR = ERROR_CODES.RELATION_ERROR

class usersDisciplinasController {
    async create(req, res){

        const { aluno_id, disciplina_id } = req.body

        const aluno = await usersModel.findById(aluno_id)

        const disciplina = await disciplinasModel.findById(disciplina_id)
        
        // validando se aluno e disciplina existem nas outras collections
        if (!aluno || !disciplina){
            // return res.status(404).json({msg: "Aluno ou Disciplina não encontrados"})
            throw new AppError(RELATION_ERROR.DOESNT_EXIST)
        }
        // validando se o usuario é do tipo aluno
        if (aluno.tipo !== "aluno"){
            // return res.status(404).json({msg: "Esse usuário não é aluno"})
            throw new AppError(USER_ERROR.NOT_STUDENT)
        }
        
        // validando se o aluno com a disciplina ja não foram cadastrados na collection
        const procurandoSeJaExiste = await usersDisciplinasModel.find({
            $and: [
                { aluno_id: aluno_id },
                { disciplina_id: disciplina_id }
            ]
        })

        if (procurandoSeJaExiste && procurandoSeJaExiste.length !== 0){
            // return res.status(404).json({msg: "Aluno com disciplina ja estão cadastrados"})
            throw new AppError(RELATION_ERROR.ALREADY_EXIST)
        }

        const disciplinaAluno = {
            aluno_id : aluno_id,
            disciplina_id : disciplina_id,
        }

        const response = await usersDisciplinasModel.create(disciplinaAluno)
    
        res.status(201).json({response, msg: "Aluno com Disciplina criado com sucesso"}) 

    }

    async getAll(req, res){

        const alunosDisciplinas = await usersDisciplinasModel.find()
        res.status(201).json({alunosDisciplinas, msg: "Mostrando todos alunos com disciplinas"})

    }


    async get(req, res){

        const parametro = req.params.id

        //verifica se o parametro é igual a algum dos ids da linha, se for retorna todas linhas que contem aquele id
        const alunoDisciplina = await usersDisciplinasModel.find({
            $or: [
                { _id: parametro },
                { aluno_id: parametro },
                { disciplina_id: parametro }
            ]
        }).populate('disciplina_id', 'nome ano semestre')

        // verifica se retorna um null ou um array vazio
        if (!alunoDisciplina){
            return res.status(201).json({alunoDisciplina: []})
        }

        //tem que fazer uma verificação pra ver se o id esta atribuido a alguma coisa

        res.status(201).json({alunoDisciplina, msg: "Mostrando os que tem o id igual ao parametro"})
    }

    async checkUserInDiscipline(req, res){

        const { userId, subjectId } = req.params

        // Verifica se existe um documento com o aluno_id igual ao userId e o disciplina_id igual ao disciplinaId
        const userInDiscipline = await usersDisciplinasModel.findOne({ aluno_id: userId, disciplina_id: subjectId })

        if (!userInDiscipline){
            // return res.status(404).json({erro: "Esse usuário não está vinculado a essa disciplina"})
            throw new AppError(RELATION_ERROR.DOESNT_EXIST_RELATION)
        }

        res.status(200).json({msg: "O usuário está vinculado a essa disciplina"})
    
    }

    async deleteByUserId(req, res){
        // essa aqui não ta fazendo muito sentido, rever depois
        const id = req.params.id

        const userDisciplina = await usersDisciplinasModel.find({aluno_id: id})

        if (!userDisciplina || userDisciplina.length === 0){
            // return res.status(404).json({msg: "Disciplina com aluno não encontrado"})
            throw new AppError(RELATION_ERROR.DOESNT_EXIST_RELATION)
        }

        const deletedUserDisciplina = await usersDisciplinasModel.deleteMany({aluno_id: id})

        res.status(200).json({deletedUserDisciplina, msg: "Disciplina com aluno deletados com sucesso"})

    }
}

module.exports = usersDisciplinasController