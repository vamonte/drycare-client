'use strict';

/**
 * @ngdoc function
 * @name drycareClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the drycareClientApp
 */
angular.module('drycareClientApp')
  .controller('MainCtrl', function ($scope, $cookies, $modal, Patients) {
  var limit = 2;
  var offset = 0;
  $scope.filters = "";
  $scope.patients = undefined;

  var _get_patients = function(){
    return Patients.query({"limit":limit, "offset": offset,
                           "filters": $scope.filters});
  };

  var _is_current_patient_in_array = function(array){
    var res = false;
    if($scope.current_patient !== undefined){
      for(var i=0; i<array.length; i++){
          if(array[i].bracelet === $scope.current_patient.bracelet){
            res = true;
            break;
          }
      }
    }
    return res;
  };
  var get_patients = function(){
      _get_patients().$promise.then(
            function(datas){
              $scope.patients = datas;
              if(!_is_current_patient_in_array(datas)){  
                  $scope.update_current($scope.patients[0]);           
              }
             },
            function(error){});
  }
  var _decrement_page = function(){
        offset = offset - limit;
        if(offset === 0){
            $scope.previous_state = "disabled";
        }
  };
  var _init = function(){
      get_patients();
      $scope.previous_state = "disabled";
      $scope.next_state = "";
  };
  _init();
  
  $scope.next_page = function(){
    if($scope.next_state === ""){
        offset = offset + limit;
        var patients = _get_patients().$promise.then(
            function(datas){
                if(datas.length > 0){
                    $scope.patients = datas;
                    $scope.update_current($scope.patients[0]);
                }else{
                    _decrement_page();
                    $scope.next_state = "disabled";
                }
            },
            function(error){}
        );
        $scope.previous_state = "";
    }
  };
  $scope.previous_page = function(){
    if(offset>0){
        _decrement_page();
        get_patients();
        $scope.next_state = "";
    }
  };

  var _set_current_tab = function(tab_name){
      $scope.current_tab = tab_name;
  };
  
  $scope.set_current_tab_to_profile = function(){
    _set_current_tab("profile");
  };

  $scope.set_current_tab_to_edit = function(){
    _set_current_tab("edit");
  };
  $scope.set_current_tab_to_profile();

  var _set_current_wdw = function(wdw_name){
    $scope.current_wdw = wdw_name;
  }

  $scope.set_current_wdw_to_add = function(){
    _set_current_wdw("add");
    $scope.current_patient = {};
  }

  var _set_current_wdw_to_view = function(){
    _set_current_wdw("view");
    $scope.set_current_tab_to_profile();
  };
  _set_current_wdw_to_view();


  $scope.update_current = function(patient){
      $scope.current_patient = patient;
      $scope.edit_current_patient = angular.copy(patient);
      $scope.set_current_tab_to_profile();
      _set_current_wdw_to_view();
  };

  $scope.search = function(){
    offset = 0;
    get_patients();
    $scope.next_state = "";
  }

  $scope.update_user = function(){
    
    $scope.edit_current_patient.$update(function(data){
      $scope.update_current(data);
      for(var i=0; i<$scope.patients.length; i++){
        if($scope.patients[i]._id.$oid === data._id.$oid){
          $scope.patients[i] = data;
          break;
        }
      }
      $scope.set_current_tab_to_profile();
    },function(){});
  }
  

  $scope.open_graph = function () {

    var modalInstance = $modal.open({
      templateUrl: 'views/modal_graph.html',
      controller: "ModalGraph",
      size: "lg",
      resolve: {
        patient: function(){
          return $scope.current_patient;
        }
      }
    });

    modalInstance.result.then(function () {},
                              function () {});
  };
  
});
