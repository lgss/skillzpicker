require('dotenv').config()
const restify = require('restify');
const mongoose = require('mongoose');
const async = require("async");

mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://localhost:27017/test`);
const Skill = require('./models/skill.js');
const UzerSkill = require('./models/uzerskill.js');
const Uzer = require('./models/uzer.js');
const db = require('./db.js')

function respond(req, res, next) {
	res.send('hello ' + req.params.name);
	next();
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);
//this will create a new skill in the skillz table
server.post('/skill', function (req, res, next) {
	if (!req.body || req.body.name === '') {
		res.send(400, { error: "please add a name to create a skill" })
	}

	Skill.findOne({name:req.body.name},null,{lean:true}, function(err, skill){
		if (skill) {
			return res.send(400, { error: "This skill already exists" });
		}

		var skill = new Skill;
		skill._id = new mongoose.mongo.ObjectID();
		skill.name = req.body.name;
		skill.save(function (err) {
			if (err) {
				return res.send(400, { error: err.message });
			}
			return res.send(200, { id: skill.id });
		})
	})
});
//this will get skillz by ID
server.get('/skill/:id', function (req, res, next) {
	if (!req.params.id) {
		res.send(400, { error: "please enter an id" });
	}
	Skill.findById(req.params.id, function (err, skill) {
		if (err) {
			return res.send(400, { error: err.message });
		}
		if (!skill) {
			res.send(404, { message: "skill not found" });
		}
		res.send(200, { skill: skill });
	})
});
//get skill by name
server.get('/skillbyname/:name', function (req, res, next) {
	if (!req.params.name) {
		return res.send(400, { error: "please enter a name" });
	}
	Skill.findOne({ name: req.params.name }, function (err, skill) {
		if (err) {
			return res.send(400, { error: err.message });
		}
		if (!skill) {
			return res.send(404, { error: "Skill not found" });
		}
		res.send(200, { skill: skill })
	})
})

server.del('/skill/:id', function(req, res, next){
	Skill.deleteOne({_id : req.params.id},function(err){
		if(err){
			return res.send(400, {error: err.message});
		}
		res.send(200, {message:'skill deleted'})
	})
})
//this will create a uzer
//{name:name,slackId:slackId}
server.post('/uzer', function (req, res, next) {
	Uzer.findOne({slackId:req.body.slackId}, function(err, uzer){
		if(err){
			res.send(400,{error:error.message});
		}
		if (uzer) {
			return res.send(400, { error: "user already exists" });
		}
		var user = new Uzer;
		user.slackId = req.body.slackId;
		user.save(function (err) {
			if (err) {
				return res.send(400, { error: err.message });
			}
			return res.send(200, { id: user.id });
		});
	});
});

server.del('/uzer/:slackId', function(req, res, next){
	if(!req.params.slackId){
		return res.send(400, {error: "you must send a slack Id to delete a uzer"})
	}
	Uzer.deleteOne({slackId : req.params.slackId},function(err){
		if(err){
			return res.send(400, {error: err.message});
		}
		return res.send(200, {message:'uzer deleted'});
	});
});
//This will get uzer by name
server.get('/uzer/:slackId', function (req, res, next) {
	Uzer.findOne({ slackId: req.params.slackId }, function (err, uzer) {
		if (err) {
			res.send(400, { error: error.message });
		}
		res.send(200, { user: uzer });
	})
});

//get all uzerz
server.get('/alluzerz', function (req, res, next) {
	var query = Uzer.find({});
	var promise = query.exec();
	promise.then(function (docs) {
		res.send(200, docs);
	}).catch(function (err) {
		res.send(400, err);
	});
});

//this will give back a list of all the skillz in the db
server.get('/allskillz', function (req, res, next) {
	var query = Skill.find({});
	var promise = query.exec();
	promise.then(function (docs) {
		res.send(200, docs);
	}).catch(function (err) {
		res.send(400, err);
	});
});

server.post('/uzerskill', function (req, res, next) {
	Skill.findOne({ _id: req.body.skillId }, function (err, skill) {
		Uzer.findOne({ slackId: req.body.slackId }, function (err, uzer) {
			if (uzer.skills.indexOf(skill._id) > -1) {
				return res.send(400, { error: "user skill already exists" })
			}
			uzer.skills.push(skill._id);
			uzer.save();
			res.send(200, { message: 'success' });
		})
	})
});

server.get('/skillsbyuzer/:uzerId', function (req, res, next) {
	var skillList = [];
	Uzer.findOne({ slackId: req.params.uzerId }, function (err, uzer) {
		var i = 0;
		async.each(uzer.skills, function (listItem, next) {
			listItem.position = i;
			Skill.findOne({ _id: listItem }, function (err, skill) {
				skillList.push({ "skill": skill.name, "skillId": skill.id });
				i++;
				next();
			})
		}, function (err) {
			if (!skillList){
				return res.send(400, { error: "User doesn't have any skills" });
			}
			res.send(200, skillList);
		});
	})
});

server.get('/uzersbyskill/:skillId', function (req, res, next) {
	Uzer.find({ skills: req.params.skillId }, function (err, uzers) {
		if(!uzers){
			return res.send(400,{ error: "No users have this skill"} );
		}
		return res.send(200, uzers);
	})
})

server.post('/removeuzerskill', function (req, res, next) {
	Uzer.findOne({ slackId: req.body.slackId }, function (err, uzer) {
		if (!uzer) {
			return res.send(400, "user doesn't exist");
		} else if (uzer.skills.indexOf('"' + req.body.skillId + '"') > -1) {
			return res.send(400, "user doesn't know this skill");
		}
		for (var i = 0; i < uzer.skills.length; i++) {
			if (uzer.skills[i] == req.body.skillId) {
				uzer.skills.splice(i, 1);
			}
		}
		uzer.save();
		return res.send(200, 'skill removed');
	});
});

server.get('/getusersbyskill/:skillId', function (req, res, next) {
	Uzer.find({ skills: req.params.skillId }, function (err, uzers) {
		console.log(uzers);
		if (uzers.length == 0) {
			return res.send(400, "Nobody has that skill");
		}
		var userArray = [];
		for (var i = 0; i < uzers.length; i++) {
			userArray.push(uzers[i].slackId);
		}
		res.send(200, userArray);
	})
});

server.get('/searchskill/:term', function(req, res, next){
	if (!req.params.term) {
		res.send(400, "Required search term input parameter ")
	}
	db.searchSkills(req.params.term).then(results=>{
		res.send(200, results.hits.hits)
	})
});

db.connect()
	.then(res => db.index(Skill))
	.then(res => { console.log(`Indexed ${res} skills`) })
	.then(() => {
		server.listen(process.env.PORT || 8080, function () {
			console.log('%s listening at %s', server.name, server.url);
		});
	});

