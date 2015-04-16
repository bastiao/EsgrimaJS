![Logo](docs/logo_small.png)
# EsgrimaJS


Do you need to do Javascript testing in a distributed way? With
multiple windows, multiple screen, remote places or whatever?
And all the tests need to communicate? Use this framework!

* Worked in distributed web applications - easy way to communicate between them. 
* Supports UI Tests. 
* You can execute the already exists Unit Tests for the modules.
* Define a pipeline with the tests between different enviroments. 
* Loop the pipeline and use the tests as a "stress-tests" also.


## Why we built another framework?


Common, there are a lot of frameworks to test javascript. And it is not
another one. We take advantage of the tests frameworks that already exists.

But is it a test runner? Yes. And yes, we also take advantage of what exists in
the moment. And we hope we can propose an integration of this one with
a most broader and used framework by the community (we are quite new, and nobody
knows it.)

Everything started, because we have to test a chrome app (see Chrome App) with
multi monitor. Yes, you click a button in one screen, an action happened in
another monitor. And yes, we need also test interface. The most impartant issue that we face, was related with testing in
the same application, different things, and how can we execute an operation
in one window and check if the value changed in other one (tipically multi monitor
scenario).

Let's mix it together, and do a real test framework for javascript and
web browser framework. We do not real Web Drivers, or whatever. We are embeeded on
the application.

Another clear advantage, is the possibility to run any javascript code. While in Nightwatch.js you
are limited to their API to run your interface tests, here, you can handle javascript triggers
and do it in a different way, like for instance, run unit tests and so on. 

The philosophy of EsgrimaJS is totally different from the others. The key idea is each test module 
will belong to a group. And each test will run in a group, which mean that it is in
one machine or one thousand machines.


## How to use?

- [How To Install and Use?](docs/HOWTO.md)


## Are you able to integrate your code? Why are you create another test framework?

I'm running of time and I just have a weekend to built this tool.
Of course, I want to integrate it in another framework such as Karma, but
their phiolosofy is a bit different.

## Architecture

![Architecture](docs/arch.jpg)

- [Pipeline](docs/Pipeline.md)
- [Communication](docs/Communication.md)


## Known issues

- Clock: how to syncrhonize the clock between several tests running?
- How to access the external components in Javascript AMD? They do not have access to 
all components, so it is really hard to get access to them. It is possible to instance
new components.


### Ubuntu workaround


```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Windows 8 isues


Follow the same recomendations: https://github.com/TooTallNate/node-gyp#installation


# Authorship & Inspiring 

- Luís A. Bastião Silva <bastiao@ua.pt>


Many of the philosofy is taken from Karma. So kudos for Karma and for
Vojtech Jína, that are the author of the master thesis.

So, if something is not good with licenses or code or whatever, feel free
to let me know, and will fix it of course.
