const quizzesModel = require("../models/Quizzes.js")
const disciplinasModel = require("../models/Disciplinas.js")
const usersModel = require("../models/Users.js")


const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const USER_ERROR =  ERROR_CODES.USER_ERROR
const DISCIPLINA_ERROR = ERROR_CODES.DISCIPLINA_ERROR
const QUIZZ_ERROR = ERROR_CODES.QUIZZ_ERROR

class quizzesController {
    async create(req, res){

        // verifica se o usuario que esta tentando criar é um admin ou um professor
        const userId = req.userId
        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        
        if(verifyIfIsAdmin.tipo !== 'admin' && verifyIfIsAdmin.tipo !== 'professor'){
            throw new AppError(USER_ERROR.NOT_PROFESSOR)
        } 

        const {titulo, tempo, tentativas, disciplina_id, data_inicio, data_fim, mensagem, tipo, perguntas} = req.body

        const disciplina = await disciplinasModel.findById(disciplina_id)
        // validando a disciplina existe na outra collection
        if (!disciplina){
            // return res.status(404).json({msg: "Esse id de disciplina não foi encontrado"})
            throw new AppError(DISCIPLINA_ERROR.DOESNT_EXIST)
        }

        const quizz = {
            titulo : titulo,
            tempo : tempo,
            tentativas : tentativas,
            disciplina_id: disciplina_id,
            data_inicio: data_inicio,
            data_fim: data_fim,
            mensagem: mensagem,
            tipo: tipo,
            perguntas: perguntas
        }

        const response = await quizzesModel.create(quizz)

        // colocando os quizzes recem criados dentro da disciplina correspondente
        const quizzId = response._id

        // Verificando se o quizz foi criado com sucesso e possui um _id
        if (!response || !response._id) {
            console.log("Quizz criado, mas sem _id.");
            // return res.status(500).json({msg: "Erro ao criar o quizz, ID não encontrado."});
            throw new AppError(QUIZZ_ERROR.CREATE_ERROR)
        }

        await disciplinasModel.findByIdAndUpdate(disciplina_id, {
            $push: {
                quizes: {
                    quizz_id: quizzId,
                    nome: titulo
                }
            }
        })

        res.status(201).json({quizz, msg: "Quizz criado com sucesso"}) 

    }

    async getAll(req, res){

        const quizzes = await quizzesModel.find()
        res.status(201).json({quizzes, msg: "Mostrando todos os Quizzes"})

    }


    async get(req, res){

        const id = req.params.id

        const quizz = await quizzesModel.findOne({_id: id})

        // se o id não for de um quizz, vai verificar se é de uma disciplina, o nome duplicado(quizz) é só pra não bugar a req do front
        if (!quizz){
            const quizz = await quizzesModel.find({disciplina_id: id})
            if(!quizz){
                // return res.status(404).json({msg: "Quizz e Disciplina não encontrados"})
                throw new AppError(QUIZZ_ERROR.DOESNT_EXIST)
            }
            return res.status(201).json({quizz, msg: "Mostrando os quizzes da disciplina"})
        }

        res.status(201).json({quizz, msg: "Mostrando um quizz"})

    }

    async delete(req, res){

        const id = req.params.id

        const quizz = await quizzesModel.findById(id)

        if (!quizz){
            // return res.status(404).json({msg: "Quizz não encontrado"})
            throw new AppError(QUIZZ_ERROR.DOESNT_EXIST)
        }

        const deletedQuizz= await quizzesModel.findOneAndDelete(id)

        res.status(200).json({deletedQuizz, msg: "Quizz deletado com sucesso"})

    }

    async update(req, res){
        const id = req.params.id
        
        const userId = req.userId
        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        
        if(verifyIfIsAdmin.tipo !== 'admin' && verifyIfIsAdmin.tipo !== 'professor'){
            throw new AppError(USER_ERROR.NOT_PROFESSOR)
        } 

        const {titulo, tempo, tentativas, data_inicio, data_fim, mensagem, tipo, perguntas} = req.body

        const quizz = {
            titulo : titulo,
            tempo : tempo,
            tentativas : tentativas,
            data_inicio: data_inicio,
            data_fim: data_fim,
            mensagem: mensagem,
            tipo: tipo,
            perguntas: perguntas
        }

        const updatedQuizz = await quizzesModel.findByIdAndUpdate(id, quizz)

        if (!updatedQuizz) {
            // res.status(404).json({msg: "Quizz não encontrado"})
            throw new AppError(QUIZZ_ERROR.DOESNT_EXIST)
        }

        res.status(200).json({quizz, msg: "Quizz atualizado com sucesso"})
    }
}

module.exports = quizzesController