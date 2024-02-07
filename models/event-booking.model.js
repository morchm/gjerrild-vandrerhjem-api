const mongoose = require('mongoose');


const EventBookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    }
})


module.exports = mongoose.model('EventBooking', EventBookingSchema)