const disciplinasModel = require("../models/Disciplinas.js")

class disciplinasController {
    async create(req, res){
        try {
            const {nome, ano, semestre, prof_id} = req.body

            const disciplina = {
                nome : nome,
                ano : ano,
                semestre : semestre,
                prof_id: prof_id
            }
            
            const response = await disciplinasModel.create(disciplina)
        
            res.status(201).json({response, msg: "Disciplina criada com sucesso"}) 
        } catch (error) {

            console.log(error)

        }
    }

    async getAll(req, res){
        try {

            const disciplinas = await disciplinasModel.find()
            res.status(201).json({disciplinas, msg: "Mostrei todas disciplinas"})

        } catch (error) {

            console.log(error)

        }
    }


    async get(req, res){
        try {
            const id = req.params.id

            const disciplina = await disciplinasModel.findById(id)

            if (!disciplina){
                return res.status(404).json({msg: "Disciplina não encontrada"})
            }

            res.status(201).json({users, msg: "Mostrei um"})

        } catch (error) {

            console.log(error)

        }
    }

    async delete(req, res){
        try {
            const id = req.params.id

            const disciplina = await disciplinasModel.findById(id)

            if (!disciplina){
                return res.status(404).json({msg: "Disciplina não encontrada"})
            }

            const deletedDisciplina = await disciplinasModel.findOneAndDelete(id)

            res.status(200).json({deletedDisciplina, msg: "Usuario deletado com sucesso"})

        } catch (error) {

            console.log(error)

        }
    }

    async update(req, res){
        const id = req.params.id

        const {nome, ano, semestre, prof_id} = req.body

        const disciplina = {
            nome : nome,
            ano : ano,
            semestre : semestre,
            prof_id: prof_id
        }

        const updatedDisciplina = await disciplinasModel.findByIdAndUpdate(id, disciplina)

        if (!updatedDisciplina) {
            res.status(404).json({msg: "Disciplina não encontrada"})
            return
        }

        res.status(200).json({disciplina, msg: "Disciplina atualizada com sucesso"})
    }
}

module.exports = disciplinasController