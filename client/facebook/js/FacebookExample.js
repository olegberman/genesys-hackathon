angular.module('FacebookExample', [])

.controller('FacebookExampleController', function($scope, $http) {

  $scope.username = '';
  $scope.password = '';
  $scope.usernameInvalid = false;
  $scope.passwordInvalid = false;

  $scope.login = function() {

    if($scope.username.length < 1) {
      $scope.usernameInvalid = true;
      return;
    }

    if($scope.password.length < 1) {
      $scope.passwordInvalid = true;
      return;
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
