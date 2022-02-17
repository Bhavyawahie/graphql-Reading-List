const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
})

const bookModel = mongoose.model('Book', bookSchema)
module.exports = bookModel