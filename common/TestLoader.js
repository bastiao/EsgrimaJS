
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
            throw "There is no test suite";
        }
        this.testSuite = testSuite;
        this.groups = groups;
    }
    
    start()
    {
        this.currentIndex = 0 ;
        this.currentTest = testSuite[this.currentIndex];
    }
    
    runTest()
    {
        this.testRunning = new EsgrimaCommand(this.getCurrentTest());
        return this.testRunning 

    }
    
    completeTest(id, reports, assertations)
    {
        // Complete tests
        
        // Check if it is ready to execute another test
    }
    
    
    next()
    {
        this.currentIndex++ ;
        this.currentTest = this.testSuite[this.currentIndex];
    }
    
    hasNext()
    {
        return (this.currentIndex+1)<this.testSuite.length;
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
