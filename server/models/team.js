var mongoose = require('mongoose');
var Announcement = require(__dirname+'/announcement.js');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	teamName: {type: String, required: true, unique: true},
	admins: [String],
	members: [String],
	announcements: [Announcement] 
});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team