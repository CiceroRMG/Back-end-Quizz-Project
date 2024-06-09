const usersModel = require("../models/Users.js")
const SECRET = "pode_ser_qualquer_coisa"

const jwt = require("jsonwebtoken")

class userTokenController {
    async get(req, res) {
        try{
            const userId = req.userId
    
            const usuario = await usersModel.findOne({_id: userId})

            if(!usuario){
                return res.status(401).json({msg: "Token não esta atribuido a um usuario"})
            }
    
            res.json({ usuario })

        } catch(error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro ao realizar a requisição de token para tabela user'})
        }

    }
}

module.exports = userTokenController