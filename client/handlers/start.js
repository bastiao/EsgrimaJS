/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */

var ClientServiceStart = function (socket)
{
    socket.on('start', function (data) {
        
        console.log("The client is now starting with");
        console.log(data);
        //socket.emit('start', { start: 'true' });
    });
};

export {ClientServiceStart};