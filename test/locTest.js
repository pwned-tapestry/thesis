//Require testing framework, helper libraries:
var expect = require('chai').expect;
var Q = require('q');
var superagent = require('superagent');

//Require database, models, and controllers:
var db = require("../server/database/mongoDb.js");
var Course = require("../server/models/courseModelMongo.js");
var CourseController = require("../server/controllers/courseController.js");
var q_findOne = Q.nbind(Course.findOne, Course);
var q_create = Q.nbind(Course.create, Course);
var q_find   = Q.nbind(Course.find, Course);

//Rough helper object to convert between radians and miles (or, eventually, kilometers).
//Multiply by this number to convert from radians (returned from mongo) to miles (to send to frontEnd).
var radConvertor = {
  toMiles : Math.PI*3959/180
};

//Declare dummy courses, with geoJSON point coordinates.
var fiveCourses = [
  {
    name: "Cypress Golf Course",
    description: "test",
    address: "2001 Hillside Blvd, Colma, CA 94014",
    location : [37.680573, -122.446698]
  },
  {
    name: "Presidio Golf Course",
    description: "test",
    address: "300 Finley Road, San Francisco, CA 94129",
    location : [37.788773, -122.460603]
  },
  {
    name: "TPC Harding Park",
    description: "test",
    address: "99 Harding Rd, San Francisco, CA 94132",
    location : [37.724035, -122.492532]
  },
  {
    name: "John McLaren Park",
    description: "test",
    address: "100 John F Shelley Dr, San Francisco, CA 94134",
    location : [37.719146, -122.421121]
  },
  {
    name: "Lake Merced Golf Club",
    description: "test",
    address: "2300 Junipero Serra Blvd, Daly City, CA 94015",
    location : [37.697689, -122.477425]
  }
];

describe('Integration Testing: CRUD Functions & Geospatial : ', function(){

  //Deleting 5 to clear previous test cases.
  before(function(done){
    console.log('Running "before" block (Async).');
    var coursesDeleted = 0;
    q_find({description: "test"})
      .then(function(courses){
        console.log('courses.length : ', courses.length);
        for (var i = 0 ; i < courses.length; i ++){
          console.log('Successful delete : '+ ++coursesDeleted);
          courses[i].remove();
        }
        done();
      });
      done();
  });

  describe('Schema Unit Tests : inserting 5 local SF golf courses', function(){
    it('should insert 5 courses', function(done){
      var tasks = [];
      for (var i = 0 ; i < fiveCourses.length; i++){
        tasks.push(q_create(fiveCourses[i]));
      }

      Q.all(tasks)
        .then(function(results){
          expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log("error :", err);
        });
    })
  });

  describe('Schema Unit Tests : querying for nearest golf courses',function(){
    it('successfuly makes simple query using geoNear', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          limit: 5
        })
        .then(function (results) {
          console.log('length of results:', results.length);
          expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log(err);
        });

    });

    it('queries using geoNear, filtering for max distance', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          maxDistance: .08  
          //Note: this is in radians. Please see the mongoDB geospatial docs for detailed conversion instructions.
        })
        .then(function (results) {
          for (var i = 0; i < results.length; i ++){
            console.log(i + " : distance :   "+ results[i].dis*radConvertor.toMiles + " miles");
          }
          expect(!!results).to.equal(true);
          done();
        }, function(err){
          console.log(err);
        });
    });

    it('queries using geoNear, filtering for max distance and num', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          maxDistance: 10*180/(Math.PI*3959),
          num: 3
        })
        .then(function (results) {
          console.log('inside then');
          for (var i = 0; i < results.length; i ++){
            console.log(i + " : distance :   "+ results[i].dis*radConvertor.toMiles + " miles");
          }
          expect(results.length).to.equal(3);
          done();
        }, function(err){
          console.log(err);
        });
    });
  });

  //Single test for new findCourseWithinMiles API endpoint.
  describe('Controller Unit Tests : findCourseWithinMiles',function(done){

    var requestData = {
      miles: 15,
      limit: 5,
      coordinates: [37.783707, -122.408978]
    }
    it("requests couses within a 15 mile radius of hack reactor :", function(done){

      CourseController.findCourseWithinMiles(requestData, function(err, results){
        if (err){
          console.log("Error :", err);
        }
        expect(results.length).to.equal(5);
        done();
      });      
    });

  });

  after(function(done){
    //Delete 5.
    console.log('Running "after" block. Cleanup.');
    var coursesDeleted = 0;
    q_find({description: "test"})
      .then(function(courses){
        console.log('courses.length : ', courses.length);
        for (var i = 0 ; i < courses.length; i ++){
          console.log('Successful delete : '+ ++coursesDeleted);
          courses[i].remove();
        }
        done();
      });
      done();
  });
});