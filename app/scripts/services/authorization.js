'use strict';

angular.module('drycareClientApp').factory('authorization', function ($http, api_settings, $cookieStore) {
  
  var user_auth = $cookieStore.get("drycare_users_auth");
  var get_user = function() {
    return user_auth;
  };
  
  var _logout = function() {
    user_auth = undefined;
    $cookieStore.remove("drycare_users_auth");
  };

  var _login = function(credentials, success, error){
        var authorization = credentials.username +':'+ credentials.password;
        var url = api_settings.url+":"+api_settings.port;
        $http.defaults.headers.common.Authorization = "Basic "+Base64.encode(authorization);
        $http.get(url+"/api/token").success(function(data){
            user_auth = {token: data.token,
                         username: credentials.username}
            $cookieStore.put("drycare_users_auth", user_auth);
            success(data)
        }).error(error);
  };    $http.defaults.headers.common.Authorization = undefined;
  return {
      login: _login,
      get_user: get_user,
      logout: _logout,
  };
});
