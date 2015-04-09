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
                groupsSockets[socket.conn.id] = socket;
                socket.emit('ready', {
                    that: 'only'
                    , '/chat': 'this  client is ready to execute tests'
                });


                socket.on('started', function(){
                
                });

                socket.on('stopped', function(){

                });
                
                socket.on('disconnect', function(){
                    delete groupsSockets[socket.conn.id];
                });
            });

        

        for(var i = 0, size = groups.length; i < size ; i++){
            var group = groups[i];
            let groupSocket = io
                .of('/'+group)
                .on('connection', function (socket) {

                    socket.on('executed', function(data){
                        // Test Complete
                        let id = data.test.id;
                        let reports = data.test.reports;
                        let assertations = data.test.assertations;
                        
                    });


                    socket.on('disconnect', function(){
                        delete groupsSockets[socket.conn.id];
                    });
                    
                    
                    
                });

            groupsSockets[group] = groupSocket;
            
        }

    }
    
}

export {AnswerEventProcessor}