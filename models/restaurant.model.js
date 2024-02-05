const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
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

module.exports = mongoose.model( 'Restaurant', RestaurantSchema )