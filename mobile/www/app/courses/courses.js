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

.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    var content = element.find('a');
    content.css({
      'background': 'url(' + url + ')'
    });
  };
})

.controller('CourseIndexCtrl', function($scope, CourseService) {
  $scope.courses = CourseService.all();
});
