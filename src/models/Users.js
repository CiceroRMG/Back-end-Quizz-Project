const mongoose = require("mongoose")

const { Schema } = mongoose

const usersSchema = new Schema({
    nome:{
        type: String,
        required: true
    },
    matricula:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    tipo:{
        type: String,
        required: true,
        enum: ['admin', 'professor', 'aluno']
    }
}, {timestamps: true})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users