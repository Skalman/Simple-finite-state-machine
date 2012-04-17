/* demo */
(function (window) {
	"use strict";

	function id(i) {
		return window.document.getElementById(i);
	}

	var old_state = "green",
		events = {
			warn:  { from: "green",        to: "yellow" },
			panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
			calm:  { from: "red",          to: "yellow" },
			clear: { from: "yellow red",   to: "green"  }
		},
		fsm = new window.Ssm("green", events);

	function update(new_state, old_state) {
		if (old_state) {
			id(old_state).className = "";
		}
		id(new_state).className = "current";
	}

	function event() {
		var new_state;
		try {
			fsm(this.id);
			new_state = events[this.id].to;
			id("status").innerHTML = 'After a <code>fsm(<span class="s">"' + this.id + '"</span>)</code>, we should be in <code>' + new_state + '</code>';
			id("status").className = "";
			update(new_state, old_state);
			old_state = new_state;
		} catch (e) {
			id("status").innerHTML = 'Exception thrown! It seems like you can\'t <code>fsm(<span class="s">"' + this.id + '"</span>)</code>';
			id("status").className = "error";
		}
	}

	id("warn").onclick =
	id("panic").onclick =
	id("calm").onclick =
	id("clear").onclick = event;

	update(old_state);
})(this);
