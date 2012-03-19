(function (window) {
	"use strict";

	var fsm;

	function id(i) {
		return window.document.getElementById(i);
	}

	function tpl(tpl_id, vars) {
		var i, tmp,
			t = id(tpl_id);
		if (!t) {
			throw "Template '" + tpl_id + "' not found.";
		}
		t = t.innerHTML;
		for (i in vars) {
			if (i.match(/[^a-z_]/)) {
				throw "Template '" + tpl_id + "' variable '" + i + "' may only contain characters a-z and _.";
			}
			t = t.replace(new RegExp("\\{" + i + "\\}", "g"), vars[i]);
		}
		tmp = t.match(/\{[a-z_]+\}/);
		if (tmp) {
			throw "Var '" + tmp + "' not replaced in template '" + tpl_id + "'.";
		}
		return t;
	}

	function switch_group(e) {
		e.preventDefault && e.preventDefault();
		if (this.id === "group_by_to_state") {
			id("single_from").style.display = "none";
			id("single_to").style.display = "table";
			id("group_by_from_state").focus();
		} else {
			id("single_to").style.display = "none";
			id("single_from").style.display = "table";
			id("group_by_to_state").focus();
		}
		return false;
	}

	id("group_by_to_state").onclick =
	id("group_by_from_state").onclick = switch_group;

	function Color() {
		this.states = {};
	}
	Color.prototype = {
		predef: {
			red: "hsl(0, 100%, 80%)",
			orange: "hsl(30, 100%, 80%)",
			yellow: "hsl(60, 100%, 80%)",
			green: "hsl(120, 100%, 80%)",
			blue: "hsl(240, 100%, 80%)",
			purple: "hsl(270, 100%, 80%)",
			white: "#fff",
			gray: "#ddd",
			black: "#bbb",
			idle: "blue",
			error: "red"
		},
		color: function (name) {
			var i, hash = 0,
				predef = this.predef[name];
			if (predef) {
				return this.predef[predef] ? this.predef[predef] : predef;
			}
			for (i = 0; i < name.length; i++) {
				hash = hash * 11 + name.charCodeAt(i);
			}
			hash *= 11;
			return "hsl(" + (hash % 360) + ", 100%, 80%)";
		},
		state: function (state) {
			if (!this.states[state] && !state.match(/[^0-9a-z_-]/i)) {
				this.states[state] = ".state-" + state + " > span { background-color:" + this.color(state) + " }";
			}
		},
		toString: function () {
			var i, lines = [];
			for (i in this.states) {
				lines.push(this.states[i]);
			}
			return lines.join("\n");
		}
	};
	function visualize(fsm) {
		/*
			from = {
				from: { event: to, event: to },
				green: {
					warn: "yellow",
					panic: "red"
				},
				yellow: {
					panic: "red"
				}
			}
			to = {
				to: { event: [from, from], event: [from, from] },
				yellow: {
					warn: ["green"],
					calm: ["red"]
				},
				red: {
					panic: ["green", "yellow"]
				}
			}
		*/
		var i, j, tmp_from, tmp_froms, tmp_event, tmp_events, tmp_to, tmp_tos,
			from = {},
			to = {},
			events = fsm.events,
			colors = new Color();

		for (i in events) {
			tmp_from = events[i].from.split(" ");
			tmp_to = events[i].to;

			if (tmp_to) {
				colors.state(tmp_to);
			} else {
				tmp_to = "<i>no change</i>";
			}

			// populate from
			for (j in tmp_from) {
				if (!from[tmp_from[j]]) { from[tmp_from[j]] = {}; }
				from[tmp_from[j]][i] = tmp_to;

				colors.state(tmp_from[j]);
			}

			// populate to
			if (!to[tmp_to]) { to[tmp_to] = {}; }
			to[tmp_to][i] = tmp_from;
		}

		tmp_froms = [];
		for (i in from) {
			tmp_events = [];
			tmp_tos = [];
			for (tmp_event in from[i]) {
				tmp_tos.push(tpl("tpl-to", { to: from[i][tmp_event] }));
				tmp_events.push(tpl("tpl-event", { event: tmp_event }));
			}
			tmp_froms.push(tpl("tpl-row-single-from", {
				from: i,
				events: tmp_events.join(""),
				tos: tmp_tos.join("")
			}));
		}
		id("single_from_content").innerHTML = tmp_froms.join("");

		/* to = {
			yellow: {
				warn: ["green"],
				calm: ["red"]
			},
			red: {
				panic: ["green", "yellow"]
			}
		} */
		tmp_tos = [];
		for (i in to) {
			tmp_events = [];
			for (tmp_event in to[i]) {
				tmp_froms = [];
				for (j in to[i][tmp_event]) {
					tmp_froms.push(tpl("tpl-from", { from: to[i][tmp_event][j] }));
				}
				tmp_events.push(tpl("tpl-event-group", {
					froms: tmp_froms.join(""),
					event: tmp_event
				}));
			}
			tmp_tos.push(tpl("tpl-row-single-to", {
				event_groups: tmp_events.join(""),
				to: i
			}));
		}
		id("single_to_content").innerHTML = tmp_tos.join("");

		id("state-styles").innerHTML = colors;
	}

	function refresh() {
		var events;
		try {
			events = eval("({" + id("code").value + "\n});");
		} catch (e) {
			window.alert(e);
			return;
		}
		fsm = window.Simple_state_machine(events);
		visualize(fsm);
	}
	id("visualize-button").onclick = refresh;

	refresh();
})(this);
