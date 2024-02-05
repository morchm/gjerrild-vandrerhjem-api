const mongoose = require('mongoose');


const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Events', eventsSchema)