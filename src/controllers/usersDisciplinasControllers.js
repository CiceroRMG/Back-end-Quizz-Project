const usersDisciplinasModel = require("../models/UsersDisciplinas.js")
const usersModel = require("../models/Users.js")
const disciplinasModel = require("../models/Disciplinas.js")

class usersDisciplinasController {
    async create(req, res){
        try {
            const { aluno_id, disciplina_id } = req.body

            const aluno = await usersModel.findById(aluno_id)

            const disciplina = await disciplinasModel.findById(disciplina_id)
            
            // validando se aluno e disciplina existem nas outras collections
            if (!aluno || !disciplina){
                return res.status(404).json({msg: "Aluno ou Disciplina não encontrados"})
            }
            // validando se o usuario é do tipo aluno
            if (aluno.tipo !== "aluno"){
                return res.status(404).json({msg: "Esse usuário não é aluno"})
            }
            
            // validando se o aluno com a disciplina ja não foram cadastrados na collection
            const procurandoSeJaExiste = await usersDisciplinasModel.find({
                $and: [
                    { aluno_id: aluno_id },
                    { disciplina_id: disciplina_id }
                ]
            })

            if (procurandoSeJaExiste && procurandoSeJaExiste.length !== 0){
                return res.status(404).json({msg: "Aluno com disciplina ja estão cadastrados"})
            }

            const disciplinaAluno = {
                aluno_id : aluno_id,
                disciplina_id : disciplina_id,
            }

            const response = await usersDisciplinasModel.create(disciplinaAluno)
        
            res.status(201).json({response, msg: "Aluno com Disciplina criado com sucesso"}) 
        } catch (error) {

            console.log(error)

        }
    }

    async getAll(req, res){
        try {

            const alunosDisciplinas = await usersDisciplinasModel.find()
            res.status(201).json({alunosDisciplinas, msg: "Mostrando todos alunos com disciplinas"})

        } catch (error) {

            console.log(error)

        }
    }


    async get(req, res){
        try {
            const parametro = req.params.id

            //verifica se o parametro é igual a algum dos ids da linha, se for retorna todas linhas que contem aquele id
            const procurandoSeExiste = await usersDisciplinasModel.find({
                $or: [
                    { _id: parametro },
                    { aluno_id: parametro },
                    { disciplina_id: parametro }
                ]
            })

            // verifica se retorna um null ou um array vazio
            if (!procurandoSeExiste || procurandoSeExiste.length === 0){
                return res.status(404).json({msg: "Esse id não esta vinculado a nenhum aluno e nenhuma disciplina"})
            }

            res.status(201).json({procurandoSeExiste, msg: "Mostrando os que tem o id igual ao parametro"})

        } catch (error) {

            console.log(error)

        }
    }

    async delete(req, res){
        try {
            const id = req.params.id

            const userDisciplina = await usersDisciplinasModel.findById(id)

            if (!userDisciplina){
                return res.status(404).json({msg: "Disciplina com aluno não encontrado"})
            }

            const deletedUserDisciplina = await usersDisciplinasModel.findOneAndDelete(id)

            res.status(200).json({deletedUserDisciplina, msg: "Disciplina com aluno com sucesso"})

        } catch (error) {

            console.log(error)

        }
    }
}

module.exports = usersDisciplinasController