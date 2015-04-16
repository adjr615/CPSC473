//Source for random function: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var http = require("http"),
    server;

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
	
};

/*function tally(outcome){
		if(outcome == 'win')
			return win + 1;
		if(outcome == 'lose')
			return lose + 1;
		if(outcome == 'tie')
			return tie + 1;
}*/

server = http.createServer(function (req, res) {
	var parts = req.url.split("/"),
		move = parts[2],
		ran = getRandomInt (1, 5),
		r_move = computer_move(ran),
		jsonString,
		win = 0,
		lose = 0,
		tie = 0;

		if(outcome(move,r_move) == 'win')
			win++;
		if(outcome(move,r_move) == 'lose')
		 	lose++;
		if(outcome(move,r_move) == 'tie')
			tie++;
    /*jsonString = '{"Outcome":outcome(move,r_move),"wins":win, "loses": lose, "ties": tie}'
    var play = JSON.parse(jsonString);
    console.log(play.Outcome);
    console.log(play.wins);
    console.log(play.loses);
    console.log(play.ties);
    console.log("Thank you for playing");*/

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("outcome " + outcome(move,r_move));
    res.write(" wins: " + win);
    res.write(" loses: "+ lose);
    res.write(" ties: " + tie);
    res.end(outcome(move,r_move));

    //jsonString = '{"Outcome":outcome(move,r_move),"wins":win, "loses": lose, "ties": tie}'
    //var play = JSON.parse(jsonString);
});
server.listen(3000);
console.log("Server listening on port 3000");

