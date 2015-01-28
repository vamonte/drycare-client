angular.module('drycareClientApp').factory('Consumption', ["$http", "api_settings", "$resource", "api", function ($http, api_settings, $resource, api) {
    api.init();
    var url = api_settings.url+":"+api_settings.port;
    return $resource(url+'/api/patients/:pid/consuptions', {pid:'@_id.$oid'});
}]);