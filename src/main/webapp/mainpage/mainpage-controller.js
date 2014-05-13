angular.module('chain-calendar.mainpage', ['chain-calendar.components.calendar'])

.controller('MainPageCtrl', ['$scope', '$location', 'CalendarResourceFactory', 'CalendarUtils',
                             function($scope, $location, CalendarResourceFactory, CalendarUtils) {

	var defaultCalendar = CalendarResourceFactory.create();

	defaultCalendar.get({
		name: 'default'
	}).success(function() {
		CalendarUtils.showCalendar(defaultCalendar.data.dates, onDayClicked);
	});

	var updating = false;

	var onDayClicked = function(date, cell) {
		if (!updating) {
			console.log(CalendarUtils.toSimpleDate(date));
			defaultCalendar
				.cross(CalendarUtils.toSimpleDate(date))
				.success(function(data) {
					CalendarUtils.toggleCell(cell);
					updating = false;
				}).error(function(data) {
					updating = false;
				});
		}
	};

}]);
