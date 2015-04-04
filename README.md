# EsgrimaJS

Do you need to do Javascript testing in a distributed way? With
multiple windows, multiple screen, remote places or whatever?
And all the tests need to communicate? Use this framework!


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


# Inspiring & Authorship.

Many of the philosofy is taken from Karma. So kudos for Karma and for
Vojtech Jína, that are the author of the master thesis.

So, if somethins is not good with licenses or code or whatever, feel free
to let me know, and will fix it of course.
