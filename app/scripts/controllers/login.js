'use strict';

angular.module('drycareClientApp').controller('auth',["$scope", "$location", "$cookieStore", "authorization", function ($scope, $location, $cookieStore, authorization) {
  $scope.title = 'Authentication';
  $scope.login = function () {
      var credentials = {
          username: this.username,
          password: this.password
      };
      var success = function (data) {
          $location.path('/');
      };

      var error = function (data, status, headers, config) {
          var msg = "Unknow error";
          if(status === 401){
            msg = "User unknwon";
          }else if(status === 500){
            msg = "Server error";
          }
          $scope.errors = _build_errors(msg)
      };

      authorization.login(credentials, success, error);
  };

  var _build_errors = function(msg){
      return {"title": "Errors",
              "msg": msg}
  };
}]);
