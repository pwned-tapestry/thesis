angular.module('app.times', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.times', {
    url: '/times',
    views: {
      'times-tab': {
        templateUrl: 'app/times/times.html'
      }
    }
  });
});
//redirect to times