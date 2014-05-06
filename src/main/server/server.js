var Datastore = require('nedb');
var express = require('express');

// require('nw.gui').App.dataPath in future?
var db = new Datastore({ filename: 'target-grunt/datafile.nedb', autoload: true });
var app = express();

app.use(require('body-parser')());      // to support JSON-encoded bodies

app.get('/', function(req, res){
  res.send({
	  name: 'my-cal',
	  dates: {
		  '2014': {
			  '04': [
				  '26',
				  '27',
				  '28'
			  ]
		  }
	  }
  });
});

app.post('/calendar/default', function(req, res) {
	console.log(req.body);
//	res.send(req.body);
});


// Longest Streak
//   - Days
//   - Start date
//   - End date

// Each day

app.listen(9001, function() {
  console.log('Server listening on port 9001');
});
