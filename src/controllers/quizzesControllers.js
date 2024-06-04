const quizzesModel = require("../models/Quizzes.js")
const disciplinasModel = require("../models/Disciplinas.js")

class quizzesController {
    async create(req, res){
        try {
            const {titulo, tempo, tentativas, disciplina_id, data_inicio, data_fim, mensagem, tipo, perguntas} = req.body

            const disciplina = await disciplinasModel.findById(disciplina_id)
            // validando a disciplina existe na outra collection
            if (!disciplina){
                return res.status(404).json({msg: "Esse id de disciplina não foi encontrado"})
            }


            const quizz = {
                titulo : titulo,
                tempo : tempo,
                tentativas : tentativas,
                disciplina_id: disciplina_id,
                data_inicio: data_inicio,
                data_fim: data_fim,
                mensagem: mensagem,
                tipo: tipo,
                perguntas: perguntas
            }

            const response = await quizzesModel.create(quizz)
        
            res.status(201).json({quizz, msg: "Quizz criado com sucesso"}) 
        } catch (error) {

            console.log(error, "Algo deu erro ao criar um Quizz")

        }
    }

    async getAll(req, res){
        try {

            const quizzes = await quizzesModel.find()
            res.status(201).json({quizzes, msg: "Mostrando todos os Quizzes"})

        } catch (error) {

            console.log(error, "Algo deu erro ao buscar os quizzes")

        }
    }


    async get(req, res){
        try {
            const id = req.params.id

            const quizz = await quizzesModel.find({
                $or: [
                    { _id: id },
                    { disciplina_id: id }
                ]
            })

            if (!quizz || quizz.length === 0){
                return res.status(404).json({msg: "Quizz ou disciplina não encontrados"})
            }

            res.status(201).json({quizz, msg: "Mostrando um quizz ou todos os quizzes de uma discplina"})

        } catch (error) {

            console.log(error)

        }
    }

    async delete(req, res){
        try {
            const id = req.params.id

            const quizz = await quizzesModel.findById(id)

            if (!quizz){
                return res.status(404).json({msg: "Quizz não encontrado"})
            }

            const deletedQuizz= await quizzesModel.findOneAndDelete(id)

            res.status(200).json({deletedQuizz, msg: "Quizz deletado com sucesso"})

        } catch (error) {

            console.log(error)

        }
    }

    async update(req, res){
        const id = req.params.id

        const {titulo, tempo, tentativas, data_inicio, data_fim, mensagem, tipo, perguntas} = req.body

        const quizz = {
            titulo : titulo,
            tempo : tempo,
            tentativas : tentativas,
            data_inicio: data_inicio,
            data_fim: data_fim,
            mensagem: mensagem,
            tipo: tipo,
            perguntas: perguntas
        }

        const updatedQuizz = await quizzesModel.findByIdAndUpdate(id, quizz)

        if (!updatedQuizz) {
            res.status(404).json({msg: "Quizz não encontrado"})
            return
        }

        res.status(200).json({quizz, msg: "Quizz atualizado com sucesso"})
    }
}

module.exports = quizzesController