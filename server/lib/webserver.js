/**
  * This is the web server.
  */


import {Configs} from './configs'
import {DEBUG} from './configs'


import {StartHandler} from './handlers/start'



//import {colors} from 'colors/safe';

var colors = require('colors');
var colors = require('colors/safe');


/** Welcome message */
console.info(colors.black.bgYellow("Welcome to JS Esgrima - Test Framework"));
console.info(colors.black.bgWhite("Listen on: "  + Configs.port));
console.info(colors.black.bgRed("Debug : "  + DEBUG));


/** Start the Web Socket Server @ socket.io */

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(Configs.port);

function handler (req, res) {
  //console.log(req);
  console.log(req.url);

  console.log(__dirname);
  fs.readFile(__dirname + '/../webmanagement'+req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

StartHandler(io);

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

