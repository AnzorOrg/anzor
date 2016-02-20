'use strict';

var express = require('express');
var mongoose = require('mongoose');

const crypto = require('crypto')
var bodyParser = require('body-parser')
var User = require(__dirname+'/server/models/user.js');

mongoose.connect('mongodb://130.211.185.244:27017/mydb');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/webapp/dist'));

app.get('/', function(req, res) {
  res.status(200).sendFile(__dirname+'/webapp/dist/index.html');
});

app.post('/api/createUser', function(req, res){
	var hash = crypt.createHash('sha256').update(req.password).digest('base64');
	req.body.password = hash;
	var newUser = new User(req.body);
	User.findOne({email: req.body.email}).exec(function(err, user){
		if(err)
			newUser.save(function(err){
				res.status(200).end();
			})
	});
});

app.post('/api/login', function(req, res) {
	var hash = crypt.createHash('sha256').update(req.password).digest('base64');
	User.findOne({email:req.email, password:hash}).exec(function(err, user){
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
