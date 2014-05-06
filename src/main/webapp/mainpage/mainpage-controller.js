angular.module('chain-calendar.mainpage', [])

.controller('MainPageCtrl', ['$scope', '$location', function($scope, $location) {

//	var date = new Date();
//	var d = date.getDate();
//	var m = date.getMonth();
//	var y = date.getFullYear();

//	var User = $resource('/user/:userId', {userId:'@id'});
//	  var user = User.get({userId:123}, function() {
//	    user.abc = true;
//	    user.$save();
//	  });

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
//			right: 'month,agendaWeek,agendaDay'
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

}]);
