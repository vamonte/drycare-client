'use strict';

angular.module('drycareClientApp').controller('headerCtrl', ['$scope', 'authorization', '$location', '$websocket', function ($scope, authorization, $location, $websocket) {
    
    $scope.title = "Drycare";
    $scope.authorization = authorization;
    $scope.$watch('authorization.get_user()', function(newVal) {
        $scope.user = newVal;
        if(newVal !== undefined){
          var ws = new WebSocket('ws://192.168.59.103:8080/ws');
          ws.onopen = function(evt) {alert("aa")};
          ws.onmessage = function(evt){alert(evt.data)};
        }
    });
    $scope.logout = function(){
      authorization.logout();
      $location.path('/login');
    }
   
    
  }])
