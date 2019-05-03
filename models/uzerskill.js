var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UzerSkill = new Schema({
	uzer: {type: Schema.Types.ObjectId, ref: 'Uzer'},
	skill: {type: Schema.Types.ObjectId, ref: 'Skill'}
});

module.exports = mongoose.model('UzerSkill', UzerSkill);