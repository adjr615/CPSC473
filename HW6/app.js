var main = function() {
	"user strict";

	$("#rock").click(function() {
		processPost("/play/rock");
	});

	$("#paper").click(function() {
		processPost("/play/paper");
	});	

	$("#scissors").click(function() {
		processPost("/play/scissors");
	});

	$("#lizard").click(function() {
		processPost("/play/lizard");
	});

	$("#spock").click(function() {
		processPost("/play/spock");
	});
};

function getResponse(playerinfor) {
	var $resultstr = $("<p>"),
		$player = $("<p>").text("Your Move: " + playerinfor.move),
		$aiplayer = $("<p>").text("Computer Move: " + playerinfor.r_move),
		$feedback = $("<h3>").text("You " + playerinfor.play + "!"),
		$description = $("<h3>").text("Game Stats & Scores:"),
		$content = $("<ul>"),
		$listoutcome = $("<li>").text("Outcome: " + playerinfor.play),
		$listwin = $("<li>").text("Wins: " + playerinfor.win),
		$listloss = $("<li>").text("Losses: " + playerinfor.lose),
		$listties = $("<li>").text("Ties: " + playerinfor.tie);

		$content.append($listoutcome).append($listwin).append($listloss).append($listties); 
		$resultstr.append($feedback).append($player).append($aiplayer).append($description).append($content);
		console.log("----------------get json----------------------------");

		return $resultstr;
}



function processPost(Post) {
	var $result;

	$.getJSON(Post, function(playerinfor) {
		$("main .result").empty(); //clears previous html code
		$result = getResponse(playerinfor); //update html code
		$("main .result").append($result).append($reset);
	});
}

$(document).ready(main);