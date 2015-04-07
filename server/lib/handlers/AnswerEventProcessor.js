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

import {TestLoader} from 'common/TestLoader';


class AnswerEventProcessor {

    constructor(io, EsgrimaInstance) {
        this.io = this.io;
        this.EsgrimaInstance = EsgrimaInstance;

        this.testLoader = new TestLoader(EsgrimaInstance.getTests());

    }

    start()
    {

        ServiceTest(io, this.testLoader);

        
    }
    
}

export {AnswerEventProcessor}