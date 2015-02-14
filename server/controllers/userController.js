/**
 * Created by wayne on 2/13/15.
 */


var User = require('../models/userModelMongo');

var addUser = function(data, callback) {
  var user = new User(data);

  user.save(function(error, user){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, user);
  });
};

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

// TODO: add this to an object
module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.findUsers = findUsers;
module.exports.updateUser = updateUser;