angular.module('chain-calendar.components.calendar')

.factory('CalendarUtils', [ function() {

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

	var showCalendar = function(dates, onDayClicked) {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month'
			},
			editable: true,
			dayClick: function(date, allDay, jsEvent, view) {
				var cell = $(this);
				onDayClicked(date, cell);
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
	};

	var utils = {
		toggleCell: toggleCell,
		toSimpleDate: toSimpleDate,
		// TODO Directive
		showCalendar: showCalendar
	};

	return utils;

}]);