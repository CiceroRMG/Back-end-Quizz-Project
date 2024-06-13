const { Router } = require("express")

const refreshTokenRoutes = Router()

const refreshTokenControllers = require('../controllers/refreshTokenControllers.js')
const refreshTokenController = new refreshTokenControllers


refreshTokenRoutes.post("/", refreshTokenController.newToken)


module.exports = refreshTokenRoutes