const mongoose = require("mongoose");

const BedroomSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
  },
  images: [
    {
        image: String
    }
  ]
});

module.exports = mongoose.model( 'Bedrooms', BedroomSchema )