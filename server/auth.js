var session = require('express-session');
var User = require(__dirname+'/models/user.js');
var crypto = require('crypto')
var Auth = function(app) {
	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret: 'dnfdsoi13ro3ff0hhf8h'
	}));
}

Auth.authenticate = function(req, res) {
	User.findOne({email:req.body.email}).exec(function(err, user){
		if(!user){
			console.log('email not found');
			res.redirect('/');
		}
		else{
			var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
			if(hash == user.password){
				req.session.regenerate(function(){
					req.session.user = user;
					console.log(user);
					res.json({
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName
					});
				});
			}
			else{
				res.redirect('/');
				console.log('goofed');
			}
		}
	});
}

Auth.restrict = function(req, res, next) {
	if(req.session.user){
		next();
	} else {
		res.redirect('/');
	}
}

module.exports = Auth;