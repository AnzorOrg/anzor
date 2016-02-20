var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	teamName: {type: String, required: true, unique: true},
	users: [String]
});

var Team = mongoose.model('Team', userSchema);

module.exports = Team