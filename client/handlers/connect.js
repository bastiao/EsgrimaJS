/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


var ClientServiceConnect = function (socket)
{
    socket.on('connect', function (data) {
        console.log("Connected");
        console.log(data);
        //socket.emit('connect', { connect: 'true' });
    });
};

export {ClientServiceConnect};