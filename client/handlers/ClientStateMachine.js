/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 14/04/15.
 */



var StateClientEnum = {
    LISTEN : {name: ""},
    TEST_LOAD_READY : {name: ""},
    WAIT_FOR_EXECUTATION : {name: ""},
    EXECUTE_TN : {name: ""}
    
};





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


export {fsm}