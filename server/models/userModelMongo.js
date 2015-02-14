/**
 * Created by wayne on 2/13/15.
 */

var mongodb = require('../database/mongoDb');


// User Schema
//  cell: String  - cell phone number - unique ident
//  first: String - first name
//  last: String  - last name
var UserSchema = new mongodb.Schema({
  cell: String,
  first: String,
  last: String
});


// create model from user schema
var User = mongodb.model('Users', UserSchema);


module.exports = User;

