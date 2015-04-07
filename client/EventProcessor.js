/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


import {Configs} from './configs';


import {ClientServiceStart} from './handlers/start';
import {ClientServiceConnect} from './handlers/connect';



var io = require('socket.io');


    
class EventProcessor {

    constructor() {
        this.socket = io(Configs.url);
    }

    start() {
        ClientServiceStart(this.socket);
        ClientServiceConnect(this.socket);
        

    }



}


export {EventProcessor}