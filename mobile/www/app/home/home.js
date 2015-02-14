angular.module('app.home', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'app/home/home.html'
      }
    }
  });
});
