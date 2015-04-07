

var StatesTestCommand = {
    NOT_RUNNING: 0,
    RUNNING: 1,
    EXECUTED: 2
};

class EsgrimaCommand {

    constructor(test)
    {

        this.description = test.description;
        this.callbackOfTests  = test.callbackOfTests;
        this.args = test.args;
        this.group = test.group;
        this.status = StatesTestCommand.NOT_RUNNING;
    }
    run(completeCallback){
        this.callbackOfTests(args);
        this.status = StatesTestCommand.RUNNING;
    }
    
    complete(data)
    {
        this.status = StatesTestCommand.EXECUTED;;
        this.report = data
    }

    getStatus()
    {
        return this.status;
    }
    
    getReport()
    {
        return this.report;
    }
}




export {EsgrimaCommand}
