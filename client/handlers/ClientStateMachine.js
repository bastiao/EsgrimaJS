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
        { name: 'startTests', from: 'LISTEN', to: 'TEST_LOAD_READY' },
        { name: 'ready', from: 'TEST_LOAD_READY', to: 'WAIT_FOR_EXECUTATION' },
        { name: 'executeTn', from: 'WAIT_FOR_EXECUTATION', to: 'EXECUTE_TN' },
        { name: 'reportTn', from: 'EXECUTE_TN', to: 'WAIT_FOR_EXECUTATION' },
        { name: 'stopTests', from: 'EXECUTE_TN', to: 'LISTEN' },
        
        
    ],
    callbacks: {
        onstartTests: function (options) {
  
            return options;
        },
        onready: function (options) {

            return options;
        },
        onexecuteTn: function (options) {

            return options;
        },
        onreportTn: function (options) {

            return options;
        },
        onstopTests: function (options) {

            return options;
        },
       
    }
});


export {fsm}