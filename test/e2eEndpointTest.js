//Beginnings of an integration testing suite, for API endpoints.

//Require supertest, for endpoint testing.
var expect = require('chai').expect;
var superagent = require('superagent');
var radConvertor = {
  toMiles : Math.PI*3959/180
}

//Format a simple query.
var requestData = {
  miles: 15,
  limit: 5,
  coordinates: [37.783707, -122.408978]
}

describe("e2e: Course endpoints :", function(){

  //Note that sortedCourses requires inputs that confirm to 
  //what is specified in the controller's comments.
  //Error checking is not complete.
  it("sends a GET to /course/sortedCourses", function(done){
  superagent.get("http://localhost:1337/api/course/sortedCourses")
    .send(requestData)
    .end(function(err, results){
      if (err){
        console.log(err);
      }
      if (results){
        //receiving JSON;
        expect(results.status).to.equal(200);
        done();
      }
    });
});

});
