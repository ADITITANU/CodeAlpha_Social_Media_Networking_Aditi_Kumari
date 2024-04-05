var express = require('express');
var app = express();

var formidable = require("express-formidable");
app.use(formidable());

var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var http = require("http").createServer(app);
var bcrypt = require("bcrypt");
var filesystem = require("fs");

var jwt = require("jsonwebtoken");
const { connected } = require('process');
var accessTokenSecret = "myAccessTokenSecret1234567890"; // Change this to a more secure secret!    

app.use(express.static(__dirname + "/public")); 
// The public folder will be the main
app.set("view engine", "ejs");

var socketIO = require("socket.io")(http);
var socketID = "";
var users = [];

var mainURL = "http://localhost:3000";

socketIO.on("connection", function(socket) {
    console.log(""User connected", (socket.id);
        socketID = socket.id;
    });

    http.listen(3000, function() {
        console.log("Server started.");

        mongoClient.connect("mongodb://localhost:27017", function(error, client) {
            var database = client.db("my_social_network");
            console.log("Database connected.");
        
            app.get("/signup", function(request, result){
                result.render("signup");
            });
        });
    });

