# Protocol of communication


## Server Setup


| Method                     | Description           |
| -------------------------- |-----------------------|
| connect                    | connect to server     |
| disconnect                 | disconnect            |
| groups                     | groups                |
| clients                    | connected clients     |
| start                      | start test            |
| stop                       | stop test             |


## Test Setup

| Method                     | Description           |
| -------------------------- |-----------------------|
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

| Method            | Description                                 |
| ----------------- |---------------------------------------------|
| elementPresent    | wait for an event                           |
| elementNotPresent | wait for an event                           |
| value             | value is                                    |
| custom            | custom function (can be defined in tests)   |


### Commands

| Method                        | Description                     |
| ----------------------------- |---------------------------------|
| waitForElementPresent         | wait for an event               |
| setValue                      | is available                    |
| value                         | value is                        |
| trigger                       | trigger                         |
| custom                        | custom command                  |



Note: this also is based on API from nightwatcher.js (inspired from).