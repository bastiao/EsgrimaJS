/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


import {Configs} from './configs';

console.log("Require Socket IO");
var io = require('socket.io-client');

import {fsm} from './handlers/ClientStateMachine';

class EventProcessor {

    constructor(EsgrimaInstance) {
        this.EsgrimaInstance = EsgrimaInstance;
        this.testSuiteList = EsgrimaInstance.getTests();
        this.groupName = EsgrimaInstance.getMyGroup();
        

    }

    start() {
        // on /start
        console.log("EventProcessor: start connecting");

        this.controller = io.connect(Configs.wsUrl);
        var controller = this.controller;
        this.controller.on('connect', function (data) {
            console.log("The client is now starting with");

        });


        this.controller.on('startTests', function (data) {
            console.log("Tests are starting");
            fsm.startTests();
            //controller.emit('ready');
        });


        this.controller.on('stopTests', function (data) {
            console.log("Reset the state machine.");
            console.log("No more tests available!!");
            fsm.stopTests();

        });

        this.controller.on('disconnect', function (data) {

        });

        this.controller.on('reconnect', function (data) {

        });


        console.log("This is my group:");
        console.log(this.groupName);
        

        this.group = io.connect(Configs.wsUrl+this.groupName);
        var group = this.group;
        var self = this;
        this.group.on('connect', function (data) {
            //group.emit('ready');
            console.log("New connection in " + self.groupName);
        });

        this.group.on('executeTn', function (data) {
            // Start Executing the tests.
            // Id of tests is: data.id
            
            console.log("Execute a test, TN");
            console.log(data);
            
            fsm.executeTn(data);
        });
        
        this.group.on('disconnect', function (data) {
            // TODO: handle that in future
            console.log("Disconnecting-.-");
        });

        this.group.on('reconnect', function (data) {
            // TODO: handle that in future
            console.log("Reconnect-.-");
            
        });

    }

    ready() {

        console.log("fsm.current");
        console.log(fsm.current);
        fsm.readyToRun().catch(function (err) {
            console.log(err);
        });

    }
    emitsReadyToRun(){
        this.controller.emit('ready');
    }
    stopTests()
    {
        this.controller.emit('stoppedTests');
        
    }
    
    report(id, report)
    {
        fsm.reportTn(id);
        //Send the reports back.
        this.controller.emit('reportTn', report);
        
    }
    
    sendReport()
    {
        this.report(this.executedTest, this.reportedTest)
        
    }
    
    executeTest(id)
    {
        this.executedTest = id;
        console.log("Executing test number: " + id);
        // The code to execute the test
        this.EsgrimaInstance.getTestByName(id).callbackOfTests(this.EsgrimaInstance.getTestByName(id).args);
        this.reportedTest = {};
        
    }
    

    executedTest(id, reports,assertations)
    {
        // The code to executed the test
        // TODO: more complex to implement (future)

    }

    getSocket()
    {
        return this.socket;
        
    }

}


export {EventProcessor}