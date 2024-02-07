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

// --- GET - id
router.get( '/:id', async ( req, res ) => {
    console.log( "Aktiviteter - GET/hent id" );

    try {
        const {id: aktiviteterId} = req.params;
        console.log(aktiviteterId);
        const activity = await Activities.findById(aktiviteterId);

        if(!activity) {
            res.status( 404 ).json( { error: "Id blev ikke fundet" } )
        } else {
            res.json({ activity })
        }

    } catch (err) {
        res.status( 500 ).json( { message: "Der er opstået en fejl med GET af id " + err.message} )
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
router.put( '/admin/:id', async ( req, res ) => {

    console.log( "Aktiviteter - PUT/ret" )
    try {
        const {id: aktiviteterId} = req.params;
        let activity = await Activities.findOneAndUpdate( {_id: ObjectId(aktiviteterId)}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", activity: activity } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" + error.message, activity: null } ); 
    }

} );

// --- DELETE/SLET - admin
router.delete('/admin/:id', async (req, res) => {

    console.log("Aboutus - DELETE/slet")

    try {

        let slet = await Activities.findByIdAndRemove(req.params.id);
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

});


module.exports = router;
