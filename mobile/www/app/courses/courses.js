angular.module('app.courses', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.course-index', {
    url: '/courses',
    views: {
      'courses-tab': {
        templateUrl: 'app/courses/courses.html',
        controller: 'CourseIndexCtrl'
      }
    }
  });
})

.controller('CourseIndexCtrl', function($scope, CourseService) {
  $scope.courses = CourseService.all();
});
