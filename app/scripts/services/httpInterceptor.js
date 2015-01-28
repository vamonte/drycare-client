'use strict';

angular.module('drycareClientApp').factory('httpInterceptor', function httpInterceptor ($q, $window, $location, $cookieStore, $injector) {
  return function (promise) {
      var success = function (response) {
          return response;
      };

      var error = function (response) {
          if (response.status === 401) {
              $injector.get("authorization").logout();
              $location.url('/login');
          }

          return $q.reject(response);
      };

      return promise.then(success, error);
  };
});