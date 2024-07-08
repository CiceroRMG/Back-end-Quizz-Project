const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const userRoutes = Router()

const usersController = require("../../controllers/usersControllers.js")
const userController = new usersController

userRoutes.get("/", tryCatch(userController.getAll))

userRoutes.get("/:id", tryCatch(userController.get))

userRoutes.post("/", tryCatch(userController.create))

userRoutes.delete("/:id", tryCatch(userController.delete))

userRoutes.put("/:id", tryCatch(userController.update))

userRoutes.get("/register/getAllProfessor", tryCatch(userController.getAllProfessor))

userRoutes.get("/register/getAllStudents", tryCatch(userController.getAllStudents))


module.exports = userRoutes
