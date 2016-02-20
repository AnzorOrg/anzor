'use strict';

var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname+'/webapp/dist/index.html')
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
