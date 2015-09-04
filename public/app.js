(function(){
    
	var app = angular.module('stats', [ ]);

	app.controller('ChampController', function($scope, $http){
		$scope.predicate = 'name';
		$http.get('https://lolchampstat.herokuapp.com/champ_file.json')
			.success(function(data, status, headers, config) {
				 $scope.c = data;
			})
			.error(function(data, status, headers, config) {
			  // log error
				 console.log("errore nella get");
			});
		});
	
	app.controller('ModalController', function($scope, $http){
		this.loadModal = function(id){
			console.log(id);
			$http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/'+id+'?champData=all,passive,spells&api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8')
			.success(function(data, status, headers, config) {
				 $scope.m = data;
			})
			.error(function(data, status, headers, config) {
			  // log error
				 console.log("errore nella get");
			});
		});
		}; 
	});
    
})();