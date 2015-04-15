

import {appEnv} from '../common/enviroment';


class EsgrimaJSLoader
{

    constructor() {

    }
    register(testSuite)
    {
        this.testSuite = testSuite;
        this.testHash = {}
        console.log(testSuite);
        for (var _t in this.testSuite)
        {
            console.log(_t);
            console.log( this.testSuite[_t].description);
            this.testHash[this.testSuite[_t].description] = this.testSuite[_t];
        }
    }
    
    
    getTestByName(id)
    {
        console.log(this.testHash);
        return this.testHash[id];
        
    }
    registerGroups(groups)
    {
        this.groups = groups;
    }
    
    
    getMyGroup(){
        
        console.log("getMyGroup");
        var myGroup = "";
        for (var _g in this.groups)
        {
            if (this.groups.hasOwnProperty(_g))
            {
                if (this.groups[_g]())
                {
                    myGroup = _g;

                }
            }

        }

        
        

        this.group = myGroup;
        console.log(this.group);
        return this.group;
    }
    getGroups(){
        return this.groups;
    }

    getTests(){
        return this.testSuite;
    }
}


var EsgrimaInstance = new EsgrimaJSLoader();
console.log(appEnv);
if (appEnv.env!=="node")
{

    window.$ = window.jQuery = require('jquery');
    $(document).ready(function () {
        //console.log("I don't want to play nice");
    });
    
    $( document ).ready(function() {

      /*  console.log("Load document inside esgrima.js");
        console.log(document);
        console.log(document.getElementById("results"));*/

    });

    //setTimeout(function(){ console.log(document.getElementById("results")); }, 3000);


}


export {EsgrimaJSLoader, EsgrimaInstance}
