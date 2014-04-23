var app = angular.module('chain-calendar.app', [
	'ngRoute',
	'chain-calendar.header',
	'chain-calendar.mainpage',
	'chain-calendar.templates'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'mainpage/mainpage.tpl.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);