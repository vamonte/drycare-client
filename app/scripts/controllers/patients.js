var PatientController = function($scope, $cookies, $modal, Patients, $injector, $compile, $routeParams) {
    $injector.invoke(BaseController, this, {$scope: $scope, DataStorage:Patients, $routeParams:$routeParams});
    this.$modal = $modal;
    this.$scope.list_title = "Patients list";
    this.$scope.detail_title = "Patient detail";
    this.$scope.add_title = "New patient";
    this.$scope.empty_list_msg = "No patients found";

    this.$scope.fields = [
        {"label": "Firstname",
         "key": "firstname",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                 }
        },
        {"label": "Lastname",
         "key": "lastname",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                 }
        },
        {"label": "Bracelet",
         "key": "bracelet",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                 }
        },
        {"label": "Age",
         "key": "age",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                 }
        },
        {"label": "Weight",
         "key": "weight",
         "extend_value": "kg",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                 }
        },
        {"label": "Daily consuption",
         "key": "min_consuption_day",
         "extend_value": "L",
         "edit": {"display": false,
                  "required": true
                 }
        },
        {"label": "More",
         "key": null,
         "extend_value": "<a ng-click='open_graph()' class='btn btn-info btn-fab  btn-tab btn-xs mdi-maps-local-drink' href='javascript:void(0)'> <div class='ripple-wrapper'></div></a>",
         "edit": {"display": false,
                  "required": true
                 }
        },
    ];
    
    this.$scope.open_graph = _.bind(this.open_graph, this);


}
PatientController.prototype = Object.create (BaseController.prototype);

PatientController.prototype.open_graph = function(){
    var me = this;
    var modal_instance = this.$modal.open({
      templateUrl: 'views/modal_graph.html',
      controller: "ModalGraph",
      size: "lg",
      resolve: {
        patient: function(){
          return me.$scope.current_item;
        }
      }
    });
};


angular.module('drycareClientApp')
  .controller('PatientController',['$scope', '$cookies', '$modal', "Patients", "$injector", "$compile", "$routeParams", PatientController]);
