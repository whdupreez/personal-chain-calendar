angular.module('chain-calendar.mainpage', ['chain-calendar.components.calendar'])

.controller('MainPageCtrl', ['$scope', '$location', 'CalendarResourceFactory', function($scope, $location, CalendarResourceFactory) {

	var defaultCalendar = CalendarResourceFactory.create();

	defaultCalendar.get({
		name: 'default'
	}).success(function() {
		showCalendar(defaultCalendar.data.dates);
	});

	var updating = false;

//	var updateCalendarResource = function(date, cell) {
//		if (!updating) {
//			console.log(toSimpleDate(date));
//			defaultCalendar.$cross({name:'default'}, toSimpleDate(date), function(data) {
//				updating = false;
//				toggleCell(cell);
//			}, function(err) {
//				updating = false;
//			});
//		}
//	};

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
//				updateCalendarResource(date, cell);
			},
			dayRender: function(date, cell) {
				var sd = toSimpleDate(date);
				if (dates[sd.year]
					&& dates[sd.year][sd.month]
					&& dates[sd.year][sd.month].indexOf(sd.day.toString()) != -1) {

					toggleCell(cell);
				}
			}
		});
	}

	var toggleCell = function(cell) {
		cell.toggleClass('cross');
	};

	var toSimpleDate = function(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return {
			day: d,
			month: m,
			year: y
		}
	};

}]);
