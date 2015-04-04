

var StartHandler = function(io)
{
   var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });


}


export {StartHandler}
