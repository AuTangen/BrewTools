const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
      
    },
    og: {
        type: Number
    },
    fg: {
        type: Number
    },
    abv: {
        type: Number
    },
    color: {
        type: Number
    },
    ibus: {
         type: Number
    },
    fermentables: [{
        
    }],
    hops: [{
        
    }],
    yeast: {
       
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})

const Recipe = model('recipe', recipeSchema)

module.exports = Recipe