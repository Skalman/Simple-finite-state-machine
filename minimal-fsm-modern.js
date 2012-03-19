/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Fsm(current_state, events) {
	"use strict";
	return function (event) {
		// a TypeError will be thrown if the event doesn't exist
		if (!~events[event].from.split(" ").indexOf(current_state)) {
			throw event;
		}
		current_state = events[event].to;
	};
}
