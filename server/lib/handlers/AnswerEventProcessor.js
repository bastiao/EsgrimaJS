/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */
    
    

import {ServiceTest} from './tests/testHandler';

import {TestLoader} from '../../../common/TestLoader';
var colors = require('colors/safe');

import {fsm} from './ServerStateMachine';


class AnswerEventProcessor {

    constructor(io, EsgrimaInstance) {
        this.io = io;
        this.EsgrimaInstance = EsgrimaInstance;
        this.testLoader = new TestLoader(EsgrimaInstance.getTests());
        this.testLoader.register(EsgrimaInstance.getTests(), this.EsgrimaInstance.getGroups())
        this.testLoader.registerGroups( this.EsgrimaInstance.getGroups());
        /**
         *  
         * Contains the group sockets.
         * For instance, for a particular group  
         */
        this.groupsSockets = {};

    }

    start()
    {


        var groups = this.testLoader.getGroupsList();
        console.log(this.testLoader);
        console.log(this.EsgrimaInstance.getTests());
        console.log(groups);
        
        console.info(colors.yellow.bgBlack("Web socket starting the controller"));
        var controller = this.io
            .of('/')
            .on('connection', function (socket) {
                groupsSockets[socket.conn.id] = socket;
                socket.emit('ready', {
                    that: 'only'
                    , '/chat': 'this  client is ready to execute tests'
                });


                socket.on('start', function(){

                });

                socket.on('ready', function(){
                
                });
                

                socket.on('executeTn', function(){

                });

                socket.on('stop', function(){

                });
                
                socket.on('disconnect', function(){
                    delete groupsSockets[socket.conn.id];
                });
            });


        for(var i = 0, size = groups.length; i < size ; i++){


            var group = groups[i];
            //console.info(colors.yellow.bgBlack("Do I really belong to the group?  " + group));
            //console.info(colors.yellow.bgBlack("Answer: " + this.EsgrimaInstance.getGroups()[group]()));
            console.info(colors.yellow.bgBlack("Web socket starting with " + group));
            let groupSocket = this.io
                .of('/'+group)
                .on('connection', function (socket) {

                    socket.on('executed', function(data){
                        // Test Complete
                        let id = data.test.id;
                        let reports = data.test.reports;
                        let assertations = data.test.assertations;

                        this.testLoader.completeTest(id, reports, assertations);

                    });


                    socket.on('disconnect', function(){
                        delete groupsSockets[socket.conn.id];
                    });
                    
                    
                    
                });

            this.groupsSockets[group] = groupSocket;
            
        }

    }
    
}

export {AnswerEventProcessor}