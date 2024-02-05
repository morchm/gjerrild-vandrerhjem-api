const mongoose = require( 'mongoose' );

const galleryItemSchema = new mongoose.Schema( { 
    carousel : [
            {
                image: String
            }
        ],
     activities: [
            {
                image: String
            }
     ],
    food: [
        {
            image: String
        }
    ],
    bedrooms: [
        {
            image: String
        }
    ],
    events: [
        {
            image: String
        }
    ],
    vandrerhjem: [
        {
            image: String
        }
    ], 
    nature: [
        {
            image: String
        }
    ]
 });

 module.exports = mongoose.model("GalleryItem", galleryItemSchema)