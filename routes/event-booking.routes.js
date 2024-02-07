const EventBooking = require( '../models/event-booking.model' )
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );    

// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("EventBooking - GET/Hent")
    try {
        const bookevent = await EventBooking.find()
        res.status( 200 ).json( {"EventBooking": bookevent})
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// --- GET - id
router.get( '/:id', async (req, res) => {
    console.log ("EventBooking - GET/Hent")
    try {
        const bookevent = await EventBooking.findById()
        res.status( 200 ).json( {"EventBooking": bookevent})
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// opret
router.post('/', async (req, res) => {

    console.log("EventBooking - POST/opret ny");

    
    try {
        let bookevent = new EventBooking(req.body);
        bookevent = await bookevent.save();
        res.status(201).json({ message: "Ny er oprettet", bookevent: bookevent });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", bookevent: null } );
    }
});


// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "Aktiviteter - PUT/ret" )

    try {

        let bookevent = await EventBooking.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", bookevent: bookevent } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", bookevent: null } ); 
    }

} );

// --- DELETE/SLET - admin
router.delete('/admin/:id', async (req, res) => {

    console.log("Eventbooking - DELETE/slet")

    try {

        let slet = await EventBooking.findByIdAndRemove(req.params.id);
        if ( slet ) res.status( 200 ).json( { message: "Der er slettet", slettet: true } );
        else res.status( 400 ).json( { message: "Id findes ikke", slettet: null } );

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl" } ); // 500 = serverproblem
    }

});


module.exports = router;
