

var Configs = {port: 9001}
var DEBUG = true;

var old_console_log = console.log;
console.log = function() {
    if ( DEBUG ) {
        old_console_log.apply(this, arguments);
    }
}



export {Configs, DEBUG}

