window.light || function(a) {
    var b = a.document, c = a.location, d = Array.prototype, e, f;
    try {
        f = c.href;
    } catch (g) {
        f = b.createElement("a"), f.href = "", f = f.href;
    }
    e = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?([^?#]*))?/.exec(f.toLowerCase()) || [];
    var h = {
        version: "0.9.0",
        timestamp: new Date().getTime(),
        debug: !1,
        baseDomain: function() {
            var a = e[2].split(".");
            return a.slice(-Math.max(a.length - 1, 2)).join(".");
        }(),
        urlParts: e,
        toString: function() {
            var a = "Light JavaScript Library version " + h.version;
            h.debug && (a += ", debug enabled");
            return a + ".";
        },
        toArray: function(a) {
            var b = [];
            if (!a.length) return b;
            for (var c = 0, d = a.length; c < d; c++) b[c] = a[c];
            return b;
        },
        map: function(a, b, c) {
            if (d.map) return d.map.call(a, b, c);
            var e = [], f = a.length;
            if (!f) return e;
            for (var g = 0; g < f; g++) e[g] = b.call(c, a[g], g, a);
            return e;
        },
        reduce: function(a, b, c) {
            if (d.reduce) return d.reduce.call(a, b, c);
            var e = 0, f = a.length;
            if (!f && void 0 == c) throw new TypeError("Reduce of empty array with no initial value");
            void 0 == c && (c = a[0], e = 1);
            for (;e < f; ) c = b.call(void 0, c, a[e], e, a), e++;
            return c;
        },
        register: function(b, c, d) {
            b = b.split("/");
            c = c || h;
            b[0] || (c = a, b.shift());
            for (var e, f = 0, g = b.length - 1; f < g; f++) if (e = b[f]) c = c[e] = c[e] || {};
            (e = b[f]) && (c = c[e] = void 0 === d ? {} : d);
            return c;
        },
        extend: function(a) {
            var b = h.toArray(arguments);
            "boolean" !== typeof b[0] && b.unshift(a = !1);
            if (2 > b.length) return null;
            var c = 2, d = b[1];
            2 === b.length && (c = 1, d = h);
            for (var e = c, f = b.length; e < f; e++) if ((c = b[e]) && "object" === typeof c) for (var g in c) {
                var i = c[g];
                i !== d && c.hasOwnProperty(g) && (h.isArray(i) ? d[g] = Array.prototype.concat.call(i) : a && i instanceof Object && !h.isFunction(i) && !i.nodeType ? d[g] = h.extend(!0, d[g] || {}, c[g]) : void 0 !== i && (d[g] = i));
            }
            return d;
        },
        deriveFrom: function(a, b, c) {
            if (2 > arguments.length) return a;
            var d = b && b.init || function() {
                a.constructor.apply(this, arguments);
            };
            h.extend(!0, d.prototype, a.prototype, b);
            d.constructor = d;
            c && h.extend(!0, d, c);
            d.__super = a;
            return d;
        },
        module: function(a, b) {
            var c = h.register(a, null, b);
            h.isFunction(b) && (c.constructor = b);
            return c;
        },
        each: function(a, b) {
            if (!a) return a;
            var c = a.length;
            if (void 0 !== c && "reverse" in a) for (var d = 0; d < c && !1 !== b.call(a[d], d, a[d], a); ) d++; else for (d in a) if (!1 === b.call(a[d], d, a[d], a)) break;
            return a;
        },
        isFunction: function(a) {
            return "function" === h.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === h.type(a);
        },
        isString: function(a) {
            return "string" === h.type(a);
        },
        isObject: function(a) {
            return "object" === h.type(a);
        },
        isNull: function(a) {
            return "null" === h.type(a);
        },
        isUndefined: function(a) {
            return void 0 === a;
        },
        isWindow: function(a) {
            return a && "object" === typeof a && "setInterval" in a;
        },
        type: function(a) {
            return null === a || void 0 === a ? "" + a : i[Object.prototype.toString.call(a)] || "object";
        },
        has: function(b) {
            if (!b) return !1;
            var b = b.split("/"), c = h, d, e;
            b[0] || (c = a, b.shift());
            d = 0;
            for (e = b.length; d < e; d++) if (c = c[b[d]], void 0 === c) return !1;
            return !0;
        },
        noop: function() {}
    }, i = {};
    h.each("Boolean,Number,String,Function,Array,Date,RegExp,Object,Null".split(","), function(a, b) {
        i["[object " + b + "]"] = b.toLowerCase();
    });
    a.light = h;
}(window);

light.extend({
    log: function() {
        return !light.debug || !window.console || !console.log ? function() {
            if (light.debug) try {
                window.console && console.log && console.log.apply(console, arguments);
            } catch (a) {}
        } : Function.prototype.bind ? function() {
            light.debug && Function.prototype.bind.call(console.log, console).apply(console, arguments);
        } : console.log.apply ? function() {
            light.debug && console.log.apply(console, arguments);
        } : light.debug ? console.log : light.noop;
    }(),
    inspect: function(a) {
        var b = function(a) {
            if (!light.isObject(a)) return light.isString(a) ? '"' + (a + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0") + '"' : a.toString();
            var c = [], d;
            for (d in a) light.isUndefined(a[d]) || (light.isNull(a[d]) ? c.push('"' + d + '":null') : light.isObject(a[d]) ? c.push('"' + d + '":{' + b(a[d]) + "}") : c.push('"' + d + '":' + b(a[d])));
            return c.join();
        };
        if (window.JSON && JSON.stringify) return JSON.stringify(a);
        if ("object" === typeof a) {
            var c = "", c = b(a);
            return "{" + c + "}";
        }
        return "" + a;
    },
    trackOn: !0,
    track: function() {
        var a = [], b = function(c) {
            window.Tracker ? Tracker.click(c) : (a.push(c), window.setTimeout(function() {
                b(a.shift());
            }, 100));
        };
        return function(a, c) {
            if (light.trackOn && a) {
                if (c) var d = light.client.info, e = d.browser.version, e = e ? e[0] : "na", a = a + ("-" + (d.browser.name || "na") + "-" + (d.engine.name || "na") + "-" + e);
                b(a);
            }
        };
    }(),
    trim: function(a) {
        return !a ? "" : String.prototype.trim ? String.prototype.trim.apply(a) : a.replace(/^\s+|\s+$/g, "");
    },
    substitute: function(a, b, c) {
        if (!a) return "";
        if (!b) return a;
        if ("string" !== typeof a) throw "invalid template";
        return a.replace(RegExp("{\\w+}", "gmi"), function(a) {
            var a = a.substr(1, a.length - 2), d = b[a];
            return null != d ? d.toString() : c ? "{" + a + "}" : "";
        });
    },
    encode: encodeURIComponent || escape,
    decode: decodeURIComponent || unescape,
    param: function(a, b, c) {
        var b = b || "=", d = [];
        light.each(a, function(c, e) {
            if (c && a.hasOwnProperty(c)) {
                var f = light.encode(c);
                null != e && (f += b + light.encode(e));
                d.push(f);
            }
        });
        return d.join(c || "&");
    },
    unparam: function(a, b, c) {
        var d = {};
        if (!a) return d;
        b = b || "=";
        light.each(a.split(c || "&"), function(a, c) {
            var e = c.split(b);
            2 < e.length && (e[1] = e.slice(1).join(b));
            e[0] && (d[light.decode(e[0])] = 1 < e.length ? light.decode(e[1]) : null);
        });
        return d;
    },
    trimTag: function(a) {
        if (!a || !document.createElement) return "";
        var b = document.createElement("DIV");
        b.innerHTML = a;
        return b.textContent || b.innerText || "";
    },
    escapeHTML: function(a) {
        if (!a) return "";
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/</g, "&lt;");
        a = a.replace(/&/g, "&amp;");
        a = a.replace(/"/g, "&quot;");
        return a = a.replace(/'/g, "&#039;");
    },
    unescapeHTML: function(a) {
        if (!a) return "";
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&amp;/g, "&");
        a = a.replace(/&quot;/g, '"');
        return a = a.replace(/&#039;/g, "'");
    },
    toJSON: function(a) {
        if ("string" !== typeof a || !a) return null;
        a = light.trim(a);
        return window.JSON && JSON.parse ? JSON.parse(a) : new Function("return " + a)();
    }
});

!function() {
    var a = function() {
        this.stack = [];
        var a = this, b = [].slice.call(arguments, 0);
        b && light.each(b, function(b) {
            a.add(b);
        });
    };
    a.prototype = {
        add: function(a) {
            this.stack.push(a);
        },
        clear: function() {
            this.stack = [];
        },
        invoke: function() {
            var a = this, b = [].slice.call(arguments, 0);
            fn = this.stack.shift();
            this.next || (this.next = function() {
                a.stack.length && a.invoke.apply(a, b);
            });
            fn.apply(null, [ this.next ].concat(b));
        }
    };
    light.queue = a;
}();

!function(a, b) {
    var c = a.document, d = a.navigator, e = d.userAgent ? d.userAgent.toLowerCase() : "", f = a.external, d = {
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
            windowsce: 0 < e.indexOf("windows ce ") ? /windows ce (\d)\.(\d)/ : "windows ce",
            symbian: /symbianos\/(\d+)\.(\d+)/,
            blackberry: "blackberry"
        },
        engine: {
            trident: 0 < e.indexOf("msie ") ? /msie (\d+)\.(\d+)/ : /trident\/(\d+)\.(\d+)/,
            webkit: /applewebkit\/([\d\+]+)(?:\.(\d+))?/,
            gecko: /gecko\/(\d+)/,
            presto: /presto\/(\d+).(\d+)/
        },
        browser: {
            360: function() {
                if (!g.os.windows) return !1;
                if (f) try {
                    return f.twGetVersion(f.twGetSecurityID(a)).split(".");
                } catch (b) {
                    try {
                        return -1 !== f.twGetRunPath.toLowerCase().indexOf("360se") || !!f.twGetSecurityID(a);
                    } catch (c) {}
                }
                return /360(?:se|chrome)/;
            },
            mx: function() {
                if (!g.os.windows) return !1;
                if (f) try {
                    return (f.mxVersion || f.max_version).split(".");
                } catch (a) {}
                return -1 !== e.indexOf("maxthon ") ? /maxthon (\d)\.(\d)/ : "maxthon";
            },
            sg: / se (\d)\./,
            tw: function() {
                if (!g.os.windows) return !1;
                if (f) try {
                    return -1 !== f.twGetRunPath.toLowerCase().indexOf("theworld");
                } catch (a) {}
                return "theworld";
            },
            qq: function() {
                return 0 < e.indexOf("qqbrowser/") ? /qqbrowser\/(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/ : /tencenttraveler (\d)\.(\d)/;
            },
            ie: 0 < e.indexOf("trident/") ? /trident\/(\d+)\.(\d+)/ : /msie (\d+)\.(\d+)/,
            chrome: / (?:chrome|crios)\/(\d+)\.(\d+)/,
            safari: /version\/(\d+)\.(\d+)(?:\.([ab\d]+))?(?: mobile(?:\/[a-z0-9]+)?)? safari\//,
            firefox: /firefox\/(\d+)\.([ab\d]+)/,
            opera: /opera.+version\/(\d+)\.([ab\d]+)/
        },
        feature: {
            "64bitBrowser": "win64; x64;",
            "64bitOS": /win64|wow64/,
            security: / (i|u|s|sv1)[;\)]/,
            simulator: function() {
                return g.os.ios && 960 < screen.width;
            }
        }
    }, g = {};
    b.each(d, function(a, c) {
        g["has" + a.charAt(0).toUpperCase() + a.slice(1)] = function(b, c) {
            var d;
            a: if (!g[a] || !(d = g[a][b])) d = !1; else {
                if (c) {
                    var e = c;
                    "string" === typeof e ? e = e.split(".") : "number" === typeof e && (e = [ e ]);
                    for (var f, h, i = 0, j = Math.max(e.length, d.length); i < j; i++) if (f = parseInt(e[i], 10) || 0, 
                    h = parseInt(d[i], 10) || 0, f !== h) {
                        d = f < h;
                        break a;
                    }
                }
                d = !0;
            }
            return d;
        };
        var d = g[a] = {
            name: "n/a",
            version: [ -1 ]
        };
        b.each(c, function(a, c) {
            var f = [ 0 ], h = b.isFunction(c) ? c.apply(g) : c;
            if (h) if (!0 === h) f = [ -1 ]; else if ("string" === typeof h) f = [ -1 !== e.indexOf(h) ? -1 : 0 ]; else {
                var i = h;
                h.exec && (i = h.exec(e) || [], i.length && i.shift());
                for (h = 0; h < i.length; h++) f[h] = parseInt(i[h], 10) || 0;
            }
            if (i = !!f[0]) d[a] = d.version = f, d.name = a;
            return !i;
        });
    });
    !g.engine.name && a.ActiveXObject instanceof Function ? (c.documentMode ? g.engine.trident = g.engine.version = [ c.documentMode, 0 ] : g.engine.trident || (g.engine.trident = g.engine.version = [ -1 ]), 
    g.engine.name = "trident") : !g.os.windows && g.hasEngine("trident", 6) && (g.os.windows = g.os.version = [ -1 ], 
    g.os.name = "windows");
    g.browser.ie && 0 < e.indexOf("trident/") && (g.browser.ie[0] = g.browser.version[0] += 4);
    b.module("client/info", g);
}(window, light);

!function(a, b) {
    var c = a.document, d = a.navigator, e = !1, f = function() {
        e || (b.write('<input type="hidden" id="__ud" style="behavior:url("#default#userData")"/>'), 
        e = !0);
        return b.get("__ud");
    }, g = {
        cookie: null,
        defaultStorage: function() {
            var b = null;
            try {
                b = a.localStorage;
            } catch (c) {}
            return b;
        }(),
        set: function(a, e) {
            if (g.cookie && d.cookieEnabled) {
                var i = a + "=" + encodeURIComponent(e);
                if (g.cookie.days) var j = new Date(new Date().getTime() + 864e5 * g.cookie.days), i = i + ("; expires=" + j.toGMTString());
                g.cookie.domain && (i += "; domain=" + g.cookie.domain);
                i += "; path=" + (g.cookie.path || b.urlParts[4] || "/");
                c.cookie = i;
            }
            if (h) g.defaultStorage.setItem(a, e); else if (i = f()) {
                i.setAttribute(a, e);
                try {
                    i.save("__ud");
                } catch (k) {}
            }
        },
        get: function(a) {
            if (g.cookie) {
                if (d.cookieEnabled) {
                    var e = c.cookie, i = e.indexOf(a + "=");
                    return -1 != i ? (i += a.length + 1, a = e.indexOf(";", i), -1 == a && (a = e.length), 
                    b.decode(e.substring(i, a) || "")) : null;
                }
                return "";
            }
            if (h) e = g.defaultStorage.getItem(a); else if (i = f()) {
                try {
                    i.load("__ud");
                } catch (j) {}
                e = i.getAttribute(a);
            }
            return e || "";
        }
    }, h = !!g.defaultStorage;
    b.module("client/storage", g);
}(window, light);

light.extend({
    get: function(a) {
        return !a ? null : "string" === typeof a ? !light.node || /^[\w-]+$/.test(a) ? document.getElementById(a) : light.node(a)[0] : a.getConfig ? a[0] || null : a;
    },
    write: function(a) {
        if ("complete" === document.readyState) {
            var b = document.createElement("span");
            b.innerHTML = a;
            document.body.appendChild(b);
        } else document.write(a);
    },
    isHTMLElement: function(a) {
        return a && (1 === a.nodeType || 9 === a.nodeType);
    },
    hasClass: function(a, b) {
        return a ? RegExp("(\\s|^)" + b + "(\\s|$)").test(a.className) : !1;
    },
    setStyle: function(a, b) {
        if ("string" === light.type(b) && 2 == arguments.length) {
            var c = {};
            c[arguments[0]] = arguments[1];
            b = c;
        }
        for (var d in b) c = b[d], "number" === typeof c && (c += "px"), "opacity" == d ? 1 > c && 0 < c && (isIE && 9 > light.client.info.browser.version[0] ? a.style.filter = "alpha(opacity=" + 100 * c + ")" : a.style.opacity = 1e-5 > c ? 0 : c) : a.style["float" == d || "cssFloat" == d ? void 0 === typeof a.style.styleFloat ? "cssFloat" : "styleFloat" : d] = c;
        return this;
    },
    getStyle: function(a, b) {
        var c = a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, null)[b];
        "string" === typeof c && "px" === c.slice(-2) && (c = parseInt(c, 10));
        return c;
    },
    exists: function(a) {
        a = light.get(a);
        if (!a) return !1;
        for (;a = a.parentNode; ) if (a == document) return !0;
        return !1;
    }
});

!function(a, b) {
    var c = function(a, c) {
        if (!a._fixed) {
            a._fixed = !0;
            a.target || (a.target = a.srcElement || b);
            a.data = c || {};
            3 === a.target.nodeType && (a.target = a.target.parentNode);
            !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
            if (void 0 === a.pageX && void 0 !== a.clientX) {
                var d = a.target.ownerDocument || b, e = d.documentElement, d = d.body;
                a.pageX = a.clientX + (e && e.scrollLeft || d && d.scrollLeft || 0) - (e && e.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (e && e.scrollTop || d && d.scrollTop || 0) - (e && e.clientTop || d && d.clientTop || 0);
            }
            if (!a.which && (a.charCode || a.keyCode)) a.which = a.charCode || a.keyCode;
            !a.metaKey && a.ctrlKey && (a.metaKey = a.ctrlKey);
            !a.which && void 0 !== a.button && (a.which = 1 & a.button ? 1 : 2 & a.button ? 3 : 4 & a.button ? 2 : 0);
            a.cancel = function() {
                if (a.preventDefault) a.preventDefault(); else {
                    a.returnValue = false;
                    a.defaultPrevented = true;
                }
            };
            a.stop = function() {
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = true;
            };
        }
    }, d = /\s+/, e = {}, f = {
        data: null,
        capturing: !1,
        timeout: 0
    };
    a.extend({
        on: function(b, g, h, i) {
            var j = "string" === typeof b ? a.get(b) : b;
            if (j && g && "string" === typeof g) if (d.test(g)) a.each(g.split(d), function(c, d) {
                a.on(b, d, h, i);
            }); else {
                var k = a.extend({}, f, i), l = function(b) {
                    c(b, k.extraData);
                    var d;
                    k.timeout ? (a.log("timeout event: %d", k.timeout), setTimeout(function() {
                        h.call(j, b);
                    }, k.timeout)) : d = h.call(j, b);
                    return !1 !== d && !b.defaultPrevented;
                };
                j.addEventListener ? j.addEventListener(g, l, k.capturing ? !0 : !1) : j.attachEvent && (k.capturing && ("focus" === g ? g = "focusin" : "blur" === g && (g = "focusout")), 
                j.attachEvent("on" + g, l));
                (e[g] = e[g] || []).push([ j, h, l ]);
            }
        },
        listen: function(c, e, f) {
            var g = b, h = c, c = c.split(d, 2);
            2 === c.length && (g = a.get(c[0].substr(1)), h = c[1]);
            var c = a.client.info.engine, i = function(b) {
                for (var c = b.target; c; ) {
                    if ("." === h.charAt(0)) {
                        if (a.hasClass(c, h.substr(1))) break;
                    } else if (c.tagName === h.toUpperCase()) break; else if (c === g) {
                        c = null;
                        break;
                    }
                    c = c.parentNode;
                }
                c && f.call(c, b);
            };
            if ("change" === e && c.trident && 9 > c.trident[0]) c = a.toArray(g.getElementsByTagName("input")), 
            c.concat(g.getElementsByTagName("select")), c.concat(g.getElementsByTagName("textarea")), 
            a.log("%d fields captured", c.length), a.each(c, function() {
                a.on(this, e, i);
            }); else a.on(g, e, i, {
                capturing: !0
            });
        },
        removeEvent: function(b, c, d) {
            var f = a.get(b);
            if (f) {
                var g = d, h = -1;
                e[c] && a.each(e[c], function(a, b) {
                    if (b[0] === f && b[1] === d) return g = b[2], h = a, !1;
                });
                0 <= h && e[c].splice(h, 1);
                f.removeEventListener ? f.removeEventListener(c, g, !1) : f.detachEvent("on" + c, g);
            }
        },
        fire: function(c, d, e) {
            var f = a.get(c);
            if (!f || !d) return !1;
            if (b.createEvent) return c = b.createEvent("HTMLEvents"), e && a.extend(c, e), 
            c.initEvent(d, !0, !0), !f.dispatchEvent(c);
            c = b.createEventObject();
            e && a.extend(c, e);
            return f.fireEvent("on" + d, d);
        },
        cancelEvent: function(a) {
            a.cancel && a.cancel();
        }
    });
}(window.light, window.document);

!function(a) {
    var b = {
        method: "GET",
        success: a.noop,
        failure: a.noop,
        finish: a.noop,
        timeoutHandler: a.noop,
        format: "json",
        force: !0,
        async: !0,
        timeout: -1,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
    }, c = {
        text: {
            parser: a.trim
        },
        json: {
            parser: a.toJSON,
            handler: function(a) {
                return a && "ok" === a.stat;
            },
            redirector: function(a) {
                a && a.redirectUrl && (window[a.target || "self"].location.href = a.redirectUrl);
            }
        }
    }, d = 0, e = function(e, f, g) {
        if ("JSONP" == g.method || "jsonp" == g.format) {
            f = f || {};
            d++;
            a.request._callbacks["callback" + d] = g.success || a.noop;
            f[g.hook || "_callback"] = "light.request._callbacks.callback" + d;
            g = document.createElement("script");
            g.setAttribute("type", "text/javascript");
            g.setAttribute("charset", "utf-8");
            var h = e.indexOf("?");
            -1 < h && (a.extend(f, a.unparam(e.slice(h + 1))), e = e.slice(0, h));
            g.setAttribute("src", e + "?" + a.param(f));
            document.getElementsByTagName("head")[0].appendChild(g);
            return null;
        }
        var f = "string" === typeof f ? f : a.param(f), i = a.extend({}, b, g);
        i.method = i.method ? i.method.toUpperCase() : b.method;
        var g = "GET" === i.method, j = null;
        i.fail && (i.failure = i.fail);
        g && i.force && (f += (f ? "&" : "") + "t=" + new Date().getTime().toString(36));
        window.XMLHttpRequest ? j = new XMLHttpRequest() : window.ActiveXObject instanceof Function && (j = new ActiveXObject("Microsoft.XMLHTTP"));
        g && f && (e += (0 < e.indexOf("?") ? "&" : "?") + f);
        j.open(i.method, e, i.async);
        g || j.setRequestHeader("Content-type", i.contentType);
        j.onreadystatechange = function() {
            if (4 == j.readyState) {
                a.log("Get response with code %d.", j.status);
                var b = {}, d = true, e = i.failure;
                if (200 == j.status) {
                    b = c[i.format].parser(j.responseText);
                    (d = c[i.format].redirector) && d(b);
                    d = c[i.format].handler;
                    if (d = !d || false !== d(b)) e = i.success;
                }
                e.call(j, b);
                i.finish.call(j, b, d);
            }
        };
        a.log("Send ajax %s request to %s.", i.format, e);
        j.send(g ? null : f);
        return j;
    };
    e.config = c;
    a.request = e;
    a.request._callbacks = {};
}(window.light);

!function(a) {
    var b = null, c = 0, d = function() {
        var b = a.client.info, d = document.documentMode;
        return b.hasEngine("trident", 6) || b.hasEngine("trident", 7) || d && 7 >= d ? 1948 - (c + 10).toString().length : 3400 - (c + 10).toString().length;
    }, e = function(b, c, d) {
        var c = c || "=", e = [];
        a.each(b, function(d, f) {
            d && b.hasOwnProperty(d) && ("dataContent" == d ? e.push(a.encode(d) + c + f) : e.push(a.encode(d) + c + a.encode(f)));
        });
        return e.join(d || "&");
    }, f = function(b, c, d, f) {
        a.packetRequest._packetCallbacks["callback" + c] = f || a.noop;
        b = b + "?" + e(d);
        c = document.createElement("script");
        c.setAttribute("type", "text/javascript");
        c.setAttribute("charset", "utf-8");
        c.setAttribute("src", b);
        document.getElementsByTagName("head")[0].appendChild(c);
        a.log("Send ajax request to %s.", b);
    };
    a.packetRequest = function(e, g, h, i) {
        function j(c, d) {
            var g = c.info;
            "fail" == g.packet ? (g = k[d], 1 < g.packet.sendCount && (g.packet.sendCount--, 
            f(e, g.count, g.packet, function(a) {
                j(a, d);
            }), a.log("%d: packet request sent again.", d))) : "success" == g.packet ? (g = k[++d], 
            f(e, g.count, g.packet, function(a) {
                j(a, d);
            }), a.log("%d: packet request sent.", d)) : "all" == g.packet && (b && clearTimeout(b), 
            i.success(c), a.log("all packet request sent successfully."));
        }
        var k = [], l = {
            packet: {
                sendCount: 3,
                dataId: new Date().getTime(),
                dataSize: 0,
                dataIndex: 0,
                dataContent: "",
                _callback: "light.packetRequest._packetCallbacks.callback"
            }
        };
        l.packet = a.extend(l.packet, g);
        for (var h = a.encode(a.inspect(h)), m = d() - (e + "?" + a.param(l.packet)).length, n = l.packet.dataSize = Math.ceil(h.length / m), o = 0; o < n; o++) {
            var g = a.extend(!0, {}, l), p = g.packet;
            p.dataIndex = o;
            p.dataContent = h.slice(0, m);
            p._callback = "light.packetRequest._packetCallbacks.callback" + c;
            g.count = c++;
            h = h.slice(m);
            k.push(g);
        }
        f(e, k[0].count, k[0].packet, function(a) {
            j(a, 0);
        });
        a.log("0: packet request sent.");
        b = setTimeout(function() {
            i.abort("网络异常，请重新操作");
        }, 1e4);
    };
    a.packetRequest._packetCallbacks = {};
}(window.light);

!function(a, b) {
    var c = "complete" === document.readyState || "loaded" === document.readyState, d = !!document.addEventListener, e = a.lightReady = a.lightReady || [], f = function() {
        for (c = !0; e.length; ) e.shift().call(a, b, b.node, b.page);
    };
    b.on(document, d ? "DOMContentLoaded" : "readystatechange", d ? f : function() {
        ("loaded" == document.readyState || "complete" == document.readyState) && f();
    });
    !d && a == a.top && a.setTimeout(function() {
        try {
            c || document.documentElement.doScroll("left"), setTimeout(f, 0);
        } catch (a) {
            setTimeout(arguments.callee, 20);
        }
    }, 20);
    var g = function() {
        /in/.test(document.readyState) ? setTimeout(g, 9) : f();
    };
    b.ready = function(d) {
        c ? d.call(a, b, b.node, b.page) : (e.push(d), g());
    };
}(window, light);

!function(a) {
    var b = a.client.info.engine.trident, c = a.client.info.engine.presto, d = function(a) {
        return /^(?:body|html)$/i.test(a.tagName);
    };
    a.extend({
        getViewportHeight: function(e) {
            e = a.get(e) || window;
            if (e == window || e == document || d(e)) {
                var e = self.innerHeight, f = document.compatMode;
                if ((f || b) && !c) e = "CSS1Compat" == f ? document.documentElement.clientHeight : document.body.clientHeight;
                return e;
            }
            return e.offsetHeight;
        },
        getViewportWidth: function(c) {
            c = a.get(c) || window;
            if (c == window || c == document || d(c)) {
                var c = self.innerWidth, e = document.compatMode;
                if (e || b) c = "CSS1Compat" == e ? Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth) : document.body.clientWidth;
                return c;
            }
            return c.offsetWidth;
        },
        getScroll: function(b) {
            b = a.get(b) || window;
            return b == window || b == document || d(b) ? {
                left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                top: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
            } : {
                left: b.scrollLeft,
                top: b.scrollTop
            };
        },
        viewport: function() {
            return {
                width: this.getViewportWidth(),
                height: this.getViewportHeight()
            };
        },
        scroll: function(a) {
            a = this.getScroll(a);
            return {
                x: a.left,
                y: a.top
            };
        },
        xy: function(a) {
            a = this.getOffsets(a);
            return {
                x: a.left,
                y: a.top
            };
        },
        size: function(a) {
            return {
                width: this.getViewportWidth(a),
                height: this.getViewportHeight(a)
            };
        },
        getOffsets: function(b) {
            b = a.get(b);
            if ("getBoundingClientRect" in document.documentElement) {
                try {
                    var c = b.getBoundingClientRect();
                } catch (d) {}
                var e = b && b.ownerDocument || document, b = e.body, f = e.documentElement, e = (window.pageYOffset || f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0), b = (window.pageXOffset || f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0);
                c && (e += c.top, b += c.left);
                return {
                    top: e,
                    left: b
                };
            }
            c = function(a) {
                var b;
                b = window.getComputedStyle ? getComputedStyle(a, null).position : a.currentStyle ? a.currentStyle.position : a.style.position;
                return "absolute" == b || "fixed" == b ? a.offsetParent : a.parentNode;
            };
            if ("undefined" != typeof b.offsetParent) {
                for (var e = b, g = f = 0; b; b = b.offsetParent) f += b.offsetLeft, g += b.offsetTop;
                if (!e.parentNode || !e.style || "undefined" == typeof e.scrollTop) return {
                    left: f,
                    top: g
                };
                for (b = c(e); b && b != document.body && b != document.documentElement; ) f -= b.scrollLeft, 
                g -= b.scrollTop, b = c(b);
                return {
                    left: f,
                    top: g
                };
            }
            return {
                left: b.x,
                top: b.y
            };
        },
        region: function(b) {
            var c = a.getOffsets(b);
            return {
                left: c.left,
                top: c.top,
                width: a.getViewportWidth(b),
                height: a.getViewportHeight(b)
            };
        }
    });
}(window.light);

!function(a) {
    var b = {
        arale: {
            exists: function() {
                return !!window.arale;
            },
            dialog: function() {
                var b = {
                    page: "IframeXbox",
                    string: "StringXbox",
                    dom: "DomXbox"
                };
                return function(d) {
                    var e = b[d.type];
                    if (!e) throw "Invalid dialog type: " + d.type;
                    var f, g = a.extend({}, d);
                    g.isOld = !0;
                    d.trigger && (g.el = d.trigger);
                    if ("string" == d.type) if (c.dialog.template) d.content = a.substitute(c.dialog.template, d); else if ("string" != typeof d.content) {
                        var h = document.createElement("div"), i = d.content.cloneNode(!0);
                        h.appendChild(i);
                        d.content = h.innerHTML;
                    }
                    g.value = function() {
                        return d.content;
                    };
                    Loader.use([ "aralex.xbox" ], function() {
                        f = new aralex.xbox[e](g);
                        d.trigger || f.show();
                    });
                    return this.page.dialog = f;
                };
            }(),
            closeDialog: function(a) {
                (a = a || this.page.dialog) && a.hide();
            },
            tooltip: function(b) {
                var c, d = b.trigger, e = {
                    targets: d
                };
                a.isHTMLElement(d) && (e.targets = [ d ]);
                b.content && (e.getValue = function() {
                    return b.content;
                });
                Loader.use([ "aralex.apop" ], function() {
                    c = new aralex.apop.Tip(e);
                    b.trigger || c.show();
                });
            }
        },
        alipay: {
            exists: function() {
                return !!window.AP;
            },
            dialog: function() {
                var b = {
                    autoShow: !0,
                    type: "dom",
                    modal: !0
                };
                return function(d) {
                    var e, f = a.extend({}, b, d);
                    d.trigger && (f.el = d.trigger);
                    if ("page" == f.type) f.type = "iframe"; else if ("dom" != f.type && "string" == f.type) {
                        if (c.dialog.template) d.content = a.substitute(c.dialog.template, d); else if ("string" != typeof d.content) {
                            e = document.createElement("div");
                            var g = d.content.cloneNode(!0);
                            e.appendChild(g);
                            d.content = e.innerHTML;
                        }
                        f.title = "";
                    }
                    f.value = function() {
                        return d.content;
                    };
                    e = this.page.dialog = new AP.widget.xBox(f);
                    f.autoShow && e.show();
                    return e;
                };
            }(),
            closeDialog: function() {
                a.page.dialog = null;
                AP.widget.xBox.hide();
            },
            tooltip: function(b) {
                var c = b.trigger, d = {
                    width: "auto"
                };
                a.isHTMLElement(c) && (c = [ el ]);
                b.content && (d.message = b.content);
                return new AP.widget.popNotice(c, d);
            }
        },
        arale2: {
            exists: function() {
                return !!window.seajs;
            },
            dialog: function() {
                return function(b) {
                    seajs.use("alipay/xbox/1.0.2/xbox", function() {});
                    var d, e = a.extend({
                        isOld: !0
                    }, b);
                    "page" == e.type && (e.type = "iframe");
                    if ("string" == b.type) if (c.dialog.template) b.content = a.substitute(c.dialog.template, b); else if ("string" != typeof b.content) {
                        var f = document.createElement("div"), g = b.content.cloneNode(!0);
                        f.appendChild(g);
                        b.content = f.innerHTML;
                    }
                    var h = this;
                    seajs.use("alipay/xbox/1.0.2/xbox", function(a) {
                        d = h.page.dialog = new a(e);
                        b.autoShow && d.show();
                        return d;
                    });
                };
            }(),
            closeDialog: function(a) {
                (a = a || this.page.dialog) && a.hide();
            },
            tooltip: function() {},
            closed: function() {
                var a = instance || this.page.dialog;
                a && a.hide();
            }
        },
        "default": {
            exists: function() {
                return !0;
            },
            dialog: function(a) {
                a && a.title && alert(a.title);
            },
            closeDialog: function() {},
            tooltip: function(a) {
                a && a.content && alert(a.content);
            }
        }
    }, c = a.module("page/ui", {
        detect: function() {
            var c;
            a.each(b, function(a, b) {
                if (b.exists()) return c = b, !1;
            });
            return c;
        }
    });
    a.each([ "dialog", "tooltip" ], function(b, d) {
        c[d] = function(b) {
            var e = c.detect();
            e && e[d].call(a, b);
        };
    });
    c.closeDialog = function() {
        var b = c.detect();
        b && b.closeDialog.call(a);
    };
}(window.light);

!function(a, b) {
    var c = function(b, d) {
        if (!this.getConfig) return new c(b, d);
        if (!arguments.length || !b) return this;
        if (b.getConfig) return b;
        if (a.isHTMLElement(b)) return b._light_node || this.add(b);
        if ("string" !== typeof b && b.length) return this.add(b);
        if ("string" === typeof b) {
            var e = c.getSizzle(), f = a.get(d) || document;
            if (e) e = e(b, f); else if (document.querySelectorAll) e = f.querySelectorAll(b); else throw "method not supported";
            e.length && this.add(e);
        }
        return this;
    };
    c.getSizzle = function() {
        var b;
        return function() {
            if (b) return b;
            a.Sizzle ? b = a.Sizzle : window.YAHOO ? b = YAHOO.util.Dom.query : window.arale && arale.dom && arale.dom.sizzle && (b = arale.dom.sizzle);
            return b || window.Sizzle;
        };
    }();
    c.prototype = {
        length: 0,
        each: function(a) {
            for (var b = 0; b < this.length && !1 !== a.call(this[b], b, this[b]); ) b++;
            return this;
        },
        map: function(b) {
            return a.map(this, b);
        },
        reduce: function(b, c) {
            return a.reduce(this, b, c);
        },
        toArray: function() {
            return a.toArray(this);
        },
        add: function(b) {
            var d;
            if ("string" === typeof b) d = a.get(b); else if ("object" === typeof b) if (!b.nodeType && b.length && b[0]) for (var e = 0, f = b.length; e < f; e++) {
                var g = b[e];
                if (a.isHTMLElement(g)) {
                    this[this.length] = g;
                    this.length++;
                    var h = new c();
                    h[0] = g;
                    h.length = 1;
                    g._light_node = h;
                }
            } else d = b;
            a.isHTMLElement(d) && (this[this.length] = d, this.length++);
            return this;
        },
        clear: function() {
            for (var a = 0; a < this.length; delete this[a++]) ;
            this.length = 0;
            return this;
        },
        clone: function() {
            for (var a = new c(), b = a.length = this.length; b--; ) a[b] = this[b];
            return a;
        },
        on: function(b, c, d) {
            return this.each(function() {
                a.on(this, b, c, d);
            });
        },
        show: function() {
            return this.each(function() {
                this.style.display = "";
            });
        },
        hide: function() {
            return this.each(function() {
                this.style.display = "none";
            });
        },
        toggle: function(c) {
            var d, e = !1;
            c !== b && (a.isFunction(c) ? e = !0 : d = c ? "" : "none");
            return this.each(function() {
                var a = d;
                a === b && (a = e ? c.apply(this) ? "" : "none" : "none" === this.style.display ? "" : "none");
                this.style.display = a;
            });
        },
        item: function(a) {
            var b = new c();
            this[a] && b.add(this[a]);
            return b;
        },
        slice: function() {
            return new c(Array.prototype.slice.apply(this, arguments));
        }
    };
    a.each([ "mouseover", "mouseout", "change" ], function(a, b) {
        c.prototype[b] = function(a) {
            return this.on(b, a);
        };
    });
    a.each([ "click", "submit", "focus", "blur" ], function(a, d) {
        c.prototype[d] = function(a, c) {
            return a === b ? this.each(function() {
                this[d]();
            }) : this.on(d, a, c);
        };
    });
    a.node = c;
}(window.light);

!function(a, b) {
    b.build = function() {
        var c = {
            td: [ "<table><tbody><tr>", "</tr></tbody></table>", "table>tbody>tr" ],
            tr: [ "<table><tbody>", "</tbody></table>", "table>tbody" ],
            option: [ "<select>", "</select>", "select" ],
            optgroup: [ "<select>", "</select>", "select" ]
        }, d = /<(.+?)\b/;
        return function(e, f) {
            var g = a.createElement("div"), h;
            if (d.test(e)) {
                var i = e, j = i.match(d)[1].toLowerCase();
                (j = c[j]) && (i = j[0] + i + j[1]);
                g.innerHTML = i;
                return b((j ? j[2] : "") + ">*", g);
            }
            g = light.trim(e);
            h = a.createElement(g);
            light.each(f, function(a, b) {
                "className" === a ? h[a] = b : ("boolean" === typeof b && (b = b ? a : ""), h.setAttribute(a, b));
            });
            return new b(h);
        };
    }();
    var c = function(a, c) {
        var d = b.getSizzle();
        if (!d || !d.filter) throw "method not supported";
        return d.filter(a, [ c ]).length;
    }, d = function(a, d, e) {
        var f = this[0], g = new b();
        if (!f) return g;
        for (;f = f[d]; ) if (1 === f.nodeType && (!a || c(a, f))) if (g.add(f), e) break;
        return g;
    }, e = function(a, c, d) {
        var e = c;
        if (e instanceof b) e = e[0]; else if (!light.isHTMLElement(e)) return !1;
        return this.each(function() {
            d ? e[a](this) : this[a](e);
        });
    }, f = function(a, c) {
        var d = [];
        if ("string" === typeof a) {
            var e = b.getSizzle();
            if (!e || !e.filter) throw "method not supported";
            d = e.filter(a, this, !1, c);
        } else this.each(function(b) {
            a.call(this, b, this) && d.push(this);
        });
        return this.clear().add(d);
    };
    light.extend(b.prototype, {
        find: function(a) {
            return new b(a, this);
        },
        filter: function(a) {
            return f.call(this, a, !1);
        },
        remove: function(a) {
            return f.call(this, a, !0);
        },
        del: function() {
            return this.each(function() {
                this.parentNode && this.parentNode.removeChild(this);
            }).clear();
        },
        append: function(a) {
            return e.call(this, "appendChild", a);
        },
        appendTo: function(a) {
            return e.call(this, "appendChild", a, !0);
        },
        after: function(a) {
            var c = this[0], a = light.get(a);
            if (!c || !a) return this;
            var d = b(a).next();
            d.length ? a.parentNode.insertBefore(c, d[0]) : a.parentNode.appendChild(c);
            return this;
        },
        text: function(b) {
            var c = "innerText" in a.createElement("div") ? "innerText" : "textContent";
            if (void 0 === b) {
                var d = this[0];
                return !d ? "" : light.trim(d[c]);
            }
            return this.each(function() {
                this[c] = b;
            });
        },
        html: function(a) {
            if (void 0 === a) {
                var b = this[0];
                return !b ? "" : light.trim(b.innerHTML);
            }
            return this.each(function() {
                this.innerHTML = a;
            });
        },
        outerHTML: function(a) {
            return void 0 === a ? (a = this[0], !a ? "" : light.trim(a.outerHTML || new XMLSerializer().serializeToString(a))) : this.each(function() {});
        },
        next: function(a) {
            return d.call(this, a, "nextSibling", !0);
        },
        nextAll: function(a) {
            return d.call(this, a, "nextSibling", !1);
        },
        prev: function(a) {
            return d.call(this, a, "previousSibling", !0);
        },
        prevAll: function(a) {
            return d.call(this, a, "previousSibling", !1);
        },
        siblings: function(a) {
            return d.call(this, a, "previousSibling", !1).add(d.call(this, a, "nextSibling", !1));
        },
        parent: function(a) {
            return d.call(this, a, "parentNode", !0);
        },
        children: function(a) {
            var d = this[0], e = new b();
            if (!d || !d.firstChild) return e;
            d = d.firstChild;
            do 1 === d.nodeType && (!a || c(a, d)) && e.add(d); while (d = d.nextSibling);
            return e;
        },
        style: function(a) {
            if (void 0 === a) return this;
            if ("string" === typeof a) {
                var b = this[0];
                return !b ? "" : light.getStyle(b, a);
            }
            return this.each(function() {
                light.setStyle(this, a);
            });
        }
    });
}(window.document, light.node);

light.extend(light.node.prototype, {
    attr: function(a, b) {
        if (void 0 === b) {
            var c = this[0];
            return !c ? "" : "undefined" !== typeof c.getAttribute && "boolean" !== typeof c[a] ? c.getAttribute(a) : c[a];
        }
        return this.each(function() {
            "undefined" !== typeof this.setAttribute ? !1 === b ? (this.setAttribute(a, ""), 
            this.removeAttribute(a), a in this && (this[a] = !1)) : (this.setAttribute(a, !0 === b ? a : b), 
            "src" !== a && a in this && (this[a] = b)) : a in this && (this[a] = b);
        });
    },
    getConfig: function(a, b) {
        var c = this.attr(a || "data-config"), d = {};
        c && (d = light.unparam(c), b && light.each(d, b));
        return d;
    },
    updateConfig: function(a, b) {
        var c, d;
        2 > arguments.length && light.isObject(a) ? (c = "data-config", d = a) : (c = a || "data-config", 
        d = b);
        return this.each(function() {
            var a = light.node(this);
            a.attr(c, light.param(light.extend(a.getConfig(c), d)));
        });
    },
    hasClass: function(a) {
        var b = this[0];
        return !b || !b.className ? !1 : RegExp("(?:^|\\s)" + a + "(?:\\s|$)").test(b.className);
    },
    addClass: function(a) {
        if (!a) return this;
        var b = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
        return this.each(function() {
            var c = this.className;
            c ? b.test(c) || (this.className += " " + a) : this.className = a;
        });
    },
    removeClass: function(a) {
        if (!a) return this;
        var b = RegExp("(?:^|\\s)" + a + "(\\s|$)");
        return this.each(function() {
            var a = this.className;
            a && b.test(a) && (this.className = a.replace(b, "$1"));
        });
    },
    toggleClass: function(a, b) {
        return void 0 === b ? this.each(function() {
            var b = light.node(this);
            b[b.hasClass(a) ? "removeClass" : "addClass"](a);
        }) : this[b ? "addClass" : "removeClass"](a);
    }
});

light.extend(light.node.prototype, {
    val: function(a) {
        if (void 0 === a) {
            var b = this[0];
            if (!b) return "";
            (b = b.value || "") && (b = light.unescapeHTML(light.trim(b)));
            return b;
        }
        return this.each(function() {
            if ("SELECT" === this.tagName) {
                var b = this;
                light.node(this).find("option").each(function(c, d) {
                    if (d.value !== a) return !0;
                    b.selectedIndex = c;
                    return !1;
                });
            } else this.value = a;
        });
    },
    field: function(a, b) {
        if (void 0 === b) {
            if (!a) return "";
            var c = this[0];
            if (!c) return "";
            var d;
            c.elements ? d = c.elements[a] : c.item && (d = c.item(a));
            return !d || !d.value ? "" : light.unescapeHTML(light.trim(d.value));
        }
        return this.each(function() {
            var c;
            this.elements ? c = this.elements[a] : this.item && (c = this.item(a));
            c || (c = light.node("[name=" + a + "]", this)[0]);
            c && (c.value = b);
        });
    },
    serialize: function() {
        var a = this[0];
        if (!a) return "";
        var b = [];
        light.node(":input[name]", a).each(function(a, c) {
            var d = c.value;
            c.disabled || ("radio" == c.type || "checkbox" == c.type) && !c.checked || b.push(light.encode(c.name) + "=" + light.encode(d));
        });
        return b.join("&");
    }
});

!function(a) {
    a.prototype.captcha = function(a) {
        var b = "string" === typeof a ? light.get(a) : a;
        if (!b) return this;
        b.length && (b = b[0]);
        var c = this[0];
        if (!c) return this;
        light.on(a, "click", function(a) {
            a.cancel();
            var a = c.src.split("?"), b = light.unparam(a[1] || "");
            b.t = new Date().getTime();
            c.src = a[0] + "?" + light.param(b);
        });
        return this;
    };
}(light.node);

!function(a, f, e) {
    var b = {
        types: {
            email: [ /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "邮件地址" ],
            phone: [ /^(\d{3,4}-)\d{7,8}(-\d{1,6})?$/, "电话号码" ],
            mobile: [ /^1\d{10}$/, "手机号码" ],
            date: [ /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$/, "日期" ],
            integer: [ /^[1-9][0-9]*$/, "数字" ],
            number: [ /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/, "数值" ],
            money: [ /^\d+(\.\d{0,2})?$/, "金额" ],
            cnID: [ /^\d{15}$|^\d{17}[0-9a-zA-Z]$/, "身份证号" ],
            chinese: [ /^[\u2E80-\uFE4F]+$/, "汉字" ],
            zip: [ /^[0-9]{6}$/, "邮政编码" ],
            bankname: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
            name: /^([\u4e00-\u9fa5|A-Z|\s]|\u3007)+([\.\uff0e\u00b7\u30fb]?|\u3007?)+([\u4e00-\u9fa5|A-Z|\s]|\u3007)+$/,
            realName: /^([\u4e00-\u9fa5|a-zA-Z|\s]|\u3007)+([\.\uff0e\u00b7\u30fb]?|\u3007?)+([\u4e00-\u9fa5|a-zA-Z|\s]|\u3007)+$/
        },
        options: {
            enabled: !0,
            required: !1,
            autoTrim: !0,
            checkOnBlur: !1,
            visibleOnly: !1,
            skipReadOnly: !0,
            skipDisabled: !0,
            stopOnError: !1,
            autoFocus: !0,
            containerSelector: e,
            labelHandler: e,
            errorClass: "fm-error",
            tipSelector: e,
            tipTemplate: '<div class="fm-explain">{text}</div>',
            message: "{label}填写不正确"
        },
        messages: {
            1: "",
            2: "请填写{label}",
            3: "填写的{label}不能被识别为{type}",
            4: "{label}的长度不能小于{minLength}",
            5: "{label}的长度不能大于{maxLength}",
            6: "两次输入{label}不匹配",
            7: "输入的数值不在正确的范围内"
        },
        ruleOptions: {
            maxLength: e,
            minLength: e,
            sameWith: e,
            type: e,
            message: e,
            label: e
        }
    }, c = function() {
        var b = a.toArray(arguments), c = b.shift();
        "string" === typeof c && (c = eval(c));
        return c.apply(this, b);
    };
    validator = function(c, d) {
        this.form = a.get(c.form);
        if (!this.form) throw "form not found";
        this.rules = d || {};
        this.options = a.extend({}, b.options, c);
        this.result = {};
        this.init();
        var e = this;
        "FORM" === this.form.tagName && a.on(this.form, "submit", function(a) {
            e.validate() || a.cancel();
        });
    };
    b.rules = {
        minLength: function(a, b, c) {
            if (b.length < c) return 4;
        },
        maxLength: function(a, b, c) {
            if (b.length > c) return 5;
        },
        sameWith: function(b, c, d) {
            b = this.form.field(d);
            b = b.length ? b[0] : a.get(d);
            return !b ? !1 : c === b.value ? 0 : 6;
        },
        range: function(a, b, c) {
            a = c.split("|");
            b = parseInt(b, 10);
            if (2 !== a.length) return 0;
            c = a[0].length ? parseInt(a[0], 10) : Number.MIN_VALUE;
            num2 = a[1].length ? parseInt(a[1], 10) : Number.MAX_VALUE;
            return isNaN(c) || isNaN(num2) ? 0 : !isNaN(b) && b >= c && b <= num2 ? 0 : 7;
        },
        regexp: function(a, b, c) {
            return !b || !c ? 0 : RegExp(c).test(b) ? 0 : 1;
        },
        expression: function(b, c, f) {
            if (!f) return 0;
            b = a.decode(f);
            b = -1 === b.indexOf("#") ? c + " " + b : b.replace(/#/g, c);
            a.log("evaluating %s", b);
            try {
                return eval(b) ? 0 : 1;
            } catch (e) {
                return 1;
            }
        },
        type: function(c, d, e) {
            var f = !1;
            a.each(e.split("|"), function(c, e) {
                if (!e) return 0;
                var g = b.types[e];
                if (!g) return 0;
                a.isArray(g) && (g = g[0]);
                return f = g.test(d);
            });
            return f ? 0 : 1;
        }
    };
    validator.prototype = function() {
        var d = {
            focus: "onfocusin",
            blur: "onfocusout"
        }, g = 0, h = /^(INPUT|SELECT|TEXTAREA)$/, i = function(a, b) {
            var c = this, e = d[a], f = function(a) {
                a = a.target || a.srcElement;
                h.test(a.tagName) && b.call(c, a);
            };
            e in this.form ? this.form.attachEvent(e, f) : this.form.addEventListener(a, f, !0);
        }, j = function(a, b, c) {
            b = b[a];
            return b === e ? c[a] : b;
        }, k = function(a) {
            var b = "";
            switch (a.tagName) {
              case "SELECT":
                b = a.multiple ? f("option:selected", a).map(function(a) {
                    return a.value;
                }).join() : a.value;
                break;

              case "INPUT":
                if (b = a.type.toLowerCase(), "radio" === b || "checkbox" === b) {
                    b = f(a).parent("form").find('[name="' + a.name + '"]:checked').map(function(a) {
                        return a.value;
                    }).join();
                    break;
                }

              default:
                b = a.value;
            }
            return b;
        }, l = function(a, b, c) {
            "false" === b && (c[a] = !1);
        }, m = function(d) {
            var h = this.options, i = d.getAttribute("data-validate"), m = d.name, o = f(d);
            if (!a.exists(d) || !h.required && !i) return 0;
            m || (m = "_lv" + g++);
            i = this.rules[m] = a.extend({}, b.ruleOptions, o.getConfig("data-validate", l));
            if (d.readOnly && j("skipReadOnly", i, h) || d.disabled && j("skipDisabled", i, h) || !j("enabled", i, h) || !j("checkOnBlur", i, h) && !this.submitting || this.submitting && o.prev(".validating").length || j("visibleOnly", i, h) && !d.offsetHeight) return 0;
            var p, q = 0, r = "default", s = i.message;
            i.before && (p = k(d), j("autoTrim", i, h) && (p = a.trim(p)), q = c.call(this, i.before, d, p), 
            q = !1 === q ? 10 : 0);
            if (!q) {
                p = k(d);
                j("autoTrim", i, h) && (p = a.trim(p));
                var t = j("required", i, h);
                a.isFunction(t) && (t = t.call(this, d));
                p ? (a.each(i, function(a, c) {
                    if (c === e || !b.rules[a]) return true;
                    (q = b.rules[a].call(this, d, p, c)) && "type" === a && (r = c);
                    return !q;
                }), !q && i.after && (q = c.call(this, i.after, d, p), "string" === typeof q && q ? (s = q, 
                q = 10) : q = !1 === q ? 10 : 0)) : t && (q = 2);
            }
            if (q) {
                var t = b.messages[q], u = {
                    value: p
                };
                2 != q && s && (t = s);
                t || (r && b.types[r] && b.types[r][1] ? (u.type = b.types[r][1], t = b.messages[3]) : t = h.message);
                o = o.addClass("validating").parent(h.containerSelector);
                h.tipSelector && (o = f(h.tipSelector, o));
                o.addClass(h.errorClass);
                s = i.label;
                !s && h.labelHandler && (s = h.labelHandler.call(this, d));
                u.label = (s || "此项").replace(/[\uff1a:]/g, "");
                t = a.substitute(t, a.extend({}, i, u));
                a.log("error found in %s: %s (%d)", m, t, q);
                i = d.parentNode;
                i._tip && a.exists(i._tip) && i._tip.del();
                i._tip = f.build(a.substitute(h.tipTemplate, {
                    text: t
                })).appendTo(h.tipSelector ? o : i);
                try {
                    visible && h.autoFocus && this.submitting && !this.focused && d.focus(), this.focused = !0;
                } catch (v) {
                    this.focused = !1;
                }
                this.result[m] = {
                    code: q,
                    message: t
                };
            } else this.result[m] && delete this.result[m], n.call(this, d, !0);
            return q;
        }, n = function(a, b) {
            if (b || !this.submitting && this.options.enabled && (this.options.required || a.getAttribute("data-validate"))) {
                var c = this.options;
                f(a).removeClass("validating").parent(c.containerSelector).removeClass(c.errorClass);
                (c = a.parentNode._tip) && c.del();
            }
        };
        return {
            init: function() {
                i.call(this, "blur", m);
                i.call(this, "focus", n);
            },
            addRule: function(b, c) {
                var d = this.rules;
                d[b] || (d[b] = {});
                a.extend(d[b], c);
            },
            checkItem: function() {
                var b = this, c = this.form;
                a.each(a.toArray(arguments), function() {
                    var d = a.isString(this) ? f('[name="' + this + '"]', c)[0] : a.get(this);
                    d && m.call(b, d);
                });
            },
            resetItem: function() {
                var b = this, c = this.form;
                a.each(a.toArray(arguments), function() {
                    var d = a.isString(this) ? f('[name="' + this + '"]', c)[0] : a.get(this);
                    d && n.call(b, d, !0);
                });
            },
            resetForm: function() {
                var a = this.options, b = this;
                a.before && c.call(this, a.before);
                f("input, select, textarea", this.form).each(function() {
                    n.call(b, this, !0);
                });
                a.after && c.call(this, a.after, !0);
            },
            validate: function() {
                var b = this, d = this.options, e = 0, g = d.stopOnError, h = d.enabled;
                if (!a.exists(this.form)) return !0;
                this.result = {};
                a.isFunction(h) && (h = !!h.call(this));
                if (!h) return !0;
                if (this.submitting) return !1;
                this.submitting = !0;
                if (d.before) {
                    if (h = !1 === c.call(this, d.before) ? 10 : 0) this.result._before = {
                        code: h
                    };
                    e += h;
                }
                this.focused = !1;
                g && e || f("input, select, textarea", this.form).each(function() {
                    e += m.call(b, this) || 0;
                    return !g || !e;
                });
                if (d.after) {
                    if (h = !1 === c.call(this, d.after, !e) ? 11 : 0) this.result._after = {
                        code: h
                    };
                    e += h;
                }
                setTimeout(function() {
                    b.submitting = !1;
                }, 100);
                return !e;
            }
        };
    }();
    a.validator = a.extend(validator, b);
}(light, light.node);

!function(a) {
    function b(a, b, c) {
        a = c.createElement(a);
        if (null === b) return a;
        for (p in b) if ("class" == p || "className" == p) a.className = b[p]; else if ("style" == p) for (s in b[p]) a.style[s] = b[p][s]; else "innerHTML" === p ? a.innerHTML = b[p] : "appendTo" === p ? b[p].appendChild(a) : "append" === p ? a.appendChild(b[p]) : a.setAttribute([ p ], b[p]);
        return a;
    }
    a.dialog = function(c) {
        if (a.page._dialog) return a.page._dialog;
        this.config = a.extend({}, {
            targetFrame: document,
            title: "安全控件提示",
            bodyId: "light-dialog",
            bodyClass: "light-dialog",
            iframeId: "light-dialog-iframe",
            overlayId: "light-dialog-shadow",
            overlayClass: "light-dialog-shadow",
            loadingId: "light-load",
            loadClass: "light-load",
            loadingSrc: "https://i.alipayobjects.com/e/201310/1Lb7eeFa4r.gif",
            iframeSrc: "https://securitycenter.alipay.com/sc/aliedit/xbox.htm",
            timeout: 2e4
        }, c);
        var d = this.config.targetFrame;
        this.body = d.getElementById(this.config.bodyId);
        this.overlay = d.getElementById(this.config.overlayId);
        this.load = d.getElementById(this.config.loadingId);
        var e = function() {
            var b = "", c = "", e = d.compatMode, f = a.client.info;
            if (e || f.engine.trident) "CSS1Compat" == e ? (b = d.documentElement.clientWidth, 
            c = d.documentElement.clientHeight) : (b = d.body.clientWidth, c = d.body.clientHeight);
            document.all ? (e = document.body.scrollTop, f = document.body.scrollLeft) : (e = window.pageYOffset, 
            f = window.pageXOffset);
            return {
                maxWidth: Math.max(d.documentElement.clientWidth, d.body.scrollWidth, d.documentElement.scrollWidth, d.body.offsetWidth, d.documentElement.offsetWidth),
                maxHeight: Math.max(d.documentElement.clientHeight, d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight),
                clientWidth: b,
                clientHeight: c,
                scrollTop: e,
                scrollLeft: f
            };
        }, f = this;
        a.page._dialog = f;
        a.ready(function() {
            if (!f.iframe) {
                f.body ? f.iframe = d.getElementById(f.config.iframeId) : (f.body = b("div", {
                    id: f.config.bodyId,
                    "class": f.config.bodyClass,
                    style: {
                        left: Math.max((e().clientWidth - 620) / 2 + e().scrollLeft, 0) + "px",
                        top: Math.max((e().clientHeight - 400) / 2 + e().scrollTop, 0) + "px"
                    },
                    appendTo: d.body
                }, d), f.body.innerHTML = '<div class="light-dialog-top"><div class="light-dialog-title"><h2>' + f.config.title + '</h2><a href="#" id="light-dialog-close"><s></s><em>关闭</em></a></div></div>', 
                f.iframe = b("iframe", {
                    id: f.config.iframeId,
                    frameBorder: "no",
                    scrolling: "no",
                    src: "",
                    appendTo: f.body
                }, d));
                var c = function() {
                    f.body.style.left = Math.max((e().clientWidth - 620) / 2 + e().scrollLeft, 0) + "px";
                    f.body.style.top = Math.max((e().clientHeight - 400) / 2 + e().scrollTop, 0) + "px";
                };
                a.on(window, "resize", c);
                a.on(window, "scroll", c);
            }
            f.overlay = d.getElementById(f.config.overlayId);
            f.overlay || (f.overlay = b("div", {
                id: f.config.overlayId,
                "class": f.config.overlayClass,
                innerHTML: "<iframe src=\"javascript:''\"></iframe>",
                style: {
                    width: e().maxWidth + "px",
                    height: e().maxHeight + "px"
                },
                appendTo: d.body
            }, d), a.on(window, "resize", function() {
                f.overlay.style.width = e().maxWidth + "px";
                f.overlay.style.height = e().maxHeight + "px";
            }));
            f.load = d.getElementById(f.config.loadingId);
            f.load || (f.load = b("div", {
                id: f.config.loadingId,
                "class": f.config.loadClass,
                innerHTML: '<img src="' + f.config.loadingSrc + '">',
                style: {
                    left: (e().clientWidth - 208) / 2 + "px",
                    top: (e().clientHeight - 50) / 2 + "px"
                },
                appendTo: d.body
            }, d));
        });
    };
    a.dialog.prototype = {
        show: function() {
            var b = this;
            this.load.style.visibility = "visible";
            this.overlay.style.visibility = "visible";
            a.on(this.iframe, "load", function() {
                b.body.style.visibility = "visible";
                b.load.style.visibility = "hidden";
                var c = b.config.targetFrame.getElementById("light-dialog-close") || {};
                a.on(c, "click", function() {
                    b.hide();
                });
                a.on(b.config.targetFrame, "keydown", function(a) {
                    27 == a.which && (b.hide(), a.cancel());
                });
            });
            this.iframe.src = this.config.iframeSrc;
        },
        hide: function() {
            this.body.style.visibility = "hidden";
            this.overlay.style.visibility = "hidden";
            this.config.onHide && this.config.onHide();
        },
        dispose: function() {
            targetFrame.body.removeChild(this.load);
            targetFrame.body.removeChild(this.body);
            targetFrame.body.removeChild(this.overlay);
        },
        onShow: a.noop
    };
    a.dialog.prototype.constructor = a.dialog;
}(window.light);

!function(a) {
    a.pop = function(b) {
        this.options = a.extend({}, {
            targets: [],
            id: "",
            className: "",
            width: 280,
            height: null,
            type: "message",
            event: "mouseover",
            direction: "up"
        }, b);
        this.pop = null;
        this.init();
    };
    a.pop.position = {
        up: function(a, b, c, d, e) {
            e.direction = a;
            b.height + b.top - c.top - c.height < d.height + e.height ? e.direction = "down" : c.top - b.top < d.height + e.height && (e.direction = "up");
            "up" == e.direction ? (d.top = c.top + c.height + e.height, e.top = 1 - e.height) : (d.top = c.top - e.height - d.height, 
            e.top = d.innerHeight - 1);
            d.left = c.left < b.left + parseInt(d.width / 2) - c.width ? b.left : c.left > b.left + b.width - parseInt(d.width / 2) ? b.left + b.width - d.width : c.left + parseInt(c.width / 2) - parseInt(d.width / 2);
            e.left = c.left < d.left ? 0 : c.left > d.left + d.width ? d.width - e.width : c.width < d.width ? c.left + parseInt((c.width - e.width) / 2) - d.left : parseInt(d.width / 2);
            return {
                rect: d,
                arrow: e
            };
        },
        left: function() {}
    };
    a.pop.position.down = a.pop.position.up;
    a.pop.position.left = a.pop.position.right;
    a.pop.prototype = {
        init: function() {
            var b = this;
            this.initDom();
            a.each(this.options.targets, function(c, d) {
                d = a.node(d);
                d.mouseover(function() {
                    b.show(d);
                }).mouseout(function() {
                    b.hide(d);
                });
            });
        },
        initDom: function() {
            this.wrap = a.node.build(a.substitute('<div id="{id}" class="{className}"><div class="ui-tiptext-container ui-tiptext-container-{type}"><span class="ui-tiptext-arrow ui-tiptext-arrowup"></span><span class="ui-tiptext-icon"></span><div class="ui-tiptext-content"></div></div></div>', {
                id: this.options.id,
                className: this.options.className,
                type: this.options.type
            })).appendTo(document.body).hide();
            this.pop = a.node(".ui-tiptext-container", this.wrap);
            this.arrow = a.node(".ui-tiptext-arrow", this.pop);
            this.content = a.node(".ui-tiptext-content", this.pop);
        },
        show: function(a) {
            this.content.html(a.attr("data-content"));
            this.setSize();
            this.wrap.show();
            this.setPosition(a[0]);
        },
        hide: function() {
            this.wrap.hide();
        },
        setSize: function() {
            this.options.width && (this.pop[0].style.width = this.options.width + "px");
            this.options.height && (this.pop[0].style.height = this.options.height + "px");
        },
        setPosition: function(b) {
            var c;
            c = a.getScroll();
            var b = a.region(b), d = a.region(this.pop[0]), e = a.region(this.arrow[0]);
            d.innerHeight = this.pop[0].clientHeight;
            c.width = a.getViewportWidth();
            c.height = a.getViewportHeight();
            c = a.pop.position[this.options.direction](this.options.direction, c, b, d, e);
            a.setStyle(this.pop[0], {
                position: "absolute",
                zIndex: "9999",
                left: c.rect.left + "px",
                top: c.rect.top + "px"
            });
            a.setStyle(this.arrow[0], {
                left: c.arrow.left + "px",
                top: c.arrow.top + "px"
            });
            this.arrow[0].className = "ui-tiptext-arrow ui-tiptext-arrow" + c.arrow.direction;
        }
    };
}(window.light);

!function(a, b) {
    function c(a, b, c, d) {
        var e, h, i, j, k = g++, l = 0, m = b.length;
        "string" === typeof c && !n.test(c) && (j = c = c.toLowerCase());
        for (;l < m; l++) if (e = b[l]) {
            h = !1;
            for (e = e[a]; e; ) {
                if (e[f] === k) {
                    h = b[e.sizset];
                    break;
                }
                if ((i = 1 === e.nodeType) && !d) e[f] = k, e.sizset = l;
                if (j) {
                    if (e.nodeName.toLowerCase() === c) {
                        h = e;
                        break;
                    }
                } else if (i) if ("string" !== typeof c) {
                    if (e === c) {
                        h = !0;
                        break;
                    }
                } else if (0 < D.filter(c, [ e ]).length) {
                    h = e;
                    break;
                }
                e = e[a];
            }
            b[l] = h;
        }
    }
    var d = a.document, e = d.documentElement, f = "sizcache" + (Math.random() + "").replace(".", ""), g = 0, h = Object.prototype.toString, i = !1, j = !0, k = /^#([\w\-]+$)|^(\w+$)|^\.([\w\-]+$)/, l = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, m = /\\/g, n = /\W/, o = /^\w/, p = /\D/, q = /(-?)(\d*)(?:n([+\-]?\d*))?/, r = /^\+|\s*/g, s = /h\d/i, t = /input|select|textarea|button/i, u = /[\t\n\f\r]/g, v = {
        ID: /#((?:[-\w]|[^\x00-\xa0]|\\.)+)/,
        CLASS: /\.((?:[-\w]|[^\x00-\xa0]|\\.)+)/,
        NAME: /\[name=['"]*((?:[-\w]|[^\x00-\xa0]|\\.)+)['"]*\]/,
        TAG: RegExp("^(" + "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)".replace("[-", "[-\\*") + "+)"),
        ATTR: RegExp("\\[\\s*((?:[-\\w]|[^\\x00-\\xa0]|\\\\.)+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)*)|)|)\\s*\\]"),
        PSEUDO: /:((?:[-\w]|[^\x00-\xa0]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/,
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/
    }, w = v.POS, x = function() {
        var a, b = function(a, b) {
            return "\\" + (b - 0 + 1);
        }, c = {};
        for (a in v) v[a] = RegExp(v[a].source + /(?![^\[]*\])(?![^\(]*\))/.source), c[a] = RegExp(/(^(?:.|\r|\n)*?)/.source + v[a].source.replace(/\\(\d+)/g, b));
        v.globalPOS = w;
        return c;
    }(), y = function(a) {
        var b = !1, c = d.createElement("div");
        try {
            b = a(c);
        } catch (e) {}
        return b;
    }, z = y(function(a) {
        var b = !0, c = "script" + new Date().getTime();
        a.innerHTML = "<a name ='" + c + "'/>";
        e.insertBefore(a, e.firstChild);
        d.getElementById(c) && (b = !1);
        e.removeChild(a);
        return b;
    }), A = y(function(a) {
        a.appendChild(d.createComment(""));
        return 0 === a.getElementsByTagName("*").length;
    }), B = y(function(a) {
        a.innerHTML = "<a href='#'></a>";
        return a.firstChild && "undefined" !== typeof a.firstChild.getAttribute && "#" === a.firstChild.getAttribute("href");
    }), C = y(function(a) {
        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!a.getElementsByClassName || 0 === a.getElementsByClassName("e").length) return !1;
        a.lastChild.className = "e";
        return 1 !== a.getElementsByClassName("e").length;
    });
    [ 0, 0 ].sort(function() {
        j = !1;
        return 0;
    });
    var D = function(a, c, e) {
        var e = e || [], c = c || d, f, g, h, i = c.nodeType;
        if (1 !== i && 9 !== i) return [];
        if (!a || "string" !== typeof a) return e;
        h = F(c);
        if (!h && (f = k.exec(a))) if (f[1]) {
            if (9 === i) if ((g = c.getElementById(f[1])) && g.parentNode) {
                if (g.id === f[1]) return G([ g ], e);
            } else return G([], e); else if (c.ownerDocument && (g = c.ownerDocument.getElementById(f[1])) && I(c, g) && g.id === f[1]) return G([ g ], e);
        } else {
            if (f[2]) return "body" === a && c.body ? G([ c.body ], e) : G(c.getElementsByTagName(a), e);
            if (C && f[3] && c.getElementsByClassName) return G(c.getElementsByClassName(f[3]), e);
        }
        return E(a, c, e, b, h);
    }, E = function(a, b, c, d, e) {
        var f, g, i, j, k, m = b, n = !0, o = [], p = a;
        do if (l.exec(""), f = l.exec(p)) if (p = f[3], o.push(f[1]), f[2]) {
            j = f[3];
            break;
        } while (f);
        if (1 < o.length && w.exec(a)) if (2 === o.length && K.relative[o[0]]) g = N(o[0] + o[1], b, d, e); else for (g = K.relative[o[0]] ? [ b ] : D(o.shift(), b); o.length; ) a = o.shift(), 
        K.relative[a] && (a += o.shift()), g = N(a, g, d, e); else if (!d && 1 < o.length && 9 === b.nodeType && !e && v.ID.test(o[0]) && !v.ID.test(o[o.length - 1]) && (f = D.find(o.shift(), b, e), 
        b = f.expr ? D.filter(f.expr, f.set)[0] : f.set[0]), b) {
            f = d ? {
                expr: o.pop(),
                set: G(d)
            } : D.find(o.pop(), 1 <= o.length && ("~" === o[0] || "+" === o[0]) && b.parentNode || b, e);
            g = f.expr ? D.filter(f.expr, f.set) : f.set;
            for (0 < o.length ? i = G(g) : n = !1; o.length; ) f = k = o.pop(), K.relative[k] ? f = o.pop() : k = "", 
            null == f && (f = b), K.relative[k](i, f, e);
        } else i = [];
        i || (i = g);
        i || D.error(k || a);
        if ("[object Array]" === h.call(i)) if (n) if (b && 1 === b.nodeType) for (a = 0; null != i[a]; a++) i[a] && (!0 === i[a] || 1 === i[a].nodeType && I(b, i[a])) && c.push(g[a]); else for (a = 0; null != i[a]; a++) i[a] && 1 === i[a].nodeType && c.push(g[a]); else c.push.apply(c, i); else G(i, c);
        j && (E(j, m, c, d, e), H(c));
        return c;
    }, F = D.isXML = function(a) {
        return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1;
    }, G = function(a, b) {
        var b = b || [], c = 0, d = a.length;
        if ("number" === typeof d) for (;c < d; c++) b.push(a[c]); else for (;a[c]; c++) b.push(a[c]);
        return b;
    }, H = D.uniqueSort = function(a) {
        if (L && (i = j, a.sort(L), i)) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
        return a;
    }, I = D.contains = e.compareDocumentPosition ? function(a, b) {
        return !!(16 & a.compareDocumentPosition(b));
    } : e.contains ? function(a, b) {
        return a !== b && (a.contains ? a.contains(b) : !1);
    } : function(a, b) {
        for (;b = b.parentNode; ) if (b === a) return !0;
        return !1;
    };
    D.matches = function(a, b) {
        return E(a, d, [], b, F(d));
    };
    D.matchesSelector = function(a, b) {
        return 0 < E(b, d, [], [ a ], F(d)).length;
    };
    D.find = function(a, b, c) {
        var d, e, f, g, h, i;
        if (!a) return [];
        e = 0;
        for (f = K.order.length; e < f; e++) if (h = K.order[e], g = x[h].exec(a)) if (i = g[1], 
        g.splice(1, 1), "\\" !== i.substr(i.length - 1) && (g[1] = (g[1] || "").replace(m, ""), 
        d = K.find[h](g, b, c), null != d)) {
            a = a.replace(v[h], "");
            break;
        }
        d || (d = "undefined" !== typeof b.getElementsByTagName ? b.getElementsByTagName("*") : []);
        return {
            set: d,
            expr: a
        };
    };
    D.filter = function(a, c, d, e) {
        for (var f, g, h, i, j, k, l, m, n = a, o = [], p = c, q = c && c[0] && F(c[0]); a && c.length; ) {
            for (h in K.filter) if (null != (f = x[h].exec(a)) && f[2]) if (k = K.filter[h], 
            j = f[1], g = !1, f.splice(1, 1), "\\" !== j.substr(j.length - 1)) {
                p === o && (o = []);
                if (K.preFilter[h]) if (f = K.preFilter[h](f, p, d, o, e, q)) {
                    if (!0 === f) continue;
                } else g = i = !0;
                if (f) for (l = 0; null != (j = p[l]); l++) j && (i = k(j, f, l, p), m = e ^ i, 
                d && null != i ? m ? g = !0 : p[l] = !1 : m && (o.push(j), g = !0));
                if (i !== b) {
                    d || (p = o);
                    a = a.replace(v[h], "");
                    if (!g) return [];
                    break;
                }
            }
            if (a === n) if (null == g) D.error(a); else break;
            n = a;
        }
        return p;
    };
    D.error = function(a) {
        throw Error("Syntax error, unrecognized expression: " + a);
    };
    var J = D.getText = function(a) {
        var b, c;
        b = a.nodeType;
        var d = "";
        if (b) {
            if (1 === b || 9 === b || 11 === b) {
                if ("string" === typeof a.textContent) return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling) d += J(a);
            } else if (3 === b || 4 === b) return a.nodeValue;
        } else for (b = 0; c = a[b]; b++) 8 !== c.nodeType && (d += J(c));
        return d;
    }, K = D.selectors = {
        match: v,
        leftMatch: x,
        order: [ "ID", "NAME", "TAG" ],
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: B ? function(a) {
                return a.getAttribute("href");
            } : function(a) {
                return a.getAttribute("href", 2);
            },
            type: function(a) {
                return a.getAttribute("type");
            }
        },
        relative: {
            "+": function(a, b) {
                var c = "string" === typeof b, d = c && !n.test(b), c = c && !d;
                d && (b = b.toLowerCase());
                for (var d = 0, e = a.length, f; d < e; d++) if (f = a[d]) {
                    for (;(f = f.previousSibling) && 1 !== f.nodeType; ) ;
                    a[d] = c || f && f.nodeName.toLowerCase() === b ? f || !1 : f === b;
                }
                c && D.filter(b, a, !0);
            },
            ">": function(a, b) {
                var c, d = "string" === typeof b, e = 0, f = a.length;
                if (d && !n.test(b)) {
                    for (b = b.toLowerCase(); e < f; e++) if (c = a[e]) c = c.parentNode, a[e] = c.nodeName.toLowerCase() === b ? c : !1;
                } else {
                    for (;e < f; e++) (c = a[e]) && (a[e] = d ? c.parentNode : c.parentNode === b);
                    d && D.filter(b, a, !0);
                }
            },
            "": function(a, b, d) {
                c("parentNode", a, b, d);
            },
            "~": function(a, b, d) {
                c("previousSibling", a, b, d);
            }
        },
        find: {
            ID: z ? function(a, b, c) {
                if ("undefined" !== typeof b.getElementById && !c) return (a = b.getElementById(a[1])) && a.parentNode ? [ a ] : [];
            } : function(a, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(a[1])) ? c.id === a[1] || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").nodeValue === a[1] ? [ c ] : b : [];
            },
            NAME: function(a, b) {
                if ("undefined" !== typeof b.getElementsByName) {
                    for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                    return 0 === c.length ? null : c;
                }
            },
            TAG: A ? function(a, b) {
                if ("undefined" !== typeof b.getElementsByTagName) return b.getElementsByTagName(a[1]);
            } : function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if ("*" === a[1]) {
                    for (var d = [], e = 0; c[e]; e++) 1 === c[e].nodeType && d.push(c[e]);
                    c = d;
                }
                return c;
            }
        },
        preFilter: {
            CLASS: function(a, b, c, d, e, f) {
                a = " " + a[1].replace(m, "") + " ";
                if (f) return a;
                for (var f = 0, g; null != (g = b[f]); f++) g && (e ^ (g.className && 0 <= (" " + g.className + " ").replace(u, " ").indexOf(a)) ? c || d.push(g) : c && (b[f] = !1));
                return !1;
            },
            ID: function(a) {
                return a[1].replace(m, "");
            },
            TAG: function(a) {
                return a[1].replace(m, "").toLowerCase();
            },
            CHILD: function(a) {
                if ("nth" === a[1]) {
                    a[2] || D.error(a[0]);
                    a[2] = a[2].replace(r, "");
                    var b = q.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !p.test(a[2]) && "0n+" + a[2] || a[2]);
                    a[2] = b[1] + (b[2] || 1) - 0;
                    a[3] = b[3] - 0;
                } else a[2] && D.error(a[0]);
                a[0] = g++;
                return a;
            },
            ATTR: function(a, b, c, d, e, f) {
                b = a[1] = a[1].replace(m, "");
                !f && K.attrMap[b] && (a[1] = K.attrMap[b]);
                a[4] = (a[4] || a[5] || "").replace(m, "");
                "~=" === a[2] && (a[4] = " " + a[4] + " ");
                return a;
            },
            PSEUDO: function(a, b, c, e, f, g) {
                if ("not" === a[1]) if (1 < (l.exec(a[3]) || "").length || o.test(a[3])) a[3] = E(a[3], d, [], b, g); else return a = D.filter(a[3], b, c, !f), 
                c || e.push.apply(e, a), !1; else if (v.POS.test(a[0]) || v.CHILD.test(a[0])) return !0;
                return a;
            },
            POS: function(a) {
                a.unshift(!0);
                return a;
            }
        },
        filters: {
            enabled: function(a) {
                return !1 === a.disabled;
            },
            disabled: function(a) {
                return !0 === a.disabled;
            },
            checked: function(a) {
                var b = a.nodeName.toLowerCase();
                return "input" === b && !!a.checked || "option" === b && !!a.selected;
            },
            selected: function(a) {
                a.parentNode && a.parentNode.selectedIndex;
                return !0 === a.selected;
            },
            parent: function(a) {
                return !!a.firstChild;
            },
            empty: function(a) {
                return !a.firstChild;
            },
            has: function(a, b, c) {
                return !!D(c[3], a).length;
            },
            header: function(a) {
                return s.test(a.nodeName);
            },
            text: function(a) {
                var b = a.getAttribute("type"), c = a.type;
                return "input" === a.nodeName.toLowerCase() && "text" === c && (null === b || b.toLowerCase() === c);
            },
            radio: function(a) {
                return "input" === a.nodeName.toLowerCase() && "radio" === a.type;
            },
            checkbox: function(a) {
                return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type;
            },
            file: function(a) {
                return "input" === a.nodeName.toLowerCase() && "file" === a.type;
            },
            password: function(a) {
                return "input" === a.nodeName.toLowerCase() && "password" === a.type;
            },
            submit: function(a) {
                var b = a.nodeName.toLowerCase();
                return ("input" === b || "button" === b) && "submit" === a.type;
            },
            image: function(a) {
                return "input" === a.nodeName.toLowerCase() && "image" === a.type;
            },
            reset: function(a) {
                var b = a.nodeName.toLowerCase();
                return ("input" === b || "button" === b) && "reset" === a.type;
            },
            button: function(a) {
                var b = a.nodeName.toLowerCase();
                return "input" === b && "button" === a.type || "button" === b;
            },
            input: function(a) {
                return t.test(a.nodeName);
            },
            focus: function(a) {
                var b = a.ownerDocument;
                return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !(!a.type && !a.href);
            },
            active: function(a) {
                return a === a.ownerDocument.activeElement;
            },
            contains: function(a, b, c) {
                return 0 <= (a.textContent || a.innerText || J(a)).indexOf(c[3]);
            }
        },
        setFilters: {
            first: function(a, b) {
                return 0 === b;
            },
            last: function(a, b, c, d) {
                return b === d.length - 1;
            },
            even: function(a, b) {
                return 0 === b % 2;
            },
            odd: function(a, b) {
                return 1 === b % 2;
            },
            lt: function(a, b, c) {
                return b < c[3] - 0;
            },
            gt: function(a, b, c) {
                return b > c[3] - 0;
            },
            nth: function(a, b, c) {
                return c[3] - 0 === b;
            },
            eq: function(a, b, c) {
                return c[3] - 0 === b;
            }
        },
        filter: {
            PSEUDO: function(a, b, c, d) {
                var e = b[1], f = K.filters[e];
                if (f) return f(a, c, b, d);
                if ("not" === e) {
                    b = b[3];
                    c = 0;
                    for (d = b.length; c < d; c++) if (b[c] === a) return !1;
                    return !0;
                }
                D.error(e);
            },
            CHILD: function(a, b) {
                var c, d, e, g, h, i;
                c = b[1];
                i = a;
                switch (c) {
                  case "only":
                  case "first":
                    for (;i = i.previousSibling; ) if (1 === i.nodeType) return !1;
                    if ("first" === c) return !0;
                    i = a;

                  case "last":
                    for (;i = i.nextSibling; ) if (1 === i.nodeType) return !1;
                    return !0;

                  case "nth":
                    c = b[2];
                    d = b[3];
                    if (1 === c && 0 === d) return !0;
                    e = b[0];
                    if ((g = a.parentNode) && (g[f] !== e || !a.nodeIndex)) {
                        h = 0;
                        for (i = g.firstChild; i; i = i.nextSibling) 1 === i.nodeType && (i.nodeIndex = ++h);
                        g[f] = e;
                    }
                    i = a.nodeIndex - d;
                    return 0 === c ? 0 === i : 0 === i % c && 0 <= i / c;
                }
            },
            ID: z ? function(a, b) {
                return 1 === a.nodeType && a.getAttribute("id") === b;
            } : function(a, b) {
                var c = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id");
                return 1 === a.nodeType && c && c.nodeValue === b;
            },
            TAG: function(a, b) {
                return "*" === b && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === b;
            },
            CLASS: function(a, b) {
                return -1 < (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b);
            },
            ATTR: function(a, b) {
                var c = b[1], c = D.attr ? D.attr(a, c) : K.attrHandle[c] ? K.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c), d = c + "", e = b[2], f = b[4];
                return null == c ? "!=" === e : !e && D.attr ? null != c : "=" === e ? d === f : "*=" === e ? 0 <= d.indexOf(f) : "~=" === e ? 0 <= (" " + d + " ").indexOf(f) : !f ? d && !1 !== c : "!=" === e ? d !== f : "^=" === e ? 0 === d.indexOf(f) : "$=" === e ? d.substr(d.length - f.length) === f : "|=" === e ? d === f || d.substr(0, f.length + 1) === f + "-" : !1;
            },
            POS: function(a, b, c, d) {
                var e = K.setFilters[b[2]];
                if (e) return e(a, c, b, d);
            }
        }
    };
    C && (K.order.splice(1, 0, "CLASS"), K.find.CLASS = function(a, b, c) {
        if ("undefined" !== typeof b.getElementsByClassName && !c) return b.getElementsByClassName(a[1]);
    });
    var L, M;
    e.compareDocumentPosition ? L = function(a, b) {
        if (a === b) {
            i = true;
            return 0;
        }
        return !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : 4 & a.compareDocumentPosition(b) ? -1 : 1;
    } : (L = function(a, b) {
        if (a === b) {
            i = true;
            return 0;
        }
        if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
        var c, d, e = [], f = [];
        c = a.parentNode;
        d = b.parentNode;
        var g = c;
        if (c === d) return M(a, b);
        if (c) {
            if (!d) return 1;
        } else return -1;
        for (;g; ) {
            e.unshift(g);
            g = g.parentNode;
        }
        for (g = d; g; ) {
            f.unshift(g);
            g = g.parentNode;
        }
        c = e.length;
        d = f.length;
        for (g = 0; g < c && g < d; g++) if (e[g] !== f[g]) return M(e[g], f[g]);
        return g === c ? M(a, f[g], -1) : M(e[g], b, 1);
    }, M = function(a, b, c) {
        if (a === b) return c;
        for (a = a.nextSibling; a; ) {
            if (a === b) return -1;
            a = a.nextSibling;
        }
        return 1;
    });
    d.querySelectorAll && function() {
        var a = E, b = /^\s*[+~]/, c = /'/g, d = [];
        y(function(a) {
            a.innerHTML = "<select><option selected></option></select>";
            a.querySelectorAll("[selected]").length || d.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            a.querySelectorAll(":checked").length || d.push(":checked");
        });
        y(function(a) {
            a.innerHTML = "<p class=''></p>";
            a.querySelectorAll("[class^='']").length && d.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')");
            a.innerHTML = "<input type='hidden'>";
            a.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled");
        });
        d = d.length && RegExp(d.join("|"));
        E = function(e, f, g, h, i) {
            if (!h && !i && (!d || !d.test(e))) if (9 === f.nodeType) try {
                return G(f.querySelectorAll(e), g);
            } catch (j) {} else if (1 === f.nodeType && "object" !== f.nodeName.toLowerCase()) {
                var k = f, l = f.getAttribute("id"), m = l || "__sizzle__", n = f.parentNode, o = b.test(e);
                l ? m = m.replace(c, "\\$&") : f.setAttribute("id", m);
                o && n && (f = n);
                try {
                    if (!o || n) return G(f.querySelectorAll("[id='" + m + "'] " + e), g);
                } catch (p) {} finally {
                    l || k.removeAttribute("id");
                }
            }
            return a(e, f, g, h, i);
        };
    }();
    var N = function(a, b, c, d) {
        for (var e = [], f = "", g = b.nodeType ? [ b ] : b, h = 0, i = g.length; b = v.PSEUDO.exec(a); ) {
            f += b[0];
            a = a.replace(v.PSEUDO, "");
        }
        for (K.relative[a] && (a += "*"); h < i; h++) E(a, g[h], e, c, d);
        return D.filter(f, e);
    };
    light.Sizzle = D;
}(window);

