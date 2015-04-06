/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


var ServerStartHandler= function(app, io)
{

    app.get("/api/start", function(req, res){
        io.emit('some event', { for: 'everyone' });
        res.setHeader('Content-Type', 'application/json');
        res.send({result:"works"});
        
    });
    
}

var ServerStopHandler= function(app, io)
{

    app.get("/api/stop", function(req, res){
        res.send("It works!");
    });

}


var ServerClientsHandler= function(app, io)
{

    app.get("/api/clients", function(req, res){
        res.send("It works!");
    });

}

var ServerGroupsHandler= function(app, io)
{

    app.get("/api/groups", function(req, res){
        res.send("It works!");
    });

}


export {ServerStartHandler, ServerStopHandler, ServerClientsHandler, ServerGroupsHandler}





