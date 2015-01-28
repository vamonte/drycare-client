angular.module('drycareClientApp').factory('MinConsuption', ["$http", "api_settings", "$resource", "api", function ($http, api_settings, $resource, api) {
    api.init();
    var url = api_settings.url+":"+api_settings.port;
    return $resource(url+'/api/patients/:pid/min_consuptions', {pid:'@_id.$oid'});
}]);