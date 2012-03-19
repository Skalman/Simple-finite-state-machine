Simple state machine
====================

If you simply want to make sure that your application is in a valid state, this is the state machine to use.
It is lightweight, standalone. Less than 0.5 kB.

The code has *no license*, it's in the public domain. I do however appreciate attribution.

Check out the [demo](http://wlff.se/simple-state-machine/) (also available at `demo/index.html`).


Usage
-----

Example borrowed from [Jake Gordon](https://github.com/jakesgordon/javascript-state-machine). Let's create a state machine with a few states and events.

	// Simple_state_machine( [initial,] events )
	var fsm = Simple_state_machine("green", // initial is "none" if first parameter is omitted
		{ // events
			warn:  { from: "green",        to: "yellow" },
			panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
			calm:  { from: "red",          to: "yellow" },
			clear: { from: "*",            to: "green"  }, // can be called from all states
			work:  { from: "green"                      } // if to state is absent, the state won't be changed when the event is called
	});

Now we have a simple state machine:

* `fsm("warn")`, `fsm("panic")`, `fsm("calm")`, `fsm("clear")`, and `fsm("work")`
  - Transitions the current state to another color.
  - Will `throw` an exception if the event is not allowed.
* `fsm.can("warn")`, `fsm.can("panic")`, `fsm.can("calm")`, `fsm.can("clear")`, `fsm.can("work")`
  - Returns `true` if the `<event>` is allowed, else `false`.
* `fsm.current`
  - The current state, initially `green`.
* `fsm.events`
  - The events object which was used to create the state machine. Note that changing this object will change the machine's behavior.

The methods may be used as follows.

	// fsm.current === "green"
	if (fsm.can("calm"))
		fsm("calm"); // will never happen - can only calm() from red

	fsm("panic"); // fsm.current === "red"
	fsm("warn");  // throws exception! only allowed from green
