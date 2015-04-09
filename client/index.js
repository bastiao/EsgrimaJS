console.log("Loading client module.");

/** It needs to be dynamic!! */
// Loading the tests 
import {jsEsgrimaGroups} from '../examples/config';
import {EsgrimaTestSuite} from '../examples/tests';


import {EventProcessor} from './EventProcessor';
import {EsgrimaInstance} from './esgrima';


var testSuiteList = EsgrimaInstance.getTests();

console.log("Loading with EsgrimaJSLoader");
console.log(testSuiteList);

import {appEnv} from '../common/enviroment';
var EventProcessorInstance = new EventProcessor();
if (appEnv.env!=='node')
{
    EventProcessorInstance = new EventProcessor(EsgrimaInstance.getMyGroup());
    // Now it is waiting for events! :D gotta go!
    EventProcessorInstance.start();

}


export {EventProcessorInstance}