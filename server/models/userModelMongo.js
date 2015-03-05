var mongodb = require('../database/mongoDb');

// User Schema
// Currently only holds strings for simplicity, more complex fields that handle auth can be added later.
var UserSchema = new mongodb.Schema({
  cell: String,
  first: String,
  last: String
});

// Create model from user schema:
var User = mongodb.model('Users', UserSchema);

module.exports = User;