light.extend(light.Sizzle.selectors.filters, {
    checkable: function(a) {
        return "input" === a.nodeName.toLowerCase() && "undefined" !== typeof a.type;
    },
    hasValue: function(a) {
        a = a.value;
        return "string" === typeof a && "" !== a;
    },
    filled: function(a) {
        return !a.readOnly && !!light.trim(a.value);
    }
});

light.node.getSizzle = function() {
    return light.Sizzle;
};

light.has("/alipay/security/base") || function(a) {
    var b = a.client.info, c = 0, d = [], e = function(a) {
        if (a !== d) throw "invalid constructor, use create() instead.";
    }, f = function(a, b) {
        return a && b && 1 === a.nodeType && "undefined" !== typeof a[b];
    };
    a.register("alipay/security/base", window, e);
    var g = alipay.security;
    g.downloadServer = g.downloadServer || "//download." + a.baseDomain;
    g.securityCenterServer = g.securityCenterServer || "//securitycenter." + a.baseDomain;
    e.defaults = {
        id: "",
        container: null,
        msgMode: "quiet",
        msgTitle: "",
        msgNormalAttribute: "data-explain",
        msgFormItemContainer: null,
        msgClass: "fm-explain",
        msgErrorClass: "fm-error",
        msgHandler: null
    };
    e.Name = "base";
    e.properties = {
        element: null,
        _readyList: []
    };
    g.monitor = function(b, c) {
        window.monitor && monitor.log("sc", b || "unknown", c);
        a.track("sc-" + b + "-" + c);
    };
    g.create = e.create = function(b, f) {
        if (!b) throw "invalid param";
        var g = new b(d);
        g.__type = b;
        var h = e.defaults;
        b.defaults && (b.defaults = h = a.extend({}, e.defaults, b.defaults));
        h = g.options = a.extend({}, h, f);
        h.id ? (h.dataId = h.id + new Date().getTime() + Math.floor(1e3 * Math.random()), 
        a.node("[id=" + h.id + "]:not([data-id])").attr("data-id", h.dataId), h.uniqElement = a.node("[data-id=" + h.dataId + "]")[0]) : (c++, 
        h.id = "_secprd_" + c);
        !a.get(h.id) && "string" === typeof h.container && (h.container = a.get(h.container));
        a.extend(g, e.properties, b.properties);
        b.prototype.postInit && b.prototype.postInit.call(g);
        return g;
    };
    g.activeXEnabled = e.activeXEnabled = function() {
        if (!(window.ActiveXObject instanceof Function) && !window.ActiveXObject) return !1;
        var a = window.external;
        try {
            if (a && "undefined" != typeof a.msActiveXFilteringEnabled && a.msActiveXFilteringEnabled()) return !1;
        } catch (b) {}
        return !0;
    }();
    g.refreshStatus = e.refreshStatus = function(a) {
        var c = a.installed = !1, d = b.engine.trident ? a.info.activex : a.info.plugin;
        if (!d) return !1;
        if (b.engine.trident) {
            if (!g.activeXEnabled) return !1;
            var e;
            try {
                e = new ActiveXObject(d), c = !!e;
            } catch (f) {} finally {}
        } else b.engine.presto && (d = d.replace(/,/, "")), c = !(!navigator.plugins || !navigator.plugins[d]);
        return a.installed = c;
    };
    e.prototype = {
        toString: function() {
            return this.__type.Name + " (" + this.options.id + ")";
        },
        ready: !1,
        onready: function(a) {
            this.ready ? a.apply(this) : this._readyList.push(a);
        },
        hasAPI: function(a) {
            return f(this.element, a);
        },
        dispose: function() {
            this.element && (this.element.parentNode.removeChild(this.element), this.element = null);
            this.ready = !1;
            this._readyList.length = 0;
        },
        api: function(a, b) {
            if (!this.hasAPI(a)) throw "Property is not available: " + a;
            try {
                return void 0 === b ? this.element[a] : this.element[a] = b;
            } catch (c) {
                this.catchError.call(this, a, c);
            }
            return null;
        },
        render: function() {
            var b = !1, c = function() {
                var d = this, e = a.get(this.options.id);
                if (f(e, this.__type.defaultMethod)) {
                    this.element = e;
                    this.ready = !0;
                    this.__type.renderHandler && (b = !1 === this.__type.renderHandler.call(this, !1));
                    for (e = this._readyList; e.length; ) e.shift().apply(this);
                } else b || setTimeout(function() {
                    c.call(d);
                }, 0);
            }, d = function(b, d, e) {
                this.__type.renderingHandler && this.__type.renderingHandler.call(this, !0);
                a.isFunction(d) && this._readyList.push(d);
                e || (d = this.options.container || document.body, d.childNodes.length ? (e = document.createElement("span"), 
                e.innerHTML = b, d.appendChild(e)) : d.innerHTML = b);
                c.call(this);
            }, e = function() {
                var b = this, c = this.__type;
                g.refreshStatus(c);
                c.installed ? (a.log("Plugin just installed."), c.installedHandler && c.installedHandler.call(this)) : setTimeout(function() {
                    e.call(b);
                }, 10);
            };
            return function(b, c) {
                if (!this.alive) {
                    this.alive = !0;
                    var f = a.extend({}, this.__type.info, this.options), g = this;
                    this.__type.installed || e.call(this);
                    a.ready(function() {
                        d.call(g, a.substitute(g.__type.template, f), b, c);
                    });
                }
            };
        }(),
        getMessage: function(b) {
            var c, d = this.__type;
            a.each(d.message, function(a, d) {
                if (-1 !== a.indexOf("-")) {
                    var e = a.split("-", 2), f = parseInt(e[0], 10) || Number.MIN_VALUE, e = parseInt(e[1], 10) || Number.MAX_VALUE;
                    found = b >= f && b <= e;
                } else found = a == b;
                found && (c = d);
                return !found;
            });
            c || (c = d.message[0]);
            return c;
        },
        showMessage: function(b) {
            var c = 0, d = "", e = this.options.msgMode;
            "string" === typeof b ? d = b : "object" === typeof b && (void 0 !== b.status ? (c = b.status, 
            d = b.msg) : void 0 !== b.number && (c = b.number, d = b.description));
            d || (d = "未知错误", a.log("Cannot determine message %s.", b));
            b = {
                title: "运行过程中发生错误",
                type: "string",
                content: d,
                code: c,
                show: !0
            };
            switch (e) {
              case "dialog":
              case "tooltip":
                a.page.ui[e](b);
                break;

              case "form":
                break;

              case "custom":
                a.log("Handler not found.");
                break;

              default:
                a.log("%d, %s", b.code, b.content);
            }
        },
        catchError: function(b, c, d) {
            var e = this.__type, f = c.status || c.number || 0;
            0 > f && (f = (4294967295 + f + 1).toString(16));
            a.log("Caught error %s from %s in action %s.", f, e.Name, b);
            g.monitor(e.Name, f);
            d || this.showMessage(c);
        }
    };
}(window.light);

