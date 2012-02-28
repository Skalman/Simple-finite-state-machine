/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Simple_state_machine(options) {
	"use strict";
	var i,
		events = options.events,

		// variables in closure
		self = this;

	// public
	self.options = options; // for inspection at a later point
	self.current = options.initial || "none";

	for (i in events) {
		self[i] = (function (event, from, to) {
			var f = function () {
				if (!self.can(event)) {
					throw "Cannot '" + event + "()'";
				}
				// else
				self.current = to;
			};
			f.from = from; // private
			return f;
		})(i, " " + events[i].from + " ", events[i].to);
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
