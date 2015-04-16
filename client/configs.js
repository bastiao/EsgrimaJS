/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */



// Change here what you want.


var Configs = {url: "https://localhost:8443/", wsUrl: "wss://localhost:8443/"}
var DEBUG = true;


// Do not touch here!

var old_console_log = console.log;
console.log = function() {
    if ( DEBUG ) {
        old_console_log.apply(this, arguments);
    }
}
//var testLoader = "myAppTests";
var testLoader = "examples";
export {Configs, DEBUG, testLoader}
