
# Pipeline

## Why we need a pipeline?

To remind, the architecture of this test framework, works in a distributed manner.
While the most part of the frameworks can run totally independent of the framework.

Nevertheless, the most impartant issue that we face, was related with testing in
the same application, different things, and how can we execute an operation
in one window and check if the value changed in other one (tipically multi monitor
scenario)


![Architecture](docs/arch.jpg)

The problem is that all the tests may be synchronous, not only looking for an web app,
but looking for the hole process. All the apps and the order of the tests are running
need to synchronous, which is a problem, if we need to execute a test in App, and assert
the results in another one.

## Pipeline


To tackle the issue, our architecture is totally event-driven.
