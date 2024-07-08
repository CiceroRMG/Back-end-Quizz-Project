const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const quizzesRoutes = Router()

const quizzesControllers = require("../../controllers/quizzesControllers.js")
const quizzesController = new quizzesControllers

quizzesRoutes.get("/", tryCatch(quizzesController.getAll))

quizzesRoutes.get("/:id", tryCatch(quizzesController.get))

quizzesRoutes.post("/", tryCatch(quizzesController.create))

quizzesRoutes.put("/:id", tryCatch(quizzesController.update))

quizzesRoutes.delete("/:id", tryCatch(quizzesController.delete))


module.exports = quizzesRoutes