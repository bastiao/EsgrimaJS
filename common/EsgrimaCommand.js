

class EsgrimaCommand {

    constructor(name)
    {

    }
    run(completeCallback){

    }

    getReport()
    {

    }
}


function EsgCommand(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}


export {EsgrimaCommand}
