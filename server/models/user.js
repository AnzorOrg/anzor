var mongoose = require('mongoose');
var Notification = require(__dirname+'/notification.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	teams: [String],
	notifications: [Notification]
})

var User = mongoose.model('User', userSchema);

module.exports = User;