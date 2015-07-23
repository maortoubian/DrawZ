var express = require('express');
var mongoose = require('./mongoose_connect');
var app = express();
var url = require('url');


//root page that sends the user the Json with all the wanted data
app.get('/', function(req,res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	app.set('json spaces',4);
	res.set("Content-Type", "application/json");
	res.status(200);

	res.json(mongoose.getPlayers());

});

app.get('/getTeams', function(req,res) {

	var urlObj = url.parse(req.url,true);
	var query = urlObj.query;
	var i =	mongoose.getTeams();

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.set("Content-Type", "application/json");
	res.status(200);

	res.json(i);
});

app.get('/updateDB', function(req,res) {
	
	var urlObj = url.parse(req.url,true);
	var query = urlObj.query;
	var i =	mongoose.updateDB(query.player,query.score);

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.set("Content-Type", "application/json");
	res.status(200);

	res.json(i);

});

app.get('/login', function(req,res) {
	
	var urlObj = url.parse(req.url,true);
	var query = urlObj.query;
	var i =	mongoose.login(query.user,query.pass);

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-With,Content-Type, Accept");
	res.set("Content-Type", "application/json");
	res.status(200);

	res.json(i);

});

app.listen(process.env.PORT || 3000);
console.log("web service is listening on port 3000");

