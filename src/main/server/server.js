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
	res.send({
		name : 'default',
		dates : {
			'2014' : {
				'5' : [ '6', '7', '8', '15' ]
			}
		}
	});
});

app.post('/calendar/default', function(req, res) {
	console.log(req.body);
	res.send(req.body);
});

// Longest Streak
//   - Days
//   - Start date
//   - End date

// Each day

app.listen(9001, function() {
  console.log('Server listening on port 9001');
});
