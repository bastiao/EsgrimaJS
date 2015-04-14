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


var fsm = StateMachine({
    initial: 'LISTEN',
    events: [
        { name: 'start', from: 'LISTEN', to: 'PREPARE_TESTS' },
        { name: 'startPipeline', from: 'PREPARE_TESTS', to: 'WAIT_FOR_CLIENTS_READY' },
        { name: 'ready', from: ['WAIT_FOR_CLIENTS_READY'], to: 'ARE_CLIENTS_READY' },
        { name: 'missClients', from: ['ARE_CLIENTS_READY'], to: 'WAIT_FOR_CLIENTS_READY' },
        { name: 'allClientsReady', from: ['ARE_CLIENTS_READY'], to: 'RUN_NEXT_TEST' },
        { name: 'executeTn', from: ['RUN_NEXT_TEST'], to: 'WAIT_FOR_REPORT_TN' },
        { name: 'reportTn', from: ['WAIT_FOR_REPORT_TN'], to: 'RUN_NEXT_TEST' },
        { name: 'noMoreTests', from: ['RUN_NEXT_TEST'], to: 'LISTEN' }
        
    ],
    callbacks: {
        onstart: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onstartPipeline: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
            return options;
        },
        onready: function (options) {

        },
        onmissClients: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));
        },
        onallClientsReady: function (options) {

            console.info(colors.black.bgYellow("State: "+options.name));
        },
        onexecuteTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
        },
        onreportTn: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
        },
        onnoMoreTests: function (options) {
            console.info(colors.black.bgYellow("State: "+options.name));
        }
    }
});

class ServerStateMachine {
    
    
    constructor(io, app)
    {
        this.io = io;
        this.app = app;
        
    }
    
    
    
    
    
    
    
    
    
}

export {fsm}