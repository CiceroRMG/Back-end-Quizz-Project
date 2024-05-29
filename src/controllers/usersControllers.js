const usersModel = require("../models/Users.js")

class usersController {
    async create(req, res){
        try {
            const {nome, email, senha, matricula, tipo} = req.body

            const user = {
                nome : nome,
                email : email,
                senha : senha,
                tipo: tipo,
                matricula: matricula
            }
            
            const response = await usersModel.create(user)
        
            res.status(201).json({response, msg: "Serviço criado com sucesso"}) 
        } catch (error) {

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

            res.status(201).json({users, msg: "Mostrei um"})

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

        const {nome, email, senha, matricula, tipo} = req.body

        const user = {
            nome : nome,
            email : email,
            senha : senha,
            tipo: tipo,
            matricula: matricula
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