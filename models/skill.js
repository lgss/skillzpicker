const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic')
const Schema = mongoose.Schema;
const esClient = require('../es.js');

// esClient.indices.exists({ index: 'skills' })
// 	.catch(() => {
// 		esClient.indices.create({

// 			index: 'skills'
// 		}, function (err, resp, status) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			else {
// 				console.log("create", resp);
// 			}
// 		});
// 	})
esClient.indices.initialize({index:'skills'});
var SkillSchema = new Schema({
	name: { type: String, es_indexed: true }
});


SkillSchema.plugin(mongoosastic, {
	esClient: esClient
});

// var passportLocalMongoose = require('passport-local-mongoose');
// //var findOrCreate = require('mongoose-findorcreate');
// //var serializer = require('passport-mongoose-serializer');



// User.plugin(passportLocalMongoose);
// //User.plugin(findOrCreate);

module.exports = mongoose.model('Skill', SkillSchema);