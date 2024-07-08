const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const refreshTokenRoutes = Router()

const refreshTokenControllers = require('../../controllers/refreshTokenControllers.js')
const refreshTokenController = new refreshTokenControllers


refreshTokenRoutes.post("/", tryCatch(refreshTokenController.newToken))
refreshTokenRoutes.post("/delete", tryCatch(refreshTokenController.delete))


module.exports = refreshTokenRoutes