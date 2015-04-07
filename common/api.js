/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */


/** TODO: this is an ongoing way to try to implement the SDK! 
 * For now, we need to drop this idea. 
 * 
 * 
 * TODO: maybe it is not possible to implement it in a totally distributed way?
 * 
 * Still not sure, thinking about*/
var EsgrimaJSMain = function (){
    
    
};

var esgrimajs = function(){
    return new Promise((resolve, reject) => {
        EsgrimaJSMain();
    })
};

var triggerNG = function(){
    return new Promise((resolve, reject) => {
        EsgrimaJSMain();
    })
};


esgrimajs().then(triggerNG);

// Now real implementation 
// We need to assume that jQuery Exists, otherwise we're break to the ground.


// Assertations 


var elementPresent = function(id, event, callBackResult){
    $(id).trigger(event);
};


var elementNotPresent = function(id, event, callBackResult){
    $(id).trigger(event);
};

var value = function(id, event, callBackResult){
    $(id).trigger(event);
};

// Commands 
var trigger = function(id, event, callBackResult){
    $(id).trigger(event);
};

var setValue = function(id, event, callBackResult){
    $(id).trigger(event);
};

var waitForElementPresent = function(id, event, callBackResult){
    $(id).trigger(event);
};


