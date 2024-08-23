const disciplinasModel = require("../models/Disciplinas.js")
const usersModel = require("../models/Users.js")
const quizzesModel = require("../models/Quizzes")
const usersDisciplinasModel = require("../models/UsersDisciplinas.js")

const ERROR_CODES = require("../utils/errorCodes.js")
const AppError = require("../utils/appError.js")
const USER_ERROR =  ERROR_CODES.USER_ERROR
const DISCIPLINA_ERROR = ERROR_CODES.DISCIPLINA_ERROR
class disciplinasController {
    async create(req, res){

        const {nome, ano, semestre, prof_id} = req.body

        const userId = req.userId
        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        if(verifyIfIsAdmin.tipo !== 'admin'){
            // return res.status(401).json({msg: "O usuario não é admin"})
            throw new AppError(USER_ERROR.NOT_ADMIN)
        } 

        let disciplina = {}
        if(prof_id){
            disciplina = {
                nome : nome,
                ano : ano,
                semestre : semestre,
                prof_id: prof_id
            }
        } else{
            disciplina = {
                nome : nome,
                ano : ano,
                semestre : semestre,
            }
        }

        const response = await disciplinasModel.create(disciplina)
    
        res.status(201).json({response, msg: "Disciplina criada com sucesso"}) 

    }

    async getAll(req, res){

        const disciplinas = await disciplinasModel.find({}, "nome ano semestre")
        res.status(201).json({disciplinas, msg: "Mostrando todas as disciplinas"})
 
    }

    async get(req, res){

        const id = req.params.id

        const disciplina = await disciplinasModel.findById(id).populate('prof_id', 'nome')

        if (!disciplina){
            // return res.status(404).json({msg: "Disciplina não encontrada"})
            throw new AppError(DISCIPLINA_ERROR.DOESNT_EXIST)
        }

        res.status(201).json({disciplina, msg: "Disciplina única"})

    }

    async getProfessor(req, res){

        const id = req.params.id

        const disciplinas = await disciplinasModel.find({prof_id: id})

        if (!disciplinas || disciplinas === 0){
            // return res.status(404).json({msg: "Esse professor não possui disciplinas"})
            throw new AppError(DISCIPLINA_ERROR.NOT_HAVE)
        }

        res.status(201).json({disciplinas, msg: "Disciplinas do Professor"})
    }

    async getProfessorSubjectsByToken(req, res){

        const id = req.userId

        const disciplinas = await disciplinasModel.find({prof_id: id})

        if (!disciplinas || disciplinas === 0){
            // return res.status(404).json({msg: "Esse professor não possui disciplinas"})
            throw new AppError(DISCIPLINA_ERROR.NOT_HAVE)
        }

        res.status(201).json({disciplinas, msg: "Disciplinas do Professor"})
    }

    async getSubjectProfessorAndQuizzes(req, res){

        const disciplinas = await disciplinasModel.find().populate('prof_id', 'nome')

        if (!disciplinas || disciplinas.length === 0){
            // return res.status(404).json({msg: "Esse professor não possui disciplinas"})
            throw new AppError(DISCIPLINA_ERROR.NOT_HAVE)
        }

        res.status(201).json({disciplinas, msg: "Disciplinas do Professor"})

    }

    async delete(req, res){

        const id = req.params.id
        
        const userId = req.userId
        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        if(verifyIfIsAdmin.tipo !== 'admin'){
            throw new AppError(USER_ERROR.NOT_ADMIN)
        } 

        const disciplina = await disciplinasModel.findById(id)

        if (!disciplina){
            throw new AppError(DISCIPLINA_ERROR.DOESNT_EXIST)
        }

        const deletedDisciplina = await disciplinasModel.findOneAndDelete({_id: id})

        // Deletar quizzes relacionados com a disciplina
        await quizzesModel.deleteMany({ disciplina_id: id });

        // Deletar relações em usersDisciplinas com a disciplina
        await usersDisciplinasModel.deleteMany({ disciplina_id: id });

        res.status(200).json({deletedDisciplina, msg: "Disciplina deletada com sucesso"})

    }

    async turnNullManyProfId(req, res){

        const id = req.params.id

        const user = await usersModel.findById({_id: id})

        if (!user){
            throw new AppError(USER_ERROR.DOESNT_EXIST)
        }

        const disciplinas = await disciplinasModel.updateMany({prof_id: id}, { $set: {prof_id: null}})

        res.status(200).json({disciplinas, msg: "Prof_Id = null"})
    }

    async update(req, res){

        const id = req.params.id
        const userId = req.userId

        const verifyIfIsAdmin = await usersModel.findById(userId).select('tipo')
        if(verifyIfIsAdmin.tipo !== 'admin'){
            throw new AppError(USER_ERROR.NOT_ADMIN)
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
            throw new AppError(DISCIPLINA_ERROR.DOESNT_EXIST)
        }

        res.status(200).json({disciplina, msg: "Disciplina atualizada com sucesso"})
            
    }
}

module.exports = disciplinasController