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

// Full faith on javascript, and try to find this circular injection.
// That's why I really like DI. Magic happens! 


var setEventProcessor = function(instance)
{
    EventProcessorInstance = instance;
};

var StateMachine = require('fsm-as-promised');


var fsm = StateMachine({
    initial: 'LISTEN',
    events: [
        { name: 'startTests', from: 'LISTEN', to: 'TESTLOADREADY' },
        { name: 'readyToRun', from: 'TESTLOADREADY', to: 'WAITFOREXECUTATION' },
        { name: 'executeTn', from: 'WAITFOREXECUTATION', to: 'EXECUTETN' },
        { name: 'reportTn', from: 'EXECUTETN', to: 'WAITFOREXECUTATION' },
        { name: 'stopTests', from: ['LISTEN','EXECUTETN','TESTLOADREADY','WAITFOREXECUTATION'],
            to: 'LISTEN' },
        
    ],
    callbacks: {
        onstartTests: function (options) {
            
            
            console.log("Start Tests is now ok. We are now ready to execute.");
            console.log(EventProcessorInstance);
            
            // Load the tests.

            return options;
        },
        onenteredTESTLOADREADY: function (options) {

            console.log("Leaving: Start Tests is now ok. We are now ready to execute.");
            console.log(fsm.current);
            EventProcessorInstance.ready();
            
        },
        onleaveTESTLOADREADY: function (options)
        {
            
            
        },
        onreadyToRun: function (options) {

            EventProcessorInstance.emitsReadyToRun();
            console.log("Now, the client is ready to execute tests.");
            // Emited ready.

            return options;
        },


        onexecuteTn: function (options) {
            
            // Get the tests from the test loader and run it.
            console.log("Now it is the time to Execute a test TN!");
            console.log(options.args);
            EventProcessorInstance.executeTest(options.args[0].description);
            return options;
        },
        
        onenteredEXECUTETN: function (options)
        {
            console.log(options);
            EventProcessorInstance.sendReport();
            return options;
        },

        
        onreportTn: function (options) {
            
            // Send back the report by web sockets.
            // It is needed to take into account the report. 
            

            return options;
        },
        onstopTests: function (options) {
            

            
            EventProcessorInstance.stopTests();
            return options;
        }
       
    }
});


export {fsm,setEventProcessor }