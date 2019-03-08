var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
// //var findOrCreate = require('mongoose-findorcreate');
// //var serializer = require('passport-mongoose-serializer');

var Skill = new Schema({
	_id: Schema.Types.ObjectId,
	name: String
});

// User.plugin(passportLocalMongoose);
// //User.plugin(findOrCreate);

module.exports = mongoose.model('Skill', Skill);