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
        console.log("Group Name")
        console.log(groupName);
    }

    start() {
        // on /start
        console.log("EventProcessor: start connecting");

        this.controller = io.connect(Configs.wsUrl);
        var controller = this.controller;
        this.controller.on('connect', function (data) {
            console.log("The client is now starting with2");
            fsm.startTests();
            controller.emit('ready');
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

        this.group.on('execute', function (data) {
            // Start Executing the tests.
        });
        
        this.group.on('disconnect', function (data) {

        });

        this.group.on('reconnect', function (data) {

        });
        


    }
    
    
    ready()
    {
        fsm.ready();
        this.controller.emit('ready');

    }
    
    
    report(id, report)
    {
        //Send the reports back.
        
    }
    
    executeTest(id)
    {
        // The code to execute the test
        this.testSuiteList[id]();

    }
    executedTest(id, reports,assertations)
    {
        // The code to executed the test

    }

    getSocket()
    {
        return this.socket;
        
    }

}


export {EventProcessor}