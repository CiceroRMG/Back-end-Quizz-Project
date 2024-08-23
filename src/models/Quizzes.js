const mongoose = require("mongoose")

const { Schema } = mongoose

const quizzesSchema = new Schema({
    titulo:{
        type: String,
        required: true
    },
    tempo:{
        type: Number,
        required: true,
        min: 30,
        max: 240
    },
    tentativas:{
        type: Number,
        required: true,
        min: 1,
    },
    disciplina_id:{
        type: Schema.Types.ObjectId,
        ref: 'Disciplinas',
        required: true
    },
    data_inicio:{
        type: String,
        required: true
    },
    data_fim:{
        type: String,
        required: true
    },
    mensagem:{
        type: String,
        default: null
    },
    tipo:{
        type: String,
        required: true,
        enum: ['exercicio', 'prova']
    },
    rascunho: {
        type: Boolean,
        required: true
    },
    perguntas:[{
        titulo: {
            type: String,
            required: true
        },
        alternativas: [{
            conteudo : {
                type: String,
                required: true
            },
            correta : {
                type: Boolean,
                required: true
            }
        }]
    }]
}, {timestamps: true})

const Quizzes = mongoose.model("Quizzes", quizzesSchema)

module.exports = Quizzes