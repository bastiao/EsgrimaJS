// See mocha

import {EsgrimaInstance} from '../client/esgrima';

import {EsgrimaCommandInstance} from '../common/EsgrimaCommand';
import {EsgrimaAssertationInstance} from '../common/EsgrimaAssertation';

import {TestLoaderInstance} from '../common/TestLoader';
import {jsEsgrimaGroups} from './config';
import {elementPresent, elementNotPresent, value, trigger, setValue, waitForElementPresent} from '../common/api';


import {appEnv} from '../common/enviroment';


var EsgrimaJSCommand =  EsgrimaCommandInstance;
var EsgrimaJSAssertation =  EsgrimaAssertationInstance;

var EsgrimaTestSuite = [];
var EsgrimaActions = {};
var jQuery = require('jquery');

//console.log(jQuery);
//console.log(jQuery.Event);

var jsEsgrima = function(description, callbackOfTests, args, group){

    // Here is possible to build the tests with QUnit, Mocha,
    // or whatever.
    // Based on Karma Test Runner design.
    EsgrimaTestSuite.push({'description': description,
        'callbackOfTests':callbackOfTests,
        'args': args,
        'group': group});
};

/*
jsEsgrima("Search for Something", function() {
  it("contains spec with an expectation", function() {
    console.log("This is an action");
    expect(true).toBe(true);

  });
}, {}, 'search');


*/


/*
jsEsgrima("t1", trigger, {id:'#search', callBackResult: function (){console.log("!t1")}, event: function () {
        var e = jQuery.Event("keydown");
        e.which = 50; // # Some key code value
        return e;
    }
        , group:"search", function (){}},
    'search');

jsEsgrima("t2", trigger, {id:'#results', callBackResult: function (){console.log("!t2")},event: function () {
        var e = jQuery.Event("keydown");
        e.which = 50; // # Some key code value
        return e;
    }, group:"results", function (){}},
    'results');

jsEsgrima("t3", waitForElementPresent, {id:"#searchBtnRes", timeout: 2000, group: "search",
        callBackResult: function (){console.log("!t3")}},
    'search');

jsEsgrima("t4", trigger, {id:'#search', callBackResult: function (){console.log("!t4")}, event: function () {
        var e = jQuery.Event("keydown");
        e.which = 50; // # Some key code value
        return e;
    }, group:"search", function (){}},
    'search');
*/
jsEsgrima("t1", function(args){

        var element = $('tr[role="row"]')[Math.floor(Math.random() * $('tr[role="row"]').length) ];
        element.click();
        setTimeout(function(){
            element.nextElementSibling.click();
            args.callBackResult();
        }, 500);
        
        console.log(window);
        
    }, {id:'#search', callBackResult: function (){console.log("!t1")}, event: function () {}, group:"search", function (){}},
    'search');



jsEsgrima("t11", waitForElementPresent, {id:"#searchBtnRes", timeout: 9000, group: "search",
        callBackResult: function (){console.log("!t11")}},
    'search');


jsEsgrima("t2", function(args){

        var e = $.Event("keydown", {keyCode: 68});
        $(document).trigger(e);
        setTimeout(function(){
            args.callBackResult();
        }, 2500);
        
    }, {id:'#results', callBackResult: function (){console.log("!t2")}, event: function () {}, group:"results", function (){}},
    'results');

jsEsgrima("t3", function(args){

        var counter = 0;
        var tool = self.app.toolbar.getTool('Maximize');
        var id = setInterval(function(){
            if(counter==5){
                args.callBackResult();
                clearInterval(id);
                return;
            }
            tool.apply(counter%2==0 ? 2 : 0); 
            counter++;
        }, 2500);
        
        
        
    }, {id:'#results', callBackResult: function (){console.log("!t3")}, event: function () {}, group:"results", function (){}},
    'results');





/*jsEsgrima("t4", function(args){

        var tool = self.app.toolbar.getTool('Maximize');
        tool.apply(0);
        args.callBackResult();
        
    }, {id:'#results', callBackResult: function (){console.log("!t4")}, event: function () {}, group:"results", function (){}},
    'results');*/

 
/*
jsEsgrima("Look for the result", function() {
  it("contains spec with an expectation", function() {
    console.log("lol");
    expect(true).toBe(true);

  });
}, {},'results');

*/

console.log(EsgrimaTestSuite);
//EsgrimaTestSuite.shift();
console.log(EsgrimaTestSuite);

if (appEnv.env!=="node") {
    var registerTests = function ()
    {
        document.addEventListener("DOMContentLoaded", function(event) {
            console.log("Register the Test Suite!");
            console.log(EsgrimaInstance);

            console.log("Reading the rests");

            EsgrimaInstance.register(EsgrimaTestSuite);
            var testSuiteList = EsgrimaInstance.getTests();
            console.log("The test suite has: ");
            console.log(testSuiteList.lenght);
            console.log("The groups");
            console.log(EsgrimaInstance.getGroups());
        });


    }
    console.log("Registering now!");
   // window.onload = function () {
        registerTests();
    //}
}
else{
    var registerTests = function ()
    {
        //document.addEventListener("DOMContentLoaded", function(event) {
            console.log("Register the Test Suite!");
            console.log(EsgrimaInstance);

            console.log("Reading the rests");

            EsgrimaInstance.register(EsgrimaTestSuite);
            var testSuiteList = EsgrimaInstance.getTests();
            console.log("The test suite has: ");
            console.log(testSuiteList.lenght);
            console.log("The groups");
            console.log(EsgrimaInstance.getGroups());
        //});


    }
    registerTests();
    
}





export {EsgrimaTestSuite}
