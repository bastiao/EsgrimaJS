/**
  * This is the web server.
  */


import {Configs} from './configs'
import {DEBUG} from './configs'

import {RegisterServerServices} from './handlers/server/ServerServices';
import {AnswerEventProcessor} from './handlers/AnswerEventProcessor';


import {appEnv} from '../../common/enviroment';


/** TODO (bastiao) Fix the loading part, now it is static :-( 
 * TODO: But it is quite difficult to find an easy and beautiful way */

import {EsgrimaInstance} from '../../client/esgrima';
import {EsgrimaTestSuite} from '../../examples/index';

console.log(EsgrimaInstance.getTests());

//import {colors} from 'colors/safe';

var colors = require('colors');
var colors = require('colors/safe');

/** Welcome message */
console.info(colors.black.bgYellow("Welcome to JS Esgrima - Test Framework"));

console.info(colors.black.bgRed("Debug : "  + DEBUG));

console.info("");

console.info(colors.black.bgGreen("Generating the tests"));
console.info("");


console.info(colors.black.bgGreen("Loading the tests"));
console.info("");

console.info(colors.black.bgGreen("Starting Web Server"));
console.info(colors.black.bgWhite("Listen on: "  + Configs.port));
console.info("\n");

/** Start the Web Socket Server @ socket.io */

var express = require('express');
var app = express();
var server = app.listen(Configs.port);
var io = require('socket.io').listen(server);

app.use("/web", express.static(__dirname + '/../webmanagement/'));

// List the groups!


var AnswerEventProcessorInstance = new AnswerEventProcessor(io, EsgrimaInstance);


RegisterServerServices(app, io);

/*
var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        console.log(socket.conn.id)
        
        socket.emit('message', {
            that: 'only'
            , '/chat': 'will get'
        });
        console.log("emit chat");
        chat.emit('message2', {
            everyone: 'in'
            , '/chat': 'will get'
        });

        chat.emit('message', {
            everyone: 'in'
            , '/chat': 'will get',
            "dados": 1}, {"dados": 1});


        socket.on('disconnect', function(){
            console.log('user disconnected');
            console.log(socket.conn.id);
        });
    });

var news = io
    .of('/news')
    .on('connection', function (socket) {
        console.log("emit bews");


        
        socket.emit('item', { news: 'item' });

        socket.on('item', function(){
            console.log('item inside');
        });
        
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
        
    });

*/