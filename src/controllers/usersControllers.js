const usersModel = require("../models/Users.js")
const {hash} = require("bcrypt")

class usersController {
    async create(req, res){
        try {
            const {nome, email, senha, matricula, tipo} = req.body

            const senhaCriptografada = await hash(senha, 8)

            const user = {
                nome : nome,
                email : email,
                senha : senhaCriptografada,
                tipo: tipo,
                matricula: matricula
            }

            //valida se o campo nome contém somente letras e espaços em branco
            const regexDoNome = /^[A-Za-z\s]+$/
            if (!regexDoNome.test(nome)) {
                return res.status(400).json({msg: "O campo nome deve conter apenas letras"})
            }

            const userCreate = await usersModel.create(user)
        
            res.status(201).json({userCreate, msg: "Usuário criado com sucesso"})
            
            
        } catch (error) {
            // erro caso o email ou a matrícula ja tenham sido usados
            // error code 11000 é o erro do mongoose quando a chave é definida como única e tentam cadastrar a mesma chave
            if (error.code === 11000){
                const chaveDuplicada = Object.keys(error.keyValue)[0]
                return res.status(400).json({msg:`${chaveDuplicada} ja esta em uso`})
            }
            console.log(error)

        }
    }

    async getAll(req, res){
        try {

            const users = await usersModel.find()
            res.status(201).json({users, msg: "Mostrei tudo"})

        } catch (error) {

            console.log(error)

        }
    }


    async get(req, res){
        try {
            const id = req.params.id

            const user = await usersModel.findById(id)

            if (!user){
                return res.status(404).json({msg: "Usuário não encontrado"})
            }

            res.status(201).json({user, msg: "Mostrei um"})

        } catch (error) {

            console.log(error)

        }
    }

    async delete(req, res){
        try {
            const id = req.params.id

            const user = await usersModel.findById(id)

            if (!user){
                return res.status(404).json({msg: "Usuário não encontrado"})
            }

            const deletedUser = await usersModel.findOneAndDelete(id)

            res.status(200).json({deletedUser, msg: "Usuario deletado com sucesso"})

        } catch (error) {

            console.log(error)

        }
    }

    async update(req, res){
        const id = req.params.id

        const {nome, email, senha, senhaAntiga} = req.body

        const user = {
            nome : nome,
            email : email,
            senha : senha,
        }

        // valida se o usuario sabe a senha antiga para atualizar os dados
        const atualUser = await usersModel.findById(id)
        if (atualUser.senha !== senhaAntiga){
            return res.status(400).json({msg: "A senha antiga não esta correta"})
        }

        const updatedUser = await usersModel.findByIdAndUpdate(id, user)

        if (!updatedUser) {
            res.status(404).json({msg: "Usuário não encontrado"})
            return
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})
    }
}

module.exports = usersController