
//Annette Ruiz
//Assignment 8

"use strict";

var express = require("express"),
	http = require("http"),
	mongodb = require("mongodb"),
	bodyParser = require('body-parser'),
	app = express(),
	mongoClient;

//Connect to the database
function connectDB(proccess, url, res) {
	var mongoUrl = "mongodb://localhost/shortenedurl";
	mongoClient.connect(mongoUrl, function(err, db){
		if(err){
			console.log("Error: " + err);
			return;
		}
		var collection = db.collection('url');
		proccess(collection, url, res);
	});
}

//create database 
mongoClient = mongodb.MongoClient;

http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));

//bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//data enters database
app.post("/geturl", function (req, res) {
	var posturl = req.body.url0;
	connectDB(findURL, posturl, res);
	console.log("POST: geturl");
});


app.get("/*", function (req, res){
	if(req.param(0) === "getList") {
		console.log("GET: getList");
		connectDB(getTopList, 0, res);
	}
	else {
		var shortURL = "localhost:3000/" + req.param(0);
		console.log("GET: Calling fowardURL " + shortURL);
		connectDB(fowardURL, shortURL, res);
	}
});

//FUNCTIONS:
//shorten URL
function newURL() {
	//Reference: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
	var rURL = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
	rURL = "localhost:3000/" + rURL;
	return rURL;
}

//insert original to db
var insertDB = function(collection, longURL, res) {
	var shortURL, schema;

	shortURL = newURL();
	schema = {long: longURL, short: shortURL, count: 0};

	//goes into db
	collection.insert(schema, {w:1}, function(err, result){
		if(err){
			console.log("Error: " + err);
			return;
		}
		else{
			res.json({"url":shortURL});
		}
	});
}; 

//searching the db
var findURL = function(collection, url, res) {
	var index = url.indexOf("localhost:3000/");
	if(index > -1){
		collection.findOne({short : url}, function(err, item){
			if(err){
				console.log("Error " + err);
				return;
			}
			else if(item !== null){
				res.json({"url":item.long});
			}
			else{
				res.json({"url": "NOT FOUND!"});
			}
		});
	} 
	else {
		url = "https://" + url;
		collection.findOne({long: url}, function(err, item){
			if(err){
				cosole.log("Error " + err);
				return;
			}
			else if(item !== null){
				res.json({"url": item.short});
			}
			else {
				connDB(insertDB, url, res);
			}
		});
	}
};

//Create top list
var getTopList = function(collection, url, res) {
	collection.aggregate([ 
		{$sort: {count: -1}},
		//limit 10 to get top 10
		{$limit: 10}
	], function(err, topten) {
		if (topten !== null) {
			res.json(topten);
		}
	});
};

function fowardURL(collection, url, res){
	console.log("GET:Foward URL");

	collection.findOne({short: url}, function(err, item){
		if(err){
			console.log("Error :" + err);
		}
		else if(item !== null) {
			collection.update({short : url}, {$inc: {count: 1}});
			res.redirect(item.long);
		}
		else{
			res.redirect("localhost:3000"); 
		}
	});

}

console.log("Server is listening at localhost:3000");
