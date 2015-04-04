

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

export {EsgrimaJSLoader, EsgrimaInstance}
