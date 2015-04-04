

import {EsgrimaInstance} from '../client/esgrima';

var jsEsgrimaGroups = {

    'search': function () {
        var search = document.getElementById("search");
        return search!==undefined;

    },
    'results' : function () {
        var results = document.getElementById("results");
        return results!==undefined;
    }
}

EsgrimaInstance.registerGroups(jsEsgrimaGroups);

export {jsEsgrimaGroups}

