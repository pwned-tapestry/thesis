angular.module('app.invite', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.invite', {
    url: '/invite',
    views: {
      'invite-tab': {
        templateUrl: 'app/invite/invite.html'
      }
    }
  });
});
