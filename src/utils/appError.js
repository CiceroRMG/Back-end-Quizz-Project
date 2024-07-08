class AppError extends Error {
    constructor(objeto){
        super(objeto.message)
        this.statusCode = objeto.statusCode
    }
}

module.exports = AppError

 

