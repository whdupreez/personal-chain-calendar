angular.module('chain-calendar.components.calendar', [])

.factory('CalendarResourceFactory', ['$resource', '$http', function($resource, $http) {

	var Calendar = function() {
		this.data = null;
		this.templateUrl = 'http://localhost:9001/calendar/:name/';
		this.url = 'http://localhost:9001/calendar/';
		this.params = {};
	};

	Calendar.prototype.get = function(args) {

		if (!args) {
			args = {};
		}
		if (!args.name) {
			args.name = '';
		}
		if (!args.params) {
			args.params = this.params;
		} else {
			this.params = args.params;
		}

		this.url = this.templateUrl.replace(':name', args.name);

		var parent = this;

		return $http({
			method: 'GET',
			url: this.url,
			params: this.params,
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.success(function(data, status, headers, config) {
			parent.data = data;
		})
		.error(function(data, status, headers, config) {
			parent.data = null;
		});

	};

	return {
		create: function() {
			return new Calendar();
		}
	};
}]);