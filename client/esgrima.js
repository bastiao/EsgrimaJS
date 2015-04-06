

import {appEnv} from '../common/enviroment';


class EsgrimaJSLoader
{

    constructor() {

    }
    register(testSuite)
    {
        console.log("The test suite that was loaded are now ready to use.");
        console.log(testSuite);
        this.testSuite = testSuite;
    }

    registerGroups(groups)
    {
        this.groups = groups;
    }

    getGroups(){
        return this.groups;
    }

    getTests(){
        return this.testSuite;
    }
}

var EsgrimaInstance = new EsgrimaJSLoader();
var testSuiteList = EsgrimaInstance.getTests();
console.log("Loading with EsgrimaJSLoader");

if (appEnv.env!=="node")
{

    window.$ = window.jQuery = require('jquery');
    console.log("Load document inside esgrima.js");
    console.log(document);
    console.log(document.getElementById("results"));

    setTimeout(function(){ console.log(document.getElementById("results")); }, 3000);


}


export {EsgrimaJSLoader, EsgrimaInstance}
