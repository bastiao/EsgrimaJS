/**
  * This is the web server.
  */


import {Configs} from './configs'
var colors = require('colors');
var colors = require('colors/safe');


/** Welcome message */
console.log(colors.black.bgYellow("Welcome to JS Esgrima - Test Framework"));
console.log(colors.black.bgWhite("Listen on: "  + Configs.port));


/** Start the Web Socket Server @ socket.io */

var io = require('socket.io')(9001);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });

