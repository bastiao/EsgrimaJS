


class TestLoader
{


    constructor() {
    }
    
    register(testSuite){
        this.listTests = testSuite;
    }
    testSuite () {
        return this.listTests;
        
    }
    

}

var TestLoaderInstance = new TestLoader();

export {TestLoader, TestLoaderInstance}
