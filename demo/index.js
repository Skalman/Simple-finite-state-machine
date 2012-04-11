/* demo */
(function (window) {
	"use strict";

	function id(i) {
		return window.document.getElementById(i);
	}

	var fsm = Simple_state_machine("green", // initial is "none" if first parameter is omitted
		{ // events
			warn:  { from: "green",        to: "yellow" },
			panic: { from: "green yellow", to: "red"    }, // allow to be called from multiple states
			calm:  { from: "red",          to: "yellow" },
			clear: {                       to: "green"  }, // if from state is absent, it can be called from all states
			work:  { from: "green"                      } // if to state is absent, the state won't be changed when the event is called
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
		id("work").disabled = !fsm.can("work");

		id("current").innerHTML = fsm.current;
	}

	function event() {
		var old_state = fsm.current;
		fsm(this.id);
		update(fsm.current, old_state);
	}

	id("warn").onclick =
	id("panic").onclick =
	id("calm").onclick =
	id("clear").onclick =
	id("work").onclick = event;

	update(fsm.current);
})(this);
