var Auth = require('../auth.js');
var Team = require('../models/team.js');
var User = require('../models/user.js')

var TeamAPI = function(app){
	app.post('/api/createTeam', Auth.restrict, function(req, res){
		var newTeam = new Team({teamName: req.body.name, admins: [req.session.user.email]});
		newTeam.save({isNew:true}, function(err){
			if(err){
				res.json(err);
			}
			else
				res.status(200).end();
		});
	});

	app.post('/api/requestJoin', Auth.restrict, function(req, res){
		var teamName = req.body.team;
		Team.findOne({teamName: teamName}).exec(function(err, team){
			if(!team){
				res.json({err:'Team does not exist'});
			}
			else {
				User.findOne({email: team.admins[0]}).exec(function(err,admin){
					admin.notifications.push({email:req.session.email, firstName: req.session.firstName, lastName: req.session.lastName, team: teamName, type: 'join-request'});
					admin.save({isNew:false},function(err){
						if(err)
							res.json(err);
						else
							res.status(200).end();
					})
				});
			}
		});
	});
}

module.exports = TeamAPI;