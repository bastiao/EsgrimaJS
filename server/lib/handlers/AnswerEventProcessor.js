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
        this.readyWaiting = [];
        
    }

    areAllTheClientsReady()
    {
        console.log(this.groupsSockets.length);
        return this.groupsSockets.length != this.readyWaiting.length;
    }

    prepareAndLoad()
    {
        console.info(colors.black.bgYellow("prepareAndLoad"));
        
        
        var controller = this.controller;
        console.log("fsm.current");
        console.log(fsm.current);
        fsm.startPipeline().then(function ()
            {
                console.log("Started the pipeline?");
                controller.emit('startTests', {});
            }
        ).catch(function (err) {
                console.log("fsm.current");
                console.log(fsm.current);
                console.log(err);
            });;
        
    }
    readyState(id)
    {

        console.info(colors.black.bgYellow("readyState"));
        
        this.readyWaiting.push(id);
        if (areAllTheClientsReady)
        {
            console.info(colors.black.bgYellow("areAllTheClientsReady"));
            fsm.allClientsReady();
            
        }
        else{
            console.info(colors.black.bgYellow("missClients"));
            fsm.missClients();
        }
        
    }
    cleanReady() {
        this.readyWaiting = [];
    }

    
    runNextTest()
    {

        if (this.testLoader.hasNext())
            this.testLoader.next();
    }

    executeTest()
    {

        var idTest = this.testLoader.getCurrentTest().id;
        for (var _s in this.groupSockets)
        {
            if (this.groupSockets.hasOwnProperty(_s))
            {
                
                this.groupSockets[_s].emif("executeTn", this.testLoader.getCurrentTest() );
            }
            
        }
    }
    
    start()
    {

        var groups = this.testLoader.getGroupsList();

        var groupsSockets = this.groupsSockets;
        console.info(colors.yellow.bgBlack("Web socket starting the controller"));
        var controller = this.io
            .of('/')
            .on('connection', function (socket) {

                groupsSockets[socket.conn.id] = socket;
                socket.emit('ready', {
                    that: 'only'
                    , 'ready': 'this  client is ready to execute tests'
                });


                socket.on('start', function(){

                });

                socket.on('ready', function(){

                    console.log("fsm.current");
                    console.log(fsm.current);
                    
                    
                    console.info(colors.yellow.bgBlack("The thing is now ready to start the pipeline."));
                    fsm.readyToRun().catch(function (err) {
                        console.log(err);
                    });
                    console.log("fsm.current");
                    console.log(fsm.current);
                    
                    
                    
                });
                

                socket.on('reportTn', function(){

                    fsm.reportTn();

                });

                socket.on('stop', function(){

                });
                
                socket.on('disconnect', function(){
                    delete groupsSockets[socket.conn.id];
                });
            });

        this.controller = controller;
        for(var i = 0, size = groups.length; i < size ; i++){


            var group = groups[i];
            //console.info(colors.yellow.bgBlack("Do I really belong to the group?  " + group));
            //console.info(colors.yellow.bgBlack("Answer: " + this.EsgrimaInstance.getGroups()[group]()));
            console.info(colors.yellow.bgBlack("Web socket starting with " + group));
            let groupSocket = this.io
                .of('/'+group)
                .on('connection', function (socket) {

                    socket.on('reportTn', function(data){
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

            groupsSockets[group] = groupSocket;
            
        }

    }
    
}

export {AnswerEventProcessor}