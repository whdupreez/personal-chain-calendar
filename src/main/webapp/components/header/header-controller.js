angular.module('chain-calendar.header', [])

.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.open = function (path) {
		$location.path(path);
	};

}]);