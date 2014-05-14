var Datastore = require('nedb');
var express = require('express');

// require('nw.gui').App.dataPath in future?
var db = new Datastore({ filename: 'target-grunt/datafile.nedb', autoload: true });
var app = express();

app.use(require('body-parser')());      // to support JSON-encoded bodies
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
});

app.get('/', function(req, res) {
	res.send({
		links: [
	        {
	        	method: 'GET',
	        	path: '/calendar/default',
	        	description: 'Get the default calendar'
	        },
	        {
	        	method: 'POST',
	        	path: '/calendar/default',
	        	description: 'Create an X for the calendar'
	        }
		]
	});
});

app.get('/calendar/default', function(req, res) {
	db.find({ name: 'default' }, function(err, docs) {
		if (docs.length === 0) {
			res.send(404, 'No calendar with name "default".');
		} else {
			res.send(docs[0]);
		}
	});
//	res.send({
//		name : 'default',
//		dates : {
//			'2014' : {
//				'5' : [ '6', '7', '8', '15' ]
//			}
//		}
//	});
});

app.post('/calendar/default', function(req, res) {
	var date = req.body;
	console.log(date);
	db.find({ name: 'default' }, function(err, docs) {

		var dates;

		if (docs.length === 0) {

			console.log('No calendar found: "default"');
			console.log('Creating new calendar: "default"');

			var months = {};
			months[date.month.toString()] = [ date.day.toString() ];

			dates = {};
			dates[date.year.toString()] = months;

			var calendar = {
				name: 'default',
				dates: dates
			}

			db.insert(calendar, function(err, newDoc) {
				console.log('Created new calendar' + newDoc);
				res.send(200, 'Created new calendar "default".');
			});

		}

		else {
			var dates = docs[0];
			console.log(dates);
			res.send(200, 'Date added');
		}
	});
});

// Longest Streak
//   - Days
//   - Start date
//   - End date

// Each day

app.listen(9001, function() {
  console.log('Server listening on port 9001');
});
