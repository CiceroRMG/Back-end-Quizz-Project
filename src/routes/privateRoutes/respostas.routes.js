const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const repostasRoutes = Router()

const respostasControllers = require("../../controllers/respostasControllers.js")
const repostasController = new respostasControllers

repostasRoutes.post("/", tryCatch(repostasController.create))
repostasRoutes.get("/:id", tryCatch(repostasController.getAttempts))
repostasRoutes.get("/verifyAttempts/:id", tryCatch(repostasController.verifyUserAttempts))
repostasRoutes.get("/calculate/:id", tryCatch(repostasController.calculateNote))

module.exports = repostasRoutes