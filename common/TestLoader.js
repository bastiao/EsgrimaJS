
import {EsgrimaCommand} from './EsgrimaCommand';
import {EsgrimaAssertation} from './EsgrimaAssertation';

class TestLoader
{

    constructor() {
        

    }
    
    register(testSuite, groups){
        // TODO: check if testSuite is not empty.
        if (testSuite.length===0)
        {
            // Fuck.
        }
        this.listTests = testSuite;
        this.groups = groups;
    }
    
    start()
    {
        this.currentIndex = 0 ;
        this.currentTest = testSuite[this.currentIndex];
    }
    
    getCurrentTest()
    {
        
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
    
    testSuite () {
        return this.listTests;
    }
    

}

var TestLoaderInstance = new TestLoader();

export {TestLoader, TestLoaderInstance}
