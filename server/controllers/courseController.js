var Course = require('../models/courseModelMongo');

//Add a single course.
var addCourse = function(data, callback) {
  var course = new Course(data);
  course.save(function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });
};

//Find a single course.
var findCourse = function(data, callback){

  Course.findOne(data, function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });
};

//Find multiple courses, expects an array in data.
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

/**
 * Performs a geospatial query, for nearest golf courses within specified parameters.
 *
 * Note: input parameters are inside the requestData object, 
 * which, on a deployed server, should be the 
 * incoming request's body.
 * @param  {[string]}   requestData.miles [Search radius in miles. Note conversion to radius below.]
 * @param  {[string]}   requestData.limit [Maximum number of results.]
 * @param  {[array of numers]}   requestData.coordinates [lat/long coordinates.]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
var findCourseWithinMiles = function(requestData, callback){
  //All must be specified in for
  //schema's geoNear method to not throw an error.
  // {
  // miles: num,
  // limit: num,
  // coordinates: [num, num]
  // }

  var miles       = requestData.miles; 
  var limit       = requestData.limit;
  var coordinates = requestData.coordinates;

  Course.geoNear(
    {type: "Point", coordinates: coordinates}, 
    {
      maxDistance: miles*180/(Math.PI*3959),
      num: limit
    })
    .then(function (results) {
      results = results.sort(function(x,y){
        if (x.dis < y.dis){
          return -1;
        } else if (x.dis > y.dis){
          return 1;
        } else {
          return 0;
        }
      })
      callback(undefined, results);
    }, function(err){
      callback(err, undefined);
    });
};

module.exports = {
  addCourse: addCourse,
  findCourse: findCourse,
  findCourses: findCourses,
  updateCourse: updateCourse,
  findCourseWithinMiles: findCourseWithinMiles
};
