const mongoose =  require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const authorModel = mongoose.model("Author", authorSchema)
module.exports = authorModel