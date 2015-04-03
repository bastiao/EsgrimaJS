/**
  *
  * This is the web server.
  */


import {Configs} from './configs'

var colors = require('colors');
var colors = require('colors/safe');

// set single property
var error = colors.red;
var debug = colors.rainbow;
error('this is red');
console.log(colors.black.bgWhite(Configs));
console.log(colors.black.bgWhite(Configs.port));

// set theme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
// outputs red text
console.log(colors.error("this is an error"));

// outputs yellow text
console.log(colors.warn("this is a warning"));




console.log('This String Will Display RED'.red);
console.error("SHit");
debug('whats up?');

var io = require('socket.io')(9001);
console.log("Welcome ");
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

