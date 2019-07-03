require('dotenv').config()
var restify = require('restify');
var mongoose = require('mongoose');
var async = require("async");
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
const DBLINK = process.env.DBLINK;
mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://localhost:27017/test`);
mongoose.connect(`mongodb://${DBUSER}:${DBPWD}@${DBLINK}`);
var Uzer = require('./models/uzer.js');
var Skill = require('./models/skill.js');
var UzerSkill = require('./models/uzerskill.js');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser());
// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);
//this will create a new skill in the skillz table
server.post('/skill', function(req, res, next){
	console.log(req);
	if(!req.body || req.body.name===''){
		res.send(400, {error: "please add a name to create a skill"})
	}
	var skill = new Skill;
	skill._id = new mongoose.mongo.ObjectID();
	skill.name = req.body.name;
	console.log(skill);
	skill.save(function(err){
		if (err){
			res.send(400, {error:err.message});
		}
		res.send(200,{id:skill.id});
	})
});
//this will get skillz by ID
server.get('/skill/:id', function(req, res, next){
	if(!req.params.id){
		res.send(400, {error:"please enter an id"});
	}
	Skill.findById(req.params.id, function(err, skill){
		if (err) {
			//console.log(res);
			res.send(400,{error:err.message});
		}
		if(!skill){
			res.send(404, {message: "skill not found"});
		}
		res.send(200,{skill:skill});
	})
});
//get skill by name
server.get('/skillbyname/:name',function(req, res, next){
	if(!req.params.name){
		res.send(400, {error:"please enter a name"});
	}
	Skill.findOne({name:req.params.name}, function(err, skill){
		if(err){
			res.send(400,{error:err.message});
		}
		res.send(200, {skill:skill})
	})
})
//this will create a uzer
//{name:name,slackId:slackId}
server.post('/uzer', function(req, res, next){
	console.log(req.body);
	var uzer = new Uzer;
	uzer.slackId = req.body.slackId;
	console.log(uzer);
	uzer.save(function(err){
		if (err) {
			res.send(400,{error:err.message});
		} 
		res.send(200,{id:uzer.id});
	})
});
//This will get uzer by name
server.get('/uzer/:slackId', function(req, res, next){
	Uzer.findOne({slackId:req.params.slackId}, function(err, uzer){
		if(err){
			res.send(400,{error:error.message});
		}
		res.send(200,{user:uzer});
	})
});
//get all uzerz
server.get('/alluzerz', function(req, res, next){
	var query = Uzer.find({});
	var promise = query.exec();
	promise.then(function (docs) {
		res.send(200, docs);
	}).catch(function(err){
		res.send(400, err);
	});
});
//this will give back a list of all the skillz in the db
server.get('/allskillz', function(req, res, next){
	var query = Skill.find({});
	var promise = query.exec();
	promise.then(function (docs){
		res.send(200, docs);
	}).catch(function(err){
		res.send(400, err);
	});
});

server.post('/uzerskill', function(req, res, next){
	Skill.findOne({name: req.body.name}, function(err, skill){
		console.log(skill);
		Uzer.findOne({slackId: req.body.slackId}, function(err, uzer){
			console.log(uzer);
			uzer.skills.push(skill._id);
			uzer.save();
			res.send(200,{message: 'success'});
		})
	})
});

server.get('/skillsbyuzer/:uzerId', function(req, res, next){
	var skillList = [];
	Uzer.findOne({slackId:req.params.uzerId}, function(err, uzer){	
		var i = 0;
		async.each(uzer.skills, function(listItem, next){
			listItem.position = i;
			Skill.findOne({_id:listItem}, function(err, skill){
				console.log(skill);
				skillList.push(skill.name);
				i++;
				next();
			})
		}, function(err){
			res.send(200, skillList);
		});
	})
	
});

server.get('/uzersbyskill/:skillId', function(req, res, next){
	console.log(req.params.skillId);
	Uzer.find({skills:req.params.skillId}, function(err, uzers){
		res.send(200, uzers);
	})
})

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});