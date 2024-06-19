const { Router } = require("express")

const disciplinasRoutes = Router()

const disciplinasControllers = require("../../controllers/disciplinasControllers")
const disciplinaController = new disciplinasControllers

disciplinasRoutes.get("/", disciplinaController.getAll)

disciplinasRoutes.get("/:id", disciplinaController.get)

disciplinasRoutes.post("/", disciplinaController.create)

disciplinasRoutes.put("/:id", disciplinaController.update)

disciplinasRoutes.delete("/:id", disciplinaController.delete)

disciplinasRoutes.get("/prof/:id", disciplinaController.getProfessor)


module.exports = disciplinasRoutes