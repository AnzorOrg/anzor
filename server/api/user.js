var User = require('../models/user.js');
const crypto = require('crypto');
var Auth = require('../auth.js')

var UserAPI = function(app){
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
}

module.exports = UserAPI;