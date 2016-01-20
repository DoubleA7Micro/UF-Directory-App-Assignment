'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listings = require('./listings.json');

/* Connect to your database */
mongoose.connect(config.db.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("Connected");
});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
for (var i = 0; i < listings.entries.length; ++i) {

  var curListing = listings.entries[i];

  var curEntry;
  if (curListing.hasOwnProperty('coordinates')) {
    curEntry = new Listing({
      code: curListing.code,
      name: curListing.name,
      coordinates: {
        latitude: curListing.coordinates.latitude,
        longitude: curListing.coordinates.longitude
      },
      address: curListing.address
    });
  } else {
    curEntry = new Listing({
      code: curListing.code,
      name: curListing.name,
      coordinates: {
        latitude: null,
        longitude: null
      },
      address: ''
    });
  }

  //Save each entry
  curEntry.save(function(err) {
    if (err) throw err;
  });
};//end of loop

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */
