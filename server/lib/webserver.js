/**
  * This is the web server.
  */


import {Configs} from './configs'
import {DEBUG} from './configs'
import {testLoader} from './configs'


import {AnswerEventProcessor} from './handlers/AnswerEventProcessor';


import {appEnv} from '../../common/enviroment';


/** TODO (bastiao) Fix the loading part, now it is static :-( 
 * TODO: But it is quite difficult to find an easy and beautiful way */

import {EsgrimaInstance} from '../../client/esgrima';


var EsgrimaTestSuite = require("../../"+testLoader+"/index").EsgrimaTestSuite;
//import {EsgrimaTestSuite} from '../../examples/index';

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


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = express();



app.use("/web", express.static(__dirname + '/../webmanagement/'));

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var io = require('socket.io').listen(httpServer);
httpServer.listen(Configs.port);
httpsServer.listen(8443);

// List the groups!


import {fsm, setEventProcessor, resetServerStateMachine} from './handlers/ServerStateMachine';

//resetServerStateMachine();

var AnswerEventProcessorInstance = new AnswerEventProcessor(io, EsgrimaInstance);
setEventProcessor(AnswerEventProcessorInstance)



AnswerEventProcessorInstance.start();



import {RegisterServerServices} from './handlers/server/ServerServices';
setTimeout(function(){

    RegisterServerServices(app, io);
    
}, 300);
