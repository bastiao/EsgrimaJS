/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


import {Configs} from './configs';


import {ClientServiceStart} from './handlers/start';
import {ClientServiceConnect} from './handlers/connect';
console.log("Require Socket IO");
var io = require('socket.io-client');

class EventProcessor {

    constructor(group) {
        this.socket = io(Configs.wsUrl);
        this.group = group;
        
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

        this.controller = io.connect(Configs.wsUrl+'chat');

        this.controller.on('connect', function (data) {
            chat.emit('ready');
        });

        this.controller.on('disconnect', function (data) {

        });

        this.controller.on('reconnect', function (data) {

        });


        this.group = io.connect(Configs.wsUrl+group);


        this.group.on('connect', function (data) {
            chat.emit('ready');
        });

        this.group.on('execute', function (data) {
            // Start Executing the tests.
        });
        
        this.group.on('disconnect', function (data) {

        });

        this.group.on('reconnect', function (data) {

        });
        
        
        
        news.on('item', function (data) {
            console.log("item");
            console.log(data);
            news.emit('item');
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
            console.log("item");
            console.log(data);
            news.emit('item', {data: "lol"});
        });

        news.on('disconnect', function (data) {

        });

        news.on('reconnect', function (data) {

        });

            



    }

    getSocket()
    {
        return this.socket;
        
    }

}


export {EventProcessor}