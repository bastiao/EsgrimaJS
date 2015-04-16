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
        this.testLoader.registerGroups(this.EsgrimaInstance.getGroups());
        this.resetAll();
    }
    resetAll(){
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
    
    reset()
    {

        for (var _s in this.clientSockets)
        {
            

            if (this.clientSockets.hasOwnProperty(_s))
            {

                this.clientSockets[_s].emit("stopTests" );
            }

        }
        //this.resetAll();
        this.testLoader.start();
        //this.start();
        
        
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

        var controller = this.controller;

        fsm.startPipeline().then(function ()
            {
                console.log("Started the pipeline");
                controller.emit('startTests', {});
            }
        ).catch(function (err) {
                console.log("Error executing pipeline");
                console.log(err);
            });;
        
    }
    readyState(id) {

        this.readyWaiting.push(id);

    }
    clientsConnectedOrNot() {

        if (this.areAllTheClientsReady())
        {

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
    
    emitMessageForAGroup(message, args,  group)
    {
        console.log("Number of sockets connected: " +this.groupsSockets[group].length)
        for (var i = 0; i<this.groupsSockets[group].length; i++)
        {

            this.groupsSockets[group][i].emit(message, args);
            this.numberOfWaitingAnswers++;
        }
        
    }
    
    executeTest()
    {


        var idTest = this.testLoader.getCurrentTest().description;
        console.log(idTest);
        this.groupExecuting = ""; // TODO: fuck, this limits only a test each time :( MUST FIX!!
        
        this.numberOfReceivedReports = 0;
        
        for (var _s in this.groupsSockets)
        {

            if (this.groupsSockets.hasOwnProperty(_s))
            {
                
                if (this.testLoader.getCurrentTest().args.group===_s)
                
                {
                    this.groupExecuting = _s;
                    this.numberOfWaitingAnswers = 0;
                    console.log("Emiting Execute Tn of " + idTest + " to " + _s);
                    this.emitMessageForAGroup("executeTn", this.testLoader.getCurrentTest() , _s);
                    
                }
                
            }
        }

        fsm.executeTn( this.testLoader.getCurrentTest());
    }


    noMoreTests(){
        console.log("Emmiting message to the group noMoreTests");
        for (var _s in this.groupsSockets)
        {
            if (this.groupsSockets.hasOwnProperty(_s))
            {

                this.emitMessageForAGroup( "stopTests",{} ,_s );

            }

        }
        console.log("Emmiting message to the group noMoreTests (controllers)");

        for (var _s in this.clientSockets)
        {
            this.clientSockets[_s].emit("stopTests" );

        }

        fsm.noMoreTests().catch(function (err) {
            console.log("Error in noMoreTests");
            console.log(err);
        });;
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
                //console.info(colors.yellow.bgBlack("On Connect this sends a ready to another controller."));

                socket.emit('ready', {
                    sentByController: true
                    , 'ready': 'this  client is ready to execute tests'
                });


                socket.on('start', function(){

                });

                socket.on('ready', function(data){


                    
                    //console.info(colors.yellow.bgBlack("The thing is now ready to start the pipeline."));
                    fsm.readyToRun({"id": socket.conn.id}).catch(function (err) {
                        console.log(err);
                    });

                    
                    
                });
                

                socket.on('stop', function(){

                });
                
                socket.on('disconnect', function(){
                    console.log("Disconnecting.");
                    delete self.clientSockets[socket.conn.id];
                    //resetServerStateMachine();
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
                    
                    /*
                    socket.on('reportTn', function(data){
                        // Test Complete
                        let id = data.test.id;
                        let reports = data.test.reports;
                        let assertations = data.test.assertations;

                        this.testLoader.completeTest(id, reports, assertations);

                    });*/

                    socket.on('reportTn', function(data){
                        console.log("Arrived a new report from executing.");
                        console.log(data);
            

                        self.numberOfReceivedReports++;
                        if (self.numberOfReceivedReports===self.numberOfWaitingAnswers)
                        {
                            fsm.reportTn();
                        }
                        

                    });


                    socket.on('disconnect', function(){
                        console.log("Disconnecting." + g);
                        //console.log(socket);
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