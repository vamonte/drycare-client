'use strict';

angular.module('drycareClientApp').controller('ModalGraph', ['$scope', '$modalInstance', 'MinConsuption', 'Consumption','patient', function ($scope, $modalInstance, MinConsuption, Consumption, patient) {
    var _x_axis;
    var _sort_keys = function(obj){
        var keys = [];

        for(var key in obj)
        {
            if(obj.hasOwnProperty(key) && key !== "$promise" && key !== "$resolved")
            {
                keys.push(key);
            }
        }

        return keys;
    };
    var _get_sorted_values = function(list, keys){
      var values = []
      for(var key in keys){
        if(list.hasOwnProperty(keys[key])){
            values.push(list[keys[key]]);
        }
      }
      return values;
    };

    $scope.opened = false;
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.$watch('dt', function(newVal) {
        var _dt = $scope.dt.toLocaleDateString().split('/');
        var date = _dt[2]+'-'+_dt[1]+'-'+_dt[0];
        change_chart(date);
        
    });

    var change_chart = function(start_date){
      var consumptions = {10: 0, 14:0, 16:0, 20:0};
      Consumption.query({pid:patient._id.$oid, start_date: start_date}).$promise.then(function(datas){
        for(var i in datas){
          if(datas[i].date !== undefined){
            var hour = new Date(datas[i].date * 1000).getHours();
            var key;
            if(hour < 10){
              consumptions[10] += datas[i].quantity;
              consumptions[14] += datas[i].quantity;
              consumptions[16] += datas[i].quantity;
              consumptions[20] += datas[i].quantity;
            }else if(hour < 14){
              consumptions[14] += datas[i].quantity;
              consumptions[16] += datas[i].quantity;
              consumptions[20] += datas[i].quantity;
            }else if(hour < 16){
              consumptions[16] += datas[i].quantity;
              consumptions[20] += datas[i].quantity;
            }else if(hour < 20){
               consumptions[20] += datas[i].quantity;   
            }
          }
        }
        $scope.chartConfig.series.splice(1,1);
        $scope.chartConfig.series.push({
          data:  _get_sorted_values(consumptions, _x_axis),
          color: "red",
          name: "Daily consumption"
        });
        $scope.chartConfig.loading = false;
      }, function(){});
    };

    var init_chart = function(datas){
      _x_axis = _sort_keys(datas);
      var _values = _get_sorted_values(datas, _x_axis);
      $scope.chartConfig = {
          options: {
              chart: {
                  type: 'line',
              }
          },

          series: [{
              data: _values,
              color: "",
              name: "Min daily consumption"
          }],
          title: {
              text: patient.firstname+" "+patient.lastname+"'s Consumptions",
          },
          xAxis: {categories: _x_axis},
          loading: true
      };
    };

    MinConsuption.get({pid:patient._id.$oid}).$promise.then(function(datas){
      init_chart(datas);
      $scope.dt = new Date();
    },function(){});
    

  }])
