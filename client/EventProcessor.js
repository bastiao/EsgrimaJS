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
            console.log("The client is now starting with2");

        });


        this.controller.on('startTests', function (data) {
            console.log("Tests are starting");
            fsm.startTests();
            controller.emit('ready');
        });


        this.controller.on('stopTests', function (data) {

            fsm.stopTests();

        });

        this.controller.on('disconnect', function (data) {

        });

        this.controller.on('reconnect', function (data) {

        });


        this.group = io.connect(Configs.wsUrl+this.groupName);
        var group = this.group;

        this.group.on('connect', function (data) {
            group.emit('ready');
        });

        this.group.on('executeTn', function (data) {
            // Start Executing the tests.
            // Id of tests is: data.id
            fsm.executeTn(data);
        });
        
        this.group.on('disconnect', function (data) {
            // TODO: handle that in future
        });

        this.group.on('reconnect', function (data) {
            // TODO: handle that in future
            
        });

    }
    
    
    ready()
    {

        console.log("fsm.current");
        console.log(fsm.current);
        fsm.readyToRun().catch(function (err) {
            console.log(err);
        });


        this.controller.emit('ready');

    }
    stopTests()
    {
        this.controller.emit('stoppedTests');
        
    }
    
    
    report(id, report)
    {
        //Send the reports back.
        this.controller.emit('reportTn', report);
        
    }
    
    executeTest(id)
    {
        // The code to execute the test
        this.testSuiteList[id]();
        fsm.reportTn(id);
        
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