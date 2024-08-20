const { Schema, model } = require('mongoose')

const Document = new Schema({
    _id: String,
    document: String
})

module.exports = model('Document', Document)