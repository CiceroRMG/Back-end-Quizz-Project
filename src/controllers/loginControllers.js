const usersModel = require("../models/Users.js")
const { compare } = require("bcrypt")

const jwt = require("jsonwebtoken")
const SECRET = "pode_ser_qualquer_coisa"


class loginController {
    async authentication(req, res) {
        try{
            const { matricula, email, senha } = req.body
    
            const usuario = await usersModel.findOne({email: email})

            if(!usuario){
                return res.status(401).json({msg: "Login inválido"})
            }
    
            const senhaValida = await compare(senha, usuario.senha)
    
            if(!senhaValida){
                return res.status(401).json({msg: "Senha inválida"})
            }
    
            // gerando um token -> (payload, secret, options)
            const token = jwt.sign({userId: usuario._id}, SECRET, { expiresIn: '1h' })
    
            res.json({ token, userId: usuario._id })

        } catch(error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro ao buscar'})
        }

    }
}

module.exports = loginController