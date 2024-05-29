const mongoose = require('mongoose')


const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const usersDisciplinasSchema = new Schema ({
    aluno_id : {
        type: ObjectId,
        ref: 'Users'
    },
    disciplina_id : {
        type: ObjectId,
        ref: 'Disciplinas'
    }
})

const UsersDisciplinas = mongoose.model('UsersDisciplinas', usersDisciplinasSchema)

module.exports = UsersDisciplinas