!function() {
    var a = {
        id: "lapoiohkeidniicbalnfmakkbnpejgbi",
        setExtensionId: function(a) {
            this.id = a || this.id;
        },
        url: "https://chrome.google.com/webstore/detail/",
        webStoreLinkAdded: !1,
        handlers: {},
        checkExtension: function(b) {
            "object" === typeof chrome && "object" === typeof chrome.runtime && "function" === typeof chrome.runtime.sendMessage ? chrome.runtime.sendMessage(a.id, {
                command: "version"
            }, function(a) {
                b(void 0 !== a);
            }) : setTimeout(function() {
                b(!1);
            }, 25);
        },
        checkControl: function(b, c, d) {
            "object" === typeof chrome && "object" === typeof chrome.runtime && "function" === typeof chrome.runtime.sendMessage ? chrome.runtime.sendMessage(a.id, {
                command: "check_" + (c || "aliedit")
            }, function(c) {
                "object" === typeof c && c.existence ? d ? a.checkControlVersion(d, function(a) {
                    b(!a);
                }) : b(!0) : b(!1);
            }) : setTimeout(function() {
                b(!1);
            }, 25);
        },
        checkControlVersion: function(b, c) {
            var d = b.split("-"), e = d[0].split("."), f = d[1].split(".");
            a.execute({
                command: "version"
            }, function(a) {
                if (a && a.version) {
                    a: {
                        for (var a = a.version.split("."), b = 0; 4 > b && !(parseInt(a[b]) > parseInt(e[b])); b++) if (parseInt(a[b]) < parseInt(e[b])) {
                            a = !1;
                            break a;
                        }
                        for (b = 0; 4 > b && !(parseInt(a[b]) < parseInt(f[b])); b++) if (parseInt(a[b]) > parseInt(f[b])) {
                            a = !1;
                            break a;
                        }
                        a = !0;
                    }
                    c(a);
                } else c(!0);
            });
        },
        execute: function(b, c) {
            try {
                chrome.runtime.sendMessage(a.id, b, c);
            } catch (d) {
                c({
                    error: "Extension.execute error: " + d.message
                });
            }
        },
        executeCmd: function(b, c) {
            var d = null;
            if (b) {
                if ("object" === typeof b ? (d = b.service, b = light.param(b)) : d = light.unparam(b).service, 
                d) {
                    light.log("Calling %s: %s.", d, b);
                    try {
                        chrome.runtime.sendMessage(a.id, {
                            command: "cert",
                            input: b
                        }, function(a) {
                            var b = a && a.cert ? light.unparam(a.cert) : {};
                            b.rawData = a && a.cert || "";
                            b.api = d;
                            var e = b.status = parseInt(b.status, 10);
                            isNaN(e) && (e = -1);
                            light.log("Result from %s: (%d) %s.", d, e, a);
                            if (e) {
                                if (e) {
                                    a = alipay.security.utils.chromeExtension;
                                    e = a.handlers[e] || a.handlers["*"] || null;
                                } else e = null;
                                e && e.call(this, b);
                            } else c && c.call(this, b);
                        });
                    } catch (e) {
                        c({
                            error: "Extension.execute error: " + e.message
                        });
                    }
                } else if (light.debug) throw "Invalid command passed";
            } else if (light.debug) throw "Empty command passed";
        },
        install: function(b, c, d) {
            var e = a.url + a.id;
            try {
                a.addWebStoreLink(), window.top.chrome.webstore.install(e, b, c);
            } catch (f) {
                d(f);
            }
        },
        addWebStoreLink: function() {
            if (!a.webStoreLinkAdded) {
                var b = window.top.document, c = b.createElement("link");
                c.setAttribute("rel", "chrome-webstore-item");
                c.setAttribute("href", a.url + a.id);
                b.getElementsByTagName("head")[0].appendChild(c);
                a.webStoreLinkAdded = !0;
            }
        },
        pollTimeInterval: 1e3,
        timer: {},
        callbacks: {},
        pollCheckControll: function(b, c, d) {
            function e() {
                a.checkControl(function(b) {
                    if (b) {
                        a.timer[c] = !1;
                        for (var b = a.callbacks[c], d; d = b.shift(); ) d();
                    } else setTimeout(e, a.pollTimeInterval);
                }, c, d);
            }
            c = c || "aliedit";
            a.timer[c] ? a.callbacks.push(b) : (a.timer[c] = !0, a.callbacks[c] || (a.callbacks[c] = []), 
            a.callbacks[c].push(b), e());
        }
    };
    ((function(a) {
        for (var a = a.split("."), b = window, c = 0, d = a.length; c < d; c++) void 0 === b[a[c]] && (b[a[c]] = {}), 
        b = b[a[c]];
        return b;
    })("alipay.security.utils")).chromeExtension = a;
}();

