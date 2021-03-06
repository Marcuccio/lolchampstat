(function(){
   var coeff = {
		"f1":"",
		"f2":"",
		"f3":"",
		"a1":"",
		"a2":"",
		"a3":"",
	}; 
	var app =angular.module('stats', ['ngSanitize'], function($compileProvider) {
    // configure new 'compile' directive by passing a directive
    // factory function. The factory function injects the '$compile'
    $compileProvider.directive('compile', function($compile) {
      // directive factory creates a link function
      return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile);
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
        );
      };
    });
  });

	app.controller('ChampController', function($scope, $http){

		$http.get('https://lolchampstat.herokuapp.com/champ_file.json')
			.success(function(data, status, headers, config) {
				$scope.c = data;
			})
			.error(function(data, status, headers, config) {
			  // log error
				 console.log("errore nella get");
			})
	});
		
	app.controller('ModalController', ['$scope', '$http', function($scope, $http){
		this.loadModal = function(id){
			$http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/'+id+'?locale=it_IT&champData=passive,skins,spells&api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8')
			.success(function(data, status, headers, config) {
				$scope.m = data;
				$scope.passive = $scope.m.passive.sanitizedDescription;
				$scope.Q = $scope.m.spells[0].tooltip;
				$scope.W = $scope.m.spells[1].tooltip;
				$scope.E = $scope.m.spells[2].tooltip;
				$scope.R = $scope.m.spells[3].tooltip;
			});			
		}
	}]);
	
	app.controller("PanelController", ['$scope', function($scope){ 
		this.tab=4;

		this.selectTab = function(setTab){
			this.tab=setTab;
			$scope.e1 = $scope.m.spells[setTab].effectBurn[1];
			$scope.e2 = $scope.m.spells[setTab].effectBurn[2];
			$scope.e3 = $scope.m.spells[setTab].effectBurn[3];
			$scope.e4 = $scope.m.spells[setTab].effectBurn[4];
			$scope.e5 = $scope.m.spells[setTab].effectBurn[5];
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};	
	}]);
    
})();