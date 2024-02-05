const Restaurant = require( '../models/restaurant.model' )
const express = require( 'express' )
const formData = require ( 'express-form-data' )
const router = express.Router();
router.use( formData.parse() ); 

// --- OPRET ---
router.post( '/', async ( req, res ) => {
    console.log( "Restaurant - POST/Opret ny" )
    try {
        let restaurant = new Restaurant( req.body );
        restaurant = await restaurant.save();
        res.status( 201 ).json( { message: "Ny er oprettet", restaurant: restaurant } )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med POST", restaurant: null } )
    }
} )

// --- GET ---
router.get( '/', async ( req, res ) => {
    console.log ("Restaurant - GET/Hent")
    try {
        const restaurant = await Restaurant.find();
        res.status( 200 ).json( restaurant )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET" } )
    }
} )

// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "Restaurant - PUT/ret" )

    try {

        let restaurant = await Restaurant.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", restaurant: restaurant } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", restaurant: null } ); 
    }

} );

module.exports = router