var ODE3ZDc5Yg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", NjJkYzE0YWY = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1 ], MjllMzhmZGI = function(a) {
    var b, c, d, e, f, g;
    d = a.length;
    c = 0;
    for (b = ""; c < d; ) {
        e = 255 & a.charCodeAt(c++);
        if (c == d) {
            b += ODE3ZDc5Yg.charAt(e >> 2);
            b += ODE3ZDc5Yg.charAt((3 & e) << 4);
            b += "==";
            break;
        }
        f = a.charCodeAt(c++);
        if (c == d) {
            b += ODE3ZDc5Yg.charAt(e >> 2);
            b += ODE3ZDc5Yg.charAt((3 & e) << 4 | (240 & f) >> 4);
            b += ODE3ZDc5Yg.charAt((15 & f) << 2);
            b += "=";
            break;
        }
        g = a.charCodeAt(c++);
        b += ODE3ZDc5Yg.charAt(e >> 2);
        b += ODE3ZDc5Yg.charAt((3 & e) << 4 | (240 & f) >> 4);
        b += ODE3ZDc5Yg.charAt((15 & f) << 2 | (192 & g) >> 6);
        b += ODE3ZDc5Yg.charAt(63 & g);
    }
    return b;
}, NjIxNjRlYzQ = function(a) {
    var b, c, d, e, f;
    e = a.length;
    d = 0;
    for (f = ""; d < e; ) {
        do b = NjJkYzE0YWY[255 & a.charCodeAt(d++)]; while (d < e && -1 == b);
        if (-1 == b) break;
        do c = NjJkYzE0YWY[255 & a.charCodeAt(d++)]; while (d < e && -1 == c);
        if (-1 == c) break;
        f += String.fromCharCode(b << 2 | (48 & c) >> 4);
        do {
            b = 255 & a.charCodeAt(d++);
            if (61 == b) return f;
            b = NjJkYzE0YWY[b];
        } while (d < e && -1 == b);
        if (-1 == b) break;
        f += String.fromCharCode((15 & c) << 4 | (60 & b) >> 2);
        do {
            c = 255 & a.charCodeAt(d++);
            if (61 == c) return f;
            c = NjJkYzE0YWY[c];
        } while (d < e && -1 == c);
        if (-1 == c) break;
        f += String.fromCharCode((3 & b) << 6 | c);
    }
    return f;
}, YTJjNzJmYg = function(a) {
    for (var b, c = [], d = 0, e = 0; e < a.length; e++) b = a.charCodeAt(e), c[d++] = 255 & b;
    return c;
}, NmUzZDU1Njc = function(a) {
    for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
    return b;
}, NWIxYWI3Yw = function(a) {
    return YTJjNzJmYg(NjIxNjRlYzQ(a));
}, NGE1YTk3NDg = function(e) {
    NjRhYmIyNDY = "";
    if ("string" === typeof e) return eval(e);
    for (var a = 0; a < e.length; a++) NjRhYmIyNDY += String.fromCharCode(e[a]);
    return NjBkNDM5NA = eval(NjRhYmIyNDY);
}, NDUzOWYxOWQ = [ 119, 105, 110, 100, 111, 119 ], NmE4Zjg5NmE = NGE1YTk3NDg(NDUzOWYxOWQ), NzJmMDQ1OGE = [ 101, 110, 99, 111, 100, 101, 85, 82, 73, 67, 111, 109, 112, 111, 110, 101, 110, 116 ], NDE1MWQzYzE = function(a, b) {
    a < b && (a ^= b, b ^= a, a ^= b);
    for (;0 != b; ) var c = a % b, a = b, b = c;
    return 255 & a;
}, MmEyYzAxZTQ = function(a) {
    return 255 & (126 ^ 255 & a);
}, MzQxMDlhNWI = function(a) {
    return a + 35 & 255;
}, MTA4NjUxNDA = function(a) {
    return a + 22 & 255;
}, MTA0NTc4YzA = function(a) {
    for (var b = 0; b < a.length; b++) a[b] = 255 & (a[b] >> 4 & 15 | a[b] << 4);
    return a;
}, OGMwOTI1Yw = MTA0NTc4YzA, MmQ1MjgwNDE = function(a) {
    for (var b = NmUzZDU1Njc(ZTVjYTQ4MQ(NWIxYWI3Yw("7YH12arJu9Ki1vCX4w=="))), c = 0; c < a.length; c++) a[c] ^= 255 & b.charCodeAt(c % b.length), 
    a[c] &= 255;
    return a;
}, M2YyMTYyZjI = MmQ1MjgwNDE, M2Y0ODk3ZGQ = [ 0, MmEyYzAxZTQ(127), MzQxMDlhNWI(-32), MzQxMDlhNWI(-28), 15, MTA4NjUxNDA(9), MmEyYzAxZTQ(65), MzQxMDlhNWI(92), 255 ], ZmYwYWVkNA = function(a) {
    for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256;
    return a;
}, NWY0ZmU2NTI = ZmYwYWVkNA, ZTUxM2FlMw = function(a) {
    for (var b = 102, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^= b, b = c, a[d] &= 255;
    return a;
}, NDcxOGY1Y2Y = function(a) {
    for (var b = 201, c = 0; c < a.length; c++) b = 240 & (b << 4 ^ b) | b >> 4 & 15, 
    a[c] = 255 & (a[c] ^ b);
    return a;
}, NTNmNGM1ZA = NDcxOGY1Y2Y, NmZkNDUyNmE = function(a) {
    for (var b = 0; b < a.length; b++) a[b] ^= (234 ^ a[b]) >> 4 & 15, a[b] &= 255;
    return a;
}, NGNkYTlhNjU = NmZkNDUyNmE, ZTVjYTQ4MQ = function(a) {
    for (var b = 203, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] = 255 & (a[d] ^ b), 
    b = c;
    return a;
}, M2IzYTg0MWU = function(a) {
    for (var b = 212, c = 0, d = 0, e = 0; e < a.length; e++) {
        for (var f = c = 0; 8 > f; f++) c |= b & 1 << f, d = (32 & b) << 2 ^ (4 & b) << 5, 
        b = d | b >> 1 & 127;
        a[e] = 255 & (a[e] ^ c);
    }
    return a;
}, OWQxYzdlNA = M2IzYTg0MWU, M2VhMmYwNDY = function(a) {
    for (var b = 0, c = 0; c < a.length; c++) b = 240 & a[c] | 15 & (a[c] >> 4 & 15 ^ a[c]), 
    a[c] = 255 & (b >> 1 & 85 | b << 1 & 170);
    return a;
}, Mjc2MmE5ZTI = M2VhMmYwNDY, NmRkYTJjOTg = function(a) {
    for (var b = NmUzZDU1Njc(NzdhMTk4Zjg(NWIxYWI3Yw("KGZ/InhpeWN7fyhtfw=="))), c = 0; c < a.length; c++) a[c] ^= 255 & b.charCodeAt((c + 1) % b.length), 
    a[c] &= 255;
    return a;
}, Mjc0ZmU5YTQ = NmRkYTJjOTg, NTFjMGY2M2Q = function(a) {
    for (var b = NmUzZDU1Njc(N2IyYWJmODI(NWIxYWI3Yw("692qh/uf0rrLuJ/HvA=="))), c = 0; c < a.length; c++) a[c] ^= 255 & b.charCodeAt((c + 2) % b.length), 
    a[c] &= 255;
    return a;
}, MjZhMzcxMjM = NTFjMGY2M2Q, MWIyNDhhNzk = function(a) {
    for (var b = NmUzZDU1Njc(M2VhMmYwNDY(NWIxYWI3Yw("GJ+zHbiaup+7sxiSsw=="))), c = 0; c < a.length; c++) a[c] ^= 255 & b.charCodeAt((c + 1) % b.length), 
    a[c] &= 255;
    return a;
}, MzJhZDRkZA = MWIyNDhhNzk, MTE1ZTEwYzQ = function(a) {
    for (var b = NmUzZDU1Njc(MjYyNWRhNzY(NWIxYWI3Yw("Kjx9Nnpre2F5fSpvfQ=="))), c = 0; c < a.length; c++) a[c] ^= 255 & b.charCodeAt((c + 1) % b.length), 
    a[c] &= 255;
    return a;
}, NTYwM2YwMTM = MTE1ZTEwYzQ, MzU1NmNmYjM = function(a) {
    for (var b = 53, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256 + 1;
    return a;
}, N2MzYWE4N2Y = MzU1NmNmYjM, NzQ5MmYyZmE = function(a) {
    for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256 + 1;
    return a;
}, M2ZmYzZjZA = NzQ5MmYyZmE, Mjg3ZjNkYTc = function(a) {
    for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b + 1, a[c] &= 255, b = b * c % 256;
    return a;
}, NDcwYmUyMmY = Mjg3ZjNkYTc, NWFiNzQxZjI = function(a) {
    for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b + 2, a[c] &= 255, b = b * c % 256;
    return a;
}, MzI4ZjIwMzY = NWFiNzQxZjI, N2FlYTU2MzQ = function(a) {
    for (var b = 103, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^= b + 1, b = c, 
    a[d] &= 255;
    return a;
}, MWVkZTc1ZmE = function(a) {
    for (var b = 201, c = 0; c < a.length; c++) b = 240 & (b << 4 ^ b + 1) | b >> 4 & 15, 
    a[c] = 255 & (a[c] ^ b);
    return a;
}, NjNiYThiNmE = MWVkZTc1ZmE, MWRmMDM1NWM = function(a) {
    for (var b = 201, c = 0; c < a.length; c++) b = (240 & (b << 4 ^ b) | b >> 4) + 1, 
    a[c] = 255 & (a[c] ^ b);
    return a;
}, N2ZhZDAzMDE = MWRmMDM1NWM, NWQ3NDdmNjQ = function(a) {
    for (var b = 203, c = 0; c < a.length; c++) b = 240 & (b << 4 ^ b + 1) | b >> 4 & 15, 
    a[c] = 255 & (a[c] ^ b);
    return a;
}, NTI4ODA0Y2Y = NWQ3NDdmNjQ, Nzk3ZTc1N2I = function(a) {
    for (var b = 203, c = 0; c < a.length; c++) b = 240 & (b << 4 ^ b) | b + 1 >> 4 & 15, 
    a[c] = 255 & (a[c] ^ b);
    return a;
}, MzY4MjgxYWI = Nzk3ZTc1N2I, MjYyNWRhNzY = function(a) {
    for (var b = 0; b < a.length; b++) a[b] = 255 & ((235 ^ a[b]) >> 4 & 15 ^ a[b]);
    return a;
}, ODVmNzA1Ng = MjYyNWRhNzY, NzdhMTk4Zjg = function(a) {
    for (var b = 0; b < a.length; b++) a[b] = 255 & ((195 ^ a[b]) >> 4 & 15 ^ a[b]);
    return a;
}, MWZiZDFiM2M = NzdhMTk4Zjg, N2IyYWJmODI = function(a) {
    for (var b = 205, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] = 255 & (a[d] ^ b), 
    b = c + 1;
    return a;
};

void function() {
    var a = {}, b = function() {
        return document.addEventListener ? function(a, b, c) {
            a.addEventListener(b, c, !1);
        } : document.attachEvent ? function(a, b, c) {
            a.attachEvent(NmUzZDU1Njc(N2FlYTU2MzQ(NWIxYWI3Yw("B2Y="))) + b, c);
        } : function(a, b, c) {
            a[NmUzZDU1Njc(MzU1NmNmYjM(NWIxYWI3Yw("Wm8="))) + b.toLowerCase()] = c;
        };
    }(), c = function(a) {
        for (var a = a.split(NmUzZDU1Njc(NmZkNDUyNmE(NWIxYWI3Yw("Ig==")))), b = window, c = 0, d = a.length; c < d; c++) void 0 === b[a[c]] && (b[a[c]] = {}), 
        b = b[a[c]];
        return b;
    }(NmUzZDU1Njc(N2FlYTU2MzQ(NWIxYWI3Yw("CWYOf+GbssCkxrLBq9igj+WS+pfrwqjMtMai0g=="))));
    c.start = function(c) {
        var d = document.getElementById(c);
        if (d) {
            var e = a[c] = [];
            b(d, NmUzZDU1Njc(N2IyYWJmODI(NWIxYWI3Yw("psK634/nhg=="))), function(a) {
                e.push([ NmUzZDU1Njc(MzU1NmNmYjM(NWIxYWI3Yw("cQ=="))), a.keyCode, new Date().getTime() ]);
            });
            b(d, NmUzZDU1Njc(MzU1NmNmYjM(NWIxYWI3Yw("XmR7cGA="))), function(b) {
                "" === d.value ? e = a[c] = [] : e.push([ NmUzZDU1Njc(ZTUxM2FlMw(NWIxYWI3Yw("Mw=="))), b.keyCode, new Date().getTime() ]);
            });
        }
    };
    c.get = function(b) {
        b = a[b];
        if (!b || 0 === b.length) return "";
        for (var c, d = b[0][2], e, f = 0, g = b.length; f < g; f++) c = b[f], c[2] -= d, 
        e = c[1], 48 <= e && 57 >= e || 65 <= e && 90 >= e || 186 <= e && 192 >= e || 219 <= e && 222 >= e ? c[1] = 0 : 96 <= e && 111 >= e && (c[1] = -1);
        for (c = b.join(NmUzZDU1Njc(N2IyYWJmODI(NWIxYWI3Yw("sQ==")))); b.length; ) b.pop();
        return 1024 <= c.length ? "" : c;
    };
    c.ksk = function(a, b) {
        for (var c = [], d = 0, e, f = "", g = 0; 256 > g; g++) c[g] = g;
        for (g = 0; 256 > g; g++) d = (d + c[g] + a[NmUzZDU1Njc(M2VhMmYwNDY(NWIxYWI3Yw("mp2buouWkZOKsw==")))](g % a.length)) % 256, 
        e = c[g], c[g] = c[d], c[d] = e;
        for (var h = d = g = 0; h < b[NmUzZDU1Njc(MjYyNWRhNzY(NWIxYWI3Yw("ZG1mb31g")))]; h++) g = (g + 1) % 256, 
        d = (d + c[g]) % 256, e = c[g], c[g] = c[d], c[d] = e, f += String[NmUzZDU1Njc(ZTVjYTQ4MQ(NWIxYWI3Yw("rd+w3Z72l+Wmya3I")))](b[NmUzZDU1Njc(N2FlYTU2MzQ(NWIxYWI3Yw("C2QEdztTMFQUYQ==")))](h) ^ c[(c[g] + c[d]) % 256]);
        return f;
    };
}();

light.has("/alipay/security/edit") || function(a, b) {
    var c = light.client.info, d = alipay.security.downloadServer, e = alipay.security.securityCenterServer, f = function() {
        var a = "windows" == c.os.name ? "Alipay security control" : "macos" == c.os.name ? "Aliedit Plug-In" : "linux" == c.os.name ? "Aliedit" : "", b = "";
        if ("windows" == c.os.name) b = d + "/sec/edit/aliedit.exe"; else if ("macos" == c.os.name) "safari" == c.browser.name ? 5 <= navigator.userAgent.toLowerCase().match(/version\/(\d+\.\d+)/)[1] && (b = d + "/aliedit/wkaliedit/1002/wkaliedit.dmg") : b = d + "/aliedit/wkaliedit/1002/wkaliedit.dmg"; else if ("linux" == c.os.name && ("firefox" == c.browser.name || "chrome" == c.browser.name || "opera" == c.browser.name)) b = d + "/alipaysc/linux/aliedit/1.0.3.20/aliedit.tar.gz";
        a = {
            activex: "Aliedit.EditCtrl",
            plugin: a,
            classId: "488A4255-3236-44B3-8F27-FA1AECAA8844",
            type: "application/aliedit",
            version: "2.4.0.1",
            editSrc: b,
            cssSrc: (light.debug ? "http://assets.dev.alipay.net" : "https://a.alipayobjects.com") + ("/al/alice.components.security-edit-1.4" + (light.debug ? "-src" : "") + ".css"),
            installationPage: e + "/sc/npedit/dialog.htm"
        };
        return {
            Name: "control.edit",
            info: a,
            template: c.engine.trident ? '<object id="{id}" classid="clsid:{classId}" width="{width}" height="{height}" tabindex="{tabindex}"><param name="wmode" value="opaque" /><param name="cm5ts" value="{timestamp}" /><param name="cm5pk" value="{pk}" /><param name="PasswordMode" value="{passwordMode}" /><param name="CryptoMode" value="4" /></object>' : '<object id="{id}" name="{name}" type="{type}" width="{width}" height="{height}" tabindex="{tabindex}"><param name="PasswordMode" value="{passwordMode}" /></object>',
            available: !!a.editSrc,
            defaultMethod: "TextData"
        };
    }(), g = function() {
        b.cookie = {
            days: 365,
            domain: "." + light.baseDomain,
            path: "/"
        };
        var a = b.get("ac-stat"), d = null, e = !1, g = !1, h = function() {
            var d = this;
            "no" == a && (b.set("ac-stat", "success"), light.track("ac-success"));
            if (!c.engine.trident) {
                var e = 1;
                window.setTimeout(function() {
                    var a = d.element.getElementsByTagName("param");
                    a || window.setTimeout(arguments.callee, 100);
                    "PasswordMode" == a[0].name && "0" == a[0].value && function() {
                        try {
                            d.element.PasswordMode = 0;
                        } catch (a) {
                            light.track(c.browser.name + "-alieditBox-password-error");
                        }
                        if (0 !== d.element.PasswordMode && e < 20) {
                            e++;
                            window.setTimeout(arguments.callee, 100);
                        }
                    }();
                }, 100);
            }
        };
        if (window.top !== window) {
            var i = document.domain.split(".");
            1 < i.length && (document.domain = i[i.length - 2] + "." + i[i.length - 1]);
        }
        var j = document, i = window, k = {}, l = f.info;
        try {
            if (window.top.document.body) {
                j = window.top.document;
                do if (k = null != i.frameElement ? i.frameElement : {}, /xbox/i.test(k.name) || /xbox/i.test(k.id)) e = !0; while ((i = i.parent) != window.top && !e);
            }
        } catch (m) {
            g = !0;
        }
        f.detect = function() {
            var a = f.info;
            !g && window.top.document.body && (d = new light.dialog({
                targetFrame: j,
                iframeSrc: a.installationPage
            }));
            try {
                g || e ? a.editSrc ? location.href = a.editSrc : alert("您现在所用的浏览器，暂不支持安全控件。") : d && d.show();
            } catch (b) {
                a.editSrc ? location.href = a.editSrc : alert("您现在所用的浏览器，暂不支持安全控件。");
            }
            return !1;
        };
        var n = f._notInstalled = function() {
            if (!a || "success" == a) b.set("ac-stat", "no"), light.track("ac-no");
            var c = location.pathname;
            c && /payment\/cashier\.htm/.test(c) && light.track("ac-no-cashier");
            var d = this;
            !function() {
                d.options.alieditUpgradeVersions && (f.info.installationPage = l.installationPage += "?version=beta");
                d.options.container.innerHTML = '<a href="' + l.installationPage + '" class="aliedit-install J_aliedit_xbox_link" seed="ac-link-tips">请点此安装控件</a>';
                var a = d.options.container.getElementsByTagName("a")[0];
                light.on(a, "click", function(a) {
                    a.cancel();
                    f.detect();
                });
                setTimeout(function() {
                    var a = light.node.build("div", {
                        className: "edit-tips",
                        id: "edit-tips"
                    });
                    a.html('<a class="edit-tips-text" href="' + l.installationPage + '" seed="ac-link-intro">控件可保护您输入信息的安全</a><div class="edit-tips-angle"></div>');
                    a.appendTo(d.options.container);
                    light.on(a[0], "click", function(a) {
                        a.cancel();
                        f.detect();
                    });
                    var b = j.head || j.getElementsByTagName("head")[0] || j.documentElement;
                    b.getElementsByTagName("link");
                    var c = j.createElement("link");
                    c.setAttribute("charset", "utf-8");
                    c.setAttribute("rel", "stylesheet");
                    c.setAttribute("href", l.cssSrc);
                    b.appendChild(c);
                    light.on(document.body, "click", function(b) {
                        b = window.event || b;
                        b = b.srcElement || b.target;
                        a[0] && b.id != void 0 && (a[0].className = "fn-hide");
                    });
                }, 1500);
            }();
        };
        return {
            postInit: function() {
                var a = !1, b = this;
                if (this.__type.installed) this.onready(function() {
                    a = !0;
                    light.node("input[name=_seaside_gogo_]").val(this.getCi1());
                    if (b.options.alieditUpgradeVersions) {
                        var c = this.getVersion().split("."), d = b.options.alieditUpgradeVersions.split("-"), e = d[0].split(".");
                        a: {
                            for (var d = d[1].split("."), f = 0; 4 > f && !(parseInt(c[f]) > parseInt(e[f])); f++) if (parseInt(c[f]) < parseInt(e[f])) {
                                c = !1;
                                break a;
                            }
                            for (f = 0; 4 > f && !(parseInt(c[f]) < parseInt(d[f])); f++) if (parseInt(c[f]) > parseInt(d[f])) {
                                c = !1;
                                break a;
                            }
                            c = !0;
                        }
                        if (c) {
                            n.call(b);
                            try {
                                alipay.security.updateEdit = !0, alipay.security.sysCallback();
                            } catch (g) {}
                        }
                    } else h.call(b);
                }); else {
                    n.call(this);
                    a = !0;
                    try {
                        alipay.security.updateEdit = !0, alipay.security.sysCallback();
                    } catch (c) {}
                }
                setTimeout(function() {
                    if (!a && b.options.alieditUpgradeVersions) {
                        n.call(b);
                        try {
                            alipay.security.updateEdit = !0, alipay.security.sysCallback();
                        } catch (c) {}
                    }
                }, 5e3);
            },
            getInfo: function(a) {
                if (!this.__type.installed) return "";
                var b = "", c = {
                    ci1: "mac",
                    ci2: "ipproxy",
                    alieditVersion: "version",
                    pw: "password"
                }[a];
                if (!this.element) return "";
                if ("pw" != a) try {
                    b = this.element[a]();
                    if (/XOR_1_0{30}_/.test(b) || /(?:\d\.){3}\d/.test(b)) return b;
                    if ("ci2" == a && "" === b) return "";
                    light.track("ac-" + c + "-invalid", !0);
                    return "";
                } catch (d) {
                    return light.track("ac-" + c + "-interface-error", !0), "";
                } else {
                    b = this.element.TextData;
                    if (/3DES_2_0{30}_/.test(b)) return b;
                    light.track("ac-" + c + "-invalid", !0);
                    return "";
                }
            },
            getCi1: function() {
                return this.getInfo("ci1");
            },
            getCi2: function() {
                return this.getInfo("ci2");
            },
            getVersion: function() {
                return this.getInfo("alieditVersion");
            },
            getPassword: function() {
                return this.getInfo("pw");
            }
        };
    }(), f = a.edit = light.deriveFrom(a.base, g, f);
    f.defaults = {};
    a.refreshStatus(a.edit);
}(alipay.security, light.client.storage);

light.has("/alipay/security/npedit") || function(a, b) {
    var c = light.client.info, d = alipay.security.downloadServer, e = alipay.security.securityCenterServer;
    npedit = function() {
        var a = {
            activex: "npAliSecCtrl.SecCtrl",
            plugin: "Alipay Security Control 3",
            classId: "8EB7C6CB-2DA6-4ABE-B2EA-EAC5A372E757",
            type: "application/x-alisecctrl-plugin",
            version: "2.4.0.1",
            editSrc: d + "/sec/edit/aliedit.exe",
            cssSrc: (light.debug ? "http://assets.dev.alipay.net" : "https://a.alipayobjects.com") + ("/al/alice.components.security-edit-1.4" + (light.debug ? "-src" : "") + ".css"),
            installationPage: e + "/sc/npedit/dialog.htm"
        };
        return {
            Name: "control.npedit",
            info: a,
            template: c.engine.trident ? '<object id="{id}" name="{name}" classid="clsid:{classId}" width="{width}" height="{height}" tabindex="{tabindex}"><param name="prop" value="{prop}"></object>' : '<object id="{id}" name="{name}" type="{type}" width="{width}" height="{height}" prop="{prop}" tabindex="{tabindex}" handler="{handler}"></object>',
            available: a.editSrc ? !0 : !1,
            minVersion: "1.0.0.1",
            defaultMethod: "GetMiscInfo"
        };
    }();
    members = function() {
        b.cookie = {
            days: 365,
            domain: "." + light.baseDomain,
            path: "/"
        };
        var a = b.get("ac-stat"), f = document, g = null, h = !1, i = function() {
            var a = "";
            if ("windows" == c.os.name) a = d + "/sec/edit/aliedit.exe"; else if ("macos" == c.os.name) "safari" == c.browser.name ? 5 <= navigator.userAgent.toLowerCase().match(/version\/(\d+\.\d+)/)[1] && (a = d + "/aliedit/wkaliedit/1002/wkaliedit.dmg") : a = d + "/aliedit/wkaliedit/1002/wkaliedit.dmg"; else if ("linux" == c.os.name && ("firefox" == c.browser.name || "chrome" == c.browser.name || "opera" == c.browser.name)) a = d + "/alipaysc/linux/aliedit/1.0.3.20/aliedit.tar.gz";
            return a;
        }(), j = (light.debug ? "http://assets.dev.alipay.net" : "https://a.alipayobjects.com") + ("/al/alice.components.security-edit-1.4" + (light.debug ? "-src" : "") + ".css"), k = e + "/sc/npedit/dialog.htm", l = function() {
            !h && window.top.document.body && (g = new light.dialog({
                targetFrame: f,
                iframeSrc: k
            }));
            try {
                h ? i ? location.href = i : alert("您现在所用的浏览器，暂不支持安全控件。") : g && g.show();
            } catch (a) {
                i ? location.href = i : alert("您现在所用的浏览器，暂不支持安全控件。");
            }
            return !1;
        }, m = function() {
            "no" == a && (b.set("ac-stat", "success"), light.track("ac-success"));
            try {
                var c = this.element.GetMiscInfo("2", 0).match(/\d+/)[0];
            } catch (d) {
                c = 0, light.track("npedit-failure-detection-error", !0);
            }
            if (0 < c && 1e3 > c) {
                light.track("BIZ_CODEBASE_ERR" + c, !0);
                var e = light.node.build("div", {
                    className: "edit-tips-two-lines",
                    id: "aliedit-tips"
                });
                e.html('<div class="edit-tips-text">检测不到安全控件，暂不能输入</div><div class="edit-tips-angle"></div>');
                e.appendTo(this.options.container);
                e = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                e.getElementsByTagName("link");
                var f = document.createElement("link");
                f.setAttribute("charset", "utf-8");
                f.setAttribute("rel", "stylesheet");
                f.setAttribute("href", this.__type.info.cssSrc);
                e.appendChild(f);
            }
            document.attachEvent && this.element.attachEvent("onstatechange", function(a, b) {
                if ("Error" == a && b && (c = b.match(/[^\d]*(\d+)?.*/)[1])) {
                    light.track("BIZ_CODEBASE_EVENT_ERR" + c, true);
                    return false;
                }
            });
        }, n = function() {
            var a = this;
            !function() {
                a.options.alieditUpgradeVersions && (npedit.info.installationPage = k += "?version=beta");
                a.options.container.innerHTML = '<a href="' + k + '" class="aliedit-install J_aliedit_xbox_link" seed="ac-link-tips">请点此安装控件</a>';
                var b = a.options.container.getElementsByTagName("a")[0];
                light.on(b, "click", function(a) {
                    a.cancel();
                    l();
                });
                setTimeout(function() {
                    var b = light.node.build("div", {
                        className: "edit-tips",
                        id: "edit-tips"
                    });
                    b.html('<a class="edit-tips-text" href="' + k + '" seed="ac-link-intro">控件可保护您输入信息的安全</a><div class="edit-tips-angle"></div>');
                    b.appendTo(a.options.container);
                    light.on(b[0], "click", function(a) {
                        a.cancel();
                        l();
                    });
                    var c = f.head || f.getElementsByTagName("head")[0] || f.documentElement;
                    c.getElementsByTagName("link");
                    var d = f.createElement("link");
                    d.setAttribute("charset", "utf-8");
                    d.setAttribute("rel", "stylesheet");
                    d.setAttribute("href", j);
                    c.appendChild(d);
                    light.on(document.body, "click", function(a) {
                        a = window.event || a;
                        a = a.srcElement || a.target;
                        b[0] && a.id != void 0 && (b[0].className = "fn-hide");
                    });
                }, 1500);
            }();
        };
        try {
            window.top.document.body && (f = window.top.document);
        } catch (o) {
            h = !0;
        }
        return {
            postInit: function() {
                var a = !1, b = this;
                if (this.__type.installed) this.onready(function() {
                    a = !0;
                    light.node("input[name=_seaside_gogo_]").val(this.getCi1());
                    light.node("input[name=J_aliedit_net_info]").val(this.getNetInfo());
                    if (b.options.alieditUpgradeVersions) {
                        var c = this.getVersion().split("."), d = b.options.alieditUpgradeVersions.split("-"), e = d[0].split(".");
                        a: {
                            for (var d = d[1].split("."), f = 0; 4 > f && !(parseInt(c[f]) > parseInt(e[f])); f++) if (parseInt(c[f]) < parseInt(e[f])) {
                                c = !1;
                                break a;
                            }
                            for (f = 0; 4 > f && !(parseInt(c[f]) < parseInt(d[f])); f++) if (parseInt(c[f]) > parseInt(d[f])) {
                                c = !1;
                                break a;
                            }
                            c = !0;
                        }
                        if (c) {
                            n.call(b);
                            try {
                                alipay.security.updateEdit = !0, alipay.security.sysCallback();
                            } catch (g) {}
                        }
                    } else m.call(b);
                }); else {
                    n.call(this);
                    a = !0;
                    try {
                        alipay.security.updateEdit = !0, alipay.security.sysCallback();
                    } catch (c) {}
                }
                setTimeout(function() {
                    if (!a && b.options.alieditUpgradeVersions) {
                        n.call(b);
                        try {
                            alipay.security.updateEdit = !0, alipay.security.sysCallback();
                        } catch (c) {}
                    }
                }, 5e3);
            },
            getInfo: function(a, b, c) {
                var d = "", e = {
                    4: "mac",
                    5: "ipproxy",
                    6: "keyseq",
                    Default: "password"
                }[b] || b;
                if (!this.__type.installed || !this.element) return "";
                try {
                    "GetMiscInfo" == a ? d = this.element.GetMiscInfo(b, c) : "GetEnInfo" == a && (d = this.element.GetEnInfo(b, c));
                } catch (f) {
                    return light.track("npedit-" + e + "-interface-error", !0), "";
                }
                if (3 == b) {
                    if (1 == d) return light.track("npedit-password-is-empty", !0), !1;
                    if (0 == d) return !0;
                }
                if (!(344 == d.length || /XOR_1_0{30}_/.test(d))) {
                    if (5 == b && "" === d) return "";
                    light.track("npedit-" + e + "-invalid", !0);
                }
                return d;
            },
            getCi1: function() {
                return this.getInfo("GetMiscInfo", "4", 0);
            },
            getCi2: function() {
                return this.getInfo("GetMiscInfo", "5", 0);
            },
            getVersion: function() {
                return this.getInfo("GetMiscInfo", "1", 0);
            },
            getNetInfo: function() {
                return this.getInfo("GetMiscInfo", "lbs", 0);
            },
            getWebSocketInfo: function() {
                return this.getInfo("GetMiscInfo", "websocketinfo", 0);
            },
            getPassword: function() {
                return !this.getInfo("GetMiscInfo", "3", 0) ? "" : this.getInfo("GetEnInfo", "Default", 0);
            },
            getKeySeq: function() {
                if (this.options.useKS) {
                    var a = this.getInfo("GetMiscInfo", "6", 0);
                    return a = "string" === typeof a && 0 < a.length ? alipay.security.utils.Base64.encode(alipay.security.utils.keyseq.ksk(this.options.ksk, a)) : "";
                }
                return null;
            }
        };
    }();
    npedit = a.npedit = light.deriveFrom(a.base, members, npedit);
    npedit.defaults = {};
    a.refreshStatus(a.npedit);
    npedit.installed && (npedit.installed = a.edit.installed);
}(alipay.security, light.client.storage);

light.has("/alipay/security/noedit") || function(a) {
    members = {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            (this.element = light.get(this.options.id)) && (this.element.value = "");
            for (a = this._readyList; a.length; ) a.shift().apply(this);
            this.options.useKS && alipay.security.utils.keyseq.start(this.options.id);
        },
        getPassword: function() {
            return this.element.value;
        },
        getKeySeq: function() {
            if (this.options.useKS) {
                var a = '{"type":"js", "in":"' + alipay.security.utils.keyseq.get(this.options.id) + '"}';
                return alipay.security.utils.Base64.encode(alipay.security.utils.keyseq.ksk(this.options.ksk, a));
            }
            return null;
        }
    };
    a.noedit = light.deriveFrom(a.base, members, {
        Name: "noedit"
    });
}(alipay.security);

light.has("/alipay/security/utils") || function(a) {
    a.utils = {};
}(alipay.security);

!function(a) {
    function b(a, b, c) {
        null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b));
    }
    function c() {
        return new b(null);
    }
    function d(a, b, c, d, e, f) {
        for (;0 <= --f; ) {
            var g = b * this[a++] + c[d] + e, e = Math.floor(g / 67108864);
            c[d++] = 67108863 & g;
        }
        return e;
    }
    function e(a, b, c, d, e, f) {
        for (var g = 32767 & b, b = b >> 15; 0 <= --f; ) {
            var h = 32767 & this[a], i = this[a++] >> 15, j = b * h + i * g, h = g * h + ((32767 & j) << 15) + c[d] + (1073741823 & e), e = (h >>> 30) + (j >>> 15) + b * i + (e >>> 30);
            c[d++] = 1073741823 & h;
        }
        return e;
    }
    function f(a, b, c, d, e, f) {
        for (var g = 16383 & b, b = b >> 14; 0 <= --f; ) {
            var h = 16383 & this[a], i = this[a++] >> 14, j = b * h + i * g, h = g * h + ((16383 & j) << 14) + c[d] + e, e = (h >> 28) + (j >> 14) + b * i;
            c[d++] = 268435455 & h;
        }
        return e;
    }
    function g(a, b) {
        var c = C[a.charCodeAt(b)];
        return null == c ? -1 : c;
    }
    function h(a) {
        var b = c();
        b.fromInt(a);
        return b;
    }
    function i(a) {
        var b = 1, c;
        if (0 != (c = a >>> 16)) a = c, b += 16;
        if (0 != (c = a >> 8)) a = c, b += 8;
        if (0 != (c = a >> 4)) a = c, b += 4;
        if (0 != (c = a >> 2)) a = c, b += 2;
        0 != a >> 1 && (b += 1);
        return b;
    }
    function j(a) {
        this.m = a;
    }
    function k(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = 32767 & this.mp;
        this.mph = this.mp >> 15;
        this.um = (1 << a.DB - 15) - 1;
        this.mt2 = 2 * a.t;
    }
    function l(a, b) {
        return a & b;
    }
    function m(a, b) {
        return a | b;
    }
    function n(a, b) {
        return a ^ b;
    }
    function o(a, b) {
        return a & ~b;
    }
    function p() {}
    function q(a) {
        return a;
    }
    function r(a) {
        this.r2 = c();
        this.q3 = c();
        b.ONE.dlShiftTo(2 * a.t, this.r2);
        this.mu = this.r2.divide(a);
        this.m = a;
    }
    function s() {
        this.j = this.i = 0;
        this.S = [];
    }
    function t() {}
    function u(a, c) {
        return new b(a, c);
    }
    function w() {
        this.n = null;
        this.e = 0;
        this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null;
    }
    function x(a, b) {
        for (var c = [], d = 0, e = a.length; d < e; d++) {
            var f = a.charCodeAt(d);
            128 > f ? c.push(f) : 127 < f && 2048 > f ? (c.push(63 & f | 128), c.push(f >> 6 | 192)) : (c.push(63 & f | 128), 
            c.push(f >> 6 & 63 | 128), c.push(f >> 12 | 224));
        }
        e = b - a.length;
        if (0 < e) for (d = 0; d < e; d++) c.push(0);
        return c;
    }
    function y(a) {
        var b, c, d = "";
        for (b = 0; b + 3 <= a.length; b += 3) c = parseInt(a.substring(b, b + 3), 16), 
        d += K.charAt(c >> 6) + K.charAt(63 & c);
        b + 1 == a.length ? (c = parseInt(a.substring(b, b + 1), 16), d += K.charAt(c << 2)) : b + 2 == a.length && (c = parseInt(a.substring(b, b + 2), 16), 
        d += K.charAt(c >> 2) + K.charAt((3 & c) << 4));
        for (;0 < (3 & d.length); ) d += L;
        return d;
    }
    function z(a) {
        var b = "", c, d = 0, e;
        for (c = 0; c < a.length && a.charAt(c) != L; ++c) v = K.indexOf(a.charAt(c)), 0 > v || (0 == d ? (b += B.charAt(v >> 2), 
        e = 3 & v, d = 1) : 1 == d ? (b += B.charAt(e << 2 | v >> 4), e = 15 & v, d = 2) : 2 == d ? (b += B.charAt(e), 
        b += B.charAt(v >> 2), e = 3 & v, d = 3) : (b += B.charAt(e << 2 | v >> 4), b += B.charAt(15 & v), 
        d = 0));
        1 == d && (b += B.charAt(e << 2));
        return b;
    }
    var A;
    "Microsoft Internet Explorer" == navigator.appName ? (b.prototype.am = e, A = 30) : "Netscape" != navigator.appName ? (b.prototype.am = d, 
    A = 26) : (b.prototype.am = f, A = 28);
    b.prototype.DB = A;
    b.prototype.DM = (1 << A) - 1;
    b.prototype.DV = 1 << A;
    b.prototype.FV = Math.pow(2, 52);
    b.prototype.F1 = 52 - A;
    b.prototype.F2 = 2 * A - 52;
    var B = "0123456789abcdefghijklmnopqrstuvwxyz", C = [], D;
    A = 48;
    for (D = 0; 9 >= D; ++D) C[A++] = D;
    A = 97;
    for (D = 10; 36 > D; ++D) C[A++] = D;
    A = 65;
    for (D = 10; 36 > D; ++D) C[A++] = D;
    j.prototype.convert = function(a) {
        return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a;
    };
    j.prototype.revert = function(a) {
        return a;
    };
    j.prototype.reduce = function(a) {
        a.divRemTo(this.m, null, a);
    };
    j.prototype.mulTo = function(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c);
    };
    j.prototype.sqrTo = function(a, b) {
        a.squareTo(b);
        this.reduce(b);
    };
    k.prototype.convert = function(a) {
        var d = c();
        a.abs().dlShiftTo(this.m.t, d);
        d.divRemTo(this.m, null, d);
        a.s < 0 && d.compareTo(b.ZERO) > 0 && this.m.subTo(d, d);
        return d;
    };
    k.prototype.revert = function(a) {
        var b = c();
        a.copyTo(b);
        this.reduce(b);
        return b;
    };
    k.prototype.reduce = function(a) {
        for (;a.t <= this.mt2; ) a[a.t++] = 0;
        for (var b = 0; b < this.m.t; ++b) {
            var c = 32767 & a[b], d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM, c = b + this.m.t;
            for (a[c] = a[c] + this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; ) {
                a[c] = a[c] - a.DV;
                a[++c]++;
            }
        }
        a.clamp();
        a.drShiftTo(this.m.t, a);
        a.compareTo(this.m) >= 0 && a.subTo(this.m, a);
    };
    k.prototype.mulTo = function(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c);
    };
    k.prototype.sqrTo = function(a, b) {
        a.squareTo(b);
        this.reduce(b);
    };
    b.prototype.copyTo = function(a) {
        for (var b = this.t - 1; b >= 0; --b) a[b] = this[b];
        a.t = this.t;
        a.s = this.s;
    };
    b.prototype.fromInt = function(a) {
        this.t = 1;
        this.s = a < 0 ? -1 : 0;
        a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0;
    };
    b.prototype.fromString = function(a, c) {
        var d;
        if (16 == c) d = 4; else if (8 == c) d = 3; else if (256 == c) d = 8; else if (2 == c) d = 1; else if (32 == c) d = 5; else if (4 == c) d = 2; else {
            this.fromRadix(a, c);
            return;
        }
        this.s = this.t = 0;
        for (var e = a.length, f = false, h = 0; --e >= 0; ) {
            var i = 8 == d ? 255 & a[e] : g(a, e);
            if (i < 0) "-" == a.charAt(e) && (f = true); else {
                f = false;
                if (0 == h) this[this.t++] = i; else if (h + d > this.DB) {
                    this[this.t - 1] = this[this.t - 1] | (i & (1 << this.DB - h) - 1) << h;
                    this[this.t++] = i >> this.DB - h;
                } else this[this.t - 1] = this[this.t - 1] | i << h;
                h += d;
                h >= this.DB && (h -= this.DB);
            }
        }
        if (8 == d && 0 != (128 & a[0])) {
            this.s = -1;
            h > 0 && (this[this.t - 1] = this[this.t - 1] | (1 << this.DB - h) - 1 << h);
        }
        this.clamp();
        f && b.ZERO.subTo(this, this);
    };
    b.prototype.clamp = function() {
        for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a; ) --this.t;
    };
    b.prototype.dlShiftTo = function(a, b) {
        var c;
        for (c = this.t - 1; c >= 0; --c) b[c + a] = this[c];
        for (c = a - 1; c >= 0; --c) b[c] = 0;
        b.t = this.t + a;
        b.s = this.s;
    };
    b.prototype.drShiftTo = function(a, b) {
        for (var c = a; c < this.t; ++c) b[c - a] = this[c];
        b.t = Math.max(this.t - a, 0);
        b.s = this.s;
    };
    b.prototype.lShiftTo = function(a, b) {
        var c = a % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
        for (h = this.t - 1; h >= 0; --h) {
            b[h + f + 1] = this[h] >> d | g;
            g = (this[h] & e) << c;
        }
        for (h = f - 1; h >= 0; --h) b[h] = 0;
        b[f] = g;
        b.t = this.t + f + 1;
        b.s = this.s;
        b.clamp();
    };
    b.prototype.rShiftTo = function(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t) b.t = 0; else {
            var d = a % this.DB, e = this.DB - d, f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g) {
                b[g - c - 1] = b[g - c - 1] | (this[g] & f) << e;
                b[g - c] = this[g] >> d;
            }
            d > 0 && (b[this.t - c - 1] = b[this.t - c - 1] | (this.s & f) << e);
            b.t = this.t - c;
            b.clamp();
        }
    };
    b.prototype.subTo = function(a, b) {
        for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e; ) {
            d += this[c] - a[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        if (a.t < this.t) {
            for (d -= a.s; c < this.t; ) {
                d += this[c];
                b[c++] = d & this.DM;
                d >>= this.DB;
            }
            d += this.s;
        } else {
            for (d += this.s; c < a.t; ) {
                d -= a[c];
                b[c++] = d & this.DM;
                d >>= this.DB;
            }
            d -= a.s;
        }
        b.s = d < 0 ? -1 : 0;
        d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
        b.t = c;
        b.clamp();
    };
    b.prototype.multiplyTo = function(a, c) {
        var d = this.abs(), e = a.abs(), f = d.t;
        for (c.t = f + e.t; --f >= 0; ) c[f] = 0;
        for (f = 0; f < e.t; ++f) c[f + d.t] = d.am(0, e[f], c, f, 0, d.t);
        c.s = 0;
        c.clamp();
        this.s != a.s && b.ZERO.subTo(c, c);
    };
    b.prototype.squareTo = function(a) {
        for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0; ) a[c] = 0;
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            if ((a[c + b.t] = a[c + b.t] + b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
                a[c + b.t] = a[c + b.t] - b.DV;
                a[c + b.t + 1] = 1;
            }
        }
        a.t > 0 && (a[a.t - 1] = a[a.t - 1] + b.am(c, b[c], a, 2 * c, 0, 1));
        a.s = 0;
        a.clamp();
    };
    b.prototype.divRemTo = function(a, d, e) {
        var f = a.abs();
        if (!(f.t <= 0)) {
            var g = this.abs();
            if (g.t < f.t) {
                null != d && d.fromInt(0);
                null != e && this.copyTo(e);
            } else {
                null == e && (e = c());
                var h = c(), j = this.s, a = a.s, k = this.DB - i(f[f.t - 1]);
                if (k > 0) {
                    f.lShiftTo(k, h);
                    g.lShiftTo(k, e);
                } else {
                    f.copyTo(h);
                    g.copyTo(e);
                }
                f = h.t;
                g = h[f - 1];
                if (0 != g) {
                    var l = g * (1 << this.F1) + (f > 1 ? h[f - 2] >> this.F2 : 0), m = this.FV / l, l = (1 << this.F1) / l, n = 1 << this.F2, o = e.t, p = o - f, q = null == d ? c() : d;
                    h.dlShiftTo(p, q);
                    if (e.compareTo(q) >= 0) {
                        e[e.t++] = 1;
                        e.subTo(q, e);
                    }
                    b.ONE.dlShiftTo(f, q);
                    for (q.subTo(h, h); h.t < f; ) h[h.t++] = 0;
                    for (;--p >= 0; ) {
                        var r = e[--o] == g ? this.DM : Math.floor(e[o] * m + (e[o - 1] + n) * l);
                        if ((e[o] = e[o] + h.am(0, r, e, p, 0, f)) < r) {
                            h.dlShiftTo(p, q);
                            for (e.subTo(q, e); e[o] < --r; ) e.subTo(q, e);
                        }
                    }
                    if (null != d) {
                        e.drShiftTo(f, d);
                        j != a && b.ZERO.subTo(d, d);
                    }
                    e.t = f;
                    e.clamp();
                    k > 0 && e.rShiftTo(k, e);
                    j < 0 && b.ZERO.subTo(e, e);
                }
            }
        }
    };
    b.prototype.invDigit = function() {
        if (this.t < 1) return 0;
        var a = this[0];
        if (0 == (1 & a)) return 0;
        var b = 3 & a, b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV;
        return b > 0 ? this.DV - b : -b;
    };
    b.prototype.isEven = function() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s);
    };
    b.prototype.exp = function(a, d) {
        if (a > 4294967295 || a < 1) return b.ONE;
        var e = c(), f = c(), g = d.convert(this), h = i(a) - 1;
        for (g.copyTo(e); --h >= 0; ) {
            d.sqrTo(e, f);
            if ((a & 1 << h) > 0) d.mulTo(f, g, e); else var j = e, e = f, f = j;
        }
        return d.revert(e);
    };
    b.prototype.toString = function(a) {
        if (this.s < 0) return "-" + this.negate().toString(a);
        if (16 == a) a = 4; else if (8 == a) a = 3; else if (2 == a) a = 1; else if (32 == a) a = 5; else if (4 == a) a = 2; else return this.toRadix(a);
        var b = (1 << a) - 1, c, d = false, e = "", f = this.t, g = this.DB - f * this.DB % a;
        if (f-- > 0) {
            if (g < this.DB && (c = this[f] >> g) > 0) {
                d = true;
                e = B.charAt(c);
            }
            for (;f >= 0; ) {
                if (g < a) {
                    c = (this[f] & (1 << g) - 1) << a - g;
                    c |= this[--f] >> (g += this.DB - a);
                } else {
                    c = this[f] >> (g -= a) & b;
                    if (g <= 0) {
                        g += this.DB;
                        --f;
                    }
                }
                c > 0 && (d = true);
                d && (e += B.charAt(c));
            }
        }
        return d ? e : "0";
    };
    b.prototype.negate = function() {
        var a = c();
        b.ZERO.subTo(this, a);
        return a;
    };
    b.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this;
    };
    b.prototype.compareTo = function(a) {
        var b = this.s - a.s;
        if (0 != b) return b;
        var c = this.t, b = c - a.t;
        if (0 != b) return this.s < 0 ? -b : b;
        for (;--c >= 0; ) if (0 != (b = this[c] - a[c])) return b;
        return 0;
    };
    b.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + i(this[this.t - 1] ^ this.s & this.DM);
    };
    b.prototype.mod = function(a) {
        var d = c();
        this.abs().divRemTo(a, null, d);
        this.s < 0 && d.compareTo(b.ZERO) > 0 && a.subTo(d, d);
        return d;
    };
    b.prototype.modPowInt = function(a, b) {
        var c;
        c = a < 256 || b.isEven() ? new j(b) : new k(b);
        return this.exp(a, c);
    };
    b.ZERO = h(0);
    b.ONE = h(1);
    p.prototype.convert = q;
    p.prototype.revert = q;
    p.prototype.mulTo = function(a, b, c) {
        a.multiplyTo(b, c);
    };
    p.prototype.sqrTo = function(a, b) {
        a.squareTo(b);
    };
    r.prototype.convert = function(a) {
        if (a.s < 0 || a.t > 2 * this.m.t) return a.mod(this.m);
        if (a.compareTo(this.m) < 0) return a;
        var b = c();
        a.copyTo(b);
        this.reduce(b);
        return b;
    };
    r.prototype.revert = function(a) {
        return a;
    };
    r.prototype.reduce = function(a) {
        a.drShiftTo(this.m.t - 1, this.r2);
        if (a.t > this.m.t + 1) {
            a.t = this.m.t + 1;
            a.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0; ) a.dAddOffset(1, this.m.t + 1);
        for (a.subTo(this.r2, a); a.compareTo(this.m) >= 0; ) a.subTo(this.m, a);
    };
    r.prototype.mulTo = function(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c);
    };
    r.prototype.sqrTo = function(a, b) {
        a.squareTo(b);
        this.reduce(b);
    };
    var E = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997 ], F = 67108864 / E[E.length - 1];
    b.prototype.chunkSize = function(a) {
        return Math.floor(Math.LN2 * this.DB / Math.log(a));
    };
    b.prototype.toRadix = function(a) {
        null == a && (a = 10);
        if (0 == this.signum() || a < 2 || a > 36) return "0";
        var b = this.chunkSize(a), b = Math.pow(a, b), d = h(b), e = c(), f = c(), g = "";
        for (this.divRemTo(d, e, f); e.signum() > 0; ) {
            g = (b + f.intValue()).toString(a).substr(1) + g;
            e.divRemTo(d, e, f);
        }
        return f.intValue().toString(a) + g;
    };
    b.prototype.fromRadix = function(a, c) {
        this.fromInt(0);
        null == c && (c = 10);
        for (var d = this.chunkSize(c), e = Math.pow(c, d), f = false, h = 0, i = 0, j = 0; j < a.length; ++j) {
            var k = g(a, j);
            if (k < 0) "-" == a.charAt(j) && 0 == this.signum() && (f = true); else {
                i = c * i + k;
                if (++h >= d) {
                    this.dMultiply(e);
                    this.dAddOffset(i, 0);
                    i = h = 0;
                }
            }
        }
        if (h > 0) {
            this.dMultiply(Math.pow(c, h));
            this.dAddOffset(i, 0);
        }
        f && b.ZERO.subTo(this, this);
    };
    b.prototype.fromNumber = function(a, c, d) {
        if ("number" == typeof c) if (a < 2) this.fromInt(1); else {
            this.fromNumber(a, d);
            this.testBit(a - 1) || this.bitwiseTo(b.ONE.shiftLeft(a - 1), m, this);
            for (this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(c); ) {
                this.dAddOffset(2, 0);
                this.bitLength() > a && this.subTo(b.ONE.shiftLeft(a - 1), this);
            }
        } else {
            var d = [], e = 7 & a;
            d.length = (a >> 3) + 1;
            c.nextBytes(d);
            d[0] = e > 0 ? d[0] & (1 << e) - 1 : 0;
            this.fromString(d, 256);
        }
    };
    b.prototype.bitwiseTo = function(a, b, c) {
        var d, e, f = Math.min(a.t, this.t);
        for (d = 0; d < f; ++d) c[d] = b(this[d], a[d]);
        if (a.t < this.t) {
            e = a.s & this.DM;
            for (d = f; d < this.t; ++d) c[d] = b(this[d], e);
            c.t = this.t;
        } else {
            e = this.s & this.DM;
            for (d = f; d < a.t; ++d) c[d] = b(e, a[d]);
            c.t = a.t;
        }
        c.s = b(this.s, a.s);
        c.clamp();
    };
    b.prototype.changeBit = function(a, c) {
        var d = b.ONE.shiftLeft(a);
        this.bitwiseTo(d, c, d);
        return d;
    };
    b.prototype.addTo = function(a, b) {
        for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e; ) {
            d += this[c] + a[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        if (a.t < this.t) {
            for (d += a.s; c < this.t; ) {
                d += this[c];
                b[c++] = d & this.DM;
                d >>= this.DB;
            }
            d += this.s;
        } else {
            for (d += this.s; c < a.t; ) {
                d += a[c];
                b[c++] = d & this.DM;
                d >>= this.DB;
            }
            d += a.s;
        }
        b.s = d < 0 ? -1 : 0;
        d > 0 ? b[c++] = d : d < -1 && (b[c++] = this.DV + d);
        b.t = c;
        b.clamp();
    };
    b.prototype.dMultiply = function(a) {
        this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    };
    b.prototype.dAddOffset = function(a, b) {
        if (0 != a) {
            for (;this.t <= b; ) this[this.t++] = 0;
            for (this[b] = this[b] + a; this[b] >= this.DV; ) {
                this[b] = this[b] - this.DV;
                ++b >= this.t && (this[this.t++] = 0);
                ++this[b];
            }
        }
    };
    b.prototype.multiplyLowerTo = function(a, b, c) {
        var d = Math.min(this.t + a.t, b);
        c.s = 0;
        for (c.t = d; d > 0; ) c[--d] = 0;
        var e;
        for (e = c.t - this.t; d < e; ++d) c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
        for (e = Math.min(a.t, b); d < e; ++d) this.am(0, a[d], c, d, 0, b - d);
        c.clamp();
    };
    b.prototype.multiplyUpperTo = function(a, b, c) {
        --b;
        var d = c.t = this.t + a.t - b;
        for (c.s = 0; --d >= 0; ) c[d] = 0;
        for (d = Math.max(b - this.t, 0); d < a.t; ++d) c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
        c.clamp();
        c.drShiftTo(1, c);
    };
    b.prototype.modInt = function(a) {
        if (a <= 0) return 0;
        var b = this.DV % a, c = this.s < 0 ? a - 1 : 0;
        if (this.t > 0) if (0 == b) c = this[0] % a; else for (var d = this.t - 1; d >= 0; --d) c = (b * c + this[d]) % a;
        return c;
    };
    b.prototype.millerRabin = function(a) {
        var d = this.subtract(b.ONE), e = d.getLowestSetBit();
        if (e <= 0) return false;
        var f = d.shiftRight(e), a = a + 1 >> 1;
        if (a > E.length) a = E.length;
        for (var g = c(), h = 0; h < a; ++h) {
            g.fromInt(E[Math.floor(Math.random() * E.length)]);
            var i = g.modPow(f, this);
            if (0 != i.compareTo(b.ONE) && 0 != i.compareTo(d)) {
                for (var j = 1; j++ < e && 0 != i.compareTo(d); ) {
                    i = i.modPowInt(2, this);
                    if (0 == i.compareTo(b.ONE)) return false;
                }
                if (0 != i.compareTo(d)) return false;
            }
        }
        return true;
    };
    b.prototype.clone = function() {
        var a = c();
        this.copyTo(a);
        return a;
    };
    b.prototype.intValue = function() {
        if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1;
        } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0;
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    };
    b.prototype.byteValue = function() {
        return 0 == this.t ? this.s : this[0] << 24 >> 24;
    };
    b.prototype.shortValue = function() {
        return 0 == this.t ? this.s : this[0] << 16 >> 16;
    };
    b.prototype.signum = function() {
        return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1;
    };
    b.prototype.toByteArray = function() {
        var a = this.t, b = [];
        b[0] = this.s;
        var c = this.DB - a * this.DB % 8, d, e = 0;
        if (a-- > 0) {
            if (c < this.DB && (d = this[a] >> c) != (this.s & this.DM) >> c) b[e++] = d | this.s << this.DB - c;
            for (;a >= 0; ) {
                if (c < 8) {
                    d = (this[a] & (1 << c) - 1) << 8 - c;
                    d |= this[--a] >> (c += this.DB - 8);
                } else {
                    d = this[a] >> (c -= 8) & 255;
                    if (c <= 0) {
                        c += this.DB;
                        --a;
                    }
                }
                0 != (128 & d) && (d |= -256);
                0 == e && (128 & this.s) != (128 & d) && ++e;
                if (e > 0 || d != this.s) b[e++] = d;
            }
        }
        return b;
    };
    b.prototype.equals = function(a) {
        return 0 == this.compareTo(a);
    };
    b.prototype.min = function(a) {
        return this.compareTo(a) < 0 ? this : a;
    };
    b.prototype.max = function(a) {
        return this.compareTo(a) > 0 ? this : a;
    };
    b.prototype.and = function(a) {
        var b = c();
        this.bitwiseTo(a, l, b);
        return b;
    };
    b.prototype.or = function(a) {
        var b = c();
        this.bitwiseTo(a, m, b);
        return b;
    };
    b.prototype.xor = function(a) {
        var b = c();
        this.bitwiseTo(a, n, b);
        return b;
    };
    b.prototype.andNot = function(a) {
        var b = c();
        this.bitwiseTo(a, o, b);
        return b;
    };
    b.prototype.not = function() {
        for (var a = c(), b = 0; b < this.t; ++b) a[b] = this.DM & ~this[b];
        a.t = this.t;
        a.s = ~this.s;
        return a;
    };
    b.prototype.shiftLeft = function(a) {
        var b = c();
        a < 0 ? this.rShiftTo(-a, b) : this.lShiftTo(a, b);
        return b;
    };
    b.prototype.shiftRight = function(a) {
        var b = c();
        a < 0 ? this.lShiftTo(-a, b) : this.rShiftTo(a, b);
        return b;
    };
    b.prototype.getLowestSetBit = function() {
        for (var a = 0; a < this.t; ++a) if (0 != this[a]) {
            var b = a * this.DB;
            a = this[a];
            if (0 == a) a = -1; else {
                var c = 0;
                if (0 == (65535 & a)) {
                    a >>= 16;
                    c += 16;
                }
                if (0 == (255 & a)) {
                    a >>= 8;
                    c += 8;
                }
                if (0 == (15 & a)) {
                    a >>= 4;
                    c += 4;
                }
                if (0 == (3 & a)) {
                    a >>= 2;
                    c += 2;
                }
                0 == (1 & a) && ++c;
                a = c;
            }
            return b + a;
        }
        return this.s < 0 ? this.t * this.DB : -1;
    };
    b.prototype.bitCount = function() {
        for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) {
            for (var d = this[c] ^ b, e = 0; 0 != d; ) {
                d &= d - 1;
                ++e;
            }
            a += e;
        }
        return a;
    };
    b.prototype.testBit = function(a) {
        var b = Math.floor(a / this.DB);
        return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB);
    };
    b.prototype.setBit = function(a) {
        return this.changeBit(a, m);
    };
    b.prototype.clearBit = function(a) {
        return this.changeBit(a, o);
    };
    b.prototype.flipBit = function(a) {
        return this.changeBit(a, n);
    };
    b.prototype.add = function(a) {
        var b = c();
        this.addTo(a, b);
        return b;
    };
    b.prototype.subtract = function(a) {
        var b = c();
        this.subTo(a, b);
        return b;
    };
    b.prototype.multiply = function(a) {
        var b = c();
        this.multiplyTo(a, b);
        return b;
    };
    b.prototype.divide = function(a) {
        var b = c();
        this.divRemTo(a, b, null);
        return b;
    };
    b.prototype.remainder = function(a) {
        var b = c();
        this.divRemTo(a, null, b);
        return b;
    };
    b.prototype.divideAndRemainder = function(a) {
        var b = c(), d = c();
        this.divRemTo(a, b, d);
        return [ b, d ];
    };
    b.prototype.modPow = function(a, b) {
        var d = a.bitLength(), e, f = h(1), g;
        if (d <= 0) return f;
        e = d < 18 ? 1 : d < 48 ? 3 : d < 144 ? 4 : d < 768 ? 5 : 6;
        g = d < 8 ? new j(b) : b.isEven() ? new r(b) : new k(b);
        var l = [], m = 3, n = e - 1, o = (1 << e) - 1;
        l[1] = g.convert(this);
        if (e > 1) {
            d = c();
            for (g.sqrTo(l[1], d); m <= o; ) {
                l[m] = c();
                g.mulTo(d, l[m - 2], l[m]);
                m += 2;
            }
        }
        for (var p = a.t - 1, q, s = true, t = c(), d = i(a[p]) - 1; p >= 0; ) {
            if (d >= n) q = a[p] >> d - n & o; else {
                q = (a[p] & (1 << d + 1) - 1) << n - d;
                p > 0 && (q |= a[p - 1] >> this.DB + d - n);
            }
            for (m = e; 0 == (1 & q); ) {
                q >>= 1;
                --m;
            }
            if ((d -= m) < 0) {
                d += this.DB;
                --p;
            }
            if (s) {
                l[q].copyTo(f);
                s = false;
            } else {
                for (;m > 1; ) {
                    g.sqrTo(f, t);
                    g.sqrTo(t, f);
                    m -= 2;
                }
                if (m > 0) g.sqrTo(f, t); else {
                    m = f;
                    f = t;
                    t = m;
                }
                g.mulTo(t, l[q], f);
            }
            for (;p >= 0 && 0 == (a[p] & 1 << d); ) {
                g.sqrTo(f, t);
                m = f;
                f = t;
                t = m;
                if (--d < 0) {
                    d = this.DB - 1;
                    --p;
                }
            }
        }
        return g.revert(f);
    };
    b.prototype.modInverse = function(a) {
        var c = a.isEven();
        if (this.isEven() && c || 0 == a.signum()) return b.ZERO;
        for (var d = a.clone(), e = this.clone(), f = h(1), g = h(0), i = h(0), j = h(1); 0 != d.signum(); ) {
            for (;d.isEven(); ) {
                d.rShiftTo(1, d);
                if (c) {
                    if (!f.isEven() || !g.isEven()) {
                        f.addTo(this, f);
                        g.subTo(a, g);
                    }
                    f.rShiftTo(1, f);
                } else g.isEven() || g.subTo(a, g);
                g.rShiftTo(1, g);
            }
            for (;e.isEven(); ) {
                e.rShiftTo(1, e);
                if (c) {
                    if (!i.isEven() || !j.isEven()) {
                        i.addTo(this, i);
                        j.subTo(a, j);
                    }
                    i.rShiftTo(1, i);
                } else j.isEven() || j.subTo(a, j);
                j.rShiftTo(1, j);
            }
            if (d.compareTo(e) >= 0) {
                d.subTo(e, d);
                c && f.subTo(i, f);
                g.subTo(j, g);
            } else {
                e.subTo(d, e);
                c && i.subTo(f, i);
                j.subTo(g, j);
            }
        }
        if (0 != e.compareTo(b.ONE)) return b.ZERO;
        if (j.compareTo(a) >= 0) return j.subtract(a);
        if (j.signum() < 0) j.addTo(a, j); else return j;
        return j.signum() < 0 ? j.add(a) : j;
    };
    b.prototype.pow = function(a) {
        return this.exp(a, new p());
    };
    b.prototype.gcd = function(a) {
        var b = this.s < 0 ? this.negate() : this.clone(), a = a.s < 0 ? a.negate() : a.clone();
        if (b.compareTo(a) < 0) var c = b, b = a, a = c;
        var c = b.getLowestSetBit(), d = a.getLowestSetBit();
        if (d < 0) return b;
        c < d && (d = c);
        if (d > 0) {
            b.rShiftTo(d, b);
            a.rShiftTo(d, a);
        }
        for (;b.signum() > 0; ) {
            (c = b.getLowestSetBit()) > 0 && b.rShiftTo(c, b);
            (c = a.getLowestSetBit()) > 0 && a.rShiftTo(c, a);
            if (b.compareTo(a) >= 0) {
                b.subTo(a, b);
                b.rShiftTo(1, b);
            } else {
                a.subTo(b, a);
                a.rShiftTo(1, a);
            }
        }
        d > 0 && a.lShiftTo(d, a);
        return a;
    };
    b.prototype.isProbablePrime = function(a) {
        var b, c = this.abs();
        if (1 == c.t && c[0] <= E[E.length - 1]) {
            for (b = 0; b < E.length; ++b) if (c[0] == E[b]) return true;
            return false;
        }
        if (c.isEven()) return false;
        for (b = 1; b < E.length; ) {
            for (var d = E[b], e = b + 1; e < E.length && d < F; ) d *= E[e++];
            for (d = c.modInt(d); b < e; ) if (d % E[b++] == 0) return false;
        }
        return c.millerRabin(a);
    };
    b.prototype.square = function() {
        var a = c();
        this.squareTo(a);
        return a;
    };
    s.prototype.init = function(a) {
        var b, c, d;
        for (b = 0; b < 256; ++b) this.S[b] = b;
        for (b = c = 0; b < 256; ++b) {
            c = c + this.S[b] + a[b % a.length] & 255;
            d = this.S[b];
            this.S[b] = this.S[c];
            this.S[c] = d;
        }
        this.j = this.i = 0;
    };
    s.prototype.next = function() {
        var a;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[a + this.S[this.i] & 255];
    };
    var G, H, I;
    if (null == H) {
        H = [];
        I = 0;
        if (window.crypto && window.crypto.getRandomValues) {
            D = new Uint32Array(256);
            window.crypto.getRandomValues(D);
            for (A = 0; A < D.length; ++A) H[I++] = 255 & D[A];
        }
        var J = function(a) {
            this.count = this.count || 0;
            if (this.count >= 256 || I >= 256) window.removeEventListener ? window.removeEventListener("mousemove", J) : window.detachEvent && window.detachEvent("onmousemove", J); else {
                this.count = this.count + 1;
                a = a.x + a.y;
                H[I++] = 255 & a;
            }
        };
        window.addEventListener ? window.addEventListener("mousemove", J) : window.attachEvent && window.attachEvent("onmousemove", J);
    }
    t.prototype.nextBytes = function(a) {
        var b;
        for (b = 0; b < a.length; ++b) {
            var c = a, d = b, e;
            if (null == G) {
                for (G = new s(); I < 256; ) {
                    e = Math.floor(65536 * Math.random());
                    H[I++] = 255 & e;
                }
                G.init(H);
                for (I = 0; I < H.length; ++I) H[I] = 0;
                I = 0;
            }
            e = G.next();
            c[d] = e;
        }
    };
    w.prototype.doPublic = function(a) {
        return a.modPowInt(this.e, this.n);
    };
    w.prototype.setPublic = function(a, b) {
        if (null != a && null != b && a.length > 0 && b.length > 0) {
            this.n = u(a, 16);
            this.e = parseInt(b, 16);
        } else console.error("Invalid RSA public key");
    };
    w.prototype.encrypt = function(a) {
        var c;
        c = this.n.bitLength() + 7 >> 3;
        if (c < a.length + 11) {
            console.error("Message too long for RSA");
            c = null;
        } else {
            for (var d = [], e = a.length - 1; e >= 0 && c > 0; ) {
                var f = a.charCodeAt(e--);
                if (f < 128) d[--c] = f; else if (f > 127 && f < 2048) {
                    d[--c] = 63 & f | 128;
                    d[--c] = f >> 6 | 192;
                } else {
                    d[--c] = 63 & f | 128;
                    d[--c] = f >> 6 & 63 | 128;
                    d[--c] = f >> 12 | 224;
                }
            }
            d[--c] = 0;
            a = new t();
            for (e = []; c > 2; ) {
                for (e[0] = 0; 0 == e[0]; ) a.nextBytes(e);
                d[--c] = e[0];
            }
            d[--c] = 2;
            d[--c] = 0;
            c = new b(d);
        }
        if (null == c) return null;
        c = this.doPublic(c);
        if (null == c) return null;
        c = c.toString(16);
        return 0 == (1 & c.length) ? c : "0" + c;
    };
    w.prototype.alipayEncrypt = function(a, c, d) {
        for (var a = [ Number(a) ], e = x(c, 32), f = x("", 12), g = x(d, 200), d = this.n.bitLength() + 7 >> 3, c = [], a = a.concat(e).concat(f).concat(g), e = a.length - 1; e >= 0 && d > 0; ) c[--d] = a[e--];
        c[--d] = 0;
        a = new t();
        for (e = []; d > 2; ) {
            for (e[0] = 0; 0 == e[0]; ) a.nextBytes(e);
            c[--d] = e[0];
        }
        c[--d] = 2;
        c[--d] = 0;
        d = new b(c);
        if (null == d) return null;
        d = this.doPublic(d);
        if (null == d) return null;
        d = d.toString(16);
        return 0 == (1 & d.length) ? d : "0" + d;
    };
    w.prototype.doPrivate = function(a) {
        if (null == this.p || null == this.q) return a.modPow(this.d, this.n);
        for (var b = a.mod(this.p).modPow(this.dmp1, this.p), a = a.mod(this.q).modPow(this.dmq1, this.q); b.compareTo(a) < 0; ) b = b.add(this.p);
        return b.subtract(a).multiply(this.coeff).mod(this.p).multiply(this.q).add(a);
    };
    w.prototype.setPrivate = function(a, b, c) {
        if (null != a && null != b && a.length > 0 && b.length > 0) {
            this.n = u(a, 16);
            this.e = parseInt(b, 16);
            this.d = u(c, 16);
        } else console.error("Invalid RSA private key");
    };
    w.prototype.setPrivateEx = function(a, b, c, d, e, f, g, h) {
        if (null != a && null != b && a.length > 0 && b.length > 0) {
            this.n = u(a, 16);
            this.e = parseInt(b, 16);
            this.d = u(c, 16);
            this.p = u(d, 16);
            this.q = u(e, 16);
            this.dmp1 = u(f, 16);
            this.dmq1 = u(g, 16);
            this.coeff = u(h, 16);
        } else console.error("Invalid RSA private key");
    };
    w.prototype.generate = function(a, c) {
        var d = new t(), e = a >> 1;
        this.e = parseInt(c, 16);
        for (var f = new b(c, 16); ;) {
            for (;;) {
                this.p = new b(a - e, 1, d);
                if (0 == this.p.subtract(b.ONE).gcd(f).compareTo(b.ONE) && this.p.isProbablePrime(10)) break;
            }
            for (;;) {
                this.q = new b(e, 1, d);
                if (0 == this.q.subtract(b.ONE).gcd(f).compareTo(b.ONE) && this.q.isProbablePrime(10)) break;
            }
            if (this.p.compareTo(this.q) <= 0) {
                var g = this.p;
                this.p = this.q;
                this.q = g;
            }
            var g = this.p.subtract(b.ONE), h = this.q.subtract(b.ONE), i = g.multiply(h);
            if (0 == i.gcd(f).compareTo(b.ONE)) {
                this.n = this.p.multiply(this.q);
                this.d = f.modInverse(i);
                this.dmp1 = this.d.mod(g);
                this.dmq1 = this.d.mod(h);
                this.coeff = this.q.modInverse(this.p);
                break;
            }
        }
    };
    w.prototype.decrypt = function(a) {
        a = this.doPrivate(u(a, 16));
        if (null == a) a = null; else a: {
            for (var b = this.n.bitLength() + 7 >> 3, a = a.toByteArray(), c = 0; c < a.length && 0 == a[c]; ) ++c;
            if (a.length - c != b - 1 || 2 != a[c]) a = null; else {
                for (++c; 0 != a[c]; ) if (++c >= a.length) {
                    a = null;
                    break a;
                }
                for (b = ""; ++c < a.length; ) {
                    var d = 255 & a[c];
                    if (d < 128) b += String.fromCharCode(d); else if (d > 191 && d < 224) {
                        b += String.fromCharCode((31 & d) << 6 | 63 & a[c + 1]);
                        ++c;
                    } else {
                        b += String.fromCharCode((15 & d) << 12 | (63 & a[c + 1]) << 6 | 63 & a[c + 2]);
                        c += 2;
                    }
                }
                a = b;
            }
        }
        return a;
    };
    !function() {
        w.prototype.generateAsync = function(a, d, e) {
            var f = new t(), g = a >> 1;
            this.e = parseInt(d, 16);
            var h = new b(d, 16), i = this, j = function() {
                var d = function() {
                    if (i.p.compareTo(i.q) <= 0) {
                        var a = i.p;
                        i.p = i.q;
                        i.q = a;
                    }
                    var a = i.p.subtract(b.ONE), c = i.q.subtract(b.ONE), d = a.multiply(c);
                    if (0 == d.gcd(h).compareTo(b.ONE)) {
                        i.n = i.p.multiply(i.q);
                        i.d = h.modInverse(d);
                        i.dmp1 = i.d.mod(a);
                        i.dmq1 = i.d.mod(c);
                        i.coeff = i.q.modInverse(i.p);
                        setTimeout(function() {
                            e();
                        }, 0);
                    } else setTimeout(j, 0);
                }, k = function() {
                    i.q = c();
                    i.q.fromNumberAsync(g, 1, f, function() {
                        i.q.subtract(b.ONE).gcda(h, function(a) {
                            0 == a.compareTo(b.ONE) && i.q.isProbablePrime(10) ? setTimeout(d, 0) : setTimeout(k, 0);
                        });
                    });
                }, l = function() {
                    i.p = c();
                    i.p.fromNumberAsync(a - g, 1, f, function() {
                        i.p.subtract(b.ONE).gcda(h, function(a) {
                            0 == a.compareTo(b.ONE) && i.p.isProbablePrime(10) ? setTimeout(k, 0) : setTimeout(l, 0);
                        });
                    });
                };
                setTimeout(l, 0);
            };
            setTimeout(j, 0);
        };
        b.prototype.gcda = function(a, b) {
            var c = this.s < 0 ? this.negate() : this.clone(), d = a.s < 0 ? a.negate() : a.clone();
            if (c.compareTo(d) < 0) var e = c, c = d, d = e;
            var f = c.getLowestSetBit(), g = d.getLowestSetBit();
            if (g < 0) b(c); else {
                f < g && (g = f);
                if (g > 0) {
                    c.rShiftTo(g, c);
                    d.rShiftTo(g, d);
                }
                var h = function() {
                    (f = c.getLowestSetBit()) > 0 && c.rShiftTo(f, c);
                    (f = d.getLowestSetBit()) > 0 && d.rShiftTo(f, d);
                    if (c.compareTo(d) >= 0) {
                        c.subTo(d, c);
                        c.rShiftTo(1, c);
                    } else {
                        d.subTo(c, d);
                        d.rShiftTo(1, d);
                    }
                    if (c.signum() > 0) setTimeout(h, 0); else {
                        g > 0 && d.lShiftTo(g, d);
                        setTimeout(function() {
                            b(d);
                        }, 0);
                    }
                };
                setTimeout(h, 10);
            }
        };
        b.prototype.fromNumberAsync = function(a, c, d, e) {
            if ("number" == typeof c) if (a < 2) this.fromInt(1); else {
                this.fromNumber(a, d);
                this.testBit(a - 1) || this.bitwiseTo(b.ONE.shiftLeft(a - 1), m, this);
                this.isEven() && this.dAddOffset(1, 0);
                var f = this, g = function() {
                    f.dAddOffset(2, 0);
                    f.bitLength() > a && f.subTo(b.ONE.shiftLeft(a - 1), f);
                    f.isProbablePrime(c) ? setTimeout(function() {
                        e();
                    }, 0) : setTimeout(g, 0);
                };
                setTimeout(g, 0);
            } else {
                var d = [], h = 7 & a;
                d.length = (a >> 3) + 1;
                c.nextBytes(d);
                d[0] = h > 0 ? d[0] & (1 << h) - 1 : 0;
                this.fromString(d, 256);
            }
        };
    }();
    var K = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", L = "=", M = M || {};
    M.env = M.env || {};
    var N = M, O = Object.prototype, P = [ "toString", "valueOf" ];
    M.env.parseUA = function(a) {
        var b = function(a) {
            var b = 0;
            return parseFloat(a.replace(/\./g, function() {
                return 1 == b++ ? "" : ".";
            }));
        }, c = navigator, c = {
            ie: 0,
            opera: 0,
            gecko: 0,
            webkit: 0,
            chrome: 0,
            mobile: null,
            air: 0,
            ipad: 0,
            iphone: 0,
            ipod: 0,
            ios: null,
            android: 0,
            webos: 0,
            caja: c && c.cajaVersion,
            secure: false,
            os: null
        }, a = a || navigator && navigator.userAgent, d = window && window.location, d = d && d.href;
        c.secure = d && 0 === d.toLowerCase().indexOf("https");
        if (a) {
            if (/windows|win32/i.test(a)) c.os = "windows"; else if (/macintosh/i.test(a)) c.os = "macintosh"; else if (/rhino/i.test(a)) c.os = "rhino";
            if (/KHTML/.test(a)) c.webkit = 1;
            if ((d = a.match(/AppleWebKit\/([^\s]*)/)) && d[1]) {
                c.webkit = b(d[1]);
                if (/ Mobile\//.test(a)) {
                    c.mobile = "Apple";
                    (d = a.match(/OS ([^\s]*)/)) && d[1] && (d = b(d[1].replace("_", ".")));
                    c.ios = d;
                    c.ipad = c.ipod = c.iphone = 0;
                    if ((d = a.match(/iPad|iPod|iPhone/)) && d[0]) c[d[0].toLowerCase()] = c.ios;
                } else {
                    if (d = a.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) c.mobile = d[0];
                    if (/webOS/.test(a)) {
                        c.mobile = "WebOS";
                        if ((d = a.match(/webOS\/([^\s]*);/)) && d[1]) c.webos = b(d[1]);
                    }
                    if (/ Android/.test(a)) {
                        c.mobile = "Android";
                        if ((d = a.match(/Android ([^\s]*);/)) && d[1]) c.android = b(d[1]);
                    }
                }
                if ((d = a.match(/Chrome\/([^\s]*)/)) && d[1]) c.chrome = b(d[1]); else if (d = a.match(/AdobeAIR\/([^\s]*)/)) c.air = d[0];
            }
            if (!c.webkit) if ((d = a.match(/Opera[\s\/]([^\s]*)/)) && d[1]) {
                c.opera = b(d[1]);
                if ((d = a.match(/Version\/([^\s]*)/)) && d[1]) c.opera = b(d[1]);
                if (d = a.match(/Opera Mini[^;]*/)) c.mobile = d[0];
            } else if ((d = a.match(/MSIE\s([^;]*)/)) && d[1]) c.ie = b(d[1]); else if (d = a.match(/Gecko\/([^\s]*)/)) {
                c.gecko = 1;
                if ((d = a.match(/rv:([^\s\)]*)/)) && d[1]) c.gecko = b(d[1]);
            }
        }
        return c;
    };
    M.env.ua = M.env.parseUA();
    M.isFunction = function(a) {
        return "function" === typeof a || "[object Function]" === O.toString.apply(a);
    };
    M._IEEnumFix = M.env.ua.ie ? function(a, b) {
        var c, d, e;
        for (c = 0; c < P.length; c += 1) {
            d = P[c];
            e = b[d];
            N.isFunction(e) && e != O[d] && (a[d] = e);
        }
    } : function() {};
    M.extend = function(a, b, c) {
        if (!b || !a) throw Error("extend failed, please check that all dependencies are included.");
        var d = function() {}, e;
        d.prototype = b.prototype;
        a.prototype = new d();
        a.prototype.constructor = a;
        a.superclass = b.prototype;
        if (b.prototype.constructor == O.constructor) b.prototype.constructor = b;
        if (c) {
            for (e in c) N.hasOwnProperty(c, e) && (a.prototype[e] = c[e]);
            N._IEEnumFix(a.prototype, c);
        }
    };
    if ("undefined" == typeof KJUR || !KJUR) KJUR = {};
    if ("undefined" == typeof KJUR.asn1 || !KJUR.asn1) KJUR.asn1 = {};
    KJUR.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(a) {
            a = a.toString(16);
            a.length % 2 == 1 && (a = "0" + a);
            return a;
        };
        this.bigIntToMinTwosComplementsHex = function(a) {
            var c = a.toString(16);
            if ("-" != c.substr(0, 1)) c.length % 2 == 1 ? c = "0" + c : c.match(/^[0-7]/) || (c = "00" + c); else {
                var d = c.substr(1).length;
                d % 2 == 1 ? d += 1 : c.match(/^[0-7]/) || (d += 2);
                for (var c = "", e = 0; e < d; e++) c += "f";
                c = new b(c, 16).xor(a).add(b.ONE).toString(16).replace(/^-/, "");
            }
            return c;
        };
        this.getPEMStringFromHex = function(a, b) {
            var c = CryptoJS.enc.Hex.parse(a), c = CryptoJS.enc.Base64.stringify(c).replace(/(.{64})/g, "$1\r\n"), c = c.replace(/\r\n$/, "");
            return "-----BEGIN " + b + "-----\r\n" + c + "\r\n-----END " + b + "-----\r\n";
        };
    }();
    KJUR.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
            if ("undefined" == typeof this.hV || null == this.hV) throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1) throw "value hex must be even length: n=0,v=" + this.hV;
            var a = this.hV.length / 2, b = a.toString(16);
            b.length % 2 == 1 && (b = "0" + b);
            if (a < 128) return b;
            var c = b.length / 2;
            if (c > 15) throw "ASN.1 length too long to represent by 8x: n = " + a.toString(16);
            return (128 + c).toString(16) + b;
        };
        this.getEncodedHex = function() {
            if (null == this.hTLV || this.isModified) {
                this.hV = this.getFreshValueHex();
                this.hL = this.getLengthHexFromValue();
                this.hTLV = this.hT + this.hL + this.hV;
                this.isModified = false;
            }
            return this.hTLV;
        };
        this.getValueHex = function() {
            this.getEncodedHex();
            return this.hV;
        };
        this.getFreshValueHex = function() {
            return "";
        };
    };
    KJUR.asn1.DERAbstractString = function(a) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        this.getString = function() {
            return this.s;
        };
        this.setString = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.s = a;
            this.hV = stohex(this.s);
        };
        this.setStringHex = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = a;
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
        "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex && this.setStringHex(a.hex));
    };
    M.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractTime = function() {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
        this.localDateToUTC = function(a) {
            utc = a.getTime() + 6e4 * a.getTimezoneOffset();
            return new Date(utc);
        };
        this.formatDate = function(a, b) {
            var c = this.zeroPadding, d = this.localDateToUTC(a), e = "" + d.getFullYear();
            "utc" == b && (e = e.substr(2, 2));
            var f = c("" + (d.getMonth() + 1), 2), g = c("" + d.getDate(), 2), h = c("" + d.getHours(), 2), i = c("" + d.getMinutes(), 2), c = c("" + d.getSeconds(), 2);
            return e + f + g + h + i + c + "Z";
        };
        this.zeroPadding = function(a, b) {
            return a.length >= b ? a : Array(b - a.length + 1).join("0") + a;
        };
        this.getString = function() {
            return this.s;
        };
        this.setString = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.s = a;
            this.hV = stohex(this.s);
        };
        this.setByDateValue = function(a, b, c, d, e, f) {
            this.setByDate(new Date(Date.UTC(a, b - 1, c, d, e, f, 0)));
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
    };
    M.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERAbstractStructured = function(a) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        this.setByASN1ObjectArray = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array = a;
        };
        this.appendASN1Object = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.asn1Array.push(a);
        };
        this.asn1Array = [];
        if ("undefined" != typeof a && "undefined" != typeof a.array) this.asn1Array = a.array;
    };
    M.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBoolean = function() {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
    };
    M.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERInteger = function(a) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a);
        };
        this.setByInteger = function(a) {
            this.setByBigInteger(new b("" + a, 10));
        };
        this.setValueHex = function(a) {
            this.hV = a;
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
        "undefined" != typeof a && ("undefined" != typeof a.bigint ? this.setByBigInteger(a.bigint) : "undefined" != typeof a["int"] ? this.setByInteger(a["int"]) : "undefined" != typeof a.hex && this.setValueHex(a.hex));
    };
    M.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERBitString = function(a) {
        KJUR.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.hV = a;
        };
        this.setUnusedBitsAndHexValue = function(a, b) {
            if (a < 0 || 7 < a) throw "unused bits shall be from 0 to 7: u = " + a;
            this.hTLV = null;
            this.isModified = true;
            this.hV = "0" + a + b;
        };
        this.setByBinaryString = function(a) {
            var a = a.replace(/0+$/, ""), b = 8 - a.length % 8;
            8 == b && (b = 0);
            for (var c = 0; c <= b; c++) a += "0";
            for (var d = "", c = 0; c < a.length - 1; c += 8) {
                var e = a.substr(c, 8), e = parseInt(e, 2).toString(16);
                1 == e.length && (e = "0" + e);
                d += e;
            }
            this.hTLV = null;
            this.isModified = true;
            this.hV = "0" + b + d;
        };
        this.setByBooleanArray = function(a) {
            for (var b = "", c = 0; c < a.length; c++) b = true == a[c] ? b + "1" : b + "0";
            this.setByBinaryString(b);
        };
        this.newFalseArray = function(a) {
            for (var b = Array(a), c = 0; c < a; c++) b[c] = false;
            return b;
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
        "undefined" != typeof a && ("undefined" != typeof a.hex ? this.setHexValueIncludingUnusedBits(a.hex) : "undefined" != typeof a.bin ? this.setByBinaryString(a.bin) : "undefined" != typeof a.array && this.setByBooleanArray(a.array));
    };
    M.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
    KJUR.asn1.DEROctetString = function(a) {
        KJUR.asn1.DEROctetString.superclass.constructor.call(this, a);
        this.hT = "04";
    };
    M.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNull = function() {
        KJUR.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
    };
    M.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERObjectIdentifier = function(a) {
        var c = function(a) {
            a = a.toString(16);
            1 == a.length && (a = "0" + a);
            return a;
        };
        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = a;
        };
        this.setValueOidString = function(a) {
            if (!a.match(/^[0-9.]+$/)) throw "malformed oid string: " + a;
            var d = "", a = a.split("."), e = 40 * parseInt(a[0]) + parseInt(a[1]), d = d + c(e);
            a.splice(0, 2);
            for (e = 0; e < a.length; e++) {
                var f = "", g = new b(a[e], 10).toString(2), h = 7 - g.length % 7;
                7 == h && (h = 0);
                for (var i = "", j = 0; j < h; j++) i += "0";
                g = i + g;
                for (j = 0; j < g.length - 1; j += 7) {
                    h = g.substr(j, 7);
                    j != g.length - 7 && (h = "1" + h);
                    f += c(parseInt(h, 2));
                }
                d += f;
            }
            this.hTLV = null;
            this.isModified = true;
            this.s = null;
            this.hV = d;
        };
        this.setValueName = function(a) {
            if ("undefined" != typeof KJUR.asn1.x509.OID.name2oidList[a]) this.setValueOidString(KJUR.asn1.x509.OID.name2oidList[a]); else throw "DERObjectIdentifier oidName undefined: " + a;
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
        "undefined" != typeof a && ("undefined" != typeof a.oid ? this.setValueOidString(a.oid) : "undefined" != typeof a.hex ? this.setValueHex(a.hex) : "undefined" != typeof a.name && this.setValueName(a.name));
    };
    M.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
    KJUR.asn1.DERUTF8String = function(a) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
        this.hT = "0c";
    };
    M.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERNumericString = function(a) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
        this.hT = "12";
    };
    M.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERPrintableString = function(a) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
        this.hT = "13";
    };
    M.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERTeletexString = function(a) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
        this.hT = "14";
    };
    M.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERIA5String = function(a) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
        this.hT = "16";
    };
    M.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
    KJUR.asn1.DERUTCTime = function(a) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
        this.hT = "17";
        this.setByDate = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.date = a;
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
        };
        "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date));
    };
    M.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERGeneralizedTime = function(a) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
        this.hT = "18";
        this.setByDate = function(a) {
            this.hTLV = null;
            this.isModified = true;
            this.date = a;
            this.s = this.formatDate(this.date, "gen");
            this.hV = stohex(this.s);
        };
        "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date));
    };
    M.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
    KJUR.asn1.DERSequence = function(a) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
        this.hT = "30";
        this.getFreshValueHex = function() {
            for (var a = "", b = 0; b < this.asn1Array.length; b++) a += this.asn1Array[b].getEncodedHex();
            return this.hV = a;
        };
    };
    M.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERSet = function(a) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, a);
        this.hT = "31";
        this.getFreshValueHex = function() {
            for (var a = [], b = 0; b < this.asn1Array.length; b++) a.push(this.asn1Array[b].getEncodedHex());
            a.sort();
            return this.hV = a.join("");
        };
    };
    M.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
    KJUR.asn1.DERTaggedObject = function(a) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = "";
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function(a, b, c) {
            this.hT = b;
            this.isExplicit = a;
            this.asn1Object = c;
            if (this.isExplicit) {
                this.hV = this.asn1Object.getEncodedHex();
                this.hTLV = null;
                this.isModified = true;
            } else {
                this.hV = null;
                this.hTLV = c.getEncodedHex();
                this.hTLV = this.hTLV.replace(/^../, b);
                this.isModified = false;
            }
        };
        this.getFreshValueHex = function() {
            return this.hV;
        };
        if ("undefined" != typeof a) {
            if ("undefined" != typeof a.tag) this.hT = a.tag;
            if ("undefined" != typeof a.explicit) this.isExplicit = a.explicit;
            if ("undefined" != typeof a.obj) {
                this.asn1Object = a.obj;
                this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
            }
        }
    };
    M.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
    !function(a) {
        var b = {}, c;
        b.decode = function(b) {
            var d;
            if (c === a) {
                var e = "0123456789ABCDEF";
                c = [];
                for (d = 0; d < 16; ++d) c[e.charAt(d)] = d;
                e = e.toLowerCase();
                for (d = 10; d < 16; ++d) c[e.charAt(d)] = d;
                for (d = 0; d < 8; ++d) c[" \f\n\r	 \u2028\u2029".charAt(d)] = -1;
            }
            var e = [], f = 0, g = 0;
            for (d = 0; d < b.length; ++d) {
                var h = b.charAt(d);
                if ("=" == h) break;
                h = c[h];
                if (h != -1) {
                    if (h === a) throw "Illegal character at offset " + d;
                    f |= h;
                    if (++g >= 2) {
                        e[e.length] = f;
                        g = f = 0;
                    } else f <<= 4;
                }
            }
            if (g) throw "Hex encoding incomplete: 4 bits missing";
            return e;
        };
        window.Hex = b;
    }();
    !function(a) {
        var b = {}, c;
        b.decode = function(b) {
            var d;
            if (c === a) {
                c = [];
                for (d = 0; d < 64; ++d) c["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d)] = d;
                for (d = 0; d < 9; ++d) c["= \f\n\r	 \u2028\u2029".charAt(d)] = -1;
            }
            var e = [], f = 0, g = 0;
            for (d = 0; d < b.length; ++d) {
                var h = b.charAt(d);
                if ("=" == h) break;
                h = c[h];
                if (h != -1) {
                    if (h === a) throw "Illegal character at offset " + d;
                    f |= h;
                    if (++g >= 4) {
                        e[e.length] = f >> 16;
                        e[e.length] = f >> 8 & 255;
                        e[e.length] = 255 & f;
                        g = f = 0;
                    } else f <<= 6;
                }
            }
            switch (g) {
              case 1:
                throw "Base64 encoding incomplete: at least 2 bits missing";

              case 2:
                e[e.length] = f >> 10;
                break;

              case 3:
                e[e.length] = f >> 16;
                e[e.length] = f >> 8 & 255;
            }
            return e;
        };
        b.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
        b.unarmor = function(a) {
            var c = b.re.exec(a);
            if (c) if (c[1]) a = c[1]; else if (c[2]) a = c[2]; else throw "RegExp out of sync";
            return b.decode(a);
        };
        window.Base64 = b;
    }();
    !function(a) {
        function b(a, c) {
            if (a instanceof b) {
                this.enc = a.enc;
                this.pos = a.pos;
            } else {
                this.enc = a;
                this.pos = c;
            }
        }
        function c(a, b, c, d, e) {
            this.stream = a;
            this.header = b;
            this.length = c;
            this.tag = d;
            this.sub = e;
        }
        var d = {
            tag: function(a, b) {
                var c = document.createElement(a);
                c.className = b;
                return c;
            },
            text: function(a) {
                return document.createTextNode(a);
            }
        };
        b.prototype.get = function(b) {
            b === a && (b = this.pos++);
            if (b >= this.enc.length) throw "Requesting byte offset " + b + " on a stream of length " + this.enc.length;
            return this.enc[b];
        };
        b.prototype.hexDigits = "0123456789ABCDEF";
        b.prototype.hexByte = function(a) {
            return this.hexDigits.charAt(a >> 4 & 15) + this.hexDigits.charAt(15 & a);
        };
        b.prototype.hexDump = function(a, b, c) {
            for (var d = ""; a < b; ++a) {
                d += this.hexByte(this.get(a));
                if (true !== c) switch (15 & a) {
                  case 7:
                    d += "  ";
                    break;

                  case 15:
                    d += "\n";
                    break;

                  default:
                    d += " ";
                }
            }
            return d;
        };
        b.prototype.parseStringISO = function(a, b) {
            for (var c = "", d = a; d < b; ++d) c += String.fromCharCode(this.get(d));
            return c;
        };
        b.prototype.parseStringUTF = function(a, b) {
            for (var c = "", d = a; d < b; ) var e = this.get(d++), c = e < 128 ? c + String.fromCharCode(e) : e > 191 && e < 224 ? c + String.fromCharCode((31 & e) << 6 | 63 & this.get(d++)) : c + String.fromCharCode((15 & e) << 12 | (63 & this.get(d++)) << 6 | 63 & this.get(d++));
            return c;
        };
        b.prototype.parseStringBMP = function(a, b) {
            for (var c = "", d = a; d < b; d += 2) var e = this.get(d), f = this.get(d + 1), c = c + String.fromCharCode((e << 8) + f);
            return c;
        };
        b.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        b.prototype.parseTime = function(a, b) {
            var c = this.parseStringISO(a, b), d = this.reTime.exec(c);
            if (!d) return "Unrecognized time: " + c;
            c = d[1] + "-" + d[2] + "-" + d[3] + " " + d[4];
            if (d[5]) {
                c += ":" + d[5];
                if (d[6]) {
                    c += ":" + d[6];
                    d[7] && (c += "." + d[7]);
                }
            }
            if (d[8]) {
                c += " UTC";
                if ("Z" != d[8]) {
                    c += d[8];
                    d[9] && (c += ":" + d[9]);
                }
            }
            return c;
        };
        b.prototype.parseInteger = function(a, b) {
            var c = b - a;
            if (c > 4) {
                var c = c << 3, d = this.get(a);
                if (0 === d) c -= 8; else for (;d < 128; ) {
                    d <<= 1;
                    --c;
                }
                return "(" + c + " bit)";
            }
            c = 0;
            for (d = a; d < b; ++d) c = c << 8 | this.get(d);
            return c;
        };
        b.prototype.parseBitString = function(a, b) {
            var c = this.get(a), d = (b - a - 1 << 3) - c, e = "(" + d + " bit)";
            if (d <= 20) for (var f = c, e = e + " ", c = b - 1; c > a; --c) {
                for (d = this.get(c); f < 8; ++f) e += d >> f & 1 ? "1" : "0";
                f = 0;
            }
            return e;
        };
        b.prototype.parseOctetString = function(a, b) {
            var c = b - a, d = "(" + c + " byte) ";
            c > 100 && (b = a + 100);
            for (var e = a; e < b; ++e) d += this.hexByte(this.get(e));
            c > 100 && (d += "…");
            return d;
        };
        b.prototype.parseOID = function(a, b) {
            for (var c = "", d = 0, e = 0, f = a; f < b; ++f) {
                var g = this.get(f), d = d << 7 | 127 & g, e = e + 7;
                if (!(128 & g)) {
                    if ("" === c) {
                        c = d < 80 ? d < 40 ? 0 : 1 : 2;
                        c = c + "." + (d - 40 * c);
                    } else c += "." + (e >= 31 ? "bigint" : d);
                    d = e = 0;
                }
            }
            return c;
        };
        c.prototype.typeName = function() {
            if (this.tag === a) return "unknown";
            var b = 31 & this.tag;
            switch (this.tag >> 6) {
              case 0:
                switch (b) {
                  case 0:
                    return "EOC";

                  case 1:
                    return "BOOLEAN";

                  case 2:
                    return "INTEGER";

                  case 3:
                    return "BIT_STRING";

                  case 4:
                    return "OCTET_STRING";

                  case 5:
                    return "NULL";

                  case 6:
                    return "OBJECT_IDENTIFIER";

                  case 7:
                    return "ObjectDescriptor";

                  case 8:
                    return "EXTERNAL";

                  case 9:
                    return "REAL";

                  case 10:
                    return "ENUMERATED";

                  case 11:
                    return "EMBEDDED_PDV";

                  case 12:
                    return "UTF8String";

                  case 16:
                    return "SEQUENCE";

                  case 17:
                    return "SET";

                  case 18:
                    return "NumericString";

                  case 19:
                    return "PrintableString";

                  case 20:
                    return "TeletexString";

                  case 21:
                    return "VideotexString";

                  case 22:
                    return "IA5String";

                  case 23:
                    return "UTCTime";

                  case 24:
                    return "GeneralizedTime";

                  case 25:
                    return "GraphicString";

                  case 26:
                    return "VisibleString";

                  case 27:
                    return "GeneralString";

                  case 28:
                    return "UniversalString";

                  case 30:
                    return "BMPString";

                  default:
                    return "Universal_" + b.toString(16);
                }

              case 1:
                return "Application_" + b.toString(16);

              case 2:
                return "[" + b + "]";

              case 3:
                return "Private_" + b.toString(16);
            }
        };
        c.prototype.reSeemsASCII = /^[ -~]+$/;
        c.prototype.content = function() {
            if (this.tag === a) return null;
            var b = this.tag >> 6, c = 31 & this.tag, d = this.posContent(), e = Math.abs(this.length);
            if (0 !== b) {
                if (null !== this.sub) return "(" + this.sub.length + " elem)";
                b = this.stream.parseStringISO(d, d + Math.min(e, 100));
                return this.reSeemsASCII.test(b) ? b.substring(0, 200) + (b.length > 200 ? "…" : "") : this.stream.parseOctetString(d, d + e);
            }
            switch (c) {
              case 1:
                return 0 === this.stream.get(d) ? "false" : "true";

              case 2:
                return this.stream.parseInteger(d, d + e);

              case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(d, d + e);

              case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(d, d + e);

              case 6:
                return this.stream.parseOID(d, d + e);

              case 16:
              case 17:
                return "(" + this.sub.length + " elem)";

              case 12:
                return this.stream.parseStringUTF(d, d + e);

              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
              case 26:
                return this.stream.parseStringISO(d, d + e);

              case 30:
                return this.stream.parseStringBMP(d, d + e);

              case 23:
              case 24:
                return this.stream.parseTime(d, d + e);
            }
            return null;
        };
        c.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
        };
        c.prototype.print = function(b) {
            b === a && (b = "");
            document.writeln(b + this);
            if (null !== this.sub) for (var b = b + "  ", c = 0, d = this.sub.length; c < d; ++c) this.sub[c].print(b);
        };
        c.prototype.toPrettyString = function(b) {
            b === a && (b = "");
            var c = b + this.typeName() + " @" + this.stream.pos;
            this.length >= 0 && (c += "+");
            c += this.length;
            if (32 & this.tag) c += " (constructed)"; else if ((3 == this.tag || 4 == this.tag) && null !== this.sub) c += " (encapsulates)";
            c += "\n";
            if (null !== this.sub) for (var b = b + "  ", d = 0, e = this.sub.length; d < e; ++d) c += this.sub[d].toPrettyString(b);
            return c;
        };
        c.prototype.toDOM = function() {
            var a = d.tag("div", "node");
            a.asn1 = this;
            var b = d.tag("div", "head"), c = this.typeName().replace(/_/g, " ");
            b.innerHTML = c;
            var e = this.content();
            if (null !== e) {
                e = ("" + e).replace(/</g, "&lt;");
                c = d.tag("span", "preview");
                c.appendChild(d.text(e));
                b.appendChild(c);
            }
            a.appendChild(b);
            this.node = a;
            this.head = b;
            var f = d.tag("div", "value"), c = "Offset: " + this.stream.pos + "<br/>", c = c + ("Length: " + this.header + "+"), c = this.length >= 0 ? c + this.length : c + (-this.length + " (undefined)");
            if (32 & this.tag) c += "<br/>(constructed)"; else if ((3 == this.tag || 4 == this.tag) && null !== this.sub) c += "<br/>(encapsulates)";
            if (null !== e) {
                c += "<br/>Value:<br/><b>" + e + "</b>";
                if ("object" === typeof oids && 6 == this.tag) if (e = oids[e]) {
                    e.d && (c += "<br/>" + e.d);
                    e.c && (c += "<br/>" + e.c);
                    e.w && (c += "<br/>(warning!)");
                }
            }
            f.innerHTML = c;
            a.appendChild(f);
            c = d.tag("div", "sub");
            if (null !== this.sub) {
                e = 0;
                for (f = this.sub.length; e < f; ++e) c.appendChild(this.sub[e].toDOM());
            }
            a.appendChild(c);
            b.onclick = function() {
                a.className = "node collapsed" == a.className ? "node" : "node collapsed";
            };
            return a;
        };
        c.prototype.posStart = function() {
            return this.stream.pos;
        };
        c.prototype.posContent = function() {
            return this.stream.pos + this.header;
        };
        c.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length);
        };
        c.prototype.fakeHover = function(a) {
            this.node.className = this.node.className + " hover";
            if (a) this.head.className = this.head.className + " hover";
        };
        c.prototype.fakeOut = function(a) {
            var b = / ?hover/;
            this.node.className = this.node.className.replace(b, "");
            if (a) this.head.className = this.head.className.replace(b, "");
        };
        c.prototype.toHexDOM_sub = function(a, b, c, e, f) {
            if (!(e >= f)) {
                b = d.tag("span", b);
                b.appendChild(d.text(c.hexDump(e, f)));
                a.appendChild(b);
            }
        };
        c.prototype.toHexDOM = function(b) {
            var c = d.tag("span", "hex");
            b === a && (b = c);
            this.head.hexNode = c;
            this.head.onmouseover = function() {
                this.hexNode.className = "hexCurrent";
            };
            this.head.onmouseout = function() {
                this.hexNode.className = "hex";
            };
            c.asn1 = this;
            c.onmouseover = function() {
                var a = !b.selected;
                if (a) {
                    b.selected = this.asn1;
                    this.className = "hexCurrent";
                }
                this.asn1.fakeHover(a);
            };
            c.onmouseout = function() {
                var a = b.selected == this.asn1;
                this.asn1.fakeOut(a);
                if (a) {
                    b.selected = null;
                    this.className = "hex";
                }
            };
            this.toHexDOM_sub(c, "tag", this.stream, this.posStart(), this.posStart() + 1);
            this.toHexDOM_sub(c, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
            if (null === this.sub) c.appendChild(d.text(this.stream.hexDump(this.posContent(), this.posEnd()))); else if (this.sub.length > 0) {
                var e = this.sub[0], f = this.sub[this.sub.length - 1];
                this.toHexDOM_sub(c, "intro", this.stream, this.posContent(), e.posStart());
                for (var e = 0, g = this.sub.length; e < g; ++e) c.appendChild(this.sub[e].toHexDOM(b));
                this.toHexDOM_sub(c, "outro", this.stream, f.posEnd(), this.posEnd());
            }
            return c;
        };
        c.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        c.decodeLength = function(a) {
            var b = a.get(), c = 127 & b;
            if (c == b) return c;
            if (c > 3) throw "Length over 24 bits not supported at position " + (a.pos - 1);
            if (0 === c) return -1;
            for (var d = b = 0; d < c; ++d) b = b << 8 | a.get();
            return b;
        };
        c.hasContent = function(a, d, e) {
            if (32 & a) return true;
            if (a < 3 || a > 4) return false;
            var f = new b(e);
            3 == a && f.get();
            if (f.get() >> 6 & 1) return false;
            try {
                var g = c.decodeLength(f);
                return f.pos - e.pos + g == d;
            } catch (h) {
                return false;
            }
        };
        c.decode = function(a) {
            a instanceof b || (a = new b(a, 0));
            var d = new b(a), e = a.get(), f = c.decodeLength(a), g = a.pos - d.pos, h = null;
            if (c.hasContent(e, f, a)) {
                var i = a.pos;
                3 == e && a.get();
                h = [];
                if (f >= 0) {
                    for (var j = i + f; a.pos < j; ) h[h.length] = c.decode(a);
                    if (a.pos != j) throw "Content size is not correct for container starting at offset " + i;
                } else try {
                    for (;;) {
                        j = c.decode(a);
                        if (0 === j.tag) break;
                        h[h.length] = j;
                    }
                    f = i - a.pos;
                } catch (k) {
                    throw "Exception while decoding undefined length content: " + k;
                }
            } else a.pos = a.pos + f;
            return new c(d, g, f, e, h);
        };
        c.test = function() {
            for (var a = [ {
                value: [ 39 ],
                expected: 39
            }, {
                value: [ 129, 201 ],
                expected: 201
            }, {
                value: [ 131, 254, 220, 186 ],
                expected: 16702650
            } ], d = 0, e = a.length; d < e; ++d) {
                var f = new b(a[d].value, 0), f = c.decodeLength(f);
                f != a[d].expected && document.write("In test[" + d + "] expected " + a[d].expected + " got " + f + "\n");
            }
        };
        window.ASN1 = c;
    }();
    ASN1.prototype.getHexStringValue = function() {
        var a = 2 * this.header, b = 2 * this.length;
        return this.toHexString().substr(a, b);
    };
    w.prototype.parseKey = function(a) {
        try {
            var b = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(a) ? Hex.decode(a) : Base64.unarmor(a), c = ASN1.decode(b);
            if (9 === c.sub.length) {
                var d = c.sub[1].getHexStringValue();
                this.n = u(d, 16);
                var e = c.sub[2].getHexStringValue();
                this.e = parseInt(e, 16);
                var f = c.sub[3].getHexStringValue();
                this.d = u(f, 16);
                var g = c.sub[4].getHexStringValue();
                this.p = u(g, 16);
                var h = c.sub[5].getHexStringValue();
                this.q = u(h, 16);
                var i = c.sub[6].getHexStringValue();
                this.dmp1 = u(i, 16);
                var j = c.sub[7].getHexStringValue();
                this.dmq1 = u(j, 16);
                var k = c.sub[8].getHexStringValue();
                this.coeff = u(k, 16);
            } else if (2 === c.sub.length) {
                var l = c.sub[1].sub[0], d = l.sub[0].getHexStringValue();
                this.n = u(d, 16);
                e = l.sub[1].getHexStringValue();
                this.e = parseInt(e, 16);
            } else return false;
            return true;
        } catch (m) {
            return false;
        }
    };
    w.prototype.getPrivateBaseKey = function() {
        var a = {
            array: [ new KJUR.asn1.DERInteger({
                "int": 0
            }), new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                "int": this.e
            }), new KJUR.asn1.DERInteger({
                bigint: this.d
            }), new KJUR.asn1.DERInteger({
                bigint: this.p
            }), new KJUR.asn1.DERInteger({
                bigint: this.q
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmp1
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmq1
            }), new KJUR.asn1.DERInteger({
                bigint: this.coeff
            }) ]
        };
        return new KJUR.asn1.DERSequence(a).getEncodedHex();
    };
    w.prototype.getPrivateBaseKeyB64 = function() {
        return y(this.getPrivateBaseKey());
    };
    w.prototype.getPublicBaseKey = function() {
        var a = {
            array: [ new KJUR.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull() ]
        }, b = new KJUR.asn1.DERSequence(a), a = {
            array: [ new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                "int": this.e
            }) ]
        }, a = {
            hex: "00" + new KJUR.asn1.DERSequence(a).getEncodedHex()
        }, a = new KJUR.asn1.DERBitString(a), a = {
            array: [ b, a ]
        };
        return new KJUR.asn1.DERSequence(a).getEncodedHex();
    };
    w.prototype.getPublicBaseKeyB64 = function() {
        return y(this.getPublicBaseKey());
    };
    w.prototype.wordwrap = function(a, b) {
        b = b || 64;
        return !a ? a : a.match(RegExp("(.{1," + b + "})( +|$\n?)|(.{1," + b + "})", "g")).join("\n");
    };
    w.prototype.getPrivateKey = function() {
        var a;
        a = "-----BEGIN RSA PRIVATE KEY-----\n" + (this.wordwrap(this.getPrivateBaseKeyB64()) + "\n");
        return a + "-----END RSA PRIVATE KEY-----";
    };
    w.prototype.getPublicKey = function() {
        var a;
        a = "-----BEGIN PUBLIC KEY-----\n" + (this.wordwrap(this.getPublicBaseKeyB64()) + "\n");
        return a + "-----END PUBLIC KEY-----";
    };
    w.prototype.hasPublicKeyProperty = function(a) {
        a = a || {};
        return a.hasOwnProperty("n") && a.hasOwnProperty("e");
    };
    w.prototype.hasPrivateKeyProperty = function(a) {
        a = a || {};
        return a.hasOwnProperty("n") && a.hasOwnProperty("e") && a.hasOwnProperty("d") && a.hasOwnProperty("p") && a.hasOwnProperty("q") && a.hasOwnProperty("dmp1") && a.hasOwnProperty("dmq1") && a.hasOwnProperty("coeff");
    };
    w.prototype.parsePropertiesFrom = function(a) {
        this.n = a.n;
        this.e = a.e;
        if (a.hasOwnProperty("d")) {
            this.d = a.d;
            this.p = a.p;
            this.q = a.q;
            this.dmp1 = a.dmp1;
            this.dmq1 = a.dmq1;
            this.coeff = a.coeff;
        }
    };
    var Q = function(a) {
        w.call(this);
        a && ("string" === typeof a ? this.parseKey(a) : (this.hasPrivateKeyProperty(a) || this.hasPublicKeyProperty(a)) && this.parsePropertiesFrom(a));
    };
    Q.prototype = new w();
    Q.prototype.constructor = Q;
    M = function(a) {
        a = a || {};
        this.default_key_size = parseInt(a.default_key_size) || 1024;
        this.default_public_exponent = a.default_public_exponent || "010001";
        this.log = a.log || false;
        this.key = null;
    };
    M.prototype.setKey = function(a) {
        this.log && this.key && console.warn("A key was already set, overriding existing.");
        this.key = new Q(a);
    };
    M.prototype.setPrivateKey = function(a) {
        this.setKey(a);
    };
    M.prototype.setPublicKey = function(a) {
        this.setKey(a);
    };
    M.prototype.decrypt = function(a) {
        try {
            return this.getKey().decrypt(z(a));
        } catch (b) {
            return false;
        }
    };
    M.prototype.encrypt = function(a) {
        try {
            return y(this.getKey().encrypt(a));
        } catch (b) {
            return false;
        }
    };
    M.prototype.alipayEncrypt = function(a, b, c) {
        try {
            return y(this.getKey().alipayEncrypt(a, b, c));
        } catch (d) {
            return false;
        }
    };
    M.prototype.getKey = function(a) {
        if (!this.key) {
            this.key = new Q();
            if (a && "[object Function]" === {}.toString.call(a)) {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, a);
                return;
            }
            this.key.generate(this.default_key_size, this.default_public_exponent);
        }
        return this.key;
    };
    M.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey();
    };
    M.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64();
    };
    M.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey();
    };
    M.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64();
    };
    a.JSEncrypt = M;
}(alipay.security.utils);

