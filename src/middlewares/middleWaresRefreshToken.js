const jwt = require('jsonwebtoken')
const refreshSECRET = "essa_e_a_secret_do_refresh_token"

function checkRefreshToken(req, res, next){
    const refreshToken = req.headers.authorization // refresh token

    if (!refreshToken) {
        return res.status(401).json({msg: "O refreshToken não existe"})
    }
    try {
        const refreshTokenValido = jwt.verify(refreshToken, refreshSECRET)
        
        if(!refreshTokenValido){
            return res.status(401).json({msg: "Esse refreshToken foi recusado pelo processo de verificação"})
        }
    
        req.userId = refreshTokenValido.userId // estamos colocando como uma propriedade da requisição o userId, caso tivermos que utilizar depois de passar no middleware
        next()

    }  catch(error){
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({msg: "O token está expirado"})
        }
    }

}

module.exports = checkRefreshToken