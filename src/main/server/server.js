var Datastore = require('nedb');
var express = require('express');

var db = new Datastore({ filename: 'target-grunt/datafile.nedb', autoload: true });
var app = express();

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

app.listen(9001, function() {
  console.log('Server listening on port 9001');
});
