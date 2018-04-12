var restify = require('restify');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://WillWise:igotskillz@ds139122.mlab.com:39122/igotskillzgal');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);
//this will create a new skill in the skillz table
server.post('/skill', function(req, res, next){

});
//this will get skillz by ID
server.get('/skill/:id', function(req, res, next){
	
});
//this will create a uzer
server.post('/uzer', function(req, res, next){
	
});
//This will get uzer by name
server.get('/uzer/:name', function(req, res, next){
	
});
//get all uzerz
server.get('/alluzerz', function(req, res, next){
	
});
//this will give back a list of all the skillz in the db
server.get('/allskillz', function(req, res, next){
	
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});