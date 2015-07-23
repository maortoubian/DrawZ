var mongoose = require('mongoose');

mongoose.connect('mongodb://maortoubian:mm016560@ds033679.mongolab.com:33679/drawz');
var conn = mongoose.connection;


var RYSchema = require('./user_schema').ramatYishay;
mongoose.model('RY', RYSchema);


conn.on('error', function (err) {
	console.log('connection error' + err);
	mongoose.disconnect();
});

var RY = mongoose.model('RY');

var D = new Date();
var Day = D.getDay();
var Hour = D.getHours();
var password;

var players = [];
var teams = [];

var now;

var gameDay = 0;
var gameDayChecker;


var nextWeek = new Date("2015/7/24");

//var nextWeek = new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000);

var myVar = setInterval(function(){myTimer()},1000);

function myTimer() {

	now = new Date();

	if(now.toDateString()==nextWeek.toDateString()){

		gameDay=1;
		gameDayChecker = now.toDateString();
		nextWeek = new Date(nextWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
		console.log("gameDay: "+ gameDay);

	}

	if(now.toDateString()!=gameDayChecker){
		gameDay=0;
		console.log("gameDay: "+ gameDay);
	}

	console.log(now.toDateString());
	console.log(nextWeek.toDateString());

}

mongoose.connection.once('open', function() {

	console.log('connected to mongolab');

			players = [];

			var query = RY.find();
			query.exec(function (err,docs) {

				console.log(docs);
				 for (var i in docs) {
						console.log(docs[i]);
				 		players.push({
				 			"player":docs[i].player,
				 			"come":docs[i].come
						});

				 }

			});
			console.log(players);

			return players;


});

exports.getDB = function(){

		return getDB();

}


function getDB(){

			players = [];

			var query = RY.find();
			query.exec(function (err,docs) {

				console.log(docs);
				 for (var i in docs) {
						console.log(docs[i]);
				 		players.push({
				 			"player":docs[i].player,
				 			"come":docs[i].come
						});

				 }

			});
			console.log(players);

			return players;

}



exports.updateDB = function(player,score){

		console.log("updateDB");

		var query = RY.findOne({'player': player});
		query.exec(function (err,docs) {

				if(docs!=0){


						var query = docs.update({$set:{come:score}});

						query.exec(function (err,doc) {
								console.log("score has changed");
						});

				}

		});

		setTimeout(function() {
			getDB();
		}, 500);

		return 1;
}




function makeTeams(){

		var team1 = [];
		var team2 = [];
		var team3 = [];
		var team4 = [];
		var team5 = [];

		var comingCount=0;
		

		for (i in players){
			if(players[i].come==true){
				comingCount += 1;
			}
		}

		if(comingCount>=10){


				if(10<=comingCount&&comingCount<=15){
					console.log("3 teams");
					teams = [team1,team2,team3];

					i=0;
					while(i < players.length){

							if(players[i].come==true){

								var randomNumber = Math.floor((Math.random() * 3) + 0)

								console.log("teams");

								if(randomNumber==2){
									if(teams[randomNumber].length!=comingCount%10){
										teams[randomNumber].push(players[i].player);
										i++;
									}	
								}
								else{
									if(teams[randomNumber].length!=5){
										teams[randomNumber].push(players[i].player);
										i++;
									}
								}

							}
							else{
								i++;
							}
					}
				}

				if(15<comingCount&&comingCount<=20){
					console.log("4 teams");
					teams = [team1,team2,team3,team4];

					i=0;
					while(i < players.length){

							if(players[i].come==true){

								var randomNumber = Math.floor((Math.random() * 4) + 0)

								console.log("teams");

								if(randomNumber==3){
									if(teams[randomNumber].length!=comingCount%15){
										teams[randomNumber].push(players[i].player);
										i++;
									}	
								}
								else{
									if(teams[randomNumber].length!=5){
										teams[randomNumber].push(players[i].player);
										i++;
									}
								}

							}
							else{
								i++;
							}
					}
				}
				if(20<comingCount&&comingCount<=25){
					console.log("5 teams");
					teams = [team1,team2,team3,team4,team5];

					i=0;
					while(i < players.length){

							if(players[i].come==true){

								var randomNumber = Math.floor((Math.random() * 5) + 0)

								console.log("teams");

								if(randomNumber==4){
									if(teams[randomNumber].length!=comingCount%20){
										teams[randomNumber].push(players[i].player);
										i++;
									}	
								}
								else{
									if(teams[randomNumber].length!=5){
										teams[randomNumber].push(players[i].player);
										i++;
									}
								}

							}
							else{
								i++;
							}
					}
				}

				console.log(teams);
				console.log(comingCount%10);
		
		}
		return 0;
}


exports.login = function (user,pass) {

	if(user=="ramatyishay"){
		if(pass=="messi"){
			return 1;
		}
	}

	return 0

}


exports.getPlayers = function(){

	// if(gameDay){	
	
	// 	teams = [];
	// 	makeTeams();

	// 	return 0;

	// }
	// else{
		return players;
	//}
}

exports.getTeams = function(){

		teams = [];
	 	makeTeams();

		return teams;
}

