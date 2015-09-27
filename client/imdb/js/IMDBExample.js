angular.module('IMDBExample', [])

.controller('IMDBExampleController', function($scope, $http) {
  $scope.isAuthorized = false;

  $scope.requestCode = function() {
    (new Image()).src = 'http://demofacebook.com/api/token';
    $scope.codeSent = true;
  };

  $scope.login = function(code) {
    var recommendationsRequest = $http.get('/api/user?token=' + code);
    recommendationsRequest.then(function(user) {
      user = user.data;
      $scope.user = user;
      $scope.isAuthorized = true;
    }, function() {

    });
  };

});
