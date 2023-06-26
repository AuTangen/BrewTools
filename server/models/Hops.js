const { Schema, model } = require('mongoose')

const hopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    alphaAcid: {
        type: Number,
        required: true
    }


})


const Hops = model('hop', hopSchema)

module.exports = Hops