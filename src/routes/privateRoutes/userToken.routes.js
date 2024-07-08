const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const userTokenRoutes = Router()

const userTokenControllers = require('../../controllers/userTokenControllers.js')
const userTokenController = new userTokenControllers

userTokenRoutes.post("/", tryCatch(userTokenController.get))
userTokenRoutes.get("/", tryCatch(userTokenController.getType))


module.exports = userTokenRoutes