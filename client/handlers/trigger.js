/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */

window.$ = window.jQuery = require('jquery');


var ClientServiceTrigger = function (socket)
{
    socket.on('trigger', function (data) {

        socket.emit('start', { start: 'true' });
    });
};

export {ClientServiceStart};