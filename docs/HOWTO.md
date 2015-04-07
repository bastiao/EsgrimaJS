# How to use?


## First, you need to install the tool:

npm install jsEsgrima


## Where to write my tests?

All the magic should start in a index.js: 

```
import {elementPresent, elementNotPresent, value, trigger, setValue, waitForElementPresent} from '../common/api';

// Do the magic here! :D

```

## How to configure?

Add a config.js with the following content:

```


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


```

## Dev mode

./node_modules/babel/bin/babel-node server/lib/webserver.js

## Running the server:

```
$ ./jsEsgrima build
$ ./jsEsgrima serve
```


## How to integrate in my application?

If you want to test, add it now.

```
<script src="http://localhost:9001/EsgrimaTestSet.js"/>
<script src="http://localhost:9001/EsgrimaClient.js"/>

```

