//Source for random function: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var http = require("http"),
	express = require("express"),
	playerinfor = {};
    //server;

var parts = req.url.split("/"),
	move = parts[2],
	ran = getRandomInt (1, 5),
	r_move = computer_move(ran);

playerinfor.play = outcome(move, r_move);
playerinfor.win = 0;
playerinfor.lose = 0;
playerinfor.tie = 0;

playerinfor.move = move;
playerinfor.r_move = r_move;

function getRandomInt (min, max){
	return Math.floor( Math.random() * (max - min)) + min;
};

function computer_move (ran){
	if (ran == 1)
		return "scissors";
	if (ran == 2) 
		return "paper";
	if (ran == 3)
		return "rock";
	if (ran == 4)
		return "lizard";
	if (ran == 5)
		return "spock";
};

function outcome(move, r_move){
	if(move == 'scissors')
		if(r_move == 'paper' || r_move == 'lizard')
			return "win";
		else if(r_move == 'rock' || r_move == 'spock')
			return "lose";
		else
			return "tie";
	if(move == 'paper')
		if(r_move == 'rock' || r_move == 'spock')
			return "win";
		else if(r_move == 'scissors' || r_move == 'lizard')
			return "lose";
		else
			return "tie";
	if(move == 'rock')
		if(r_move == 'lizard' || r_move == 'scissors')
			return "win";
		else if(r_move == 'paper' || r_move == 'spock')
			return "lose";
		else
			return "tie";
	if(move == 'lizard')
		if(r_move == 'spock' || r_move == 'paper')
			return "win";
		else if(r_move == 'scissors' || r_move == 'rock')
			return "lose";
		else
			return "tie";
	if(move == 'spock')
		if(r_move == 'scissors' || r_move == 'rock')
			return "win";
		else if(r_move == 'lizard' || r_move == 'paper')
			return "lose";
		else
			return "tie";
	
}

if(playerinfor.play == "win")
	playerinfor.win++;
if(playerinfor.play == "lose")
	playerinfor.lose++;
if(playerinfor.play == "tie")
	playerinfor.tie++;

//server = http.createServer(function (req, res) {
/*	var parts = req.url.split("/"),
		move = parts[2],
		ran = getRandomInt (1, 5),
		r_move = computer_move(ran),
		jsonString,
		win = 0,
		lose = 0,
		tie = 0;

		if(outcome(move,r_move) == "win")
			win++;
		if(outcome(move,r_move) == "lose")
		 	lose++;
		if(outcome(move,r_move) == "tie")
			tie++;

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("outcome " + outcome(move,r_move));
    res.write(" wins: " + win);
    res.write(" loses: "+ lose);
    res.write(" ties: " + tie);
    res.end(outcome(move,r_move));

    //jsonString = '{"Outcome":outcome(move,r_move),"wins":win, "loses": lose, "ties": tie}'
    //var play = JSON.parse(jsonString);
});*/

//server.listen(3000);
//console.log("Server listening on port 3000");

app = express();
http.createServer(app).listen(3000);  //sets server & app 

app.use(express.static(__dirname + "/client"));

app.get("/play/rock", function (req, res) {
	checkInput("rock");	//updates json object
	res.json(playerinfor); //sends json object
	console.log("Rock Played");	
});

app.get("/play/paper", function (req, res) {
	checkInput("paper");	//updates json object
	res.json(playerinfor); //sends json object
	console.log("Paper Played");	
});

app.get("/play/scissors", function (req, res) {
	checkInput("scissors");	//updates json object
	res.json(playerinfor); //sends json object
	console.log("scissors Played");	
});

app.get("/play/lizard", function (req, res) {
	checkInput("lizard");	//updates json object
	res.json(playerinfor); //sends json object
	console.log("Lizard Played");	
});

app.get("/play/spock", function (req, res) {
	checkInput("spock");	//updates json object
	res.json(playerinfor); //sends json object
	console.log("Spock Played");	
});
 
console.log("Server is listening at port 3000");

