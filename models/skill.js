var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic')
var Schema = mongoose.Schema;

// var passportLocalMongoose = require('passport-local-mongoose');
// //var findOrCreate = require('mongoose-findorcreate');
// //var serializer = require('passport-mongoose-serializer');

var SkillSchema = new Schema({
	name: { type: String, es_indexed: true }
});

SkillSchema.plugin(mongoosastic)

// User.plugin(passportLocalMongoose);
// //User.plugin(findOrCreate);

module.exports = mongoose.model('Skill', SkillSchema);