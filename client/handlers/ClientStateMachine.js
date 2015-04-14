/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 14/04/15.
 */



var StateClientEnum = {
    LISTEN : {name: ""},
    TEST_LOAD_READY : {name: ""},
    WAIT_FOR_EXECUTATION : {name: ""},
    EXECUTE_TN : {name: ""}
    
};


var EventProcessorInstance = null;

var setEventProcessor = function(instance)
{
    EventProcessorInstance = instance;
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
            
            
            console.log("Start Tests is now ok. We are now ready to execute.");
            console.log(EventProcessorInstance);
            EventProcessorInstance.ready();
            // Load the tests.

            return options;
        },
        onready: function (options) {


            console.log("Now, the client is ready to execute tests.");
            // Emited ready.

            return options;
        },
        onexecuteTn: function (options) {
            
            // Get the tests from the test loader and run it.
            console.log("Now it is the time to Execute a test TN!");
            EventProcessorInstance.executeTest()
            return options;
        },
        onreportTn: function (options) {
            
            // Send back the report by web sockets.

            return options;
        },
        onstopTests: function (options) {

            return options;
        }
       
    }
});


export {fsm,setEventProcessor }