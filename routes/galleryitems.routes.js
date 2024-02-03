const GalleryItems = require( '../models/galleri.model' );

const express = require( 'express' );
const router = express.Router();

const multer = require( 'multer' );
const upload = multer( {
    storage: multer.diskStorage( { 
        destination: function ( req, file, cb ) {
            cb( null, "public/images" );
        },
        filename: function ( req, file, cb ) {
            cb( null, Date.now() + '-' + file.originalname )
        }
     } )
} )


// --- GET alle
router.get( '/', async ( req, res ) => {
    console.log( "Galleryitems - GET/hent alle" );

    try {
        const galleryitems = await GalleryItems.find()
        res.status( 200 ).json( galleryitems );

    } catch (err) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET af billeder"} )
    }
} )

// --- OPRET/POST - admin
router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {
    console.log( "Galleryitems - POST/opret" );

    try {
        let galleryitem = new GalleryItems( req.body );
        galleryitem.image = req.file ? req.file.filename : "paavej.jpg";
        galleryitem = await galleryitem.save();
        res.status( 201 ).json( { message: "Ny er oprettet", galleryitem: galleryitem } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

} )



module.exports = router;