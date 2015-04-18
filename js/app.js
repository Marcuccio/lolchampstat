(function(){
    
    var app = angular.module('store', [ ]);
    
    app.controller('ChampController', function($scope, $http){
        $http.get('/champ_file.json').
            success(function(data, status, headers, config) {
                c = data;
                console.log("FATTO");
            }).
            error(function(data, status, headers, config) {
              // log error
            });
    });
    
})();