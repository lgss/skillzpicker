var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UzerSkill = new Schema({
	uzerId: String,
	skillId: String
});

module.exports = mongoose.model('UzerSkill', UzerSkill);