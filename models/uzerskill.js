var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UzerSkill = new Schema({
	uzer: {type: Schema.Types.ObjectId},
	skill: {type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('UzerSkill', UzerSkill);