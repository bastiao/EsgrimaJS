

import {EsgrimaInstance} from '../client/esgrima';
var jQuery = require('jquery');



var jsEsgrimaGroups = {

    'search': function () {
        var search = jQuery("#search");
        return search!==undefined;

    },
    'results' : function () {
        var results = jQuery("#results");
        return results!==undefined;
    }
}

EsgrimaInstance.registerGroups(jsEsgrimaGroups);

export {jsEsgrimaGroups}

