const { Router } = require("express")

const loginRoutes = Router()

const loginControllers = require('../controllers/loginControllers.js')
const loginController = new loginControllers


loginRoutes.post("/", loginController.authentication)


module.exports = loginRoutes