const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    name : String,
    email : String,
    phnNo : Number,
    queryType : String,
    queryDescription : String
})

const Query = new mongoose.model('query',querySchema)

module.exports = Query