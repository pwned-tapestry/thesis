/**
 * Created by wayne on 2/13/15.
 */


var Course = require('../models/courseModelMongo');


var addCourse = function(data, callback) {
  var course = new Course(data);
  course.save(function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });
};

var findCourse = function(data, callback){

  Course.findOne(data, function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });

};

var findCourses = function(data, callback){

  Course.find(data, function(error, courses){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, courses);
  });

};

var updateCourse = function(findData, updateData, callback) {
  Course.update(findData, updateData, function(error, numAffected){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, numAffected);
  });
};


module.exports = {
  addCourse: addCourse,
  findCourse: findCourse,
  findCourses: findCourses,
  updateCourse: updateCourse
};