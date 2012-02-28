/*
 * Simple finite state machine by Dan Wolff (wlff.se/simple-state-machine/)
 * No license, this code is in the public domain. I do however appreciate attribution.
 */

function Fsm(current_state, events) {
	"use strict";
	for (var i in events) {
		this[i] = (function (from, to) {
			return function () {
				if (from.indexOf(current_state) === -1) {
					throw from;
				}
				current_state = to;
			};
		})(events[i].from.split(" "), events[i].to);
	}
}
