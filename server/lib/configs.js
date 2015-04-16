


// Change here what you want.


var Configs = {port: 9001}
var DEBUG = true;


var TESTS_DIRECTORY = "examples";


// Do not touch here!

var old_console_log = console.log;
console.log = function() {
    if ( DEBUG ) {
        old_console_log.apply(this, arguments);
    }
}
var testLoader = "myAppTests";
export {Configs, DEBUG, TESTS_DIRECTORY, testLoader}
