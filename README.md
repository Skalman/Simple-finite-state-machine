Simple state machine
====================

If you simply want to make sure that your application is in a valid state, this is the state machine to use.
It is lightweight, standalone. Less than 0.5 kB.

The code has *no license*, it's in the public domain. I do however appreciate attribution.

Check out the [demo](http://wlff.se/simple-state-machine/) (also available at `demo.html`).


Usage
-----

Example borrowed from [Jake Gordon](https://github.com/jakesgordon/javascript-state-machine). Let's create a state machine with a few states and events.

	var fsm = new Simple_state_machine({
		initial: "green", // "none" if omitted
		events: {
			warn:  { from: "green",        to: "yellow" },
			panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
			calm:  { from: "red",          to: "yellow" },
			clear: { from: "*",            to: "green"  } // "*" allows all states
	}});

...will create an object with the following members:

* `fsm.warn()`, `fsm.panic()`, `fsm.calm()`, and `fsm.clear()`
  - Transitions the current state to another color.
  - Each method will `throw` an exception if the event is not allowed.
* `fsm.current`
  - The current state, initially `green`.
* `fsm.can(event)`
  - Returns `true` if the `event` is allowed, else `false`.


