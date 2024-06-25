const { Router } = require("express")

const userRoutes = Router()

const usersController = require("../../controllers/usersControllers.js")
const userController = new usersController

userRoutes.get("/", userController.getAll)

userRoutes.get("/:id", userController.get)

userRoutes.post("/", userController.create)

userRoutes.delete("/:id", userController.delete)

userRoutes.put("/:id", userController.update)

userRoutes.get("/register/getAllProfessor", userController.getAllProfessor)


module.exports = userRoutes
