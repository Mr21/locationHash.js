/*
	locationHash.js - 1.0
	https://github.com/Mr21/locationHash.js
*/

(function() {

	// private
	var	callbacks = {},
		oldData = {},
		attachEvent = function(el, ev, fn) {
			if (el.addEventListener)
				el.addEventListener(ev, fn, false);
			else
				el.attachEvent("on" + ev, fn);
		},
		setEvent = function(el) {
			function attach(a) {
				if (!a.locationHash_eventSetted) {
					a.locationHash_eventSetted = true;
					attachEvent(a, "click", function(e) {
						var href = this.getAttribute("href");
						if (href[0] === "#" && href[1] === "#" && locationHash.change(href.substr(2))) {
							locationHash.push();
							e.preventDefault();
						}
					});
				}
			}
			if (el.tagName === "A") {
				attach(el);
			} else if (el.tagName) {
				el = el.getElementsByTagName("a");
				for (var i = 0, a; a = el[i]; ++i)
					attach(a);
			}
		},
		copyData = function() {
			var	d = {};
			for (var i in locationHash.data)
				d[i] = locationHash.data[i];
			oldData = d;
		},
		execCallbacks = function(call) {
			var	i,
				eIf = function(i) {
					if (callbacks[i] && (call || locationHash.data[i] !== oldData[i])) {
						callbacks[i](locationHash.data[i]);
						delete oldData[i];
					}
				};
			for (i in locationHash.data) eIf(i);
			for (i in oldData) eIf(i);
			copyData();
		};

	// public
	window.locationHash = {
		clear: function() {
			this.data = {};
			return this;
		},
		add: function(key, val) {
			this.data[key] = val || true;
			return this;
		},
		sub: function(key) {
			delete this.data[key];
			return this;
		},
		toggle: function(key, val) {
			val = val || true;
			return this.data[key] === val
				? this.sub(key)
				: this.add(key, val);
		},
		watch: function(o) {
			for (var i in o)
				(callbacks[i] = o[i])(this.data[i]);
			return this;
		},
		unwatch: function() {
			for (var i = 0; i < arguments.length; ++i)
				delete callbacks[arguments[i]];
		},
		change: function(s) {
			var	parts, partsPrev,
				reg = /\s*(add|sub|toggle)\s*\(\s*([\w-]+)\s*(,\s*([\w-]+)\s*)?\)\s*,?/g;
			while (parts = reg.exec(s)) {
				partsPrev = parts;
				this[parts[1]](parts[2], parts[4]);
			}
			if (partsPrev.index + partsPrev[0].length !== s.length) {
				console.error('locationHash.js: parse-error: "' + s + '"');
				return false;
			}
			return this;
		},
		pull: function() {
			var hash = location.hash;
			this.data = {};
			if (hash) {
				hash = hash.substr(1).split("&");
				for (var i in hash) {
					var keyValue = hash[i].split("=");
					this.data[keyValue[0]] = keyValue[1] || true;
				}
			}
			execCallbacks();
			return this;
		},
		push: function() {
			var hash = "#";
			for (var i in this.data) {
				if (hash.length > 1)
					hash += "&";
				hash += i;
				if (this.data[i] !== true)
					hash += "=" + this.data[i];
			}
			if (location.hash !== hash)
				location.hash = hash;
			execCallbacks();
			return this;
		}
	};

	// init
	locationHash.pull();
	attachEvent(window, "hashchange", function() {
		locationHash.pull();
	});
	attachEvent(window, "DOMNodeInserted", function(e) {
		setEvent(e.srcElement);
	});
	attachEvent(window, "load", function() {
		setEvent(document.body);
	});

})();
