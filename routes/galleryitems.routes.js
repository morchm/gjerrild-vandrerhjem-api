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
        const result = await GalleryItems.find()
        res.status( 200 ).json({ "galleryitems": result })

    } catch (err) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET af billeder " + err.message} )
    }
} )

// --- GET - id
router.get( '/:id', async ( req, res ) => {
    console.log( "Galleryitems - GET/hent id" );

    try {
        const {id: galleryitemId} = req.params;
        console.log(galleryitemId);
        const galleryitem = await GalleryItems.findById(galleryitemId);

        if(!galleryitem) {
            res.status( 404 ).json( { error: "Id blev ikke fundet" } )
        } else {
            res.json({ galleryitem })
        }

    } catch (err) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET af billeder:id " + err.message} )
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



router.put( '/admin/:id', upload.single( 'image' ), async ( req, res ) => {

    console.log( "Gallery - PUT/ret" )

    try {

        if (req.file) {
            req.body.image = req.file.filename;
        }

        let galleryitem = await GalleryItems.findByIdAndUpdate(req.params.id, req.body, { new: true } );    

        if ( galleryitem ) res.status( 200 ).json( { message: "Der er rettet", galleryitem: galleryitem } )
        else res.status( 400 ).json( { message: "Id findes ikke", galleryitem: null } )

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" + error.message, galleryitem: null } ); 
    }

} );


module.exports = router;