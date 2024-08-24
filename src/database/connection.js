const mongoose = require("mongoose")

require('dotenv').config()

async function main(){

    try {
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            process.env.DB_LINK
        )

        console.log("Conectado ao mongoose!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main