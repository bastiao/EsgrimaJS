// See mocha

import {EsgrimaInstance} from '../client/esgrima';

import {EsgrimaCommandInstance} from '../common/EsgrimaCommand';
import {EsgrimaAssertationInstance} from '../common/EsgrimaAssertation';

import {TestLoaderInstance} from '../common/TestLoader';
import {jsEsgrimaGroups} from './config';
import {elementPresent, elementNotPresent, value, trigger, setValue, waitForElementPresent} from '../common/api';



var EsgrimaJSCommand =  EsgrimaCommandInstance;
var EsgrimaJSAssertation =  EsgrimaAssertationInstance;

var EsgrimaTestSuite = [];
var EsgrimaActions = {};


var jsEsgrima = function(description, callbackOfTests, args, group){

    // Here is possible to build the tests with QUnit, Mocha,
    // or whatever.
    // Based on Karma Test Runner design.
    EsgrimaTestSuite.push({'description': description,
        'callbackOfTests':callbackOfTests,
        'args': args,
        'group': group});
};


jsEsgrima("Search for Something", function() {
  it("contains spec with an expectation", function() {
    console.log("This is an action");
    expect(true).toBe(true);

  });
}, {}, 'search');

var e = jQuery.Event("keydown");
e.which = 50; // # Some key code value
jsEsgrima("t1", trigger, {id:'#search', event: e, group:"search", function (){}},
    'search');

jsEsgrima("t2", trigger, {id:'#search', event: e, group:"search", function (){}},
    'search');

jsEsgrima("a1", waitForElementPresent, {id:"#searchBtnRes", timeout: 4000, group: "search", 
        callBackResult: function (){}},
    'search');

jsEsgrima("t3", trigger, {id:'#search', event: e, group:"search", function (){}},
    'search');




jsEsgrima("Look for the result", function() {
  it("contains spec with an expectation", function() {
    console.log("lol");
    expect(true).toBe(true);

  });
}, {},'results');

EsgrimaTestSuite.shift();
console.log("Register the Test Suite!");
console.log(EsgrimaInstance);

console.log("Reading the rests");
EsgrimaInstance.register(EsgrimaTestSuite);
var testSuiteList = EsgrimaInstance.getTests();
console.log(testSuiteList);
export {EsgrimaTestSuite}
