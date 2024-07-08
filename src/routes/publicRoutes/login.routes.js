const { Router } = require("express")
const tryCatch  = require("../../utils/tryCatch.js")

const loginRoutes = Router()

const loginControllers = require('../../controllers/loginControllers.js')
const loginController = new loginControllers


loginRoutes.post("/", tryCatch(loginController.authentication))


module.exports = loginRoutes