!function(a) {
    var b = a.Base64, c;
    "undefined" !== typeof module && module.exports && (c = require("buffer").Buffer);
    var d = function(a) {
        for (var b = {}, c = 0, d = a.length; c < d; c++) b[a.charAt(c)] = c;
        return b;
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), e = String.fromCharCode, f = function(a) {
        if (a.length < 2) {
            var b = a.charCodeAt(0);
            return b < 128 ? a : b < 2048 ? e(192 | b >>> 6) + e(128 | 63 & b) : e(224 | b >>> 12 & 15) + e(128 | b >>> 6 & 63) + e(128 | 63 & b);
        }
        b = 65536 + 1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320);
        return e(240 | b >>> 18 & 7) + e(128 | b >>> 12 & 63) + e(128 | b >>> 6 & 63) + e(128 | 63 & b);
    }, g = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, h = function(a) {
        return a.replace(g, f);
    }, i = function(a) {
        var b = [ 0, 2, 1 ][a.length % 3], a = a.charCodeAt(0) << 16 | (a.length > 1 ? a.charCodeAt(1) : 0) << 8 | (a.length > 2 ? a.charCodeAt(2) : 0);
        return [ "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 18), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 12 & 63), b >= 2 ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a >>> 6 & 63), b >= 1 ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & a) ].join("");
    }, j = a.btoa ? function(b) {
        return a.btoa(b);
    } : function(a) {
        return a.replace(/[\s\S]{1,3}/g, i);
    }, k = c ? function(a) {
        return new c(a).toString("base64");
    } : function(a) {
        return j(h(a));
    }, l = function(a, b) {
        return !b ? k(a) : k(a).replace(/[+\/]/g, function(a) {
            return "+" == a ? "-" : "_";
        }).replace(/=/g, "");
    }, m = RegExp("[À-ß][-¿]|[à-ï][-¿]{2}|[ð-÷][-¿]{3}", "g"), n = function(a) {
        switch (a.length) {
          case 4:
            a = ((7 & a.charCodeAt(0)) << 18 | (63 & a.charCodeAt(1)) << 12 | (63 & a.charCodeAt(2)) << 6 | 63 & a.charCodeAt(3)) - 65536;
            return e((a >>> 10) + 55296) + e((1023 & a) + 56320);

          case 3:
            return e((15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2));

          default:
            return e((31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1));
        }
    }, o = function(a) {
        return a.replace(m, n);
    }, p = function(a) {
        var b = a.length, c = b % 4, a = (b > 0 ? d[a.charAt(0)] << 18 : 0) | (b > 1 ? d[a.charAt(1)] << 12 : 0) | (b > 2 ? d[a.charAt(2)] << 6 : 0) | (b > 3 ? d[a.charAt(3)] : 0), a = [ e(a >>> 16), e(a >>> 8 & 255), e(255 & a) ];
        a.length = a.length - [ 0, 0, 2, 1 ][c];
        return a.join("");
    }, q = a.atob ? function(b) {
        return a.atob(b);
    } : function(a) {
        return a.replace(/[\s\S]{1,4}/g, p);
    }, r = c ? function(a) {
        return new c(a, "base64").toString();
    } : function(a) {
        return o(q(a));
    }, s = function(a) {
        return r(a.replace(/[-_]/g, function(a) {
            return "-" == a ? "+" : "/";
        }).replace(/[^A-Za-z0-9\+\/]/g, ""));
    };
    a.Base64 = {
        VERSION: "2.1.2",
        atob: q,
        btoa: j,
        fromBase64: s,
        toBase64: l,
        utob: h,
        encode: l,
        encodeURI: function(a) {
            return l(a, true);
        },
        btou: o,
        decode: s,
        noConflict: function() {
            var c = a.Base64;
            a.Base64 = b;
            return c;
        }
    };
    if ("function" === typeof Object.defineProperty) {
        var t = function(a) {
            return {
                value: a,
                enumerable: false,
                writable: true,
                configurable: true
            };
        };
        a.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", t(function() {
                return s(this);
            }));
            Object.defineProperty(String.prototype, "toBase64", t(function(a) {
                return l(this, a);
            }));
            Object.defineProperty(String.prototype, "toBase64URI", t(function() {
                return l(this, true);
            }));
        };
    }
}(alipay.security.utils);

