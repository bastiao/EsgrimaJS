/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


import {Configs} from './configs';


import {ClientServiceStart} from './handlers/start';
import {ClientServiceConnect} from './handlers/connect';
console.log("Require Socket IO");
var io = require('socket.io-client');

class EventProcessor {

    constructor() {
        this.socket = io(Configs.wsUrl);
    }

    start() {
        // on /start
        //ClientServiceStart(this.socket);
        console.log("EventProcessor: start connecting");
        this.socket.on('connection', function (data) {

            console.log("The client is now starting with");
            console.log(data);
            //socket.emit('start', { start: 'true' });
        });

        var chat = io.connect(Configs.wsUrl+'chat');
        var news = io.connect(Configs.wsUrl+'news');


        news.on('item', function (data) {
            console.log("item");
            console.log(data);
            news.emit('items');
        });


        chat.on('connect', function (data) {
            console.log("hi from chat!");
            console.log(data);
            chat.emit('hi from chat!');
        });
        chat.on('message', function (data) {
            console.log("message chat!");
            console.log(data);

        });
        chat.on('message', function (data) {
            console.log("message chat!");
            console.log(data);

        });


        news.on('connect', function (data) {
            console.log("hi from news");
            console.log(data);
            chat.emit('hi from news!');
        });

        
    }

    getSocket()
    {
        return this.socket;
        
    }

}


export {EventProcessor}