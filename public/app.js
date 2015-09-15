(function(){
    
	var app = angular.module('stats', ['ngSanitize']);

	app.controller('ChampController', function($scope, $http){
		$scope.predicate = 'name';
		$scope.c;
		$http.get('https://lolchampstat.herokuapp.com/champ_file.json')
			.success(function(data, status, headers, config) {
				$scope.c = data;
			})
			.error(function(data, status, headers, config) {
			  // log error
				 console.log("errore nella get");
			})
		$scope.tagsIncludes = [];
		$scope.includeTags = function(tag) {
		  var i = $.inArray(tag, $scope.tagsIncludes);
		  if (i > -1) {
				$scope.tagsIncludes.splice(i, 1);
		  } else {
			  console.log(tag);
			  $scope.tagsIncludes.push(tag);
		  }
		}
		$scope.tagsFilter = function(tag) {
		  if ($scope.tagsIncludes.length > 0) {
				if ($.inArray(c.champions.tags, $scope.tagsIncludes) < 0){
				return;    
				}
		  }
		  return c;
		}
	});
		

	app.controller('ModalController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
		this.loadModal = function(id){
			console.log(id);
			$http.get('https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/'+id+'?locale=it_IT&champData=passive,skins,spells&api_key=2ccc4671-a16b-461e-8ce3-8c59efec08b8')
			.success(function(data, status, headers, config) {
				 $scope.m = data;
			});
			
			$scope.trustSnippet = function(snippet) {
               return $sce.trustAsHtml(snippet);
			};
		}
	}]);
	
	app.controller("PanelController", function(){ 
		this.tab=1;

		this.selectTab = function(setTab){
			this.tab=setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};	
	});

    
})();