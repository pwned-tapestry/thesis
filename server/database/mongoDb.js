/**
 * Created by wayne on 2/13/15.
 */


var global = require('../config');
var mongoose = require('mongoose');


// open mongo database
// path and authentication in config.js
mongoose.connect(global.mongoDb.path, {
  user: global.mongoDb.user,
  pass: global.mongoDb.pass
});


// on connection success ...
mongoose.connection.on('connected', function(){
  if (global.environment === 'dev') {
    console.log('Mongo database connected.');
  }
});
// on connection error ...
mongoose.connection.on('error', function(error){
  if (global.environment === 'dev') {
    console.log('Mongo database error.');
    return console.log('>', Error);
  }
});



module.exports = mongoose;