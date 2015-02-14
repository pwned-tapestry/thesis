/**
 * Created by wayne on 2/13/15.
 */


var mongodb = require('../database/mongoDb');

var CourseSchema = new mongodb.Schema({
  name: String,
  description: String,
  location: String,
  address: String
});

var Course = mongodb.model('Courses', CourseSchema);

module.exports = Course;