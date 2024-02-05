const express = require( 'express' )
const app = express ()
const PORT = 10000

// --------- CORS 
// ----------------------------------------------
const cors = require('cors')
// Dem, som bruger alt andet end localhost:5000 til serveren, må også godt bruge hjemmesiden
// "Så der er adgang 'udefra' (andre domæner/porte) til dataerne"
app.use(cors( {origin: true} ))

const username = encodeURIComponent("maxewss");
const password = encodeURIComponent("adminpassword");



// --- DB Mongo og Mongoose
// --- "cluster0.wnwuxcg.mongodb.net" - Til MongoDB connection
const mongoose = require( 'mongoose' )
mongoose.connect( `mongodb+srv://${username}:${password}@cluster0.wnwuxcg.mongodb.net/` )

const db = mongoose.connection;
db.on( 'error', ( error ) => console.log( "FEJL: " + error ) )
db.once( 'open', () => console.log( "/// ---> Så er der hul igennem til MongoDatabasen!" ) )


// --- App
app.use( express.json() ); //Håndterer POST/PUT data som json
app.use( express.urlencoded( { extended: true } ) ); //Håndterer POST/PUT data som urlencoded-data


// --- GET serverens endpoint: http://localhost:500
app.get( '/', async ( req, res ) => {
    console.log( "GET serverens endpoint" )
    res.status( 200 ).json( {
        message: "Velkommen til serverens start-endpoint!"
    } )
} )

// --- ROUTES
app.use( '/aboutus', require( './routes/aboutus.routes' ) )
app.use( '/galleryitems', require( './routes/galleryitems.routes' ) )
app.use( '/activities', require( './routes/aktiviteter.routes' )  )
app.use( '/restaurant', require( './routes/restaurant.routes' )  )
app.use( '/bedrooms', require( './routes/bedrooms.routes' )  )
app.use( '/events', require( './routes/events.routes' )  )


// --- NO MATCH
app.get( '*', async ( req, res ) => {
    res.status( 404 ).json( { message: 'Siden findes ikke - øv' } )
} )

// --- LISTEN - opstart af server
app.listen( PORT, () => 
    console.log( "----> Serveren er startet op nu på port: " + PORT )
 )