/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 14/04/15.
 */


import {ServiceTest} from './tests/testHandler';

import {TestLoader} from '../../../common/TestLoader';
var colors = require('colors/safe');



// Possibilities
// https://github.com/jakesgordon/javascript-state-machine
// https://github.com/vstirbu/fsm-as-promised
/*
var StateServerEnum = {
    LISTEN : {name: "Lister"},
    PREPARE_TESTS : {name: "Prepare tests and load the pipeline"},
    WAIT_FOR_CLIENTS_READY : {name: "Wait for all clients are ready"},
    ARE_CLIENTS_READY : {name: "Are all the clients ready?"},
    RUN_NEXT_TEST : {name: "Run the next test"},
    WAIT_FOR_REPORT_TN : {name: "Wait for report of test Tn"}
};*/

var StateMachine = require('fsm-as-promised');




var AnswerEventProcessorInstance = null;

// Full faith on javascript, and try to find this circular injection.
// That's why I really like DI. Magic happens!


var setEventProcessor = function(instance)
{
    AnswerEventProcessorInstance = instance;
};

var fsm = StateMachine({
    initial: 'LISTEN',
    events: [
        { name: 'start', from: 'LISTEN', to: 'PREPARETESTS' },
        { name: 'startPipeline', from: 'PREPARETESTS', to: 'WAITFORCLIENTSREADY' },
        { name: 'readyToRun', from: ['WAITFORCLIENTSREADY'], to: 'ARECLIENTSREADY' },
        { name: 'missClients', from: ['ARECLIENTSREADY'], to: 'WAITFORCLIENTS_READY' },
        { name: 'allClientsReady', from: ['ARECLIENTSREADY'], to: 'RUNNEXTTEST' },
        { name: 'executeTn', from: ['RUNNEXTTEST'], to: 'WAITFORREPORTTN' },
        { name: 'reportTn', from: ['WAITFORREPORTTN'], to: 'RUNNEXTTEST' },
        { name: 'noMoreTests', from: ['RUNNEXT_TEST'], to: 'LISTEN' }
        
    ],
    callbacks: {
        onenteredPREPARETESTS: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));

            AnswerEventProcessorInstance.prepareAndLoad();
            return options;
        },
        onstartPipeline: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onreadyToRun: function (options) {
            
            AnswerEventProcessorInstance.readyState(id);
            return options;
        },
        onmissClients: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onallClientsReady: function (options) {
            
            console.info(colors.black.bgYellow("State: "+options.name));


            return options;
            
        },
        onexecuteTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onreportTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            AnswerEventProcessorInstance.runNextTest();
            return options;
        },
        onnoMoreTests: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            // Stop! Do nothing.
            return options;
        }
    }
});


export {fsm, setEventProcessor}