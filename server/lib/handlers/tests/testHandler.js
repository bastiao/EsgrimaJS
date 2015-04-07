




var ServiceTest = function(io, testLoader)
{
    var testServiceWS = io
        .of('/test')
        .on('connection', function (socket) {
            
            
            socket.emit('item', { news: 'item' });
            
            
        });
    
    return testServiceWS;

}


export {ServiceTest}
