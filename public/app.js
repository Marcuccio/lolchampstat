(function(){
    
    var app = angular.module('store', [ ]);
    
    app.controller('ChampController', function($scope, $http){
        $https.get('https://lolchampstat.herokuapp.com/champ_file.json').
            .success(function(data, status, headers, config) {
                $scope.c = data;
                console.log("FATTO");
            }).
            .error(function(data, status, headers, config) {
              // log error
            });
    });
    
})();