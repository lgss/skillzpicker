var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Skill = new Schema({
	_id: Schema.Types.ObjectId,
	name: String
});

var Uzer = new Schema({
	_id: Schema.Types.ObjectId,
	slackId: String
});

var UzerSkill = new Schema({
	uzer: {type: Schema.Types.ObjectId},
	skill: {type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('Skill', Skill);
module.exports = mongoose.model('Uzer', Uzer);
module.exports = mongoose.model('UzerSkill', UzerSkill);