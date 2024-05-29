const { Router } = require("express")

const usersRoutes = require("./users.routes.js")
const disciplinasRoutes = require("./disciplina.routes.js")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/disciplinas", disciplinasRoutes)


module.exports = routes