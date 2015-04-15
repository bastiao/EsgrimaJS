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
        this.clientSockets = {};
        this.readyWaiting = [];
        
    }

    areAllTheClientsReady()
    {

        var count = 0;
        for (var i in this.clientSockets) {
            if (this.clientSockets.hasOwnProperty(i)) count++;
        }


        console.log(count);
        
        console.log(this.readyWaiting.length);
        return (count) <= this.readyWaiting.length;
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
    readyState(id) {

        console.info(colors.black.bgYellow("readyState"));

        this.readyWaiting.push(id);

    }
    clientsConnectedOrNot() {
        console.info(colors.black.bgYellow("clientsConnectedOrNot"));
        if (this.areAllTheClientsReady())
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
        var value = this.testLoader.hasNext();
        if (this.testLoader.hasNext())
            this.testLoader.next();
        return value;

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

        fsm.executeTn( this.testLoader.getCurrentTest());
    }


    noMoreTests(){

        for (var _s in this.groupSockets)
        {
            if (this.groupSockets.hasOwnProperty(_s))
            {

                this.groupSockets[_s].emif("stopTests");
            }

        }

        for (var _s in this.clientSockets)
        {
            if (this.clientSockets.hasOwnProperty(_s))
            {

                this.clientSockets[_s].emif("stopTests" );
            }

        }

        fsm.noMoreTests();
    }
    
    
    start()
    {

        var groups = this.testLoader.getGroupsList();

        var groupsSockets = this.groupsSockets;
        var clientSockets =  this.clientSockets;
        console.info(colors.yellow.bgBlack("Web socket starting the controller"));
        var controller = this.io
            .of('/')
            .on('connection', function (socket) {

                clientSockets[socket.conn.id] = socket;
                console.info(colors.yellow.bgBlack("On Connect this sends a ready to another controller."));

                socket.emit('ready', {
                    sentByController: true
                    , 'ready': 'this  client is ready to execute tests'
                });


                socket.on('start', function(){

                });

                socket.on('ready', function(data){

                    console.log("fsm.current");
                    console.log(fsm.current);
                    console.log("data");
                    console.log(data);
                    
                    console.info(colors.yellow.bgBlack("The thing is now ready to start the pipeline."));
                    fsm.readyToRun({"id": socket.conn.id}).catch(function (err) {
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
                    delete clientSockets[socket.conn.id];
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

                    groupsSockets[group] = socket;

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

            
            
        }

    }
    
}

export {AnswerEventProcessor}