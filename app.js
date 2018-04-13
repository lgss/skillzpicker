require('dotenv').config()
var restify = require('restify');
var mongoose = require('mongoose');
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
const DBLINK = process.env.DBLINK;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DBUSER}:${DBPWD}@${DBLINK}`);
var Uzer = require('./models/Uzer.js');
var Skill = require('./models/skill.js');




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
	var skill = new Skill;
	skill.name = req.body.name;
	skill.save(function(err){
		if (err){
			res.send(400, {error:err.message});
		}
		res.send(200,{id:uzer.id});
	})
});
//this will get skillz by ID
server.get('/skill/:id', function(req, res, next){
	
});
//this will create a uzer
//{name:name,slackId:slackId}
server.post('/uzer', function(req, res, next){
	var uzer = new Uzer;
	uzer.name = req.body.name;
	uzer.slackId = req.body.slackId;
	uzer.save(function(err){
		if (err) {
			res.send(400,{error:err.message});
		} 
		res.send(200,{id:uzer.id});
	})
});
//This will get uzer by name
server.get('/uzer/:name', function(req, res, next){
	Uzer.findOne({name:req.params.name}, function(err, uzer){
		if(err){
			res.send(400,{error:error.message});
		}
		console.log(uzer);
		res.send(200,{user:uzer});
	})
});
//get all uzerz
server.get('/alluzerz', function(req, res, next){
	var query = Uzer.find({});
	var promise = query.exec();
	promise.then(function (docs) {
		console.log(docs);
		res.send(200);
	}).catch(function(err){
		console.log(err);
		res.send(400);
	});
});
//this will give back a list of all the skillz in the db
server.get('/allskillz', function(req, res, next){
	
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});