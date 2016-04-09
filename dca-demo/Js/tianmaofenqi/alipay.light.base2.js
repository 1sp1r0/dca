window.light || function (a) {
    var e = a.document,
        i = a.location,
        h = Array.prototype,
        d, c;
    try {
        c = i.href
    } catch (b) {
        c = e.createElement("a"), c.href = "", c = c.href
    }
    d = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?([^?#]*))?/.exec(c.toLowerCase()) || [];
    var j = {
        version: "0.9.0",
        timestamp: (new Date).getTime(),
        debug: !1,
        baseDomain: function () {
            var f = d[2].split(".");
            return f.slice(-Math.max(f.length - 1, 2)).join(".")
        }(),
        urlParts: d,
        toString: function () {
            var f = "Light JavaScript Library version " + j.version;
            j.debug && (f += ", debug enabled");
            return f + "."
        },
        toArray: function (f) {
            var a = [];
            if (!f.length) return a;
            for (var b = 0, g = f.length; b < g; b++) a[b] = f[b];
            return a
        },
        map: function (f, a, b) {
            if (h.map) return h.map.call(f, a, b);
            var g = [],
                e = f.length;
            if (!e) return g;
            for (var c = 0; c < e; c++) g[c] = a.call(b, f[c], c, f);
            return g
        },
        reduce: function (f, a, b) {
            if (h.reduce) return h.reduce.call(f, a, b);
            var g = 0,
                e = f.length;
            if (!e && void 0 == b) throw new TypeError("Reduce of empty array with no initial value");
            void 0 == b && (b = f[0], g = 1);
            for (; g < e;) b = a.call(void 0, b, f[g], g, f), g++;
            return b
        },
        register: function (f, b, e) {
            f = f.split("/");
            b = b || j;
            f[0] || (b = a, f.shift());
            for (var g, c = 0, h = f.length - 1; c < h; c++)
                if (g = f[c]) b = b[g] = b[g] || {};
                (g = f[c]) && (b = b[g] = void 0 === e ? {} : e);
            return b
        },
        extend: function (f) {
            var a = j.toArray(arguments);
            "boolean" !== typeof a[0] && a.unshift(f = !1);
            if (2 > a.length) return null;
            var b = 2,
                g = a[1];
            2 === a.length && (b = 1, g = j);
            for (var e = b, c = a.length; e < c; e++)
                if ((b = a[e]) && "object" === typeof b)
                    for (var h in b) {
                        var d = b[h];
                        d !== g && b.hasOwnProperty(h) && (j.isArray(d) ? g[h] = Array.prototype.concat.call(d) : f && d instanceof Object && !j.isFunction(d) && !d.nodeType ? g[h] = j.extend(!0, g[h] || {}, b[h]) : void 0 !== d && (g[h] = d))
                    }
                return g
        },
        deriveFrom: function (f, a, b) {
            if (2 > arguments.length) return f;
            var g = a && a.init || function () {
                    f.constructor.apply(this, arguments)
                };
            j.extend(!0, g.prototype, f.prototype, a);
            g.constructor = g;
            b && j.extend(!0, g, b);
            g.__super = f;
            return g
        },
        module: function (a, b) {
            var e = j.register(a, null, b);
            j.isFunction(b) && (e.constructor = b);
            return e
        },
        each: function (a, b) {
            if (!a) return a;
            var e = a.length;
            if (void 0 !== e && "reverse" in a)
                for (var g =
                    0; g < e && !1 !== b.call(a[g], g, a[g], a);) g++;
            else
                for (g in a)
                    if (!1 === b.call(a[g], g, a[g], a)) break; return a
        },
        isFunction: function (a) {
            return "function" === j.type(a)
        },
        isArray: Array.isArray || function (a) {
            return "array" === j.type(a)
        },
        isString: function (a) {
            return "string" === j.type(a)
        },
        isObject: function (a) {
            return "object" === j.type(a)
        },
        isNull: function (a) {
            return "null" === j.type(a)
        },
        isUndefined: function (a) {
            return void 0 === a
        },
        isWindow: function (a) {
            return a && "object" === typeof a && "setInterval" in a
        },
        type: function (a) {
            return null ===
                a || void 0 === a ? "" + a : k[Object.prototype.toString.call(a)] || "object"
        },
        has: function (b) {
            if (!b) return !1;
            var b = b.split("/"),
                e = j,
                c, g;
            b[0] || (e = a, b.shift());
            c = 0;
            for (g = b.length; c < g; c++)
                if (e = e[b[c]], void 0 === e) return !1;
            return !0
        },
        noop: function () {}
    }, k = {};
    j.each("Boolean,Number,String,Function,Array,Date,RegExp,Object,Null".split(","), function (a, b) {
        k["[object " + b + "]"] = b.toLowerCase()
    });
    a.light = j
}(window);
light.extend({
    log: function () {
        return !light.debug || !window.console || !console.log ? function () {
            if (light.debug) try {
                window.console && console.log && console.log.apply(console, arguments)
            } catch (a) {}
        } : Function.prototype.bind ? function () {
            light.debug && Function.prototype.bind.call(console.log, console).apply(console, arguments)
        } : console.log.apply ? function () {
            light.debug && console.log.apply(console, arguments)
        } : light.debug ? console.log : light.noop
    }(),
    inspect: function (a) {
        var e = function (a) {
            if (!light.isObject(a)) return light.isString(a) ?
                '"' + a + '"' : a.toString();
            var d = [],
                c;
            for (c in a) light.isUndefined(a[c]) || (light.isNull(a[c]) ? d.push('"' + c + '":null') : light.isObject(a[c]) ? d.push('"' + c + '":{' + e(a[c]) + "}") : d.push('"' + c + '":' + e(a[c])));
            return d.join()
        };
        if (window.JSON && JSON.stringify) return JSON.stringify(a);
        if ("object" === typeof a) {
            var i = "",
                i = e(a);
            return "{" + i + "}"
        }
        return "" + a
    },
    track: function () {
        var a = [],
            e = function (i) {
                window.Tracker ? Tracker.click(i) : (a.push(i), window.setTimeout(function () {
                    e(a.shift())
                }, 100))
            };
        return function (a, h) {
            if (a) {
                if (h) var d =
                    light.client.info,
                c = d.browser.version, c = c ? c[0] : "na", a = a + ("-" + (d.browser.name || "na") + "-" + (d.engine.name || "na") + "-" + c);
                e(a)
            }
        }
    }(),
    trim: function (a) {
        return !a ? "" : String.prototype.trim ? String.prototype.trim.apply(a) : a.replace(/^\s+|\s+$/g, "")
    },
    substitute: function (a, e, i) {
        if (!a) return "";
        if (!e) return a;
        if ("string" !== typeof a) throw "invalid template";
        return a.replace(RegExp("{\\w+}", "gmi"), function (a) {
            var a = a.substr(1, a.length - 2),
                d = e[a];
            return null != d ? d.toString() : i ? "{" + a + "}" : ""
        })
    },
    encode: encodeURIComponent || escape,
    decode: decodeURIComponent || unescape,
    param: function (a, e, i) {
        var e = e || "=",
            h = [];
        light.each(a, function (d, c) {
            if (d && a.hasOwnProperty(d)) {
                var b = light.encode(d);
                null != c && (b += e + light.encode(c));
                h.push(b)
            }
        });
        return h.join(i || "&")
    },
    unparam: function (a, e, i) {
        var h = {};
        if (!a) return h;
        e = e || "=";
        light.each(a.split(i || "&"), function (a, c) {
            var b = c.split(e);
            2 < b.length && (b[1] = b.slice(1).join(e));
            b[0] && (h[light.decode(b[0])] = 1 < b.length ? light.decode(b[1]) : null)
        });
        return h
    },
    trimTag: function (a) {
        if (!a || !document.createElement) return "";
        var e = document.createElement("DIV");
        e.innerHTML = a;
        return e.textContent || e.innerText || ""
    },
    escapeHTML: function (a) {
        if (!a) return "";
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/</g, "&lt;");
        a = a.replace(/&/g, "&amp;");
        a = a.replace(/"/g, "&quot;");
        return a = a.replace(/'/g, "&#039;")
    },
    unescapeHTML: function (a) {
        if (!a) return "";
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&amp;/g, "&");
        a = a.replace(/&quot;/g, '"');
        return a = a.replace(/&#039;/g, "'")
    },
    toJSON: function (a) {
        if ("string" !== typeof a || !a) return null;
        a = light.trim(a);
        return window.JSON && JSON.parse ? JSON.parse(a) : (new Function("return " + a))()
    }
});
(function () {
    var a = function () {
        this.stack = [];
        var a = this,
            i = [].slice.call(arguments, 0);
        i && light.each(i, function (h) {
            a.add(h)
        })
    };
    a.prototype = {
        add: function (a) {
            this.stack.push(a)
        },
        clear: function () {
            this.stack = []
        },
        invoke: function () {
            var a = this,
                i = [].slice.call(arguments, 0);
            fn = this.stack.shift();
            this.next || (this.next = function () {
                a.stack.length && a.invoke.apply(a, i)
            });
            fn.apply(null, [this.next].concat(i))
        }
    };
    light.queue = a
})();
(function (a, e) {
    var i = a.document,
        h = a.navigator,
        d = h.userAgent ? h.userAgent.toLowerCase() : "",
        c = a.external,
        h = {
            device: {
                pc: "windows",
                ipad: "ipad",
                ipod: "ipod",
                iphone: "iphone",
                mac: "macintosh",
                android: "android",
                nokia: /nokia([^\/ ]+)/
            },
            os: {
                windows: /windows nt (\d)\.(\d)/,
                macos: /mac os x (\d+)[\._](\d+)(?:[\._](\d+))?/,
                ios: /cpu(?: iphone)? os (\d)_(\d)(?:_(\d))?/,
                android: /android (\d)\.(\d)/,
                chromeos: /cros i686 (\d+)\.(\d+)(?:\.(\d+))?/,
                linux: "linux",
                windowsce: 0 < d.indexOf("windows ce ") ? /windows ce (\d)\.(\d)/ : "windows ce",
                symbian: /symbianos\/(\d+)\.(\d+)/,
                blackberry: "blackberry"
            },
            engine: {
                trident: 0 < d.indexOf("msie ") ? /msie (\d+)\.(\d+)/ : /trident\/(\d+)\.(\d+)/,
                webkit: /applewebkit\/([\d\+]+)(?:\.(\d+))?/,
                gecko: /gecko\/(\d+)/,
                presto: /presto\/(\d+).(\d+)/
            },
            browser: {
                360: function () {
                    if (!b.os.windows) return !1;
                    if (c) try {
                        return c.twGetVersion(c.twGetSecurityID(a)).split(".")
                    } catch (e) {
                        try {
                            return -1 !== c.twGetRunPath.toLowerCase().indexOf("360se") || !! c.twGetSecurityID(a)
                        } catch (d) {}
                    }
                    return /360(?:se|chrome)/
                },
                mx: function () {
                    if (!b.os.windows) return !1;
                    if (c) try {
                        return (c.mxVersion || c.max_version).split(".")
                    } catch (a) {}
                    return -1 !== d.indexOf("maxthon ") ? /maxthon (\d)\.(\d)/ : "maxthon"
                },
                sg: / se (\d)\./,
                tw: function () {
                    if (!b.os.windows) return !1;
                    if (c) try {
                        return -1 !== c.twGetRunPath.toLowerCase().indexOf("theworld")
                    } catch (a) {}
                    return "theworld"
                },
                qq: function () {
                    return 0 < d.indexOf("qqbrowser/") ? /qqbrowser\/(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/ : /tencenttraveler (\d)\.(\d)/
                },
                ie: 0 < d.indexOf("trident/") ? /trident\/(\d+)\.(\d+)/ : /msie (\d+)\.(\d+)/,
                chrome: / (?:chrome|crios)\/(\d+)\.(\d+)/,
                safari: /version\/(\d+)\.(\d+)(?:\.([ab\d]+))?(?: mobile(?:\/[a-z0-9]+)?)? safari\//,
                firefox: /firefox\/(\d+)\.([ab\d]+)/,
                opera: /opera.+version\/(\d+)\.([ab\d]+)/
            },
            feature: {
                "64bitBrowser": "win64; x64;",
                "64bitOS": /win64|wow64/,
                security: / (i|u|s|sv1)[;\)]/,
                simulator: function () {
                    return b.os.ios && 960 < screen.width
                }
            }
        }, b = {};
    e.each(h, function (a, c) {
        b["has" + a.charAt(0).toUpperCase() + a.slice(1)] = function (e, c) {
            var g;
            a: if (!b[a] || !(g = b[a][e])) g = !1;
            else {
                if (c) {
                    var f = c;
                    "string" === typeof f ? f = f.split(".") : "number" === typeof f &&
                        (f = [f]);
                    for (var d, h, i = 0, k = Math.max(f.length, g.length); i < k; i++)
                        if (d = parseInt(f[i], 10) || 0, h = parseInt(g[i], 10) || 0, d !== h) {
                            g = d < h;
                            break a
                        }
                }
                g = !0
            }
            return g
        };
        var f = b[a] = {
            name: "n/a",
            version: [-1]
        };
        e.each(c, function (a, c) {
            var g = [0],
                h = e.isFunction(c) ? c.apply(b) : c;
            if (h)
                if (!0 === h) g = [-1];
                else if ("string" === typeof h) g = [-1 !== d.indexOf(h) ? -1 : 0];
            else {
                var i = h;
                h.exec && (i = h.exec(d) || [], i.length && i.shift());
                for (h = 0; h < i.length; h++) g[h] = parseInt(i[h], 10) || 0
            } if (i = !! g[0]) f[a] = f.version = g, f.name = a;
            return !i
        })
    });
    !b.engine.name &&
        a.ActiveXObject instanceof Function ? (i.documentMode ? b.engine.trident = b.engine.version = [i.documentMode, 0] : b.engine.trident || (b.engine.trident = b.engine.version = [-1]), b.engine.name = "trident") : !b.os.windows && b.hasEngine("trident", 6) && (b.os.windows = b.os.version = [-1], b.os.name = "windows");
    b.browser.ie && 0 < d.indexOf("trident/") && (b.browser.ie[0] = b.browser.version[0] += 4);
    e.module("client/info", b)
})(window, light);
(function (a, e) {
    var i = a.document,
        h = a.navigator,
        d = !1,
        c = function () {
            d || (e.write('<input type="hidden" id="__ud" style="behavior:url("#default#userData")"/>'), d = !0);
            return e.get("__ud")
        }, b = {
            cookie: null,
            defaultStorage: function () {
                var b = null;
                try {
                    b = a.localStorage
                } catch (c) {}
                return b
            }(),
            set: function (a, f) {
                if (b.cookie && h.cookieEnabled) {
                    var d = a + "=" + encodeURIComponent(f);
                    if (b.cookie.days) var l = new Date((new Date).getTime() + 864E5 * b.cookie.days),
                    d = d + ("; expires=" + l.toGMTString());
                    b.cookie.domain && (d += "; domain=" +
                        b.cookie.domain);
                    d += "; path=" + (b.cookie.path || e.urlParts[4] || "/");
                    i.cookie = d
                }
                if (j) b.defaultStorage.setItem(a, f);
                else if (d = c()) {
                    d.setAttribute(a, f);
                    try {
                        d.save("__ud")
                    } catch (g) {}
                }
            },
            get: function (a) {
                if (b.cookie) {
                    if (h.cookieEnabled) {
                        var f = i.cookie,
                            d = f.indexOf(a + "=");
                        return -1 != d ? (d += a.length + 1, a = f.indexOf(";", d), -1 == a && (a = f.length), e.decode(f.substring(d, a) || "")) : null
                    }
                    return ""
                }
                if (j) f = b.defaultStorage.getItem(a);
                else if (d = c()) {
                    try {
                        d.load("__ud")
                    } catch (l) {}
                    f = d.getAttribute(a)
                }
                return f || ""
            }
        }, j = !! b.defaultStorage;
    e.module("client/storage", b)
})(window, light);
! function (e) {
    e.zpmjs || function () {
        var t = {}, r = {}, o = function (n) {
                if (r[n]) return r[n];
                var i = t[n];
                if (i) {
                    var a = {
                        id: n
                    };
                    return r[n] = i.call(e, o, a.exports = {}, a) || a.exports, delete t[n], r[n]
                }
            }, i = function (o, i) {
                r[o] || (t[o] = i, e.define && (n.cmd || n.amd) && n(o, [], i))
            };
        e.zpmjs = {
            define: i,
            require: o
        }
    }(); {
        var n = zpmjs.define;
        zpmjs.require
    }
    n("tracker-id/0.1.5/index", function (e, n) {
        function t() {
            return a(s.URL + s.cookie + (new Date).getTime() + Math.random()).toUpperCase()
        }

        function r(e, n) {
            return e && e.getAttribute ? e.getAttribute(n, 4) : void 0
        }

        function o() {
            b >= 9e3 && (l = t(), b = 0);
            var e = "000" + b++;
            return e.substr(e.length - 4)
        }

        function i() {
            return d + l + o()
        }
        var a = e("md5/2.0.0/md5"),
            u = e("ready/0.0.0/index"),
            c = e("tracker/2.0.5/tracker"),
            f = "trackerId",
            s = document,
            d = "W",
            l = t(),
            b = 0;
        n.init = function () {
            c.on("click", function (e, n, t) {
                var o = n.tagName.toUpperCase();
                if ("INPUT" == o || "BUTTON" == o) {
                    var a = (r(n, "type") || n.type || "").toUpperCase();
                    if ("SUBMIT" == a || "IMAGE" == a) {
                        var u = i();
                        t.trackerId = u;
                        var c = n.form;
                        if (!c) return;
                        var f = c._trackerid_input;
                        f.value = u
                    }
                }
            }), u(function () {
                for (var e = s.forms, n = 0, t = e.length; t > n; n++) {
                    var r = s.createElement("input");
                    r.type = "hidden", r.name = f, e[n].appendChild(r), e[n]._trackerid_input = r
                }
            })
        }
    }), n("tracker/2.0.5/tracker", function (n, t, r) {
        function o() {
            return Date.now ? Date.now() : (new Date).getTime()
        }

        function i(e) {
            var n = [];
            for (var t in e)
                if (t && e.hasOwnProperty(t)) {
                    var r = Z(t),
                        o = String(e[t]);
                    "" !== o && (r += "=" + Z(o)), n.push(r)
                }
            return n.join("&")
        }

        function a(e, n) {
            if (e && 1 === e.nodeType && e.getAttribute) try {
                return e.getAttribute(n, 2)
            } catch (t) {}
            return null
        }

        function u(e, n) {
            return e && 1 === e.nodeType && e.hasAttribute ? e.hasAttribute(n) : null !== a(e, n)
        }

        function c() {
            return /\bcna=/.test(document.cookie)
        }

        function f(e, n) {
            for (var t = 0, r = e.length; r > t; t++)
                if (e[t] === n) return e.splice(t, 1), e;
            return e
        }

        function s(e) {
            A.push(e);
            var n = new Image(1, 1);
            n.onload = n.onerror = n.onabort = function () {
                f(A, e), n = n.onload = n.onerror = n.onabort = null
            }, n.src = e
        }

        function d(e, n, t) {
            e && (e.addEventListener ? e.addEventListener(n, t, !1) : e.attachEvent && e.attachEvent("on" + n, function (n) {
                t.call(e, n)
            }))
        }

        function l(e) {
            var n = e.target || e.srcElement;
            try {
                if (n && 3 === n.nodeType) return n.parentNode
            } catch (t) {}
            return n
        }

        function b(e, n) {
            n[N] = e, n.r = v(), n.v = version, $.emit("log:" + e, n);
            var t = i(n);
            if (s(K + "?" + t), F[e] = n.pg, !c()) {
                var r = i({
                    url: X + "?" + t
                });
                s(Q + "?" + r)
            }
        }

        function p(e, n) {
            return b(e, {
                ref: F[e] || T,
                pg: j + "?seed=" + Z(n)
            })
        }

        function v() {
            return Math.random()
        }

        function m() {
            var e = y.parent === y ? q : P,
                n = {
                    ref: D || "-",
                    pg: T,
                    screen: "-x-",
                    color: "-",
                    BIProfile: "page"
                };
            y.screen && (n.screen = screen.width + "x" + screen.height, n.sc = screen.colorDepth + "-bit"), n.utmhn = location.hostname;
            var t, r, o, i, a = "|",
                u = "/",
                c = "device",
                f = "os",
                s = "engine",
                d = "browser",
                l = "name",
                p = "fullVersion";
            if (G) i = G[c][l] + u + G[c][p], t = G[f][l] + u + G[f][p], r = G[s][l] + u + G[s][p], o = G[d][l] + u + G[d][p];
            else {
                var v = "nodetector",
                    m = "-1";
                i = v + u + m, t = v + u + m, r = v + u + m, o = v + u + m
            }
            n._clnt = [t, r, o, i].join(a), b(e, n)
        }

        function h() {
            fn && sn && b("load", {
                ref: "-",
                pg: T,
                tm: [fn, sn].join("x")
            })
        }

        function g() {
            function e() {
                dn && h()
            }
            H(function () {
                fn = o() - k, e()
            }), d(y, "load", function () {
                sn = o() - k, e()
            }), /^loaded|c/.test(O.readyState) && (sn = o() - k, e())
        }

        function w(e) {
            var n = l(e);
            if (n && n.nodeType) {
                for (; n && "HTML" !== n.nodeName && !u(n, S);) n = n.parentNode;
                if (n && 1 === n.nodeType && "HTML" !== n.nodeName) {
                    var t, r, o = a(n, S),
                        c = {
                            seed: o
                        };
                    "A" === n.nodeName && (t = a(n, "href") || "", (t === T || 0 === t.indexOf(T + "#")) && (t = ""), r = t.match(R), r && (c._scType = r[1]));
                    var f = {
                        ref: F[U] || T,
                        pg: j + "?" + i(c)
                    };
                    $.emit("click", e, n, f), b(U, f)
                }
            }
        }

        function x(e) {
            return 0 === Math.floor(Math.random() / e)
        }
        var y = e;
        if (y.Tracker) return y.Tracker;
        version = "1.0";
        var k, O = y.document,
            _ = y.location,
            z = y.performance,
            I = !1,
            T = document.URL || "",
            j = T.split(/\?|#|;jsessionid=/)[0],
            S = "seed",
            E = "ref",
            C = "ref-unload-time",
            M = "lost",
            V = ",",
            A = [],
            L = 1e3,
            N = "BIProfile",
            U = "clk",
            q = "page",
            P = "iframe",
            R = /[?&]_scType=([^&#]+)/,
            D = O.referrer,
            F = {}, G = n("detector/2.0.1/detector"),
            B = n("name-storage/1.2.0/index"),
            H = n("ready/0.0.0/index"),
            W = n("evt/0.2.1/evt"),
            $ = new W,
            J = "https:" === _.protocol ? "https:" : "http:",
            K = J + "//kcart.alipay.com/web/bi.do",
            Q = J + "//log.mmstat.com/5.gif",
            X = J + "//kcart.alipay.com/web/1.do",
            Y = .125,
            Z = encodeURIComponent;
        k = z && z.timing ? z.timing.navigationStart : y._to && _to.start ? _to.start.getTime() : o();
        for (var en, nn, tn = y.Tracker = function () {}, rn = O.getElementsByTagName("meta"), on = 0, an = rn.length; an > on; on++)
            if (nn = a(rn[on], "name"), nn && "abtest" == nn.toLowerCase()) {
                en = a(rn[on], "content");
                break
            }
        if (B) {
            var un = Number(B.getItem(C));
            if (L > k - un) {
                D || (D = B.getItem(E));
                var cn = B.getItem(M);
                if (cn) {
                    cn = cn.split(V);
                    for (var on = 0, an = cn.length; an > on; on++) s(cn[on])
                }
            }
            B.removeItem(E), B.removeItem(C), B.removeItem(M)
        }
        d(y, "beforeunload", function () {
            B && (B.setItem(E, T), B.setItem(C, o()), B.setItem(M, A.join(",")))
        });
        var fn, sn, dn = !1;
        d(O, "mousedown", w), d(O, "touchstart", w), tn.click = function (e) {
            var n = e.split(":"),
                t = U;
            return n.length >= 2 && (t = n[0], e = n[1]), p(t, e)
        }, tn.log = function (e, n) {
            return p(n || "syslog", e)
        }, tn.error = function (e) {
            return p("syserr", e)
        }, tn.calc = function (e, n) {
            var t = "calc";
            return b(t, {
                ref: F[t] || T,
                pg: j + "?" + i({
                    value: n,
                    seed: e
                })
            })
        }, tn.send = function () {
            p(U, "deprecated-api-tracker-send")
        }, tn.config = function (e) {
            K = e.base_url || K, Q = e.acookie_base_url || Q, X = e.acookie_callback_url || X, Y = e.rate_load || Y
        }, tn.start = function () {
            I || (I = !0, m(), x(Y) && (dn = !0, h()))
        }, tn.on = function (e, n) {
            return $.on(e, n), tn
        }, tn.off = function (e, n) {
            return $.off(e, n), tn
        }, g(), r.exports = tn
    }), n("ready/0.0.0/index", function (e, n, t) {
        function r() {
            if (!h) {
                h = !0;
                for (var e = 0, n = u.length; n > e; e++) u[e]()
            }
        }

        function o() {
            try {
                c.doScroll("left")
            } catch (e) {
                return setTimeout(o, 50)
            }
            r()
        }
        var i, a = document,
            u = [],
            c = a.documentElement,
            f = c.doScroll,
            s = "DOMContentLoaded",
            d = "onreadystatechange",
            l = "addEventListener",
            b = "attachEvent",
            p = "load",
            v = "readyState",
            m = f ? /^loaded|^c/ : /^loaded|c/,
            h = m.test(a[v]);
        a[l] ? (i = function () {
            a.removeEventListener(s, i, !1), r()
        }, a[l](s, i, !1), a[l](p, i, !1)) : f && (i = function () {
            /^c/.test(a[v]) && (a.detachEvent(d, i), r())
        }, a[b](d, i), a[b]("on" + p, i), o()), h && r();
        var g = function (e) {
            h ? e() : u.push(e)
        };
        t.exports = g
    }), n("detector/2.0.1/detector", function (e, n, t) {
        function r(e) {
            return Object.prototype.toString.call(e)
        }

        function o(e) {
            return "[object Object]" === r(e)
        }

        function i(e) {
            return "[object Function]" === r(e)
        }

        function a(e, n) {
            for (var t = 0, r = e.length; r > t && n.call(e, e[t], t) !== !1; t++);
        }

        function u(e) {
            if (!v.test(e)) return null;
            var n, t, r, o, i;
            if (-1 !== e.indexOf("trident/") && (n = /\btrident\/([0-9.]+)/.exec(e), n && n.length >= 2)) {
                r = n[1];
                var a = n[1].split(".");
                a[0] = parseInt(a[0], 10) + 4, i = a.join(".")
            }
            n = v.exec(e), o = n[1];
            var u = n[1].split(".");
            return "undefined" == typeof i && (i = o), u[0] = parseInt(u[0], 10) - 4, t = u.join("."), "undefined" == typeof r && (r = t), {
                browserVersion: i,
                browserMode: o,
                engineVersion: r,
                engineMode: t,
                compatible: r !== t
            }
        }

        function c(e) {
            if (d) try {
                var n = d.twGetRunPath.toLowerCase(),
                    t = d.twGetSecurityID(p),
                    r = d.twGetVersion(t);
                if (n && -1 === n.indexOf(e)) return !1;
                if (r) return {
                    version: r
                }
            } catch (o) {}
        }

        function f(e, n, t) {
            var a = i(n) ? n.call(null, t) : n;
            if (!a) return null;
            var u = {
                name: e,
                version: b,
                codename: ""
            }, c = r(a);
            if (a === !0) return u;
            if ("[object String]" === c) {
                if (-1 !== t.indexOf(a)) return u
            } else {
                if (o(a)) return a.hasOwnProperty("version") && (u.version = a.version), u;
                if (a.exec) {
                    var f = a.exec(t);
                    if (f) return u.version = f.length >= 2 && f[1] ? f[1].replace(/_/g, ".") : b, u
                }
            }
        }

        function s(e, n, t, r) {
            var o = x;
            a(n, function (n) {
                var t = f(n[0], n[1], e);
                return t ? (o = t, !1) : void 0
            }), t.call(r, o.name, o.version)
        }
        var d, l = {}, b = "-1",
            p = this,
            v = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/,
            m = [
                ["nokia",
                    function (e) {
                        return -1 !== e.indexOf("nokia ") ? /\bnokia ([0-9]+)?/ : -1 !== e.indexOf("noain") ? /\bnoain ([a-z0-9]+)/ : /\bnokia([a-z0-9]+)?/
                    }
                ],
                ["samsung",
                    function (e) {
                        return -1 !== e.indexOf("samsung") ? /\bsamsung(?:\-gt)?[ \-]([a-z0-9\-]+)/ : /\b(?:gt|sch)[ \-]([a-z0-9\-]+)/
                    }
                ],
                ["wp",
                    function (e) {
                        return -1 !== e.indexOf("windows phone ") || -1 !== e.indexOf("xblwp") || -1 !== e.indexOf("zunewp") || -1 !== e.indexOf("windows ce")
                    }
                ],
                ["pc", "windows"],
                ["ipad", "ipad"],
                ["ipod", "ipod"],
                ["iphone", /\biphone\b|\biph(\d)/],
                ["mac", "macintosh"],
                ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build))/],
                ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
                ["meizu", /\b(?:meizu\/|m)([0-9]+)\b/],
                ["nexus", /\bnexus ([0-9s.]+)/],
                ["huawei",
                    function (e) {
                        var n = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
                        return -1 !== e.indexOf("huawei-huawei") ? /\bhuawei\-huawei\-([a-z0-9\-]+)/ : n.test(e) ? n : /\bhuawei[ _\-]?([a-z0-9]+)/
                    }
                ],
                ["lenovo",
                    function (e) {
                        return -1 !== e.indexOf("lenovo-lenovo") ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/ : /\blenovo[ \-]?([a-z0-9]+)/
                    }
                ],
                ["zte",
                    function (e) {
                        return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/ : /\bzte[ _\-]?([a-su-z0-9\+]+)/
                    }
                ],
                ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
                ["htc",
                    function (e) {
                        return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/ : /\bhtc[ _\-]?([a-z0-9 ]+)/
                    }
                ],
                ["oppo", /\boppo[_]([a-z0-9]+)/],
                ["konka", /\bkonka[_\-]([a-z0-9]+)/],
                ["sonyericsson", /\bmt([a-z0-9]+)/],
                ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
                ["lg", /\blg[\-]([a-z0-9]+)/],
                ["android", /\bandroid\b|\badr\b/],
                ["blackberry", "blackberry"]
            ],
            h = [
                ["wp",
                    function (e) {
                        return -1 !== e.indexOf("windows phone ") ? /\bwindows phone (?:os )?([0-9.]+)/ : -1 !== e.indexOf("xblwp") ? /\bxblwp([0-9.]+)/ : -1 !== e.indexOf("zunewp") ? /\bzunewp([0-9.]+)/ : "windows phone"
                    }
                ],
                ["windows", /\bwindows nt ([0-9.]+)/],
                ["macosx", /\bmac os x ([0-9._]+)/],
                ["ios",
                    function (e) {
                        return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : -1 !== e.indexOf("iph os ") ? /\biph os ([0-9_]+)/ : /\bios\b/
                    }
                ],
                ["yunos", /\baliyunos ([0-9.]+)/],
                ["android",
                    function (e) {
                        return e.indexOf("android") >= 0 ? /\bandroid[ \/-]?([0-9.x]+)?/ : e.indexOf("adr") >= 0 ? e.indexOf("mqqbrowser") >= 0 ? /\badr[ ]\(linux; u; ([0-9.]+)?/ : /\badr(?:[ ]([0-9.]+))?/ : "android"
                    }
                ],
                ["chromeos", /\bcros i686 ([0-9.]+)/],
                ["linux", "linux"],
                ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
                ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
                ["blackberry", "blackberry"]
            ],
            g = [
                ["trident", v],
                ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
                ["gecko", /\bgecko\/(\d+)/],
                ["presto", /\bpresto\/([0-9.]+)/],
                ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
                ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
                ["u2", /\bu2\/([0-9.]+)/],
                ["u3", /\bu3\/([0-9.]+)/]
            ],
            w = [
                ["sg", / se ([0-9.x]+)/],
                ["tw",
                    function () {
                        var e = c("theworld");
                        return "undefined" != typeof e ? e : "theworld"
                    }
                ],
                ["360",
                    function (e) {
                        var n = c("360se");
                        return "undefined" != typeof n ? n : -1 !== e.indexOf("360 aphone browser") ? /\b360 aphone browser \(([^\)]+)\)/ : /\b360(?:se|ee|chrome|browser)\b/
                    }
                ],
                ["mx",
                    function () {
                        try {
                            if (d && (d.mxVersion || d.max_version)) return {
                                version: d.mxVersion || d.max_version
                            }
                        } catch (e) {}
                        return /\bmaxthon(?:[ \/]([0-9.]+))?/
                    }
                ],
                ["qq", /\bm?qqbrowser\/([0-9.]+)/],
                ["green", "greenbrowser"],
                ["tt", /\btencenttraveler ([0-9.]+)/],
                ["lb",
                    function (e) {
                        if (-1 === e.indexOf("lbbrowser")) return !1;
                        var n;
                        try {
                            d && d.LiebaoGetVersion && (n = d.LiebaoGetVersion())
                        } catch (t) {}
                        return {
                            version: n || b
                        }
                    }
                ],
                ["tao", /\btaobrowser\/([0-9.]+)/],
                ["fs", /\bcoolnovo\/([0-9.]+)/],
                ["sy", "saayaa"],
                ["baidu", /\bbidubrowser[ \/]([0-9.x]+)/],
                ["ie", v],
                ["mi", /\bmiuibrowser\/([0-9.]+)/],
                ["opera",
                    function (e) {
                        var n = /\bopera.+version\/([0-9.ab]+)/,
                            t = /\bopr\/([0-9.]+)/;
                        return n.test(e) ? n : t
                    }
                ],
                ["yandex", /yabrowser\/([0-9.]+)/],
                ["ali-ap",
                    function (e) {
                        return e.indexOf("aliapp") > 0 ? /\baliapp\(ap\/([0-9.]+)\)/ : /\balipayclient\/([0-9.]+)\b/
                    }
                ],
                ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
                ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
                ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
                ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
                ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
                ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
                ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
                ["uc",
                    function (e) {
                        return e.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/ : e.indexOf("ucweb") >= 0 ? /\bucweb([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/
                    }
                ],
                ["android",
                    function (e) {
                        return -1 !== e.indexOf("android") ? /\bversion\/([0-9.]+(?: beta)?)/ : void 0
                    }
                ],
                ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
                ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
                ["firefox", /\bfirefox\/([0-9.ab]+)/],
                ["nokia", /\bnokiabrowser\/([0-9.]+)/]
            ],
            x = {
                name: "na",
                version: b
            }, y = function (e) {
                e = (e || "").toLowerCase();
                var n = {};
                s(e, m, function (e, t) {
                    var r = parseFloat(t);
                    n.device = {
                        name: e,
                        version: r,
                        fullVersion: t
                    }, n.device[e] = r
                }, n), s(e, h, function (e, t) {
                    var r = parseFloat(t);
                    n.os = {
                        name: e,
                        version: r,
                        fullVersion: t
                    }, n.os[e] = r
                }, n);
                var t = u(e);
                return s(e, g, function (e, r) {
                    var o = r;
                    t && (r = t.engineVersion || t.engineMode, o = t.engineMode);
                    var i = parseFloat(r);
                    n.engine = {
                        name: e,
                        version: i,
                        fullVersion: r,
                        mode: parseFloat(o),
                        fullMode: o,
                        compatible: t ? t.compatible : !1
                    }, n.engine[e] = i
                }, n), s(e, w, function (e, r) {
                    var o = r;
                    t && ("ie" === e && (r = t.browserVersion), o = t.browserMode);
                    var i = parseFloat(r);
                    n.browser = {
                        name: e,
                        version: i,
                        fullVersion: r,
                        mode: parseFloat(o),
                        fullMode: o,
                        compatible: t ? t.compatible : !1
                    }, n.browser[e] = i
                }, n), n
            };
        if ("object" == typeof process && "[object process]" === process.toString()) {
            var k = t.require("./morerule");
            [].unshift.apply(m, k.DEVICES || []), [].unshift.apply(h, k.OS || []), [].unshift.apply(w, k.BROWSER || []), [].unshift.apply(g, k.ENGINE || [])
        } else {
            var O = navigator.userAgent || "",
                _ = navigator.appVersion || "",
                z = navigator.vendor || "";
            d = p.external, l = y(O + " " + _ + " " + z), p.detector = l
        }
        l.parse = y, t.exports = l
    }), n("name-storage/1.2.0/index", function (n, t, r) {
        function o() {
            var e, n = [],
                t = !0;
            for (var r in p) p.hasOwnProperty(r) && (t = !1, e = p[r] || "", n.push(l(r) + s + l(e)));
            a.name = t ? i : u + l(i) + f + n.join(d)
        }
        var i, a = e,
            u = "nameStorage:",
            c = /^([^=]+)(?:=(.*))?$/,
            f = "?",
            s = "=",
            d = "&",
            l = encodeURIComponent,
            b = decodeURIComponent,
            p = {}, v = {};
        ! function (e) {
            if (e && 0 === e.indexOf(u)) {
                var n = e.split(/[:?]/);
                n.shift(), i = b(n.shift()) || "";
                for (var t, r, o, a = n.join(""), f = a.split(d), s = 0, l = f.length; l > s; s++) t = f[s].match(c), t && t[1] && (r = b(t[1]), o = b(t[2]) || "", p[r] = o)
            } else i = e || ""
        }(a.name), v.setItem = function (e, n) {
            e && "undefined" != typeof n && (p[e] = String(n), o())
        }, v.getItem = function (e) {
            return p.hasOwnProperty(e) ? p[e] : null
        }, v.removeItem = function (e) {
            p.hasOwnProperty(e) && (p[e] = null, delete p[e], o())
        }, v.clear = function () {
            p = {}, o()
        }, v.valueOf = function () {
            return p
        }, v.toString = function () {
            var e = a.name;
            return 0 === e.indexOf(u) ? e : u + e
        }, a.nameStorage = v, r.exports = v
    }), n("evt/0.2.1/evt", function (e, n, t) {
        function r() {}
        r.prototype = {
            on: function (e, n) {
                var t = this,
                    r = t._ || (t._ = {}),
                    o = r[e] || (r[e] = []);
                return o.push(n), t
            },
            off: function (e, n) {
                var t = this,
                    r = t._;
                if (r) {
                    if (!e && !n) return t._ = {}, t;
                    var o = r[e];
                    if (o)
                        if (n) {
                            for (var i = o.length - 1; i >= 0; i--)
                                if (o[i] === n) {
                                    o.splice(i, 1);
                                    break
                                }
                        } else delete r[e]
                }
                return t
            },
            emit: function (e) {
                var n = this,
                    t = n._;
                if (t) {
                    var r = t[e],
                        o = Array.prototype.slice.call(arguments);
                    if (o.shift(), r) {
                        r = r.slice();
                        for (var i = 0, a = r.length; a > i; i++) r[i].apply(n, o)
                    }
                }
                return n
            }
        }, t.exports = r
    }), n("md5/2.0.0/md5", function (e, n, t) {
        function r(e, n) {
            var t = (65535 & e) + (65535 & n),
                r = (e >> 16) + (n >> 16) + (t >> 16);
            return r << 16 | 65535 & t
        }

        function o(e, n) {
            return e << n | e >>> 32 - n
        }

        function i(e, n, t, i, a, u) {
            return r(o(r(r(n, e), r(i, u)), a), t)
        }

        function a(e, n, t, r, o, a, u) {
            return i(n & t | ~n & r, e, n, o, a, u)
        }

        function u(e, n, t, r, o, a, u) {
            return i(n & r | t & ~r, e, n, o, a, u)
        }

        function c(e, n, t, r, o, a, u) {
            return i(n ^ t ^ r, e, n, o, a, u)
        }

        function f(e, n, t, r, o, a, u) {
            return i(t ^ (n | ~r), e, n, o, a, u)
        }

        function s(e, n) {
            e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
            var t, o, i, s, d, l = 1732584193,
                b = -271733879,
                p = -1732584194,
                v = 271733878;
            for (t = 0; t < e.length; t += 16) o = l, i = b, s = p, d = v, l = a(l, b, p, v, e[t], 7, -680876936), v = a(v, l, b, p, e[t + 1], 12, -389564586), p = a(p, v, l, b, e[t + 2], 17, 606105819), b = a(b, p, v, l, e[t + 3], 22, -1044525330), l = a(l, b, p, v, e[t + 4], 7, -176418897), v = a(v, l, b, p, e[t + 5], 12, 1200080426), p = a(p, v, l, b, e[t + 6], 17, -1473231341), b = a(b, p, v, l, e[t + 7], 22, -45705983), l = a(l, b, p, v, e[t + 8], 7, 1770035416), v = a(v, l, b, p, e[t + 9], 12, -1958414417), p = a(p, v, l, b, e[t + 10], 17, -42063), b = a(b, p, v, l, e[t + 11], 22, -1990404162), l = a(l, b, p, v, e[t + 12], 7, 1804603682), v = a(v, l, b, p, e[t + 13], 12, -40341101), p = a(p, v, l, b, e[t + 14], 17, -1502002290), b = a(b, p, v, l, e[t + 15], 22, 1236535329), l = u(l, b, p, v, e[t + 1], 5, -165796510), v = u(v, l, b, p, e[t + 6], 9, -1069501632), p = u(p, v, l, b, e[t + 11], 14, 643717713), b = u(b, p, v, l, e[t], 20, -373897302), l = u(l, b, p, v, e[t + 5], 5, -701558691), v = u(v, l, b, p, e[t + 10], 9, 38016083), p = u(p, v, l, b, e[t + 15], 14, -660478335), b = u(b, p, v, l, e[t + 4], 20, -405537848), l = u(l, b, p, v, e[t + 9], 5, 568446438), v = u(v, l, b, p, e[t + 14], 9, -1019803690), p = u(p, v, l, b, e[t + 3], 14, -187363961), b = u(b, p, v, l, e[t + 8], 20, 1163531501), l = u(l, b, p, v, e[t + 13], 5, -1444681467), v = u(v, l, b, p, e[t + 2], 9, -51403784), p = u(p, v, l, b, e[t + 7], 14, 1735328473), b = u(b, p, v, l, e[t + 12], 20, -1926607734), l = c(l, b, p, v, e[t + 5], 4, -378558), v = c(v, l, b, p, e[t + 8], 11, -2022574463), p = c(p, v, l, b, e[t + 11], 16, 1839030562), b = c(b, p, v, l, e[t + 14], 23, -35309556), l = c(l, b, p, v, e[t + 1], 4, -1530992060), v = c(v, l, b, p, e[t + 4], 11, 1272893353), p = c(p, v, l, b, e[t + 7], 16, -155497632), b = c(b, p, v, l, e[t + 10], 23, -1094730640), l = c(l, b, p, v, e[t + 13], 4, 681279174), v = c(v, l, b, p, e[t], 11, -358537222), p = c(p, v, l, b, e[t + 3], 16, -722521979), b = c(b, p, v, l, e[t + 6], 23, 76029189), l = c(l, b, p, v, e[t + 9], 4, -640364487), v = c(v, l, b, p, e[t + 12], 11, -421815835), p = c(p, v, l, b, e[t + 15], 16, 530742520), b = c(b, p, v, l, e[t + 2], 23, -995338651), l = f(l, b, p, v, e[t], 6, -198630844), v = f(v, l, b, p, e[t + 7], 10, 1126891415), p = f(p, v, l, b, e[t + 14], 15, -1416354905), b = f(b, p, v, l, e[t + 5], 21, -57434055), l = f(l, b, p, v, e[t + 12], 6, 1700485571), v = f(v, l, b, p, e[t + 3], 10, -1894986606), p = f(p, v, l, b, e[t + 10], 15, -1051523), b = f(b, p, v, l, e[t + 1], 21, -2054922799), l = f(l, b, p, v, e[t + 8], 6, 1873313359), v = f(v, l, b, p, e[t + 15], 10, -30611744), p = f(p, v, l, b, e[t + 6], 15, -1560198380), b = f(b, p, v, l, e[t + 13], 21, 1309151649), l = f(l, b, p, v, e[t + 4], 6, -145523070), v = f(v, l, b, p, e[t + 11], 10, -1120210379), p = f(p, v, l, b, e[t + 2], 15, 718787259), b = f(b, p, v, l, e[t + 9], 21, -343485551), l = r(l, o), b = r(b, i), p = r(p, s), v = r(v, d);
            return [l, b, p, v]
        }

        function d(e) {
            var n, t = "";
            for (n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
            return t
        }

        function l(e) {
            var n, t = [];
            for (t[(e.length >> 2) - 1] = void 0, n = 0; n < t.length; n += 1) t[n] = 0;
            for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
            return t
        }

        function b(e) {
            return d(s(l(e), 8 * e.length))
        }

        function p(e, n) {
            var t, r, o = l(e),
                i = [],
                a = [];
            for (i[15] = a[15] = void 0, o.length > 16 && (o = s(o, 8 * e.length)), t = 0; 16 > t; t += 1) i[t] = 909522486 ^ o[t], a[t] = 1549556828 ^ o[t];
            return r = s(i.concat(l(n)), 512 + 8 * n.length), d(s(a.concat(r), 640))
        }

        function v(e) {
            var n, t, r = "0123456789abcdef",
                o = "";
            for (t = 0; t < e.length; t += 1) n = e.charCodeAt(t), o += r.charAt(n >>> 4 & 15) + r.charAt(15 & n);
            return o
        }

        function m(e) {
            return unescape(encodeURIComponent(e))
        }

        function h(e) {
            return b(m(e))
        }

        function g(e) {
            return v(h(e))
        }

        function w(e, n) {
            return p(m(e), m(n))
        }

        function x(e, n) {
            return v(w(e, n))
        }

        function y(e, n, t) {
            return n ? t ? w(n, e) : x(n, e) : t ? h(e) : g(e)
        }
        t.exports = y
    })
}(this);
this.Smartracker || function (a) {
    function b(a) {
        var b = a.type;
        if ("undefined" != typeof b) return "text" == b && (b = p.getAttr(a, "type") || "text"), b.toUpperCase()
    }

    function c(a, c) {
        for (var d = 0, e = a.length; e > d; d++) {
            var f = null;
            switch (a[d].tagName.toUpperCase()) {
            case "A":
            case "AREA":
                f = "link";
                break;
            case "IMG":
                "A" !== a[d].parentNode.tagName.toUpperCase() && (f = "image");
                break;
            case "INPUT":
                switch (b(a[d])) {
                case "SUBMIT":
                case "BUTTON":
                case "RESET":
                case "IMAGE":
                    f = "button";
                    break;
                case "HIDDEN":
                    break;
                case "TEXT":
                case "PASSWORD":
                case "FILE":
                case "DATE":
                default:
                    f = "input"
                }
                break;
            case "BUTTON":
                f = "button";
                break;
            case "TEXTAREA":
                f = "input";
                break;
            case "SELECT":
                f = "input"
            }
            c(a[d], f)
        }
    }

    function d(a, b) {
        switch (y[0] = f(a), b) {
        case "link":
            y[1] = h(a);
            break;
        case "image":
            y[1] = i(a);
            break;
        case "input":
        case "button":
            y[1] = j(a);
            break;
        default:
            return
        }
        var c = y.join(t).replace(z, "");
        w.hasOwnProperty(c) && (c = c + "T" + ++w[c]);
        var d = {
            element: a,
            seed: c
        };
        return n("seed", d), d.seed && (a.setAttribute(s, d.seed), a.setAttribute("smartracker", "on"), w[d.seed] = 0), c
    }

    function e(a) {
        if (!a || !a.length) return "";
        for (var b = 1, c = a.length; c > b; b++) a[b] = a[b].charAt(0).toUpperCase() + a[b].substring(1);
        return a.join("")
    }

    function f(a) {
        var b, c, d = a.parentNode;
        do {
            if (p.hasAttr(d, "id") && (c = p.getAttr(d, "id"))) return e(c.split("-"));
            if (p.hasAttr(d, "class") && (b = l(p.getAttr(d, "class") || d.className || ""))) return b
        } while (d = d.parentNode);
        return "global"
    }

    function g(a) {
        {
            var b = [],
                c = m(a),
                d = c.pathname.replace(/^\//, "").split("/"),
                f = m(document.URL);
            f.pathname.replace(/^\//, "").split("/")
        }
        return b.push(c.domainName || f.domainName), d[d.length - 1] = d[d.length - 1].split(".")[0] || "index", b.push.apply(b, d), e(b)
    }

    function h(a) {
        var b, c, d, f, h;
        if (b = p.getAttr(a, "id")) return e(b.split("-"));
        if (h = l(p.getAttr(a, "class") || a.className || "")) return h;
        if (d = p.getAttr(a, "href") || "", !d || 0 == d.indexOf("#"), f = g(d)) switch (f.protocol) {
        case "http:":
        case "https:":
            return f
        }
        return (c = k(p.innerText(a))) ? c : "link"
    }

    function i(a) {
        var b, c, d;
        return (b = p.getAttr(a, "id")) ? b : (d = l(p.getAttr(a, "class") || a.className || "")) ? d : (d = g(p.getAttr(a, "src"))) ? d : (c = k(p.getAttr(a, "alt") || p.getAttr(a, "title"))) ? c : ""
    }

    function j(a) {
        var c, d, f, g = [];
        if (c = p.getAttr(a, "id") || p.getAttr(a, "name") || "") return e(c.split("-"));
        if (f = l(p.getAttr(a, "class") || a.className || "")) return f;
        switch (d = b(a)) {
        case "BUTTON":
        case "SUBMIT":
        case "RESET":
        case "IMAGE":
            return g.push("btn"), g.push(k(p.innerText(a))), e(g);
        case "HIDDEN":
            return "";
        case "TEXT":
        case "DATE":
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
        default:
            return g.push("ipt"), g.push(a.id || a.name || ""), e(g)
        }
        return e(g) || ""
    }

    function k(a) {
        return a ? u.test(a) ? a.replace(v, t) : "" : ""
    }

    function l(a) {
        if (!a) return "";
        a = a.replace(/\r|\n|\t|\f|\v/g, "");
        for (var b = a.split(" "), c = 0, d = b.length; d > c; c++)
            if (0 !== b[c].indexOf("ui-") && 0 !== b[c].indexOf("fn-") && 0 !== b[c].indexOf("sl-")) return e(b[c].split("-"));
        return ""
    }

    function m(a) {
        var b = document.createElement("a");
        b.setAttribute("href", a);
        var c = b.pathname.split("/").slice(-1).join(""),
            d = c.split(".").slice(0, 1).join(""),
            e = b.hostname,
            f = e.split(".").slice(0, 1).join("");
        return {
            protocol: b.protocol,
            domain: e,
            domainName: f,
            path: b.pathname,
            pathname: b.pathname,
            file: c,
            fileName: d
        }
    }

    function n(a, b) {
        var c = B[a];
        if (c) {
            c = c.slice();
            for (var d = 0, e = c.length; e > d; d++) c[d](b)
        }
        return A
    }
    var o, p = {
            getAttr: function (a, b) {
                if (!a || "undefined" == typeof a.getAttribute) return null;
                var c = a.getAttribute(b, 2);
                return c && "string" == typeof c && (c = c.replace(/\r|\n|\t|\f|\v/g, "")), c
            },
            hasAttr: function (a, b) {
                if (!a || 1 != a.nodeType) return !1;
                if (a.hasAttribute) return a.hasAttribute(b);
                if ("class" == b) return "" !== a.className;
                if ("style" == b) return "" !== a.style.cssText;
                var c = p.getAttr(a, b);
                return null == c ? !1 : "function" == typeof c ? 0 == c.toString().indexOf("function " + b + "()") : !0
            },
            innerText: function (a) {
                return a.innerText || a.textContent || ""
            }
        }, q = document,
        r = location,
        s = (r.hostname, "seed"),
        t = "-",
        u = /^[a-zA-Z][a-zA-Z0-9_\s-]*$/,
        v = /\s+/g,
        w = {}, x = [],
        y = ["", ""],
        z = /[\\\.~!@#\$%\^&:;,\/\+\(\)\[\]\{\}]/g,
        A = {};
    A.get = function (a) {
        return d(a)
    }, A.sow = function () {
        o = q.getElementsByTagName("*"), c(o, function (a, b) {
            var c;
            p.hasAttr(a, s) && (c = p.getAttr(a, s)) ? c && (w[c] = 0) : b && x.push(a)
        }), c(x, d)
    };
    var B = {};
    A.on = function (a, b) {
        var c = B[a] || (B[a] = []);
        return c.push(b), A
    }, A.off = function () {}, "function" == typeof define && define("alipay/smartracker/2.0.0/smartracker", [], function (a, b, c) {
        c.exports = A
    }), a.Smartracker = A
}(this);