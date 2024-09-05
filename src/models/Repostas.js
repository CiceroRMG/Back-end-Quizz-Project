
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
    respostas: [{
        pergunta_id: {
            type: Schema.Types.ObjectId,
            ref: 'Quizzes.perguntas',
            required: true
        },
        alternativa_id: {
            type: Schema.Types.ObjectId,
            ref: 'Quizzes.perguntas.alternativas',
            default: null
        }
    }]
});

const Repostas = mongoose.model("Repostas", RespostasSchema)

module.exports = Repostas