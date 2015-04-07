/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


import {Configs} from './configs';


import {ClientServiceStart} from './handlers/start';
import {ClientServiceConnect} from './handlers/connect';
console.log("Require Socket IO");
var io = require('socket.io-client');
console.log(io);
class EventProcessor {

    constructor() {
        this.socket = io(Configs.url);
    }

    start() {
        // on /start
        ClientServiceStart(this.socket);
    }

    getSocket()
    {
        return this.socket;
        
    }

}


export {EventProcessor}