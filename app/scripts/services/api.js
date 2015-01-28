'use strict';

angular.module('drycareClientApp').factory('api', ["$http", "authorization", "$cookies", function ($http, authorization, $cookies) {
  return {
      init: function (token) {
            if($http.defaults.headers.common.Authorization === undefined){ 
                $http.defaults.headers.common.Authorization ="Basic "+Base64.encode(authorization.get_user().token+":");           
            }
        }

  };
}]);