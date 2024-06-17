const { Router } = require("express")

const quizzesRoutes = Router()

const quizzesControllers = require("../../controllers/quizzesControllers.js")
const quizzesController = new quizzesControllers

quizzesRoutes.get("/", quizzesController.getAll)

quizzesRoutes.get("/:id", quizzesController.get)

quizzesRoutes.post("/", quizzesController.create)

quizzesRoutes.put("/:id", quizzesController.update)

quizzesRoutes.delete("/:id", quizzesController.delete)


module.exports = quizzesRoutes