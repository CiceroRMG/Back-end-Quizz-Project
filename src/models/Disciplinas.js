const mongoose = require("mongoose")

const { Schema } = mongoose

const disciplinasSchema = new Schema({
    nome:{
        type: String,
        required: true
    },
    ano:{
        type: Number,
        required: true
    },
    semestre:{
        type: Number,
        required: true
    },
    prof_id:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    quizes: [{
        quizz_id: {
            type: Schema.Types.ObjectId,
            ref: "Quizz",
            default: null
        },
        nome: {
            type: String,
            default: null
        }
    }]
}, {timestamps: true})

// essa linha impede que uma disciplina com o mesmo nome, ano e semestre que outra seja criada
disciplinasSchema.index({ nome: 1, ano: 1, semestre: 1 }, { unique: true });

const Disciplinas = mongoose.model("Disciplinas", disciplinasSchema)

module.exports = Disciplinas