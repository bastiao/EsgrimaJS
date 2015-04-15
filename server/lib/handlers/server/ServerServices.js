/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */

var colors = require('colors');
var colors = require('colors/safe');

import {fsm} from '../ServerStateMachine';


var ServerStartHandler= function(app, io)
{

    app.get("/api/start", function(req, res){
        // Send the message for all the clients

        console.info(colors.black.bgYellow("Starting REST service"));
        console.log(fsm);
        fsm.start().then(function()
            {
                fsm.startPipeline().catch(function (err) {
                    console.log("fsm.current");
                    console.log(fsm.current);
                    console.log(err);
                });
                
            }
        
        ).catch(function (err) {
            console.log("fsm.current");
            console.log(fsm.current);
            console.log(err);
        });

        // Return the message (response to the request)
        res.setHeader('Content-Type', 'application/json');
        res.send({command:"start", group:'all'});

        
        
        
    });
    
}

var ServerStopHandler= function(app, io)
{

    app.get("/api/stop", function(req, res){
        // Send the message for all the clients
        console.info(colors.black.bgYellow("@Reset state machine"));
        fsm.resetStates().catch(function (err) {
            console.log("fsm.current");
            console.log(fsm.current);
            console.log(err);
        });
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
    ServerStopHandler(app,io);
    ServerClientsHandler(app,io);
    ServerGroupsHandler(app,io);
}




export {RegisterServerServices}





