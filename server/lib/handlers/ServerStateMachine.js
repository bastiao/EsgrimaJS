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
        { name: 'missClients', from: ['ARECLIENTSREADY'], to: 'WAITFORCLIENTSREADY' },
        { name: 'allClientsReady', from: ['ARECLIENTSREADY'], to: 'RUNNEXTTEST' },
        { name: 'executeTn', from: ['RUNNEXTTEST'], to: 'WAITFORREPORTTN' },
        { name: 'reportTn', from: ['WAITFORREPORTTN'], to: 'RUNNEXTTEST' },
        { name: 'noMoreTests', from: ['RUNNEXTTEST'], to: 'LISTEN' },
        
        { name: 'resetStates', from: ['LISTEN','PREPARETESTS', 'WAITFORCLIENTSREADY', 'ARECLIENTSREADY',
            'RUNNEXTTEST', 'WAITFORREPORTTN' ], to: 'LISTEN' }
        

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
            
            AnswerEventProcessorInstance.readyState(options.args.id);
            return options;
        },

        onenteredARECLIENTSREADY: function (options) {
            AnswerEventProcessorInstance.clientsConnectedOrNot();
            return options
        },
        onmissClients: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onallClientsReady: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));

            return options;

        },

        onenteredRUNNEXTTEST: function (options) {
            console.info(colors.black.bgRed("Entering the Run Next Tests"));
            var _v = AnswerEventProcessorInstance.runNextTest();
            if (_v)
            {
                console.info(colors.black.bgRed("There are tests to run. Emitting to sockets"));
                console.info(colors.black.bgRed("and wait for the reports."));
                AnswerEventProcessorInstance.executeTest();
            }
            else
            {

                console.info(colors.black.bgRed("No more tests available."));
                AnswerEventProcessorInstance.noMoreTests();

            }

        },

        onexecuteTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onreportTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));

            return options;
        },
        onnoMoreTests: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            // Stop! Do nothing.
            return options;
        },

        onresetStates: function(options)
        {

            console.log("Reset sstate Machine!!");
            AnswerEventProcessorInstance.reset();
            
        }
    }
});

var resetServerStateMachine = function(){
    fsm.resetStates();
}



export {fsm, setEventProcessor, resetServerStateMachine}