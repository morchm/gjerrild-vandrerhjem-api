const Bedrooms = require( '../models/bedrooms.model' )
const express = require( 'express' )
const formData = require ( 'express-form-data' )
const router = express.Router();
router.use( formData.parse() ); 

// --- OPRET ---
router.post( '/', async ( req, res ) => {
    console.log( "bedrooms - POST/Opret ny" )
    try {
        let bedrooms = new Bedrooms( req.body );
        bedrooms = await bedrooms.save();
        res.status( 201 ).json( { message: "Ny er oprettet", bedrooms: bedrooms } )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med POST", bedrooms: null } )
    }
} )

// --- GET ---
router.get( '/', async ( req, res ) => {
    console.log ("bedrooms - GET/Hent")
    try {
        const bedrooms = await Bedrooms.find();
        res.status( 200 ).json( bedrooms )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET" } )
    }
} )


router.get('/:id', async (req, res) => { //

    console.log("Bedrooms - GET/hent udvalgt ud fra ID")

    try {
        const bedroom = await Bedrooms.findById( req.params.id )
        if ( bedroom ) res.status( 200 ).json( bedroom );
        else res.status( 400 ).json( null );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } );
    }

});


// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "bedrooms - PUT/ret" )

    try {

        let bedrooms = await Bedrooms.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", bedrooms: bedrooms } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", bedrooms: null } ); 
    }

} );


router.delete('/admin/:id', async (req, res) => {

    console.log("Bedrooms - DELETE/slet")

    try {

        let slet = await Bedrooms.findByIdAndRemove(req.params.id);
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

});

module.exports = router