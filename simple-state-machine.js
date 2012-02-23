/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Simple_state_machine(options) {
	"use strict";
	var i, event, from,
		events = options.events,

		// variables in closure
		that = this;

	// public
	that.current = options.initial || "none";

	function event_function(event, from, to) {
		var f = function () {
			if (that.can(event)) {
				that.current = to;
			} else {
				throw "Cannot '" + event + "()'";
			}
		};
		f.from = from; // private
		return f;
	}

	for (i in events) {
		event = events[i];
		that[i] = event_function(i, " " + event.from + " ", event.to);
	}
}

// Simple_state_machine.prototype.current is set in constructor

Simple_state_machine.prototype.can = function Simple_state_machine_can(event) {
	"use strict";
	var from = this[event] && this[event].from,
		current = " " + this.current + " ";
	if (from) {
		return from === " * " || from.indexOf(current) !== -1;
	} else {
		return false;
	}
};
