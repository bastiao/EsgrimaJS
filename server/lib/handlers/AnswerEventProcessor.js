/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */
    

import {ServiceTest} from './tests/testHandler';

import {TestLoader} from '../../../common/TestLoader';
var colors = require('colors/safe');

import {fsm, setEventProcessor, resetServerStateMachine}  from './ServerStateMachine';


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
        var groupsNative = this.EsgrimaInstance.getGroups();
        for (var _g in groupsNative)
        {
            if (groupsNative.hasOwnProperty(_g))
            {
                this.groupsSockets[_g] = [];
            }
            
        }
        
        
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

        //console.log("Get Tests: ");
        //console.log(this.testLoader.getTests());
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
        console.log("Has next tests?");
        console.log(value);
        if (this.testLoader.hasNext())
            this.testLoader.next();
        return value;

    }
    
    emitMessageForAGroup(message, args,  group)
    {
        console.log("Number of sockets connected: " +this.groupsSockets[group].length)
        for (var i = 0; i<this.groupsSockets[group].length; i++)
        {

            this.groupsSockets[group][i].emit(message, args);
        }
        
    }
    
    executeTest()
    {

        console.log("Current test: ");
        console.log(this.testLoader.getCurrentTest());
        
        var idTest = this.testLoader.getCurrentTest().description;
        console.log(idTest);
        console.log(this.groupsSockets);
        
        for (var _s in this.groupsSockets)
        {
            console.log("Loging " + _s);
            console.log("Checking to "+this.testLoader.getCurrentTest().args.group);
            if (this.groupsSockets.hasOwnProperty(_s))
            {
                
                console.log("Checking to "+this.testLoader.getCurrentTest().args.group);
                console.log("Checking to _S "+_s);
                if (this.testLoader.getCurrentTest().args.group===_s)
                {
                    console.log("Emiting Execute Tn of " + idTest + " to " + _s);
                    this.emitMessageForAGroup("executeTn", this.testLoader.getCurrentTest() , _s);
                    
                }
                
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
        var self = this;
        console.info(colors.yellow.bgBlack("Web socket starting the controller"));
        var controller = this.io
            .of('/')
            .on('connection', function (socket) {

                self.clientSockets[socket.conn.id] = socket;
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
                    console.log("Disconnecting.");
                    delete self.clientSockets[socket.conn.id];
                    resetServerStateMachine();
                });
            });

        this.controller = controller;
        
        console.log(groups);

        for(var i = 0; i < groups.length ; i++){


            var group = groups[i];

            //console.info(colors.yellow.bgBlack("Do I really belong to the group?  " + group));
            //console.info(colors.yellow.bgBlack("Answer: " + this.EsgrimaInstance.getGroups()[group]()));
            console.info(colors.yellow.bgBlack("Web socket starting with " + group));
            var groupSocket = this.io
                .of('/'+group)
                .on('connection', (function (g, socket) {

                    //console.log(self.groupsSockets[group]);

                    //console.log(self.groupsSockets[group]);
                    

                    socket.on('reportTn', function(data){
                        // Test Complete
                        let id = data.test.id;
                        let reports = data.test.reports;
                        let assertations = data.test.assertations;

                        this.testLoader.completeTest(id, reports, assertations);

                    });


                    socket.on('disconnect', function(){
                        console.log("Disconnecting." + g);
                        console.log(socket);
                        /*for (var j = 0 ; j<self.groupsSockets[group].length; j++)
                        {
                            if (self.groupsSockets[group][j].conn.id=== socket.conn.id)
                            {
                                delete self.groupsSockets[group][j];
                                
                            }
                            
                        }*/
                    })
                    
                    
                    
                }).bind(this, group));
            console.info(colors.yellow.bgBlack("Added Socket " + group));
            self.groupsSockets[group].push(groupSocket);
            
        }

    }
    
}

export {AnswerEventProcessor}