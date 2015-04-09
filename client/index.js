console.log("Loading client module.");

/** It needs to be dynamic!! */
// Loading the tests 
import {jsEsgrimaGroups} from '../examples/config';
import {EsgrimaTestSuite} from '../examples/tests';


import {EventProcessor} from './EventProcessor';
import {EsgrimaInstance} from './esgrima';

import {appEnv} from '../common/enviroment';


var EventProcessorInstance = {};
if (appEnv.env !== 'node') {

    document.addEventListener("DOMContentLoaded", function(event) {
        //do work

        console.log("### Starting Event Processor Instance");

        //setTimeout(function () {
            var testSuiteList = EsgrimaInstance.getTests();

            console.log("Loading with EsgrimaJSLoader");
            console.log(testSuiteList);



            EventProcessorInstance = new EventProcessor(EsgrimaInstance.getMyGroup());
            // Now it is waiting for events! :D gotta go!
            EventProcessorInstance.start();


        //}, 3000);

    });
    


}




export {EventProcessorInstance}