var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({
	email: {type:String, required: true},
	firstName: {type:String, required:true},
	lastName: {type:String, required:true},
	team: {type:String, required: true},
	type:{type:String, required: true}
}, {timestamps: true});

module.exports = Notification;