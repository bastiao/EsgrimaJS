/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


var ServerStartHandler= function(app, io)
{

    app.get("/api/", function(req, res){
        res.send("It works!");
    });
    
}

var ServerStopHandler= function(app, io)
{

    app.get("/api/", function(req, res){
        res.send("It works!");
    });

}



var ServerClientsHandler= function(app, io)
{

    app.get("/api/", function(req, res){
        res.send("It works!");
    });

}



var ServerGroupsHandler= function(app, io)
{

    app.get("/api/", function(req, res){
        res.send("It works!");
    });

}


export {ServerStartHandler, ServerStopHandler, ServerClientsHandler, ServerGroupsHandler}