light.has("/alipay/security/rsainput") || function(a) {
    var b = {};
    a.rsainput = light.deriveFrom(a.base, {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            if (this.element = light.get(this.options.id)) {
                this.element.value = "";
                var b = this;
                light.on(this.element, "keydown", function() {
                    b.result = null;
                });
            } else light.log("error: rsainput element not found");
            light.node(this.element).attr("disabled", !1);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        postInit: function() {
            alipay.security.rsainput.installed = !0;
            this._rsa = new a.utils.JSEncrypt();
            this._rsa.setPublicKey(this.options.PK);
            this._protocolVersion = "2";
            this._TS = a.utils.Base64.decode(this.options.TS);
            var b = this;
            if (this.options.usePcClient) if (this.options.alieditUpgradeVersions) alipay.security.utils.pcClient.askScidAndResult({
                scidServer: this.options.scidServer,
                securityChannelServer: this.options.securityChannelServer,
                securityChannelCommand: this.options.securityChannelCommand,
                syncPollingCount: this.options.syncPollingCount,
                syncPollingInterval: this.options.syncPollingInterval,
                syncPollingCount: this.options.syncPollingCount,
                askScidAndResultTimeout: this.options.askScidAndResultTimeout
            }, function(c) {
                b.options.container = light.get(b.options.container);
                if (!c || "0" != c.code) {
                    a.edit._notInstalled.call(b);
                    a.rsainput.installed = !1;
                    try {
                        alipay.security.updateEdit = !0, alipay.security.sysCallback();
                    } catch (d) {}
                } else if (light.node("input[name=_seaside_gogo_]").val(c.attrs.envData.mac), c = c.attrs.envData.clientVersion.split("."), 
                alieditUpgradeVersions = b.options.alieditUpgradeVersions.split("-"), minVersion = alieditUpgradeVersions[0].split("."), 
                maxVersion = alieditUpgradeVersions[1].split("."), needUpdate = function(a, b, c) {
                    for (var d = 0; 4 > d && !(parseInt(a[d]) > parseInt(b[d])); d++) if (parseInt(a[d]) < parseInt(b[d])) return !1;
                    for (d = 0; 4 > d && !(parseInt(a[d]) < parseInt(c[d])); d++) if (parseInt(a[d]) > parseInt(c[d])) return !1;
                    return !0;
                }, needUpdate(c, minVersion, maxVersion)) {
                    a.edit._notInstalled.call(b);
                    a.rsainput.installed = !1;
                    try {
                        alipay.security.updateEdit = !0, alipay.security.sysCallback();
                    } catch (e) {}
                } else c = light.node(b.options.container).find("input"), c.attr("readonly", !1), 
                c.attr("readOnly", !1);
            }); else {
                var c = light.node("#" + b.options.container).find("input");
                c.attr("readonly", !1);
                c.attr("readOnly", !1);
                alipay.security.utils.pcClient.askScid({
                    scidServer: this.options.scidServer,
                    securityChannelCommand: this.options.securityChannelCommand
                });
            } else if (this.options.useExtension) {
                var d = alipay.security.utils.chromeExtension;
                d.checkExtension(function(a) {
                    a ? d.checkControl(function(a) {
                        a ? (b.setMacInfo(), b.options.alieditUpgradeVersions ? d.execute({
                            command: "version"
                        }, function(a) {
                            if (a && a.version) {
                                var c = b.options.alieditUpgradeVersions.split("-"), a = a.version.split("."), d = c[0].split("."), c = c[1].split(".");
                                b.isInRange(a, d, c) ? b.showInstallExtensionMask(!0) : (c = light.node("#" + b.options.container).find("input"), 
                                c.attr("readonly", !1), c.attr("readOnly", !1));
                            } else c = light.node("#" + b.options.container).find("input"), c.attr("readonly", !1), 
                            c.attr("readOnly", !1);
                        }) : (a = light.node("#" + b.options.container).find("input"), a.attr("readonly", !1), 
                        a.attr("readOnly", !1))) : b.showInstallExtensionMask(!!b.options.alieditUpgradeVersions);
                    }) : b.showInstallExtensionMask(!!b.options.alieditUpgradeVersions, b.options.useSilentInstallation);
                });
            } else c = light.node("#" + b.options.container).find("input"), c.attr("readonly", !1), 
            c.attr("readOnly", !1);
            this.options.useKS && alipay.security.utils.keyseq.start(this.options.id);
        },
        isInRange: function(a, b, c) {
            for (var d = 0; 4 > d && !(parseInt(a[d]) > parseInt(b[d])); d++) if (parseInt(a[d]) < parseInt(b[d])) return !1;
            for (d = 0; 4 > d && !(parseInt(a[d]) < parseInt(c[d])); d++) if (parseInt(a[d]) > parseInt(c[d])) return !1;
            return !0;
        },
        setMacInfo: function() {
            var a = alipay.security.utils.chromeExtension;
            a.execute({
                command: "mac"
            }, function(a) {
                a && a.mac ? ((/XOR_1_0{30}_/.test(a.mac) || 344 === a.mac.length) && light.node("input[name=_seaside_gogo_]").val(a.mac), 
                light.track("auth-ex-mac-ok")) : light.track("auth-ex-mac-err");
            });
            a.checkControl(function(a) {
                a && light.node("input[name=security_chrome_extension_alicert_installed]").val("true");
            }, "alicert");
            light.node("input[name=security_chrome_extension_aliedit_installed]").val("true");
        },
        showInstallExtensionMask: function(b, c) {
            function d() {
                h ? window.open(i, "_blank") : new light.dialog({
                    targetFrame: j,
                    iframeSrc: i + "&_xbox=true"
                }).show();
                p || (p = !0, alipay.security.utils.chromeExtension.pollCheckControll(function() {
                    p = !1;
                    o.style.display = "none";
                    g.firstElementChild.style.display = "";
                    var b = light.node("#" + e.options.container).find("input");
                    b.attr("readonly", !1);
                    b.attr("readOnly", !1);
                    e.setMacInfo();
                    a.rsainput.installed = !0;
                }, "aliedit", e.options.alieditUpgradeVersions));
            }
            var e = this;
            a.rsainput.installed = !1;
            try {
                alipay.security.updateEdit = !0, alipay.security.sysCallback();
            } catch (f) {}
            var g = document.getElementById(this.options.container), h = !1, i = alipay.security.securityCenterServer + "/sc/chrome/extensionInstallDialog.htm", j = document, i = i + ("?version=" + (b ? "beta" : "stable"));
            e.options.alieditUpgradeVersions && (i += "&upgrade=" + e.options.alieditUpgradeVersions);
            c && (i = alipay.security.npedit.info.installationPage + "?version=beta");
            try {
                if (window.top.document.body) {
                    var j = window.top.document, k = (light.debug ? "http://assets.dev.alipay.net" : "https://a.alipayobjects.com") + ("/al/alice.components.security-edit-1.4" + (light.debug ? "-src" : "") + ".css"), l = j.head || j.getElementsByTagName("head")[0] || j.documentElement, m = j.createElement("link");
                    m.setAttribute("charset", "utf-8");
                    m.setAttribute("rel", "stylesheet");
                    m.setAttribute("href", k);
                    l.appendChild(m);
                }
            } catch (n) {
                h = !0;
            }
            var o = document.createElement("a");
            o.setAttribute("href", i);
            o.setAttribute("target", "_blank");
            o.className = "aliedit-install";
            o.innerHTML = "请点此安装控件";
            g.firstElementChild.style.display = "none";
            g.appendChild(o);
            var p = !1;
            o.addEventListener("click", function(a) {
                d();
                a.preventDefault();
            }, !1);
            alipay.security.edit.detect = function() {
                d();
            };
        },
        getInfo: function() {
            return "";
        },
        getCi1: function() {
            return "";
        },
        getCi2: function() {
            return "";
        },
        getVersion: function() {
            return "";
        },
        getKeySeq: function() {
            if (this.options.useKS) {
                var a = '{"type":"js", "in":"' + alipay.security.utils.keyseq.get(this.options.id) + '"}';
                return alipay.security.utils.Base64.encode(alipay.security.utils.keyseq.ksk(this.options.ksk, a));
            }
            return null;
        },
        getPassword: function() {
            if (!this.result) {
                var a = this.element.value;
                if (a) {
                    var c = this._protocolVersion + this._TS + a;
                    this.result = b[c] || (b[c] = this._rsa.alipayEncrypt(this._protocolVersion, this._TS, a));
                } else this.result = "";
                var d = this.result, e = this.element.value;
                this.element.value = "";
                var f = this;
                setTimeout(function() {
                    light.get(f.options.hidnId).value != d && (f.element.value = e, f.result = null);
                });
                setTimeout(function() {
                    f.result = null;
                }, 3e3);
            }
            return this.result;
        }
    }, {
        Name: "rsainput",
        installed: !1
    });
}(alipay.security);

light.has("/alipay/security/utils/pcClient") || function(a) {
    light.has("/alipay/security/utils") || (alipay.security.utils = {});
    var b = function(a, b) {
        var c = 1, d = function() {
            var e = this;
            light.request(a.securityChannelServer, {}, {
                format: "jsonp",
                success: function(f) {
                    if (!a.timeoutFlag1) {
                        c++;
                        if (c > (a.syncPollingCount || 3)) {
                            a.timeoutFlag2 = true;
                            b && b.call(this, "");
                        } else if (f && "001005" == f.code) setTimeout(function() {
                            d.call(e);
                        }, a.syncPollingInterval || 500); else {
                            a.timeoutFlag2 = true;
                            b && b.call(this, f);
                        }
                    }
                }
            });
        };
        d.call(this);
    }, c = {
        askScid: function(a, b) {
            var c = false, d = false;
            if (a.securityChannelCommand) a.scidServer = a.scidServer + "?" + a.securityChannelCommand;
            light.request(a.scidServer, {}, {
                format: "jsonp",
                success: function(a) {
                    if (!c) {
                        d = true;
                        b && b.call(this, a);
                        light.node("input[name=scid]").val(a.attrs.scid);
                    }
                },
                fail: function() {
                    b && b.call(this, "");
                }
            });
            setTimeout(function() {
                if (!d) {
                    c = true;
                    b && b.call(this, "");
                }
            }, a.askScidTimeout || 5e3);
        },
        askScidAndResult: function(a, c) {
            a.timeoutFlag1 = false;
            a.timeoutFlag2 = false;
            if (a.securityChannelCommand) a.scidServer = a.scidServer + "?" + a.securityChannelCommand;
            light.request(a.scidServer, {}, {
                format: "jsonp",
                success: function(d) {
                    if (!a.timeoutFlag1) {
                        a.askScidAndResultTimeout = a.askScidAndResultTimeout || 5e3;
                        light.node("input[name=scid]").val(d.attrs.scid);
                        a.securityChannelServer = a.securityChannelServer + "?" + (d.attrs && d.attrs.nextCmd);
                        b(a, c);
                    }
                },
                fail: function() {
                    c && c.call(this, "");
                }
            });
            setTimeout(function() {
                if (!a.timeoutFlag2) {
                    a.timeoutFlag1 = true;
                    c && c.call(this, "");
                }
            }, a.askScidAndResultTimeout || 5e3);
        },
        sendScRequest: function(a, b) {
            if (a) {
                var c = new Image();
                c.src = a + "/api/doNotSign.htm?serviceId=trackCmd&version=1&data=" + encodeURIComponent(alipay.security.utils.Base64.encode('{"from":"web","timestamp":' + parseInt(b) + "}"));
                window["pcclient_" + new Date().getTime().toString(16)] = c;
            }
        }
    }, c = a.utils.pcClient = light.deriveFrom(a.base, {}, c);
}(window.alipay.security);

light.has("/alipay/security/cdo") || function(a) {
    var b = alipay.security.downloadServer, c = function() {
        var a = light.client.info;
        return {
            Name: "cert.cdo",
            defaultMethod: "Do",
            info: {
                activex: "AliCertDO.AliCertDOCtrl",
                plugin: "npalicdo plugin",
                classId: "08d512d2-7d97-4e22-b7db-82791106c086",
                type: "application/npalicdo",
                version: "1.0.0.1",
                codebase: b + "/ukey/cf/alicert.cab",
                downloadUrl: a.os.windows ? b + "/ukey/cf/alicert.exe" : b + "/sec/cert/alicert.dmg"
            },
            template: a.engine.trident ? '<object id="{id}" type="{type}" classid="clsid:{classId}" codebase="{codebase}" width="0" height="0"></object>' : '<object id="{id}" type="{type}" width="0" height="0"></object>',
            message: {
                "0": "您需要重新安装数字证书控件",
                1: "操作系统或浏览器不支持",
                2: "插件没有安装",
                "5001-10000": "您的运行环境配置不正确",
                "10001-11000": "控件运行错误",
                "11001-12000": "调用参数错误"
            },
            available: !!(a.os.windows || a.os.macos && 6 < a.os.macos[1]),
            actions: {
                restore: "custom"
            },
            defaults: {
                msgMode: "dialog"
            },
            handlers: {
                12004: light.noop
            },
            updateQueryInterval: 1e3,
            updateHandler: null,
            properties: {
                handlers: {}
            }
        };
    }(), c = a.cdo = light.deriveFrom(a.base, {
        execute: function(a, b) {
            var d = null;
            if (a) {
                if ("object" === typeof a ? (d = a.service, a = light.param(a)) : d = light.unparam(a).service, 
                d) {
                    light.log("Calling %s: %s.", d, a);
                    var e = "";
                    try {
                        e = this.element.Do(a);
                    } catch (f) {
                        light.log("Exception thrown from %s: %s.", d, g.rawData);
                        this.catchError(d, f);
                        return;
                    }
                    var g = e ? light.unparam(e) : {};
                    g.rawData = e || "";
                    g.api = d;
                    var h = g.status = parseInt(g.status, 10);
                    isNaN(h) && (h = -1);
                    light.log("Result from %s: (%d) %s.", d, h, e);
                    if (h) {
                        var i = this;
                        101 <= h && 1e3 > h ? (!this.backupCmd && "update" != d && (this.backupCmd = {
                            command: a,
                            callback: b
                        }), function() {
                            c.updateHandler && c.updateHandler.call(i, true, g.message);
                            setTimeout(function() {
                                i.execute(g.rawData);
                            }, c.updateQueryInterval);
                        }()) : (this.catchError(d, g, !0), g.msg = this.getMessage(h), (d = !h ? null : this.handlers[h] || this.handlers["*"] || this.__type.handlers[h] || this.__type.handlers["*"]) ? d.call(this, g) : this.showMessage(g));
                    } else this.backupCmd ? (c.updateHandler && c.updateHandler.call(this, !1), d = this.backupCmd, 
                    delete this.backupCmd, light.log("Call previous command, see next log."), this.execute(d.command, d.callback)) : b && b.call(this, g);
                } else if (light.debug) throw "Invalid command passed";
            } else if (light.debug) throw "Empty command passed";
        },
        send: function(a, b, c) {
            b = b || {};
            b.service = a;
            b.version = 1;
            this.execute(b, c);
        }
    }, c);
    a.refreshStatus(c);
}(alipay.security);

light.has("/alipay/security/enroll") || function(a) {
    var b = alipay.security.downloadServer, c = light.client.info, b = {
        activex: "Itrusenroll.CertEnroll",
        plugin: "iTrusChina iTrusPTA,XEnroll,iEnroll,hwPTA,UKeyInstalls Firefox Plugin",
        classId: "7978461C-CC22-48F2-BC69-02220D3E101D",
        type: "application/Itrusenroll.CertEnroll.Version.1",
        version: "1.0.0.1",
        codebase: b + "/ukey/cert/1007/ie/PTA.cab",
        downloadUrl: b + "/ukey/cert/1007/ie/iTrusPTA.exe"
    }, d = c.engine.trident ? '<object id="{id}" type="{type}" classid="clsid:{classId}" codebase="{codebase}" width="0" height="0"></object>' : '<object id="{id}" type="{type}" width="0" height="0"></object>';
    availableObj = {
        os: !!c.os.windows,
        browser: !!c.engine.trident || !!c.browser.firefox || !!c.browser.chrome
    };
    a.enroll = light.deriveFrom(a.base, {}, {
        Name: "cert.enroll",
        defaultMethod: "Version",
        info: b,
        template: d,
        message: null,
        availableObj: availableObj,
        available: availableObj.os && availableObj.browser
    });
    a.refreshStatus(a.enroll);
}(alipay.security);

light.has("/alipay/security/pta") || function(a) {
    var b = alipay.security.downloadServer, c = light.client.info, d = function() {
        var a = {
            os: !!c.os.windows,
            browser: !(!c.engine.trident && !c.browser.firefox && !c.browser.chrome)
        };
        return {
            Name: "cert.pta",
            defaultMethod: "Version",
            info: {
                activex: "PTA.iTrusPTA",
                plugin: "iTrusChina iTrusPTA,XEnroll,iEnroll,hwPTA,UKeyInstalls Firefox Plugin",
                classId: "1e0dffcf-27ff-4574-849b-55007349feda",
                type: "application/PTA.iTrusPTA.Version.1",
                version: "1.0.0.1",
                codebase: b + "/ukey/cert/1007/ie/PTA.cab",
                downloadUrl: c.engine.trident ? b + "/ukey/cert/1007/ie/iTrusPTA.exe?t=20110907.exe" : b + "/ukey/cert/1007/ff/iTrusPTA_f_c.exe?t=20110714.exe"
            },
            template: c.engine.trident ? '<object id="{id}" type="{type}" classid="clsid:{classId}" codebase="{codebase}" width="0" height="0"></object>' : '<object id="{id}" type="{type}" width="0" height="0"></object>',
            message: {
                "-2147483135": "用户取消操作",
                "-2146434962": "用户取消操作"
            },
            handlers: {},
            availableObj: a,
            available: a.os && a.browser,
            properties: {
                handlers: {}
            }
        };
    }();
    a.pta = light.deriveFrom(a.base, {
        getCerts: function(a, b, c) {
            if (!a && !b && !c) return null;
            try {
                var d = this.api("Filter");
                if (!d) return null;
                d.Clear();
                a && (8 < parseInt(a.substr(0, 1), 16) && (a = "00" + a), d.SerialNumber = a);
                b && (d.Issuer = b);
                c && (d.Subject = c);
                return this.api("MyCertificates");
            } catch (e) {
                this.catchError("filter", e);
            }
            return null;
        },
        getCert: function(a, b, c) {
            a = this.getCerts(a, b, c);
            b = null;
            a && a.Count && (b = a(0));
            return b;
        },
        getCertByBlurSearch: function(a, b, c, d) {
            if (a = this.getCert(a, b) || this.getCert(a)) return a;
            if (!d) return null;
            certs = this.getCerts("", b);
            for (b = 0; b < certs.Count; b++) if (-1 != certs(b).Subject.indexOf(d)) return certs(b);
            return null;
        },
        sign: function(a, b, c, d, e) {
            if (!a) throw "invalid param";
            b = this.getCertByBlurSearch(b, c, d, e);
            if (!b) return "";
            try {
                return b.SignLogonData(a, 4);
            } catch (f) {
                (a = !f.number ? null : this.handlers[f.number] || this.handlers["*"] || this.__type.handlers[f.number] || this.__type.handlers["*"]) && a.call(this, f), 
                this.catchError("sign", f);
            }
            return "";
        }
    }, d);
    a.refreshStatus(a.pta);
}(alipay.security);

light.has("/alipay/security/hwpta") || function(a) {
    var b = alipay.security.downloadServer, c = light.client.info, d = function() {
        var a = {
            activex: "HwPTA.iTrusHwPTA",
            classId: "EF7BC8AC-5BDC-4AED-AD63-A9B3AE7A768C",
            version: "1,1,0,14",
            codebase: b + "/ukey/hwPTA.cab",
            downloadUrl: b + "/ukey/cert/1007/ie/iTrusPTA.exe?t=20110907.exe",
            driverUrls: {}
        }, d = {
            os: !!c.os.windows,
            browser: !!c.engine.trident
        };
        a.driverUrls["Watchdata AliPay CSP v3.3"] = b + "/ukey/0818/hwWDkey.exe";
        a.driverUrls["EnterSafe ePass2001 for TWCX CSP v1.0"] = b + "/ukey/0818/hwEpass2001.exe";
        a.driverUrls["HaiTai Cryptographic Service Provider"] = b + "/ukey/0818/hwHaikey.exe";
        return {
            Name: "ukey.pta",
            defaultMethod: "DetectKeys",
            info: a,
            template: '<object id="{id}" type="{type}" classid="clsid:{classId}" codebase="{codebase}" width="0" height="0"></object>',
            message: null,
            availableObj: d,
            available: d.os && d.browser
        };
    }();
    a.hwpta = light.deriveFrom(a.base, {
        checkDriver: function() {
            try {
                return this.element.checkCSP(0);
            } catch (a) {
                this.catchError("checkDriver", a);
            }
            return !1;
        },
        getKeyNum: function() {
            try {
                return this.element.DetectKeys();
            } catch (a) {
                this.catchError("getKeyNum", a);
            }
            return 0;
        },
        getDriverName: function(a) {
            try {
                return this.element.GetKeyCSPName(a || 0);
            } catch (b) {
                this.catchError("getDriverName", b);
            }
            return "";
        },
        getDriverUrl: function() {
            var a = d.info.driverUrls, b = this.getDriverName(), c;
            for (c in a) if (b == c) return a[c];
            return "";
        },
        deleteCert: function(a, b) {
            try {
                return this.element.deleteCertificateByUserID(a, b);
            } catch (c) {
                this.catchError("deleteCert", c);
            }
            return !1;
        },
        importAdminPIN: function(a, b) {
            try {
                return this.element.importAdminPIN(a, b);
            } catch (c) {
                this.catchError("importAdminPIN", c);
            }
            return 0;
        },
        exportTempPubkey: function() {
            try {
                return this.element.exportTempPubkey();
            } catch (a) {
                this.catchError("exportTempPubkey", a);
            }
            return "";
        }
    }, d);
    a.refreshStatus(a.hwpta);
}(alipay.security);

light.has("/alipay/security/otp") || function(a) {
    members = {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                otpPassword: this.element.value
            };
        }
    };
    a.otp = light.deriveFrom(a.base, members, {
        Name: "otp"
    });
}(alipay.security);

