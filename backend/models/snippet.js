const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    title: String,
    code: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

snippetSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Snippet', snippetSchema)