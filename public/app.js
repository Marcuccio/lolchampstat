(function(){
    
    var app = angular.module('store', [ ]);
    console.log("qui dovrebbe");
    app.controller('ChampController', function($scope, $http){
        console.log("entrato nel controller");

        $https.get('https://lolchampstat.herokuapp.com/champ_file.json')
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