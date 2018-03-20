var express = require('express');
var apis = require('./routes/api');

var app = express();

app.use('/api/1.0/', apis);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.send('AR Viewer');
});

app.post('/', function(req, res) {
  res.send('Get a post request');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('ARViewer app is listening at http://%s:%s', host, port);
});