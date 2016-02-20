var UserAPI = require(__dirname+'/user.js');
var TeamAPI = require(__dirname+'/team.js')

var API = function(app){
	UserAPI(app);
	TeamAPI(app);
}

module.exports = API;