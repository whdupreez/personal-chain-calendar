angular.module('chain-calendar.mainpage', ['chain-calendar.components.calendar'])

.controller('MainPageCtrl', ['$scope', '$location', 'CalendarResourceFactory', function($scope, $location, CalendarResourceFactory) {

	var toggleCell = function(cell) {
		cell.toggleClass('cross');
	};

	var showCalendar = function(dates) {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month'
			},
			editable: true,
			dayClick: function(date, allDay, jsEvent, view) {
				var cell = $(this);
				toggleCell(cell);
			},
			dayRender: function(date, cell) {
				var d = date.getDate().toString();
				var m = date.getMonth() + 1;
				var y = date.getFullYear();
				console.log(d);
				if (dates[y] && dates[y][m] && dates[y][m].indexOf(d) != -1) {
					
					toggleCell(cell);
				}
			}
		});
	}

	var defaultCalendar = CalendarResourceFactory.create().get({ calendarId: 'default' }, function() {
		showCalendar(defaultCalendar.dates);
	});

}]);
