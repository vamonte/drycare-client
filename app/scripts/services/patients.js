angular.module('drycareClientApp').factory('Patients', ["$http", "api_settings", "$resource", "api", function ($http, api_settings, $resource, api) {
    api.init();
    var url = api_settings.url+":"+api_settings.port;
    return $resource(url+'/api/patients/:pid', {pid:'@_id.$oid'},
                    {'update': { method:'PUT' }});
}]);