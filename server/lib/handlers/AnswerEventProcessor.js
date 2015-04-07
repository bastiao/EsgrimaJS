/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 07/04/15.
 */
    
    
import {ServiceTrigger} from './commands/trigger';
import {ServiceWaitForElementPresent} from './commands/waitForElementPresent';
import {ServiceSetValue} from './commands/setValue';

import {ServiceValue} from './assertations/value';
import {ServiceElementPresent} from './assertations/elementPresent';
import {ServiceElementNotPresent} from './assertations/elementNotPresent';

import {ServiceTest} from './tests/testHandler';

import {TestLoader} from '../../../common/TestLoader';
var colors = require('colors/safe');



class AnswerEventProcessor {

    constructor(io, EsgrimaInstance) {
        this.io = this.io;
        this.EsgrimaInstance = EsgrimaInstance;
        this.testLoader = new TestLoader(EsgrimaInstance.getTests());

    }

    start()
    {

        console.info(colors.black.bgGreen("Starting WebSockets"));
        //ServiceTest(io, this.testLoader);
        io.on("connection", function (socket) {
            console.info(colors.black.bgGreen("New connection, just to check "));
            var interval = setInterval(function () {
                socket.emit("tweet", tweet);
            }, 1000);

            socket.on("disconnect", function () {
                console.info(colors.black.bgGreen("Disconnect"));
                clearInterval(interval);
            });
        });




    }
    
}

export {AnswerEventProcessor}