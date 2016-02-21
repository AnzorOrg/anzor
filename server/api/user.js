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
				Auth.authenticate(req, res);
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
			res.json({notifications: user.notifications});
		});
	});

	app.get('/api/my-teams', Auth.restrict, function(req, res){
		User.findOne({email: req.session.user.email}).exec(function(err, user){
			res.json({teams: user.teams});
		});
	});

	app.post('/api/accept-join-request', Auth.restrict, function(req, res){
		User.findOne({email:req.session.user.email}).exec(function(err, admin){
			var notif = admin.notifications.id(req.body.id);
			if(!notif.read){
				notif.read = true;
				var email = notif.email;
				var teamName = notif.team;
				admin.save({isNew:false}, function(err){
					if(err)
						console.log(err);
				});
				User.findOne({email: email}).exec(function(err, user){
					user.teams.push(teamName);
					user.notifications.push({email: admin.email, firstName: admin.firstName, lastName: admin.lastName, team: teamName, type: 'accept-join-request', read:false});
					user.save({isNew:false}, function(err){
						if(err)
							console.log(err);
					});
				});
				Team.findOne({teamName:teamName}).exec(function(err, team){
					team.members.push(email);
					team.save({isNew:false}, function(err){
						if(err)
							console.log(err);
					});
				});
				res.json({message:'sending accept message'});
			}
			else{
				res.json({message:'Already responded to this notification'});
			}
		});
	});

	app.post('/api/accept-invite', Auth.restrict, function(req, res){
		User.findOne({email: req.session.user.email}).exec(function(err, user){
			var notif = user.notifications.id(req.body.id);
			if(!notif.read){
				notif.read = true;
				var adminEmail = notif.email;
				var teamName = notif.team;
				user.teams.push(teamName);
				user.save({isNew:false}, function(err){
					if(err)
						console.log(err);
				});
				User.findOne({email:adminEmail}).exec(function(err, admin){
					admin.notifications.push({email:user.email, firstName:user.firstName, lastName:user.lastName, team: teamName, type: 'accept-invite', read:false});
					admin.save({isNew:false}, function(err){
						if(err)
							console.log(err);
					});
				});
				Team.findOne({teamName:teamName}).exec(function(err, team){
					team.members.push(user.email);
					team.save({isNew:false}, function(err){
						if(err)
							console.log(err);
					});
				});
				res.json({message:'sending accept message'});
			}
			else{
				res.json({message:'Already responded to this notification'});
			}
		});
	});
}

module.exports = UserAPI;