const Activities = require( '../models/aktiviteter.model' )
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );    

// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("Aktiviteter - GET/Hent")
    try {
        const activity = await Activities.find()
        res.status( 200 ).json( {"activities": activity})
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// opret
router.post('/activity', async (req, res) => {

    console.log("Aktiviteter - POST/opret ny");

    
    try {
        let activity = new Activities(req.body);
        activity = await activity.save();
        res.status(201).json({ message: "Ny er oprettet", activity: activity });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", activity: null } );
    }

});


// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "Aktiviteter - PUT/ret" )

    try {

        let activity = await Activities.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", activity: activity } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", activity: null } ); 
    }

} );


module.exports = router;
