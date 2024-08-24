const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const iaRoutes = Router()

const iaControllers = require("../../controllers/iaControllers.js")
const iaController = new iaControllers

iaRoutes.post("/generateQuiz", tryCatch(iaController.generate))

module.exports = iaRoutes