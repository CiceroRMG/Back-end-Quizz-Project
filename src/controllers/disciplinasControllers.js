const disciplinasModel = require("../models/Disciplinas.js")
const usersModel = require("../models/Users.js")
const quizzesModel = require("../models/Quizzes")
const usersDisciplinasModel = require("../models/UsersDisciplinas.js")
class disciplinasController {
    async create(req, res){
        try {
            const {nome, ano, semestre, prof_id} = req.body

            const userId = req.userId
            const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
            if(verifyIfIsAdmin.tipo !== 'admin'){
                return res.status(401).json({msg: "O usuario não é admin"})
            } 

            const disciplina = {
                nome : nome,
                ano : ano,
                semestre : semestre,
                prof_id: prof_id
            }

            const response = await disciplinasModel.create(disciplina)
        
            res.status(201).json({response, msg: "Disciplina criada com sucesso"}) 
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({msg: "Dados duplicados. Esta disciplina já existe."});
            } else {
                console.log(error);
                return res.status(500).json({msg: "Erro ao criar disciplina"});
            }
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

            res.status(201).json({disciplina, msg: "Mostrei uma"})

        } catch (error) {

            console.log(error)

        }
    }

    async getProfessor(req, res){
        try {
            const id = req.params.id

            const disciplinas = await disciplinasModel.find({prof_id: id})

            if (!disciplinas || disciplinas === 0){
                return res.status(404).json({msg: "Esse professor não possui disciplinas"})
            }

            res.status(201).json({disciplinas, msg: "Disciplinas do Professor"})

        } catch (error) {

            console.log(error)

        }
    }

    async getSubjectProfessorAndQuizzes(req, res){
        try {

            const disciplinas = await disciplinasModel.find().populate('prof_id', 'nome')

            if (!disciplinas || disciplinas.length === 0){
                return res.status(404).json({msg: "Esse professor não possui disciplinas"})
            }

            res.status(201).json({disciplinas, msg: "Disciplinas do Professor"})

        } catch (error) {

            console.log("caiu no erro do populate disciplinas", error)

        }
    }

    async delete(req, res){
        try {
            const id = req.params.id
            
            const userId = req.userId
            const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
            if(verifyIfIsAdmin.tipo !== 'admin'){
                return res.status(401).json({msg: "O usuario não é admin"})
            } 

            const disciplina = await disciplinasModel.findById(id)

            if (!disciplina){
                return res.status(404).json({msg: "Disciplina não encontrada"})
            }

            const deletedDisciplina = await disciplinasModel.findOneAndDelete({_id: id})

            // Deletar quizzes relacionados com a disciplina
            await quizzesModel.deleteMany({ disciplina_id: id });

            // Deletar relações em usersDisciplinas com a disciplina
            await usersDisciplinasModel.deleteMany({ disciplina_id: id });

            res.status(200).json({deletedDisciplina, msg: "Disciplina deletada com sucesso"})

        } catch (error) {

            console.log(error)

        }
    }

    async update(req, res){
        const id = req.params.id
        const userId = req.userId

        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        if(verifyIfIsAdmin.tipo !== 'admin'){
            return res.status(401).json({msg: "O usuario não é admin"})
        } 

        const {nome, ano, semestre, prof_id} = req.body

        const disciplina = {
            nome : nome,
            ano : ano,
            semestre : semestre,
            prof_id: prof_id === '' ? null : prof_id
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