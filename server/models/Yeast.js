const { Schema, model } = require('mongoose')

const yeastSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    
    attenuation: {
        type: Number,
        required: true
    }


})


const Yeast = model('yeast', yeastSchema)

module.exports = Yeast