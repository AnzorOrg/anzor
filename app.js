'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var Auth = require(__dirname+'/server/auth.js');
var API = require(__dirname+'/server/api/api.js');

mongoose.connect('mongodb://130.211.185.244:27017/mydb');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/webapp/dist'));

Auth(app);
API(app);

app.use(function(req, res){
	res.status(200).sendFile(__dirname+'/webapp/dist/index.html');
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
