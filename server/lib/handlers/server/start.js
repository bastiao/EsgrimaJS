

var StartHandler = function(io)
{
   var news = io
  .of('/start')
  .on('connection', function (socket) {
    //socket.emit('item', { news: 'item' });
  });

}


export {StartHandler}
