//Express example using static file directory

var express = require("express"),	
	http = require("http"),
	app = express();

//set up a static file directory to use for default routing
app.use(express.static(_dirname + "/client"));

//create our Express-powered HTTP server
http.createServer(app).listen(3000);

//set up our routes
app.get("/hello", function (req,res) {
	res.send("Hello World!");
});
app.get("/goodbye", function(req,res) {
	res.send("Goodbye World!");
});
app.get("/", function(req,res) {
	res.send("This is the root route!");
});