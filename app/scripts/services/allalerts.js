angular.module('drycareClientApp').factory('AllAlerts', ["$http", "api_settings", "$resource", "api", function ($http, api_settings, $resource, api) {
    api.init();
    
    var url = api_settings.url+":"+api_settings.port;
    return $resource(url+'/api/alerts/', {});
}]);