light.has("/alipay/security/mobile") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("mobileSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "mobile",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: []
    };
    d = a.register("/alipay/security/mobile", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("mobileSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var f = this, g = this.options, c = {}, b = b || g.defaultType;
            g.requestBefore && g.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.validateProductName = this.options.productName;
            a.request(g.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("mobileSendTime", new Date().getTime()) : a.client.storage.set("mobileSendTime", -1);
                        } catch (d) {}
                        f.sendSuccess(b);
                    } else f.showError(c.info);
                    if (e[b].interval <= 0) e[b].interval = 120;
                    var h = setInterval(function() {
                        e[b].interval--;
                        e[b].interval <= 0 && clearInterval(h);
                    }, 1e3);
                    g.requestAfter && f.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/credibleMobile") || function(a) {
    try {
        window == window.parent && a.client.storage.set("credibleMobileSendTime", -1);
    } catch (b) {}
    var c = function() {
        this.init.apply(this, arguments);
        this.bind();
    };
    c.prototype = {
        _cg: {
            item: "ui-form-item",
            itemSuccess: "ui-form-item-success",
            itemError: "ui-form-item-error",
            itemExp: "ui-form-explain"
        },
        init: function(b) {
            b = this.opt = b;
            b.dataId = b.id + new Date().getTime() + Math.floor(1e3 * Math.random());
            a.node("[id=" + b.id + "]:not([data-id])").attr("data-id", b.dataId);
            this.opt.uniqElement = a.node("[data-id=" + b.dataId + "]")[0];
            this.element = this.opt.uniqElement;
            this.container = a.node(this.element).parent("." + this._cg.item);
            this.validateBtn = this.container.find(".validate-btn");
            this.itemExp = this.container.find("." + this._cg.itemExp);
            this.preExp = this.itemExp.html() || "";
            this.opt.mobile ? (this.opt.mobile.origin = "credible", this.opt.mobile.credibleValidate = !1, 
            this.opt.mobile.credibleMobile = this) : a.log("Mobile did not start.");
        },
        bind: function() {
            var b = this;
            this.validateBtn.click(function() {
                b.validateNum();
            });
            a.node(this.element).focus(function() {
                b.showDefault();
            });
        },
        validateNum: function() {
            var a = this.element.value;
            0 === a.replace(/[^\x00-\xff]/g, "**").length ? this.showError({
                msg: "请输入手机号码。"
            }) : /\d{11}/.test(a) ? this.request() : this.showError({
                msg: "手机号码有误。"
            });
        },
        request: function() {
            var b = this, c = a.trim(this.element.value), d = {};
            if (window != window.parent) {
                var e = new Date().getTime(), f = Number(a.client.storage.get("credibleMobileSendTime")), g = a.client.storage.get("credibleMobileNo");
                if (c == g && 0 > e - f) {
                    this.validateNumSuc({
                        info: {
                            validated: !0
                        }
                    });
                    return;
                }
            }
            d.inputMobileNo = c;
            d.securityId = a.node(this.opt.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            d.validateProductName = "ctu_mobile";
            a.request(this.opt.ajaxUrl, d, {
                method: "JSONP",
                success: function(d) {
                    if (d.info.validated) try {
                        window != window.parent ? (a.client.storage.set("credibleMobileSendTime", new Date().getTime()), 
                        a.client.storage.set("credibleMobileNo", c)) : a.client.storage.set("credibleMobileSendTime", -1);
                    } catch (e) {}
                    b.validateNumSuc(d);
                }
            });
        },
        validateNumSuc: function(b) {
            b.info.validated ? (this.container.find(".ui-form-explain").addClass("fn-hide"), 
            this.container.find(".ui-form-field").addClass("ui-form-text").html(this.element.value), 
            this.container.addClass(this._cg.itemSuccess), a.node(".mobile-section .ui-form-item-counter").removeClass("fn-hide"), 
            this.opt.mobile ? (this.opt.mobile.credibleValidate = !0, this.opt.mobile.inputMobileNo = a.trim(this.element.value), 
            this.opt.mobile.sendSuccess()) : a.log("Mobile did not start.")) : this.error(b);
        },
        error: function(a) {
            var a = a.info, b = "";
            5 <= a.errorCount && this.validateBtn.addClass("ui-checkcode-messagecode-disabled-btn").attr("disabled", !0);
            b = b || a.errorMessage;
            this.showError({
                code: a.errorCode,
                msg: b
            });
        },
        showError: function(a) {
            this.itemExp.html(a.msg);
            this.container.addClass(this._cg.itemError);
        },
        showDefault: function() {
            this.itemExp.html(this.preExp);
            this.container.removeClass(this._cg.itemError);
        }
    };
    a.register("/alipay/security/credibleMobile", window, c);
}(window.light);

light.has("/alipay/security/ctuMobile") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("ctuMobileSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "ctuMobile",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: []
    };
    d = a.register("/alipay/security/ctuMobile", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("ctuMobileSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var f = this, g = this.options, c = {}, b = b || g.defaultType;
            g.requestBefore && g.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.validateProductName = "ctu_mobile";
            a.request(g.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("ctuMobileSendTime", new Date().getTime()) : a.client.storage.set("ctuMobileSendTime", -1);
                        } catch (d) {}
                        f.sendSuccess(b);
                    } else f.showError(c.info);
                    if (e[b].interval <= 0) e[b].interval = 120;
                    var h = setInterval(function() {
                        e[b].interval--;
                        e[b].interval <= 0 && clearInterval(h);
                    }, 1e3);
                    g.requestAfter && f.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/riskMobileBank") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("riskMobileBankSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "riskMobileBank",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: []
    };
    d = a.register("/alipay/security/riskMobileBank", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("riskMobileBankSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var e = this, f = this.options, c = {}, b = b || f.defaultType;
            f.requestBefore && f.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.validateProductName = "risk_mobile_bank";
            a.request(f.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("riskMobileBankSendTime", new Date().getTime()) : a.client.storage.set("riskMobileBankSendTime", -1);
                        } catch (d) {}
                        e.sendSuccess(b);
                    } else e.showError(c.info);
                    f.requestAfter && e.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/riskMobileAccount") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("riskMobileAccoutSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "riskMobileAccount",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: []
    };
    d = a.register("/alipay/security/riskMobileAccount", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("riskMobileAccoutSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var e = this, f = this.options, c = {}, b = b || f.defaultType;
            f.requestBefore && f.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.validateProductName = "risk_mobile_account";
            a.request(f.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("riskMobileAccoutSendTime", new Date().getTime()) : a.client.storage.set("riskMobileAccoutSendTime", -1);
                        } catch (d) {}
                        e.sendSuccess(b);
                    } else e.showError(c.info);
                    f.requestAfter && e.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/riskMobileCredit") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("riskMobileCreditSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "riskMobileCredit",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: [],
        count: !0
    };
    d = a.register("/alipay/security/riskMobileCredit", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- && b.riskCredibleMobile.expand ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("riskMobileCreditSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var e = this, f = this.options, c = {}, b = b || f.defaultType;
            f.requestBefore && f.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.creditMobileIndex = this.riskCredibleMobile.element.value;
            c.validateProductName = "risk_mobile_credit";
            a.request(f.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("riskMobileCreditSendTime", new Date().getTime()) : a.client.storage.set("riskMobileCreditSendTime", -1);
                        } catch (d) {}
                        e.sendSuccess(b);
                    } else e.showError(c.info);
                    f.requestAfter && e.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/riskCredibleMobile") || function(a) {
    try {
        window == window.parent && a.client.storage.set("riskCredibleMobileSendTime", -1);
    } catch (b) {}
    var c = function() {
        this.init.apply(this, arguments);
        this.bind();
    };
    c.prototype = {
        _cg: {
            item: "ui-form-item",
            itemSuccess: "ui-form-item-success",
            itemError: "ui-form-item-error",
            itemExp: "ui-form-explain"
        },
        init: function(b) {
            b = this.opt = b;
            b.dataId = b.id + new Date().getTime() + Math.floor(1e3 * Math.random());
            a.node("[id=" + b.id + "]:not([data-id])").attr("data-id", b.dataId);
            this.opt.uniqElement = a.node("[data-id=" + b.dataId + "]")[0];
            this.element = this.opt.uniqElement;
            this.container = a.node(this.element).parent("." + this._cg.item);
            this.counter = this.container.next(".ui-form-item-counter");
            this.validateBtn = this.container.find(".validate-btn");
            this.itemExp = this.container.find("." + this._cg.itemExp);
            this.preExp = this.itemExp.html() || "";
            this.expand = !1;
            this.opt.mobile ? (this.opt.mobile.origin = "credible", this.opt.mobile.credibleValidate = !1, 
            this.opt.mobile.riskCredibleMobile = this) : a.log("Mobile did not start.");
        },
        bind: function() {
            var b = this;
            this.validateBtn.click(function() {
                b.validateBtn.hide();
                b.validateNum();
                b.counter.removeClass("fn-hide").removeClass(b._cg.itemError).addClass(b._cg.itemSuccess);
                b.counter.find("." + b._cg.itemExp).html(b.counter.find("input").attr("data-explain"));
                b.expand = !0;
            });
            a.node(this.element).change(function() {
                b.validateBtn.show();
                b.counter.addClass("fn-hide");
                b.counter.find(".reSend-btn").removeClass("fn-hide");
                b.counter.find(".sms-btn").addClass("fn-hide");
                b.expand = !1;
            });
            a.node(this.element).focus(function() {
                b.showDefault();
            });
        },
        validateNum: function() {
            0 === this.element.value.replace(/[^\x00-\xff]/g, "**").length ? this.showError({
                msg: "请输入手机号码。"
            }) : this.request();
        },
        request: function() {
            var b = this, c = a.trim(this.element.value), d = {};
            if (window != window.parent) {
                var e = new Date().getTime(), f = Number(a.client.storage.get("riskCredibleMobileSendTime")), g = a.client.storage.get("riskCredibleMobileNo");
                if (c == g && 0 > e - f) return;
            }
            d.creditMobileIndex = c;
            d.validateProductName = "risk_mobile_credit";
            d.securityId = a.node(this.opt.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            a.request(this.opt.ajaxUrl, d, {
                method: "JSONP",
                success: function(d) {
                    if (d.info.sent) try {
                        window != window.parent ? (a.client.storage.set("riskCredibleMobileSendTime", new Date().getTime()), 
                        a.client.storage.set("riskCredibleMobileNo", c)) : a.client.storage.set("riskCredibleMobileSendTime", -1);
                    } catch (e) {} else b.showError(d.info);
                }
            });
        },
        validateNumSuc: function() {},
        error: function(a) {
            var a = a.info, b = "";
            5 <= a.errorCount && this.validateBtn.addClass("ui-checkcode-messagecode-disabled-btn").attr("disabled", !0);
            b = b || a.errorMessage;
            this.showError({
                code: a.errorCode,
                msg: b
            });
        },
        showError: function(a) {
            a.msg = a.msg || a.errorMessage;
            a.msg && (this.itemExp.html(a.msg), this.counter.find("." + this._cg.itemExp).html(a.msg), 
            this.counter.addClass(this._cg.itemError).removeClass(this._cg.itemSuccess));
        },
        showDefault: function() {
            this.itemExp.html(this.preExp);
            this.container.removeClass(this._cg.itemError);
        }
    };
    a.register("/alipay/security/riskCredibleMobile", window, c);
}(window.light);

light.has("/alipay/security/riskCertificate") || function(a) {
    members = {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                inputCertificateNo: this.element.value
            };
        }
    };
    a.riskCertificate = light.deriveFrom(a.base, members, {
        Name: "riskCertificate"
    });
}(alipay.security);

light.has("/alipay/security/riskSecurityQa") || function(a) {
    members = {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                securityAnswer: this.element.value
            };
        }
    };
    a.riskSecurityQa = light.deriveFrom(a.base, members, {
        Name: "riskSecurityQa"
    });
}(alipay.security);

light.has("/alipay/security/riskExpressPrivacy") || function(a) {
    members = {
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        queryValue: function(a) {
            var b = this.element = light.get(this.options.id), c = b.value.replace(/\D/g, ""), d = light.node(b), b = d.attr("data-cardtype"), d = d.attr("data-server") + "/validateAndCacheCardInfo.json";
            "debit" == b ? a({
                bankCardDebitNo: c
            }) : "credit" == b && light.request(d, {
                cardNo: c,
                cardBinCheck: !0,
                doUpdate: !1
            }, {
                format: "jsonp",
                success: function(b) {
                    b && b.validated ? a({
                        bankCardCreditUUID: b.key
                    }) : a({
                        message: "卡号校验不通过"
                    });
                }
            });
        }
    };
    a.riskExpressPrivacy = light.deriveFrom(a.base, members, {
        Name: "riskExpressPrivacy"
    });
}(alipay.security);

light.has("/alipay/security/checkCode") || function(a) {
    a.checkCode = light.deriveFrom(a.base, {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                check_code: this.element.value
            };
        }
    }, {
        Name: "checkCode"
    });
}(alipay.security);

!function(a) {
    a.rds = light.deriveFrom(a.base, {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                rdsUaValue: window.json_ua ? window.json_ua : "",
                rdsTokenValue: window.form_tk ? window.form_tk : ""
            };
        }
    }, {
        Name: "rds"
    });
}(alipay.security);

light.has("/alipay/security/barcode") || function(a) {
    var b = {
        Name: "barcode"
    }, b = a.barcode = light.deriveFrom(a.base, {
        render: function(a) {
            var b = this;
            light.isFunction(a) && b._readyList.push(a);
            seajs.use([ "$", "alipay/qrcode/1.0.3/qrcode" ], function(a, c) {
                var d = new c({
                    text: b.options.barcode,
                    width: b.options.width,
                    height: b.options.height,
                    correctLevel: 2
                });
                b.element && b.element.del();
                b.container.append(d);
                b.element = light.node(d);
                b.element.addClass("barcode");
                b.ready = !0;
                for (d = b._readyList; d.length; ) d.shift().apply(b);
            });
        },
        postInit: function() {
            this.container = light.node(light.node(this.options.container));
            this.stat = "suspended";
            for (var a = this, b = this.container.find("button"), c = 0; c < b.length; c++) light.on(b[c], "click", function() {
                a._changeState("waiting");
            });
            this._confirmedList = [];
        },
        start: function() {
            "confirmed" != this.stat && this._changeState("waiting");
        },
        stop: function() {
            "confirmed" != this.stat && this._changeState("suspended");
        },
        onConfirm: function(a) {
            if ("function" != typeof a) throw Error("onConfirm accept only function.");
            this._confirmedList.push(a);
            if ("confirmed" == this.stat) {
                for (a = this._confirmedList; a.length; ) a.shift().apply(this);
                this._confirmedList = [];
            }
        },
        getValue: function() {
            return "confirmed" == this.stat;
        },
        _changeState: function(a) {
            var b = this.stat;
            if (a != b) {
                switch (b) {
                  case "scanned":
                    this.container.removeClass("scanned");
                    break;

                  case "confirmed":
                    this.container.removeClass("confirmed");
                    break;

                  case "error":
                    this.container.removeClass("error");
                    break;

                  case "timeout":
                    this.container.removeClass("timeout");
                }
                this.stat = a;
                switch (a) {
                  case "suspended":
                    clearInterval(this._intervalHandler);
                    clearTimeout(this._timeoutHandler);
                    break;

                  case "waiting":
                    var c = this;
                    clearInterval(this._intervalHandler);
                    clearTimeout(this._timeoutHandler);
                    this._intervalHandler = setInterval(function() {
                        light.request(c.options.queryUrl, {
                            securityId: c.options.securityId
                        }, {
                            method: "JSONP",
                            success: function(a) {
                                "ok" == a.stat ? c._changeState(a.barcodeStatus) : (c._changeState("error"), light.log(a));
                            },
                            failure: function() {
                                light.log("failure");
                            }
                        });
                    }, 3e3);
                    this._timeoutHandler = setTimeout(function() {
                        c._changeState("timeout");
                    }, 6e5);
                    break;

                  case "scanned":
                    this.container.addClass("scanned");
                    break;

                  case "confirmed":
                    clearInterval(this._intervalHandler);
                    clearTimeout(this._timeoutHandler);
                    this.container.addClass("confirmed");
                    for (a = this._confirmedList; a.length; ) a.shift().apply(this);
                    this._confirmedList = [];
                    break;

                  case "error":
                    clearInterval(this._intervalHandler);
                    clearTimeout(this._timeoutHandler);
                    this.container.addClass("error");
                    break;

                  case "timeout":
                    clearInterval(this._intervalHandler);
                    clearTimeout(this._timeoutHandler);
                    this.container.addClass("timeout");
                    break;

                  default:
                    light.log("barcod error");
                }
            }
        }
    }, b);
}(alipay.security);

light.has("/alipay/security/riskOneKeyConfirm") || function(a) {
    var b = {
        Name: "riskOneKeyConfirm"
    }, b = a.riskOneKeyConfirm = light.deriveFrom(a.base, {
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.ready || (this.element = light.node(this.options.uniqElement), this.container = light.node(light.get(this.options.container)), 
            this.ready = !0, this.guideLink = this.container.find(".onekey-guide-link"), this.buttonState = "disabled", 
            this.timeLength = 60, this.sendButton = this.container.find("#sendButton"), this.sendButtonValue = "秒后发送短信", 
            this.ajaxUrl = this.options.ajaxUrl);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        postInit: function() {
            this.stat = "init";
            params = {};
            t = this;
            this.onready(function() {
                this._changeButtonState();
                this._bindGuide();
                this._bindClick();
                params.securityId = t.options.securityId;
                params.rnd = Math.random();
                params.validateProductName = t.options.productName;
                light.request(t.ajaxUrl, params, {
                    method: "JSONP",
                    success: function(a) {
                        !1 === a.info.sent && t._showMsg(!1, a.info.errorMessage);
                    }
                });
                this._changeState("waiting");
                var a = this;
                this._intervalHandler = setInterval(function() {
                    light.request(a.options.queryUrl, {
                        securityId: a.options.securityId
                    }, {
                        method: "JSONP",
                        success: function(b) {
                            a._changeState(b.stat);
                        },
                        failure: function() {
                            light.log("failure");
                        }
                    });
                }, 3e3);
                this._timeoutHandler = setTimeout(function() {
                    a._changeState("timeout");
                }, 9e5);
            });
            this._confirmedList = [];
        },
        _bindGuide: function() {
            var a = this;
            light.on(this.guideLink[0], "click", function() {
                a.sendButton.removeClass("fn-hide");
                a.guideLink.addClass("fn-hide");
            });
        },
        _changeButtonState: function() {
            this.timeLength--;
            var a = light.node(this.sendButton);
            if (this.timeLength) {
                a.attr("value", this.timeLength + this.sendButtonValue);
                a.attr("disabled", "disabled");
                a.style({
                    margin: 0,
                    color: "rgb(135,135,135)"
                });
                this.buttonState = "disabled";
                var b = this;
                setTimeout(function() {
                    b._changeButtonState();
                }, 1e3);
            } else this.buttonState = "able", this.timeLength = 60, a.attr("value", "重新发送短信"), 
            a.attr("disabled", !1), a.style({
                margin: 0,
                color: "#000"
            });
        },
        _bindClick: function() {
            var a = this, b = {};
            light.on(this.sendButton[0], "click", function() {
                "able" === a.buttonState && (b.securityId = a.options.securityId, b.rnd = Math.random(), 
                b.validateProductName = a.options.productName, a.element.parent().removeClass("ui-form-item-error"), 
                a.container.find(".ui-form-explain").text(""), light.request(a.ajaxUrl, b, {
                    method: "JSONP",
                    success: function(b) {
                        !1 === b.info.sent && a._showMsg(!1, b.info.errorMessage);
                    }
                }));
                a._changeButtonState();
            });
        },
        onConfirm: function(a) {
            if ("function" != typeof a) throw Error("onConfirm accept only function.");
            this._confirmedList.push(a);
            if ("confirmed" == this.stat) {
                for (a = this._confirmedList; a.length; ) a.shift().apply(this);
                this._confirmedList = [];
            }
        },
        getValue: function() {
            return "confirmed" == this.stat;
        },
        _changeState: function(a) {
            if (a != this.stat) switch (this.stat = a, a) {
              case "error":
                clearInterval(this._intervalHandler);
                clearTimeout(this._timeoutHandler);
                this._showMsg(!1, "系统繁忙，请稍侯再试。");
                light.log("一键确认：发生错误");
                break;

              case "created":
                break;

              case "confirmed":
                clearInterval(this._intervalHandler);
                clearTimeout(this._timeoutHandler);
                this._showMsg(!0, "已确认");
                light.log("一键确认：已确认");
                for (a = this._confirmedList; a.length; ) a.shift().apply(this);
                this._confirmedList = [];
                break;

              case "denied":
                clearInterval(this._intervalHandler);
                clearTimeout(this._timeoutHandler);
                this._showMsg(!1, "账户授权失败");
                light.log("一键确认：已拒绝");
                for (a = this._confirmedList; a.length; ) a.shift().apply(this);
                this._confirmedList = [];
                break;

              case "timeout":
                clearInterval(this._intervalHandler);
                clearTimeout(this._timeoutHandler);
                this._showMsg(!1, "已超时，请稍侯再试");
                light.log("一键确认：已超时");
                break;

              default:
                light.log("一键确认：未知状态");
            }
        },
        _showMsg: function(a, b) {
            a ? this.element.parent().removeClass("ui-form-item-error") : this.element.parent().addClass("ui-form-item-error");
            this.container.find(".ui-form-explain").text(b);
        }
    }, b);
}(alipay.security);

light.has("/alipay/security/riskSudoku") || function(a) {
    var b = {
        Name: "riskSudoku"
    }, b = a.riskSudoku = light.deriveFrom(a.base, {
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.ready || (this.element = light.node(this.options.uniqElement), this.container = light.node(light.get(this.options.container)), 
            this.keyboard = this.container.find(".risk-sudoku-keyboard"), this.resendBtn = this.container.find(".risk-sudoku-resend-btn"), 
            this.clearInputIcon = this.container.find(".clear-input"), this.ready = !0);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        postInit: function() {
            this.onready(function() {
                this._bindKeyboardEvents();
                this._bindResendBtn();
                this._bindClearInput();
                this._sendSMS();
            });
        },
        getValue: function() {
            return this.element.val();
        },
        _bindKeyboardEvents: function() {
            var a = light.node("table tr td a", this.keyboard), b = this, c = b.element.parent();
            light.each(a, function(a, d) {
                light.on(d, "click", function(a) {
                    a.cancel();
                    c.removeClass("fn-hide");
                    var a = light.node(a.target).text(), d = b.element;
                    d.val().length >= b.options.ackNum || d.val(d.val() + a);
                });
            });
        },
        _bindClearInput: function() {
            var a = this;
            light.on(this.clearInputIcon[0], "click", function(b) {
                b.cancel();
                a.element.val("");
            });
        },
        _bindResendBtn: function() {
            var a = this;
            light.on(this.resendBtn[0], "click", function() {
                a._sendSMS();
            });
        },
        _sendSMS: function() {
            var a = this;
            this.resendBtn.attr("disabled", "disabled");
            this.resendBtn.addClass("ui-checkcode-messagecode-disabled-btn");
            var b = {
                securityId: a.options.securityId,
                validateProductName: this.options.productName
            };
            a._smsTip(!0, "校验码已发送，15分钟内输入有效。");
            light.request(this.options.resendUrl, b, {
                method: "JSONP",
                success: function(b) {
                    if ("ok" == b.stat) {
                        if (b.info) if (b.info.sent || (a._smsTip(!1, b.info.errorMessage), light.log(b.info.errorMessage), 
                        a._enableResendBtn()), b.info.sudoku) {
                            a.letters = {};
                            var c = light.node("table tr td a", a.keyboard);
                            light.each(b.info.sudoku, function(b, d) {
                                a.letters[d.code] = d.index;
                                light.node(c[b]).text(d.code);
                            });
                        } else a._smsTip(!1, b.info.errorMessage || "网络繁忙，请稍侯再试。"), light.log("服务器错误，未返回可选字符结果"), 
                        a._enableResendBtn();
                    } else light.log("error");
                },
                failure: function() {
                    light.log("failure");
                }
            });
            var c = 120;
            clearInterval(a._intervalHandler);
            this._intervalHandler = setInterval(function() {
                if (0 == c) a._enableResendBtn(); else {
                    var b = c-- + "秒后重发短信";
                    a.resendBtn.text(b);
                }
            }, 1e3);
        },
        _enableResendBtn: function() {
            this.resendBtn.text("重新获取短信").attr("disabled", !1).removeClass("ui-checkcode-messagecode-disabled-btn");
            clearInterval(this._intervalHandler);
        },
        _smsTip: function(a, b) {
            this.resendBtn.next(".ui-form-explain").text(b || "");
            var c = this.resendBtn.parent(".resend-group");
            a ? c.removeClass("ui-form-item-error") : c.addClass("ui-form-item-error");
        }
    }, b);
}(alipay.security);

light.has("/alipay/security/riskOriginalAccountMobile") || function(a, b) {
    try {
        window == window.parent && a.client.storage.set("riskOriginalAccountMobileSendTime", -1);
    } catch (c) {}
    var d = {
        Name: "riskOriginalAccountMobile",
        defaults: {
            id: "",
            autoSend: !0,
            isBind: "",
            ajaxUrl: "",
            countdownBefore: null,
            countdownAfter: null,
            requestBefore: null,
            requestAfter: null
        }
    }, e = {
        sms: {
            className: ".sms-btn",
            btnText: "重新获取短信",
            interval: 120,
            prompt_send: "校验码已发送，30分钟内输入有效，请勿泄露",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        },
        phone: {
            className: ".phone-btn",
            btnText: "使用语音获取",
            interval: 120,
            prompt_send: "支付宝将向您的手机拨打电话并播报校验码。<br />来电号码为：0571-26883721,请稍候...",
            prompt_default: "校验码是6位数字，30分钟内输入有效，请勿泄露"
        }
    };
    d.properties = {
        targets: []
    };
    d = a.register("/alipay/security/riskOriginalAccountMobile", window, a.deriveFrom(b.base, {
        ready: !0,
        render: function(b) {
            a.isFunction(b) && this._readyList.push(b);
            this.element = this.options.uniqElement;
            for (b = this._readyList; b.length; ) b.shift().apply(this);
        },
        getValue: function() {
            return {
                mobileAckCode: this.element.value
            };
        },
        postInit: function() {
            var b = this, c = this.options;
            this.container = a.node(this.options.uniqElement).parent(".ui-form-item");
            this.itemExp = this.container.find(".ui-form-explain");
            a.each(e, function(a, d) {
                var e = b.container.find(d.className);
                e.length && (e.type = a, !c.defaultType && (c.defaultType = a), b.targets.push(e));
            });
            this.targets.length || a.log("No mode used.");
            c.autoSend && this.request("sms");
            this.bind();
        },
        bind: function() {
            var b = this, c = this.options;
            this.options.autoSend || this.container.find(".send-btn").click(function() {
                a.node(this).addClass("fn-hide");
                b.container.find(".ui-form-field, .ui-form-explain").removeClass("fn-hide");
                b.request("sms");
            });
            this.container.find(".reSend-btn").click(function(d) {
                d.cancel();
                a.node(this).addClass("fn-hide");
                b.container.find(".sms-btn, .phone-btn").removeClass("fn-hide");
                b.sendSuccess(c.defaultType);
                b.countdown(c.defaultType);
            });
            a.each(this.targets, function(a, c) {
                c.click(function() {
                    b.send(c.type);
                });
            });
            a.ready(function() {
                a.node(".phone-btn").length && (b.pop = new a.pop({
                    targets: a.node(".phone-btn"),
                    className: "ui-securitycore",
                    width: 400
                }));
            });
        },
        send: function(a) {
            a = a || this.options.defaultType;
            this.countdown(a);
            this.request(a);
        },
        countdown: function(a) {
            var b = this, c = b.options, a = a || c.defaultType, d = e[a].interval;
            c.countdownBefore && c.countdownBefore();
            !function() {
                0 < d-- ? (b.toggleBtnUI(d), setTimeout(arguments.callee, 1e3)) : (b.updatePrompt(a, "prompt_default"), 
                b.toggleBtnUI(d, !0), b.container.removeClass("ui-form-item-success"), c.countdownAfter && c.countdownAfter());
            }();
        },
        toggleBtnUI: function(b, c) {
            var d = this, f, g = c ? "removeClass" : "addClass";
            a.each(this.targets, function(a, h) {
                f = c ? e[h.type].btnText : "（" + b + "秒后）" + e[h.type].btnText;
                c || d.pop && d.pop.hide();
                h[g]("ui-checkcode-messagecode-disabled-btn").attr("disabled", !c).attr("value", f);
            });
        },
        updatePrompt: function(a, b) {
            this.container.find(".ui-form-explain").html(e[a][b]);
        },
        request: function(b) {
            if (window != window.parent) {
                var c = new Date().getTime(), d = Number(a.client.storage.get("riskOriginalAccountMobileSendTime"));
                if (0 > c - d) {
                    this.sendSuccess(b);
                    return;
                }
            }
            var e = this, f = this.options, c = {}, b = b || f.defaultType;
            f.requestBefore && f.requestBefore();
            this.inputMobileNo && (c.inputMobileNo = this.inputMobileNo);
            c.type = b;
            c.securityId = a.node(this.options.uniqElement).parent(".J-securitycoreMain").attr("data-request");
            c.rnd = Math.random();
            c.validateProductName = "risk_original_account_mobile";
            a.request(f.ajaxUrl, c, {
                method: "JSONP",
                success: function(c) {
                    if (c.info.sent) {
                        try {
                            window != window.parent ? a.client.storage.set("riskOriginalAccountMobileSendTime", new Date().getTime()) : a.client.storage.set("riskOriginalAccountMobileSendTime", -1);
                        } catch (d) {}
                        e.sendSuccess(b);
                    } else e.showError(c.info);
                    f.requestAfter && e.options.requestAfter(c);
                }
            });
        },
        showError: function(a) {
            this.itemExp.html(a.errorMessage);
            this.container.removeClass("ui-form-item-success").addClass("ui-form-item-error");
        },
        sendSuccess: function(a) {
            a = a || this.options.defaultType;
            this.container.removeClass("ui-form-item-error").addClass("ui-form-item-success");
            this.updatePrompt(a, "prompt_send");
        }
    }, d));
}(window.light, alipay.security);

light.has("/alipay/security/riskOriginalSecurityQa") || function(a) {
    members = {
        ready: !0,
        render: function(a) {
            light.isFunction(a) && this._readyList.push(a);
            this.element = light.get(this.options.id);
            for (a = this._readyList; a.length; ) a.shift().apply(this);
        },
        getValue: function() {
            return {
                securityAnswer: this.element.value
            };
        }
    };
    a.riskOriginalSecurityQa = light.deriveFrom(a.base, members, {
        Name: "riskOriginalSecurityQa"
    });
}(alipay.security);

light.has("/alipay/security/page") || function(a, b, c) {
    c.page = {};
    c.page.processCertLink = function(b) {
        if (b.length) {
            a.node(".J-securitycoreMain").attr("data-extension");
            try {
                if (window.frameElement) b.attr("data-href") && b.attr("href", b.attr("data-href")), 
                b.attr("target", "_blank"); else {
                    i = 0;
                    for (l = b.length; i < l; i++) {
                        var c = b[i];
                        a.page.ui.dialog({
                            type: "page",
                            trigger: c,
                            width: 612,
                            content: c.href,
                            autoShow: !1
                        });
                    }
                }
            } catch (d) {
                b.attr("data-href") && b.attr("href", b.attr("data-href")), b.attr("target", "_blank");
            }
        }
    };
    c.page.processExtensionLink = function(b) {
        var c = !1, d = document;
        try {
            window.top.document.body && (d = window.top.document);
        } catch (e) {
            c = !0;
        }
        for (var b = a.node(b), f = 0, g = b.length; f < g; f++) a.on(b[f], "click", function(b) {
            b.cancel();
            c ? window.open(b.target.href, "_blank") : new a.dialog({
                targetFrame: d,
                iframeSrc: b.target.getAttribute("data-xbox-href"),
                title: b.target.getAttribute("data-xbox-title"),
                onHide: "true" == b.target.getAttribute("data-xbox-hide-refresh") ? function() {
                    document.location.reload();
                } : function() {}
            }).show();
        });
    };
}(window.light, light.node, alipay.security);

light.has("/alipay/security/core") || function(a, b, c) {
    var d = function() {
        var a = {
            form: null,
            loadingClass: "ui-form-status",
            validateUrl: "",
            reCheckUrl: "",
            beforeAjaxValidate: light.noop,
            afterAjaxValidate: light.noop,
            block: light.noop,
            reCheckSuccess: light.noop,
            stopSubmit: !1,
            validatedSuccess: null,
            beforeSubmit: null
        }, b = {
            bind: function() {
                light.on(document, "click keyup", function(a) {
                    var b = 0;
                    27 == a.which ? b = 1 : a.target && a.target.className && -1 !== a.target.className.indexOf("xbox-close-link") && (b = 1, 
                    a.cancel());
                    b && light.page.ui.closeDialog();
                });
                var a = function(a) {
                    a = light.node(a);
                    a.val() || a.val(a.attr("placeholder")).addClass("ui-form-item-placeholder");
                };
                light.node(".J-securitycoreMain [placeholder]").each(function() {
                    a(light.node(this));
                }).click(function() {
                    var a = light.node(this);
                    a.val() == a.attr("placeholder") && a.val("");
                    a.removeClass("ui-form-item-placeholder");
                }).blur(function() {
                    a(light.node(this));
                });
            },
            execute: function() {
                alipay.security.snowden && alipay.security.snowden.report();
                if (this.requestContext.stoped) {
                    var a = this, b = this.scProducts, d = light.node(".J-securitycoreMain", this.form).attr("data-status");
                    b.length && !this.inited && c.core.init.call(this, this.options);
                    this.requestContext.stoped = !1;
                    this._q.clear();
                    light.each(this._products, function(b, c) {
                        a._q.add(function(b) {
                            c.execute(b, a.requestContext);
                        });
                    });
                    this._q.add(function(c) {
                        b.length ? a.barcodeOnly || a.riskOneKeyConfirmOnly ? (a.options.validatedSuccess && a.options.validatedSuccess(), 
                        c()) : a.ajaxValidate(c, a.requestContext.params) : "true" != d && c();
                    });
                    this._q.add(function() {
                        a.formSuccess();
                    });
                    this._q.invoke();
                    this.requestContext.stoped = !0;
                }
            },
            ajaxValidate: function(a, b) {
                if (this.validated) a(); else {
                    light.log("Begin ajax validat.");
                    this.showLoadingBar();
                    this.options.beforeAjaxValidate();
                    var c = this;
                    light.packetRequest(this.options.validateUrl, {
                        securityId: light.node(".J-securitycoreMain", this.form).attr("data-request")
                    }, b, {
                        success: function(b) {
                            c.ajaxValidateSucc(a, b);
                        },
                        abort: function(a) {
                            c.ajaxValidateFail(a);
                        }
                    });
                }
            },
            overLimit: function(a, b) {
                for (var c = a.split(","), d = 0, e = c.length; d < e; d++) if ("risk_validate_over_limit_times" == c[d]) {
                    var f = light.node(".J-securitycoreMain"), g = light.node("." + b + "-blockReason");
                    0 >= g.length && (g = light.node("#blockReason"));
                    f.children().hide();
                    g.appendTo(f);
                    if (f.parent("form").length) {
                        var h = f.parent("form");
                        h.children().hide();
                        h[0].insertBefore(f[0], h[0].firstChild);
                        f.show();
                    }
                    f[0].insertBefore(g[0], f[0].firstChild);
                    g.show();
                    f.show();
                    light.node(".loading-text").hide();
                }
            },
            updateRdsToken: function(a) {
                a && a.info && a.info.rdsToken && (window.form_tk = a.info.rdsToken, UA_Opt.setToken(window.form_tk), 
                UA_Opt.reload());
            },
            ajaxValidateSucc: function(a, b) {
                var c = b.info, e = !0, f = null;
                if (b.blockReason) {
                    e = "";
                    if (c.product && c.product.length) for (var g = 0, h = c.product.length; g < h; g++) {
                        var i = c.product[g];
                        if (i.overLimited) {
                            e = i.name;
                            break;
                        }
                    }
                    this.overLimit(b.blockReason, e);
                } else {
                    if (c.product && c.product.length) {
                        g = 0;
                        for (h = c.product.length; g < h; g++) {
                            var i = c.product[g], j = d.ajaxParams[i.name];
                            0 <= "ukey,thirdkey,cert".indexOf(j) && !i.validated ? f = i : "checkCode" == j ? this._products[j].afterValidate(i.validated, i.message) : this._products[j].afterValidate(i.validated, i.message, i.validated);
                            !i.validated && (e = i.validated);
                            light.log("%s validate %s", j, i.validated);
                        }
                        f && this._products[f.name].afterValidate(f.validated, f.message, f.validated);
                        e ? (this.validated = !0, a()) : this.stopSubmit(b);
                    } else c.exception && this.ajaxValidateFail(c.exception);
                    this.validated && this.options.validatedSuccess && this.options.validatedSuccess();
                }
                this.updateRdsToken(b);
            },
            ajaxValidateFail: function(a) {
                this.stopSubmit();
                this._products.edit ? this._products.edit.afterValidate(!1, a) : alert(a);
            },
            stopSubmit: function(a) {
                this.requestContext.stoped = !0;
                this.hideLoadingBar();
                this.options.afterAjaxValidate(a);
            },
            showLoadingBar: function() {
                this.loading && this.loading.removeClass("fn-hide");
            },
            hideLoadingBar: function() {
                this.loading && this.loading.addClass("fn-hide");
            },
            formSuccess: function() {
                this.options.beforeSubmit && this.options.beforeSubmit();
                var a = window.light.page.products, b, c;
                for (c in a) b = a[c], b.__type && "rsainput" == b.__type.Name && (b.element.value = "");
                this.options.stopSubmit || this.options.form.submit();
            },
            getStatus: function() {
                return window.um && window.um.getStatus();
            }
        };
        return {
            init: function(e) {
                if (!(this instanceof d.init)) return new d.init(e);
                light.extend(this, b);
                this.inited = !1;
                this._products = {};
                this.requestContext = {
                    stoped: !0,
                    params: {}
                };
                this._q = new light.queue();
                this.validated = !1;
                var f = this;
                this.options = e = light.extend({}, a, e);
                this.form = e.form;
                var g = light.node(".J-securitycoreMain", this.form), h = g.attr("data-status"), g = g.attr("data-server");
                e.reCheckUrl = e.reCheckUrl ? e.reCheckUrl : g + "/securityAjaxCertRecheck.json";
                e.validateUrl = e.validateUrl ? e.validateUrl : g + "/securityAjaxValidate.json";
                this.loading = light.node("." + e.loadingClass, e.form);
                this.scProducts = light.page.scProducts;
                if ("true" == h) return c.core.block(e.reCheckUrl, e.reCheckSuccess, e.preventDefaultReCheckSuccess), 
                e.block(), this;
                c.page.processExtensionLink(light.node(".install-extension-control"));
                if (1 == this.scProducts.length && this.scProducts[0].__type && "barcode" == this.scProducts[0].__type.Name) {
                    if ((this.barcodeOnly = !0) && this.options.barcodeAutoSubmit) this.scProducts[0].onConfirm(function() {
                        f.options.validatedSuccess && f.options.validatedSuccess();
                        f.formSuccess();
                    });
                } else this.barcodeOnly = !1;
                1 == this.scProducts.length && this.scProducts[0].__type && "riskOneKeyConfirm" == this.scProducts[0].__type.Name ? (this.riskOneKeyConfirmOnly = !0, 
                this.scProducts[0].onConfirm(function() {
                    f.options.validatedSuccess && f.options.validatedSuccess();
                    f.formSuccess();
                })) : this.riskOneKeyConfirmOnly = !1;
                light.each(this.scProducts, function(a, b) {
                    var c = b._type;
                    if (d.newProducts[c]) {
                        f._products[c] = new d[c](b);
                        d.ajaxParams[b.options.prodType] = c;
                    } else {
                        var c = d.prodConfig[b.__type.Name], e = this.options ? this.options[c] : null;
                        if (!e || !e.skipChecking) f._products[c] = d.base.create(d[c], b, e);
                    }
                });
                c.core.visualTip();
                b.bind();
                light.page.scProducts = [];
                this.inited = !0;
                return this;
            }
        };
    }();
    light.register("alipay/security/core", a, d);
}(window, light.page.ui.dialog, alipay.security);

