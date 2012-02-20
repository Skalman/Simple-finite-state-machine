/*
 * Simple finite state machine by Dan Wolff (wlff.se/finite-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Simple_state_machine(config) {
	"use strict";
	var i, j, event, old_from, new_from,
		events = config.events,

		// variables in closure
		that = this;

	// public
	that.current = config.initial;

	function event_function(name, from, to) {
		var f = function () {
			if (that.can(name)) {
				that.current = to;
			} else {
				throw "Cannot '" + name + "()'";
			}
		};
		f.from = from;
		return f;
	}

	for (i = 0; i < events.length; i++) {
		event = events[i];
		// prepare from
		old_from = event.from;
		if (typeof old_from !== "string") {
			new_from = {};
			for (j = 0; j < old_from.length; j++) {
				new_from[old_from[j]] = true;
			}
			event.from = new_from;
		}
		that[event.name] = event_function(event.name, event.from, event.to);
	}
}

// Simple_state_machine.prototype.current is set in constructor

Simple_state_machine.prototype.can = function Simple_state_machine_can(event) {
	"use strict";
	var from = this[event] && this[event].from,
		current = this.current;
	return from === current || from === "*" || (typeof from === "object" && current in from);
};