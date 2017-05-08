// global all listings
var allListings = [];

$( document ).ready( function(){
  console.log( 'JQ' );

  $( '#allButton' ).on( 'click', function(){
    console.log( 'in show all click' );
    displayListings( allListings );
  }); // nd allButton on click

  $( '#forRentButton' ).on( 'click', function(){
    console.log( 'in for rent on click' );
    // new array
    var listings = [];
    // loop through all listings
    for (var i = 0; i < allListings.length; i++) {
      // if for sale, push into new array
      if( allListings[i].rent != undefined ){
        listings.push( allListings[i] );
      } // end for sale check
    } // end for
    displayListings( listings );
  }); // end forSaleButton on click

  $( '#forSaleButton' ).on( 'click', function(){
    console.log( 'in for sale on click' );
    // new array
    var listings = [];
    // loop through all listings
    for (var i = 0; i < allListings.length; i++) {
      // if for sale, push into new array
      if( allListings[i].cost != undefined ){
        listings.push( allListings[i] );
      } // end for sale check
    } // end for
    displayListings( listings );
  }); // end forSaleButton on click

  // startup
  getListings();
}); //end doc ready

var getListings = function(){
  console.log( 'getting listings from server' );
  $.ajax({
    type: 'GET',
    url: '/listings',
    success: function( response ){
      console.log( 'back with:', response );
      // hold listings in a global variable
      allListings = response;
      displayListings( response );
    }  // end success
  }); // end ajax
};// end get listings

var displayListings = function( listings ){
  console.log( 'displaying:', listings );
  var outputDiv = $( '#outputDiv' );
  outputDiv.empty();
  for (var i = 0; i < listings.length; i++) {
    outputDiv.append( '<div>')
    // check sale/rent
    if( listings[i].cost != undefined ){
      outputDiv.append( '<h3>For Sale</h3>' );
      outputDiv.append( '<p>Cost: $' + listings[i].cost + '</p>' );
    }
    else{
      outputDiv.append( '<h3>For Rent</h3>' );
      outputDiv.append( '<p>Rent: $' + listings[i].rent + '</p>' );
    }
    outputDiv.append( '<p>Location: ' + listings[i].city + '</p>' );
    outputDiv.append( '<p>Sq ft: ' + listings[i].sqft + '</p>' );
    outputDiv.append( '</div>');
  } //end for
}; // end displayListings
