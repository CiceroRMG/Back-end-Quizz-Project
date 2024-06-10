const { Router } = require("express")

const usersDisciplinasRoutes = Router()

const usersDisciplinasControllers = require("../controllers/usersDisciplinasControllers.js")
const usersDisciplinasController = new usersDisciplinasControllers

usersDisciplinasRoutes.post("/", usersDisciplinasController.create)

usersDisciplinasRoutes.get("/", usersDisciplinasController.getAll)

usersDisciplinasRoutes.get("/:userId/:subjectId", usersDisciplinasController.checkUserInDiscipline)

usersDisciplinasRoutes.get("/:id", usersDisciplinasController.get)

usersDisciplinasRoutes.delete("/:id", usersDisciplinasController.delete)


module.exports = usersDisciplinasRoutes