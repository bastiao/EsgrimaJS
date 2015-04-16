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


var elementPresent = function(args){
    //id, timeout, group, callBackResult

};


var elementNotPresent = function(args){
    //id, timeout, group, callBackResult

};

var value = function(args){
    //id
    $(args.id).value();
};


var html = function(args){
    //id, event, group, callBackResult


    $(args.id).html("Just a change in HTML");
    args.callBackResult();

};


// Commands 
var trigger = function(args){
    //id, event, group, callBackResult
    

    //$(args.id).html("Just a change in HTML");
    $(args.id).trigger(args.event());

    args.callBackResult();

    //$("#searchInt").trigger(args.event());
    
};

var setValue = function(args){
    //id, data, group, callBackResult
    $(args.id).val(args.data);
    
    
    
};

var waitForElementPresent = function(args){
    // id, timeout, group, callBackResult
    console.log("waitForElementPresent--");
    
    setTimeout(function(){
        console.log("waitForElementPresent--expired");
        console.log(args);
        args.callBackResult();
        
    }, args.timeout);
    
    

};


export {elementPresent, elementNotPresent, value, trigger, setValue, waitForElementPresent}