// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'runsignupAuth' : {
		consumerKey: "your-consumer-key-here",
		consumerSecret: "your-consumer-secret-here",
		callbackURL: "http://localhost:8080/auth/runsignup/callback" // Must Match registered URL or you will get a 404
	},

	'facebookAuth' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};