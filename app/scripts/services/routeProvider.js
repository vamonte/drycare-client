app.run(function($rootScope, authorization, $location) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(authorization.get_user() === undefined){
      if ( next.templateUrl !== "views/login.html" ) {
          $location.path( "/login" );
      }
    }
  });
});