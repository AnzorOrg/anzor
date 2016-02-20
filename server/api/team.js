var Auth = require('../auth.js');
var Team = require('../models/team.js');

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
}

module.exports = TeamAPI;