/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */



var ClientServiceStart = function (socket)
{
    socket.on('setValue', function (data) {
        console.log("Set Value");
        console.log(data);
        socket.emit('start', { start: 'true' });
    });
};

export {ClientServiceStart};