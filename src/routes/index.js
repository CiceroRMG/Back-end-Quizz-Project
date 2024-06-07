const { Router } = require("express")

const usersRoutes = require("./users.routes.js")
const disciplinasRoutes = require("./disciplina.routes.js")
const usersDisciplinasRoutes = require("./usersDisciplinas.routes.js")
const quizzesRoutes = require("./quizzes.routes.js")
const loginRoutes = require("./login.routes.js")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/disciplinas", disciplinasRoutes)
routes.use("/usersDisciplinas", usersDisciplinasRoutes)
routes.use("/quizzes", quizzesRoutes)
routes.use("/login", loginRoutes)


module.exports = routes