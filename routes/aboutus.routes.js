const AboutUs = require( '../models/about.model' )
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );     

// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("About - GET/Hent")
    try {
        const aboutUs = await AboutUs.findOne()
        res.status( 200 ).json( aboutUs)
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } )
    }
} )

// opret
router.post('/', async (req, res) => {

    console.log("Contactform - POST/opret ny");

    
    try {
        let about = new AboutUs(req.body);
        about = await about.save();
        res.status(201).json({ message: "Ny er oprettet", about: about });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", about: null } );
    }

});

// --- RET/PUT - admin
router.put( '/admin',     async ( req, res ) => {

    console.log( "About - PUT/ret" )

    try {

        let about = await AboutUs.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", about: about } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", about: null } ); 
    }

} );


module.exports = router;
