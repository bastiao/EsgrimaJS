# Protocol of communication


## Client Setup


| Method                     | Description           |
| -------------------------- |:---------------------:|
| connect                    | connect to server     |
| disconnect                 | disconnect            |
| groups                     | groups                |
| clients                    | connected clients     |


## Test Setup

| setupContext               | setup the tests       |
| error                      | report error          |
| result                     | report the result     |
| complete                   | test is complete      |
| info                       | status of the test    |
| start                      | start test            |
| stop                       | stop test             |


Note: it is follows the architecture from "JavaScript Test Runner, from Vojtech Jína"


## In the context of the tests (inside):

### Assertations 

| Method            | Description           |
| ----------------- |:---------------------:|
| waitFor           | wait for an event     |
| is                | is available          |
| value             | value is              |

### Commands

| Method            | Description           |
| ----------------- |:---------------------:|
| waitFor           | wait for an event     |
| is                | is available          |
| value             | value is              |



Note: this also is based on API from nightwatcher.js (inspired from).