# Protocol of communication


## Test Setup

- setupContext
- error
- result
- complete
- info
- loaded
- start
- store


| Method                     | Description           |
| -------------------------- |:---------------------:|
| connect                    | wait for an event     |
| setupContext               | wait for an event     |
| error                      | is available          |
| result                     | value is              |
| complete                   | value is              |
| info                       | value is              |
| loaded                     | value is              |
| start                      | value is              |
| store                      | value is              |


Note: it is follows the architecture from "JavaScript Test Runner, from Vojtech Jína"


## In the context of the tests (inside):

| Method            | Description           |
| ----------------- |:---------------------:|
| waitFor           | wait for an event     |
| is                | is available          |
| value             | value is              |
| connect           | value is              |
