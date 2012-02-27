/* demo */
(function (window) {
	"use strict";

	function id(i) {
		return window.document.getElementById(i);
	}

	var fsm = new window.Simple_state_machine({
		initial: "green", // "none" if omitted
		events: {
			warn:  { from: "green",        to: "yellow" },
			panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
			calm:  { from: "red",          to: "yellow" },
			clear: { from: "*",            to: "green"  } // can be called from all states
		}
	});

	function update(new_state, old_state) {
		if (old_state) {
			id(old_state).className = "";
		}
		id(new_state).className = "current";

		id("warn").disabled =  !fsm.can("warn");
		id("panic").disabled = !fsm.can("panic");
		id("calm").disabled =  !fsm.can("calm");
		id("clear").disabled = !fsm.can("clear");

		id("current").innerHTML = fsm.current;
	}

	function event() {
		var old_state = fsm.current;
		fsm[this.id]();
		update(fsm.current, old_state);
	}

	id("warn").onclick =
	id("panic").onclick =
	id("calm").onclick =
	id("clear").onclick = event;

	update(fsm.current);
})(this);