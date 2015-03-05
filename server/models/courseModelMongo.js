var mongodb = require('../database/mongoDb');

//Course Schema:
//Storage locations as geoJSON in an indexed string.
//Indexing as a '2d coordinate' allows us to store and query for geoJSON, 
//using MongoDB's native geo-spatial querying methods.
var CourseSchema = new mongodb.Schema({
  name: String,
  description: String,
  location: {
    type: [Number],
    index: '2d'
  },
  address: String
});

CourseSchema.index({location: '2d'});

var Course = mongodb.model('Courses', CourseSchema);

module.exports = Course;
