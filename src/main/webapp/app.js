var app = angular.module('chain-calendar.app', [
	'ngRoute',
	'ngResource',
	'chain-calendar.header',
	'chain-calendar.mainpage',
	'chain-calendar.templates',
	'chain-calendar.components.calendar'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'mainpage/mainpage.tpl.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);