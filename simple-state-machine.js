/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Simple_state_machine(initial, events) {
	"use strict";

	// the state machine which will be returned
	function fsm(event) {
		if (!can(event)) {
			throw "Can't " + event;
		}

		// only change the current state if a to state is specified
		if (events[event].to) {
			fsm.current = events[event].to;
		}
	}

	function can(event) {
		var from;
		if (events[event]) {
			// the event exists: from is now either the accepted from events or undefined
			from = events[event].from;
		} else {
			// the event doesn't exist: set to something truthy that can't match a state
			from = " ";
		}
		return !from || (" " + from + " ").indexOf(" " + fsm.current + " ") !== -1;
	}

	// if the second parameter wasn't given, use "none" for initial state and use the first parameter as events
	fsm.current = events ? initial : "none";
	if (!events) {
		events = initial;
	}

	// publish the can method and give access to events as well
	fsm.can = can;
	fsm.events = events;
	return fsm;
}
