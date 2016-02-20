'use strict';

var express = require('express');
var mongoose = require('mongoose');

const crypto = require('crypto')
var User = require(__dirname+'/server/models/user.js');

mongoose.connect('mongodb://130.211.185.244:27017/mydb');
var app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/webapp/dist'));

app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname+'/webapp/dist/index.html');
});


app.post('/api/login', function(req, res) {
	User.findOne({email:req.email}).exec(function(err, user){
		if(err)
			res.json({email:'Not found'});
		else
			res.json(user);
	});
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
