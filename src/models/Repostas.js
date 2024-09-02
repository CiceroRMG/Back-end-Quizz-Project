
const mongoose = require("mongoose")

const { Schema } = mongoose

const RespostasSchema = new Schema({
    quiz_id: {
        type: Schema.Types.ObjectId,
        ref: 'Quizzes',
        required: true
    },
    aluno_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    nota: {
        type: Number,
        default: null
    },
    tempo: {
        type: Number,
        required: true
    },
    respostas: [{
        pergunta_id: {
            type: Schema.Types.ObjectId,
            ref: 'Quizzes.perguntas',
            required: true
        },
        alternativa_id: {
            type: Schema.Types.ObjectId,
            ref: 'Quizzes.perguntas.alternativas',
            required: true
        }
    }]
});

const Repostas = mongoose.model("Repostas", RespostasSchema)

module.exports = Repostas