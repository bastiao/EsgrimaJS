

import {EsgrimaInstance} from '../client/esgrima';
import {appEnv} from '../common/enviroment'

var jsEsgrimaGroups = {

    'search': function () {

            var jQuery = require('jquery');
            var search = jQuery("#search");
            console.log("jquery search");
            console.log(search);
            var search = document.getElementById("search");
            console.log("This is search");
            console.log(document);
            console.log(window);
            console.log(search);


        return search!==null;

    },
    'results' : function () {
        var jQuery = require('jquery');
        
        var results = jQuery("#results");


            var results = document.getElementById("results");
            console.log("This is staffresults");
            console.log(document);
            console.log(window);
            console.log(results);

        return results!==null;
    }
}



if (appEnv.env!=="node") {
    var register = function (){ 
        document.addEventListener("DOMContentLoaded", function(event) {
            EsgrimaInstance.registerGroups(jsEsgrimaGroups);
    
        });
    };
    register();
    
}
else{
    EsgrimaInstance.registerGroups(jsEsgrimaGroups);

}


export {jsEsgrimaGroups}

