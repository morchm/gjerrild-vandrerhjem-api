const mongoose = require( 'mongoose' );

const galleryItemSchema = new mongoose.Schema( { 
    image: {
        type: String
    }
 } )

 module.exports = mongoose.model("GalleryItem", galleryItemSchema, "galleryitems")