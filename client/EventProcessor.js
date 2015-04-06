/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */



    
    
import {Configs} from './configs';
var io = require('socket.io');



socket.on('connect', function () {
    socket.send('hi');
}
socket.on('message', function (msg) {
    // my msg
});
   
    
    
class EventProcessor {
    
    constructor()
    {
        this.socket = io(Configs.url);
    }
    
    start()
    {

    }
    
}