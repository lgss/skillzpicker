var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UzerSkill = new Schema({
	uzer: String,
	skill: String
});

module.exports = mongoose.model('UzerSkill', UzerSkill);