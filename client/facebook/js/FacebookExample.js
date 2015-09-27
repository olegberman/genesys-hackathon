angular.module('FacebookExample', [])

.controller('FacebookExampleController', function($scope, $http) {
  $scope.test = '1';

  $scope.login = function() {

    if($scope.username.length < 1) {
      return 1;
    }

    if($scope.password.length < 1) {
      return 2;
    }

    var loginRequest = $http.post('/api/session',
      {
        username: $scope.username,
        password: $scope.password
      }
    );

    loginRequest.then(function(response) {
      console.log(response);
    }, function(response) {
      console.log(response);
    });

  };

});
