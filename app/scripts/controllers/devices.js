var DevicesController = function($scope, $cookies, $modal, Devices, $injector, $compile, $routeParams) {
    $injector.invoke(BaseController, this, {$scope: $scope, DataStorage:Devices, $routeParams:$routeParams});
    this.$modal = $modal;
    this.$scope.list_title = "Devices list";
    this.$scope.detail_title = "Device detail";
    this.$scope.add_title = "New device";
    this.$scope.empty_list_msg = "No devices found";

    this.$scope.fields = [
        {"label": "Device id",
         "key": "did",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                }
        },
        {"label": "Name",
         "key": "name",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                }
        },
        {"label": "Location",
         "key": "location",
         "type": "text",
         "edit": {"display": true,
                  "required": true
                }
        },

    ];

};

DevicesController.prototype = Object.create (BaseController.prototype);

angular.module('drycareClientApp')
  .controller('DevicesController',['$scope', '$cookies', '$modal', "Devices", "$injector", "$compile", "$routeParams", DevicesController]);
