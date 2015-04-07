console.log("Loading client module.");

import {EventProcessor} from './EventProcessor';
import {EsgrimaInstance} from './esgrima';


var testSuiteList = EsgrimaInstance.getTests();
console.log("Loading with EsgrimaJSLoader");

var EventProcessorInstance = new EventProcessor();
// Now it is waiting for events! :D gotta go!
EventProcessorInstance.start();


export {EventProcessorInstance}