/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Simple_state_machine(options) {
	"use strict";
	var i, event,
		events = options.events,

		// variables in closure
		self = this;

	// public
	self.options = options; // for inspection at a later point
	self.current = options.initial || "none";

	function event_function(event, from, to) {
		var f = function () {
			if (self.can(event)) {
				self.current = to;
			} else {
				throw "Cannot '" + event + "()'";
			}
		};
		f.from = from; // private
		return f;
	}

	for (i in events) {
		event = events[i];
		self[i] = event_function(i, " " + event.from + " ", event.to);
	}
}

// Simple_state_machine.prototype.current is set in constructor

Simple_state_machine.prototype.can = function Simple_state_machine_can(event) {
	"use strict";
	var from = this[event] && this[event].from;
	if (from) {
		return from === " * " || from.indexOf(" " + this.current + " ") !== -1;
	} else {
		return false;
	}
};
