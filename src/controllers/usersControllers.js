const usersModel = require("../models/Users.js")
const {hash, compare} = require("bcrypt")
const usersDisciplinasModel = require("../models/UsersDisciplinas.js")
const AppError = require("../utils/appError.js")
const respostasModel = require("../models/Repostas.js")
const disciplinasModel = require("../models/Disciplinas.js")

const validator = require('validator');

const ERROR_CODES = require("../utils/errorCodes.js")
const USER_ERROR =  ERROR_CODES.USER_ERROR

class usersController {
    async create(req, res){
            const {nome, email, senha, matricula, tipo} = req.body

            // verifica se o usuario que esta tentando criar é um admin
            const userId = req.userId
            const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
            if(verifyIfIsAdmin.tipo !== 'admin'){
                // return res.status(401).json({msg: "O usuario não é admin"})
                throw new AppError(USER_ERROR.NOT_ADMIN)
            } 

            const senhaCriptografada = await hash(senha, 8)

            if(matricula.length !== 8){
                throw new AppError(USER_ERROR.INVALID_MATRICULA)
            }
             // Verifica se a matrícula contém apenas números
            const matriculaNumerica = /^\d+$/
            if (!matriculaNumerica.test(matricula)) {
                throw new AppError(USER_ERROR.INVALID_MATRICULA)}
                
            if (!validator.isEmail(email)) {
                throw new AppError(USER_ERROR.INVALID_EMAIL);
            }

            const user = {
                nome : nome,
                email : email,
                senha : senhaCriptografada,
                tipo: tipo,
                matricula: matricula
            }

            //valida se o campo nome contém somente letras e espaços em branco
            const regexDoNome = /^[\p{L}\s]{7,}$/u
            if (!regexDoNome.test(nome)) {
                // return res.status(400).json({msg: "O campo nome deve conter apenas letras"})
                throw new AppError(USER_ERROR.INVALID_NAME)
            }

            const newUser = await usersModel.create(user)
        
            res.status(201).json({newUser, msg: "Usuário criado com sucesso"})
            
    }

    async getAll(req, res){

        const users = await usersModel.find()
        res.status(201).json({users, msg: "Todos os usuários"})

    }


    async get(req, res){
        const id = req.params.id

        const user = await usersModel.findById({_id: id}, "nome matricula email tipo")

        if (!user){
            throw new AppError(USER_ERROR.DOESNT_EXIST)
        }

        res.status(201).json({user, msg: "Usuário único"}) 
    }

    async delete(req, res){

        const id = req.params.id

        const userId = req.userId
        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        if(verifyIfIsAdmin.tipo !== 'admin'){
            // return res.status(401).json({msg: "O usuario não é admin"})
            throw new AppError(USER_ERROR.NOT_ADMIN)
        } 

        const user = await usersModel.findById(id)

        if (!user){
            // return res.status(404).json({msg: "Usuário não encontrado"})
            throw new AppError(USER_ERROR.DOESNT_EXIST)
        }

        if(user.tipo === "professor"){
            await disciplinasModel.updateMany({prof_id: id}, { $set: { prof_id: null } })
        }
        if(user.tipo === "aluno"){
            await usersDisciplinasModel.deleteMany({ aluno_id: id });
    
            await respostasModel.deleteMany({ aluno_id: id });
        }

        const deletedUser = await usersModel.findOneAndDelete({_id: id})

        res.status(200).json({deletedUser, msg: "Usuario deletado com sucesso"})

    }

    async update(req, res){

        const id = req.params.id
        const {nome, email, senha, senhaAntiga} = req.body

        if(senha && !senhaAntiga){
            // return res.status(400).json({msg: "Voce precisa informar a senha antiga"})
            throw new AppError(USER_ERROR.MISSING_OLD_PASSWORD)
        }

        // valida se o usuario sabe a senha antiga para atualizar os dados
        const atualUser = await usersModel.findById(id)
        const senhaValida = await compare(senhaAntiga, atualUser.senha)
        
        if (!senhaValida){
            // return res.status(400).json({msg: "A senha antiga não esta correta"})
            throw new AppError(USER_ERROR.INVALID_OLD_PASSWORD)
        }

        const senhaCriptografada = hash(senha, 8)

        const user = {
            nome : nome,
            email : email,
            senha : senhaCriptografada,
        }

        const updatedUser = await usersModel.findByIdAndUpdate(id, user)

        if (!updatedUser) {
            // return res.status(404).json({msg: "Usuário não encontrado"})
            throw new AppError(USER_ERROR.DOESNT_EXIST)
            
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})
    }


    async admUpdate(req, res){

        const id = req.params.id
        const {nome, email, matricula} = req.body

        const user = {
            nome : nome,
            email : email,
            matricula: matricula
        }

        const updatedUser = await usersModel.findByIdAndUpdate(id, user)

        if (!updatedUser) {
            // return res.status(404).json({msg: "Usuário não encontrado"})
            throw new AppError(USER_ERROR.DOESNT_EXIST)
            
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})
    }


    async getAllProfessor(req, res){

        const professores = await usersModel.find({ tipo: "professor" }, "nome matricula")
        res.status(201).json({professores, msg: "Lista de todos os professores"})

    }

    async getAllStudents(req, res){

        const alunos = await usersModel.find({ tipo: "aluno" }, "nome matricula")
        res.status(201).json({alunos, msg: "Lista de todos os alunos"})

    }
}

module.exports = usersController