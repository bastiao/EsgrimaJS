

class EsgrimaCommand {

    constructor(test)
    {

        this.description = test.description;
        this.callbackOfTests  = test.callbackOfTests;
        this.args = test.args;
        this.group = test.group;
    }
    run(completeCallback){

    }

    getStatus()
    {
        
    }
    
    getReport()
    {

    }
}




export {EsgrimaCommand}
