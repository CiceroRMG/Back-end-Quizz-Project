const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors(
    'http://127.0.0.1:5500/'
))


const routes = require("./routes/index.js")
app.use(routes)

//Conectando com o Banco-mongoose
const conn = require("./database/connection.js")
conn()


const PORT = 3333
app.listen(PORT, ()=>{
    console.log("O servidor esta rodando na porta: 3333")
})