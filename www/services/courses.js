angular.module('app.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('CourseService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var courses = [
    { id: 0, title: 'Augusta', description: 'The best in the country.' },
    { id: 1, title: 'Pebble Beach', description: 'The best in the west.' },
    { id: 2, title: 'City Course', description: 'Everyone likes it.' }
  ];

  return {
    all: function() {
      return courses;
    },
    get: function(petId) {
      // Simple index lookup
      return courses[courseId];
    }
  }
});
