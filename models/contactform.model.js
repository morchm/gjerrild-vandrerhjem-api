const mongoose = require('mongoose');


const contactformSchema = new mongoose.Schema({
    navn: {
        type: String,
        required: [true, 'Email er påkrævet!'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    besked: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Contactform', contactformSchema, 'contactforms')