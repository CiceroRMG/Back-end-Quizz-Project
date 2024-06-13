const jwt = require('jsonwebtoken')
const SECRET = "pode_ser_qualquer_coisa"

function checkUserToken(req, res, next){
    const token = req.headers.authorization // para toda requisição o front tem que enviar o token pelo headers da requisição

    if (!token) {
        return res.status(401).json({msg: "O token não existe"})
    }
    try {
        const tokenValido = jwt.verify(token, SECRET)
        
        if(!tokenValido){
            return res.status(401).json({msg: "Esse token foi recusado pelo processo de verificação"})
        }
    
        req.userId = tokenValido.userId // estamos colocando como uma propriedade da requisição o userId, caso tivermos que utilizar depois de passar no middleware
        next()

    } catch(error){
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({msg: "O token está expirado"})
        }
    }

}

module.exports = checkUserToken