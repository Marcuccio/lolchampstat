(function(){
    
    var app = angular.module('stats', [ ]);
    console.log("qui dovrebbe");
    app.controller('ChampController', function($scope, $http){
        $scope predicate = '-name';

        $http.get('https://lolchampstat.herokuapp.com/champ_file.json')
            .success(function(data, status, headers, config) {
                $scope.c = data;
                console.log(c);
            })
            .error(function(data, status, headers, config) {
              // log error
                console.log("errore nella get");
            });
    });
    
})();