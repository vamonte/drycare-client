'use strict';

angular.module('drycareClientApp').controller('AlertsControler',["$scope", 'AllAlerts', '$routeParams', function ($scope, AllAlerts, $routeParams) {
  var limit = 20;
  var offset = 0;
  $scope.previous_state = "disabled";
  $scope.next_state = "";
  var _get = function(){
    return AllAlerts.query({limit: limit, offset: offset});
  };
  var _decrement_offset = function(){
    offset = offset - limit;
    if(offset === 0){
        $scope.previous_state = "disabled";
    }
  };

  $scope.previous_page = function(){
    if(offset > 0){
        _decrement_offset();
        _get().$promise.then(function(datas){
            $scope.datas = datas;
        }, function(){});
       $scope.next_state = "";
    }
  };

  $scope.next_page = function(){
    offset = offset + limit;
    $scope.previous_state = "";
    _get().$promise.then(function(datas){
        if(datas.length > 0){
            $scope.datas = datas;
        }else{
            _decrement_offset();
            $scope.next_state = "disabled";
        }
    }, function(){});
  };
  $scope.datas = _get();
}]);
