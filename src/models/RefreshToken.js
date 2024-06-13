const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const { Schema } = mongoose

const refreshTokenSchema = new Schema ({
    user_id : {
        type: ObjectId,
        ref: 'Users'
    },
    token : {
        type: String,
    }
})

const refreshToken = mongoose.model('refreshTokens', refreshTokenSchema)

module.exports = refreshToken