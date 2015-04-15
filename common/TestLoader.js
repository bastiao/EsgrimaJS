
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
        this.start();
    }
    
    start()
    {
        this.currentIndex = -1 ;
        this.currentTest = this.testSuite[this.currentIndex];
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
        
        console.log("Current index: " + this.currentIndex);
        console.log("Test suite size: " + this.testSuite.length);
        
        return (this.currentIndex+1)<this.testSuite.length;
    }
    
    getCurrentTest()
    {
        return this.testSuite[this.currentIndex];
    }

    registerGroups(groups)
    {
        this.groups = groups;
        let groupList = [];
        for (var key in groups) {
            if (groups.hasOwnProperty(key)) {
                groupList.push(key);
            }
        }
        
        this.groupList = groupList;
    }

    getGroupsList(){
        return this.groupList;
    }
    
    getMethodByGroup(groupName)
    {
        return this.group[groupName];
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
