const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const repostasModel = require("../models/Repostas.js")
const quizModel = require("../models/Quizzes.js")

const { ObjectId } = require('mongodb');

require('dotenv').config()

class respostas {
    async create(req, res){

        const { quiz_id, respostas } = req.body

        const userId = req.userId

        const disciplina = {
            quiz_id : quiz_id,
            aluno_id : userId,
            respostas: respostas ? respostas : null
        }
        
        const quiz = await quizModel.findById(quiz_id)
        const quizAttempts = quiz.tentativas

        const attempts = await repostasModel.find({quiz_id: quiz_id, aluno_id: userId})
        const userAttempts = attempts.length

        if(userAttempts >= quizAttempts){
            console.log('entrou no maximo de tentativas');
            throw new AppError(ERROR_CODES.AWNSERS_ERROR.EXCEEDED_ATTEMPTS)
        }

        const respostasRes = await repostasModel.create(disciplina)

        // calculando a nota
        const correctAnswers = {};
        quiz.perguntas.forEach(pergunta => {
            const correctOption = pergunta.alternativas.find(alternativa => alternativa.correta);
            if (correctOption) {
                correctAnswers[pergunta._id] = correctOption._id;
            }
        });
    
        const respostasAluno = respostasRes.respostas
        let correctCount = 0;
        respostasAluno.forEach(resposta => {
            const correct = correctAnswers[resposta.pergunta_id]
            const anwserStudent = resposta.alternativa_id

            if (new ObjectId(correct).equals(new ObjectId(anwserStudent))) {   
                correctCount+= 1;
            }
        });

        const totalQuestions = quiz.perguntas.length;
        const nota = (correctCount / totalQuestions) * 10;
        console.log("nota: " + nota)
        

        respostasRes.nota = nota
        respostasRes.save()
    
        res.status(201).json({respostasRes, msg: "Sucesso na criação das repostas do aluno", respostasAluno}) 

    }

    async getAttempts(req, res){

        const quizId = req.params.id

        const userId = req.userId

        const attempts = await repostasModel.find({quiz_id: quizId, aluno_id: userId})

        if(!attempts){
            throw new AppError(ERROR_CODES.AWNSERS_ERROR.DOESNT_HAVE_ATTEMPTS)
        }
    
        res.status(201).json({attempts: attempts, msg: "Mostrando as tentativas do aluno neste quiz"}) 
    }

    async verifyUserAttempts(req, res){
        const quizId = req.params.id

        const userId = req.userId

        const quiz = await quizModel.findById(quizId)
        const quizAttempts = quiz.tentativas

        const attempts = await repostasModel.find({quiz_id: quizId, aluno_id: userId})
        const userAttempts = attempts.length

        if(userAttempts >= quizAttempts){
            console.log('entrou no maximo de tentativas');
            throw new AppError(ERROR_CODES.AWNSERS_ERROR.EXCEEDED_ATTEMPTS)
        }

        res.status(201).json({msg: "Aluno possui tentativas"}) 
    }

}

module.exports = respostas