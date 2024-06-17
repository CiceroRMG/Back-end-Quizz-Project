const express = require('express')
const cors = require('cors')
const middleware = require('./middlewares/middleWaresPrivateRoutes.js')
const refreshMiddleware = require('./middlewares/middleWaresRefreshToken.js')

const loginRoutes = require("./routes/publicRoutes/login.routes.js")
const refreshTokenRoutes = require("./routes/publicRoutes/refreshToken.routes.js")

const app = express()
app.use(express.json())
app.use(cors(
    'http://127.0.0.1:5500/'
))

const routes = require("./routes/privateRoutes/index.js")

app.use("/login", loginRoutes)
app.use("/refreshToken", refreshMiddleware, refreshTokenRoutes)
app.use(middleware)
app.use(routes)

//Conectando com o Banco-mongoose
const conn = require("./database/connection.js")
conn()


const PORT = 3333
app.listen(PORT, ()=>{
    console.log("O servidor esta rodando na porta: 3333")
})