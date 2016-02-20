var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({
	person: {type:String, required: true},
	team: {type:String, required: true},
	type:{type:String, required: true}
}, {timestamps: true});

module.exports = Notification;