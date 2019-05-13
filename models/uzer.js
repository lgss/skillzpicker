var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
// //var findOrCreate = require('mongoose-findorcreate');
// //var serializer = require('passport-mongoose-serializer');

var Uzer = new Schema({
	slackId: String,
	skills: [{type: String}]
});

// User.plugin(passportLocalMongoose);
// //User.plugin(findOrCreate);

module.exports = mongoose.model('Uzer', Uzer);