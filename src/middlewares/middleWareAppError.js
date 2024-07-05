const AppError = require('../utils/appError.js')
const mongoose = require('mongoose')

function errorHandler(error, request, response, next){
    if (error instanceof mongoose.Error.ValidationError){
        console.log('VALIDATION_ERROR', error)
        return response.status(400).send({
            error: true,
            type: "ValidationError",
            message: error.message
        })
    }

    if (error.code === 11000) {
        console.log('DUPLICATE_KEY_ERROR', error);
        const chaveDuplicada = Object.keys(error.keyValue)[0]
        return response.status(409).json({
            error: true,
            type: "DuplicateKeyError",
            message: error.message,
            info:`${chaveDuplicada} ja esta em uso`
        });
    }


    if(error instanceof AppError) {
        console.log('SERVIDOR_ERROR', error)
        return response.status(error.statusCode).json({
            error: true,
            status: "error",
            message: error.message
        })
    }


    console.log('INTERN_ERROR', error)
    return response.status(500).json({
        status: "error",
        message: "Erro do servidor"
    })
}

module.exports = errorHandler