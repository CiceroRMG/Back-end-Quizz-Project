const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const userRoutes = Router()

const usersController = require("../../controllers/usersControllers.js")
const userController = new usersController

userRoutes.get("/", tryCatch(userController.getAll))

userRoutes.get("/:id", userController.get)

userRoutes.post("/", tryCatch(userController.create))

userRoutes.delete("/:id", userController.delete)

userRoutes.put("/:id", userController.update)

userRoutes.get("/register/getAllProfessor", userController.getAllProfessor)

userRoutes.get("/register/getAllStudents", userController.getAllStudents)


module.exports = userRoutes
