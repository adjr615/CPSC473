//File inisde our Express directory called server.js and add the following:

var express = require("express"),
	http = require("http"),
	app;

// create our express-powered Http server and have it listen on port 3000
app = express();
http.createServer(app).listen(3000);

// set up our routes
app.get("/hello", function(req,res) {
	res.send("Hello World");
});

app.get("/goodbye", function(req,res) {
	res.send("Goodbye World!");
});

//setting up a root route for localhost:3000/ to work
app.get("/", function(req,res) {
	res.send("This is the root route!");
});

