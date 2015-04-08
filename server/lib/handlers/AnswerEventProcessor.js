/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */
    
    

import {ServiceTest} from './tests/testHandler';

import {TestLoader} from '../../../common/TestLoader';
var colors = require('colors/safe');


class AnswerEventProcessor {

    constructor(io, EsgrimaInstance) {
        this.io = this.io;
        this.EsgrimaInstance = EsgrimaInstance;
        this.testLoader = new TestLoader(EsgrimaInstance.getTests());

        /**
         *  
         * Contains the group sockets.
         * For instance, for a particular group  
         */
        this.groupsSockets = {};

    }

    start()
    {

        
        
        var groups = this.testLoader.getGroups();

        var controller = io
            .of('/')
            .on('connection', function (socket) {
                socket.emit('message', {
                    that: 'only'
                    , '/chat': 'will get'
                });
                console.log("emit chat");
                chat.emit('message2', {
                    everyone: 'in'
                    , '/chat': 'will get'
                });

                socket.on('disconnect', function(){
                    console.log('user disconnected');
                });
            });

        for(var i = 0, size = groups.length; i < size ; i++){
            var group = groups[i];
            let groupSocket = io
                .of('/'+group)
                .on('connection', function (socket) {
                    socket.emit('message', {
                        that: 'only'
                        , '/chat': 'will get'
                    });
                    console.log("emit chat");
                    chat.emit('message2', {
                        everyone: 'in'
                        , '/chat': 'will get'
                    });

                    socket.on('disconnect', function(){
                        console.log('user disconnected');
                    });
                });
            
        }

    }
    
}

export {AnswerEventProcessor}