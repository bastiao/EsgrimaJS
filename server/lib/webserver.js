/**
  * This is the web server.
  */


import {Configs} from './configs'
import {DEBUG} from './configs'


import {StartHandler} from './handlers/start'
import {ServerStartHandler} from './handlers/server/ServerServices'


//import {colors} from 'colors/safe';

var colors = require('colors');
var colors = require('colors/safe');


/** Welcome message */
console.info(colors.black.bgYellow("Welcome to JS Esgrima - Test Framework"));

console.info(colors.black.bgRed("Debug : "  + DEBUG));


console.info("\n");

console.info(colors.black.bgGreen("Generating the tests"));
console.info("\n");


console.info(colors.black.bgGreen("Loading the tests"));
console.info("\n");

console.info(colors.black.bgGreen("Starting Web Server"));
console.info(colors.black.bgWhite("Listen on: "  + Configs.port));
console.info("\n");

/** Start the Web Socket Server @ socket.io */


var express = require('express');
var app = express();
var server = app.listen(Configs.port);
var io = require('socket.io').listen(server);

app.get("/api/", function(req, res){
    res.send("It works!");
});

app.use(express.static(__dirname + '/'));

StartHandler(io);
ServerStartHandler(app,io);

