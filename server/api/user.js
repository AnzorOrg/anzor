var User = require('../models/user.js');
const crypto = require('crypto');
var Auth = require('../auth.js')

var UserAPI = function(app){
	app.post('/api/create-user', function(req, res){
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

	app.get('/api/signout', Auth.restrict, function(req,res){
		req.session.destroy(function(){
    		res.redirect('/');
  		});
	});

	app.get('/api/signed-in', function(req,res){
		if(req.session.user){
			res.json({
				email: req.session.user.email,
				firstName: req.session.user.firstName,
				lastName: req.session.user.lastName
			});
		}
		else {
			res.json(null);
		}
	});

	app.get('/api/notifications', Auth.restrict, function(req, res){
		User.findOne({email: req.session.user.email}).exec(function(err, user){
			req.session.user.notifications = user.notifications;
			res.json({notifications: user.notifications});
		});
	});

	app.get('/api/my-teams', Auth.restrict, function(req, res){
		res.json({teams: req.session.user.teams});
	});
}

module.exports = UserAPI;