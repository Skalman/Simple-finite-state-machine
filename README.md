Simple state machine, *minimal modern edition*
==============================================

A finite state machine, stripped to the bare minimal. The minified version weighs less than 100 bytes.

It strips a few more bytes than the standard minimal edition by requiring `Array.prototype.indexOf()` (not supported in IE 8 and below).

The code has *no license*, it's in the public domain. I do however appreciate attribution.

Demo available at `demo/index.html`.


Usage
-----

Let's create a state machine with a few states and events.

	// Fsm( initial_state, events )
	var fsm = Fsm("green", {
		warn:  { from: "green",        to: "yellow" },
		panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
		calm:  { from: "red",          to: "yellow" },
		clear: { from: "yellow red",   to: "green"  } // this one too
	});

Now we have a simple state machine:

* `fsm("warn")`, `fsm("panic")`, `fsm("calm")`, and `fsm("clear")`
  - Transitions the current state to another color.
  - Will `throw` an exception if the event is not allowed.
* Because it's minimal there's no way to access the current state, and the only way to see if an action is valid is to try it.

The state machine may be used as follows.

	// initial state is "green"
	fsm("panic"); // current state is "red"
	fsm("warn");  // throws exception! only allowed from green
