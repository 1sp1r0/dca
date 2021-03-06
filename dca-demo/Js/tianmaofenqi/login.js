define("authcenter/login/1.2.4/js/login", ["$", "alipay/storex/1.0.1/storex", "gallery/json/1.0.3/json", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "gallery/store/1.3.7/store", "./util/namespace", "./util/getTime", "./util/set-domain", "./util/util", "./util/rule", "./util/crossIframe", "./module/alieditAttr", "./module/checkcode", "./module/switchaliedit", "arale/tip/1.1.3/tip", "arale/popup/1.1.1/popup", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "./module/btnStyle", "./module/validator", "arale/validator/0.9.5/validator", "arale/placeholder/1.1.0/placeholder", "./module/account", "./module/accountsave", "./module/adjustheight", "./module/autocomplete", "arale/autocomplete/1.2.2/autocomplete", "arale/templatable/0.9.1/templatable", "gallery/handlebars/1.0.2/handlebars", "gallery/handlebars/1.0.2/runtime", "alipay/object-shim/1.0.0/object-shim", "./module/proxyip", "./module/ignoringSpaces", "./module/refreshCheckCode", "./util/uri", "./module/realtimeCheckcode", "./module/voiceCheckcode", "./module/alilogin", "./scene/alipay", "./module/indexBg", "./module/qrcode"], function (a) {
	"use strict";
	var b = a("$"),
		c = a("alipay/storex/1.0.1/storex"),
		d = a("./util/namespace"),
		e = a("./util/getTime");
	a("./util/set-domain"), d("system.auth"), system.auth.errorcode = {
		closechacha: "删除账号记录",
		accounterror: "账户名blur时候校验未通过"
	}, a("./util/util"), system.auth.log = function (a, d) {
		var f = c.status().enabled ? c.get("debug") : "",
			g = "",
			h = "";
		location.host.indexOf("alipay.com") > 1 ? -1 !== b.inArray(a, ["track", "error"]) && Tracker && Tracker.click("auth^" + a + "^" + d) : "true" === f ? -1 !== b.inArray(a, ["track", "debug", "info", "warn", "error"]) && (h = system.auth.errorcode[d], g = a.toUpperCase() + ": " + ("undefined" != typeof h && h ? h : d) + " - " + e(), "undefined" != typeof console && console.log(g)) : -1 !== b.inArray(a, ["track", "warn", "error"]) && (h = system.auth.errorcode[d], g = a.toUpperCase() + ": " + ("undefined" != typeof h && h ? h : d) + " - " + e(), "undefined" != typeof console && console.log(g))
	}, system.auth.param = {
		J_superSwitch: b("#J-superSwitch"),
		account: b("#J-input-user"),
		J_isNoActiveX: b("#J-noActiveX"),
		J_alieditPwd: b("#password_container"),
		standarPwd: b("#password_input"),
		J_standarPwd: b(".standardPwdContainer"),
		authcode: b("#J-input-checkcode"),
		J_authcode: b("#J-checkcode"),
		safeSignCheck: b("#safeSignCheck"),
		J_safeSignCheck: b("#J-password"),
		alieditUsing: document.getElementsByName("J_aliedit_using")[0],
		password: b("#password"),
		loginBtn: b("#J-login-btn"),
		loginForm: b("#login")
	}, system.auth.instance = {}, system.auth.instance.TTI = {
		FOCUS: ""
	}, system.auth.instance.getTTI = function (a, b) {
		if ("undefined" != typeof window._to) {
			var c = b - window._to.start;
			for (var d in system.auth.instance.TTI) d === a && (system.auth.instance.TTI[d] = c)
		}
	}, a("./util/rule"), a("./util/crossIframe"), a("./module/alieditAttr"), a("./module/checkcode"), a("./module/switchaliedit"), a("./module/btnStyle"), a("./module/validator"), a("./module/account"), a("./module/accountsave"), a("./module/adjustheight"), a("./module/autocomplete"), a("./module/proxyip"), a("./module/ignoringSpaces"), a("./module/refreshCheckCode"), a("./module/realtimeCheckcode"), a("./module/voiceCheckcode"), a("./module/alilogin"), a("./scene/alipay"), a("./module/indexBg"), a("./module/qrcode"), b(document).ready(function () {
		setTimeout(function () {
			var a = "";
			for (var b in system.auth.instance.TTI) a = system.auth.instance.TTI[b];
			"undefined" != typeof Tracker && Tracker.calc("TTI-autoFocus", a)
		}, 3e3)
	})
}), define("alipay/storex/1.0.1/storex", ["gallery/json/1.0.3/json", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "gallery/store/1.3.7/store"], function (a, b, c) {
	a("gallery/json/1.0.3/json");
	var d = a("arale/base/1.1.1/base"),
		e = a("gallery/store/1.3.7/store"),
		f = d.extend({
			_super: !1,
			initialize: function (a) {
				this._super = a, this._super.deserialize = this.deserialize
			},
			_maxRetry: 15,
			set: function (a, b, c, d) {
				try {
					return c instanceof Date && (c = c.getTime()), this._super.set(a, this.serialize({
						value: b,
						expire: c || -1
					})), this.addQKey(a), b
				} catch (e) {
					if (this.trigger("full"), d) for (var f = this._maxRetry; f > 0;) {
						f--;
						var g = this.shiftQKey();
						if (!g) break;
						if (this._super.remove(g), null != this.set(a, b, c)) return this.addQKey(a), b
					}
					return null
				}
			},
			get: function (a) {
				var b = this._super.get(a),
					c = b ? "undefined" != typeof b.value ? b.value : b : null;
				return b && b.expire && b.expire > 0 && b.expire < (new Date).getTime() && (this.remove(a), c = null, this.trigger("expired")), c
			},
			status: function () {
				return {
					queueCount: this.getQueueCount(),
					enabled: this._super.enabled
				}
			},
			_queueKey: "__queue__",
			getQueue: function () {
				var a = this.get(this._queueKey),
					b = a && a.split("|");
				if (null != b) for (var c = 0; c < b.length; c++) b[c] = unescape(b[c]);
				return b || []
			},
			setQueue: function (a) {
				try {
					for (var b = 0; b < a.length; b++) a[b] = escape(a[b]);
					this._super.set(this._queueKey, a.join("|"))
				} catch (c) {}
			},
			addQKey: function (a, b) {
				var c = this.getQueue(); - 1 == this._getIndexOfArray(c, a) ? (c.push(a), this.setQueue(c), b || this.trigger("queue_key_added")) : (this.removeQKey(a, !0), this.addQKey(a, !0), this.trigger("queue_key_updated"))
			},
			shiftQKey: function () {
				var a = this.getQueue(),
					b = a.shift();
				return this.setQueue(a), this.trigger("queue_key_removed"), this.trigger("queue_key_shifted"), b
			},
			removeQKey: function (a, b) {
				for (var c, d = this.getQueue(); - 1 !== (c = this._getIndexOfArray(d, a));) d.splice(c, 1);
				this.setQueue(d), b || this.trigger("queue_key_removed")
			},
			getQueueCount: function () {
				return this.getQueue().length
			},
			_getIndexOfArray: function (a, b) {
				if (a.indexOf) return a.indexOf(b);
				for (var c = 0, d = a.length; d > c;) {
					if (a[c] === b) return c;
					++c
				}
				return -1
			},
			_serialize: function (a) {
				return "JSON" in window && JSON.stringify ? JSON.stringify(a) : void 0
			},
			serialize: function (a) {
				var b = this._serialize(a);
				return b.length + "|" + b
			},
			deserialize: function (a) {
				if (null != a) {
					try {
						a = JSON.parse(a)
					} catch (b) {}
					if ("string" != typeof a) return a;
					var c = a.match(/^(\d+?)\|/);
					if (null != c && 2 == c.length) {
						var d = 1 * c[1];
						if (a = a.replace(c[0], ""), d != a.length) return g.trigger("broken"), null;
						try {
							a = JSON.parse(a)
						} catch (b) {
							return g.trigger("broken"), null
						}
					}
				}
				return a
			},
			remove: function (a) {
				this.removeQKey(a), this._super.remove(a)
			},
			clear: function () {
				this._super.clear(), this.trigger("queue_key_removed")
			},
			getAll: function () {
				return this._super.getAll()
			}
		}),
		g = new f(e);
	c.exports = g
}), "object" != typeof JSON && (JSON = {}), function () {
	"use strict";
	function f(a) {
		return 10 > a ? "0" + a : a
	}
	function quote(a) {
		return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
			var b = meta[a];
			return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function str(a, b) {
		var c, d, e, f, g, h = gap,
			i = b[a];
		switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
		case "string":
			return quote(i);
		case "number":
			return isFinite(i) ? String(i) : "null";
		case "boolean":
		case "null":
			return String(i);
		case "object":
			if (!i) return "null";
			if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
				for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
				return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
			}
			if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
			else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
			return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
		return this.valueOf()
	});
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap, indent, meta = {
			"\b": "\\b",
			"	": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		rep;
	"function" != typeof JSON.stringify && (JSON.stringify = function (a, b, c) {
		var d;
		if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " ";
		else "string" == typeof c && (indent = c);
		if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
		return str("", {
			"": a
		})
	}), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
		function walk(a, b) {
			var c, d, e = a[b];
			if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
			return reviver.call(a, b, e)
		}
		var j;
		if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
			"": j
		}, "") : j;
		throw new SyntaxError("JSON.parse")
	})
}(), define("gallery/json/1.0.3/json", [], function () {
	return window.JSON
}), define("arale/base/1.1.1/base", ["arale/class/1.1.0/class", "arale/events/1.1.0/events", "./aspect", "./attribute"], function (a, b, c) {
	function d(a, b) {
		for (var c in b) if (b.hasOwnProperty(c)) {
			var d = "_onChange" + e(c);
			a[d] && a.on("change:" + c, a[d])
		}
	}
	function e(a) {
		return a.charAt(0).toUpperCase() + a.substring(1)
	}
	var f = a("arale/class/1.1.0/class"),
		g = a("arale/events/1.1.0/events"),
		h = a("./aspect"),
		i = a("./attribute");
	c.exports = f.create({
		Implements: [g, h, i],
		initialize: function (a) {
			this.initAttrs(a), d(this, this.attrs)
		},
		destroy: function () {
			this.off();
			for (var a in this) this.hasOwnProperty(a) && delete this[a];
			this.destroy = function () {}
		}
	})
}), define("arale/base/1.1.1/aspect", [], function (a, b) {
	function c(a, b, c, g) {
		for (var h, i, j = b.split(f); h = j.shift();) i = d(this, h), i.__isAspected || e.call(this, h), this.on(a + ":" + h, c, g);
		return this
	}
	function d(a, b) {
		var c = a[b];
		if (!c) throw new Error("Invalid method name: " + b);
		return c
	}
	function e(a) {
		var b = this[a];
		this[a] = function () {
			var c = Array.prototype.slice.call(arguments),
				d = ["before:" + a].concat(c);
			if (this.trigger.apply(this, d) !== !1) {
				var e = b.apply(this, arguments),
					f = ["after:" + a, e].concat(c);
				return this.trigger.apply(this, f), e
			}
		}, this[a].__isAspected = !0
	}
	b.before = function (a, b, d) {
		return c.call(this, "before", a, b, d)
	}, b.after = function (a, b, d) {
		return c.call(this, "after", a, b, d)
	};
	var f = /\s+/
}), define("arale/base/1.1.1/attribute", [], function (a, b) {
	function c(a) {
		return "[object String]" === t.call(a)
	}
	function d(a) {
		return "[object Function]" === t.call(a)
	}
	function e(a) {
		return null != a && a == a.window
	}
	function f(a) {
		if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a)) return !1;
		try {
			if (a.constructor && !u.call(a, "constructor") && !u.call(a.constructor.prototype, "isPrototypeOf")) return !1
		} catch (b) {
			return !1
		}
		var c;
		if (s) for (c in a) return u.call(a, c);
		for (c in a);
		return void 0 === c || u.call(a, c)
	}
	function g(a) {
		if (!a || "[object Object]" !== t.call(a) || a.nodeType || e(a) || !a.hasOwnProperty) return !1;
		for (var b in a) if (a.hasOwnProperty(b)) return !1;
		return !0
	}
	function h(a, b) {
		var c, d;
		for (c in b) if (b.hasOwnProperty(c)) {
			if (d = b[c], v(d)) d = d.slice();
			else if (f(d)) {
				var e = a[c];
				f(e) || (e = {}), d = h(e, d)
			}
			a[c] = d
		}
		return a
	}
	function i(a, b, c) {
		for (var d = [], e = b.constructor.prototype; e;) e.hasOwnProperty("attrs") || (e.attrs = {}), k(c, e.attrs, e), g(e.attrs) || d.unshift(e.attrs), e = e.constructor.superclass;
		for (var f = 0, i = d.length; i > f; f++) h(a, o(d[f]))
	}
	function j(a, b) {
		h(a, o(b, !0))
	}
	function k(a, b, c, d) {
		for (var e = 0, f = a.length; f > e; e++) {
			var g = a[e];
			c.hasOwnProperty(g) && (b[g] = d ? b.get(g) : c[g])
		}
	}
	function l(a, b) {
		for (var c in b) if (b.hasOwnProperty(c)) {
			var e, f = b[c].value;
			d(f) && (e = c.match(x)) && (a[e[1]](m(e[2]), f), delete b[c])
		}
	}
	function m(a) {
		var b = a.match(y),
			c = b[1] ? "change:" : "";
		return c += b[2].toLowerCase() + b[3]
	}
	function n(a, b, c) {
		var d = {
			silent: !0
		};
		a.__initializingAttrs = !0;
		for (var e in c) c.hasOwnProperty(e) && b[e].setter && a.set(e, c[e], d);
		delete a.__initializingAttrs
	}
	function o(a, b) {
		var c = {};
		for (var d in a) {
			var e = a[d];
			c[d] = !b && f(e) && p(e, z) ? e : {
				value: e
			}
		}
		return c
	}
	function p(a, b) {
		for (var c = 0, d = b.length; d > c; c++) if (a.hasOwnProperty(b[c])) return !0;
		return !1
	}
	function q(a) {
		return null == a || (c(a) || v(a)) && 0 === a.length || g(a)
	}
	function r(a, b) {
		if (a === b) return !0;
		if (q(a) && q(b)) return !0;
		var c = t.call(a);
		if (c != t.call(b)) return !1;
		switch (c) {
		case "[object String]":
			return a == String(b);
		case "[object Number]":
			return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
		case "[object Date]":
		case "[object Boolean]":
			return +a == +b;
		case "[object RegExp]":
			return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
		case "[object Array]":
			var d = a.toString(),
				e = b.toString();
			return -1 === d.indexOf("[object") && -1 === e.indexOf("[object") && d === e
		}
		if ("object" != typeof a || "object" != typeof b) return !1;
		if (f(a) && f(b)) {
			if (!r(w(a), w(b))) return !1;
			for (var g in a) if (a[g] !== b[g]) return !1;
			return !0
		}
		return !1
	}
	b.initAttrs = function (a) {
		var b = this.attrs = {},
			c = this.propsInAttrs || [];
		i(b, this, c), a && j(b, a), n(this, b, a), l(this, b), k(c, this, b, !0)
	}, b.get = function (a) {
		var b = this.attrs[a] || {},
			c = b.value;
		return b.getter ? b.getter.call(this, c, a) : c
	}, b.set = function (a, b, d) {
		var e = {};
		c(a) ? e[a] = b : (e = a, d = b), d || (d = {});
		var g = d.silent,
			i = d.override,
			j = this.attrs,
			k = this.__changedAttrs || (this.__changedAttrs = {});
		for (a in e) if (e.hasOwnProperty(a)) {
			var l = j[a] || (j[a] = {});
			if (b = e[a], l.readOnly) throw new Error("This attribute is readOnly: " + a);
			l.setter && (b = l.setter.call(this, b, a));
			var m = this.get(a);
			!i && f(m) && f(b) && (b = h(h({}, m), b)), j[a].value = b, this.__initializingAttrs || r(m, b) || (g ? k[a] = [b, m] : this.trigger("change:" + a, b, m, a))
		}
		return this
	}, b.change = function () {
		var a = this.__changedAttrs;
		if (a) {
			for (var b in a) if (a.hasOwnProperty(b)) {
				var c = a[b];
				this.trigger("change:" + b, c[0], c[1], b)
			}
			delete this.__changedAttrs
		}
		return this
	}, b._isPlainObject = f;
	var s, t = Object.prototype.toString,
		u = Object.prototype.hasOwnProperty;
	!
	function () {
		function a() {
			this.x = 1
		}
		var b = [];
		a.prototype = {
			valueOf: 1,
			y: 1
		};
		for (var c in new a) b.push(c);
		s = "x" !== b[0]
	}();
	var v = Array.isArray ||
	function (a) {
		return "[object Array]" === t.call(a)
	}, w = Object.keys;
	w || (w = function (a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && b.push(c);
		return b
	});
	var x = /^(on|before|after)([A-Z].*)$/,
		y = /^(Change)?([A-Z])(.*)/,
		z = ["value", "getter", "setter", "readOnly"]
}), define("arale/class/1.1.0/class", [], function (a, b, c) {
	function d(a) {
		return this instanceof d || !l(a) ? void 0 : f(a)
	}
	function e(a) {
		var b, c;
		for (b in a) c = a[b], d.Mutators.hasOwnProperty(b) ? d.Mutators[b].call(this, c) : this.prototype[b] = c
	}
	function f(a) {
		return a.extend = d.extend, a.implement = e, a
	}
	function g() {}
	function h(a, b, c) {
		for (var d in b) if (b.hasOwnProperty(d)) {
			if (c && -1 === m(c, d)) continue;
			"prototype" !== d && (a[d] = b[d])
		}
	}
	c.exports = d, d.create = function (a, b) {
		function c() {
			a.apply(this, arguments), this.constructor === c && this.initialize && this.initialize.apply(this, arguments)
		}
		return l(a) || (b = a, a = null), b || (b = {}), a || (a = b.Extends || d), b.Extends = a, a !== d && h(c, a, a.StaticsWhiteList), e.call(c, b), f(c)
	}, d.extend = function (a) {
		return a || (a = {}), a.Extends = this, d.create(a)
	}, d.Mutators = {
		Extends: function (a) {
			var b = this.prototype,
				c = i(a.prototype);
			h(c, b), c.constructor = this, this.prototype = c, this.superclass = a.prototype
		},
		Implements: function (a) {
			k(a) || (a = [a]);
			for (var b, c = this.prototype; b = a.shift();) h(c, b.prototype || b)
		},
		Statics: function (a) {
			h(this, a)
		}
	};
	var i = Object.__proto__ ?
	function (a) {
		return {
			__proto__: a
		}
	} : function (a) {
		return g.prototype = a, new g
	}, j = Object.prototype.toString, k = Array.isArray ||
	function (a) {
		return "[object Array]" === j.call(a)
	}, l = function (a) {
		return "[object Function]" === j.call(a)
	}, m = Array.prototype.indexOf ?
	function (a, b) {
		return a.indexOf(b)
	} : function (a, b) {
		for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
		return -1
	}
}), define("arale/events/1.1.0/events", [], function () {
	function a() {}
	function b(a, b, c, d) {
		var e;
		if (a) for (var f = 0, g = a.length; g > f; f += 2) e = a[f].apply(a[f + 1] || c, b), e === !1 && d.status && (d.status = !1)
	}
	var c = /\s+/;
	a.prototype.on = function (a, b, d) {
		var e, f, g;
		if (!b) return this;
		for (e = this.__events || (this.__events = {}), a = a.split(c); f = a.shift();) g = e[f] || (e[f] = []), g.push(b, d);
		return this
	}, a.prototype.off = function (a, b, e) {
		var f, g, h, i;
		if (!(f = this.__events)) return this;
		if (!(a || b || e)) return delete this.__events, this;
		for (a = a ? a.split(c) : d(f); g = a.shift();) if (h = f[g]) if (b || e) for (i = h.length - 2; i >= 0; i -= 2) b && h[i] !== b || e && h[i + 1] !== e || h.splice(i, 2);
		else delete f[g];
		return this
	}, a.prototype.trigger = function (a) {
		var d, e, f, g, h, i, j = [],
			k = {
				status: !0
			};
		if (!(d = this.__events)) return this;
		for (a = a.split(c), h = 1, i = arguments.length; i > h; h++) j[h - 1] = arguments[h];
		for (; e = a.shift();)(f = d.all) && (f = f.slice()), (g = d[e]) && (g = g.slice()), b(g, j, this, k), b(f, [e].concat(j), this, k);
		return k.status
	}, a.mixTo = function (b) {
		b = b.prototype || b;
		var c = a.prototype;
		for (var d in c) c.hasOwnProperty(d) && (b[d] = c[d])
	};
	var d = Object.keys;
	return d || (d = function (a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && b.push(c);
		return b
	}), a
}), define("gallery/store/1.3.7/store", [], function (a, b, c) {
	!
	function () {
		function a() {
			try {
				return i in g && g[i]
			} catch (a) {
				return !1
			}
		}
		function b(a) {
			return function () {
				var b = Array.prototype.slice.call(arguments, 0);
				b.unshift(e), k.appendChild(e), e.addBehavior("#default#userData"), e.load(i);
				var c = a.apply(f, b);
				return k.removeChild(e), c
			}
		}
		function d(a) {
			return a.replace(n, "___")
		}
		var e, f = {},
			g = window,
			h = g.document,
			i = "localStorage",
			j = "__storejs__";
		if (f.disabled = !1, f.set = function () {}, f.get = function () {}, f.remove = function () {}, f.clear = function () {}, f.transact = function (a, b, c) {
			var d = f.get(a);
			null == c && (c = b, b = null), void 0 === d && (d = b || {}), c(d), f.set(a, d)
		}, f.getAll = function () {}, f.serialize = function (a) {
			return JSON.stringify(a)
		}, f.deserialize = function (a) {
			if ("string" != typeof a) return void 0;
			try {
				return JSON.parse(a)
			} catch (b) {
				return a || void 0
			}
		}, a()) e = g[i], f.set = function (a, b) {
			return void 0 === b ? f.remove(a) : (e.setItem(a, f.serialize(b)), b)
		}, f.get = function (a) {
			return f.deserialize(e.getItem(a))
		}, f.remove = function (a) {
			e.removeItem(a)
		}, f.clear = function () {
			e.clear()
		}, f.getAll = function () {
			for (var a = {}, b = 0; e.length > b; ++b) {
				var c = e.key(b);
				a[c] = f.get(c)
			}
			return a
		};
		else if (h.documentElement.addBehavior) {
			var k, l;
			try {
				l = new ActiveXObject("htmlfile"), l.open(), l.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'), l.close(), k = l.w.frames[0].document, e = k.createElement("div")
			} catch (m) {
				e = h.createElement("div"), k = h.body
			}
			var n = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
			f.set = b(function (a, b, c) {
				return b = d(b), void 0 === c ? f.remove(b) : (a.setAttribute(b, f.serialize(c)), a.save(i), c)
			}), f.get = b(function (a, b) {
				return b = d(b), f.deserialize(a.getAttribute(b))
			}), f.remove = b(function (a, b) {
				b = d(b), a.removeAttribute(b), a.save(i)
			}), f.clear = b(function (a) {
				var b = a.XMLDocument.documentElement.attributes;
				a.load(i);
				for (var c, d = 0; c = b[d]; d++) a.removeAttribute(c.name);
				a.save(i)
			}), f.getAll = b(function (a) {
				for (var b, c = a.XMLDocument.documentElement.attributes, e = {}, g = 0; b = c[g]; ++g) {
					var h = d(b.name);
					e[b.name] = f.deserialize(a.getAttribute(h))
				}
				return e
			})
		}
		try {
			f.set(j, j), f.get(j) != j && (f.disabled = !0), f.remove(j)
		} catch (m) {
			f.disabled = !0
		}
		f.enabled = !f.disabled, void 0 !== c && "function" != typeof c ? c.exports = f : "function" == typeof define && define.amd ? define(f) : this.store = f
	}()
}), define("authcenter/login/1.2.4/js/util/namespace", [], function (a, b, c) {
	"use strict";
	function d(a, b) {
		var c = a.split("."),
			d = b || window;
		c[0] in window || (window[c[0]] = {});
		for (var e; c.length && (e = c.shift());) d[e] || (d[e] = {}), d[e]._parentModule || (d[e]._parentModule = d), d = d[e], d._moduleName = e;
		return d
	}
	c.exports = d
}), define("authcenter/login/1.2.4/js/util/getTime", [], function (a, b, c) {
	"use strict";
	function d() {
		var a = new Date;
		return [a.getFullYear(), a.getMonth() + 1, a.getDate()].join("-") + " " + [a.getHours(), a.getMinutes(), a.getSeconds()].join(":")
	}
	c.exports = d
}), define("authcenter/login/1.2.4/js/util/set-domain", [], function () {
	"use strict";
	var a = document.domain.split(".");
	if (a.length > 1) {
		var b = a[a.length - 2] + "." + a[a.length - 1];
		document.domain = b
	}
}), define("authcenter/login/1.2.4/js/util/util", ["$"], function (a) {
	"use strict";
	a("$"), system.auth.util = system.auth.util || {}, system.auth.util.trimAll = function (a) {
		return a.toString().replace(/^\s+|\s+|\s+$/g, "")
	}, system.auth.util.limitEmail = function (a) {
		a = a.replace(/^\s*(.*?)\s*$/g, "$1");
		var b = {
			regxp: /(^.*)(.{3}$)/g,
			placeholder: "$1***",
			leftLimit: 6
		},
			c = a.split("@"),
			d = c[0],
			e = c[1];
		return c.length > 1 ? (d.length > b.leftLimit && (d = d.slice(0, b.leftLimit).replace(b.regxp, b.placeholder)), [d, "@", e].join("").toLowerCase()) : a.toLowerCase()
	}
}), define("authcenter/login/1.2.4/js/util/rule", [], function () {
	"use strict";
	system.auth.rule = system.auth.rule || {}, system.auth.rule.emailOrMobile = function (a) {
		var b = !1;
		return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(a) ? b = !0 : /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+(\#[a-zA-Z0-9]{1,20})+$/.test(a) ? b = !0 : /^(00)?(852|853|886|855|91|62|972|81|962|996|60|960|976|63|974|966|65|82|94|90|66|971|84|43|375|32|359|45|372|358|33|49|30|36|353|39|370|352|31|47|48|351|40|7|381|34|46|41|380|44|54|1242|501|55|1|56|57|52|507|51|1|58|1284|20|212|234|248|27|216|61|64)-?\d{6,14}$/.test(a) ? b = !0 : /^1\d{10}$/.test(a) ? b = !0 : /^(1\d{10})(\#[a-zA-Z0-9]{1,20})$/.test(a) && (b = !0), b
	}
}), define("authcenter/login/1.2.4/js/util/crossIframe", [], function () {
	"use strict";
	system.auth.crossIframe = function () {
		var a = null;
		!
		function () {
			var b = self.parent;
			if (b && b.showLoginIframe) b.showLoginIframe(), a && clearTimeout(a);
			else try {
				a = setTimeout(arguments.callee, 500)
			} catch (c) {}
		}()
	}
}), define("authcenter/login/1.2.4/js/module/alieditAttr", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.alieditInit = function () {
		if (this.alieditAttrs = {}, window.light && light.page && (light.page.products.password || light.page.products.password_input)) {
			var a = light.page.products.password || light.page.products.password_input,
				b = window.alipay.security;
			this.alieditAttrs.alieditPwd = a.element, this.alieditAttrs.getPassword = function () {
				return a.getPassword()
			}, this.alieditAttrs.getCi1 = function () {
				return a.getCi1()
			}, this.alieditAttrs.getCi2 = function () {
				return a.getCi2()
			}, this.alieditAttrs.installedAliedit = b.npedit.installed || b.edit.installed, this.alieditAttrs.detectAliedit = b.edit.detect
		}
	}, system.auth.passwordInit = function () {
		if (this.alieditAttrs = {}, window.light && light.page && light.page.products.password) {
			var a = light.page.products.password,
				c = (window.alipay.security, ""),
				d = "",
				e = "",
				f = b("input[name=passwordSecurityId]").val();
			a.renderable && (this.alieditAttrs.alieditPwd = a.renderer.input.element), this.alieditAttrs.getPassword = function () {
				return a.getPassword()
			}, this.alieditAttrs.getCi1 = function () {
				return c
			}, this.alieditAttrs.getNetInfo = function () {
				return e
			}, this.alieditAttrs.getCi2 = function () {
				return d
			}, a.sensor.getCi1(function (a, b) {
				a ? f && alipay.security.snowden.record(f, {
					edit_getCi1: -1
				}) : (c = b, f && alipay.security.snowden.record(f, {
					edit_getCi1: 1
				}))
			}), a.sensor.getCi2(function (a, b) {
				a ? f && alipay.security.snowden.record(f, {
					edit_getCi2: -1
				}) : (d = b, f && alipay.security.snowden.record(f, {
					edit_getCi2: 1
				}))
			}), a.sensor.getNetInfo(function (a, c) {
				a ? f && alipay.security.snowden.record(f, {
					edit_getNetInfo: -1
				}) : (e = c, b("input[name=J_aliedit_net_info]").val(c), f && alipay.security.snowden.record(f, {
					edit_getNetInfo: 1
				}))
			}), this.alieditAttrs.installedAliedit = !0, this.alieditAttrs.isMasked = function () {
				return a.renderer.isMasked
			}, this.alieditAttrs.showInstallDialog = function () {
				a.renderer.showInstallDialog()
			}
		}
	}, light.ready(function () {
		if (alipay.security.useMultiplePolicy) {
			var a = light.page.products.password;
			if (!a) throw new Error("Security product password doesn' exist.");
			a.onReady(function () {
				system.auth.passwordInit()
			})
		} else system.auth.alieditInit()
	})
}), define("authcenter/login/1.2.4/js/module/checkcode", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.checkcode = function (a) {
		var c = this;
		this.init();
		for (var d in a) this[d] = a[d];
		if (b("#J-checkcode-img").on("click", function (a) {
			a.preventDefault(), system.auth.refreshCheckCode(), system.auth.param.authcode[0].focus()
		}), document.getElementsByName("logonIdReadOnly")[0] && "true" === document.getElementsByName("logonIdReadOnly")[0].value && this.failCallback.call(this), !this.form.length > 0 || !this.logonId.length > 0 || !this.errorBox.length > 0) return this.failCallback.call(this), !1;
		if (this.logonIdFirstValue = this.logonId.val(), !json_ua) var e = 0,
			f = setInterval(function () {
				json_ua ? clearInterval(f) : (e++, e > 4 && (clearInterval(f), c.showCheckCode()))
			}, 100);
		this.supportAliedit() || this.showCheckCode(), this.bind()
	}, system.auth.checkcode.prototype = {
		form: null,
		logonId: null,
		logonIdFirstValue: null,
		errorBox: null,
		loginTitle: null,
		accountFormatError: ["请输入账户名。", "账户名的长度不能超过100位。", "支付宝账户是邮箱地址或手机号码。"],
		accountSwtich: !0,
		accountInfoShow: !1,
		accountInfoNode: null,
		isAlertType: !1,
		accountsaverKey: null,
		codeCnt_: null,
		authcode: null,
		formSubmit_: null,
		formToken: null,
		isPerson: !1,
		timer: null,
		timeout: 3e3,
		accountValue: null,
		accountResult: !1,
		qrAccountThumb: [],
		accountErrorCode: null,
		accountTips: window.ACCOUNTTIPS,
		ajaxTarget: null,
		needQrLogin: !0,
		init: function () {
			this.form = b("#login")[0], this.logonId = b("#J-input-user"), this.errorBox = b("#J-errorBox"), this.loginTitle = b("#J-login-title"), this.codeCnt_ = b("#J-checkcode"), this.authcode = b("#J-input-checkcode"), this.formToken = b("#login input[name=rds_form_token]")
		},
		bind: function () {
			var a = this;
			this.submitAspect(), b(system.auth.param.loginForm).on("SWITCH_ALIEDITER_EVENT", function (c, d) {
				if (d && a.isPerson && system.auth.alieditAttrs.supportAliedit) a.hideCheckCode();
				else if (!d) {
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
					} catch (c) {}
					a.onFailCallback && a.onFailCallback.call(a, null), a.ajaxTarget = null
				}
			}), a.logonId && a.logonId.attr("id") && a.codeCnt_ && (!a.codeCnt_ || a.codeCnt_.hasClass("fn-hide")) || a.failCallback.call(a), setTimeout(function () {
				try {
					if (system.auth.accountsaver.status()) {
						if ("true" === b(system.auth.param.alieditUsing).val()) {
							var c = navigator.userAgent.toLowerCase().match(/version\/([\d.]+).*safari/),
								d = !! c && "7.1" === c[1];
							system.auth.alieditAttrs && system.auth.alieditAttrs.alieditPwd && !d && system.auth.alieditAttrs.alieditPwd.focus()
						} else b(system.auth.param.standarPwd)[0].focus();
						a.checkAccount(a.logonId.val()) && a.request()
					} else b(a.logonId).focus()
				} catch (e) {
					a.failCallback.call(a)
				}
				try {
					system.auth.instance.getTTI("FOCUS", new Date)
				} catch (e) {}
			}, 300), b(a.logonId).on("blur", function () {
				a.checkAccount(a.logonId.val()) ? a.request() : a.sendSeed("accounterror")
			})
		},
		checkAccount: function (a) {
			var b = this;
			return a = a.replace(/^\s+|\s+$/g, ""), a = a.replace(/[。．]/, "."), 0 === a.length ? !1 : a === b.logonId.attr("placeholder") ? !1 : a.length > 100 ? (b.showErrorBox(b.accountFormatError[1]), !1) : b.emailOrMobile(a) ? !0 : (b.showErrorBox(b.accountFormatError[2]), !1)
		},
		emailOrMobile: function (a) {
			var b = !1;
			return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(a) ? b = !0 : /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+(\#[a-zA-Z0-9]{1,20})+$/.test(a) ? b = !0 : /^(00)?(852|853|886|855|91|62|972|81|962|996|60|960|976|63|974|966|65|82|94|90|66|971|84|43|375|32|359|45|372|358|33|49|30|36|353|39|370|352|31|47|48|351|40|7|381|34|46|41|380|44|54|1242|501|55|1|56|57|52|507|51|1|58|1284|20|212|234|248|27|216|61|64)-?\d{6,14}$/.test(a) ? b = !0 : /^1\d{10}$/.test(a) ? b = !0 : /^(1\d{10})(\#[a-zA-Z0-9]{1,20})$/.test(a) && (b = !0), b
		},
		insertFormToken: function () {
			var a = this.formToken;
			a.length < 1 && (a = document.createElement("input"), a.setAttribute("type", "hidden"), a.name = "rds_form_token", a.value = form_tk, this.form.appendChild(a))
		},
		supportAliedit: function () {
			return document.getElementsByName("J_aliedit_using")[0] && "true" === document.getElementsByName("J_aliedit_using")[0].value
		},
		submitAspect: function () {
			var a = this.form.submit,
				c = this;
			this.form.submit = function () {
				c.insertFormToken(), c.onSubmit && c.onSubmit.call(c), c.formSubmit_ = a;
				var d = b(system.auth.param.loginForm).attr("data-qrcode");
				if (!c.accountSwtich || c.accountSwtich && c.accountResult || "true" === d) {
					try {
						system.auth.accountsaver.save(c.accountsaverKey)
					} catch (e) {}
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !0)
					} catch (e) {}
					try {
						a()
					} catch (e) {
						a.call(c.form)
					}
				} else if (c.accountErrorCode) {
					c.showErrorBox(c.accountTips[c.accountErrorCode]);
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
					} catch (e) {}
				} else if (null === c.accountValue) {
					c.checkAccount(c.logonId.attr("value")) && c.request();
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
					} catch (e) {}
				} else {
					c.sendSeed("onSubmit-others");
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
					} catch (e) {}
				}
			}
		},
		sendSeed: function (a) {
			"undefined" != typeof Tracker && Tracker.click(a)
		},
		reset: function () {
			this.formSubmit_ = null, this.accountValue = null, this.accountErrorCode = null, this.accountResult = !1
		},
		showCheckCode: function () {
			this.codeCnt_.removeClass("fn-hide");
			try {
				system.auth.adjustheight.inited && system.auth.adjustheight()
			} catch (a) {}
			var b = window.location.hostname.split(".")[0];
			this.sendSeed("authlogin-showCheckCode-" + b)
		},
		hideCheckCode: function () {
			this.codeCnt_.addClass("fn-hide"), this.authcode.val(""), b("#J-checkcodeIcon").length > 0 && b("#J-checkcodeIcon").removeClass("sl-checkcode-err").removeClass("sl-checkcode-suc");
			try {
				system.auth.adjustheight.inited && system.auth.adjustheight()
			} catch (a) {}
		},
		request: function () {
			var a = this,
				c = a.errorBox.attr("errorType");
			if ("0" === c && a.logonId.val() !== a.logonIdFirstValue && a.hideErrorBox(), "1" === c && -1 !== b.inArray(a.errorBox.find(".sl-error-text").html(), a.accountFormatError) && (a.accountErrorCode ? a.showErrorBox(a.accountTips[a.accountErrorCode]) : a.hideErrorBox()), a.logonId.val() === a.accountValue) {
				var d = b.inArray(this.accountValue, this.qrAccountThumb);
				return d >= 0 && a.qrAccountLogin(), !1
			}
			"1" === c && a.hideErrorBox(), a.reset(), a.accountValue = b.trim(a.logonId.val());
			var e = {};
			e = a.accountInfoShow ? {
				logonId: a.accountValue,
				_json_token: form_tk,
				json_ua: json_ua,
				sceneCode: "AC1",
				stamp: (new Date).getTime(),
				getUser: !0
			} : {
				logonId: a.accountValue,
				_json_token: form_tk,
				json_ua: json_ua,
				sceneCode: "AC1",
				stamp: (new Date).getTime()
			}, b.ajax({
				type: "POST",
				url: "/login/verifyId.json",
				data: e,
				dataType: "json",
				timeout: a.timeout,
				success: function (b) {
					a.successCallback.call(a, b)
				},
				error: function () {
					a.failCallback.call(a), a.accountResult = !0
				}
			})
		},
		successCallback: function (a) {
			if ("true" === a.isPerson) this.isPerson = !0;
			else {
				this.showCheckCode(), this.accountInfoShow && this.clearAccountInfo();
				try {
					b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
				} catch (c) {}
				this.onFailCallback && this.onFailCallback.call(this, a)
			}
			if (this.accountSwtich && (this.accountTips[a.checkResult] ? (clearTimeout(this.timer), this.accountResult = !1, this.accountErrorCode = a.checkResult, this.accountInfoShow && this.clearAccountInfo(), this.showErrorBox(this.accountTips[this.accountErrorCode])) : (this.accountResult = !0, this.accountInfoShow && a.enabledStatus && ("T" === a.enabledStatus ? this.showAccountInfo(a) : "Q" === a.enabledStatus && (this.clearAccountInfo(), clearTimeout(this.timer), this.showErrorBox(this.accountTips.STATUS_NEED_ACTIVATE))))), this.needQrLogin && "true" === a.isShowQRCode) {
				var d = b.inArray(this.accountValue, this.qrAccountThumb);
				0 > d && this.qrAccountThumb.push(this.accountValue), this.qrAccountLogin()
			}
			if (this.formSubmit_ && this.isPerson && (!this.accountSwtich || this.accountSwtich && this.accountResult)) {
				try {
					system.auth.accountsaver.save(this.accountsaverKey)
				} catch (c) {}
				try {
					this.formSubmit_()
				} catch (c) {
					this.formSubmit_.call(this.form)
				}
			}
			this.ajaxTarget = null
		},
		failCallback: function () {
			this.showCheckCode();
			try {
				b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
			} catch (a) {}
			this.onFailCallback && this.onFailCallback.call(this, null), this.ajaxTarget = null
		},
		showErrorBox: function (a) {
			if (this.isAlertType) return !1;
			this.loginTitle.addClass("fn-hide"), this.errorBox.find(".sl-error-text")[0].innerHTML = a, this.errorBox.addClass("sl-error-display"), this.errorBox.attr("errorType", "1");
			try {
				system.auth.adjustheight.inited && system.auth.adjustheight()
			} catch (c) {}
			this.needQrLogin && (b(".J-forQRLogin").length > 0 && b(".J-forQRLogin").addClass("sl-error-link"), this.errorBox.delegate(".J-forQRLogin", "click", function (a) {
				a.preventDefault(), system.auth.qrCode.show("false")
			})), this.onFailCallback && this.onFailCallback.call(this, null)
		},
		hideErrorBox: function () {
			var a = this;
			clearTimeout(a.timer), a.timer = setTimeout(function () {
				a.errorBox.removeClass("sl-error-display"), a.errorBox.find(".sl-error-text").html(""), a.errorBox.attr("errorType", ""), a.loginTitle.removeClass("fn-hide")
			}, 500);
			try {
				system.auth.adjustheight.inited && system.auth.adjustheight()
			} catch (b) {}
		},
		showAccountInfo: function (a) {
			"undefined" != typeof a.realName && "undefined" != typeof a.bindMobile && (b("#J-getAccount").removeClass("fn-hide"), b("#J-getAccount-result").removeClass("fn-hide"), b("#J-showRealName").html(a.realName), b("#J-showMobile").html(a.bindMobile))
		},
		clearAccountInfo: function () {
			b("#J-getAccount").addClass("fn-hide"), b("#J-getAccount-result").addClass("fn-hide"), b("#J-showRealName").html(""), b("#J-showMobile").html("")
		},
		qrAccountLogin: function () {
			system.auth.qrCode.show("true"), system.auth.accountsaver.clear(), clearTimeout(this.timer), this.showErrorBox(this.accountTips.MOBILE_ACCOUNT_NEED_QRLOGON)
		}
	}
}), define("authcenter/login/1.2.4/js/module/switchaliedit", ["$", "arale/tip/1.1.3/tip", "arale/popup/1.1.1/popup", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function (a) {
	"use strict";
	!
	function (b) {
		var c = a("$"),
			d = a("arale/tip/1.1.3/tip"),
			e = function (a, b) {
				return a ? (a.style.display = b ? b : "block", void 0) : !1
			},
			f = function (a) {
				return a ? (a.style.display = "none", void 0) : !1
			},
			g = new d({
				element: "#J-label-editer-pop",
				trigger: "#J-label-editer",
				pointPos: "50%+2"
			}),
			h = b.J_superSwitch ? b.J_superSwitch[0] : null,
			i = b.J_alieditPwd ? b.J_alieditPwd[0] : null,
			j = b.J_standarPwd ? b.J_standarPwd[0] : null,
			k = b.standarPwd ? b.standarPwd[0] : null,
			l = b.safeSignCheck,
			m = b.J_safeSignCheck ? b.J_safeSignCheck[0] : null,
			n = b.J_isNoActiveX ? b.J_isNoActiveX : null,
			o = b.authcode ? b.authcode[0] : null,
			p = b.J_authcode ? b.J_authcode[0] : null,
			q = b.alieditUsing,
			r = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6");
		system.auth.switchaliedit = function () {
			function a() {
				e(j, "inline-block"), f(i, "inline-block"), c(p).length > 0 && (c(o).attr("data", "validate"), c(p).removeClass("fn-hide")), c(l).removeClass("ui-icon-securityON").addClass("ui-icon-securityOFF"), g.set("disabled", !0)
			}
			return c(m).length < 1 || c(h).length < 1 || c(n).length < 1 ? !1 : alipay.security.useMultiplePolicy ? (c(n).val("false"), light.ready(function () {
				var a = light.page.products.password;
				a && a.onReady(function () {
					g.set("content", "点此选择非密码控件登录"), a.renderable ? g.set("disabled", !0) : (a.renderer.render(function () {
						system.auth.alieditAttrs.alieditPwd = this.element
					}, "R", !0), system.auth.switchaliedit.turnSwitchOn())
				})
			}), void 0) : ("true" === c(h).val() ? "true" === c(q).val() ? alipay.security.edit.installed ? "true" === c(n).val() ? (system.auth.switchaliedit.switchToStandard(), system.auth.switchaliedit.lockControlOn()) : (system.auth.switchaliedit.switchToSafe(), "undefined" != typeof alipay.security.updateEdit && alipay.security.updateEdit ? (system.auth.log("warn", "被强制升级了，小锁可点"), system.auth.switchaliedit.lockControlOn()) : system.auth.switchaliedit.lockControlOff()) : "true" === c(n).val() ? (system.auth.switchaliedit.switchToStandard(), system.auth.switchaliedit.lockControlOn()) : (c(n).val("false"), alipay.security.rsainput.installed ? system.auth.switchaliedit.lockControlOff() : (g.set("content", "点此选择非密码控件登录"), system.auth.switchaliedit.lockControlOn())) : "false" === c(q).val() && (c(n).val("false"), a()) : (c(n).val("true"), a()), void 0)
		}, system.auth.switchaliedit.switchToInput = function () {
			light.page.products.password.renderer.switch2input(), c(l).removeClass("ui-icon-securityON").addClass("ui-icon-securityOFF"), c(p).length > 0 && (c(p).removeClass("fn-hide"), c(o).attr("data", "validate")), g.set("content", "点此选择密码控件登录"), system.auth.alieditAttrs.alieditPwd && system.auth.alieditAttrs.alieditPwd.focus()
		}, system.auth.switchaliedit.switchToMask = function () {
			light.page.products.password.renderer.switch2mask(), c(l).removeClass("ui-icon-securityOFF").addClass("ui-icon-securityON"), c(p).length > 0 && (document.getElementsByName("logonIdReadOnly")[0] && "true" === document.getElementsByName("logonIdReadOnly")[0].value ? (c(p).removeClass("fn-hide"), c(o).attr("data", "validate")) : (c(o).val(""), c(o).attr("data", ""), c(p).addClass("fn-hide"))), g.set("content", "点此选择非密码控件登录")
		}, system.auth.switchaliedit.turnSwitchOn = function () {
			g.set("disabled", !1), c(l).on("click", function (a) {
				a.preventDefault();
				var b = a.target;
				if (c(b).hasClass("ui-icon-securityON")) {
					system.auth.switchaliedit.switchToInput();
					try {
						c(system.auth.param.loginForm).trigger("SWITCH_ALIEDITER_EVENT", !1)
					} catch (a) {}
				} else {
					system.auth.switchaliedit.switchToMask();
					try {
						c(system.auth.param.loginForm).trigger("SWITCH_ALIEDITER_EVENT", !0)
					} catch (a) {}
				}
				try {
					system.auth.adjustheight.inited && system.auth.adjustheight()
				} catch (d) {}
			})
		}, alipay.security.sysCallback = function () {
			return system.auth.log("warn", "被安全调了，小锁能点"), c(l).off("click"), system.auth.switchaliedit.lockControlOn(), !0
		}, system.auth.switchaliedit.lockControlOn = function () {
			g.set("disabled", !1), c(l).off("click"), c(l).on("click", function (a) {
				a.preventDefault();
				var b = a.target;
				if (c(b).hasClass("ui-icon-securityON")) {
					system.auth.switchaliedit.switchToStandard();
					try {
						c(system.auth.param.loginForm).trigger("SWITCH_ALIEDITER_EVENT", !1)
					} catch (a) {}
				} else {
					system.auth.switchaliedit.switchToSafe();
					try {
						c(system.auth.param.loginForm).trigger("SWITCH_ALIEDITER_EVENT", !0)
					} catch (a) {}
				}
				try {
					system.auth.adjustheight.inited && system.auth.adjustheight()
				} catch (d) {}
			})
		}, system.auth.switchaliedit.lockControlOff = function () {
			g.set("disabled", !0), c(l).off("click"), c(l).on("click", function (a) {
				a.preventDefault();
				try {
					var b = navigator.userAgent.toLowerCase().match(/version\/([\d.]+).*safari/),
						c = !! b && "7.1" === b[1];
					system.auth.alieditAttrs && system.auth.alieditAttrs.alieditPwd && !c && system.auth.alieditAttrs.alieditPwd.focus()
				} catch (a) {}
			})
		}, system.auth.switchaliedit.switchToSafe = function () {
			c(n).val("false"), f(j), e(i, "inline-block"), c(l).removeClass("ui-icon-securityOFF").addClass("ui-icon-securityON"), c(p).length > 0 && (document.getElementsByName("logonIdReadOnly")[0] && "true" === document.getElementsByName("logonIdReadOnly")[0].value ? (c(p).removeClass("fn-hide"), c(o).attr("data", "validate")) : (c(o).val(""), c(o).attr("data", ""), c(p).addClass("fn-hide"))), g.set("content", "点此选择非密码控件登录");
			try {
				var a = navigator.userAgent.toLowerCase().match(/version\/([\d.]+).*safari/),
					b = !! a && "7.1" === a[1];
				system.auth.alieditAttrs && system.auth.alieditAttrs.alieditPwd && !b && system.auth.alieditAttrs.alieditPwd.focus()
			} catch (d) {}
		}, system.auth.switchaliedit.switchToStandard = function () {
			c(n).val("true"), c(k).val(""), f(i), r ? e(j, "block") : e(j, "inline-block"), c(l).removeClass("ui-icon-securityON").addClass("ui-icon-securityOFF"), c(p).length > 0 && (c(p).removeClass("fn-hide"), c(o).attr("data", "validate")), g.set("content", "点此选择密码控件登录");
			try {
				k.focus()
			} catch (a) {}
		}
	}(system.auth.param)
}), define("arale/tip/1.1.3/tip", ["arale/popup/1.1.1/popup", "$", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function (a, b, c) {
	var d = a("arale/popup/1.1.1/popup"),
		e = d.extend({
			attrs: {
				content: null,
				direction: "up",
				distance: 8,
				arrowShift: 22,
				pointPos: "50%"
			},
			_setAlign: function () {
				var a = {},
					b = this.get("arrowShift"),
					c = this.get("distance"),
					d = this.get("pointPos"),
					e = this.get("direction");
				0 > b && (b = "100%" + b), "up" === e ? (a.baseXY = [d, 0], a.selfXY = [b, "100%+" + c]) : "down" === e ? (a.baseXY = [d, "100%+" + c], a.selfXY = [b, 0]) : "left" === e ? (a.baseXY = [0, d], a.selfXY = ["100%+" + c, b]) : "right" === e && (a.baseXY = ["100%+" + c, d], a.selfXY = [0, b]), this.set("align", a)
			},
			setup: function () {
				e.superclass.setup.call(this), this._setAlign()
			},
			_onRenderContent: function (a) {
				var b = this.$('[data-role="content"]');
				"string" != typeof a && (a = a.call(this)), b && b.html(a)
			}
		});
	c.exports = e, c.exports.outerBoxClass = "arale-tip-1_1_3"
}), define("arale/popup/1.1.1/popup", ["$", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function (a, b, c) {
	function d(a, b, c, d, e) {
		var f = d && d[0];
		e.delegateEvents(f ? d : b, f ? a + " " + b.selector : a, function (a) {
			c.call(a.currentTarget, a)
		})
	}
	var e = a("$"),
		f = a("arale/overlay/1.1.1/overlay"),
		g = f.extend({
			attrs: {
				trigger: {
					value: null,
					getter: function (a) {
						return e(a)
					}
				},
				triggerType: "hover",
				delegateNode: {
					value: null,
					getter: function (a) {
						return e(a)
					}
				},
				align: {
					value: {
						baseXY: [0, "100%"],
						selfXY: [0, 0]
					},
					setter: function (a) {
						return a ? (a.baseElement ? this._specifiedBaseElement = !0 : this.activeTrigger && (a.baseElement = this.activeTrigger), a) : void 0
					},
					getter: function (a) {
						return e.extend({}, a, this._specifiedBaseElement ? {} : {
							baseElement: this.activeTrigger
						})
					}
				},
				delay: 70,
				disabled: !1,
				effect: "",
				duration: 250
			},
			setup: function () {
				g.superclass.setup.call(this), this._bindTrigger(), this._blurHide(this.get("trigger")), this.activeTrigger = this.get("trigger").eq(0)
			},
			show: function () {
				return this.get("disabled") ? void 0 : g.superclass.show.call(this)
			},
			_bindTrigger: function () {
				var a = this.get("triggerType");
				"click" === a ? this._bindClick() : "focus" === a ? this._bindFocus() : this._bindHover()
			},
			_bindClick: function () {
				function a(a) {
					b.get("disabled") || b.get("trigger").each(function (c, d) {
						a == d ? (d._active = !0, b.activeTrigger = e(d)) : d._active = !1
					})
				}
				var b = this;
				d("click", this.get("trigger"), function (c) {
					"a" === this.tagName.toLowerCase() && c.preventDefault(), this._active === !0 ? b.hide() : (a(this), b.show())
				}, this.get("delegateNode"), this), this.before("hide", function () {
					a()
				})
			},
			_bindFocus: function () {
				var a = this;
				d("focus", this.get("trigger"), function () {
					a.activeTrigger = e(this), a.show()
				}, this.get("delegateNode"), this), d("blur", this.get("trigger"), function () {
					setTimeout(function () {
						!a._downOnElement && a.hide(), a._downOnElement = !1
					}, a.get("delay"))
				}, this.get("delegateNode"), this), this.delegateEvents("mousedown", function () {
					this._downOnElement = !0
				})
			},
			_bindHover: function () {
				function a() {
					clearTimeout(b), b = null, i.get("visible") && (c = setTimeout(function () {
						i.hide()
					}, h))
				}
				var b, c, f = this.get("trigger"),
					g = this.get("delegateNode"),
					h = this.get("delay"),
					i = this;
				return 0 > h ? (this._bindTooltip(), void 0) : (d("mouseenter", f, function () {
					clearTimeout(c), c = null, i.activeTrigger = e(this), b = setTimeout(function () {
						i.show()
					}, h)
				}, g, this), d("mouseleave", f, a, g, this), this.delegateEvents("mouseenter", function () {
					clearTimeout(c)
				}), this.delegateEvents("mouseleave", a), void 0)
			},
			_bindTooltip: function () {
				var a = this.get("trigger"),
					b = this.get("delegateNode"),
					c = this;
				d("mouseenter", a, function () {
					c.activeTrigger = e(this), c.show()
				}, b, this), d("mouseleave", a, function () {
					c.hide()
				}, b, this)
			},
			_onRenderVisible: function (a) {
				var b = -1 !== this.get("effect").indexOf("fade"),
					c = -1 !== this.get("effect").indexOf("slide"),
					d = {};
				c && (d.height = a ? "show" : "hide"), b && (d.opacity = a ? "show" : "hide"), b || c ? this.element.stop(!0, !0).animate(d, this.get("duration")).css({
					visibility: "visible"
				}) : this.element[a ? "show" : "hide"]()
			}
		});
	c.exports = g
}), define("arale/overlay/1.1.1/overlay", ["$", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function (a, b, c) {
	function d(a) {
		return g.contains(document.documentElement, a)
	}
	function e(a) {
		g(k.blurOverlays).each(function (b, c) {
			if (c && c.get("visible")) {
				for (var d = 0; d < c._relativeElements.length; d++) {
					var e = g(c._relativeElements[d])[0];
					if (e === a.target || g.contains(e, a.target)) return
				}
				c.hide()
			}
		})
	}
	function f(a, b) {
		for (var c = 0; c < b.length; c++) if (a === b[c]) return b.splice(c, 1), b
	}
	var g = a("$"),
		h = a("arale/position/1.0.1/position"),
		i = a("arale/iframe-shim/1.0.2/iframe-shim"),
		j = a("arale/widget/1.1.1/widget"),
		k = j.extend({
			attrs: {
				width: null,
				height: null,
				zIndex: 99,
				visible: !1,
				align: {
					selfXY: [0, 0],
					baseElement: h.VIEWPORT,
					baseXY: [0, 0]
				},
				parentNode: document.body
			},
			show: function () {
				return this.rendered || this.render(), this.set("visible", !0), this
			},
			hide: function () {
				return this.set("visible", !1), this
			},
			setup: function () {
				var a = this;
				this._setupShim(), this._setupResize(), this.after("show", function () {
					a._setPosition()
				})
			},
			destroy: function () {
				return f(this, k.allOverlays), f(this, k.blurOverlays), k.superclass.destroy.call(this)
			},
			_setPosition: function (a) {
				if (d(this.element[0]) && (a || (a = this.get("align")), a)) {
					var b = "none" === this.element.css("display");
					return b && this.element.css({
						visibility: "hidden",
						display: "block"
					}), h.pin({
						element: this.element,
						x: a.selfXY[0],
						y: a.selfXY[1]
					}, {
						element: a.baseElement,
						x: a.baseXY[0],
						y: a.baseXY[1]
					}), b && this.element.css({
						visibility: "",
						display: "none"
					}), this
				}
			},
			_setupShim: function () {
				var a = new i(this.element);
				this.after("hide _setPosition", a.sync, a);
				var b = ["width", "height"];
				for (var c in b) b.hasOwnProperty(c) && this.on("change:" + c, a.sync, a);
				this.before("destroy", a.destroy, a)
			},
			_setupResize: function () {
				k.allOverlays.push(this)
			},
			_blurHide: function (a) {
				a = g.makeArray(a), a.push(this.element), this._relativeElements = a, k.blurOverlays.push(this)
			},
			_onRenderWidth: function (a) {
				this.element.css("width", a)
			},
			_onRenderHeight: function (a) {
				this.element.css("height", a)
			},
			_onRenderZIndex: function (a) {
				this.element.css("zIndex", a)
			},
			_onRenderAlign: function (a) {
				this._setPosition(a)
			},
			_onRenderVisible: function (a) {
				this.element[a ? "show" : "hide"]()
			}
		});
	k.blurOverlays = [], g(document).on("click", function (a) {
		e(a)
	});
	var l;
	k.allOverlays = [], g(window).resize(function () {
		l && clearTimeout(l), l = setTimeout(function () {
			g(k.allOverlays).each(function (a, b) {
				b && b.get("visible") && b._setPosition()
			})
		}, 80)
	}), c.exports = k
}), define("arale/position/1.0.1/position", ["$"], function (a, b) {
	function c(a) {
		a = h(a) || {}, a.nodeType && (a = {
			element: a
		});
		var b = h(a.element) || k;
		if (1 !== b.nodeType) throw new Error("posObject.element is invalid.");
		var c = {
			element: b,
			x: a.x || 0,
			y: a.y || 0
		},
			d = b === k || "VIEWPORT" === b._id;
		return c.offset = function () {
			return m ? {
				left: 0,
				top: 0
			} : d ? {
				left: l(document).scrollLeft(),
				top: l(document).scrollTop()
			} : i(l(b)[0])
		}, c.size = function () {
			var a = d ? l(window) : l(b);
			return {
				width: a.outerWidth(),
				height: a.outerHeight()
			}
		}, c
	}
	function d(a) {
		a.x = e(a.x, a, "width"), a.y = e(a.y, a, "height")
	}
	function e(a, b, c) {
		if (a += "", a = a.replace(/px/gi, ""), /\D/.test(a) && (a = a.replace(/(?:top|left)/gi, "0%").replace(/center/gi, "50%").replace(/(?:bottom|right)/gi, "100%")), -1 !== a.indexOf("%") && (a = a.replace(/(\d+(?:\.\d+)?)%/gi, function (a, d) {
			return b.size()[c] * (d / 100)
		})), /[+\-*\/]/.test(a)) try {
			a = new Function("return " + a)()
		} catch (d) {
			throw new Error("Invalid position value: " + a)
		}
		return g(a)
	}
	function f(a) {
		var b = a.offsetParent();
		b[0] === document.documentElement && (b = l(document.body)), o && b.css("zoom", 1);
		var c;
		return c = b[0] === document.body && "static" === b.css("position") ? {
			top: 0,
			left: 0
		} : i(b[0]), c.top += g(b.css("border-top-width")), c.left += g(b.css("border-left-width")), c
	}
	function g(a) {
		return parseFloat(a, 10) || 0
	}
	function h(a) {
		return l(a)[0]
	}
	function i(a) {
		var b = a.getBoundingClientRect(),
			c = document.documentElement;
		return {
			left: b.left + (window.pageXOffset || c.scrollLeft) - (c.clientLeft || document.body.clientLeft || 0),
			top: b.top + (window.pageYOffset || c.scrollTop) - (c.clientTop || document.body.clientTop || 0)
		}
	}
	var j = b,
		k = {
			_id: "VIEWPORT",
			nodeType: 1
		},
		l = a("$"),
		m = !1,
		n = (window.navigator.userAgent || "").toLowerCase(),
		o = -1 !== n.indexOf("msie 6");
	j.pin = function (a, b) {
		a = c(a), b = c(b);
		var e = l(a.element);
		"fixed" !== e.css("position") || o ? (e.css("position", "absolute"), m = !1) : m = !0, d(a), d(b);
		var g = f(e),
			h = b.offset(),
			i = h.top + b.y - a.y - g.top,
			j = h.left + b.x - a.x - g.left;
		e.css({
			left: j,
			top: i
		})
	}, j.center = function (a, b) {
		j.pin({
			element: a,
			x: "50%",
			y: "50%"
		}, {
			element: b,
			x: "50%",
			y: "50%"
		})
	}, j.VIEWPORT = k
}), define("arale/iframe-shim/1.0.2/iframe-shim", ["$", "arale/position/1.0.1/position"], function (a, b, c) {
	function d(a) {
		this.target = g(a).eq(0)
	}
	function e() {}
	function f(a) {
		var b = {
			display: "none",
			border: "none",
			opacity: 0,
			position: "absolute"
		},
			c = a.css("zIndex");
		return c && c > 0 && (b.zIndex = c - 1), g("<iframe>", {
			src: "javascript:''",
			frameborder: 0,
			css: b
		}).insertBefore(a)
	}
	var g = a("$"),
		h = a("arale/position/1.0.1/position"),
		i = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6");
	d.prototype.sync = function () {
		var a = this.target,
			b = this.iframe;
		if (!a.length) return this;
		var c = a.outerHeight(),
			d = a.outerWidth();
		return c && d && !a.is(":hidden") ? (b || (b = this.iframe = f(a)), b.css({
			height: c,
			width: d
		}), h.pin(b[0], a[0]), b.show()) : b && b.hide(), this
	}, d.prototype.destroy = function () {
		this.iframe && (this.iframe.remove(), delete this.iframe), delete this.target
	}, i ? c.exports = d : (e.prototype.sync = function () {
		return this
	}, e.prototype.destroy = e, c.exports = e)
}), define("arale/widget/1.1.1/widget", ["arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "$", "./daparser", "./auto-render"], function (a, b, c) {
	function d() {
		return "widget-" + w++
	}
	function e(a) {
		return "[object String]" === v.call(a)
	}
	function f(a) {
		return "[object Function]" === v.call(a)
	}
	function g(a) {
		return x(document.documentElement, a)
	}
	function h(a) {
		return a.charAt(0).toUpperCase() + a.substring(1)
	}
	function i(a) {
		return f(a.events) && (a.events = a.events()), a.events
	}
	function j(a, b) {
		var c = a.match(y),
			d = c[1] + q + b.cid,
			e = c[2] || void 0;
		return e && e.indexOf("{{") > -1 && (e = k(e, b)), {
			type: d,
			selector: e
		}
	}
	function k(a, b) {
		return a.replace(z, function (a, c) {
			for (var d, f = c.split("."), g = b; d = f.shift();) g = g === b.attrs ? b.get(d) : g[d];
			return e(g) ? g : A
		})
	}
	function l(a) {
		return null == a || void 0 === a
	}
	var m = a("arale/base/1.1.1/base"),
		n = a("$"),
		o = a("./daparser"),
		p = a("./auto-render"),
		q = ".delegate-events-",
		r = "_onRender",
		s = "data-widget-cid",
		t = {},
		u = m.extend({
			propsInAttrs: ["initElement", "element", "events"],
			element: null,
			events: null,
			attrs: {
				id: null,
				className: null,
				style: null,
				template: "<div></div>",
				model: null,
				parentNode: document.body
			},
			initialize: function (a) {
				this.cid = d();
				var b = this._parseDataAttrsConfig(a);
				u.superclass.initialize.call(this, a ? n.extend(b, a) : b), this.parseElement(), this.initProps(), this.delegateEvents(), this.setup(), this._stamp(), this._isTemplate = !(a && a.element)
			},
			_parseDataAttrsConfig: function (a) {
				var b, c;
				return a && (b = a.initElement ? n(a.initElement) : n(a.element)), b && b[0] && !p.isDataApiOff(b) && (c = o.parseElement(b)), c
			},
			parseElement: function () {
				var a = this.element;
				if (a ? this.element = n(a) : this.get("template") && this.parseElementFromTemplate(), !this.element || !this.element[0]) throw new Error("element is invalid")
			},
			parseElementFromTemplate: function () {
				this.element = n(this.get("template"))
			},
			initProps: function () {},
			delegateEvents: function (a, b, c) {
				if (0 === arguments.length ? (b = i(this), a = this.element) : 1 === arguments.length ? (b = a, a = this.element) : 2 === arguments.length ? (c = b, b = a, a = this.element) : (a || (a = this.element), this._delegateElements || (this._delegateElements = []), this._delegateElements.push(n(a))), e(b) && f(c)) {
					var d = {};
					d[b] = c, b = d
				}
				for (var g in b) if (b.hasOwnProperty(g)) {
					var h = j(g, this),
						k = h.type,
						l = h.selector;
					!
					function (b, c) {
						var d = function (a) {
								f(b) ? b.call(c, a) : c[b](a)
							};
						l ? n(a).on(k, l, d) : n(a).on(k, d)
					}(b[g], this)
				}
				return this
			},
			undelegateEvents: function (a, b) {
				if (b || (b = a, a = null), 0 === arguments.length) {
					var c = q + this.cid;
					if (this.element && this.element.off(c), this._delegateElements) for (var d in this._delegateElements) this._delegateElements.hasOwnProperty(d) && this._delegateElements[d].off(c)
				} else {
					var e = j(b, this);
					a ? n(a).off(e.type, e.selector) : this.element && this.element.off(e.type, e.selector)
				}
				return this
			},
			setup: function () {},
			render: function () {
				this.rendered || (this._renderAndBindAttrs(), this.rendered = !0);
				var a = this.get("parentNode");
				if (a && !g(this.element[0])) {
					var b = this.constructor.outerBoxClass;
					if (b) {
						var c = this._outerBox = n("<div></div>").addClass(b);
						c.append(this.element).appendTo(a)
					} else this.element.appendTo(a)
				}
				return this
			},
			_renderAndBindAttrs: function () {
				var a = this,
					b = a.attrs;
				for (var c in b) if (b.hasOwnProperty(c)) {
					var d = r + h(c);
					if (this[d]) {
						var e = this.get(c);
						l(e) || this[d](e, void 0, c), function (b) {
							a.on("change:" + c, function (c, d, e) {
								a[b](c, d, e)
							})
						}(d)
					}
				}
			},
			_onRenderId: function (a) {
				this.element.attr("id", a)
			},
			_onRenderClassName: function (a) {
				this.element.addClass(a)
			},
			_onRenderStyle: function (a) {
				this.element.css(a)
			},
			_stamp: function () {
				var a = this.cid;
				(this.initElement || this.element).attr(s, a), t[a] = this
			},
			$: function (a) {
				return this.element.find(a)
			},
			destroy: function () {
				this.undelegateEvents(), delete t[this.cid], this.element && this._isTemplate && (this.element.off(), this._outerBox ? this._outerBox.remove() : this.element.remove()), this.element = null, u.superclass.destroy.call(this)
			}
		});
	n(window).unload(function () {
		for (var a in t) t[a].destroy()
	}), u.query = function (a) {
		var b, c = n(a).eq(0);
		return c && (b = c.attr(s)), t[b]
	}, u.autoRender = p.autoRender, u.autoRenderAll = p.autoRenderAll, u.StaticsWhiteList = ["autoRender"], c.exports = u;
	var v = Object.prototype.toString,
		w = 0,
		x = n.contains ||
	function (a, b) {
		return !!(16 & a.compareDocumentPosition(b))
	}, y = /^(\S+)\s*(.*)$/, z = /{{([^}]+)}}/g, A = "INVALID_SELECTOR"
}), define("arale/widget/1.1.1/daparser", ["$"], function (a, b) {
	function c(a) {
		return a.toLowerCase().replace(g, function (a, b) {
			return (b + "").toUpperCase()
		})
	}
	function d(a) {
		for (var b in a) if (a.hasOwnProperty(b)) {
			var c = a[b];
			if ("string" != typeof c) continue;
			h.test(c) ? (c = c.replace(/'/g, '"'), a[b] = d(i(c))) : a[b] = e(c)
		}
		return a
	}
	function e(a) {
		if ("false" === a.toLowerCase()) a = !1;
		else if ("true" === a.toLowerCase()) a = !0;
		else if (/\d/.test(a) && /[^a-z]/i.test(a)) {
			var b = parseFloat(a);
			b + "" === a && (a = b)
		}
		return a
	}
	var f = a("$");
	b.parseElement = function (a, b) {
		a = f(a)[0];
		var e = {};
		if (a.dataset) e = f.extend({}, a.dataset);
		else for (var g = a.attributes, h = 0, i = g.length; i > h; h++) {
			var j = g[h],
				k = j.name;
			0 === k.indexOf("data-") && (k = c(k.substring(5)), e[k] = j.value)
		}
		return b === !0 ? e : d(e)
	};
	var g = /-([a-z])/g,
		h = /^\s*[\[{].*[\]}]\s*$/,
		i = this.JSON ? JSON.parse : f.parseJSON
}), define("arale/widget/1.1.1/auto-render", ["$"], function (a, b) {
	var c = a("$"),
		d = "data-widget-auto-rendered";
	b.autoRender = function (a) {
		return new this(a).render()
	}, b.autoRenderAll = function (a, e) {
		"function" == typeof a && (e = a, a = null), a = c(a || document.body);
		var f = [],
			g = [];
		a.find("[data-widget]").each(function (a, c) {
			b.isDataApiOff(c) || (f.push(c.getAttribute("data-widget").toLowerCase()), g.push(c))
		}), f.length && seajs.use(f, function () {
			for (var a = 0; a < arguments.length; a++) {
				var b = arguments[a],
					f = c(g[a]);
				if (!f.attr(d)) {
					var h = {
						initElement: f,
						renderType: "auto"
					},
						i = f.attr("data-widget-role");
					h[i ? i : "element"] = f, b.autoRender && b.autoRender(h), f.attr(d, "true")
				}
			}
			e && e()
		})
	};
	var e = "off" === c(document.body).attr("data-api");
	b.isDataApiOff = function (a) {
		var b = c(a).attr("data-api");
		return "off" === b || "on" !== b && e
	}
}), define("authcenter/login/1.2.4/js/module/btnStyle", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.btnStyle = function (a) {
		for (var c in a) this[c] = a[c];
		return b("#login").length < 1 || b("#J-login-btn").length < 1 || !this.isNeedSub ? !1 : (this.bindEvent(), void 0)
	}, system.auth.btnStyle.prototype = {
		isNeedSub: !1,
		defaultId: "#J-login-btn",
		defaultText: "登 录",
		disabledClass: "ui-button-disabled",
		disabledText: "正在进入...",
		bindEvent: function () {
			var a = this;
			return a.isNeedSub ? (b(system.auth.param.loginForm).on("CLICK_SUBMIT_BUTTON_EVENT", function (c, d) {
				d ? (b(a.defaultId).addClass(a.disabledClass), b(a.defaultId).val(a.disabledText), b(a.defaultId).attr("disabled", "disabled")) : (b(a.defaultId).removeClass(a.disabledClass), b(a.defaultId).val(a.defaultText), b(a.defaultId).removeAttr("disabled"))
			}), void 0) : !1
		}
	}
}), define("authcenter/login/1.2.4/js/module/validator", ["$", "arale/validator/0.9.5/validator", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/placeholder/1.1.0/placeholder"], function (a) {
	"use strict";
	!
	function (b) {
		var c = a("$"),
			d = a("arale/validator/0.9.5/validator"),
			e = b.standarPwd ? b.standarPwd[0] : null,
			f = b.alieditUsing,
			g = b.J_isNoActiveX,
			h = b.loginForm[0],
			i = b.password,
			j = c("#J-login-title"),
			k = c("#J-errorBox"),
			l = c("#J-label-editer").attr("data-desc"),
			m = [],
			n = !1;
		d.addRule("emailOrMobile", function (a) {
			var b = c(a.element),
				d = b.val();
			return system.auth.rule.emailOrMobile(d)
		}), d.addRule("lenth4", function (a) {
			var b = c(a.element),
				d = b.val();
			return 4 === d.length
		}), d.setMessage({
			required: "请输入{{display}}",
			emailOrMobile: "支付宝账户是邮箱地址或手机号码。",
			lenth4: "验证码是4位字符"
		}), system.auth.validator = function (o) {
			function p(a, b) {
				n ? alert(a) : (j.addClass("fn-hide"), k.find(".sl-error-text").html(a), k.addClass("sl-error-display"), k.attr("errorType", b))
			}
			function q() {
				j.removeClass("fn-hide"), k.removeClass("sl-error-display"), k.find(".sl-error-text").html(""), k.attr("errorType", "")
			}
			var r = o ? o : {},
				s = a("arale/placeholder/1.1.0/placeholder");
			n = r.isAlertType === !0 ? !0 : !1;
			var t;
			t = system.auth.instance.validator = new d({
				element: "#login",
				explainClass: "ui-form-explain",
				autoFocus: !1,
				triggerType: [],
				onFormValidate: function () {
					var a = system.auth.alieditAttrs;
					if (m = [], b.account && b.account.val(c.trim(b.account.val())), "true" == f.value && "false" === c(g).val() && "undefined" != typeof a.getPassword) {
						i.parent(), i[0].value = a.getPassword(), q();
						try {
							h._seaside_gogo_.value || (h._seaside_gogo_.value = a.getCi1()), a.getCi2() && (h._seaside_gogo_p.value = a.getCi2())
						} catch (d) {}
					} else e && i.val(e.value)
				},
				onItemValidated: function (a, b, c) {
					var d = system.auth.alieditAttrs;
					if (a && (m.push({
						dom: c,
						errorMsg: b
					}), "password" === c[0].name)) try {
						var g = [];
						g.push("alieditUsing.value=" + ("true" == f.value)), g.push("&alieditPwd=" + (null !== d.alieditPwd)), g.push("&getPassword=" + ("" !== d.getPassword())), g.push("&standarPwd.value=" + ("" !== e.value)), system.auth.log("track", g.join(""))
					} catch (h) {}
				},
				onFormValidated: function (a) {
					var b = system.auth.alieditAttrs;
					if (!a) {
						c("input[name=logonId]").length > 0 && s.clear("input[name=logonId]"), c("input[name=checkCode]").length > 0 && s.clear("input[name=checkCode]"), c("input[name=operatorNick]").length > 0 && s.clear("input[name=operatorNick]");
						try {
							c(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !0)
						} catch (d) {}
					}
					if (a && m.length > 0) {
						n ? alert(m[0].errorMsg) : p(m[0].errorMsg, "2");
						try {
							c(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
						} catch (d) {}
						try {
							system.auth.adjustheight.inited && system.auth.adjustheight()
						} catch (d) {}
						var h = m[0].dom;
						if (!h) return !1;
						if ("password" === h[0].name)"true" == f.value && "false" === c(g).val() && "undefined" != typeof b.getPassword() ? b.alieditPwd && b.alieditPwd.focus() : e && e.focus();
						else {
							try {
								s.clear(c(h))
							} catch (d) {}
							setTimeout(function () {
								h[0].focus()
							}, 200)
						}
					}
				}
			}), c("input[name=logonId]").length > 0 && t.addItem({
				element: "[name=logonId]",
				required: !0,
				rule: "emailOrMobile maxlength{max:100}",
				display: "账户名",
				skipHidden: !0
			}), c("input[name=password]").length > 0 && t.addItem({
				element: "[name=password]",
				required: !0,
				display: l ? l : "登录密码",
				skipHidden: !1
			}), c("input[name=password_input]").length > 0 && t.addItem({
				element: "[name=password_input]",
				required: !0,
				display: "登录密码",
				skipHidden: !0
			}), c("input[name=checkCode]").length > 0 && t.addItem({
				element: "[name=checkCode]",
				display: "验证码",
				required: !0,
				rule: "lenth4",
				skipHidden: !0
			}), c("input[name=operatorNick]").length > 0 && t.addItem({
				element: "[name=operatorNick]",
				display: "操作员登录名",
				required: !0,
				skipHidden: !0
			}), t.before("execute", function () {
				var a = system.auth.alieditAttrs;
				return alipay.security.useMultiplePolicy ? a.isMasked() ? (a.showInstallDialog(), !1) : !0 : "true" !== f.value || "false" !== c(g).val() || alipay.security.rsainput.installed || a.installedAliedit && !alipay.security.updateEdit ? !0 : (a.detectAliedit(), !1)
			})
		}
	}(system.auth.param)
}), define("arale/validator/0.9.5/validator", ["./core", "$", "./async", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "./utils", "./rule", "./item"], function (a, b, c) {
	var d = a("./core"),
		e = a("$"),
		f = d.extend({
			events: {
				"mouseenter .{{attrs.inputClass}}": "mouseenter",
				"mouseleave .{{attrs.inputClass}}": "mouseleave",
				"mouseenter .{{attrs.textareaClass}}": "mouseenter",
				"mouseleave .{{attrs.textareaClass}}": "mouseleave",
				"focus .{{attrs.itemClass}} input,textarea,select": "focus",
				"blur .{{attrs.itemClass}} input,textarea,select": "blur"
			},
			attrs: {
				explainClass: "ui-form-explain",
				itemClass: "ui-form-item",
				itemHoverClass: "ui-form-item-hover",
				itemFocusClass: "ui-form-item-focus",
				itemErrorClass: "ui-form-item-error",
				inputClass: "ui-input",
				textareaClass: "ui-textarea",
				showMessage: function (a, b) {
					this.getExplain(b).html(a), this.getItem(b).addClass(this.get("itemErrorClass"))
				},
				hideMessage: function (a, b) {
					this.getExplain(b).html(b.attr("data-explain") || " "), this.getItem(b).removeClass(this.get("itemErrorClass"))
				}
			},
			setup: function () {
				f.superclass.setup.call(this);
				var a = this;
				this.on("autoFocus", function (b) {
					a.set("autoFocusEle", b)
				})
			},
			addItem: function (a) {
				f.superclass.addItem.apply(this, [].slice.call(arguments));
				var b = this.query(a.element);
				return b && this._saveExplainMessage(b), this
			},
			_saveExplainMessage: function (a) {
				var b = a.element,
					c = b.attr("data-explain");
				void 0 === c && b.attr("data-explain", this.getExplain(b).html())
			},
			getExplain: function (a) {
				var b = this.getItem(a),
					c = b.find("." + this.get("explainClass"));
				if (0 == c.length) var c = e('<div class="' + this.get("explainClass") + '"></div>').appendTo(b);
				return c
			},
			getItem: function (a) {
				a = e(a);
				var b = a.parents("." + this.get("itemClass"));
				return b
			},
			mouseenter: function (a) {
				this.getItem(a.target).addClass(this.get("itemHoverClass"))
			},
			mouseleave: function (a) {
				this.getItem(a.target).removeClass(this.get("itemHoverClass"))
			},
			focus: function (a) {
				var b = a.target,
					c = this.get("autoFocusEle");
				if (c && c.get(0) == b) {
					var d = this;
					return e(b).keyup(function () {
						d.set("autoFocusEle", null), d.focus({
							target: b
						})
					}), void 0
				}
				this.getItem(b).removeClass(this.get("itemErrorClass")), this.getItem(b).addClass(this.get("itemFocusClass")), this.getExplain(b).html(e(b).attr("data-explain"))
			},
			blur: function (a) {
				this.getItem(a.target).removeClass(this.get("itemFocusClass"))
			}
		});
	c.exports = f
}), define("arale/validator/0.9.5/core", ["$", "arale/validator/0.9.5/async", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/validator/0.9.5/utils", "arale/validator/0.9.5/rule", "arale/validator/0.9.5/item"], function (a, b, c) {
	function d(a, b) {
		for (var c = 0; c < b.length; c++) if (a === b[c]) return b.splice(c, 1), b
	}
	function e(a, b) {
		var c;
		return f.each(b, function (b, d) {
			return a.get(0) === d.element.get(0) ? (c = d, !1) : void 0
		}), c
	}
	var f = a("$"),
		g = a("arale/validator/0.9.5/async"),
		h = a("arale/widget/1.1.1/widget"),
		i = a("arale/validator/0.9.5/utils"),
		j = a("arale/validator/0.9.5/item"),
		k = [],
		l = {
			value: f.noop,
			setter: function (a) {
				return f.isFunction(a) ? a : i.helper(a)
			}
		},
		m = h.extend({
			attrs: {
				triggerType: "blur",
				checkOnSubmit: !0,
				stopOnError: !1,
				autoSubmit: !0,
				checkNull: !0,
				onItemValidate: l,
				onItemValidated: l,
				onFormValidate: l,
				onFormValidated: l,
				displayHelper: function (a) {
					var b, c, d = a.element.attr("id");
					return d && (b = f("label[for=" + d + "]").text(), b && (b = b.replace(/^[\*\s\:\：]*/, "").replace(/[\*\s\:\：]*$/, ""))), c = a.element.attr("name"), b || c
				},
				showMessage: l,
				hideMessage: l,
				autoFocus: !0,
				failSilently: !1,
				skipHidden: !1
			},
			setup: function () {
				var a = this;
				if (a.items = [], a.element.is("form")) {
					a._novalidate_old = a.element.attr("novalidate");
					try {
						a.element.attr("novalidate", "novalidate")
					} catch (b) {}
					a.get("checkOnSubmit") && a.element.on("submit.validator", function (b) {
						b.preventDefault(), a.execute(function (b) {
							!b && a.get("autoSubmit") && a.element.get(0).submit()
						})
					})
				}
				a.on("itemValidated", function (a, b, c, d) {
					this.query(c).get(a ? "showMessage" : "hideMessage").call(this, b, c, d)
				}), k.push(a)
			},
			Statics: f.extend({
				helper: i.helper
			}, a("arale/validator/0.9.5/rule"), {
				autoRender: function (a) {
					var b = new this(a);
					f("input, textarea, select", b.element).each(function (a, c) {
						c = f(c);
						var d = c.attr("type");
						if ("button" == d || "submit" == d || "reset" == d) return !0;
						var e = {};
						if (e.element = "radio" == d || "checkbox" == d ? f("[type=" + d + "][name=" + c.attr("name") + "]", b.element) : c, !b.query(e.element)) {
							var g = i.parseDom(c);
							if (!g.rule) return !0;
							f.extend(e, g), b.addItem(e)
						}
					})
				},
				query: function (a) {
					return h.query(a)
				},
				validate: function (a) {
					var b = f(a.element),
						c = new m({
							element: b.parents()
						});
					c.addItem(a), c.query(b).execute(), c.destroy()
				}
			}),
			addItem: function (a) {
				var b = this;
				if (f.isArray(a)) return f.each(a, function (a, c) {
					b.addItem(c)
				}), this;
				if (a = f.extend({
					triggerType: b.get("triggerType"),
					checkNull: b.get("checkNull"),
					displayHelper: b.get("displayHelper"),
					showMessage: b.get("showMessage"),
					hideMessage: b.get("hideMessage"),
					failSilently: b.get("failSilently"),
					skipHidden: b.get("skipHidden")
				}, a), !f(a.element).length) {
					if (a.failSilently) return b;
					throw new Error("element does not exist")
				}
				var c = new j(a);
				return b.items.push(c), c.delegateEvents(c.get("triggerType"), function (a) {
					(this.get("checkNull") || this.element.val()) && this.execute(null, {
						event: a
					})
				}), c.on("all", function () {
					this.trigger.apply(this, [].slice.call(arguments))
				}, b), b
			},
			removeItem: function (a) {
				var b = this,
					c = a instanceof j ? a : e(f(a), b.items);
				return c && (d(c, b.items), c.get("hideMessage").call(b, null, c.element), c.destroy()), b
			},
			execute: function (a) {
				var b = this,
					c = [],
					d = !1,
					e = null;
				return f.each(b.items, function (a, c) {
					c.get("hideMessage").call(b, null, c.element)
				}), b.trigger("formValidate", b.element), g[b.get("stopOnError") ? "forEachSeries" : "forEach"](b.items, function (a, f) {
					a.execute(function (a, g, h) {
						a && !d && (d = !0, e = h), c.push([].slice.call(arguments, 0)), f(b.get("stopOnError") ? a : null)
					})
				}, function () {
					b.get("autoFocus") && d && (b.trigger("autoFocus", e), e.focus()), b.trigger("formValidated", d, c, b.element), a && a(d, c, b.element)
				}), b
			},
			destroy: function () {
				var a = this,
					b = a.items.length;
				if (a.element.is("form")) {
					try {
						void 0 == a._novalidate_old ? a.element.removeAttr("novalidate") : a.element.attr("novalidate", a._novalidate_old)
					} catch (c) {}
					a.element.off("submit.validator")
				}
				for (var e = b - 1; e >= 0; e--) a.removeItem(a.items[e]);
				d(a, k), m.superclass.destroy.call(this)
			},
			query: function (a) {
				return e(f(a), this.items)
			}
		});
	c.exports = m
}), define("arale/validator/0.9.5/async", [], function (a, b, c) {
	var d = {};
	c.exports = d;
	var e = function (a, b) {
			if (a.forEach) return a.forEach(b);
			for (var c = 0; c < a.length; c += 1) b(a[c], c, a)
		},
		f = function (a, b) {
			if (a.map) return a.map(b);
			var c = [];
			return e(a, function (a, d, e) {
				c.push(b(a, d, e))
			}), c
		},
		g = function (a) {
			if (Object.keys) return Object.keys(a);
			var b = [];
			for (var c in a) a.hasOwnProperty(c) && b.push(c);
			return b
		};
	d.nextTick = "undefined" != typeof process && process.nextTick ? process.nextTick : function (a) {
		setTimeout(a, 0)
	}, d.forEach = function (a, b, c) {
		if (c = c ||
		function () {}, !a.length) return c();
		var d = 0;
		e(a, function (e) {
			b(e, function (b) {
				b ? (c(b), c = function () {}) : (d += 1, d === a.length && c(null))
			})
		})
	}, d.forEachSeries = function (a, b, c) {
		if (c = c ||
		function () {}, !a.length) return c();
		var d = 0,
			e = function () {
				b(a[d], function (b) {
					b ? (c(b), c = function () {}) : (d += 1, d === a.length ? c(null) : e())
				})
			};
		e()
	};
	var h = function (a) {
			return function () {
				var b = Array.prototype.slice.call(arguments);
				return a.apply(null, [d.forEach].concat(b))
			}
		},
		i = function (a) {
			return function () {
				var b = Array.prototype.slice.call(arguments);
				return a.apply(null, [d.forEachSeries].concat(b))
			}
		},
		j = function (a, b, c, d) {
			var e = [];
			b = f(b, function (a, b) {
				return {
					index: b,
					value: a
				}
			}), a(b, function (a, b) {
				c(a.value, function (c, d) {
					e[a.index] = d, b(c)
				})
			}, function (a) {
				d(a, e)
			})
		};
	d.map = h(j), d.mapSeries = i(j), d.series = function (a, b) {
		if (b = b ||
		function () {}, a.constructor === Array) d.mapSeries(a, function (a, b) {
			a && a(function (a) {
				var c = Array.prototype.slice.call(arguments, 1);
				c.length <= 1 && (c = c[0]), b.call(null, a, c)
			})
		}, b);
		else {
			var c = {};
			d.forEachSeries(g(a), function (b, d) {
				a[b](function (a) {
					var e = Array.prototype.slice.call(arguments, 1);
					e.length <= 1 && (e = e[0]), c[b] = e, d(a)
				})
			}, function (a) {
				b(a, c)
			})
		}
	}
}), define("arale/validator/0.9.5/utils", ["$", "arale/validator/0.9.5/rule"], function (require, exports, module) {
	function unique() {
		return "__anonymous__" + u_count++
	}
	function parseRules(a) {
		return a ? a.match(/[a-zA-Z0-9\-\_]+(\{[^\{\}]*\})?/g) : null
	}
	function parseDom(a) {
		var a = $(a),
			b = {},
			c = [],
			d = a.attr("required");
		d && (c.push("required"), b.required = !0);
		var e = a.attr("type");
		if (e && "submit" != e && "cancel" != e && "checkbox" != e && "radio" != e && "select" != e && "select-one" != e && "file" != e && "hidden" != e && "textarea" != e) {
			if (!Rule.getRule(e)) throw new Error('Form field with type "' + e + '" not supported!');
			c.push(e)
		}
		var f = a.attr("min");
		f && c.push('min{"min":"' + f + '"}');
		var g = a.attr("max");
		g && c.push("max{max:" + g + "}");
		var h = a.attr("minlength");
		h && c.push("minlength{min:" + h + "}");
		var i = a.attr("maxlength");
		i && c.push("maxlength{max:" + i + "}");
		var j = a.attr("pattern");
		if (j) {
			var k = new RegExp(j),
				l = unique();
			Rule.addRule(l, k), c.push(l)
		}
		var m = a.attr("data-rule");
		return m = m && parseRules(m), m && (c = c.concat(m)), b.rule = 0 == c.length ? null : c.join(" "), b
	}
	function parseJSON(str) {
		function getValue(str) {
			return '"' == str.charAt(0) && '"' == str.charAt(str.length - 1) || "'" == str.charAt(0) && "'" == str.charAt(str.length - 1) ? eval(str) : str
		}
		if (!str) return null;
		var NOTICE = 'Invalid option object "' + str + '".';
		str = str.slice(1, -1);
		var result = {},
			arr = str.split(",");
		return $.each(arr, function (a, b) {
			if (arr[a] = $.trim(b), !arr[a]) throw new Error(NOTICE);
			var c = arr[a].split(":"),
				d = $.trim(c[0]),
				e = $.trim(c[1]);
			if (!d || !e) throw new Error(NOTICE);
			result[getValue(d)] = $.trim(getValue(e))
		}), result
	}
	function isHidden(a) {
		var b = a[0].offsetWidth,
			c = a[0].offsetHeight,
			d = "TR" === a.prop("tagName");
		return 0 !== b || 0 !== c || d ? 0 === b || 0 === c || d ? "none" === a.css("display") : !1 : !0
	}
	var $ = require("$"),
		Rule = require("arale/validator/0.9.5/rule"),
		u_count = 0,
		helpers = {};
	module.exports = {
		parseRule: function (a) {
			var b = a.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);
			return {
				name: b[1],
				param: parseJSON(b[2])
			}
		},
		parseRules: parseRules,
		parseDom: parseDom,
		isHidden: isHidden,
		helper: function (a, b) {
			return b ? (helpers[a] = b, this) : helpers[a]
		}
	}
}), define("arale/validator/0.9.5/rule", ["$"], function (a, b, c) {
	function d(a, b) {
		var c = this;
		if (c.name = a, b instanceof RegExp) c.operator = function (a, c) {
			var d = b.test(j(a.element).val());
			c(d ? null : a.rule, f(a, d))
		};
		else {
			if (!j.isFunction(b)) throw new Error("The second argument must be a regexp or a function.");
			c.operator = function (a, c) {
				var d = b.call(this, a, function (b, d) {
					c(b ? null : a.rule, d || f(a, b))
				});
				void 0 !== d && c(d ? null : a.rule, f(a, d))
			}
		}
	}
	function e(a, b, c) {
		return j.isPlainObject(a) ? (j.each(a, function (a, b) {
			j.isArray(b) ? e(a, b[0], b[1]) : e(a, b)
		}), this) : (k[a] = b instanceof d ? new d(a, b.operator) : new d(a, b), g(a, c), this)
	}
	function f(a, b) {
		var c, d = a.rule;
		return a.message ? j.isPlainObject(a.message) ? (c = a.message[b ? "success" : "failure"], "undefined" == typeof c && (c = l[d][b ? "success" : "failure"])) : c = b ? "" : a.message : c = l[d][b ? "success" : "failure"], c ? i(a, c) : c
	}
	function g(a, b) {
		return j.isPlainObject(a) ? (j.each(a, function (a, b) {
			g(a, b)
		}), this) : (l[a] = j.isPlainObject(b) ? b : {
			failure: b
		}, this)
	}
	function h(a, b) {
		if (b) {
			var c = k[a];
			return new d(null, function (a, d) {
				c.operator(j.extend(null, a, b), d)
			})
		}
		return k[a]
	}
	function i(a, b) {
		var c = b,
			d = /\{\{[^\{\}]*\}\}/g,
			e = /\{\{(.*)\}\}/,
			f = b.match(d);
		return f && j.each(f, function (b, d) {
			var f = d.match(e)[1],
				g = a[j.trim(f)];
			c = c.replace(d, g)
		}), c
	}
	var j = a("$"),
		k = {},
		l = {};
	d.prototype.and = function (a, b) {
		var c = a instanceof d ? a : h(a, b);
		if (!c) throw new Error('No rule with name "' + a + '" found.');
		var e = this,
			g = function (a, b) {
				e.operator(a, function (d) {
					d ? b(d, f(a, !d)) : c.operator(a, b)
				})
			};
		return new d(null, g)
	}, d.prototype.or = function (a, b) {
		var c = a instanceof d ? a : h(a, b);
		if (!c) throw new Error('No rule with name "' + a + '" found.');
		var e = this,
			g = function (a, b) {
				e.operator(a, function (d) {
					d ? c.operator(a, b) : b(null, f(a, !0))
				})
			};
		return new d(null, g)
	}, d.prototype.not = function (a) {
		var b = h(this.name, a),
			c = function (a, c) {
				b.operator(a, function (b) {
					b ? c(null, f(a, !0)) : c(!0, f(a, !1))
				})
			};
		return new d(null, c)
	}, e("required", function (a) {
		var b = j(a.element),
			c = b.attr("type");
		switch (c) {
		case "checkbox":
		case "radio":
			var d = !1;
			return b.each(function (a, b) {
				return j(b).prop("checked") ? (d = !0, !1) : void 0
			}), d;
		default:
			return Boolean(b.val())
		}
	}, "请输入{{display}}"), e("email", /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "{{display}}的格式不正确"), e("text", /.*/), e("password", /.*/), e("radio", /.*/), e("checkbox", /.*/), e("url", /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, "{{display}}的格式不正确"), e("number", /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/, "{{display}}的格式不正确"), e("date", /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, "{{display}}的格式不正确"), e("min", function (a) {
		var b = a.element,
			c = a.min;
		return Number(b.val()) >= Number(c)
	}, "{{display}}必须大于或者等于{{min}}"), e("max", function (a) {
		var b = a.element,
			c = a.max;
		return Number(b.val()) <= Number(c)
	}, "{{display}}必须小于或者等于{{max}}"), e("minlength", function (a) {
		var b = a.element,
			c = b.val().length;
		return c >= Number(a.min)
	}, "{{display}}的长度必须大于或等于{{min}}"), e("maxlength", function (a) {
		var b = a.element,
			c = b.val().length;
		return c <= Number(a.max)
	}, "{{display}}的长度必须小于或等于{{max}}"), e("mobile", /^1\d{10}$/, "请输入正确的{{display}}"), e("confirmation", function (a) {
		var b = a.element,
			c = j(a.target);
		return b.val() == c.val()
	}, "两次输入的{{display}}不一致，请重新输入"), c.exports = {
		addRule: e,
		setMessage: g,
		getRule: h,
		getOperator: function (a) {
			return k[a].operator
		}
	}
}), define("arale/validator/0.9.5/item", ["$", "arale/validator/0.9.5/utils", "arale/validator/0.9.5/rule", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/validator/0.9.5/async"], function (a, b, c) {
	function d(a) {
		return a += "", a.charAt(0).toUpperCase() + a.slice(1)
	}
	function e(a, b, c, e, h, k) {
		if (!b) {
			var l = !1,
				m = a.attr("type");
			switch (m) {
			case "checkbox":
			case "radio":
				var n = !1;
				a.each(function (a, b) {
					return f(b).prop("checked") ? (n = !0, !1) : void 0
				}), l = n;
				break;
			default:
				l = !! a.val()
			}
			if (!l) return k && k(null, null), void 0
		}
		if (!f.isArray(c)) throw new Error("No validation rule specified or not specified as an array.");
		var o = [];
		f.each(c, function (b, c) {
			var i = g.parseRule(c),
				k = i.name,
				l = i.param,
				m = j.getOperator(k);
			if (!m) throw new Error('Validation rule with name "' + k + '" cannot be found.');
			var n = f.extend({}, l, {
				element: a,
				display: l && l.display || e,
				rule: k
			}),
				p = h.get("errormessage") || h.get("errormessage" + d(k));
			p && !n.message && (n.message = {
				failure: p
			}), o.push(function (a) {
				m.call(h, n, a)
			})
		}), i.series(o, function (a, b) {
			k && k(a, b[b.length - 1])
		})
	}
	var f = a("$"),
		g = a("arale/validator/0.9.5/utils"),
		h = a("arale/widget/1.1.1/widget"),
		i = a("arale/validator/0.9.5/async"),
		j = a("arale/validator/0.9.5/rule"),
		k = {
			value: f.noop,
			setter: function (a) {
				return f.isFunction(a) ? a : g.helper(a)
			}
		},
		l = h.extend({
			attrs: {
				rule: "",
				display: null,
				displayHelper: null,
				triggerType: {
					setter: function (a) {
						if (!a) return a;
						var b = f(this.get("element")),
							c = b.attr("type"),
							d = b.is("select") || "radio" == c || "checkbox" == c;
						return d && (a.indexOf("blur") > -1 || a.indexOf("key") > -1) ? "change" : a
					}
				},
				required: !1,
				checkNull: !0,
				errormessage: null,
				onItemValidate: k,
				onItemValidated: k,
				showMessage: k,
				hideMessage: k
			},
			setup: function () {
				this.get("required") && (!this.get("rule") || this.get("rule").indexOf("required") < 0) && this.set("rule", "required " + this.get("rule")), !this.get("display") && f.isFunction(this.get("displayHelper")) && this.set("display", this.get("displayHelper")(this))
			},
			execute: function (a, b) {
				var c = this,
					d = !! c.element.attr("disabled");
				if (b = b || {}, c.get("skipHidden") && g.isHidden(c.element) || d) return a && a(null, "", c.element), c;
				c.trigger("itemValidate", c.element, b.event);
				var f = g.parseRules(c.get("rule"));
				return f ? e(c.element, c.get("required"), f, c.get("display"), c, function (d, e) {
					c.trigger("itemValidated", d, e, c.element, b.event), a && a(d, e, c.element)
				}) : a && a(null, "", c.element), c
			}
		});
	c.exports = l
}), define("arale/placeholder/1.1.0/placeholder", ["$"], function (a, b, c) {
	var d, e = a("$"),
		f = function (a) {
			function b(b) {
				var c = {},
					d = /^jQuery\d+$/;
				return a.each(b.attributes, function (a, b) {
					b.specified && !d.test(b.name) && (c[b.name] = b.value)
				}), c
			}
			function c(b, c) {
				var d = this,
					e = a(d);
				if ((d.value == e.attr("placeholder") || "" == d.value) && e.hasClass("placeholder")) if (e.data("placeholder-password")) {
					if (e = e.hide().next().show().attr("id", e.removeAttr("id").data("placeholder-id")), b === !0) return e[0].value = c;
					e.focus()
				} else d.value = "", e.removeClass("placeholder"), d == document.activeElement && d.select()
			}
			function d() {
				var d, e = this,
					f = a(e),
					g = this.id;
				if ("" == a(e).val()) {
					if ("password" == e.type) {
						if (!f.data("placeholder-textinput")) {
							try {
								d = f.clone().attr({
									type: "text"
								})
							} catch (h) {
								d = a("<input>").attr(a.extend(b(this), {
									type: "text"
								}))
							}
							d.removeAttr("name").data({
								"placeholder-password": !0,
								"placeholder-id": g
							}).bind("focus.placeholder", c), f.data({
								"placeholder-textinput": d,
								"placeholder-id": g
							}).before(d)
						}
						f = f.removeAttr("id").hide().prev().attr("id", g).show()
					}
					f.addClass("placeholder"), f[0].value = f.attr("placeholder")
				} else f.removeClass("placeholder")
			}
			var e, f, g = "placeholder" in document.createElement("input"),
				h = "placeholder" in document.createElement("textarea"),
				i = {},
				j = a.valHooks;
			if (g && h) f = i.placeholder = function () {
				return this
			}, f.input = f.textarea = !0;
			else {
				if (f = i.placeholder = function () {
					var a = this;
					return a.filter((g ? "textarea" : ":input") + "[placeholder]").unbind({
						"focus.placeholder": c,
						"blur.placeholder": d
					}).bind({
						"focus.placeholder": c,
						"blur.placeholder": d
					}).data("placeholder-enabled", !0).trigger("blur.placeholder"), a
				}, f.input = g, f.textarea = h, e = {
					get: function (b) {
						var c = a(b);
						return c.data("placeholder-enabled") && c.hasClass("placeholder") ? "" : b.value
					},
					set: function (b, e) {
						var f = a(b);
						return f.data("placeholder-enabled") ? ("" == e ? (b.value = e, b != document.activeElement && d.call(b)) : f.hasClass("placeholder") ? c.call(b, !0, e) || (b.value = e) : b.value = e, f) : b.value = e
					}
				}, !g) {
					var k = j.input;
					j.input = k ? {
						get: function () {
							return k.get && k.get.apply(this, arguments), e.get.apply(this, arguments)
						},
						set: function () {
							return k.set && k.set.apply(this, arguments), e.set.apply(this, arguments)
						}
					} : e
				}
				if (!h) {
					var k = j.textarea;
					j.textarea = k ? {
						get: function () {
							return k.get && k.get.apply(this, arguments), e.get.apply(this, arguments)
						},
						set: function () {
							return k.set && k.set.apply(this, arguments), e.set.apply(this, arguments)
						}
					} : e
				}
				a(function () {
					a(document).delegate("form", "submit.placeholder", function () {
						var b = a(".placeholder", this).each(c);
						setTimeout(function () {
							b.each(d)
						}, 10)
					})
				}), a(window).bind("beforeunload.placeholder", function () {
					a(".placeholder").each(function () {
						this.value = ""
					})
				})
			}
			return f
		}(e);
	d = f.input && f.textarea ?
	function () {} : function (a) {
		a || (a = e("input, textarea")), a && f.call(e(a))
	}, d(), d.clear = function (a) {
		function b(a) {
			a.each(function (a, b) {
				b = e(b), b[0].value === b.attr("placeholder") && b.hasClass("placeholder") && (b[0].value = "")
			})
		}
		a = e(a), "FORM" === a[0].tagName ? b(a.find("input.placeholder, textarea.placeholder")) : b(a)
	}, c.exports = d
}), define("authcenter/login/1.2.4/js/module/account", ["$"], function (a) {
	"use strict";
	var b = a("$");
	b("#J-label-user").on("click", function (a) {
		a.preventDefault(), b("#J-input-user").length > 0 && b("#J-input-user")[0].focus()
	})
}), define("authcenter/login/1.2.4/js/module/accountsave", ["$", "alipay/storex/1.0.1/storex", "gallery/json/1.0.3/json", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "gallery/store/1.3.7/store"], function (a) {
	"use strict";
	var b = a("$"),
		c = a("alipay/storex/1.0.1/storex");
	!
	function (a) {
		system.auth.accountsaver = function (d) {
			if (d = d || "home-username", c.status().enabled && a && "" === a.val()) {
				var e = c.get(d);
				if (e && system.auth.rule.emailOrMobile(e)) {
					a.val(e);
					var f = '<span class="sl-delect" seed="authcenter-account-delete"><i class="iconfont" title="删除">&#xF045;</i></span>';
					b(f).appendTo(a.parent()).hover(function () {
						b(this).addClass("sl-delect-hover")
					}, function () {
						b(this).removeClass("sl-delect-hover")
					}), b(a.parent()).delegate(".sl-delect", "click", function (e) {
						e.preventDefault(), a.val(""), a.focus();
						try {
							c.remove(d)
						} catch (e) {}
						b(this).remove(), system.auth.log("track", "closechacha")
					})
				}
			}
		}, system.auth.accountsaver.save = function (d) {
			if (d = d || "home-username", c.status().enabled && a) {
				var e = b.trim(a.val());
				if (e) try {
					c.set(d, e)
				} catch (f) {}
			}
		}, system.auth.accountsaver.clear = function () {
			if (a) {
				a.val("");
				var c = a.parent(),
					d = b(c).find(".sl-delect");
				d.length > 0 && b(d).remove()
			}
		}, system.auth.accountsaver.status = function (b) {
			if (b = b || "home-username", c.status().enabled && a) {
				var d = c.get(b);
				return d && system.auth.rule.emailOrMobile(d) ? !0 : !1
			}
			return !1
		}
	}(system.auth.param.account)
}), define("authcenter/login/1.2.4/js/module/adjustheight", ["$"], function (a) {
	"use strict"; {
		a("$")
	}!
	function (a) {
		var b = a.loginForm,
			c = b.parent();
		system.auth.adjustheight = function () {
			system.auth.adjustheight.inited = !0, setTimeout(function () {
				var a = document.body.offsetHeight,
					b = c[0].offsetHeight + 2;
				system.auth.log("debug", a + " " + b);
				try {
					var d = window.frameElement;
					d && (parent.adjustHeight ? (parent.adjustHeight(b, d.id), system.auth.log("debug", "adjustHeight")) : b > d.offsetHeight && (d.height = b, d.style.height = b + "px", system.auth.log("debug", "set iframe height " + b)))
				} catch (e) {}
			}, 500)
		}
	}(system.auth.param)
}), define("authcenter/login/1.2.4/js/module/autocomplete", ["$", "arale/autocomplete/1.2.2/autocomplete", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.1/templatable", "gallery/handlebars/1.0.2/handlebars", "gallery/handlebars/1.0.2/runtime", "alipay/object-shim/1.0.0/object-shim"], function (a) {
	"use strict";
	var b = a("$"),
		c = a("arale/autocomplete/1.2.2/autocomplete"),
		d = a("alipay/object-shim/1.0.0/object-shim");
	system.auth.autoComplete = function (a) {
		for (var b in a) this[b] = a[b];
		this.init()
	}, system.auth.autoComplete.prototype = {
		defaultData: ["qq.com", "163.com", "126.com", "189.cn", "sina.com", "hotmail.com", "gmail.com", "sohu.com", "21cn.com", "139.com"],
		accountId: "#J-input-user",
		init: function () {
			var a = this,
				e = "ui-autocomplete";
			b(".login-modern").length > 0 && (e = "ui-autocomplete-modern");
			var f = new c({
				trigger: a.accountId,
				classPrefix: e,
				submitOnEnter: !1,
				selectFirst: !0,
				align: {
					baseXY: [0, "100%-6px"]
				},
				dataSource: function (b) {
					b = b.replace(/^([^@]*)@.*$/, "$1");
					var c = [];
					b.match(/[^0-9]/) || c.push(b);
					for (var d in a.defaultData) {
						var e = d;
						c.push(b + "@" + a.defaultData[e])
					}
					return c
				},
				filter: function (a, c) {
					if (/^(00)?(852|853|886|855|91|62|972|81|962|996|60|960|976|63|974|966|65|82|94|90|66|971|84|43|375|32|359|45|372|358|33|49|30|36|353|39|370|352|31|47|48|351|40|7|381|34|46|41|380|44|54|1242|501|55|1|56|57|52|507|51|1|58|1284|20|212|234|248|27|216|61|64)-\d{1,14}$/.test(c) || /^1\d{0,10}$/.test(c) || c.indexOf("<") > -1 || c.indexOf(">") > -1) return [];
					var c = c.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
						d = !1,
						e = [];
					return b.each(a, function (a, b) {
						c.indexOf("@") > -1 && b === c ? d = !0 : b.indexOf(c) > -1 && e.push({
							matchKey: b
						})
					}), d ? [] : e
				}
			}).render();
			d(f)
		}
	}
}), define("arale/autocomplete/1.2.2/autocomplete", ["$", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/templatable/0.9.1/templatable", "gallery/handlebars/1.0.2/handlebars", "./data-source", "./filter"], function (a, b, c) {
	function d(a) {
		return "[object String]" === Object.prototype.toString.call(a)
	}
	function e(a, b) {
		if (!a) return b;
		if (g.isFunction(a)) return a.call(this, b);
		if (d(a)) {
			for (var c = a.split("."), e = b; c.length;) {
				var f = c.shift();
				if (!e[f]) break;
				e = e[f]
			}
			return e
		}
		return b
	}
	function f(a, b) {
		var c = this.highlightIndex,
			d = 0,
			e = b || this.matchKey || "",
			f = "";
		if (g.isArray(c)) {
			for (var h = 0, i = c.length; i > h; h++) {
				var j, k, l = c[h];
				if (g.isArray(l) ? (j = l[0], k = l[1] - l[0]) : (j = l, k = 1), j > d && (f += e.substring(d, j)), j < e.length && (f += '<span class="' + a + '-item-hl">' + e.substr(j, k) + "</span>"), d = j + k, d >= e.length) break
			}
			return e.length > d && (f += e.substring(d, e.length)), f
		}
		return e
	}
	var g = a("$"),
		h = a("arale/overlay/1.1.1/overlay"),
		i = a("arale/templatable/0.9.1/templatable"),
		j = a("./data-source"),
		k = a("./filter"),
		l = a("./autocomplete.handlebars"),
		m = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie"),
		n = {
			UP: 38,
			DOWN: 40,
			LEFT: 37,
			RIGHT: 39,
			ENTER: 13,
			ESC: 27,
			BACKSPACE: 8
		},
		o = h.extend({
			Implements: i,
			attrs: {
				trigger: {
					value: null,
					getter: function (a) {
						return g(a)
					}
				},
				classPrefix: "ui-autocomplete",
				align: {
					baseXY: [0, "100%"]
				},
				template: l,
				submitOnEnter: !0,
				selectItem: !0,
				dataSource: [],
				locator: "data",
				filter: void 0,
				inputFilter: function (a) {
					return a
				},
				disabled: !1,
				selectFirst: !1,
				delay: 100,
				selectedIndex: void 0,
				inputValue: null,
				data: null
			},
			events: {
				"mousedown [data-role=item]": function (a) {
					var b = this.items.index(a.currentTarget);
					this.set("selectedIndex", b), this.get("selectItem") && (this.selectItem(), this._firstMousedown = !0)
				},
				mousedown: function () {
					this._secondMousedown = !0
				},
				"click [data-role=item]": function () {
					this.get("selectItem") || this.hide()
				},
				"mouseenter [data-role=item]": function (a) {
					var b = this.get("classPrefix") + "-item-hover";
					this.currentItem && this.currentItem.removeClass(b), g(a.currentTarget).addClass(b)
				},
				"mouseleave [data-role=item]": function (a) {
					var b = this.get("classPrefix") + "-item-hover";
					g(a.currentTarget).removeClass(b)
				}
			},
			templateHelpers: {
				highlightItem: f
			},
			parseElement: function () {
				this.set("model", {
					classPrefix: this.get("classPrefix"),
					items: []
				}), o.superclass.parseElement.call(this)
			},
			setup: function () {
				var a = this.get("trigger"),
					b = this;
				o.superclass.setup.call(this), this.dataSource = new j({
					source: this.get("dataSource")
				}).on("data", this._filterData, this), this._initFilter(), this._blurHide([a]), this._tweakAlignDefaultValue(), a.attr("autocomplete", "off"), this.delegateEvents(a, "blur.autocomplete", g.proxy(this._blurEvent, this)), this.delegateEvents(a, "keydown.autocomplete", g.proxy(this._keydownEvent, this)), this.delegateEvents(a, "keyup.autocomplete", function () {
					clearTimeout(b._timeout), b._timeout = setTimeout(function () {
						b._timeout = null, b._keyupEvent.call(b)
					}, b.get("delay"))
				})
			},
			destroy: function () {
				this._clear(), this.element.remove(), o.superclass.destroy.call(this)
			},
			hide: function () {
				this._timeout && clearTimeout(this._timeout), this.dataSource.abort(), o.superclass.hide.call(this)
			},
			selectItem: function () {
				this.hide();
				var a = this.currentItem,
					b = this.get("selectedIndex"),
					c = this.get("data")[b];
				if (a) {
					var d = a.attr("data-value");
					this.get("trigger").val(d), this.set("inputValue", d, {
						silent: !0
					}), this.trigger("itemSelect", c), this._clear()
				}
			},
			setInputValue: function (a) {
				if (this.get("inputValue") !== a) {
					this._start = !0, this.set("inputValue", a);
					var b = this.get("trigger");
					b.val() !== a && b.val(a)
				}
			},
			_onRenderInputValue: function (a) {
				if (this._start && a) {
					var b = this.queryValue;
					this.queryValue = this.get("inputFilter").call(this, a), this.queryValue && this.queryValue !== b && (this.dataSource.abort(), this.dataSource.getData(this.queryValue))
				} else this.queryValue = "";
				"" !== a && this.queryValue || (this.set("data", []), this.hide()), delete this._start
			},
			_filterData: function (a) {
				var b = this.get("filter"),
					c = this.get("locator");
				a = e(c, a), a = b.func.call(this, a, this.queryValue, b.options), this.set("data", a)
			},
			_onRenderData: function (a) {
				this._clear(), this.set("model", {
					items: a
				}), this.renderPartial("[data-role=items]"), this.items = this.$("[data-role=items]").children(), this.currentItem = null, this.get("selectFirst") && this.set("selectedIndex", 0), g.trim(this.$("[data-role=items]").text()) ? this.show() : this.hide()
			},
			_onRenderSelectedIndex: function (a) {
				if (-1 !== a) {
					var b = this.get("classPrefix") + "-item-hover";
					this.currentItem && this.currentItem.removeClass(b), this.currentItem = this.items.eq(a).addClass(b), this.trigger("indexChange", a, this.lastIndex), this.lastIndex = a
				}
			},
			_initFilter: function () {
				var a = this.get("filter");
				a = void 0 === a ? "url" === this.dataSource.get("type") ? null : {
					name: "startsWith",
					func: k.startsWith,
					options: {
						key: "value"
					}
				} : g.isPlainObject(a) ? k[a.name] ? {
					name: a.name,
					func: k[a.name],
					options: a.options
				} : null : g.isFunction(a) ? {
					func: a
				} : k[a] ? {
					name: a,
					func: k[a]
				} : null, a || (a = {
					name: "default",
					func: k["default"]
				}), this.set("filter", a)
			},
			_blurEvent: function () {
				m || (this._secondMousedown ? this._firstMousedown && (this.get("trigger").focus(), this.hide()) : this.hide(), delete this._firstMousedown, delete this._secondMousedown)
			},
			_keyupEvent: function () {
				if (!this.get("disabled") && this._keyupStart) {
					delete this._keyupStart;
					var a = this.get("trigger").val();
					this.setInputValue(a)
				}
			},
			_keydownEvent: function (a) {
				if (!this.get("disabled")) switch (delete this._keyupStart, a.which) {
				case n.ESC:
					this.hide();
					break;
				case n.UP:
					this._keyUp(a);
					break;
				case n.DOWN:
					this._keyDown(a);
					break;
				case n.LEFT:
				case n.RIGHT:
					break;
				case n.ENTER:
					this._keyEnter(a);
					break;
				default:
					this._keyupStart = !0
				}
			},
			_keyUp: function (a) {
				if (a.preventDefault(), this.get("data").length) {
					if (!this.get("visible")) return this.show(), void 0;
					this._step(-1)
				}
			},
			_keyDown: function (a) {
				if (a.preventDefault(), this.get("data").length) {
					if (!this.get("visible")) return this.show(), void 0;
					this._step(1)
				}
			},
			_keyEnter: function (a) {
				this.get("visible") && (this.selectItem(), this.get("submitOnEnter") || a.preventDefault())
			},
			_step: function (a) {
				var b = this.get("selectedIndex"); - 1 === a ? b > 0 ? this.set("selectedIndex", b - 1) : this.set("selectedIndex", this.items.length - 1) : 1 === a && (b < this.items.length - 1 ? this.set("selectedIndex", b + 1) : this.set("selectedIndex", 0))
			},
			_clear: function () {
				this.$("[data-role=items]").empty(), this.set("selectedIndex", -1), delete this.items, delete this.lastIndex, delete this.currentItem
			},
			_tweakAlignDefaultValue: function () {
				var a = this.get("align");
				a.baseElement = this.get("trigger"), this.set("align", a)
			}
		});
	o._filter = k, c.exports = o
}), define("arale/autocomplete/1.2.2/data-source", ["arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "$"], function (a, b, c) {
	function d(a) {
		return "[object String]" === Object.prototype.toString.call(a)
	}
	function e(a) {
		return a.replace(/^([a-z])/, function (a, b) {
			return b.toUpperCase()
		})
	}
	var f = a("arale/base/1.1.1/base"),
		g = a("$"),
		h = f.extend({
			attrs: {
				source: null,
				type: "array"
			},
			initialize: function (a) {
				h.superclass.initialize.call(this, a), this.id = 0, this.callbacks = [];
				var b = this.get("source");
				if (d(b)) this.set("type", "url");
				else if (g.isArray(b)) this.set("type", "array");
				else if (g.isPlainObject(b)) this.set("type", "object");
				else {
					if (!g.isFunction(b)) throw new Error("Source Type Error");
					this.set("type", "function")
				}
			},
			getData: function (a) {
				return this["_get" + e(this.get("type") || "") + "Data"](a)
			},
			abort: function () {
				this.callbacks = []
			},
			_done: function (a) {
				this.trigger("data", a)
			},
			_getUrlData: function (a) {
				var b, c = this,
					d = {
						query: a ? encodeURIComponent(a) : "",
						timestamp: (new Date).getTime()
					},
					e = this.get("source").replace(/{{(.*?)}}/g, function (a, b) {
						return d[b]
					}),
					f = "callback_" + this.id++;
				this.callbacks.push(f), b = /^(https?:\/\/)/.test(e) ? {
					dataType: "jsonp"
				} : {
					dataType: "json"
				}, g.ajax(e, b).success(function (a) {
					g.inArray(f, c.callbacks) > -1 && (delete c.callbacks[f], c._done(a))
				}).error(function () {
					g.inArray(f, c.callbacks) > -1 && (delete c.callbacks[f], c._done({}))
				})
			},
			_getArrayData: function () {
				var a = this.get("source");
				return this._done(a), a
			},
			_getObjectData: function () {
				var a = this.get("source");
				return this._done(a), a
			},
			_getFunctionData: function (a) {
				function b(a) {
					c._done(a)
				}
				var c = this,
					d = this.get("source"),
					e = d.call(this, a, b);
				e && this._done(e)
			}
		});
	c.exports = h
}), define("arale/autocomplete/1.2.2/filter", ["$"], function (a, b, c) {
	function d(a, b) {
		if (g.isPlainObject(a)) {
			var c = b && b.key || "value";
			return a[c] || ""
		}
		return a
	}
	function e(a, b) {
		for (var c = [], d = a.split(""), e = 0, f = b.split(""), g = 0, h = d.length; h > g; g++) {
			var i = d[g];
			if (i == f[e]) {
				if (e === f.length - 1) {
					c.push([g - f.length + 1, g + 1]), e = 0;
					continue
				}
				e++
			} else e = 0
		}
		return c
	}
	function f(a) {
		return (a || "").replace(i, "\\$1")
	}
	var g = a("$"),
		h = {
			"default": function (a, b, c) {
				var e = [];
				return g.each(a, function (a, b) {
					var f = {},
						h = d(b, c);
					g.isPlainObject(b) && (f = g.extend({}, b)), f.matchKey = h, e.push(f)
				}), e
			},
			startsWith: function (a, b, c) {
				var e = [],
					h = b.length,
					i = new RegExp("^" + f(b));
				return h ? (g.each(a, function (a, b) {
					var f = {},
						j = d(b, c);
					g.isPlainObject(b) && (f = g.extend({}, b)), i.test(j) && (f.matchKey = j, h > 0 && (f.highlightIndex = [
						[0, h]
					]), e.push(f))
				}), e) : []
			},
			stringMatch: function (a, b, c) {
				b = b || "";
				var f = [],
					h = b.length;
				return h ? (g.each(a, function (a, h) {
					var i = {},
						j = d(h, c);
					g.isPlainObject(h) && (i = g.extend({}, h)), j.indexOf(b) > -1 && (i.matchKey = j, i.highlightIndex = e(j, b), f.push(i))
				}), f) : []
			}
		};
	c.exports = h;
	var i = /(\[|\[|\]|\^|\$|\||\(|\)|\{|\}|\+|\*|\?|\\)/g
}), define("arale/autocomplete/1.2.2/autocomplete.handlebars", ["gallery/handlebars/1.0.2/runtime"], function (a, b, c) {
	var d = a("gallery/handlebars/1.0.2/runtime"),
		e = d.template;
	c.exports = e(function (a, b, c, d, e) {
		function f(a, b, d) {
			var e, f, g, h = "";
			return h += '\n            <li data-role="item" class="' + k((e = d.classPrefix, typeof e === j ? e.apply(a) : e)) + '-item" data-value="', (f = c.matchKey) ? f = f.call(a, {
				hash: {},
				data: b
			}) : (f = a.matchKey, f = typeof f === j ? f.apply(a) : f), h += k(f) + '">', g = {
				hash: {},
				data: b
			}, e = c.highlightItem, f = e ? e.call(a, d.classPrefix, a.matchKey, g) : l.call(a, "highlightItem", d.classPrefix, a.matchKey, g), (f || 0 === f) && (h += f), h += "</li>\n        "
		}
		this.compilerInfo = [3, ">= 1.0.0-rc.4"], c = c || {};
		for (var g in a.helpers) c[g] = c[g] || a.helpers[g];
		e = e || {};
		var h, i = "",
			j = "function",
			k = this.escapeExpression,
			l = c.helperMissing,
			m = this;
		return i += '<div class="', (h = c.classPrefix) ? h = h.call(b, {
			hash: {},
			data: e
		}) : (h = b.classPrefix, h = typeof h === j ? h.apply(b) : h), i += k(h) + '">\n    <ul class="', (h = c.classPrefix) ? h = h.call(b, {
			hash: {},
			data: e
		}) : (h = b.classPrefix, h = typeof h === j ? h.apply(b) : h), i += k(h) + '-ctn" data-role="items">\n        ', h = c.each.call(b, b.items, {
			hash: {},
			inverse: m.noop,
			fn: m.programWithDepth(1, f, e, b),
			data: e
		}), (h || 0 === h) && (i += h), i += "\n    </ul>\n</div>\n"
	})
}), define("arale/templatable/0.9.1/templatable", ["$", "gallery/handlebars/1.0.2/handlebars"], function (a, b, c) {
	function d(a) {
		return h(a) ? null : i(f(a))
	}
	function e(a, b) {
		if (a) {
			var c = a.find(b);
			if (0 === c.length) throw new Error("Invalid template selector: " + b);
			return g(c.html())
		}
	}
	function f(a) {
		return a.replace(/({[^}]+}})/g, "<!--$1-->").replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g, " data-templatable-$1=$2$3$2")
	}
	function g(a) {
		return a.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g, "$1").replace(/data-templatable-/gi, "")
	}
	function h(a) {
		return "function" == typeof a
	}
	var i = a("$"),
		j = a("gallery/handlebars/1.0.2/handlebars"),
		k = {};
	c.exports = {
		templateHelpers: null,
		templateObject: null,
		parseElementFromTemplate: function () {
			var a, b = this.get("template");
			/^#/.test(b) && (a = document.getElementById(b.substring(1))) && (b = a.innerHTML, this.set("template", b)), this.templateObject = d(b), this.element = i(this.compile())
		},
		compile: function (a, b) {
			if (a || (a = this.get("template")), b || (b = this.get("model")), b.toJSON && (b = b.toJSON()), h(a)) return a(b, {
				helpers: this.templateHelpers
			});
			var c = this.templateHelpers;
			if (c) for (var d in c) c.hasOwnProperty(d) && j.registerHelper(d, c[d]);
			var e = k[a];
			e || (e = k[a] = j.compile(a));
			var f = e(b);
			if (c) for (d in c) c.hasOwnProperty(d) && delete j.helpers[d];
			return f
		},
		renderPartial: function (a) {
			if (this.templateObject) {
				var b = e(this.templateObject, a);
				b ? this.$(a).html(this.compile(b)) : this.element.html(this.compile())
			} else {
				var c = i(this.compile()),
					d = c.find(a);
				d.length ? this.$(a).html(d.html()) : this.element.html(c.html())
			}
			return this
		}
	};
	var l = j.compile;
	j.compile = function (a) {
		return h(a) ? a : l.call(j, a)
	}
}), define("gallery/handlebars/1.0.2/handlebars", [], function (a, b, c) {
	var d = {};
	!
	function (a, b) {
		a.VERSION = "1.0.0-rc.4", a.COMPILER_REVISION = 3, a.REVISION_CHANGES = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: ">= 1.0.0-rc.4"
		}, a.helpers = {}, a.partials = {};
		var c = Object.prototype.toString,
			d = "[object Function]",
			e = "[object Object]";
		a.registerHelper = function (b, d, f) {
			if (c.call(b) === e) {
				if (f || d) throw new a.Exception("Arg not supported with multiple helpers");
				a.Utils.extend(this.helpers, b)
			} else f && (d.not = f), this.helpers[b] = d
		}, a.registerPartial = function (b, d) {
			c.call(b) === e ? a.Utils.extend(this.partials, b) : this.partials[b] = d
		}, a.registerHelper("helperMissing", function (a) {
			if (2 === arguments.length) return b;
			throw Error("Could not find property '" + a + "'")
		}), a.registerHelper("blockHelperMissing", function (b, e) {
			var f = e.inverse ||
			function () {}, g = e.fn, h = c.call(b);
			return h === d && (b = b.call(this)), b === !0 ? g(this) : b === !1 || null == b ? f(this) : "[object Array]" === h ? b.length > 0 ? a.helpers.each(b, e) : f(this) : g(b)
		}), a.K = function () {}, a.createFrame = Object.create ||
		function (b) {
			a.K.prototype = b;
			var c = new a.K;
			return a.K.prototype = null, c
		}, a.logger = {
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 3,
			methodMap: {
				0: "debug",
				1: "info",
				2: "warn",
				3: "error"
			},
			log: function (b, c) {
				if (b >= a.logger.level) {
					var d = a.logger.methodMap[b];
					"undefined" != typeof console && console[d] && console[d].call(console, c)
				}
			}
		}, a.log = function (b, c) {
			a.logger.log(b, c)
		}, a.registerHelper("each", function (b, c) {
			var d, e = c.fn,
				f = c.inverse,
				g = 0,
				h = "";
			if (c.data && (d = a.createFrame(c.data)), b && "object" == typeof b) if (b instanceof Array) for (var i = b.length; i > g; g++) d && (d.index = g), h += e(b[g], {
				data: d
			});
			else for (var j in b) b.hasOwnProperty(j) && (d && (d.key = j), h += e(b[j], {
				data: d
			}), g++);
			return 0 === g && (h = f(this)), h
		}), a.registerHelper("if", function (b, e) {
			var f = c.call(b);
			return f === d && (b = b.call(this)), !b || a.Utils.isEmpty(b) ? e.inverse(this) : e.fn(this)
		}), a.registerHelper("unless", function (b, c) {
			return a.helpers["if"].call(this, b, {
				fn: c.inverse,
				inverse: c.fn
			})
		}), a.registerHelper("with", function (c, d) {
			return a.Utils.isEmpty(c) ? b : d.fn(c)
		}), a.registerHelper("log", function (b, c) {
			var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
			a.log(d, b)
		});
		var f = function () {
				function a() {
					this.yy = {}
				}
				var c = {
					trace: function () {},
					yy: {},
					symbols_: {
						error: 2,
						root: 3,
						program: 4,
						EOF: 5,
						simpleInverse: 6,
						statements: 7,
						statement: 8,
						openInverse: 9,
						closeBlock: 10,
						openBlock: 11,
						mustache: 12,
						partial: 13,
						CONTENT: 14,
						COMMENT: 15,
						OPEN_BLOCK: 16,
						inMustache: 17,
						CLOSE: 18,
						OPEN_INVERSE: 19,
						OPEN_ENDBLOCK: 20,
						path: 21,
						OPEN: 22,
						OPEN_UNESCAPED: 23,
						OPEN_PARTIAL: 24,
						partialName: 25,
						params: 26,
						hash: 27,
						DATA: 28,
						param: 29,
						STRING: 30,
						INTEGER: 31,
						BOOLEAN: 32,
						hashSegments: 33,
						hashSegment: 34,
						ID: 35,
						EQUALS: 36,
						PARTIAL_NAME: 37,
						pathSegments: 38,
						SEP: 39,
						$accept: 0,
						$end: 1
					},
					terminals_: {
						2: "error",
						5: "EOF",
						14: "CONTENT",
						15: "COMMENT",
						16: "OPEN_BLOCK",
						18: "CLOSE",
						19: "OPEN_INVERSE",
						20: "OPEN_ENDBLOCK",
						22: "OPEN",
						23: "OPEN_UNESCAPED",
						24: "OPEN_PARTIAL",
						28: "DATA",
						30: "STRING",
						31: "INTEGER",
						32: "BOOLEAN",
						35: "ID",
						36: "EQUALS",
						37: "PARTIAL_NAME",
						39: "SEP"
					},
					productions_: [0, [3, 2],
						[4, 2],
						[4, 3],
						[4, 2],
						[4, 1],
						[4, 1],
						[4, 0],
						[7, 1],
						[7, 2],
						[8, 3],
						[8, 3],
						[8, 1],
						[8, 1],
						[8, 1],
						[8, 1],
						[11, 3],
						[9, 3],
						[10, 3],
						[12, 3],
						[12, 3],
						[13, 3],
						[13, 4],
						[6, 2],
						[17, 3],
						[17, 2],
						[17, 2],
						[17, 1],
						[17, 1],
						[26, 2],
						[26, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[29, 1],
						[27, 1],
						[33, 2],
						[33, 1],
						[34, 3],
						[34, 3],
						[34, 3],
						[34, 3],
						[34, 3],
						[25, 1],
						[21, 1],
						[38, 3],
						[38, 1]
					],
					performAction: function (a, b, c, d, e, f) {
						var g = f.length - 1;
						switch (e) {
						case 1:
							return f[g - 1];
						case 2:
							this.$ = new d.ProgramNode([], f[g]);
							break;
						case 3:
							this.$ = new d.ProgramNode(f[g - 2], f[g]);
							break;
						case 4:
							this.$ = new d.ProgramNode(f[g - 1], []);
							break;
						case 5:
							this.$ = new d.ProgramNode(f[g]);
							break;
						case 6:
							this.$ = new d.ProgramNode([], []);
							break;
						case 7:
							this.$ = new d.ProgramNode([]);
							break;
						case 8:
							this.$ = [f[g]];
							break;
						case 9:
							f[g - 1].push(f[g]), this.$ = f[g - 1];
							break;
						case 10:
							this.$ = new d.BlockNode(f[g - 2], f[g - 1].inverse, f[g - 1], f[g]);
							break;
						case 11:
							this.$ = new d.BlockNode(f[g - 2], f[g - 1], f[g - 1].inverse, f[g]);
							break;
						case 12:
							this.$ = f[g];
							break;
						case 13:
							this.$ = f[g];
							break;
						case 14:
							this.$ = new d.ContentNode(f[g]);
							break;
						case 15:
							this.$ = new d.CommentNode(f[g]);
							break;
						case 16:
							this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
							break;
						case 17:
							this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
							break;
						case 18:
							this.$ = f[g - 1];
							break;
						case 19:
							this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1]);
							break;
						case 20:
							this.$ = new d.MustacheNode(f[g - 1][0], f[g - 1][1], !0);
							break;
						case 21:
							this.$ = new d.PartialNode(f[g - 1]);
							break;
						case 22:
							this.$ = new d.PartialNode(f[g - 2], f[g - 1]);
							break;
						case 23:
							break;
						case 24:
							this.$ = [
								[f[g - 2]].concat(f[g - 1]), f[g]
							];
							break;
						case 25:
							this.$ = [
								[f[g - 1]].concat(f[g]), null];
							break;
						case 26:
							this.$ = [
								[f[g - 1]], f[g]
							];
							break;
						case 27:
							this.$ = [
								[f[g]], null];
							break;
						case 28:
							this.$ = [
								[new d.DataNode(f[g])], null];
							break;
						case 29:
							f[g - 1].push(f[g]), this.$ = f[g - 1];
							break;
						case 30:
							this.$ = [f[g]];
							break;
						case 31:
							this.$ = f[g];
							break;
						case 32:
							this.$ = new d.StringNode(f[g]);
							break;
						case 33:
							this.$ = new d.IntegerNode(f[g]);
							break;
						case 34:
							this.$ = new d.BooleanNode(f[g]);
							break;
						case 35:
							this.$ = new d.DataNode(f[g]);
							break;
						case 36:
							this.$ = new d.HashNode(f[g]);
							break;
						case 37:
							f[g - 1].push(f[g]), this.$ = f[g - 1];
							break;
						case 38:
							this.$ = [f[g]];
							break;
						case 39:
							this.$ = [f[g - 2], f[g]];
							break;
						case 40:
							this.$ = [f[g - 2], new d.StringNode(f[g])];
							break;
						case 41:
							this.$ = [f[g - 2], new d.IntegerNode(f[g])];
							break;
						case 42:
							this.$ = [f[g - 2], new d.BooleanNode(f[g])];
							break;
						case 43:
							this.$ = [f[g - 2], new d.DataNode(f[g])];
							break;
						case 44:
							this.$ = new d.PartialNameNode(f[g]);
							break;
						case 45:
							this.$ = new d.IdNode(f[g]);
							break;
						case 46:
							f[g - 2].push(f[g]), this.$ = f[g - 2];
							break;
						case 47:
							this.$ = [f[g]]
						}
					},
					table: [{
						3: 1,
						4: 2,
						5: [2, 7],
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						1: [3]
					}, {
						5: [1, 17]
					}, {
						5: [2, 6],
						7: 18,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 6],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 5],
						6: 20,
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 5],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						17: 23,
						18: [1, 22],
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						5: [2, 8],
						14: [2, 8],
						15: [2, 8],
						16: [2, 8],
						19: [2, 8],
						20: [2, 8],
						22: [2, 8],
						23: [2, 8],
						24: [2, 8]
					}, {
						4: 28,
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 7],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						4: 29,
						6: 3,
						7: 4,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 5],
						20: [2, 7],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 12],
						14: [2, 12],
						15: [2, 12],
						16: [2, 12],
						19: [2, 12],
						20: [2, 12],
						22: [2, 12],
						23: [2, 12],
						24: [2, 12]
					}, {
						5: [2, 13],
						14: [2, 13],
						15: [2, 13],
						16: [2, 13],
						19: [2, 13],
						20: [2, 13],
						22: [2, 13],
						23: [2, 13],
						24: [2, 13]
					}, {
						5: [2, 14],
						14: [2, 14],
						15: [2, 14],
						16: [2, 14],
						19: [2, 14],
						20: [2, 14],
						22: [2, 14],
						23: [2, 14],
						24: [2, 14]
					}, {
						5: [2, 15],
						14: [2, 15],
						15: [2, 15],
						16: [2, 15],
						19: [2, 15],
						20: [2, 15],
						22: [2, 15],
						23: [2, 15],
						24: [2, 15]
					}, {
						17: 30,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						17: 31,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						17: 32,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						25: 33,
						37: [1, 34]
					}, {
						1: [2, 1]
					}, {
						5: [2, 2],
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 2],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						17: 23,
						21: 24,
						28: [1, 25],
						35: [1, 27],
						38: 26
					}, {
						5: [2, 4],
						7: 35,
						8: 6,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 4],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						5: [2, 9],
						14: [2, 9],
						15: [2, 9],
						16: [2, 9],
						19: [2, 9],
						20: [2, 9],
						22: [2, 9],
						23: [2, 9],
						24: [2, 9]
					}, {
						5: [2, 23],
						14: [2, 23],
						15: [2, 23],
						16: [2, 23],
						19: [2, 23],
						20: [2, 23],
						22: [2, 23],
						23: [2, 23],
						24: [2, 23]
					}, {
						18: [1, 36]
					}, {
						18: [2, 27],
						21: 41,
						26: 37,
						27: 38,
						28: [1, 45],
						29: 39,
						30: [1, 42],
						31: [1, 43],
						32: [1, 44],
						33: 40,
						34: 46,
						35: [1, 47],
						38: 26
					}, {
						18: [2, 28]
					}, {
						18: [2, 45],
						28: [2, 45],
						30: [2, 45],
						31: [2, 45],
						32: [2, 45],
						35: [2, 45],
						39: [1, 48]
					}, {
						18: [2, 47],
						28: [2, 47],
						30: [2, 47],
						31: [2, 47],
						32: [2, 47],
						35: [2, 47],
						39: [2, 47]
					}, {
						10: 49,
						20: [1, 50]
					}, {
						10: 51,
						20: [1, 50]
					}, {
						18: [1, 52]
					}, {
						18: [1, 53]
					}, {
						18: [1, 54]
					}, {
						18: [1, 55],
						21: 56,
						35: [1, 27],
						38: 26
					}, {
						18: [2, 44],
						35: [2, 44]
					}, {
						5: [2, 3],
						8: 21,
						9: 7,
						11: 8,
						12: 9,
						13: 10,
						14: [1, 11],
						15: [1, 12],
						16: [1, 13],
						19: [1, 19],
						20: [2, 3],
						22: [1, 14],
						23: [1, 15],
						24: [1, 16]
					}, {
						14: [2, 17],
						15: [2, 17],
						16: [2, 17],
						19: [2, 17],
						20: [2, 17],
						22: [2, 17],
						23: [2, 17],
						24: [2, 17]
					}, {
						18: [2, 25],
						21: 41,
						27: 57,
						28: [1, 45],
						29: 58,
						30: [1, 42],
						31: [1, 43],
						32: [1, 44],
						33: 40,
						34: 46,
						35: [1, 47],
						38: 26
					}, {
						18: [2, 26]
					}, {
						18: [2, 30],
						28: [2, 30],
						30: [2, 30],
						31: [2, 30],
						32: [2, 30],
						35: [2, 30]
					}, {
						18: [2, 36],
						34: 59,
						35: [1, 60]
					}, {
						18: [2, 31],
						28: [2, 31],
						30: [2, 31],
						31: [2, 31],
						32: [2, 31],
						35: [2, 31]
					}, {
						18: [2, 32],
						28: [2, 32],
						30: [2, 32],
						31: [2, 32],
						32: [2, 32],
						35: [2, 32]
					}, {
						18: [2, 33],
						28: [2, 33],
						30: [2, 33],
						31: [2, 33],
						32: [2, 33],
						35: [2, 33]
					}, {
						18: [2, 34],
						28: [2, 34],
						30: [2, 34],
						31: [2, 34],
						32: [2, 34],
						35: [2, 34]
					}, {
						18: [2, 35],
						28: [2, 35],
						30: [2, 35],
						31: [2, 35],
						32: [2, 35],
						35: [2, 35]
					}, {
						18: [2, 38],
						35: [2, 38]
					}, {
						18: [2, 47],
						28: [2, 47],
						30: [2, 47],
						31: [2, 47],
						32: [2, 47],
						35: [2, 47],
						36: [1, 61],
						39: [2, 47]
					}, {
						35: [1, 62]
					}, {
						5: [2, 10],
						14: [2, 10],
						15: [2, 10],
						16: [2, 10],
						19: [2, 10],
						20: [2, 10],
						22: [2, 10],
						23: [2, 10],
						24: [2, 10]
					}, {
						21: 63,
						35: [1, 27],
						38: 26
					}, {
						5: [2, 11],
						14: [2, 11],
						15: [2, 11],
						16: [2, 11],
						19: [2, 11],
						20: [2, 11],
						22: [2, 11],
						23: [2, 11],
						24: [2, 11]
					}, {
						14: [2, 16],
						15: [2, 16],
						16: [2, 16],
						19: [2, 16],
						20: [2, 16],
						22: [2, 16],
						23: [2, 16],
						24: [2, 16]
					}, {
						5: [2, 19],
						14: [2, 19],
						15: [2, 19],
						16: [2, 19],
						19: [2, 19],
						20: [2, 19],
						22: [2, 19],
						23: [2, 19],
						24: [2, 19]
					}, {
						5: [2, 20],
						14: [2, 20],
						15: [2, 20],
						16: [2, 20],
						19: [2, 20],
						20: [2, 20],
						22: [2, 20],
						23: [2, 20],
						24: [2, 20]
					}, {
						5: [2, 21],
						14: [2, 21],
						15: [2, 21],
						16: [2, 21],
						19: [2, 21],
						20: [2, 21],
						22: [2, 21],
						23: [2, 21],
						24: [2, 21]
					}, {
						18: [1, 64]
					}, {
						18: [2, 24]
					}, {
						18: [2, 29],
						28: [2, 29],
						30: [2, 29],
						31: [2, 29],
						32: [2, 29],
						35: [2, 29]
					}, {
						18: [2, 37],
						35: [2, 37]
					}, {
						36: [1, 61]
					}, {
						21: 65,
						28: [1, 69],
						30: [1, 66],
						31: [1, 67],
						32: [1, 68],
						35: [1, 27],
						38: 26
					}, {
						18: [2, 46],
						28: [2, 46],
						30: [2, 46],
						31: [2, 46],
						32: [2, 46],
						35: [2, 46],
						39: [2, 46]
					}, {
						18: [1, 70]
					}, {
						5: [2, 22],
						14: [2, 22],
						15: [2, 22],
						16: [2, 22],
						19: [2, 22],
						20: [2, 22],
						22: [2, 22],
						23: [2, 22],
						24: [2, 22]
					}, {
						18: [2, 39],
						35: [2, 39]
					}, {
						18: [2, 40],
						35: [2, 40]
					}, {
						18: [2, 41],
						35: [2, 41]
					}, {
						18: [2, 42],
						35: [2, 42]
					}, {
						18: [2, 43],
						35: [2, 43]
					}, {
						5: [2, 18],
						14: [2, 18],
						15: [2, 18],
						16: [2, 18],
						19: [2, 18],
						20: [2, 18],
						22: [2, 18],
						23: [2, 18],
						24: [2, 18]
					}],
					defaultActions: {
						17: [2, 1],
						25: [2, 28],
						38: [2, 26],
						57: [2, 24]
					},
					parseError: function (a) {
						throw Error(a)
					},
					parse: function (a) {
						function c() {
							var a;
							return a = d.lexer.lex() || 1, "number" != typeof a && (a = d.symbols_[a] || a), a
						}
						var d = this,
							e = [0],
							f = [null],
							g = [],
							h = this.table,
							i = "",
							j = 0,
							k = 0,
							l = 0;
						this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, this.lexer.yylloc === b && (this.lexer.yylloc = {});
						var m = this.lexer.yylloc;
						g.push(m);
						var n = this.lexer.options && this.lexer.options.ranges;
						"function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
						for (var o, p, q, r, s, t, u, v, w, x = {};;) {
							if (q = e[e.length - 1], this.defaultActions[q] ? r = this.defaultActions[q] : ((null === o || o === b) && (o = c()), r = h[q] && h[q][o]), r === b || !r.length || !r[0]) {
								var y = "";
								if (!l) {
									w = [];
									for (t in h[q]) this.terminals_[t] && t > 2 && w.push("'" + this.terminals_[t] + "'");
									y = this.lexer.showPosition ? "Parse error on line " + (j + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + w.join(", ") + ", got '" + (this.terminals_[o] || o) + "'" : "Parse error on line " + (j + 1) + ": Unexpected " + (1 == o ? "end of input" : "'" + (this.terminals_[o] || o) + "'"), this.parseError(y, {
										text: this.lexer.match,
										token: this.terminals_[o] || o,
										line: this.lexer.yylineno,
										loc: m,
										expected: w
									})
								}
							}
							if (r[0] instanceof Array && r.length > 1) throw Error("Parse Error: multiple actions possible at state: " + q + ", token: " + o);
							switch (r[0]) {
							case 1:
								e.push(o), f.push(this.lexer.yytext), g.push(this.lexer.yylloc), e.push(r[1]), o = null, p ? (o = p, p = null) : (k = this.lexer.yyleng, i = this.lexer.yytext, j = this.lexer.yylineno, m = this.lexer.yylloc, l > 0 && l--);
								break;
							case 2:
								if (u = this.productions_[r[1]][1], x.$ = f[f.length - u], x._$ = {
									first_line: g[g.length - (u || 1)].first_line,
									last_line: g[g.length - 1].last_line,
									first_column: g[g.length - (u || 1)].first_column,
									last_column: g[g.length - 1].last_column
								}, n && (x._$.range = [g[g.length - (u || 1)].range[0], g[g.length - 1].range[1]]), s = this.performAction.call(x, i, k, j, this.yy, r[1], f, g), s !== b) return s;
								u && (e = e.slice(0, -2 * u), f = f.slice(0, -1 * u), g = g.slice(0, -1 * u)), e.push(this.productions_[r[1]][0]), f.push(x.$), g.push(x._$), v = h[e[e.length - 2]][e[e.length - 1]], e.push(v);
								break;
							case 3:
								return !0
							}
						}
						return !0
					}
				},
					d = function () {
						var a = {
							EOF: 1,
							parseError: function (a, b) {
								if (!this.yy.parser) throw Error(a);
								this.yy.parser.parseError(a, b)
							},
							setInput: function (a) {
								return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
									first_line: 1,
									first_column: 0,
									last_line: 1,
									last_column: 0
								}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
							},
							input: function () {
								var a = this._input[0];
								this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
								var b = a.match(/(?:\r\n?|\n).*/g);
								return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), a
							},
							unput: function (a) {
								var b = a.length,
									c = a.split(/(?:\r\n?|\n)/g);
								this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b - 1), this.offset -= b;
								var d = this.match.split(/(?:\r\n?|\n)/g);
								this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
								var e = this.yylloc.range;
								return this.yylloc = {
									first_line: this.yylloc.first_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.first_column,
									last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
								}, this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - b]), this
							},
							more: function () {
								return this._more = !0, this
							},
							less: function (a) {
								this.unput(this.match.slice(a))
							},
							pastInput: function () {
								var a = this.matched.substr(0, this.matched.length - this.match.length);
								return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
							},
							upcomingInput: function () {
								var a = this.match;
								return 20 > a.length && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
							},
							showPosition: function () {
								var a = this.pastInput(),
									b = Array(a.length + 1).join("-");
								return a + this.upcomingInput() + "\n" + b + "^"
							},
							next: function () {
								if (this.done) return this.EOF;
								this._input || (this.done = !0);
								var a, c, d, e, f;
								this._more || (this.yytext = "", this.match = "");
								for (var g = this._currentRules(), h = 0; g.length > h && (d = this._input.match(this.rules[g[h]]), !d || c && !(d[0].length > c[0].length) || (c = d, e = h, this.options.flex)); h++);
								return c ? (f = c[0].match(/(?:\r\n?|\n).*/g), f && (this.yylineno += f.length), this.yylloc = {
									first_line: this.yylloc.last_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.last_column,
									last_column: f ? f[f.length - 1].length - f[f.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + c[0].length
								}, this.yytext += c[0], this.match += c[0], this.matches = c, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(c[0].length), this.matched += c[0], a = this.performAction.call(this, this.yy, this, g[e], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a ? a : b) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
									text: "",
									token: null,
									line: this.yylineno
								})
							},
							lex: function () {
								var a = this.next();
								return a !== b ? a : this.lex()
							},
							begin: function (a) {
								this.conditionStack.push(a)
							},
							popState: function () {
								return this.conditionStack.pop()
							},
							_currentRules: function () {
								return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
							},
							topState: function () {
								return this.conditionStack[this.conditionStack.length - 2]
							},
							pushState: function (a) {
								this.begin(a)
							}
						};
						return a.options = {}, a.performAction = function (a, b, c) {
							switch (c) {
							case 0:
								return b.yytext = "\\", 14;
							case 1:
								if ("\\" !== b.yytext.slice(-1) && this.begin("mu"), "\\" === b.yytext.slice(-1) && (b.yytext = b.yytext.substr(0, b.yyleng - 1), this.begin("emu")), b.yytext) return 14;
								break;
							case 2:
								return 14;
							case 3:
								return "\\" !== b.yytext.slice(-1) && this.popState(), "\\" === b.yytext.slice(-1) && (b.yytext = b.yytext.substr(0, b.yyleng - 1)), 14;
							case 4:
								return b.yytext = b.yytext.substr(0, b.yyleng - 4), this.popState(), 15;
							case 5:
								return this.begin("par"), 24;
							case 6:
								return 16;
							case 7:
								return 20;
							case 8:
								return 19;
							case 9:
								return 19;
							case 10:
								return 23;
							case 11:
								return 23;
							case 12:
								this.popState(), this.begin("com");
								break;
							case 13:
								return b.yytext = b.yytext.substr(3, b.yyleng - 5), this.popState(), 15;
							case 14:
								return 22;
							case 15:
								return 36;
							case 16:
								return 35;
							case 17:
								return 35;
							case 18:
								return 39;
							case 19:
								break;
							case 20:
								return this.popState(), 18;
							case 21:
								return this.popState(), 18;
							case 22:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\"/g, '"'), 30;
							case 23:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\'/g, "'"), 30;
							case 24:
								return b.yytext = b.yytext.substr(1), 28;
							case 25:
								return 32;
							case 26:
								return 32;
							case 27:
								return 31;
							case 28:
								return 35;
							case 29:
								return b.yytext = b.yytext.substr(1, b.yyleng - 2), 35;
							case 30:
								return "INVALID";
							case 31:
								break;
							case 32:
								return this.popState(), 37;
							case 33:
								return 5
							}
						}, a.rules = [/^(?:\\\\(?=(\{\{)))/, /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[}/ ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$:\-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:\s+)/, /^(?:[a-zA-Z0-9_$\-\/]+)/, /^(?:$)/], a.conditions = {
							mu: {
								rules: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33],
								inclusive: !1
							},
							emu: {
								rules: [3],
								inclusive: !1
							},
							com: {
								rules: [4],
								inclusive: !1
							},
							par: {
								rules: [31, 32],
								inclusive: !1
							},
							INITIAL: {
								rules: [0, 1, 2, 33],
								inclusive: !0
							}
						}, a
					}();
				return c.lexer = d, a.prototype = c, c.Parser = a, new a
			}();
		a.Parser = f, a.parse = function (b) {
			return b.constructor === a.AST.ProgramNode ? b : (a.Parser.yy = a.AST, a.Parser.parse(b))
		}, a.AST = {}, a.AST.ProgramNode = function (b, c) {
			this.type = "program", this.statements = b, c && (this.inverse = new a.AST.ProgramNode(c))
		}, a.AST.MustacheNode = function (a, b, c) {
			this.type = "mustache", this.escaped = !c, this.hash = b;
			var d = this.id = a[0],
				e = this.params = a.slice(1),
				f = this.eligibleHelper = d.isSimple;
			this.isHelper = f && (e.length || b)
		}, a.AST.PartialNode = function (a, b) {
			this.type = "partial", this.partialName = a, this.context = b
		}, a.AST.BlockNode = function (b, c, d, e) {
			var f = function (b, c) {
					if (b.original !== c.original) throw new a.Exception(b.original + " doesn't match " + c.original)
				};
			f(b.id, e), this.type = "block", this.mustache = b, this.program = c, this.inverse = d, this.inverse && !this.program && (this.isInverse = !0)
		}, a.AST.ContentNode = function (a) {
			this.type = "content", this.string = a
		}, a.AST.HashNode = function (a) {
			this.type = "hash", this.pairs = a
		}, a.AST.IdNode = function (b) {
			this.type = "ID", this.original = b.join(".");
			for (var c = [], d = 0, e = 0, f = b.length; f > e; e++) {
				var g = b[e];
				if (".." === g || "." === g || "this" === g) {
					if (c.length > 0) throw new a.Exception("Invalid path: " + this.original);
					".." === g ? d++ : this.isScoped = !0
				} else c.push(g)
			}
			this.parts = c, this.string = c.join("."), this.depth = d, this.isSimple = 1 === b.length && !this.isScoped && 0 === d, this.stringModeValue = this.string
		}, a.AST.PartialNameNode = function (a) {
			this.type = "PARTIAL_NAME", this.name = a
		}, a.AST.DataNode = function (a) {
			this.type = "DATA", this.id = a
		}, a.AST.StringNode = function (a) {
			this.type = "STRING", this.string = a, this.stringModeValue = a
		}, a.AST.IntegerNode = function (a) {
			this.type = "INTEGER", this.integer = a, this.stringModeValue = Number(a)
		}, a.AST.BooleanNode = function (a) {
			this.type = "BOOLEAN", this.bool = a, this.stringModeValue = "true" === a
		}, a.AST.CommentNode = function (a) {
			this.type = "comment", this.comment = a
		};
		var g = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
		a.Exception = function () {
			for (var a = Error.prototype.constructor.apply(this, arguments), b = 0; g.length > b; b++) this[g[b]] = a[g[b]]
		}, a.Exception.prototype = Error(), a.SafeString = function (a) {
			this.string = a
		}, a.SafeString.prototype.toString = function () {
			return "" + this.string
		};
		var h = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"`": "&#x60;"
		},
			i = /[&<>"'`]/g,
			j = /[&<>"'`]/,
			k = function (a) {
				return h[a] || "&amp;"
			};
		a.Utils = {
			extend: function (a, b) {
				for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
			},
			escapeExpression: function (b) {
				return b instanceof a.SafeString ? "" + b : null == b || b === !1 ? "" : (b = "" + b, j.test(b) ? b.replace(i, k) : b)
			},
			isEmpty: function (a) {
				return a || 0 === a ? "[object Array]" === c.call(a) && 0 === a.length ? !0 : !1 : !0
			}
		};
		var l = a.Compiler = function () {},
			m = a.JavaScriptCompiler = function () {};
		l.prototype = {
			compiler: l,
			disassemble: function () {
				for (var a, b, c, d = this.opcodes, e = [], f = 0, g = d.length; g > f; f++) if (a = d[f], "DECLARE" === a.opcode) e.push("DECLARE " + a.name + "=" + a.value);
				else {
					b = [];
					for (var h = 0; a.args.length > h; h++) c = a.args[h], "string" == typeof c && (c = '"' + c.replace("\n", "\\n") + '"'), b.push(c);
					e.push(a.opcode + " " + b.join(" "))
				}
				return e.join("\n")
			},
			equals: function (a) {
				var b = this.opcodes.length;
				if (a.opcodes.length !== b) return !1;
				for (var c = 0; b > c; c++) {
					var d = this.opcodes[c],
						e = a.opcodes[c];
					if (d.opcode !== e.opcode || d.args.length !== e.args.length) return !1;
					for (var f = 0; d.args.length > f; f++) if (d.args[f] !== e.args[f]) return !1
				}
				if (b = this.children.length, a.children.length !== b) return !1;
				for (c = 0; b > c; c++) if (!this.children[c].equals(a.children[c])) return !1;
				return !0
			},
			guid: 0,
			compile: function (a, b) {
				this.children = [], this.depths = {
					list: []
				}, this.options = b;
				var c = this.options.knownHelpers;
				if (this.options.knownHelpers = {
					helperMissing: !0,
					blockHelperMissing: !0,
					each: !0,
					"if": !0,
					unless: !0,
					"with": !0,
					log: !0
				}, c) for (var d in c) this.options.knownHelpers[d] = c[d];
				return this.program(a)
			},
			accept: function (a) {
				return this[a.type](a)
			},
			program: function (a) {
				var b, c = a.statements;
				this.opcodes = [];
				for (var d = 0, e = c.length; e > d; d++) b = c[d], this[b.type](b);
				return this.isSimple = 1 === e, this.depths.list = this.depths.list.sort(function (a, b) {
					return a - b
				}), this
			},
			compileProgram: function (a) {
				var b, c = (new this.compiler).compile(a, this.options),
					d = this.guid++;
				this.usePartial = this.usePartial || c.usePartial, this.children[d] = c;
				for (var e = 0, f = c.depths.list.length; f > e; e++) b = c.depths.list[e], 2 > b || this.addDepth(b - 1);
				return d
			},
			block: function (a) {
				var b = a.mustache,
					c = a.program,
					d = a.inverse;
				c && (c = this.compileProgram(c)), d && (d = this.compileProgram(d));
				var e = this.classifyMustache(b);
				"helper" === e ? this.helperMustache(b, c, d) : "simple" === e ? (this.simpleMustache(b), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(b, c, d), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
			},
			hash: function (a) {
				var b, c, d = a.pairs;
				this.opcode("pushHash");
				for (var e = 0, f = d.length; f > e; e++) b = d[e], c = b[1], this.options.stringParams ? (c.depth && this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.stringModeValue, c.type)) : this.accept(c), this.opcode("assignToHash", b[0]);
				this.opcode("popHash")
			},
			partial: function (a) {
				var b = a.partialName;
				this.usePartial = !0, a.context ? this.ID(a.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", b.name), this.opcode("append")
			},
			content: function (a) {
				this.opcode("appendContent", a.string)
			},
			mustache: function (a) {
				var b = this.options,
					c = this.classifyMustache(a);
				"simple" === c ? this.simpleMustache(a) : "helper" === c ? this.helperMustache(a) : this.ambiguousMustache(a), a.escaped && !b.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
			},
			ambiguousMustache: function (a, b, c) {
				var d = a.id,
					e = d.parts[0],
					f = null != b || null != c;
				this.opcode("getContext", d.depth), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("invokeAmbiguous", e, f)
			},
			simpleMustache: function (a) {
				var b = a.id;
				"DATA" === b.type ? this.DATA(b) : b.parts.length ? this.ID(b) : (this.addDepth(b.depth), this.opcode("getContext", b.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
			},
			helperMustache: function (a, b, c) {
				var d = this.setupFullMustacheParams(a, b, c),
					e = a.id.parts[0];
				if (this.options.knownHelpers[e]) this.opcode("invokeKnownHelper", d.length, e);
				else {
					if (this.options.knownHelpersOnly) throw Error("You specified knownHelpersOnly, but used the unknown helper " + e);
					this.opcode("invokeHelper", d.length, e)
				}
			},
			ID: function (a) {
				this.addDepth(a.depth), this.opcode("getContext", a.depth);
				var b = a.parts[0];
				b ? this.opcode("lookupOnContext", a.parts[0]) : this.opcode("pushContext");
				for (var c = 1, d = a.parts.length; d > c; c++) this.opcode("lookup", a.parts[c])
			},
			DATA: function (a) {
				this.options.data = !0, this.opcode("lookupData", a.id)
			},
			STRING: function (a) {
				this.opcode("pushString", a.string)
			},
			INTEGER: function (a) {
				this.opcode("pushLiteral", a.integer)
			},
			BOOLEAN: function (a) {
				this.opcode("pushLiteral", a.bool)
			},
			comment: function () {},
			opcode: function (a) {
				this.opcodes.push({
					opcode: a,
					args: [].slice.call(arguments, 1)
				})
			},
			declare: function (a, b) {
				this.opcodes.push({
					opcode: "DECLARE",
					name: a,
					value: b
				})
			},
			addDepth: function (a) {
				if (isNaN(a)) throw Error("EWOT");
				0 !== a && (this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a)))
			},
			classifyMustache: function (a) {
				var b = a.isHelper,
					c = a.eligibleHelper,
					d = this.options;
				if (c && !b) {
					var e = a.id.parts[0];
					d.knownHelpers[e] ? b = !0 : d.knownHelpersOnly && (c = !1)
				}
				return b ? "helper" : c ? "ambiguous" : "simple"
			},
			pushParams: function (a) {
				for (var b, c = a.length; c--;) b = a[c], this.options.stringParams ? (b.depth && this.addDepth(b.depth), this.opcode("getContext", b.depth || 0), this.opcode("pushStringParam", b.stringModeValue, b.type)) : this[b.type](b)
			},
			setupMustacheParams: function (a) {
				var b = a.params;
				return this.pushParams(b), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), b
			},
			setupFullMustacheParams: function (a, b, c) {
				var d = a.params;
				return this.pushParams(d), this.opcode("pushProgram", b), this.opcode("pushProgram", c), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), d
			}
		};
		var n = function (a) {
				this.value = a
			};
		m.prototype = {
			nameLookup: function (a, b) {
				return /^[0-9]+$/.test(b) ? a + "[" + b + "]" : m.isValidJavaScriptVariableName(b) ? a + "." + b : a + "['" + b + "']"
			},
			appendToBuffer: function (a) {
				return this.environment.isSimple ? "return " + a + ";" : {
					appendToBuffer: !0,
					content: a,
					toString: function () {
						return "buffer += " + a + ";"
					}
				}
			},
			initializeBuffer: function () {
				return this.quotedString("")
			},
			namespace: "Handlebars",
			compile: function (b, c, d, e) {
				this.environment = b, this.options = c || {}, a.log(a.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !! d, this.context = d || {
					programs: [],
					environments: [],
					aliases: {}
				}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {
					list: []
				}, this.compileStack = [], this.inlineStack = [], this.compileChildren(b, c);
				var f, g = b.opcodes;
				for (this.i = 0, r = g.length; r > this.i; this.i++) f = g[this.i], "DECLARE" === f.opcode ? this[f.name] = f.value : this[f.opcode].apply(this, f.args);
				return this.createFunctionContext(e)
			},
			nextOpcode: function () {
				var a = this.environment.opcodes;
				return a[this.i + 1]
			},
			eat: function () {
				this.i = this.i + 1
			},
			preamble: function () {
				var a = [];
				if (this.isChild) a.push("");
				else {
					var b = this.namespace,
						c = "helpers = helpers || " + b + ".helpers;";
					this.environment.usePartial && (c = c + " partials = partials || " + b + ".partials;"), this.options.data && (c += " data = data || {};"), a.push(c)
				}
				this.environment.isSimple ? a.push("") : a.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = a
			},
			createFunctionContext: function (b) {
				var c = this.stackVars.concat(this.registers.list);
				if (c.length > 0 && (this.source[1] = this.source[1] + ", " + c.join(", ")), !this.isChild) for (var d in this.context.aliases) this.source[1] = this.source[1] + ", " + d + "=" + this.context.aliases[d];
				this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
				for (var e = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"], f = 0, g = this.environment.depths.list.length; g > f; f++) e.push("depth" + this.environment.depths.list[f]);
				var h = this.mergeSource();
				if (!this.isChild) {
					var i = a.COMPILER_REVISION,
						j = a.REVISION_CHANGES[i];
					h = "this.compilerInfo = [" + i + ",'" + j + "'];\n" + h
				}
				if (b) return e.push(h), Function.apply(this, e);
				var k = "function " + (this.name || "") + "(" + e.join(",") + ") {\n  " + h + "}";
				return a.log(a.logger.DEBUG, k + "\n\n"), k
			},
			mergeSource: function () {
				for (var a, c = "", d = 0, e = this.source.length; e > d; d++) {
					var f = this.source[d];
					f.appendToBuffer ? a = a ? a + "\n    + " + f.content : f.content : (a && (c += "buffer += " + a + ";\n  ", a = b), c += f + "\n  ")
				}
				return c
			},
			blockValue: function () {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var a = ["depth0"];
				this.setupParams(0, a), this.replaceStack(function (b) {
					return a.splice(1, 0, b), "blockHelperMissing.call(" + a.join(", ") + ")"
				})
			},
			ambiguousBlockValue: function () {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var a = ["depth0"];
				this.setupParams(0, a);
				var b = this.topStack();
				a.splice(1, 0, b), a[a.length - 1] = "options", this.source.push("if (!" + this.lastHelper + ") { " + b + " = blockHelperMissing.call(" + a.join(", ") + "); }")
			},
			appendContent: function (a) {
				this.source.push(this.appendToBuffer(this.quotedString(a)))
			},
			append: function () {
				this.flushInline();
				var a = this.popStack();
				this.source.push("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
			},
			appendEscaped: function () {
				this.context.aliases.escapeExpression = "this.escapeExpression", this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
			},
			getContext: function (a) {
				this.lastContext !== a && (this.lastContext = a)
			},
			lookupOnContext: function (a) {
				this.push(this.nameLookup("depth" + this.lastContext, a, "context"))
			},
			pushContext: function () {
				this.pushStackLiteral("depth" + this.lastContext)
			},
			resolvePossibleLambda: function () {
				this.context.aliases.functionType = '"function"', this.replaceStack(function (a) {
					return "typeof " + a + " === functionType ? " + a + ".apply(depth0) : " + a
				})
			},
			lookup: function (a) {
				this.replaceStack(function (b) {
					return b + " == null || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context")
				})
			},
			lookupData: function (a) {
				this.push(this.nameLookup("data", a, "data"))
			},
			pushStringParam: function (a, b) {
				this.pushStackLiteral("depth" + this.lastContext), this.pushString(b), "string" == typeof a ? this.pushString(a) : this.pushStackLiteral(a)
			},
			emptyHash: function () {
				this.pushStackLiteral("{}"), this.options.stringParams && (this.register("hashTypes", "{}"), this.register("hashContexts", "{}"))
			},
			pushHash: function () {
				this.hash = {
					values: [],
					types: [],
					contexts: []
				}
			},
			popHash: function () {
				var a = this.hash;
				this.hash = b, this.options.stringParams && (this.register("hashContexts", "{" + a.contexts.join(",") + "}"), this.register("hashTypes", "{" + a.types.join(",") + "}")), this.push("{\n    " + a.values.join(",\n    ") + "\n  }")
			},
			pushString: function (a) {
				this.pushStackLiteral(this.quotedString(a))
			},
			push: function (a) {
				return this.inlineStack.push(a), a
			},
			pushLiteral: function (a) {
				this.pushStackLiteral(a)
			},
			pushProgram: function (a) {
				null != a ? this.pushStackLiteral(this.programExpression(a)) : this.pushStackLiteral(null)
			},
			invokeHelper: function (a, b) {
				this.context.aliases.helperMissing = "helpers.helperMissing";
				var c = this.lastHelper = this.setupHelper(a, b, !0);
				this.push(c.name), this.replaceStack(function (a) {
					return a + " ? " + a + ".call(" + c.callParams + ") " + ": helperMissing.call(" + c.helperMissingParams + ")"
				})
			},
			invokeKnownHelper: function (a, b) {
				var c = this.setupHelper(a, b);
				this.push(c.name + ".call(" + c.callParams + ")")
			},
			invokeAmbiguous: function (a, b) {
				this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
				var c = this.setupHelper(0, a, b),
					d = this.lastHelper = this.nameLookup("helpers", a, "helper"),
					e = this.nameLookup("depth" + this.lastContext, a, "context"),
					f = this.nextStack();
				this.source.push("if (" + f + " = " + d + ") { " + f + " = " + f + ".call(" + c.callParams + "); }"), this.source.push("else { " + f + " = " + e + "; " + f + " = typeof " + f + " === functionType ? " + f + ".apply(depth0) : " + f + "; }")
			},
			invokePartial: function (a) {
				var b = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"];
				this.options.data && b.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + b.join(", ") + ")")
			},
			assignToHash: function (a) {
				var b, c, d = this.popStack();
				this.options.stringParams && (c = this.popStack(), b = this.popStack());
				var e = this.hash;
				b && e.contexts.push("'" + a + "': " + b), c && e.types.push("'" + a + "': " + c), e.values.push("'" + a + "': (" + d + ")")
			},
			compiler: m,
			compileChildren: function (a, b) {
				for (var c, d, e = a.children, f = 0, g = e.length; g > f; f++) {
					c = e[f], d = new this.compiler;
					var h = this.matchExistingProgram(c);
					null == h ? (this.context.programs.push(""), h = this.context.programs.length, c.index = h, c.name = "program" + h, this.context.programs[h] = d.compile(c, b, this.context), this.context.environments[h] = c) : (c.index = h, c.name = "program" + h)
				}
			},
			matchExistingProgram: function (a) {
				for (var b = 0, c = this.context.environments.length; c > b; b++) {
					var d = this.context.environments[b];
					if (d && d.equals(a)) return b
				}
			},
			programExpression: function (a) {
				if (this.context.aliases.self = "this", null == a) return "self.noop";
				for (var b, c = this.environment.children[a], d = c.depths.list, e = [c.index, c.name, "data"], f = 0, g = d.length; g > f; f++) b = d[f], 1 === b ? e.push("depth0") : e.push("depth" + (b - 1));
				return (0 === d.length ? "self.program(" : "self.programWithDepth(") + e.join(", ") + ")"
			},
			register: function (a, b) {
				this.useRegister(a), this.source.push(a + " = " + b + ";")
			},
			useRegister: function (a) {
				this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
			},
			pushStackLiteral: function (a) {
				return this.push(new n(a))
			},
			pushStack: function (a) {
				this.flushInline();
				var b = this.incrStack();
				return a && this.source.push(b + " = " + a + ";"), this.compileStack.push(b), b
			},
			replaceStack: function (a) {
				var b, c = "",
					d = this.isInline();
				if (d) {
					var e = this.popStack(!0);
					if (e instanceof n) b = e.value;
					else {
						var f = this.stackSlot ? this.topStackName() : this.incrStack();
						c = "(" + this.push(f) + " = " + e + "),", b = this.topStack()
					}
				} else b = this.topStack();
				var g = a.call(this, b);
				return d ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), this.push("(" + c + g + ")")) : (/^stack/.test(b) || (b = this.nextStack()), this.source.push(b + " = (" + c + g + ");")), b
			},
			nextStack: function () {
				return this.pushStack()
			},
			incrStack: function () {
				return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
			},
			topStackName: function () {
				return "stack" + this.stackSlot
			},
			flushInline: function () {
				var a = this.inlineStack;
				if (a.length) {
					this.inlineStack = [];
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						d instanceof n ? this.compileStack.push(d) : this.pushStack(d)
					}
				}
			},
			isInline: function () {
				return this.inlineStack.length
			},
			popStack: function (a) {
				var b = this.isInline(),
					c = (b ? this.inlineStack : this.compileStack).pop();
				return !a && c instanceof n ? c.value : (b || this.stackSlot--, c)
			},
			topStack: function (a) {
				var b = this.isInline() ? this.inlineStack : this.compileStack,
					c = b[b.length - 1];
				return !a && c instanceof n ? c.value : c
			},
			quotedString: function (a) {
				return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
			},
			setupHelper: function (a, b, c) {
				var d = [];
				this.setupParams(a, d, c);
				var e = this.nameLookup("helpers", b, "helper");
				return {
					params: d,
					name: e,
					callParams: ["depth0"].concat(d).join(", "),
					helperMissingParams: c && ["depth0", this.quotedString(b)].concat(d).join(", ")
				}
			},
			setupParams: function (a, b, c) {
				var d, e, f, g = [],
					h = [],
					i = [];
				g.push("hash:" + this.popStack()), e = this.popStack(), f = this.popStack(), (f || e) && (f || (this.context.aliases.self = "this", f = "self.noop"), e || (this.context.aliases.self = "this", e = "self.noop"), g.push("inverse:" + e), g.push("fn:" + f));
				for (var j = 0; a > j; j++) d = this.popStack(), b.push(d), this.options.stringParams && (i.push(this.popStack()), h.push(this.popStack()));
				return this.options.stringParams && (g.push("contexts:[" + h.join(",") + "]"), g.push("types:[" + i.join(",") + "]"), g.push("hashContexts:hashContexts"), g.push("hashTypes:hashTypes")), this.options.data && g.push("data:data"), g = "{" + g.join(",") + "}", c ? (this.register("options", g), b.push("options")) : b.push(g), b.join(", ")
			}
		};
		for (var o = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), p = m.RESERVED_WORDS = {}, q = 0, r = o.length; r > q; q++) p[o[q]] = !0;
		m.isValidJavaScriptVariableName = function (a) {
			return !m.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1
		}, a.precompile = function (b, c) {
			if (null == b || "string" != typeof b && b.constructor !== a.AST.ProgramNode) throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + b);
			c = c || {}, "data" in c || (c.data = !0);
			var d = a.parse(b),
				e = (new l).compile(d, c);
			return (new m).compile(e, c)
		}, a.compile = function (c, d) {
			function e() {
				var e = a.parse(c),
					f = (new l).compile(e, d),
					g = (new m).compile(f, d, b, !0);
				return a.template(g)
			}
			if (null == c || "string" != typeof c && c.constructor !== a.AST.ProgramNode) throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + c);
			d = d || {}, "data" in d || (d.data = !0);
			var f;
			return function (a, b) {
				return f || (f = e()), f.call(this, a, b)
			}
		}, a.VM = {
			template: function (b) {
				var c = {
					escapeExpression: a.Utils.escapeExpression,
					invokePartial: a.VM.invokePartial,
					programs: [],
					program: function (b, c, d) {
						var e = this.programs[b];
						return d ? e = a.VM.program(b, c, d) : e || (e = this.programs[b] = a.VM.program(b, c)), e
					},
					programWithDepth: a.VM.programWithDepth,
					noop: a.VM.noop,
					compilerInfo: null
				};
				return function (d, e) {
					e = e || {};
					var f = b.call(c, a, d, e.helpers, e.partials, e.data),
						g = c.compilerInfo || [],
						h = g[0] || 1,
						i = a.COMPILER_REVISION;
					if (h !== i) {
						if (i > h) {
							var j = a.REVISION_CHANGES[i],
								k = a.REVISION_CHANGES[h];
							throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ")."
						}
						throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + g[1] + ")."
					}
					return f
				}
			},
			programWithDepth: function (a, b, c) {
				var d = Array.prototype.slice.call(arguments, 3),
					e = function (a, e) {
						return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
					};
				return e.program = a, e.depth = d.length, e
			},
			program: function (a, b, c) {
				var d = function (a, d) {
						return d = d || {}, b(a, d.data || c)
					};
				return d.program = a, d.depth = 0, d
			},
			noop: function () {
				return ""
			},
			invokePartial: function (c, d, e, f, g, h) {
				var i = {
					helpers: f,
					partials: g,
					data: h
				};
				if (c === b) throw new a.Exception("The partial " + d + " could not be found");
				if (c instanceof Function) return c(e, i);
				if (a.compile) return g[d] = a.compile(c, {
					data: h !== b
				}), g[d](e, i);
				throw new a.Exception("The partial " + d + " could not be compiled when running in runtime-only mode")
			}
		}, a.template = a.VM.template
	}(d), c.exports = d
}), define("gallery/handlebars/1.0.2/runtime", [], function (a, b, c) {
	var d = {};
	!
	function (a, b) {
		a.VERSION = "1.0.0-rc.4", a.COMPILER_REVISION = 3, a.REVISION_CHANGES = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: ">= 1.0.0-rc.4"
		}, a.helpers = {}, a.partials = {};
		var c = Object.prototype.toString,
			d = "[object Function]",
			e = "[object Object]";
		a.registerHelper = function (b, d, f) {
			if (c.call(b) === e) {
				if (f || d) throw new a.Exception("Arg not supported with multiple helpers");
				a.Utils.extend(this.helpers, b)
			} else f && (d.not = f), this.helpers[b] = d
		}, a.registerPartial = function (b, d) {
			c.call(b) === e ? a.Utils.extend(this.partials, b) : this.partials[b] = d
		}, a.registerHelper("helperMissing", function (a) {
			if (2 === arguments.length) return b;
			throw Error("Could not find property '" + a + "'")
		}), a.registerHelper("blockHelperMissing", function (b, e) {
			var f = e.inverse ||
			function () {}, g = e.fn, h = c.call(b);
			return h === d && (b = b.call(this)), b === !0 ? g(this) : b === !1 || null == b ? f(this) : "[object Array]" === h ? b.length > 0 ? a.helpers.each(b, e) : f(this) : g(b)
		}), a.K = function () {}, a.createFrame = Object.create ||
		function (b) {
			a.K.prototype = b;
			var c = new a.K;
			return a.K.prototype = null, c
		}, a.logger = {
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 3,
			methodMap: {
				0: "debug",
				1: "info",
				2: "warn",
				3: "error"
			},
			log: function (b, c) {
				if (b >= a.logger.level) {
					var d = a.logger.methodMap[b];
					"undefined" != typeof console && console[d] && console[d].call(console, c)
				}
			}
		}, a.log = function (b, c) {
			a.logger.log(b, c)
		}, a.registerHelper("each", function (b, c) {
			var d, e = c.fn,
				f = c.inverse,
				g = 0,
				h = "";
			if (c.data && (d = a.createFrame(c.data)), b && "object" == typeof b) if (b instanceof Array) for (var i = b.length; i > g; g++) d && (d.index = g), h += e(b[g], {
				data: d
			});
			else for (var j in b) b.hasOwnProperty(j) && (d && (d.key = j), h += e(b[j], {
				data: d
			}), g++);
			return 0 === g && (h = f(this)), h
		}), a.registerHelper("if", function (b, e) {
			var f = c.call(b);
			return f === d && (b = b.call(this)), !b || a.Utils.isEmpty(b) ? e.inverse(this) : e.fn(this)
		}), a.registerHelper("unless", function (b, c) {
			return a.helpers["if"].call(this, b, {
				fn: c.inverse,
				inverse: c.fn
			})
		}), a.registerHelper("with", function (c, d) {
			return a.Utils.isEmpty(c) ? b : d.fn(c)
		}), a.registerHelper("log", function (b, c) {
			var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
			a.log(d, b)
		});
		var f = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
		a.Exception = function () {
			for (var a = Error.prototype.constructor.apply(this, arguments), b = 0; f.length > b; b++) this[f[b]] = a[f[b]]
		}, a.Exception.prototype = Error(), a.SafeString = function (a) {
			this.string = a
		}, a.SafeString.prototype.toString = function () {
			return "" + this.string
		};
		var g = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"`": "&#x60;"
		},
			h = /[&<>"'`]/g,
			i = /[&<>"'`]/,
			j = function (a) {
				return g[a] || "&amp;"
			};
		a.Utils = {
			extend: function (a, b) {
				for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
			},
			escapeExpression: function (b) {
				return b instanceof a.SafeString ? "" + b : null == b || b === !1 ? "" : (b = "" + b, i.test(b) ? b.replace(h, j) : b)
			},
			isEmpty: function (a) {
				return a || 0 === a ? "[object Array]" === c.call(a) && 0 === a.length ? !0 : !1 : !0
			}
		}, a.VM = {
			template: function (b) {
				var c = {
					escapeExpression: a.Utils.escapeExpression,
					invokePartial: a.VM.invokePartial,
					programs: [],
					program: function (b, c, d) {
						var e = this.programs[b];
						return d ? e = a.VM.program(b, c, d) : e || (e = this.programs[b] = a.VM.program(b, c)), e
					},
					programWithDepth: a.VM.programWithDepth,
					noop: a.VM.noop,
					compilerInfo: null
				};
				return function (d, e) {
					e = e || {};
					var f = b.call(c, a, d, e.helpers, e.partials, e.data),
						g = c.compilerInfo || [],
						h = g[0] || 1,
						i = a.COMPILER_REVISION;
					if (h !== i) {
						if (i > h) {
							var j = a.REVISION_CHANGES[i],
								k = a.REVISION_CHANGES[h];
							throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ")."
						}
						throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + g[1] + ")."
					}
					return f
				}
			},
			programWithDepth: function (a, b, c) {
				var d = Array.prototype.slice.call(arguments, 3),
					e = function (a, e) {
						return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
					};
				return e.program = a, e.depth = d.length, e
			},
			program: function (a, b, c) {
				var d = function (a, d) {
						return d = d || {}, b(a, d.data || c)
					};
				return d.program = a, d.depth = 0, d
			},
			noop: function () {
				return ""
			},
			invokePartial: function (c, d, e, f, g, h) {
				var i = {
					helpers: f,
					partials: g,
					data: h
				};
				if (c === b) throw new a.Exception("The partial " + d + " could not be found");
				if (c instanceof Function) return c(e, i);
				if (a.compile) return g[d] = a.compile(c, {
					data: h !== b
				}), g[d](e, i);
				throw new a.Exception("The partial " + d + " could not be compiled when running in runtime-only mode")
			}
		}, a.template = a.VM.template
	}(d), c.exports = d
}), define("alipay/object-shim/1.0.0/object-shim", ["$"], function (a, b, c) {
	function d(a, b) {
		if (this.target = f(a.element || a).eq(0), this.className = b || "alieditContainer", e(a)) {
			var c = this;
			this._callbacks = {
				show: function () {
					c.hide()
				},
				hide: function () {
					c.show()
				}
			}, this._overlay = a, a.after("show", this._callbacks.show), a.after("hide", this._callbacks.hide)
		}
	}
	function e(a) {
		return !(!a._setupShim || !a._setPosition)
	}
	var f = a("$"),
		g = "object-shim-class";
	a("./object-shim.css"), d.prototype.sync = function () {
		var a = this.target;
		return a.length ? (a.outerHeight() && a.outerWidth() && !a.is(":hidden") ? this.hide() : this.show(), this) : this
	}, d.prototype.show = function () {
		return f("." + this.className).removeClass(g), this
	}, d.prototype.hide = function () {
		return f("." + this.className).addClass(g), this
	}, d.prototype.destroy = function () {
		this._callbacks && (this._overlay.off("after:show", this._callbacks.show), this._overlay.off("after:hide", this._callbacks.hide)), this.show()
	}, c.exports = function (a, b) {
		return new d(a, b)
	}
}), define("alipay/object-shim/1.0.0/object-shim.css", [], function () {
	seajs.importStyle("body .object-shim-class{display:inline-block;*display:inline;*zoom:1;height:22px;width:198px;border:1px solid #999}body .object-shim-class object,body .object-shim-class embed{display:none}")
}), define("authcenter/login/1.2.4/js/module/proxyip", ["$", "alipay/storex/1.0.1/storex", "gallery/json/1.0.3/json", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "gallery/store/1.3.7/store"], function (a) {
	"use strict";
	a("$");
	var b = a("alipay/storex/1.0.1/storex"),
		c = function () {
			var a = system.auth.alieditAttrs;
			if (a.alieditPwd) try {
				return a.getCi2()
			} catch (b) {
				return ""
			}
			return ""
		},
		d = function (a, b) {
			Tracker && (Tracker.minInterval = 0, Tracker.click(a + ":" + b), Tracker.minInterval = 1e3)
		},
		e = function () {
			if (b.status().enabled) {
				var a = c(),
					e = b.get("p");
				a && e && e !== a && (b.set("p", a), d("p", a))
			}
		};
	system.auth.proxyid = function () {
		setTimeout(e, 500)
	}
}), define("authcenter/login/1.2.4/js/module/ignoringSpaces", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.ignoringSpaces = function (a) {
		var c = /[ ]/g;
		a.on("keyup", function () {
			var d = a.val();
			b(system.auth.param.loginForm).trigger("IGNORINGSPACES_EVENT_BEFORE", d), null !== d.match(c) && (d = d.replace(c, ""), a.val(d)), b(system.auth.param.loginForm).trigger("IGNORINGSPACES_EVENT_AFTER", d)
		})
	}
}), define("authcenter/login/1.2.4/js/module/refreshCheckCode", ["$", "authcenter/login/1.2.4/js/util/uri"], function (a) {
	"use strict";
	var b = a("$");
	a("authcenter/login/1.2.4/js/util/uri"), system.auth.refreshCheckCode = function () {
		var a = b("#J-checkcode-img"),
			c = a.attr("src"),
			d = system.auth.uri.getParams(c, !0);
		d.t = (new Date).getTime(), a.attr("src", system.auth.uri.setParams(c, d)), system.auth.param.authcode.val(""), b(system.auth.param.loginForm).trigger("REFRESHCHECKCODE_EVENT_AFTER")
	}
}), define("authcenter/login/1.2.4/js/util/uri", ["$"], function (a) {
	"use strict";
	var b = a("$"),
		c = /^(http(s)?:\/\/)?[a-zA-Z.]*((\/)?[^?#]*)/,
		d = /\?([^#]*)(#.*)?/,
		e = /(https|http)\:\/\/((\w+|\.)+)/,
		f = /(\w+|\.)+/;
	system.auth.uri = function () {}, system.auth.uri.getPath = function (a) {
		if (c.test(a)) {
			var b = /^(http(s)?:\/\/)?[a-zA-Z.]*(:\d*)?((\/)?[^?#]*)/.exec(a)[4];
			return b ? b : "/"
		}
		return null
	}, system.auth.uri.getPort = function (a) {
		return /\:(\d+)/.test(a) ? /\:(\d+)/.exec(a)[1] : "80"
	}, system.auth.uri.getHost = function (a, b) {
		var c = system.auth.uri.getHostName(a),
			d = system.auth.uri.getPort(a);
		return b && "80" == d ? c : c + ":" + d
	}, system.auth.uri.getHostName = function (a) {
		return e.test(a) ? e.exec(a)[2] : f.test(a) ? f.exec(a)[0] : null
	}, system.auth.uri.getProtocol = function (a) {
		var b = /^http|^https/,
			c = /^http\:|^https\:/;
		return b.test(a) ? c.exec(a)[0].replace(":", "") : null
	}, system.auth.uri.getParams = function (a, b) {
		var c = {},
			e = d.exec(a);
		if (e && e.length && e.length >= 2) {
			e = e[1].split("&");
			for (var f; f = e.shift();) f.split("=").length > 1 && (c[f.split("=")[0]] = f.split("=")[1]);
			return b ? c : system.auth.uri.toQueryString(c)
		}
		return b ? {} : null
	}, system.auth.uri.getHash = function (a) {
		var c = a || window.location.hash;
		return "#" == c.charAt(0) ? c = c.substring(1) : c.lastIndexOf("#") > -1 && (c = c.substring(c.lastIndexOf("#") + 1)), b.browser.mozilla ? c : decodeURIComponent(c)
	}, system.auth.uri.setParams = function (a, b) {
		var c, d = system.auth.uri.getParams(a, !0),
			e = [];
		if ("object" == typeof b) for (c in b) d[c] = b[c];
		for (c in d) e.push(c + "=" + d[c]);
		if (system.auth.uri.getProtocol(a)) var f = system.auth.uri.getProtocol(a) + "://";
		else var f = "";
		return f + system.auth.uri.getHost(a, !0) + system.auth.uri.getPath(a) + "?" + e.join("&")
	}, system.auth.uri.toQueryString = function (a) {
		var c = [];
		return b.each(a, function (a, b) {
			c.push(a + "=" + b)
		}), c.join("&")
	}
}), define("authcenter/login/1.2.4/js/module/realtimeCheckcode", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.realtimeCheckcode = function (a) {
		this.init();
		for (var b in a) this[b] = a[b];
		return this.form && this.form.length < 1 || this.checkcode && this.checkcode.length < 1 || this.checkcodeIcon && this.checkcodeIcon.length < 1 ? !1 : (this.bindEvent(), this.submitAspect(), void 0)
	}, system.auth.realtimeCheckcode.prototype = {
		form: null,
		checkcodeServer: "verifyCheckCode.json",
		checkcode: null,
		checkcodeIcon: null,
		result: !1,
		count: 0,
		errorCount: 0,
		timeout: 2e3,
		invalidTime: 54e4,
		initialTime: (new Date).getTime(),
		nowTime: null,
		isInvalid: !1,
		isChecking: !1,
		nowValue: null,
		formSubmit_: null,
		sucDOM: '<i class="iconfont" title="成功">&#xF049;</i>',
		errDOM: '<i class="iconfont" title="出错">&#xF045;</i>',
		init: function () {
			this.form = b("#login") && b("#login")[0], this.checkcode = b("#J-input-checkcode"), this.checkcodeIcon = b("#J-checkcodeIcon"), b("input[name=idPrefix]").length > 0 && (this.idPrefixValue = b("input[name=idPrefix]").val())
		},
		request: function (a) {
			var c = this;
			return c.checkReset(), c.count++, c.nowTime = (new Date).getTime(), c.isInvalid = c.nowTime - c.initialTime > c.invalidTime ? !0 : !1, c.count > 5 || c.isInvalid ? !1 : (c.isChecking = !0, c.nowValue = a, b.ajax({
				type: "POST",
				url: c.checkcodeServer,
				data: {
					checkCode: a,
					idPrefix: c.idPrefixValue,
					timestamp: (new Date).getTime()
				},
				dataType: "json",
				timeout: c.timeout,
				success: function (a) {
					c.successCallback.call(c, a)
				},
				error: function () {
					c.failureCallback()
				}
			}), void 0)
		},
		successCallback: function (a) {
			return this.isChecking ? (null === a.checkResult ? this.checkTimeout() : "true" === a.checkResult ? (this.formSubmit_ && this.submitForm(), this.checkcodeIcon.addClass("sl-checkcode-suc"), b(this.sucDOM).appendTo(this.checkcodeIcon), this.result = !0) : (this.errorCount++, this.checkcodeIcon.addClass("sl-checkcode-err"), b(this.errDOM).appendTo(this.checkcodeIcon), this.checkcode[0].focus(), this.result = !1, this.formSubmit_ = null, system.auth.log("track", "realtimeCheckcode_errorCount_" + this.errorCount)), void 0) : !1
		},
		failureCallback: function () {
			return this.isChecking ? (this.formSubmit_ ? this.submitForm() : this.checkTimeout(), system.auth.log("track", "realtimeCheckcode_serverFailure"), void 0) : !1
		},
		checkTimeout: function () {
			this.result = !0
		},
		checkReset: function () {
			this.checkcodeIcon.removeClass("sl-checkcode-err"), this.checkcodeIcon.removeClass("sl-checkcode-suc"), this.checkcodeIcon.empty(), this.result = !1, this.formSubmit_ = null, this.isChecking = !1, this.nowValue = null
		},
		submitAspect: function () {
			var a = this.form.submit,
				c = this;
			this.form.submit = function () {
				c.formSubmit_ = a;
				var d = b(system.auth.param.loginForm).attr("data-qrcode");
				if (b("#J-checkcode").hasClass("fn-hide") || "true" === d) c.submitForm();
				else if (c.count > 5 || c.isInvalid) c.submitForm();
				else if (c.result) c.submitForm();
				else {
					c.checkcode.val() !== c.nowValue ? c.request(c.checkcode.val()) : (c.checkcode[0].focus(), c.checkcodeIcon.hasClass("sl-checkcode-err") && system.auth.log("track", "realtimeCheckcode_X"));
					try {
						b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !1)
					} catch (e) {}
				}
			}
		},
		submitForm: function () {
			var a = this.formSubmit_;
			if (!a) return !1;
			try {
				b(system.auth.param.loginForm).trigger("CLICK_SUBMIT_BUTTON_EVENT", !0)
			} catch (c) {}
			try {
				a()
			} catch (c) {
				a.call(this.form)
			}
		},
		bindEvent: function () {
			var a = this;
			b(system.auth.param.loginForm).on("IGNORINGSPACES_EVENT_AFTER", function (b, c) {
				if (c.length < 4) a.checkReset();
				else if (4 === c.length) {
					if (a.checkcode.attr("data-type") && "VOICE" === a.checkcode.attr("data-type")) return a.result = !0, !0;
					c !== a.nowValue && a.request(c)
				}
			}), b(system.auth.param.loginForm).on("REFRESHCHECKCODE_EVENT_AFTER", function () {
				a.checkReset()
			})
		}
	}
}), define("authcenter/login/1.2.4/js/module/voiceCheckcode", ["$", "arale/tip/1.1.3/tip", "arale/popup/1.1.1/popup", "arale/overlay/1.1.1/overlay", "arale/position/1.0.1/position", "arale/iframe-shim/1.0.2/iframe-shim", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events"], function (a) {
	"use strict";
	var b = a("$"),
		c = a("arale/tip/1.1.3/tip");
	if (b("#J-label-checkcode-pop").length > 0) var d = new c({
		element: "#J-label-checkcode-pop",
		trigger: "#J-label-checkcode",
		pointPos: "50%+2"
	});
	else b("#J-label-checkcode").on("click", function (a) {
		a.preventDefault(), b("#J-input-checkcode")[0].focus()
	});
	system.auth.voiceCheckcode = function (a) {
		this.init();
		for (var c in a) this[c] = a[c];
		return this.checkcodeInput && this.switchCheckCode && this.checkCodeIMG && this.checkCodeVOICE && this.voiceUrl && "" !== this.voiceUrl ? /version\/\d+\.\d+(?:\.[ab\d]+)? safari\//.test(navigator.userAgent.toLowerCase()) ? (d && (d.set("disabled", !0), b("#J-label-checkcode").on("click", function (a) {
			a.preventDefault(), b("#J-input-checkcode")[0].focus()
		})), !1) : (this.bindEvent(), void 0) : !1
	}, system.auth.voiceCheckcode.prototype = {
		checkcodeInput: null,
		switchCheckCode: null,
		checkCodeIMG: null,
		checkCodeVOICE: null,
		voicePressBg: null,
		voicePressTxt: null,
		checkcodeIcon: null,
		voiceUrl: null,
		init: function () {
			this.checkcodeInput = b("#J-input-checkcode"), this.switchCheckCode = b("#J-switchCheckcode"), this.checkCodeIMG = b("#J-checkcode-img"), this.checkCodeVOICE = b("#J-checkcode-voice"), this.voicePressBg = b("#J-checkcode-voice-bg"), this.voicePressTxt = b("#J-checkcode-voice-txt"), this.checkcodeIcon = b("#J-checkcodeIcon"), this.checkCodeVOICE.length > 0 && (this.voiceUrl = this.checkCodeVOICE.attr("data-src"))
		},
		checkReset: function () {
			this.checkcodeInput.val(""), b(system.auth.param.loginForm).trigger("REFRESHCHECKCODE_EVENT_AFTER"), this.checkcodeInput[0].focus()
		},
		voiceHtml: function () {
			var a, b = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6"),
				c = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie");
			try {
				a = "Audio" in window && (new Audio).canPlayType("audio/x-wav;") ?
				function () {
					return "<audio autoplay hidden id='J-bgsound'></audio>"
				} : b ?
				function () {
					return "<bgsound id='J-bgsound' >"
				} : function () {
					return "<embed id='J-bgsound'" + (c ? " type='application/x-mplayer2'" : " type='audio/x-wav'") + " autostart='true' hidden='true' />"
				}
			} catch (d) {
				a = b ?
				function () {
					return "<bgsound id='J-bgsound' >"
				} : function () {
					return "<embed id='J-bgsound'" + (c ? " type='application/x-mplayer2'" : " type='audio/x-wav'") + " autostart='true' hidden='true' />"
				}, system.auth.log("track", "voickCheckcode - " + d)
			}
			return a()
		},
		bindEvent: function () {
			function a() {
				e.switchCheckCode.removeClass("ui-icon-checkcodeV").addClass("ui-icon-checkcodeT"), d.set("content", "点此选择语音验证码"), e.checkCodeIMG.removeClass("fn-hide"), e.checkCodeVOICE.addClass("fn-hide"), e.checkcodeInput.attr("data-type") && e.checkcodeInput.attr("data-type", "IMAGE")
			}
			function c() {
				e.switchCheckCode.removeClass("ui-icon-checkcodeT").addClass("ui-icon-checkcodeV"), d.set("content", "点此选择图片验证码"), e.checkCodeIMG.addClass("fn-hide"), e.checkCodeVOICE.removeClass("fn-hide"), e.checkcodeInput.attr("data-type") && e.checkcodeInput.attr("data-type", "VOICE")
			}
			var e = this;
			e.switchCheckCode.on("click", function (d) {
				d.preventDefault();
				var f = d.target;
				e.checkReset(), b(f).hasClass("ui-icon-checkcodeT") ? (c(), e.playVoice()) : (a(), e.stopPlayVoice(), e.voicePressBg.css({
					width: "0%"
				}))
			}), e.checkCodeVOICE.on("click", function (a) {
				a.preventDefault(), e.checkReset(), e.refreshVoice()
			})
		},
		playVoice: function () {
			var a = this;
			if (b("#J-bgsound").length < 1) {
				var c = null; - 1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6") ? (c = document.createElement("bgsound"), c.id = "J-bgsound") : c = b(a.voiceHtml()), b(c).appendTo(b(document.body))
			}
			if (b("#J-bgsound").attr("src", a.getVoiceUrl()), a.audioSupport) {
				b("#J-bgsound")[0].pause(), b("#J-bgsound")[0].play();
				var d = document.getElementById("J-bgsound");
				d.addEventListener("timeupdate", function () {
					this.duration && 1 / 0 !== this.duration ? a.playVoiceProcess(parseInt(100 * this.currentTime / this.duration, 10)) : a.playVoiceProcess(-1)
				}), d.addEventListener("ended", function () {
					a.playVoiceProcess(100)
				})
			} else a.playVoiceProcess("NOPROCESS")
		},
		getVoiceUrl: function () {
			var a = system.auth.uri.getParams(this.voiceUrl, !0);
			return a.r = (new Date).getTime(), system.auth.uri.setParams(this.voiceUrl, a)
		},
		refreshVoice: function () {
			this.audioSupport ? (b("#J-bgsound").attr("src", this.getVoiceUrl()), b("#J-bgsound")[0].pause(), b("#J-bgsound")[0].play()) : (this.stopPlayVoice(), this.playVoice())
		},
		stopPlayVoice: function () {
			var a = b("#J-bgsound");
			if (this.audioSupport) {
				a[0].pause();
				try {
					a.attr("src", "")
				} catch (c) {}
			} else try {
				b("#J-bgsound").attr("src", ""), b("#J-bgsound").remove()
			} catch (c) {
				system.auth.log("track", "voickCheckcode_stop - " + c)
			}
		},
		audioSupport: function () {
			try {
				return "Audio" in window && (new Audio).canPlayType("audio/x-wav")
			} catch (a) {
				return !1
			}
		}(),
		playVoiceProcess: function (a) {
			switch (a) {
			case -1:
				this.voicePressTxt.html('<i class="ui-icon ui-icon-voicing" title="声音"></i>播放中...');
				break;
			case 100:
			case "NOPROCESS":
				this.voicePressTxt.html('<i class="ui-icon ui-icon-loading" title="加载中"></i>重新播放'), this.voicePressBg.css({
					width: "0%"
				});
				break;
			default:
				this.voicePressTxt.html('<i class="ui-icon ui-icon-voicing" title="声音"></i>播放中...'), this.voicePressBg.css({
					width: a + "%"
				})
			}
		}
	}
}), define("authcenter/login/1.2.4/js/module/alilogin", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.aliLogin = function (a) {
		for (var b in a) this[b] = a[b];
		this.autoLogin ? this.loginTokenRequest() : this.formCont_ && this.loginDom && this.loginNameDom && this.havanaSsoUrl ? this.init() : this.showFormDom()
	}, system.auth.aliLogin.prototype = {
		formCont_: b("#login"),
		loginDom: b("#J-ssoLogin"),
		loginNameDom: b("#J-ssoLogin-name"),
		loginIconDom: b("#J-ssoLogin-icon"),
		loginBtn: b("#J-ssoLogin-btn"),
		changeBtn: b("#J-ssoLogin-change"),
		havanaSsoUrl: null,
		authTokenServer: "havana_trust_login.htm",
		timeout: 1e3,
		tokenValue: "",
		isTokenRequested: !1,
		isHomePage: !1,
		isHomePageShowed: !1,
		siteValue: 1,
		autoLogin: !1,
		site: null,
		gotoUrl: "",
		isShowQRLogin: !1,
		companyList: {
			company_0: "taobao",
			company_3: "cbu",
			company_4: "icbu",
			company_6: "aliyun",
			company_7: "aliyunOS",
			company_8: "aliyun",
			company_9: "aliyun",
			company_10: "taobao"
		},
		init: function () {
			this.blindEvent(), this.loginNameRequest()
		},
		qrSign: function (a) {
			"true" === a ? this.loginDom.attr("data-hide", "true") : this.loginDom.attr("data-hide", "false")
		},
		blindEvent: function () {
			var a = this;
			this.changeBtn.click(function (b) {
				b.preventDefault(), a.showFormDom(), a.qrSign("true")
			}), this.loginBtn.click(function (b) {
				b.preventDefault(), a.isTokenRequested || (a.loginTokenRequest(), a.isTokenRequested = !0, a.loginBtn.text("正在进入..."), a.loginBtn.addClass("ui-button-disabled"), a.changeBtn.addClass("fn-hide"))
			})
		},
		getInputValue: function (a) {
			return document.getElementsByName(a)[0] ? document.getElementsByName(a)[0].value : ""
		},
		loginNameRequest: function () {
			var a = this;
			b.ajax({
				type: "POST",
				url: a.havanaSsoUrl + "/api/havana_top.js",
				data: {
					site: a.siteValue,
					single: !0
				},
				dataType: "jsonp",
				timeout: a.timeout,
				jsonp: "callback",
				charset: "UTF-8",
				success: function (b) {
					a.loginNameSuccessCallback(b), a.loginDom.attr("data-state", "finished")
				},
				error: function () {
					a.loginNameFailureCallback(), system.auth.log("track", "aliLogin_request_token_failure"), a.loginDom.attr("data-state", "error")
				}
			})
		},
		loginNameSuccessCallback: function (a) {
			200 === a.code && a.data && a.data[0] && "number" == typeof a.data[0].site && 1 !== a.data[0].site && "" !== system.auth.util.trimAll(a.data[0].loginId) ? (this.showLoginMsgDom(a.data[0].site, a.data[0].loginId), this.isHomePage && this.showHomePage()) : this.loginNameFailureCallback()
		},
		loginNameFailureCallback: function () {
			this.showFormDom(), this.isHomePage && this.showHomePage()
		},
		showLoginMsgDom: function (a, b) {
			this.companyList["company_" + a] && this.loginIconDom.addClass("icon-sso-" + this.companyList["company_" + a]), this.loginNameDom.html(system.auth.util.limitEmail(b)), this.isShowQRLogin && this.qrSign("false"), this.loginDom.removeClass("fn-hide"), this.formCont_.addClass("fn-hide"), this.onLoginMsgShow && this.onLoginMsgShow.call(this, b)
		},
		showFormDom: function () {
			this.isShowQRLogin && this.qrSign("true"), this.formCont_.removeClass("fn-hide"), this.loginDom.addClass("fn-hide"), this.onFormShow && this.onFormShow.call(this)
		},
		showHomePage: function () {
			!this.isHomePageShowed && system.auth.crossIframe && system.auth.crossIframe()
		},
		loginTokenRequest: function () {
			if (!this.isTokenRequested) {
				var a = this,
					c = a.getInputValue("site");
				a.isTokenRequested = !0, a.tokenValue = "";
				var d = {};
				d = "" !== c ? {
					site: a.siteValue,
					formSite: c
				} : {
					site: a.siteValue
				}, b.ajax({
					type: "POST",
					url: a.havanaSsoUrl + "/mini_login_check.js",
					data: d,
					dataType: "jsonp",
					timeout: a.timeout,
					jsonp: "callback",
					success: function (b) {
						a.loginTokenSuccessCallback(b)
					},
					error: function () {
						a.loginTokenFailureCallback(), system.auth.log("track", "aliLogin_request_token_failure")
					}
				})
			}
		},
		loginTokenSuccessCallback: function (a) {
			200 === a.code && a.data && null !== a.data.st && a.data.st.length > 0 ? this.tokenValue = a.data.st : system.auth.log("track", "aliLogin_request_token_dataError"), this.jumpPage()
		},
		loginTokenFailureCallback: function () {
			this.jumpPage()
		},
		jumpPage: function () {
			try {
				var a = this.authTokenServer + "?token=" + this.tokenValue + "&goto=" + encodeURIComponent(this.getInputValue("goto")) + "&sso_hid=" + this.getInputValue("sso_hid") + "&autoLogin=" + this.autoLogin + "&site=" + this.getInputValue("site");
				this.isHomePage ? window.parent.location = a : window.location = a
			} catch (b) {
				this.showFormDom()
			}
		}
	}
}), define("authcenter/login/1.2.4/js/scene/alipay", ["$"], function (a) {
	"use strict";
	var b = a("$");
	!
	function (a) {
		var c = a.authcode,
			d = a.standarPwd,
			e = a.password;
		system.auth.alipay = function (a) {
			system.auth.accountsaver.clear(), system.auth.accountsaver(a), b(d).val(""), b(e).val(""), b(c).length > 0 && b(c).val("")
		}
	}(system.auth.param)
}), define("authcenter/login/1.2.4/js/module/indexBg", ["$"], function (a) {
	"use strict";
	var b = a("$");
	system.auth.indexBg = function (a) {
		this.init();
		for (var b in a) this[b] = a[b];
		return this.imgTarget.length < 1 || this.imgParent.length < 1 || !this.picArr || this.authCnt.length < 1 ? !1 : (this.bindEvent(), void 0)
	}, system.auth.indexBg.prototype = {
		imgTarget: null,
		imgParent: null,
		authCnt: null,
		currentDate: "",
		scene: "",
		picArr: null,
		needRandom: !0,
		splitPic: function (a, b, c, d) {
			if (b && a.holidays[b]) return a.holidays[b];
			if (c && a.scene[c]) return a.scene[c];
			if (d && a.random.length > 0) {
				var e = Math.floor(Math.random() * a.random.length);
				return a.random[e]
			}
			var f = new Date,
				g = f.getHours();
			return g >= 0 && 6 > g ? a.hours[0] : g >= 6 && 12 > g ? a.hours[1] : g >= 12 && 18 > g ? a.hours[2] : g >= 18 && 24 > g ? a.hours[3] : void 0
		},
		imgFactory: function () {
			return function (a, b, c, d) {
				var e, f, g, h, i, j = new Image;
				return j.src = a, j.complete ? (b.call(j), c && c.call(j), !0) : (f = j.width, g = j.height, j.onerror = function () {
					d && d.call(j), j = j.onload = j.onerror = null
				}, e = function () {
					h = j.width, i = j.height, (h !== f || i !== g || h * i > 1024) && (b.call(j), e.end = !0)
				}, e(), j.onload = function () {
					e.end || e(), c && c.call(j), j = j.onload = j.onerror = null
				}, void 0)
			}
		}(),
		init: function () {
			this.imgTarget = b("#J-authcenter-bgImg"), this.imgParent = b("#J-authcenter-bg"), this.authCnt = b("#J-authcenter")
		},
		bindEvent: function () {
			var a = this,
				c = a.splitPic(a.picArr, a.currentDate, a.scene, a.needRandom),
				d = c[0],
				e = c[1];
			"true" === e ? a.imgFactory(d, function () {}, function () {
				b(".authcenter-body").css({
					backgroundImage: "url(" + d + ")"
				})
			}, function () {}) : a.imgFactory(d, function () {}, function () {
				var c = this.width,
					d = this.height;
				a.imgTarget.attr("src", this.src), a.imgTarget.addClass("authcenter-bg-show"), a.resizeBg(c, d), b(window).resize(function () {
					a.resizeBg(c, d)
				})
			}, function () {})
		},
		resizeBg: function (a, c) {
			var d = this,
				e = b(window).width(),
				f = b(window).height();
			if (f < b(document.body).height() && (f = b(document.body).height()), d.imgParent.css({
				width: e + "px",
				height: f + "px"
			}), e / f >= a / c) {
				var g = parseInt(e / a * c, 10),
					h = parseInt((f - g) / 2, 10);
				d.imgTarget.css({
					width: e + "px",
					height: g + "px",
					top: h + "px",
					left: ""
				})
			} else {
				var i = parseInt(f / c * a, 10),
					j = parseInt((e - i) / 2, 10);
				d.imgTarget.css({
					width: i + "px",
					height: f + "px",
					top: "",
					left: j + "px"
				})
			}
			var k = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie");
			k && (e > 779 && 990 > e ? d.authCnt.addClass("sl-ie") : e > 320 && 780 > e ? (d.authCnt.addClass("sl-ie"), d.authCnt.addClass("sl-ie-min")) : (d.authCnt.removeClass("sl-ie"), d.authCnt.removeClass("sl-ie-min")))
		}
	}
}), define("authcenter/login/1.2.4/js/module/qrcode", ["$", "alipay/storex/1.0.1/storex", "gallery/json/1.0.3/json", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "gallery/store/1.3.7/store"], function (a) {
	"use strict";
	var b = a("$"),
		c = a("alipay/storex/1.0.1/storex");
	system.auth.qrCode = function (a) {
		for (var c in a) this[c] = a[c];
		return b("#J-qrcode-target").length < 1 || b("#J-qrcode").length < 1 || b("#J-loginFormMethod").length < 1 ? !1 : (this.init(), void 0)
	}, system.auth.qrCode.show = function (a) {
		b("#J-input-user").focus(), b("#J-login").addClass("fn-hide"), b("#J-qrcode").removeClass("fn-hide"), b("#J-ssoLogin").length > 0 && b("#J-ssoLogin").addClass("fn-hide"), b("#J-qrcode-target").removeClass("qrcode-target-show").addClass("qrcode-target-hide"), b("#J-qrcode-target").attr("title", "返回"), b("#J-qrcode-target").attr("seed", "authcenter-qrhide"), b("#J-loginFormMethod").val("qrCodeLogin"), "true" === a && (setTimeout(function () {
			b("#J-qrcode-tips").addClass("qrcode-tips-show"), b("#J-qrcode-tips").html("钱包注册用户仅限扫码登录")
		}, 100), setTimeout(function () {
			b("#J-qrcode-tips").removeClass("qrcode-tips-show"), b("#J-qrcode-tips").html("")
		}, 8e3)), "false" === a && b("#J-qrcode-tips").addClass("fn-hide"), window.light && light.page && light.page.products && light.page.products.barcode && light.page.products.barcode.start()
	}, system.auth.qrCode.prototype = {
		target: b("#J-qrcode-target"),
		toggleClassName: "fn-hide",
		formId: b("#J-login"),
		qrId: b("#J-qrcode"),
		qrTitle: "#J-qrcode-title",
		qrErrorBox: "#J-qrcode-errorBox",
		qrImage: "#J-qrcode-img",
		qrIntro: "#J-qrcode-intro",
		qrMethod: "#J-loginFormMethod",
		showDefault: !0,
		hasSSOLogin: !1,
		showQR: function () {
			this.hasSSOLogin ? (b("#J-ssoLogin").addClass(this.toggleClassName), b(this.formId).addClass(this.toggleClassName)) : b(this.formId).addClass(this.toggleClassName), b(this.qrId).removeClass(this.toggleClassName), b(this.target).removeClass("qrcode-target-show").addClass("qrcode-target-hide"), b(this.target).attr("title", "返回"), b(this.target).attr("seed", "authcenter-qrhide"), b(this.qrMethod).val("qrCodeLogin"), b("#J-qrcode-tips").removeClass("fn-hide"), window.light && light.page && light.page.products && light.page.products.barcode && light.page.products.barcode.start()
		},
		hideQR: function () {
			if (this.hasSSOLogin) {
				var a = b("#J-ssoLogin").attr("data-hide");
				a = b.trim(a), "true" === a ? b(this.formId).removeClass(this.toggleClassName) : b("#J-ssoLogin").removeClass(this.toggleClassName)
			} else b(this.formId).removeClass(this.toggleClassName);
			b(this.qrId).addClass(this.toggleClassName), b(this.target).removeClass("qrcode-target-hide").addClass("qrcode-target-show"), b(this.target).attr("title", "扫码登录"), b(this.target).attr("seed", "authcenter-qrshow"), b(this.qrMethod).val(""), window.light && light.page && light.page.products && light.page.products.barcode && light.page.products.barcode.onready(function () {
				this.stop()
			}), this.clearQRState()
		},
		saveQRState: function () {
			c.status().enabled && c.set("qrLogin", "true")
		},
		readQRState: function () {
			function a() {
				var a = 0,
					c = setInterval(function () {
						var d = b("#J-ssoLogin").attr("data-state");
						if ("start" !== d) {
							var e = b("#J-ssoLogin").attr("data-hide");
							"true" === e && system.auth.qrCode.show("false"), clearInterval(c)
						} else a++, a > 4 && clearInterval(c)
					}, 200)
			}
			var d = this;
			if (c.status().enabled) {
				var e = c.get("qrLogin");
				e && (d.hasSSOLogin ? a() : system.auth.qrCode.show("false"))
			}
		},
		clearQRState: function () {
			if (c.status().enabled) {
				var a = c.get("qrLogin");
				if (a) try {
					c.remove("qrLogin")
				} catch (b) {}
			}
		},
		bindEvent: function () {
			var a = this;
			b(a.target).on("click", function (c) {
				c.preventDefault();
				var d = c.target;
				if (a.hasSSOLogin) {
					var e = b("#J-ssoLogin").attr("data-state");
					"start" !== e && (b(d).hasClass("qrcode-target-show") ? a.showQR() : a.hideQR())
				} else b(d).hasClass("qrcode-target-show") ? a.showQR() : a.hideQR()
			}), b("#J-qrcode-gethelp").hover(function () {
				b(a.qrImage).css({
					display: "none"
				}), b(a.qrIntro).addClass("qrcode-detail-intro-show")
			}, function () {
				b(a.qrImage).css({
					display: "block"
				}), b(a.qrIntro).removeClass("qrcode-detail-intro-show")
			}), b("#J-qrcode-errorBox").hasClass("sl-error-display") && setTimeout(function () {
				b(a.qrTitle).removeClass("fn-hide"), b(a.qrErrorBox).removeClass("sl-error-display"), b(a.qrErrorBox).find(".sl-error-text")[0].innerHTML = "", b(a.qrErrorBox).attr("errorType", "1")
			}, 3e3), b(system.auth.param.loginForm).on("GREEN_WAY_ROF_QRCODE", function () {
				b(system.auth.param.loginForm).attr("data-qrcode", "true")
			}), light.ready(function () {
				window.light && light.page && light.page.products && light.page.products.barcode && (light.page.products.barcode.onready(function () {
					b(a.target).hasClass("qrcode-target-show") && this.stop()
				}), b(system.auth.param.loginForm).attr("data-qrcode", "false"), light.page.products.barcode.onConfirm(function () {
					b(system.auth.param.loginForm).trigger("GREEN_WAY_ROF_QRCODE"), a.saveQRState(), document.getElementById("login").submit()
				}))
			})
		},
		init: function () {
			this.bindEvent(), this.showDefault && this.readQRState()
		}
	}
});