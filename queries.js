/* Fill out these functions using Mongoose queries*/
var mongoose =    require('mongoose'),
    schema  = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');

mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
    Listing.find({name: 'Library West'}, function(err, doc) {
    if (err) throw err;
    else
    console.log('Found: ' + doc);
   });
    
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
    Listing.findOneAndRemove({code:'CABL'},function(err,doc){
        if(err) throw err;
        console.log('Removed' + doc);
    })
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
    Listing.findOneAndUpdate({code: 'PHL'},{ address: '100 Phelps Lab, Gainesville, FL, 32611' }, function(err, doc) {
    if (err) throw err;
    console.log('Entry updated: ' + doc.address);
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
    Listing.find({},function(err,doc){
        if(err) throw err;
        console.log(doc);
    })
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();