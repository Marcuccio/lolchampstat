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
		$this.attr('data-id');
			console.log(id);
		}; 
	});
    
})();