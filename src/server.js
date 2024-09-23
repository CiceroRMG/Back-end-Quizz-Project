require('dotenv').config()
const express = require('express')
require('express-async-errors')
const {hash, compare} = require("bcrypt")
const cors = require('cors')
const middleware = require('./middlewares/middleWaresPrivateRoutes.js')
const refreshMiddleware = require('./middlewares/middleWaresRefreshToken.js')
const errorHandler = require('./middlewares/middleWareAppError.js')

const loginRoutes = require("./routes/publicRoutes/login.routes.js")
const refreshTokenRoutes = require("./routes/publicRoutes/refreshToken.routes.js")

const app = express()
app.use(express.json())
app.use(cors())

const routes = require("./routes/privateRoutes/index.js")

app.use("/login", loginRoutes)
app.use("/refreshToken", refreshMiddleware, refreshTokenRoutes)
app.use(middleware)
app.use(routes)
app.use(errorHandler)

//Conectando com o Banco-mongoose
const conn = require("./database/connection.js")
conn()


app.listen(process.env.PORT, ()=>{
    console.log("O servidor esta rodando na porta: 3333")
})

async function saske() {
    const senhaCriptografada = await hash("12345", 8)
    console.log(senhaCriptografada);
    
}

saske()


