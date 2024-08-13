const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const disciplinasRoutes = Router()

const disciplinasControllers = require("../../controllers/disciplinasControllers")
const disciplinaController = new disciplinasControllers

disciplinasRoutes.get("/", tryCatch(disciplinaController.getAll))

disciplinasRoutes.get("/:id", tryCatch(disciplinaController.get))

disciplinasRoutes.post("/", tryCatch(disciplinaController.create))

disciplinasRoutes.put("/:id", tryCatch(disciplinaController.update))

disciplinasRoutes.put("/null/:id", tryCatch(disciplinaController.turnNullManyProfId))

disciplinasRoutes.delete("/:id", tryCatch(disciplinaController.delete))

disciplinasRoutes.get("/prof/:id", tryCatch(disciplinaController.getProfessor))

disciplinasRoutes.get("/painel/data", tryCatch(disciplinaController.getSubjectProfessorAndQuizzes))


module.exports = disciplinasRoutes