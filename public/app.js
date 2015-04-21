(function(){
    
    var app = angular.module('stats', [ ]);
    console.log("qui dovrebbe");
    app.controller('ChampController', function($scope, $http){
        console.log("entrato nel controller");

        $http.get('https://lolchampstat.herokuapp.com/champ_file.json')
            .success(function(data, status, headers, config) {
                $scope.c = data;
                console.log("FATTO");
            })
            .error(function(data, status, headers, config) {
              // log error
                console.log("errore nella get");
            });
    });
    
})();