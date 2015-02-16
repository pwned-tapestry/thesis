angular.module('app.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('CourseService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var courses = [
    { id: 0, title: 'Augusta', description: 'The best in the country.', url: 'http://www.kauaigolfclubrentals.com/wp-content/uploads/2011/09/kiahuna-golf-course-kauai.jpg' },
    { id: 1, title: 'Pebble Beach', description: 'The best in the west.', url: 'http://www.clubcorp.com/var/ezflow_site/storage/images/media/clubs/teal-bend-media-folder/images/facilities/golf-course/tealbendgolfclub-hole16-960x410.jpg/3836500-1-eng-US/TealBendGolfClub-Hole16-960x410.jpg_rotatingGalleryFront.jpg' },
    { id: 2, title: 'City Course', description: 'Everyone likes it.', url: 'http://www.glengolfdesign.com/docs/golf-course-green.jpg' }
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
