/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


var ServerStartHandler= function(app, io)
{

    app.get("/api/start", function(req, res){
        // Send the message for all the clients
        
        console.log("Starting start");

        
        io.sockets.emit({command:"start", group:'all'}, { for: 'everyone' });
        io.sockets.emit({command:"start", group:'all'}, { for: 'everyone' });

        // Return the message (response to the request)
        res.setHeader('Content-Type', 'application/json');
        res.send({command:"start", group:'all'});
        
    });
    
}

var ServerStopHandler= function(app, io)
{

    app.get("/api/stop", function(req, res){
        // Send the message for all the clients
        io.emit({command:"stop", group:'all'}, { for: 'everyone' });

        // Return the message (response to the request)
        res.setHeader('Content-Type', 'application/json');
        res.send({command:"stop", group:'all'});
    });

}


var ServerClientsHandler= function(app, io)
{

    app.get("/api/clients", function(req, res){
        // Return the message (response to the request)
        res.setHeader('Content-Type', 'application/json');
        // TODO (bastiao): implement it in the future!
        res.send({command:"clients", group:'all', clients: []});
    });

}

var ServerGroupsHandler= function(app, io)
{

    app.get("/api/groups", function(req, res){
        // Return the message (response to the request)
        res.setHeader('Content-Type', 'application/json');
        // TODO (bastiao): implement it in the future!
        res.send({command:"clients", group:'all', groups: []});
    });

}

var RegisterServerServices = function(app, io)
{
    ServerStartHandler(app,io);
    ServerStartHandler(app,io);
    ServerStopHandler(app,io);
    ServerClientsHandler(app,io);
    ServerGroupsHandler(app,io);
}


export {RegisterServerServices}





