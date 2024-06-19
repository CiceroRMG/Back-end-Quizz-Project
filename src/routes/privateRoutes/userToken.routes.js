const { Router } = require("express")

const userTokenRoutes = Router()

const userTokenControllers = require('../../controllers/userTokenControllers.js')
const userTokenController = new userTokenControllers

userTokenRoutes.post("/", userTokenController.get)
userTokenRoutes.get("/", userTokenController.getType)


module.exports = userTokenRoutes