angular.module('chain-calendar.components.calendar', [])

.factory('CalendarResourceFactory', ['$resource', '$http', function($resource, $http) {

	var Calendar = function() {
		this.data = null;
		this.templateUrl = 'http://localhost:9001/calendar/:name/';
		this.url = 'http://localhost:9001/calendar/';
		this.params = {};
		this.name = null;
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

		this.name = args.name;
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

	Calendar.prototype.cross = function(simpleDate) {

		if (!this.name) {
			throw new Error('\'name\' not defined. Fetch Calender first.');
		}

		return $http({
			method: 'POST',
			url: this.url,
//			params: this.params,
			data: simpleDate,
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