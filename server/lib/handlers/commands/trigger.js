



var ServiceTrigger = function(io, testLoader)
{
    var news = io
        .of('/trigger')
        .on('connection', function (socket) {
            socket.emit('item', { news: 'item' });
        });

}


export {ServiceTrigger}
