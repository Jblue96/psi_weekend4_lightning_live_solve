// requries
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

// globals
var port = process.env.PORT || 5678;

// mongoose stuff
// connect
mongoose.connect( 'localhost:27017/realestate' );
// schema
var listingsSchema = mongoose.Schema({
  cost: Number,
  sqft: Number,
  city: String,
  rent: Number
}); // end schema
//  model
var listings = mongoose.model( 'listings', listingsSchema );

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
});

app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

app.get( '/listings', function( req, res ){
  listings.find().then( function( data ){
    res.send( data );
  }); // end find
}); // end get listings
