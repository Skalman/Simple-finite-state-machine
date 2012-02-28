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
			function event_function() {
				if (!event_function.can(event)) {
					throw "Cannot '" + event + "()'";
				}
				// else
				self.current = to;
			}
			event_function.can = function () {
				return from === " * " || from.indexOf(" " + self.current + " ") !== -1;
			};
			return event_function;
		})(i, " " + events[i].from + " ", events[i].to);
	}
}
