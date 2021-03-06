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

        this.reportedTest = {};

        this.stopTestsNOW = false;
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


        var self = this;

        this.controller.on('stopTests', function (data) {
            console.log("Reset the state machine.");
            console.log("No more tests available!!");
            console.log(data);
            self.stopTestsNOW = true;

            if (data!==undefined && data.force)
            {
                console.log("stopTests force");
                setTimeout(function () {

                fsm.stopTests().then(function ()
                    {
                        self.stopTestsNOW = false;
                        fsm.startTests();
                    }).catch(function (err) {
                    console.log(err);
                });
               
                },100);
            }
            else
            {
                console.log("stopTests without force");
                fsm.stopTests()
            }
            
            

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

    isToStopTests()
    {
        return this.stopTestsNOW;
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
        console.log("######### Emiting reportTn from " + id);
        this.group.emit('reportTn', report);
        
    }
    
    sendReport()
    {
        this.report(this.executedTest, this.reportedTest)
        
    }

    preExecuteTest(id) {
        this.executedTest = id;
        console.log("Executing test number: " + id);
        // The code to execute the test
    }
    executeTest()
    {


        //EventProcessorInstance.sendReport();
        console.log(this.executedTest);
        var testToExecute = this.EsgrimaInstance.getTestByName(this.executedTest);
        var self = this;

        this.reportedTest = {"id": self.executedTest};
        console.log(testToExecute);
        var linkToFunction = testToExecute.args.callBackResult;
        if (testToExecute.args.originalCallBackResult===undefined)
        {

            testToExecute.args.originalCallBackResult = linkToFunction;

        }
        var linkToExec = testToExecute.args.originalCallBackResult;
        
        var callBackResultDemo = function(){
            console.log("Finishing the operation!!! ");
            self.report(self.executedTest, self.reportedTest)

            linkToExec();
        } ;
        testToExecute.args.callBackResult = callBackResultDemo;
        //testToExecute.callbackOfTests(testToExecute.args);
        try{
            testToExecute.callbackOfTests(testToExecute.args);
        }catch (err)
        {
            console.log(err);
            self.reportedTest = {'error': JSON.stringify(err)} ; 
            testToExecute.args.callBackResult();


            
            //throw err;
        }
        //this.reportedTest = {};
        
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