angular.module('app.services', [])

.factory('CourseService', ['$http', '$q', CourseService]);

function CourseService($http, $q) {
  this._courses = [];

  function getCoursesWithTeeTimes() {
    var deferred = $q.defer();
    var that = this;
    $http.get("http://localhost:1337/api/coursesWithTeeTimes")
      .success(function(courses, status, headers, config) {
        console.log("courses :", courses);
        console.log("Received data via HTTP");
        that._courses = courses;
        that._courses[0].url = 'http://www.kauaigolfclubrentals.com/wp-content/uploads/2011/09/kiahuna-golf-course-kauai.jpg';
        that._courses[1].url = 'http://www.clubcorp.com/var/ezflow_site/storage/images/media/clubs/teal-bend-media-folder/images/facilities/golf-course/tealbendgolfclub-hole16-960x410.jpg/3836500-1-eng-US/TealBendGolfClub-Hole16-960x410.jpg_rotatingGalleryFront.jpg';
        that._courses[2].url = 'http://www.glengolfdesign.com/docs/golf-course-green.jpg';
        deferred.resolve(courses);
      })
      .error(function(courses, status, headers, config) {
        console.log("Error while making HTTP call.");
        deferred.reject();
      });
    return deferred.promise;
  }

  function get(courseId) {

    return this._courses.filter(function(elem) {
      return elem._id === courseId;
    })[0];
  }

  function bookTime(userInfo, teeTimeId) {

    var newUser = {
      cell: userInfo.userName,
      firstName: userInfo.userNumber
    };

    //create a new user
    $http.post("http://localhost:1337/api/user", newUser)

    .success(function(returnedUser){
      //then send a text, to that user
      $http.post("http://localhost:1337/api/schedule/bookTeeTime", userInfo)
        .success(function(data, status){
          console.log('success : ', data);
        })
        .error(function(data, status){
          console.log('error :', data);
        });
      // book the teeTime -- should be combined into one api call with above post to schedule/bookTeeTime
      $http.post("http://localhost:1337/api/bookteetime",{userId: returnedUser._id, teetimeId: teeTimeId})
        .success(function(data, status, headers, config) {
          console.log("data after post to /bookteetime", data);
        })
        .error(function(data, status, headers, config) {
          console.log("error:", error);
        });
    })
    .error(function(error, status, headers, config) {
      console.log("error:", error);
    });
  }

  return {
      getCoursesWithTeeTimes: getCoursesWithTeeTimes,
      get: get,
      bookTime: bookTime
  };
};
