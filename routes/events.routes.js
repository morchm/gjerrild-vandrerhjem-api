const Events = require( '../models/events.model' )
const mongo = require(`mongoose`)
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );  

const cors = require('cors')
// Dem, som bruger alt andet end localhost:5000 til serveren, må også godt bruge hjemmesiden
// "Så der er adgang 'udefra' (andre domæner/porte) til dataerne"
router.use(cors( {origin: true} ))


// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("Events - GET/Hent")
    try {
        const event = await Events.find()
        res.status( 200 ).json( {"event":event} )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )


// --- GET - id
router.get( '/admin/:id', async (req, res) => {
    console.log ("Events - GET/Hent")
    try {
        const {id: eventID} = req.params;
        const event = await Events.findById(eventID)
        if(!event) {
            res.status( 404 ).json( { error: "Id blev ikke fundet" } )
        } else {
            res.json({ event })
        }
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// opret
router.post('/', async (req, res) => {

    console.log("Events - POST/opret ny");

    
    try {
        let event = new Events(req.body);
        event = await event.save();
        res.status(201).json({ message: "Ny er oprettet", event: event });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", event: null } );
    }

});


// --- RET/PUT - admin
router.put( '/admin/:id', async ( req, res ) => {

    console.log( "Events - PUT/ret" )

    try {
        const {id: eventID} = req.params;
        let event = await Events.findOneAndUpdate( {_id: new mongo.Types.ObjectId(eventID)}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", event: event } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", errorMessage: error.message, event: null } ); 
    }

} );

// --- DELETE/SLET - admin
router.delete('/admin', async (req, res) => {

    console.log("Aboutus - DELETE/slet")

    try {

        let slet = await Events.findByIdAndRemove(req.params.id);
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

});


module.exports = router;
