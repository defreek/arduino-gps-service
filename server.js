'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var gpsutil = require('./handlers/gpsutils');

app.use( bodyParser.json() );

app.post('/gps/pointinpolygon', gpsutil.isPointInPolygon);

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);

});
