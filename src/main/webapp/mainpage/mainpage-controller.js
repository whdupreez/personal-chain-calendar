angular.module('chain-calendar.mainpage', ['chain-calendar.components.calendar'])

.controller('MainPageCtrl', ['$scope', '$location', 'CalendarResourceFactory', function($scope, $location, CalendarResourceFactory) {

	var loadCalendar = function(dates) {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month'
			},
			editable: true,
			dayClick : function(date, allDay, jsEvent, view) {
				var cell = $(this);
				cell.toggleClass('cross');
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				console.log(y + '-' + m + '-' + d);
			}
		});
	}

	var defaultCalendar = CalendarResourceFactory.create().get({ calendarId: 'default' }, function() {
		console.log(defaultCalendar);
		loadCalendar(defaultCalendar.dates);
	});

}]);
