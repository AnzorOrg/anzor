var Team = require('../models/team.js');
var User = require('../models/user.js');
var Helper = {};

Helper.leaveGroup = function(username, teamName, admin){
	Team.findOne({teamName: teamName}).exec(function(err, team){
		if(!team){
			res.json({err:'Team does not exist'});
		}
		else{
			if(admin && team.admins[0] != admin){
				res.json({err:'You are not the admin of this team'});
			}
			else{
				var index = team.members.indexOf(username);
				if(index != -1){
					team.members.splice(index, 1);
					team.save({isNew:false}, function(err){
						console.log(err);
					});
				}
				User.findOne({email:userName}).exec(function(err, user){
					if(user){
						var userIndex = user.teams.indexOf(teamName);
						if(userIndex != -1){
							user.teams.splice(userIndex, 1);
						}
						if(admin)
							user.notifications.push({email: req.session.user.email, firstName: req.session.user.firstName, lastName: req.session.user.lastName, team: team.teamName, type:'kicked', read:false});
						user.save({isNew:false}, function(err){
							console.log(err);
							res.json({msg:'user removed'});
						});
					}
					else{
						res.json({err:'User does not exist'});
					}
				});
			}
		}
	});
}

module.exports = Helper;