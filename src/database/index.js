const { MongoClient } = require('mongodb')

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

const banco = client.db('Principal')

module.exports = banco