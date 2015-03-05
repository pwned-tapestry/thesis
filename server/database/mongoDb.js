var global = require('../config');
var mongoose = require('mongoose');

// Connects to MongoDB using credentials in config.js.
// Note that config.js is in the .gitignore.
mongoose.connect(global.mongoDb.path, {
  user: global.mongoDb.user,
  pass: global.mongoDb.pass
});

mongoose.connection.on('connected', function(){
  if (global.environment === 'dev') {
    console.log('Mongo database connected.');
  }
});

mongoose.connection.on('error', function(error){
  if (global.environment === 'dev') {
    console.log('Mongo database error.');
    return console.log('>', Error);
  }
});

module.exports = mongoose;
