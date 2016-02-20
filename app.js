'use strict';

var express = require('express');
var mongoose = require('mongoose');
const crypto = require('crypto')
var bodyParser = require('body-parser')

var Auth = require(__dirname+'/server/auth.js');
var User = require(__dirname+'/server/models/user.js');

mongoose.connect('mongodb://130.211.185.244:27017/mydb');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/webapp/dist'));

Auth(app);

app.post('/api/createUser', function(req, res){
	var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
	req.body.password = hash;
	var newUser = new User(req.body);
	newUser.save({isNew:true}, function(err){
		if(err){
			res.json(err)
		}
		else
			res.status(200).end();
	});
});

app.post('/api/login', function(req, res) {
	Auth.authenticate(req, res);
});

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
