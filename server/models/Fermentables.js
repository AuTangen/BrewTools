const { Schema, model } = require('mongoose')

const fermentableSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: Number,
        required: true
    },
    extractPot: {
        type: Number,
        required: true
    }


})


const Fermentable = model('drink', fermentableSchema)

module.exports = Fermentable