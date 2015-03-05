var User = require('../models/userModelMongo');

//Add a single user.
var addUser = function(data, callback) {
  // TODO: add validation code here
  var user = new User(data);

  user.save(function(error, user){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, user);
  });
};

//Find a single user.
var findUser = function(data, callback) {
  User.findOne(data, function(error, user){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, user);
  });
};

var findUsers = function(data, callback) {
  User.find(data, function(error, users){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, users);
  });
};

var updateUser = function(findData, updateData, callback) {
  User.update(findData, updateData, function(error, numAffected){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, numAffected);
  });
};

module.exports = {
  addUser     : addUser,
  findUser    : findUser,
  findUsers   : findUsers,
  updateUser  : updateUser
};
