const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const usersDisciplinasRoutes = Router()

const usersDisciplinasControllers = require("../../controllers/usersDisciplinasControllers.js")
const usersDisciplinasController = new usersDisciplinasControllers

usersDisciplinasRoutes.post("/", tryCatch(usersDisciplinasController.create))

usersDisciplinasRoutes.get("/", tryCatch(usersDisciplinasController.getAll))

usersDisciplinasRoutes.get("/:userId/:subjectId", tryCatch(usersDisciplinasController.checkUserInDiscipline))

usersDisciplinasRoutes.get("/:id", tryCatch(usersDisciplinasController.get))

usersDisciplinasRoutes.delete("/:id", tryCatch(usersDisciplinasController.deleteByUserId))


module.exports = usersDisciplinasRoutes