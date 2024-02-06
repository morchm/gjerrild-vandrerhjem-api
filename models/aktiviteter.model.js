const mongoose = require('mongoose');


const AktiviteterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    kilometer: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Activities', AktiviteterSchema)