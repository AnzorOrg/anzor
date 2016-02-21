var Auth = require('../auth.js');
var Team = require('../models/team.js');
var User = require('../models/user.js');
var Helper = require(__dirname+'/team-helper.js');

var TeamAPI = function(app){
	app.post('/api/team', Auth.restrict, function(req, res){
		Team.findOne({teamName:req.body.team}).exec(function(err, team){
			console.log(team);
			if(!team || (team.members.indexOf(req.session.user.email)==-1 && team.admins.indexOf(req.session.user.email)==-1))
				res.json(null);
			else
				res.json(team);
		});
	});

	app.post('/api/create-team', Auth.restrict, function(req, res){
		var newTeam = new Team({teamName: req.body.name, admins: [req.session.user.email]});
		console.log(newTeam);
		newTeam.save({isNew:true}, function(err){
			if(err){
				res.status(500).json(err);
			}
			else{
				User.findOne({email:req.session.user.email}).exec(function(err, user){
					user.teams.push(req.body.name);
					user.save({isNew:false}, function(err){
						if(err)
							res.status(500).json(err);
						else
							res.status(200).json(newTeam);
					});
				});
			}
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
							res.status(500).json(err);
						else
							res.status(200).json({msg: 'request sent'});
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
									res.status(500).json(err);
								else
									res.status(200).json({msg: 'invite sent'});
							});
						}
					});
				}
			}
		});
	});

	app.post('/api/remove-user', Auth.restrict, function(req, res){
		Helper.leaveGroup(req.body.email, req.body.team, req.session.user.email);
	});

	app.post('/api/leave-team', Auth.restrict, function(req, res){
		Helper.leaveGroup(req.session.user.email, req.body.team, null);
	});

	app.post('/api/make-announcement', Auth.restrict, function(req, res){
		Team.findOne({teamName: req.body.team}).exec(function(err, team){
			if(team){
				if(team.admins[0] == req.session.user.email){
					team.announcements.push({title: req.body.title, author: req.session.user.firstName, body: req.body.body});
					team.save({isNew:false}, function(err){
						if(err)
							res.json(err);
						else
							res.status(200).json({msg:'announcement posted'});
					});
				}
				else{
					res.json({err: 'You are not admin'});
				}
			}
			else{
				res.json({err:'Team does not exist'});
			}
		});
	});

	app.post('/api/get-team', Auth.restrict, function(req, res){
		Team.findOne({teamName: req.body.team}).exec(function(err, team){
			if(team) {
				res.json(team);
			} else{
				res.json({err:'Team does not exist'});
			}
		});
	});
}

module.exports = TeamAPI;