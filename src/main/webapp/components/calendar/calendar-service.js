angular.module('chain-calendar.components.calendar', [])

.factory('CalendarResourceFactory', ['$resource', function($resource) {
	return {
		create: function() {
			var Calendar = $resource('http://localhost:9001/calendar/:calendarId', {
				calendarId : '@id'
			});
			return Calendar;
		}
	};
}]);