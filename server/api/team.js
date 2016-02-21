var Auth = require('../auth.js');
var Team = require('../models/team.js');
var User = require('../models/user.js')

var TeamAPI = function(app){
	app.post('/api/create-team', Auth.restrict, function(req, res){
		var newTeam = new Team({teamName: req.body.name, admins: [req.session.user.email]});
		newTeam.save({isNew:true}, function(err){
			if(err){
				res.json(err);
			}
			else
				res.json(newTeam);
		});
	});

	app.post('/api/request-join', Auth.restrict, function(req, res){
		var teamName = req.body.team;
		Team.findOne({teamName: teamName}).exec(function(err, team){
			if(!team){
				res.json({err:'Team does not exist'});
			}
			else{
				User.findOne({email: team.admins[0]}).exec(function(err,admin){
					admin.notifications.push({email:req.session.user.email, firstName: req.session.user.firstName, lastName: req.session.user.lastName, team: teamName, type: 'join-request', read:false});
					admin.save({isNew:false},function(err){
						if(err)
							res.json(err);
						else
							res.status(200).end();
					});
				});
			}
		});
	});

	app.post('/api/invite', Auth.restrict, function(req, res){
		var teamName = req.body.team;
		Team.findOne({teamName: teamName}).exec(function(err, team){
			if(!team){
				res.json({err:'Team does not exist'});
			}
			else{
				if(team.admins[0] != req.session.user.email){
					res.json({err: 'You are not the admin of this team'});
				}
				else{
					User.findOne({email:req.body.email}).exec(function(err, user){
						if(!user){
							res.json({err:'User does not exist'});
						}
						else{
							user.notifications.push({email:req.session.user.email, firstName: req.session.user.firstName, lastName: req.session.user.lastName, team: teamName, type: 'invite', read:false});
							user.save({isNew:false},function(err){
								if(err)
									res.json(err);
								else
									res.status(200).end();
							});
						}
					});
				}
			}
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

module.exports = TeamAPI;