!function(a, b, c) {
    c.newProducts = {
        Password: !0
    };
    c.prodConfig = {
        "control.edit": "edit",
        "control.npedit": "edit",
        rsainput: "edit",
        noedit: "edit",
        mobile: "mobile",
        ctuMobile: "ctuMobile",
        otp: "otp",
        cert: "cert",
        ukey: "ukey",
        thirdkey: "thirdkey",
        riskMobileBank: "riskMobileBank",
        riskMobileAccount: "riskMobileAccount",
        riskOriginalAccountMobile: "riskOriginalAccountMobile",
        riskOriginalSecurityQa: "riskOriginalSecurityQa",
        riskMobileCredit: "riskMobileCredit",
        riskCertificate: "riskCertificate",
        riskSecurityQa: "riskSecurityQa",
        riskExpressPrivacy: "riskExpressPrivacy",
        riskOneKeyConfirm: "riskOneKeyConfirm",
        riskSudoku: "riskSudoku",
        checkCode: "checkCode",
        rds: "rds",
        barcode: "barcode"
    };
    c.ajaxParams = {
        cert: "cert",
        ukey: "ukey",
        thirdkey: "thirdkey",
        payment_password: "edit",
        risk_payment_password: "edit",
        risk_original_payment_password: "edit",
        query_password: "edit",
        operation_password: "edit",
        otp: "otp",
        mobileotp: "otp",
        ctu_mobile: "ctuMobile",
        mobile_replace: "mobile",
        mobile_free: "mobile",
        mobile_pay: "mobile",
        mobile_bank: "mobile",
        mobile_special_bank: "mobile",
        risk_mobile_bank: "riskMobileBank",
        risk_mobile_account: "riskMobileAccount",
        risk_original_account_mobile: "riskOriginalAccountMobile",
        risk_original_security_qa: "riskOriginalSecurityQa",
        risk_mobile_credit: "riskMobileCredit",
        risk_certificate: "riskCertificate",
        risk_security_qa: "riskSecurityQa",
        risk_express_privacy: "riskExpressPrivacy",
        risk_onekey_confirm: "riskOneKeyConfirm",
        risk_mobile_account_sudoku: "riskSudoku",
        risk_mobile_bank_sudoku: "riskSudoku",
        check_code: "checkCode",
        rds: "rds",
        barcode: "barcode"
    };
}(window, light.page.ui.dialog, alipay.security.core);

light.has("/alipay/security/core/recheck") || function(d, c, a) {
    a.core.certCheck = function(b, c) {
        function e() {
            var b = a.debug("security-core:recheck");
            b("cert recheck新模式开始检测证书");
            new alipay.security.Cert({
                dataAccessPolicy: alipay.security.certDataAccessPolicy,
                websocketPorts: alipay.security.websocketPorts,
                timeout: alipay.security.controlCheckTimeout,
                sid: alipay.security.sid
            }).execute(d.unescapeHTML(f.attr("data-cmd")), function(a, d) {
                alipay.security.snowden && alipay.security.snowden.report();
                if (a) return b("没有检测到数字证书：[" + a.code + "]" + a.message), c({
                    certCmdOutput: ""
                });
                b("检测到数字证书：" + d.rawData);
                c({
                    certCmdOutput: d.rawData
                });
            });
        }
        var f = b.data, g = "", h = function() {
            a.cdo.handlers["*"] = a.cdo.handlers[12004] = function() {
                c({
                    certCmdOutput: ""
                });
            };
            a.create(a.cdo).render(function() {
                this.execute(d.unescapeHTML(f.attr("data-cmd")), function(a) {
                    c({
                        certCmdOutput: a.rawData
                    });
                });
            });
        }, i = function() {
            a.create(a.pta).render(function() {
                for (var a = f.attr("data-sn").split("&"), b = 0, d = a.length; b < d; b++) if (g = this.sign(f.attr("data-random"), a[b], f.attr("data-issuer"))) {
                    c({
                        signedData: g
                    });
                    return;
                }
                c({
                    signedData: ""
                });
            });
        }, j = function() {
            a.utils.chromeExtension.execute({
                command: "cert",
                input: d.unescapeHTML(f.attr("data-cmd"))
            }, function(a) {
                a && a.cert ? c({
                    certCmdOutput: a.cert
                }) : c({
                    certCmdOutput: ""
                });
            });
        }, k = function() {
            a.create(a.pta).render(function() {
                (g = this.sign(f.attr("data-random"), f.attr("data-sn"), f.attr("data-issuer"), "", f.attr("data-subject"))) ? c({
                    signedData: g
                }) : c();
            });
        }, l = function() {
            a.cdo.handlers["*"] = a.cdo.handlers[12004] = function() {
                c();
            };
            a.create(a.cdo).render(function() {
                this.execute(d.unescapeHTML(f.attr("data-cmd")), function(a) {
                    c({
                        certCmdOutput: a.rawData
                    });
                });
            });
        };
        if ("cert" == b.type) {
            if (alipay.security.hasBrowserControlPolicy) return e();
            b.extensionEnabled ? j() : a.cdo.installed ? h() : a.pta.installed ? i() : c({});
        } else "ukey" == b.type ? a.cdo.installed && d.unescapeHTML(f.attr("data-cmd")) ? l() : a.pta.installed && d.client.info.engine.trident && k() : "thirdkey" == b.type && d.client.info.engine.trident && a.pta.installed && k();
    };
    a.core.recheck = function(b) {
        var e = function(a) {
            b.element.addClass("fn-hide");
            b.element.item(a).removeClass("fn-hide");
        }, f = function() {
            h && clearTimeout(h);
            e(4);
            a.core.certCheck(b, function(a) {
                "undefined" != typeof a ? (e(3), d.packetRequest(b.url, {
                    securityId: c(".J-securitycoreMain").attr("data-request")
                }, a, {
                    success: p,
                    abort: g
                })) : g();
            });
        }, g = function() {
            h && clearTimeout(h);
            h = setTimeout(function() {
                e(1);
                if ("ukey" == b.type || "thirdkey" == b.type) h = setTimeout(f, 5e3);
            }, 800);
        }, p = function(f) {
            var f = f.info, e = f.message;
            h && clearTimeout(h);
            d.log(e);
            if ("block" == e || "success" == e) {
                if ("block" == e || "success" == e && !b.preventDefaultReCheckSuccess) {
                    var k = document.createElement("div"), o = c(".J-securitycoreMain"), j = c(".J-securitycoreTip");
                    k.innerHTML = f.html;
                    o.parent()[0].insertBefore(c(".J-securitycoreMain", k)[0], o[0]);
                    j.length && j.parent()[0].insertBefore(c(".J-securitycoreTip", k)[0], j[0]);
                    o.del();
                    j.length && j.del();
                    d.each(c("script", c(".J-securitycoreMain")), function() {
                        eval(this.text);
                    });
                }
                "block" == e ? a.core.block(b.url, b.callback) : "success" == e && (c(".ui-securitycore").removeClass("fn-hide"), 
                a.core.visualTip(), b.callback && b.callback());
            } else g();
        }, h = setTimeout(f, 100);
        c(".J_reCheck").click(function(a) {
            a.cancel();
            f(a);
        });
        b.element.item(1).mouseover(function(a) {
            a && h && clearTimeout(h);
        }).mouseout(function() {
            h = setTimeout(f, 4e3);
        });
    };
}(window.light, light.node, alipay.security);

light.has("/alipay/security/core/block") || function(a, b, c) {
    var d = function(b, c) {
        c(!!a.get(b));
    }, e = function(c) {
        function d(e) {
            var f = c[e];
            f && f.rule(f.id, function(c) {
                c ? (alipay.security.snowden && alipay.security.snowden.report(), b("#" + f.id).removeClass("fn-hide"), 
                f.callback && f.callback(b("#" + f.id)), "cashier" == h && (f.seed += "_cashier"), 
                a.track(f.seed)) : d(e + 1);
            });
        }
        d(0);
    };
    certElems = [ {
        id: "J_certOs",
        rule: d,
        seed: "AQ_CA_OSnotSupport"
    }, {
        id: "J_certNoPta",
        rule: function(b, d) {
            if ("true" != a.node("#J-cert-section").attr("data-alternative")) if (alipay.security.hasBrowserControlPolicy) {
                var e = c.debug("security-core:block");
                e("开始检测是否安装数字证书控件，使用策略：" + alipay.security.certDataAccessPolicy + "，使用websocketPorts: " + alipay.security.websocketPorts + "，超时时间：" + alipay.security.controlCheckTimeout);
                new alipay.security.Cert({
                    dataAccessPolicy: alipay.security.certDataAccessPolicy,
                    websocketPorts: alipay.security.websocketPorts,
                    timeout: alipay.security.controlCheckTimeout,
                    sid: alipay.security.sid
                }).detect(function(a, b) {
                    a ? (e("未检测到可用的数字证书控件，block黄条提示安装控件，原因：[" + a.code + "]" + a.message), alipay.security.snowden && alipay.security.snowden.report()) : e("检测到可用的数字证书控件策略，不需要贴黄条提示安装控件：" + b);
                    d(!!a);
                });
            } else if ("true" == a.node(".J-securitycoreMain").attr("data-extension")) {
                var f = alipay.security.utils.chromeExtension;
                f.checkExtension(function(a) {
                    a ? f.checkControl(function(a) {
                        a ? d(!1) : d(!0);
                    }, "alicert") : d(!0);
                });
            } else c.cdo.installed ? d(!1) : d(!0); else d(!1);
        },
        seed: "AQ_CA_noPta"
    }, {
        id: "J_certNotUse",
        rule: d,
        seed: "AQ_CA_no"
    }, {
        id: "J_certChecking",
        rule: d,
        seed: "AQ_CA_no",
        callback: function(d) {
            d = {
                type: "cert",
                element: b("#J_certNo, #J_certNotFound, #J_certFound, #J_certValidating, #J_certChecking"),
                data: d,
                url: f,
                callback: g,
                preventDefaultReCheckSuccess: i,
                extensionEnabled: "true" == a.node(".J-securitycoreMain").attr("data-extension")
            };
            c.core.recheck(d);
        }
    }, {
        id: "J_certOverdue",
        rule: d,
        seed: "AQ_CA_update"
    }, {
        id: "J_certException",
        rule: d,
        seed: ""
    }, {
        id: "J_publicException",
        rule: d,
        seed: ""
    } ];
    ukeyElems = [ {
        id: "J_ukeyOs",
        rule: d,
        seed: "AQ_KEY_OSnotSupport"
    }, {
        id: "J_ukeyBrowser",
        rule: d,
        seed: "AQ_KEY_notSupport"
    }, {
        id: "J_ukeyNoPta",
        rule: function(a, b) {
            b(!c.cdo.installed && (!c.pta.installed || !c.hwpta.installed));
        },
        seed: "AQ_KEY_noPta"
    }, {
        id: "J_ukeyInActive",
        rule: d,
        seed: "AQ_KEY_inActive"
    }, {
        id: "J_ukeyChecking",
        rule: d,
        seed: "AQ_KEY_noKey",
        callback: function(a) {
            a = {
                type: "ukey",
                element: b("#J_ukeyNoKey, #J_ukeyNotFound, #J_ukeyFound, #J_ukeyValidating, #J_ukeyChecking"),
                data: a,
                url: f,
                callback: g,
                preventDefaultReCheckSuccess: i
            };
            c.core.recheck(a);
        }
    }, {
        id: "J_ukeyInLost",
        rule: d,
        seed: "AQ_KEY_cancel"
    }, {
        id: "J_ukeyOverdue",
        rule: d,
        seed: "AQ_KEY_update"
    }, {
        id: "J_ukeyException",
        rule: d,
        seed: ""
    }, {
        id: "J_publicException",
        rule: d,
        seed: ""
    } ];
    thirdkeyElems = [ {
        id: "J_thirdkeyOs",
        rule: d,
        seed: "AQ_UKEY_OSnotSupport"
    }, {
        id: "J_thirdkeyBrowser",
        rule: d,
        seed: "AQ_UKEY_notSupport"
    }, {
        id: "J_thirdkeyNoPta",
        rule: function(a, b) {
            b(!c.pta.installed);
        },
        seed: "AQ_UKEY_noPta"
    }, {
        id: "J_thirdkeyChecking",
        rule: d,
        seed: "AQ_UKEY_noKey",
        callback: function(a) {
            a = {
                type: "thirdkey",
                element: b("#J_thirdkeyNo, #J_thirdkeyNotFound, #J_thirdkeyFound, #J_thirdkeyValidating, #J_thirdkeyChecking"),
                data: a,
                url: f,
                callback: g,
                preventDefaultReCheckSuccess: i
            };
            c.core.recheck(a);
        }
    }, {
        id: "J_thirdkeyOverdue",
        rule: d,
        seed: "AQ_UKEY_update"
    }, {
        id: "J_thirdkeyLogoff",
        rule: d,
        seed: "AQ_UKEY_cancel"
    }, {
        id: "J_thirdkeyException",
        rule: d,
        seed: ""
    }, {
        id: "J_publicException",
        rule: d,
        seed: ""
    } ];
    var f, g, h, i;
    c.core.block = function(d, j, k) {
        f = d;
        g = j;
        i = k;
        h = b(".J-securitycoreMain").attr("data-system");
        b("#J_scCheck").addClass("fn-hide");
        b(".cert-section").length ? e(certElems) : b(".ukey-section").length ? (e(ukeyElems), 
        b(".ukeyDownLink").attr("href", c.cdo.info.downloadUrl)) : b(".thirdkey-section").length && (e(thirdkeyElems), 
        b(".thirdkeyDownLink").attr("href", c.pta.info.downloadUrl));
        b(".downLinkFirst").click(function() {
            var a = b(this).parent(".ui-tip");
            a.addClass("fn-hide");
            b("#" + a.attr("id") + "Clicked").removeClass("fn-hide");
        });
        c.page.processCertLink(b(".linkInXbox"));
        c.page.processExtensionLink(a.node(".install-extension-control"));
        c.page.processExtensionLink(a.node(".newCertControlDownloadLink"));
        new a.pop({
            targets: b(".showCertTip"),
            className: "ui-securitycore",
            width: 340,
            direction: "down"
        });
        "cashier" == h && b(".J-securitycoreMain [seed]").each(function(a, c) {
            var c = b(c), d = c.attr("seed");
            c.attr("seed", d + "_cashier");
        });
    };
}(window.light, light.node, alipay.security);

light.has("/alipay/security/core/visualTip") || function(a, b, c) {
    c.core.visualTip = function() {
        setTimeout(function() {
            if (light.node(".J-securitycoreTip").length) {
                var a = light.node(".J-securitycoreTip"), d = light.node(".J-checkResult", a), e = d.html(), d = "ui-form-item-" + (d.attr("data-status") || "success");
                light.node(".ui-form-item", a).removeClass("ui-form-item-loading").addClass(d);
                var f = function(d) {
                    light.node(".ui-form-explain", a).html(d);
                    c.page.processCertLink(b(".linkInXbox"));
                    c.page.processExtensionLink(light.node(".install-extension-control"));
                    c.page.processExtensionLink(b(".newCertControlDownloadLink"));
                };
                if (light.node(".J-security-cert-is-not-use").length) {
                    if (alipay.security.hasBrowserControlPolicy) {
                        var g = c.debug("security-core:visualTip");
                        g("开始检测是否安装数字证书控件，使用策略：" + alipay.security.certDataAccessPolicy + "，使用websocketPorts: " + alipay.security.websocketPorts + "，超时时间：" + alipay.security.controlCheckTimeout);
                        new alipay.security.Cert({
                            dataAccessPolicy: alipay.security.certDataAccessPolicy,
                            websocketPorts: alipay.security.websocketPorts,
                            timeout: alipay.security.controlCheckTimeout,
                            sid: alipay.security.sid
                        }).detect(function(a) {
                            a ? (g("没有检测到数字证书控件，visualTip提示安装控件：[" + a.code + "]" + a.message), a = c.newCertControlDownloadAddress, 
                            e = '尚未安装数字证书控件，您可以使用宝令进行校验 或 <a href="' + a + '" class="newCertControlDownloadLink" seed="AQ_CA_noPtaClick" target="_blank" data-xbox-href="' + a + '&_xbox=true&title=false"  data-xbox-title="数字证书控件提示">安装数字证书控件</a>。') : g("检测到数字证书控件，visualTip不提示安装控件");
                            f(e);
                        });
                    } else if (!c.pta.installed && !c.cdo.installed) {
                        var d = c.securityCenterServer + "/cert/downLoadCtrl.htm", h = c.securityCenterServer + "/cert/manage.htm", i = c.securityCenterServer + "/sc/chrome/extensionInstallDialogCert.htm", j = a.attr("data-link-in-xbox"), e = "true" == light.node(".J-securitycoreMain").attr("data-extension") ? '尚未安装数字证书控件，您可以使用宝令进行校验 或 <a href="' + i + '" class="install-extension-control" seed="AQ_CA_noPtaClick" target="_blank" data-href="' + i + '?_xbox=true" data-xbox-title="数字证书控件提示">安装数字证书控件</a>。' : '尚未安装数字证书控件，您可以使用宝令进行校验 或 <a href="' + (j ? d : h) + '" class="' + j + '" seed="AQ_CA_noPtaClick" target="_blank" data-href="' + h + '">安装数字证书控件</a>。';
                        f(e);
                    }
                } else f(e);
            }
        }, 2e3);
    };
}(window.light, light.node, alipay.security);

light.has("/alipay/security/core/base") || function(a, b, c) {
    var d, e = [];
    d = c.base = function(a) {
        if (a !== e) throw "invalid constructor, use create() instead.";
    };
    d.defaults = {
        errorMsg: "",
        rule: function(a) {
            return !light.trim(a).length ? !1 : !0;
        },
        itemClass: "ui-form-item",
        notifyClass: "ui-form-explain",
        errorClass: "ui-form-item-error",
        successClass: "ui-form-item-success",
        focusClass: "ui-form-item-focus"
    };
    d.create = function(a, b, c) {
        if (!a) throw "this security product not exist";
        var f = new a(e);
        f.__type = a;
        a.defaults = light.extend({}, d.defaults, a.defaults);
        f.options = light.extend({}, a.defaults, c);
        f.product = b;
        f.postInit();
        return f;
    };
    d.prototype = {
        postInit: function() {
            this.element = light.node("#" + this.product.options.id);
            this.parent = this.element.parent("." + this.options.itemClass);
            this.msg = this.parent.find("." + this.options.notifyClass);
            this.defaultMsg = this.element.attr("data-explain") || "";
            this.bind();
            light.track("sc_" + this.product.__type.Name);
        },
        bind: function() {
            var a = this;
            light.on(this.product.options.id, "focus", function() {
                a.afterValidate(!0);
            });
        },
        execute: function(a, b) {
            this.getValue(b);
            this.validate() ? a() : b.stoped = !0;
        },
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                a.params[b.options.paramName] = b.value;
            });
        },
        validate: function() {
            var a = this.options.rule;
            this.value == light.node(this.product.element).attr("placeholder") && (this.value = "");
            this.isValid = light.isFunction(a) ? a(this.value) : a.test(this.value);
            this.afterValidate(this.isValid);
            return this.isValid;
        },
        lock: function(a) {
            a && light.node(this.product.element).addClass("ui-input-unwrite").attr("disabled", !0);
        },
        afterValidate: function(a, b, c) {
            var d = this.options, b = b || d.errorMsg;
            this.lock(c);
            a ? (this.parent.removeClass(d.successClass).removeClass(d.errorClass), this.msg.html(this.defaultMsg)) : (this.parent.removeClass(d.successClass).addClass(d.errorClass), 
            this.msg.html(light.trim(b)));
        }
    };
}(window, light.page.ui.dialog, alipay.security.core);

light.has("/alipay/security/core/edit") || function(a, b) {
    var c;
    b.edit = c = light.deriveFrom(b.base, {
        postInit: function() {
            this.parent = light.node("#" + this.product.options.hidnId).parent("." + this.options.itemClass);
            this.msg = this.parent.find("." + this.options.notifyClass);
            this.defaultMsg = this.msg.html();
            this.bind();
            light.track("sc_" + this.product.__type.Name);
        },
        getValue: light.noop,
        execute: function(a, b) {
            var c = this, d = this.parent.find("input[name=J_aliedit_key_hidn]")[0].value, e = this.parent.find("input[name=J_aliedit_uid_hidn]")[0].value, f = this.parent.find("input[name=J_aliedit_using]")[0].value, g = this.parent.find("input[name=J_aliedit_prod_type]")[0].value;
            if (!this.product.options.useExtension && "true" == f && !alipay.security.edit.installed && !alipay.security.npedit.installed) alipay.security.edit.detect(), 
            b.stoped = !0; else this.product.onready(function() {
                light.get(d).value = c.value = this.getPassword();
                var h = c.parent.find("input[name=_seaside_gogo_]"), i = "";
                "true" == f && (i = this.getCi1(), h && (!h.val() && this.getCi1() && h.val(this.getCi1()), 
                i = h.val()));
                if (c.validate()) {
                    h = {
                        J_aliedit_key_hidn: d,
                        J_aliedit_uid_hidn: e,
                        J_aliedit_using: f,
                        netInfo: c.parent.find("input[name=J_aliedit_net_info]").val(),
                        _seaside_gogo_: "true" == f ? i : "",
                        security_activeX_enabled: alipay.security.activeXEnabled
                    };
                    h[d] = c.value;
                    h[e] = light.get(e).value;
                    var j;
                    if ("function" === typeof this.getKeySeq && null !== (j = this.getKeySeq())) h.ks = j;
                    c.ajaxData = light.extend({}, h);
                    c.ajaxData.ks = "";
                    c.ajaxData.netInfo = "";
                    c.ajaxData[g] = light.extend({}, h);
                    b.params = light.extend(b.params, c.ajaxData);
                    a();
                }
                b.stoped = !0;
            });
        },
        lock: light.noop,
        afterValidate: function(a, b, c) {
            this.parent.find("input[name=J_aliedit_key_hidn]");
            var d = this.parent.find("input[name=J_aliedit_prod_type]")[0].value, e = this.options, b = b || e.errorMsg[d];
            this.lock(c);
            a ? (this.parent.removeClass(e.successClass).removeClass(e.errorClass), this.msg.html(this.defaultMsg)) : (this.parent.removeClass(e.successClass).addClass(e.errorClass), 
            this.msg.html(light.trim(b)));
        }
    });
    c.defaults = {
        errorMsg: {
            payment_password: "请填写支付密码。",
            query_password: "请填写登录密码。",
            operation_password: "请填写操作密码。",
            risk_original_payment_password: "请填写支付密码。",
            risk_payment_password: "请填写支付密码。"
        }
    };
}(window, alipay.security.core);

light.has("/alipay/security/core/mobile") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            if (this.product.origin && "credible" == this.product.origin && !this.product.credibleValidate) {
                var c = this.product.credibleMobile;
                c.validateNum.call(c);
                b.stoped = !0;
            } else this.getValue(b), this.validate() ? a() : b.stoped = !0;
        },
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                a.params[b.options.paramName] = b.value;
                a.params.mobileAckCode = b.value.mobileAckCode;
            });
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /^\d{6}$/.test(a.mobileAckCode);
        }
    };
    b.mobile = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/ctuMobile") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            if (this.product.origin && "credible" == this.product.origin && !this.product.credibleValidate) {
                var c = this.product.credibleMobile;
                c.validateNum.call(c);
                b.stoped = !0;
            } else this.getValue(b), this.validate() ? a() : b.stoped = !0;
        },
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                a.params[b.options.paramName] = b.value;
                light.extend(a.params, b.value);
            });
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /^\d{6}$/.test(a.mobileAckCode);
        },
        paramName: "ctu_mobile"
    };
    b.ctuMobile = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/core/otp") || function(a) {
    var b = light.deriveFrom(a.base, {
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                a.params[b.options.paramName] = b.value;
                light.extend(a.params, b.value);
            });
        }
    });
    b.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /^\d{6}$/.test(a.otpPassword);
        },
        paramName: "otp"
    };
    a.otp = b;
}(alipay.security.core);

light.has("/alipay/security/core/baseCert") || function(a, b, c, d) {
    d.baseCert = a = light.deriveFrom(d.base, {
        bind: light.noop,
        getValue: light.noop,
        validate: light.noop,
        lock: light.noop,
        postInit: function() {
            var a = light.node(".J-securitycoreTip")[0] || light.node(".edit-section")[0] || light.node(".cert-section, .ukey-section, .thirdkey-section")[0];
            this.parent = light.node("." + this.options.itemClass, a);
            this.msg = this.parent.find("." + this.options.notifyClass);
            this.defaultMsg = (light.node(".J-checkResult", a)[0] || this.msg[0]).innerHTML;
            light.track("sc_" + this.product.__type.Name);
        },
        showMessage: function(a, b) {
            var c = this.options.label, d = "";
            "ukey" == this.product.__type.Name && (d = ', <a href="' + this.product.exeDownloadUrl + '">立即安装</a>');
            this.afterValidate(!1, {
                noPta: '您的电脑还未装控件，请<a href="' + this.product.__type.info.downloadUrl + '">立即安装</a>，安装后请刷新或重启浏览器。',
                noKey: "没有检测到您的" + c + "，请插入后重试或请尝试安装驱动" + d,
                keyError: c + "出现异常" + (b ? "，错误代码：" + b.number : "")
            }[a]);
        }
    });
    a.defaults = {
        paramName: "signedData"
    };
    d.cert = light.deriveFrom(a, {
        execute: function(a, b) {
            b.params[this.options.paramName] = {
                singedData: "cert"
            };
            light.extend(b.params, {
                singedData: "cert"
            });
            a();
        }
    });
    d.cert.defaults = light.extend({}, a.defaults, {
        label: "数字证书",
        paramName: "cert"
    });
    d.ukey = light.deriveFrom(a, {
        execute: function(a, b) {
            if (this.product.__type.installed) {
                var d = this;
                this.product.onready(function() {
                    if (c.cdo.installed && this.cmd) {
                        var e = this;
                        this.handlers["*"] = function(a) {
                            d.showMessage.call(d, "keyError", a);
                            b.stoped = !0;
                        };
                        this.handlers[12004] = function(a) {
                            d.showMessage.call(d, "noKey", a);
                            b.stoped = !0;
                        };
                        this.execute(light.unescapeHTML(this.cmd), function(c) {
                            d.certCmdOutput = c.rawData;
                            b.stoped || (d.certCmdOutput ? (light.get(e.id).value = d.certSign, b.params[d.options.paramName] = {
                                certCmdOutput: d.certCmdOutput
                            }, light.extend(b.params, {
                                certCmdOutput: d.certCmdOutput
                            }), d.afterValidate(!0), a()) : (d.showMessage("noKey"), b.stoped = !0));
                        });
                    } else this.handlers["*"] = function(a) {
                        d.showMessage.call(d, "keyError", a);
                        b.stoped = !0;
                    }, this.handlers["-2147483135"] = this.handlers["-2146434962"] = function() {
                        b.stoped = !0;
                    }, d.certSign = this.sign(this.src, this.certSn, this.issuerDn, "", this.subjectCN), 
                    b.stoped || (d.certSign ? (light.get(this.id).value = d.certSign, b.params[d.options.paramName] = {
                        signedData: d.certSign
                    }, light.extend(b.params, {
                        signedData: d.certSign
                    }), d.afterValidate(!0), a()) : (d.showMessage("noKey"), b.stoped = !0));
                });
            } else this.showMessage("noPta"), b.stoped = !0;
        }
    });
    d.ukey.defaults = light.extend({}, a.defaults, {
        label: "支付盾",
        paramName: "ukey"
    });
    d.thirdkey = light.deriveFrom(a, {
        execute: function(a, b) {
            if (this.product.__type.installed) {
                var c = this;
                this.product.onready(function() {
                    this.handlers["*"] = function(a) {
                        c.showMessage.call(c, "keyError", a);
                        b.stoped = !0;
                    };
                    this.handlers["-2147483135"] = this.handlers["-2146434962"] = function() {
                        b.stoped = !0;
                    };
                    c.certSign = this.sign(this.src, this.certSn, this.issuerDn, "", this.subjectCN);
                    b.stoped || (c.certSign ? (light.get(this.id).value = c.certSign, b.params[c.options.paramName] = {
                        signedData: c.certSign
                    }, light.extend(b.params, {
                        signedData: c.certSign
                    }), c.afterValidate(!0), a()) : (c.showMessage("noKey"), b.stoped = !0));
                });
            } else this.showMessage("noPta"), b.stoped = !0;
        }
    });
    d.thirdkey.defaults = light.extend({}, a.defaults, {
        label: "U盾",
        paramName: "thirdkey"
    });
}(window, light.page.ui.dialog, alipay.security, alipay.security.core);

light.has("/alipay/security/core/riskMobileBank") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            this.getValue(b);
            this.validate() ? a() : b.stoped = !0;
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /\d{6}/.test(a.mobileAckCode);
        },
        paramName: "risk_mobile_bank"
    };
    b.riskMobileBank = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/riskMobileAccount") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            this.getValue(b);
            this.validate() ? a() : b.stoped = !0;
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /\d{6}/.test(a.mobileAckCode);
        },
        paramName: "risk_mobile_account"
    };
    b.riskMobileAccount = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/riskOriginalAccountMobile") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            this.getValue(b);
            this.validate() ? a() : b.stoped = !0;
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /\d{6}/.test(a.mobileAckCode);
        },
        paramName: "risk_original_account_mobile"
    };
    b.riskOriginalAccountMobile = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/core/riskOriginalSecurityQa") || function(a) {
    var b = light.deriveFrom(a.base, {});
    b.defaults = {
        errorMsg: "请填写答案。",
        rule: function(a) {
            return /\S+/.test(a.securityAnswer);
        },
        paramName: "risk_original_security_qa"
    };
    a.riskOriginalSecurityQa = b;
}(alipay.security.core);

light.has("/alipay/security/core/riskMobileCredit") || function(a, b) {
    var c = light.deriveFrom(b.base, {
        execute: function(a, b) {
            this.getValue(b);
            this.validate() ? a() : b.stoped = !0;
        }
    });
    c.defaults = {
        errorMsg: "请输入6位数字校验码。",
        rule: function(a) {
            return /\d{6}/.test(a.mobileAckCode);
        },
        paramName: "risk_mobile_credit"
    };
    b.riskMobileCredit = c;
}(window, alipay.security.core);

light.has("/alipay/security/core/core/riskCertificate") || function(a) {
    var b = light.deriveFrom(a.base, {});
    b.defaults = {
        errorMsg: "请填写证件的最后6位。",
        rule: function(a) {
            return /^.{6}$/.test(a.inputCertificateNo);
        },
        paramName: "risk_certificate"
    };
    a.riskCertificate = b;
}(alipay.security.core);

light.has("/alipay/security/core/core/riskSecurityQa") || function(a) {
    var b = light.deriveFrom(a.base, {});
    b.defaults = {
        errorMsg: "请填写答案。",
        rule: function(a) {
            return /\S+/.test(a.securityAnswer);
        },
        paramName: "risk_security_qa"
    };
    a.riskSecurityQa = b;
}(alipay.security.core);

light.has("/alipay/security/core/riskExpressPrivacy") || function(a) {
    var b;
    light.deriveFrom(a.base, {});
    a.baseRiskExpressPrivacy = b = light.deriveFrom(a.base, {
        errorMsg: "请填写正确的银行卡号。",
        rule: function(a) {
            return /^\d{1,30}$/.test(a);
        },
        paramName: "risk_express_privacy",
        validate: function() {
            var a = this.rule, b = light.node(this.element), c = b.attr("placeholder");
            this.value = b.val().replace(/\D/g, "");
            this.value == c && (this.value = "");
            this.isValid = light.isFunction(a) ? a(this.value) : a.test(this.value);
            this.afterValidate(this.isValid, this.errorMsg);
            return this.isValid;
        },
        execute: function(a, b) {
            this.validate() || (b.stoped = !0);
            if (!b.stoped) {
                var c = this;
                this.product.queryValue(function(d) {
                    if (d.message) c.afterValidate(false, d.message); else {
                        b.params[c.paramName] = d;
                        c.afterValidate(true);
                        a();
                    }
                });
            }
        }
    });
    a.riskExpressPrivacy = light.deriveFrom(b, {});
}(alipay.security.core);

light.has("/alipay/security/core/core/riskSudoku") || function(a) {
    var b = light.deriveFrom(a.base, {
        postInit: function() {
            var a = this;
            this.product.onready(function() {
                a.element = a.product.element;
                a.parent = a.element.parent("." + a.options.itemClass);
                a.msg = a.parent.find("." + a.options.notifyClass);
                a.defaultMsg = a.element.attr("data-explain") || "";
                a.bind();
            });
            light.track("sc_" + this.product.__type.Name);
        },
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                var c = [], d = this.letters;
                light.each(b.value.split(""), function(a, b) {
                    c.push(d[b]);
                });
                a.params[this.options.paramName] = {
                    index: c
                };
            });
        },
        bind: function() {
            var a = this, b = light.node("table tr td a", this.product.keyboard);
            light.each(b, function(b, c) {
                light.on(c, "click", function(b) {
                    b.cancel();
                    a.afterValidate(!0);
                });
            });
        },
        afterValidate: function(a, b, c) {
            var d = this.options, b = b || d.errorMsg, e = this.element.parent(".input-container");
            explain = e.find("." + this.options.notifyClass);
            this.lock(c);
            a ? (e.removeClass(d.successClass).removeClass(d.errorClass), explain.html(this.defaultMsg)) : (e.removeClass(d.successClass).addClass(d.errorClass), 
            explain.html(light.trim(b)));
        }
    });
    b.defaults = {
        errorMsg: "请点击左侧输入校验码。",
        rule: function(a) {
            return !!a;
        }
    };
    a.riskSudoku = b;
}(alipay.security.core);

light.has("/alipay/security/core/core/riskOneKeyConfirm") || function(a) {
    var b = light.deriveFrom(a.base, {
        postInit: function() {
            var a = this;
            this.product.onready(function() {
                a.element = a.product.element;
                a.parent = a.element.parent();
                a.msg = a.parent.find("." + a.options.notifyClass);
                a.defaultMsg = a.element.attr("data-explain") || "";
                a.bind();
            });
            light.track("sc_" + this.product.__type.Name);
        },
        getValue: function() {
            var a = this;
            this.product.render(function() {
                a.value = this.getValue();
            });
        }
    });
    b.defaults = {
        errorMsg: "请先在支付宝钱包确认后再提交。",
        rule: function(a) {
            return a;
        },
        paramName: "risk-onekey-confirm"
    };
    a.riskOneKeyConfirm = b;
}(alipay.security.core);

light.has("/alipay/security/core/core/checkCode") || function(a) {
    var b = light.deriveFrom(a.base, {
        getValue: function(a) {
            var b = this;
            this.product.render(function() {
                b.value = this.getValue();
                a.params[b.options.paramName] = b.value;
                light.extend(a.params, b.value);
            });
        }
    });
    b.defaults = {
        errorMsg: "请正确填写校验码。",
        rule: function(a) {
            return /^[a-zA-Z0-9]{4}$/.test(a.check_code);
        },
        paramName: "checkcode"
    };
    a.checkCode = b;
}(alipay.security.core);

light.has("/alipay/security/core/core/rds") || function(a) {
    var b = light.deriveFrom(a.base, {
        afterValidate: function() {}
    });
    b.defaults = {
        paramName: "rds",
        rule: function() {
            return !0;
        }
    };
    a.rds = b;
}(alipay.security.core);

light.has("/alipay/security/core/core/barcode") || function(a) {
    var b = light.deriveFrom(a.base, {
        postInit: function() {
            var a = this;
            this.product.onready(function() {
                a.element = a.product.element;
                a.parent = a.element.parent("." + a.options.itemClass);
                a.msg = a.parent.find("." + a.options.notifyClass);
                a.defaultMsg = a.element.attr("data-explain") || "";
                a.bind();
            });
            light.track("sc_" + this.product.__type.Name);
        },
        getValue: function() {
            var a = this;
            this.product.render(function() {
                a.value = this.getValue();
            });
        }
    });
    b.defaults = {
        errorMsg: "请扫描二维码后，再提交。",
        rule: function(a) {
            return a;
        },
        paramName: "barcode"
    };
    a.barcode = b;
}(alipay.security.core);

!function(a) {
    function b(a) {
        this.product = a;
        this.parent = light.node("#" + a.options.id).parent("." + this.options.itemClass);
        this.msg = this.parent.find("." + this.options.notifyClass);
        var b = this;
        a.onReady(function() {
            this.gettable && this.sensor.collectInfo();
            if (this.renderer.input) light.on(this.renderer.input.options.id, "focus", function() {
                b.afterValidate(!0);
            });
        });
    }
    b.prototype = {
        product: null,
        options: {
            itemClass: "ui-form-item",
            notifyClass: "ui-form-explain",
            errorClass: "ui-form-item-error",
            successClass: "ui-form-item-success",
            focusClass: "ui-form-item-focus"
        },
        errorMsg: {
            payment_password: "请填写支付密码。",
            query_password: "请填写登录密码。",
            operation_password: "请填写操作密码。",
            risk_original_payment_password: "请填写支付密码。",
            risk_payment_password: "请填写支付密码。"
        },
        execute: function(a, b) {
            var c = this;
            this.product.onReady(function() {
                if (this.renderable) {
                    var d = this.getPassword();
                    if (d) {
                        var e = c.parent.find("input[name=J_aliedit_key_hidn]")[0].value, f = c.parent.find("input[name=J_aliedit_uid_hidn]")[0].value;
                        c.parent.find("input[name=J_aliedit_using]");
                        var g = c.parent.find("input[name=J_aliedit_prod_type]")[0].value, h = {
                            J_aliedit_key_hidn: e,
                            J_aliedit_uid_hidn: f,
                            J_aliedit_using: !0
                        };
                        h[e] = d;
                        h[f] = light.get(f).value;
                        this.renderer.input && this.renderer.input.options.useKS && (h.ks = this.renderer.input.getKeySeq());
                        try {
                            new ActiveXObject("htmlfile"), h.security_activeX_enabled = !0;
                        } catch (i) {
                            h.security_activeX_enabled = !1;
                        }
                        if (this.gettable) this.sensor.onCollectComplete(function(c, d) {
                            c || (h.netinfo = d.netinfo || "", h._seaside_gogo_ = d.ci1 || "");
                            b.params[g] = h;
                            a();
                        }); else b.params[g] = h, a();
                    } else c.afterValidate(!1), b.stoped = !0;
                } else this.renderer.showInstallDialog(), b.stoped = !0;
            });
        },
        afterValidate: function(a, b) {
            var c = this.options, b = b || this.errorMsg[this.product.options.prodType];
            a ? (this.parent.removeClass(c.successClass).removeClass(c.errorClass), this.msg.html(this.defaultMsg)) : (this.parent.removeClass(c.successClass).addClass(c.errorClass), 
            this.msg.html(light.trim(b)));
        }
    };
    a.Password = b;
}(alipay.security.core);