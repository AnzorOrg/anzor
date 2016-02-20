var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Announcement = new Schema({
	title: {type:String, required: true},
	author: {type:String, required: true},
	body: {type:String, required: true}
}, {timestamps: true});

module.exports = Announcement;