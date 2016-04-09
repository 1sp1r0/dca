try {
    var NTU0ZjBlMQ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        MjA0MzVjZGY = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1],
        Nzk0YzFjNWE = function(a) {
            var b,
                c, d, g, i, m;
            d = a.length;
            c = 0;
            for (b = ""; c < d;) {
                g = a.charCodeAt(c++) & 255;
                if (c == d) {
                    b += NTU0ZjBlMQ.charAt(g >> 2);
                    b += NTU0ZjBlMQ.charAt((g & 3) << 4);
                    b += "==";
                    break
                }
                i = a.charCodeAt(c++);
                if (c == d) {
                    b += NTU0ZjBlMQ.charAt(g >> 2);
                    b += NTU0ZjBlMQ.charAt((g & 3) << 4 | (i & 240) >> 4);
                    b += NTU0ZjBlMQ.charAt((i & 15) << 2);
                    b += "=";
                    break
                }
                m = a.charCodeAt(c++);
                b += NTU0ZjBlMQ.charAt(g >> 2);
                b += NTU0ZjBlMQ.charAt((g & 3) << 4 | (i & 240) >> 4);
                b += NTU0ZjBlMQ.charAt((i & 15) << 2 | (m & 192) >> 6);
                b += NTU0ZjBlMQ.charAt(m & 63)
            }
            return b
        },
        M2I4ZmFiMmI = function(a) {
            var b, c, d, g, i;
            g = a.length;
            d = 0;
            for (i = ""; d < g;) {
                do b = MjA0MzVjZGY[a.charCodeAt(d++) & 255]; while (d < g && -1 == b);
                if (-1 == b) break;
                do c = MjA0MzVjZGY[a.charCodeAt(d++) & 255]; while (d < g && -1 == c);
                if (-1 == c) break;
                i += String.fromCharCode(b << 2 | (c & 48) >> 4);
                do {
                    b = a.charCodeAt(d++) & 255;
                    if (61 == b) return i;
                    b = MjA0MzVjZGY[b]
                } while (d < g && -1 == b);
                if (-1 == b) break;
                i += String.fromCharCode((c & 15) << 4 | (b & 60) >> 2);
                do {
                    c = a.charCodeAt(d++) & 255;
                    if (61 == c) return i;
                    c = MjA0MzVjZGY[c]
                } while (d < g && -1 == c);
                if (-1 == c) break;
                i += String.fromCharCode((b & 3) << 6 | c)
            }
            return i
        },
        MTU2MzI1MzQ = function(a) {
            for (var b,
                    c = [], d = 0, g = 0; g < a.length; g++) b = a.charCodeAt(g), c[d++] = b & 255;
            return c
        },
        NWJlZmZlMA = function(a) {
            for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
            return b
        },
        NzE5MTIwZWQ = function(a) {
            return MTU2MzI1MzQ(M2I4ZmFiMmI(a))
        },
        NzMwY2I0Y2U = function(a) {
            N2Q5ZmIxMQ = "";
            if ("string" === typeof a) return eval(a);
            for (var b = 0; b < a.length; b++) N2Q5ZmIxMQ += String.fromCharCode(a[b]);
            return MWM1NzA5MWQ = eval(N2Q5ZmIxMQ)
        },
        NTczOGEyMDM = [119, 105, 110, 100, 111, 119],
        NDY4MmM0OTM = NzMwY2I0Y2U(NTczOGEyMDM),
        MTIwNTJlOGE = [101, 110, 99, 111,
            100, 101, 85, 82, 73, 67, 111, 109, 112, 111, 110, 101, 110, 116
        ],
        NTcwZTBmNmQ = function(a, b) {
            a < b && (a ^= b, b ^= a, a ^= b);
            for (; 0 != b;) var c = a % b,
                a = b,
                b = c;
            return a & 255
        },
        MzNmNTNiNTg = function(a, b, c) {
            return 255 & c * NTcwZTBmNmQ(a, b)
        },
        Mjg2OGQyY2Q = function(a, b) {
            return (a ^ b & 255) & 255
        },
        NWQ1NTMwMDU = function(a) {
            a &= 255;
            return (a >> 4 & 15 | a << 4) & 255
        },
        NWM0YzZmOTE = function(a) {
            a &= 255;
            a = a & 240 | (a >> 4 & 15 ^ a) & 15;
            return (a >> 1 & 85 | a << 1 & 170) & 255
        },
        NjliYTc1NGQ = function(a) {
            return (126 ^ a & 255) & 255
        },
        MzI3ZDM5YmU = function(a) {
            return (a ^ 120) & 255
        },
        MmViYWVmMjE = function(a) {
            return a +
                35 & 255
        },
        NGNkMTc5NTE = function(a) {
            return a + 22 & 255
        },
        NGMyYzIzNGE = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = (a[b] >> 4 & 15 | a[b] << 4) & 255;
            return a
        },
        MWYyZWEwY2Q = NGMyYzIzNGE,
        Nzc4ZmRiNg = function(a) {
            for (var b = NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("64bx3KjEsdmo0/SU5w=="))), c = 0; c < a.length; c++) a[c] ^= b.charCodeAt(c % b.length) & 255, a[c] &= 255;
            return a
        },
        MTM0ZWZiMjc = Nzc4ZmRiNg,
        Mzc5NmEwZDc = [0, MzI3ZDM5YmU(121), 3, MzI3ZDM5YmU(127), 15, NWM0YzZmOTE(45), MzNmNTNiNTg(89, 47, 63), MmViYWVmMjE(92), 255],
        M2Y4YjdlNjY = function(a) {
            for (var b,
                    c = 0; c < a.length; c++) b = c % 8, a[c] = a[c] >> 8 - b & Mzc5NmEwZDc[b] | a[c] << b, a[c] &= 255, a[c] += 1, a[c] &= 255;
            return a
        },
        NmIxYzZjZTI = function(a) {
            for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256;
            return a
        },
        MTQ2ZDJkN2E = NmIxYzZjZTI,
        MjVjMWMxYjk = function(a) {
            for (var b = 102, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^= b, b = c, a[d] &= 255;
            return a
        },
        NDM1MjlhNGQ = function(a) {
            for (var b = 201, c = 0; c < a.length; c++) b = (b << 4 ^ b) & 240 | b >> 4 & 15, a[c] = (a[c] ^ b) & 255;
            return a
        },
        OTgyNmNi = NDM1MjlhNGQ,
        MmRhNjRhMWI = function(a) {
            for (var b = 0; b < a.length; b++) a[b] ^=
                (a[b] ^ 234) >> 4 & 15, a[b] &= 255;
            return a
        },
        NmM4OWU0NTQ = MmRhNjRhMWI,
        NzE5NDQ1OTg = function(a) {
            for (var b = 203, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] = (a[d] ^ b) & 255, b = c;
            return a
        },
        Mzk0OGVjMQ = function(a) {
            for (var b = 212, c = 0, d = 0, g = 0; g < a.length; g++) {
                for (var i = c = 0; 8 > i; i++) c |= b & 1 << i, d = (b & 32) << 2 ^ (b & 4) << 5, b = d | b >> 1 & 127;
                a[g] = (a[g] ^ c) & 255
            }
            return a
        },
        Mzk3OWY2NGM = Mzk0OGVjMQ,
        MmQyMTJiN2U = function(a) {
            for (var b = 0, c = 0; c < a.length; c++) b = a[c] & 240 | (a[c] >> 4 & 15 ^ a[c]) & 15, a[c] = (b >> 1 & 85 | b << 1 & 170) & 255;
            return a
        },
        NmMzNzYwY2Y = MmQyMTJiN2U,
        MTczZGYyYzY =
        function(a) {
            for (var b = 0, c = 0; c < a.length; c++) b = a[c] - 2 & 255, a[c] = (b >> 4 & 15 | b << 4) & 255;
            return a
        },
        MzkzYWY2YWQ = function(a) {
            for (var b = NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("QCxYdAdkFn8Pe106Tg=="))), c = 0; c < a.length; c++) a[c] ^= b.charCodeAt((c + 1) % b.length) & 255, a[c] &= 255;
            return a
        },
        N2M1NGFhMjc = MzkzYWY2YWQ,
        NmI4N2QyMjA = function(a) {
            for (var b = NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("OMBLzw2kjuaIa9dYlw=="))), c = 0; c < a.length; c++) a[c] ^= b.charCodeAt((c + 2) % b.length) & 255, a[c] &= 255;
            return a
        },
        NTdjYWZjNWI = NmI4N2QyMjA,
        NTY4MzBhNTA = function(a) {
            for (var b =
                    NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("aq24cLentq20uGqruA=="))), c = 0; c < a.length; c++) a[c] ^= b.charCodeAt((c + 1) % b.length) & 255, a[c] &= 255;
            return a
        },
        N2FmNjU2YQ = NTY4MzBhNTA,
        MzU1NDg2Mzg = function(a) {
            for (var b = NWJlZmZlMA(NWE4YmJkMWE(NzE5MTIwZWQ("T2AWI1Y7TzhKOBx5Dw=="))), c = 0; c < a.length; c++) a[c] ^= b.charCodeAt((c + 1) % b.length) & 255, a[c] &= 255;
            return a
        },
        NTNjZjE5OTg = MzU1NDg2Mzg,
        Nzg5ZjQzZTc = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = a[b] - 67 & 255;
            return a
        },
        Njk5ODhmYmM = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = a[b] - 68 &
                255, 0 > a[b] && (a[b] -= 1), a[b] &= 255;
            return a
        },
        NDNkYmUzZA = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = a[b] - 67 & 255, 0 > a[b] && (a[b] -= 1), a[b] &= 255;
            return a
        },
        NzYwYzMyNzg = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = a[b] - 68 & 255, 0 > a[b] && (a[b] += 1), a[b] &= 255;
            return a
        },
        Mzk3ZWI0Mzg = function(a) {
            for (var b = 53, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256 + 1;
            return a
        },
        YTNlYzI5Yg = Mzk3ZWI0Mzg,
        NDBhMzg2Mjg = function(a) {
            for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b, a[c] &= 255, b = b * c % 256 + 1;
            return a
        },
        M2QzYzYxYWQ = NDBhMzg2Mjg,
        MzFmZDkwN2M =
        function(a) {
            for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b + 1, a[c] &= 255, b = b * c % 256;
            return a
        },
        NDI3MTllYmE = MzFmZDkwN2M,
        NTIxMmM0YTE = function(a) {
            for (var b = 54, c = 0; c < a.length; c++) a[c] ^= b + 2, a[c] &= 255, b = b * c % 256;
            return a
        },
        MTUwN2MwYjY = NTIxMmM0YTE,
        NmI5NTMwMWM = function(a) {
            for (var b = 102, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^= b + 1, a[d] &= 255, b = c;
            return a
        },
        N2QyZmE2OTY = function(a) {
            for (var b = 103, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^= b + 1, b = c, a[d] &= 255;
            return a
        },
        NWE4YmJkMWE = function(a) {
            for (var b = 103, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] ^=
                b + 2, b = c, a[d] &= 255;
            return a
        },
        NzZlODlhNDE = function(a) {
            for (var b = 201, c = 0; c < a.length; c++) b = (b << 4 ^ b + 1) & 240 | b >> 4 & 15, a[c] = (a[c] ^ b) & 255;
            return a
        },
        NDViMzg3Y2Q = NzZlODlhNDE,
        NzkxNzUwMWU = function(a) {
            for (var b = 201, c = 0; c < a.length; c++) b = ((b << 4 ^ b) & 240 | b >> 4) + 1, a[c] = (a[c] ^ b) & 255;
            return a
        },
        NTcyNmE2ZWY = NzkxNzUwMWU,
        NzEyOTk4ODU = function(a) {
            for (var b = 203, c = 0; c < a.length; c++) b = (b << 4 ^ b + 1) & 240 | b >> 4 & 15, a[c] = (a[c] ^ b) & 255;
            return a
        },
        ODk1NDJjZg = NzEyOTk4ODU,
        NmE0YTgyZjk = function(a) {
            for (var b = 203, c = 0; c < a.length; c++) b = (b << 4 ^ b) & 240 | b +
                1 >> 4 & 15, a[c] = (a[c] ^ b) & 255;
            return a
        },
        NGNhOWRkZDM = NmE0YTgyZjk,
        NjZmOTM1MTg = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = ((a[b] ^ 235) >> 4 & 15 ^ a[b]) & 255;
            return a
        },
        NDcyMTgzMTA = NjZmOTM1MTg,
        MWIwNjYxNDM = function(a) {
            for (var b = 0; b < a.length; b++) a[b] = ((a[b] ^ 195) >> 4 & 15 ^ a[b]) & 255;
            return a
        },
        MTdmNWQ5NGQ = MWIwNjYxNDM,
        NzRiMjU3MA = function(a) {
            for (var b = 205, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] = (a[d] ^ b) & 255, b = c - 1;
            return a
        },
        MzBhZThiMmI = function(a) {
            for (var b = 205, c = 0, d = 0; d < a.length; d++) c = a[d], a[d] = (a[d] ^ b) & 255, b = c + 1;
            return a
        };
    (function(a) {
        function b(b,
            q) {
            this.bid = b;
            u(this.options, q);
            var r, d;
            r = Array.prototype.forEach;
            d = Array.prototype.map;
            this.sender = new c({
                useCORS: !1,
                iframeName: NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("HduiDNayI9OuCt6oGeiiGA=="))),
                dataKey: NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("U2d7"))),
                dataReiveURL: this.options.server
            });
            p.init({
                id: NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("BmsFdhZuC2kcdBZyGn/mi+2d9g=="))),
                url: NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("doVLkw3906CRMZBTig6mheCadZRclw3pn+CVMJgQhh2qkujXbIZZzEz3zbrILt5bhgiun+qRe99MlBg="))),
                flashReadyCallback: NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("eW5rcmN7Rmd0a2FnS0ZEbmNxalBnY2Z7"))),
                timeout: this.options.flash_timeout
            });
            this.storage = new g;
            this.each = function(a, b, n) {
                if (null !== a)
                    if (r && a.forEach === r) a.forEach(b, n);
                    else if (a.length === +a.length)
                    for (var c = 0, q = a.length; c < q && b.call(n, a[c], c, a) !== {}; c++);
                else
                    for (c in a)
                        if (a.hasOwnProperty(c) && b.call(n, a[c], c, a) === {}) break
            };
            this.map = function(a, b, n) {
                var c = [];
                if (null == a) return c;
                if (d && a.map === d) return a.map(b, n);
                this.each(a, function(a, q, r) {
                    c[c.length] = b.call(n, a, q, r)
                });
                return c
            };
            var f = this;
            w(a, function() {
                try {
                    f.get()
                } catch (a) {}
            })
        }

        function c(a) {
            this.extend(this.options,
                a || {})
        }

        function d(a, b, c) {
            var d = Array.prototype.forEach;
            if (d && a.forEach === d) d.call(a, b, c);
            else if (a.length === +a.length)
                for (var d = 0, f = a.length; d < f; d++) b.call(c, a[d], d, a);
            else
                for (f in a) a.hasOwnProperty(f) && b.call(c, a[f], f, a)
        }

        function g() {
            this.init()
        }

        function i() {
            this.queue = []
        }

        function m() {
            var a = document.createElement(NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("OPy/"))));
            a.style.position = NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("HdW4E9u+CNI=")));
            a.style.right = NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("Bg==")));
            a.style.bottom =
                NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("TA==")));
            a.style.width = NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("/I32")));
            a.style.height = NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("Pntz")));
            a.style.lineHeight = NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("EweH")));
            a.style.overflow = NWJlZmZlMA(NzYwYzMyNzg(NzE5MTIwZWQ("rK2oqKmy")));
            return a
        }

        function u(a, b) {
            if (b)
                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
        }

        function x(a) {
            var a = a || 32,
                b = NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("isiLz4rMi8OKwIvHisSL24rYi9+K3IvTitCx07DUsdew2LHbsNyx37DAscOwxLHHsMixy/vK+Mv/yvzL88o="))),
                c = b.length,
                d = "";
            for (NzA3NDgzM2M = 0; NzA3NDgzM2M < a; NzA3NDgzM2M++) d += b.charAt(Math.floor(Math.random() * c));
            return d
        }

        function w(a, b) {
            var c = !1,
                d = !0,
                f = a.document,
                h = f.documentElement,
                j = f.addEventListener,
                g = j ? NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("V2RkRXZlbnRMaXN0ZW5lcg=="))) : NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("qt6qy6jAhfOW+Iw="))),
                v = j ? NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("bJRSjAiiufmdcYVzig2zmeGdbQ=="))) : NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("epRLgh2vufmdcYU="))),
                i = j ? "" : NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("WW4="))),
                k = function(d) {
                    if (!(d.type == NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("FXMVcgp4DW8EYAJrDWAGYg=="))) && f.readyState != NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("p7OxtLCpuKk=")))) && ((d.type == NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("sLOlqA=="))) ? a : f)[v](i + d.type, k, !1), !c && (c = !0))) b.call(a, d.type || d)
                },
                l = function() {
                    try {
                        h.doScroll(NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("ZG1ufQ=="))))
                    } catch (a) {
                        setTimeout(l, 50);
                        return
                    }
                    k(NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("SG1ubg=="))))
                };
            if (f.readyState == NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("Vm5vdXwkMsA=")))) b.call(a,
                NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("r6S9vA=="))));
            else {
                if (!j && h.doScroll) {
                    try {
                        d = !a.frameElement
                    } catch (m) {}
                    d && l()
                }
                f[g](i + NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("Im0gYwxiFnMdaSVKK08qTg=="))), k, !1);
                f[g](i + NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("v9u73qTQu9uuyKTLq8Skxg=="))), k, !1);
                a[g](i + NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("r7Kkpw=="))), k, !1)
            }
        }
        var k = a.navigator,
            l = a.document,
            s = a.screen;
        b.prototype = {
            cid_key: NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("rMGr3LzEocGryA=="))),
            options: {
                server: NWJlZmZlMA(NWE4YmJkMWE(NzE5MTIwZWQ("AXcNf/LO/y5FKkUjVSVILh5BL1gqTTYWexJ5VDFSIEopWXUfVTo="))),
                h_params: NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("VmZWZlZmVg=="))),
                flash_timeout: 3E3
            },
            get: function() {
                var a = (new Date).getTime(),
                    b = p.getFlashInfo(),
                    c = {
                        ce: k.cookieEnabled ? MmViYWVmMjE(-34) : 0,
                        fe: b.enabled ? MmViYWVmMjE(-34) : 0,
                        fv: b.version,
                        dt: k.platform,
                        cpu: k.cpuClass || "",
                        bl: k.language || k.userLanguage || "",
                        tz: this.getTimezone(),
                        sr: this.getResolution(),
                        pl: this.getPluginList(),
                        cd: this.getCanvasFingerprint(),
                        wi: "",
                        cid: "",
                        bid: this.bid,
                        hv: "",
                        hid: "",
                        tt: "",
                        ht: ""
                    };
                c[NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("tqyn")))] = this.softID(c);
                this.isCanvasSupported() && (c[NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("pqc=")))] = this.murmurhash3_32_gc(c[NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("p6g=")))], MzNmNTNiNTg(53, 3, 31)));
                b = (new Date).getTime();
                this.getHID(c, this.hparams(this.options.h_params));
                c[NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("pdI=")))] = (new Date).getTime() - b;
                var d = this;
                (new i).add(this.getWebRTCID, this, c).add(this.getInfoByFlash, this, c).add(this.getCID, this, c).done(function() {
                    c[NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("uLg=")))] = (new Date).getTime() -
                        a;
                    d.sender.send(d.stringify(c))
                }, this)
            },
            getFlashInfo: function() {
                return p.getFlashInfo()
            },
            hparams: function(a) {
                var b, c = NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("RQ=="))),
                    d = 1200;
                if (a) {
                    var f = a.split(NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("kg=="))));
                    1 < f.length && (a = f[0], parseInt(f[NjliYTc1NGQ(127)]) && (d = parseInt(f[Mjg2OGQyY2Q(-113, -114)])));
                    if (a && 0 < (b = a.length)) {
                        for (f = 0; f < b; f++) a[f] !== NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("PQ=="))) && (c += NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("6YE="))) + (f + NGNkMTc5NTE(-21)) + NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("ZW8="))));
                        c !== NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("bQ=="))) && (c = c.slice(0, -1))
                    }
                }
                return [c + NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("kA=="))), d]
            },
            getHID: function(a, b) {
                try {
                    var c = this.getControlObject();
                    if (c) {
                        var d = NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("vmWmsrCwpLGnZX1jZbmotbassrFlwA=="))),
                            f = NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("v2ans7GxpbKoZn5mqK2oZnBmtKW2pbG3Zn4="))) + b[0] + NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("cGa4rbGps7m4Zn4="))) + b[Mjg2OGQyY2Q(91, 90)] + NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("dA=="))),
                            h = /"out":"([^"]+)"/,
                            j;
                        NzZiNmM5ZDU =
                            c.GetInfo(d).replace(/\\"/g, NWJlZmZlMA(N2QyZmE2OTY(NzE5MTIwZWQ("Tw=="))));
                        NWMwZDdiOTU = c.GetInfo(f).replace(/\\"/g, NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("6g=="))));
                        if (j = h.exec(NWMwZDdiOTU)) a[NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("hpZG")))] = j[NjliYTc1NGQ(127)].replace(/'/g, NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("kbI=")))).replace(/\\n/g, NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("xw=="))));
                        if (j = h.exec(NzZiNmM5ZDU)) a[NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("pdI=")))] = j[NGNkMTc5NTE(-21)].replace(/'/g, NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("kbA="))))
                    }
                } catch (g) {}
            },
            getControlObject: function() {
                try {
                    return new ActiveXObject(NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("EseKEN6CEtK/NNKqEMOjUuSuH/SjGdSg"))))
                } catch (a) {
                    var b = m();
                    document.body.appendChild(b);
                    b.innerHTML = NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("Ck9CSkVDVCB0eXBlPSJhcHBsaWNhdGlvbi94LWFsaWluZXRoZWFsdGgtcGx1Z2luIj48L09CSkVDVD4=")));
                    return b.firstChild
                }
            },
            getInfoByFlash: function(a, b) {
                p.getFlashIns(function(c) {
                    if (c) try {
                        b[NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("Gti4")))] = c.getCapability(NWJlZmZlMA(MzFmZDkwN2M(NzE5MTIwZWQ("WHI=")))),
                            b[NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("Am4=")))] = c.getCapability(NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("V3dKZGIlMcT2RG7Ma0DM6ak=")))) === NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("EmAVcA=="))) ? NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("CA=="))) : NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("dA=="))), b[NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("AWESZg==")))] = c.getCapability(NWJlZmZlMA(NzYwYzMyNzg(NzE5MTIwZWQ("p7S5hbanrK24qae4ubap")))), b[NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("rcM=")))] = c.getFontNum() + "", b[NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("q9k=")))] =
                            c.getFonts()
                    } catch (d) {}
                    a()
                })
            },
            getWebRTCID: function(a, b) {
                var c = this;
                try {
                    window.MediaStreamTrack && window.MediaStreamTrack.getSources ? window.MediaStreamTrack.getSources(function(d) {
                        for (var h = "", o = 0; o < d.length; o++) h += d[o].id;
                        b[NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("utI=")))] = c.murmurhash3_32_gc(h, MzNmNTNiNTg(67, 193, 31));
                        a()
                    }) : a()
                } catch (d) {
                    a()
                }
            },
            softID: function(a) {
                var b = this.map([NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("H9I="))), NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("ZlY="))), NWJlZmZlMA(NWE4YmJkMWE(NzE5MTIwZWQ("D2c="))),
                    NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("qLg="))), NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("BXUA"))), NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("BWo="))), NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("CM0="))), NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("D8U="))), NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("eWQ="))), NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("W2Y=")))
                ], function(b) {
                    return a[b]
                });
                b.push(this.hasLocalStorage());
                b.push(this.hasSessionStorage());
                b.push(!!window.indexedDB);
                b.push(typeof window.openDatabase);
                b.push(k.doNotTrack);
                return this.murmurhash3_32_gc(b.join(NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("ZmZm")))),
                    NWQ1NTMwMDU(-15))
            },
            stringify: function(b) {
                var c = "";
                this.each(b, function(b, n) {
                    c += n + NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("gA=="))) + a.encodeURIComponent(b) + NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("Hg==")))
                });
                return c.slice(0, -1)
            },
            getCID: function(a, b) {
                var c = this;
                this.storage.get(this.cid_key, function(d) {
                    d || (d = c.bid ? c.murmurhash3_32_gc(c.bid + (new Date).getTime().toString(MzNmNTNiNTg(109, 13, 16)), MzI3ZDM5YmU(103)) : c.murmurhash3_32_gc(x() + (new Date).getTime().toString(MmViYWVmMjE(-19)), MzI3ZDM5YmU(103)), c.storage.set(c.cid_key,
                        d));
                    b[NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("YjTY")))] = d;
                    a()
                })
            },
            getTimezone: function() {
                var a = parseInt(-(new Date).getTimezoneOffset() / MmViYWVmMjE(25));
                return 0 <= a ? NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("5g=="))) + a : "" + a
            },
            getResolution: function() {
                var b = typeof a.devicePixelRatio === NWJlZmZlMA(N2QyZmE2OTY(NzE5MTIwZWQ("BnIefRtu"))) ? a.devicePixelRatio : Mjg2OGQyY2Q(-97, -98);
                return s.width * b + NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("JA=="))) + s.height * b
            },
            getPluginList: function() {
                var a = k.plugins;
                return a && 0 < a.length ? this.map(a,
                    function(a) {
                        var b = this.map(a, function(a) {
                            return a.type + NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("6Q=="))) + a.suffixes
                        }).join(NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("GQ=="))));
                        return a.name + (a.version ? NWJlZmZlMA(NzYwYzMyNzg(NzE5MTIwZWQ("cQ=="))) + a.version : "") + NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("Zq8="))) + b
                    }, this).join(NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("NA==")))) : window.ActiveXObject ? this.map([NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("lquypq66pLmoia+ktqtxlquypq66pLmoia+ktqs="))), NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("FDYn9gVEZOIFRGQ="))),
                    NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("WUxOIFlubEt/eWY="))), NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("FVeWNrZFltZW4hVXlja2RZbWVg=="))), NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("FXsTdwAvYgZmC1wxUy1LPh9nWns/L14rXjBd"))), NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("tbCyprtxlaikr5OvpLyotWOKdWOGsrG3tbKvcXQ="))), NWJlZmZlMA(NzYwYzMyNzg(NzE5MTIwZWQ("lqmlsJSwpb2ptnKWqaWwlLClvam2bLixbWSFp7ituqmcZIezsri2s7BkbHd2caatuG0="))), NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("ZGRjaUYoIsDrD3jAeU347Kikve3U7L/F1YKODN4EpuWf7szxQq6KBYyS+AhayDos"))), NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("ZGVhbFBsYXllcg=="))),
                    NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("lpqGt69xlpqGt68="))), NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("VibTbQbDkeItJ5Dq"))), NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("HfKKM/u9LvqlctSuH/qnKOemMA=="))), NWJlZmZlMA(MzFmZDkwN2M(NzE5MTIwZWQ("ZGp4cWQvRWR1ZGJ1aG5v")))
                ], function(a) {
                    try {
                        return new ActiveXObject(a), a
                    } catch (b) {
                        return null
                    }
                }, this).join(NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("XA==")))) : ""
            },
            hasLocalStorage: function() {
                try {
                    return !!window.localStorage
                } catch (a) {
                    return !0
                }
            },
            hasSessionStorage: function() {
                try {
                    return !!window.sessionStorage
                } catch (a) {
                    return !0
                }
            },
            isCanvasSupported: function() {
                var a = l.createElement(NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("pqSxuaS2"))));
                return !(!a.getContext || !a.getContext(NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("JUg=")))))
            },
            getCanvasFingerprint: function() {
                if (!this.isCanvasSupported()) return "";
                var a = document.createElement(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("fZBRlR+0")))),
                    b = a.getContext(NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("dac=")))),
                    c = NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("BmUFYgZhBW4GbQVqBmkFdgZ1BXIGcQV+Bn0/AkAFQwJEDUcCSAVL"))),
                    d = NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("kpOUlZaXmJmam5ydnqR1dnd4eXp7fH10cYGfoX9rcA=="))),
                    f = NWJlZmZlMA(N2QyZmE2OTY(NzE5MTIwZWQ("RmgXOXpYfVsCJQwlD097B3UKMRAtEC4=")));
                b.textBaseline = NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("ap5P")));
                b.font = NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("/M++xeTEgvOb+5ay")));
                b.textBaseline = NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("pbC0rKWmqbitpw==")));
                b.fillStyle = NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("Zql5cw==")));
                b.fillRect(NWM0YzZmOTE(50), MmViYWVmMjE(-34), MmViYWVmMjE(27), Mjg2OGQyY2Q(-38, -9));
                b.fillStyle = NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("X4f9RQ==")));
                b.fillText(c, NWM0YzZmOTE(1), 15);
                b.fillText(d, 2, NGNkMTc5NTE(6));
                b.fillText(f, NGNkMTc5NTE(-20), Mjg2OGQyY2Q(-99, -76));
                b.fillStyle = NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("cTNYDHKBvGIrj0zlM1l8XiuPy6VjQQ==")));
                b.fillText(c, MmViYWVmMjE(-31), 17);
                b.fillText(d, MzNmNTNiNTg(11, 3, 4), NjliYTc1NGQ(96));
                b.fillText(f, NjliYTc1NGQ(122), MzI3ZDM5YmU(83));
                return a.toDataURL()
            },
            isIE: function() {
                return navigator.appName === NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("dWthcG1xbWR2IktsdmdwbGd2Ikd6cm5tcGdw"))) || navigator.appName === NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("5FZHNzYWB1Y="))) &&
                    /Trident/.test(navigator.userAgent) ? !0 : !1
            },
            murmurhash3_32_gc: function(a, b) {
                var c, d, f, h, j;
                c = a.length & Mjg2OGQyY2Q(-105, -108);
                d = a.length - c;
                f = b;
                for (j = 0; j < d;) h = a.charCodeAt(j) & 255 | (a.charCodeAt(++j) & 255) << Mjg2OGQyY2Q(-31, -23) | (a.charCodeAt(++j) & 255) << MzNmNTNiNTg(223, 179, 16) | (a.charCodeAt(++j) & 255) << MzI3ZDM5YmU(96), ++j, h = 3432918353 * (h & 65535) + ((3432918353 * (h >>> MmViYWVmMjE(-19)) & 65535) << MzI3ZDM5YmU(104)) & 4294967295, h = h << 15 | h >>> 17, h = -138354085 * (h & 65535) + ((-138354085 * (h >>> NWM0YzZmOTE(34)) & 65535) << NGNkMTc5NTE(-6)) &
                    4294967295, f ^= h, f = f << NWM0YzZmOTE(14) | f >>> Mjg2OGQyY2Q(68, 87), f = (f & 65535) * Mjg2OGQyY2Q(-10, -13) + (((f >>> Mjg2OGQyY2Q(-79, -95)) * NWM0YzZmOTE(10) & 65535) << Mjg2OGQyY2Q(-60, -44)) & 4294967295, f = (f & 65535) + 27492 + (((f >>> NjliYTc1NGQ(110)) + 58964 & 65535) << MzI3ZDM5YmU(104));
                h = 0;
                switch (c) {
                    case MzI3ZDM5YmU(123):
                        h ^= (a.charCodeAt(j + Mjg2OGQyY2Q(37, 39)) & 255) << NWM0YzZmOTE(34);
                    case Mjg2OGQyY2Q(43, 41):
                        h ^= (a.charCodeAt(j + MmViYWVmMjE(-34)) & 255) << NGNkMTc5NTE(-14);
                    case NWM0YzZmOTE(2):
                        h ^= a.charCodeAt(j) & 255, h = 3432918353 * (h & 65535) +
                            ((3432918353 * (h >>> NWQ1NTMwMDU(1)) & 65535) << MzNmNTNiNTg(73, 89, 16)) & 4294967295, h = h << 15 | h >>> NGNkMTc5NTE(-5), h = -138354085 * (h & 65535) + ((-138354085 * (h >>> MzI3ZDM5YmU(104)) & 65535) << 16) & 4294967295, f ^= h
                }
                f ^= a.length;
                f ^= f >>> MzNmNTNiNTg(89, 43, 16);
                f = 2246822507 * (f & 65535) + ((2246822507 * (f >>> NGNkMTc5NTE(-6)) & 65535) << MzI3ZDM5YmU(104)) & 4294967295;
                f ^= f >>> MmViYWVmMjE(-22);
                f = 3266489909 * (f & 65535) + ((3266489909 * (f >>> MzI3ZDM5YmU(104)) & 65535) << MzNmNTNiNTg(73, 5, 16)) & 4294967295;
                f ^= f >>> MzI3ZDM5YmU(104);
                return f >>> 0
            }
        };
        c.prototype = {
            options: {
                useCORS: !1,
                iframeName: "",
                dataKey: "",
                dataReiveURL: ""
            },
            send: function(b) {
                var c = this.options,
                    d = c.dataReiveURL,
                    c = c.dataKey,
                    o = a.location.hostname.split(NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("SQ==")))).reverse();
                o[0] === NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("o8ey"))) && o[MmViYWVmMjE(-34)] === NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("GMiYCRiZ"))) && (d = a.location.protocol + NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("SGYSfhZzBHcXfFM="))) + o[NWQ1NTMwMDU(32)] + NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("G2BubGAgP4vqRF6Kf0Da7amz/K3U7A=="))));
                this.sendByIframe(d, c, b)
            },
            sendByIframe: function(a, b, c) {
                var d = l.createElement(NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("U25waA==")))),
                    f = l.createElement(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("d59Plgo=")))),
                    h = l.createElement(NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("rLGzuLc=")))),
                    j, g = this.options.iframeName,
                    i = m();
                try {
                    j = l.createElement(NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("8Zn+j++D58ary6fD/9w="))) + g + NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("PM8="))))
                } catch (k) {
                    j = l.createElement(NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("aLJcDMYj")))),
                        j.name = g
                }
                j.style.display = NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("ZGVkbw==")));
                f.name = b;
                f.type = NWJlZmZlMA(N2QyZmE2OTY(NzE5MTIwZWQ("AGgNag5h")));
                h.name = NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("aX9lYW9k")));
                h.type = NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("o8quyq/B")));
                d.method = NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("ZU5RUQ==")));
                d.action = a;
                d.target = g;
                d.appendChild(f);
                d.appendChild(h);
                f.value = c;
                a = NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("OEn4uFjo")));
                a = RegExp(NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("l/U="))) + a + NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("aj0oW147XSsp")))).exec(document.cookie);
                h.value = a ? a[1] : "";
                i.appendChild(j);
                i.appendChild(d);
                l.body.appendChild(i);
                d.submit()
            },
            extend: function(a, b) {
                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
            }
        };
        var p = {
                id: NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("pK+ss6S8p6i5rKaorKepr6S2qw=="))),
                url: NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("NOG9LObzc7qgcvSlNeWoJfqrNvCqKObnP/qkc/DmbqX4b6T7c6SsBfGrNPezP8HnL+Kv"))),
                flashReadyCallback: NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("PduiDNayONK9FdSuNfONENa4FOWuHdOy"))),
                timeout: 3E3,
                done: !1,
                info: null,
                ins: null,
                init: function(a) {
                    a = a || {};
                    a.id && (this.id = a.id);
                    a.url && (this.url = a.url);
                    a.flashReadyCallback && (this.flashReadyCallback = a.flashReadyCallback);
                    a.timeout && (this.timeout = a.timeout)
                },
                getFlashIns: function(a) {
                    this.getFlashInfo().enabled ? this.done ? a(this.ins) : this.initFlash(a) : a(null)
                },
                initFlash: function(b) {
                    var c = this,
                        d = setTimeout(function() {
                            c.done || (c.done = !0, b(null))
                        }, this.timeout);
                    a[this.flashReadyCallback] = function() {
                        c.done || (c.done = !0, clearTimeout(d), c.ins = c.getObjectById(c.id), b(c.ins))
                    };
                    this.createSWF(this.url, NjliYTc1NGQ(127),
                        NjliYTc1NGQ(127), this.id, this.getFlashInfo().useAX)
                },
                getFlashInsSync: function() {
                    return this.ins
                },
                getFlashInfo: function() {
                    if (this.info) return this.info;
                    var b = !1,
                        c = [0, 0, 0],
                        d, g = !1;
                    if (typeof k.plugins != NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("a59bhhiukuqc"))) && typeof k.plugins[NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("NYb2NrZ3FmdWAmTGFjeG")))] == NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("WWJqZWN0")))) {
                        if ((d = k.plugins[NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("WmJlaWF8a31vLk5ma3hi")))].description) && !(typeof k.mimeTypes != NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("uNe82L+pxKDF"))) &&
                                k.mimeTypes[NWJlZmZlMA(NmIxYzZjZTI(NzE5MTIwZWQ("V3BwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2g=")))] && !k.mimeTypes[NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("f4FPjxeknfuRcJ8Qm1O0lOCbdIZelRvqmuOZbJk=")))].enabledPlugin)) b = !0, d = d.replace(/^.*\s+(\S+\s+\S+$)/, NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("Kj4=")))), c[0] = parseInt(d.replace(/^(.*)\..*$/, NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("Ixg=")))), NWQ1NTMwMDU(-96)), c[MzNmNTNiNTg(97, 223, 1)] = parseInt(d.replace(/^.*\.(.*)\s.*$/, NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("KDw=")))), NjliYTc1NGQ(116)),
                            c[NGNkMTc5NTE(-20)] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("QnM=")))), Mjg2OGQyY2Q(36, 46)) : 0
                    } else if (typeof a.ActiveXObject != NWJlZmZlMA(N2QyZmE2OTY(NzE5MTIwZWQ("HXAVcxJ6FXMQ")))) try {
                        var f = new a.ActiveXObject(NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("a2ptYWl1Y3RnRG5jcWosUWptYWl1Y3RnRG5jcWo="))));
                        if (f && (d = f.GetVariable(NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("QzJWJVU/L14=")))))) g = !0, d = d.split(NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("fA=="))))[MzNmNTNiNTg(47, 193,
                            1)].split(NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("bw==")))), c = [parseInt(d[0], NjliYTc1NGQ(116)), parseInt(d[NjliYTc1NGQ(127)], NGNkMTc5NTE(-12)), parseInt(d[NWQ1NTMwMDU(32)], MzNmNTNiNTg(11, 5, 10))], c[0] >= NGNkMTc5NTE(-13) && (b = !0)
                    } catch (h) {}
                    return this.info = {
                        enabled: b,
                        version: c.join(NWJlZmZlMA(NWE4YmJkMWE(NzE5MTIwZWQ("Rw==")))),
                        useAX: g
                    }
                },
                createSWF: function(a, b, c, d, f) {
                    var h = m(),
                        b = {
                            data: a,
                            width: b,
                            height: c,
                            name: d,
                            id: d
                        },
                        a = {
                            allowScriptAccess: NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("V211ZGky"))),
                            wmode: NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("t7WksbazpLWosbc=")))
                        };
                    if (f) {
                        var j = "",
                            g;
                        for (g in b) b[g] != Object.prototype[g] && (g.toLowerCase() == NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("GNa/HQ=="))) ? a.movie = b[g] : j += NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("Yw=="))) + g + NWJlZmZlMA(MzBhZThiMmI(NzE5MTIwZWQ("8NM="))) + b[g] + NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("6Q=="))));
                        g = "";
                        for (var i in a) a[i] != Object.prototype[i] && (g += NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("8YAebw9jQi9PI0d7WA=="))) + i + NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("786727bA2uTB"))) + a[i] + NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("6cnm2A=="))));
                        a =
                            h.firstChild;
                        l.body.appendChild(h);
                        h.innerHTML = NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("f7Klraimt2Omr6S2tqyngGWmr7asp32HdXqGh4V5iHCEiHmHcHR0pqlwfHmFe3B3d3d4eHZ4d3Nzc3Nl"))) + j + NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("IA=="))) + g + NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("gHOzpq6pp7iC")))
                    } else {
                        i = l.createElement(NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("E9WhGdS/"))));
                        i.setAttribute(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("aohPhg=="))), NWJlZmZlMA(NWE4YmJkMWE(NzE5MTIwZWQ("CHoMYg1sD2UOf+/emLfKpMmowbTXr9T7m/GS54E="))));
                        for (var k in b) b[k] !=
                            Object.prototype[k] && i.setAttribute(k, b[k]);
                        for (j in a) a[j] != Object.prototype[j] && j.toLowerCase() != NWJlZmZlMA(M2Y4YjdlNjY(NzE5MTIwZWQ("bDddDUY="))) && (g = i, k = j, f = a[j], b = l.createElement(NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("SGNwY28=")))), b.setAttribute(NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("WGBvYA=="))), k), b.setAttribute(NWJlZmZlMA(MzFmZDkwN2M(NzE5MTIwZWQ("QWBtdGQ="))), f), g.appendChild(b));
                        h.appendChild(i);
                        l.body.appendChild(h);
                        a = i
                    }
                    return a
                },
                getObjectById: function(a) {
                    var b = null;
                    if ((a = l.getElementById(a)) &&
                        a.nodeName == NWJlZmZlMA(NzEyOTk4ODU(NzE5MTIwZWQ("M/WBOfSf")))) typeof a.SetVariable != NWJlZmZlMA(MjVjMWMxYjk(NzE5MTIwZWQ("E30ZfBpzHXgc"))) ? b = a : (a = a.getElementsByTagName(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("cZNVhh2z"))))[0]) && (b = a);
                    return b
                }
            },
            t = {
                localstorage: function() {
                    try {
                        return !!window.localStorage
                    } catch (a) {
                        return !1
                    }
                },
                sessionstorage: function() {
                    try {
                        return !!window.sessionStorage
                    } catch (a) {
                        return !1
                    }
                },
                indexeddb: function() {
                    try {
                        return !!window.indexedDB
                    } catch (a) {
                        return !1
                    }
                },
                userdata: function() {
                    return !!document.documentElement.addBehavior
                },
                cookie: function() {
                    return !!navigator.cookieEnabled
                },
                flash: function() {
                    return p.getFlashInfo().enabled
                },
                canvas: function() {
                    var a = l.createElement(NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("OBjoaRg5"))));
                    return !(!a.getContext || !a.getContext(NWJlZmZlMA(NjZmOTM1MTg(NzE5MTIwZWQ("P2w=")))))
                }
            };
        g.prototype = {
            supportItems: [],
            init: function() {
                d(this.setObj, function(a, b) {
                    t[b] && t[b]() && this.supportItems.push(b)
                }, this)
            },
            set: function(a, b) {
                d(this.supportItems, function(c) {
                    this.setObj[c].call(this, a, b)
                }, this)
            },
            get: function(a,
                b) {
                function c() {
                    var f = k.getMax(g);
                    "" !== f && d(g, function(b, c) {
                        f !== b && h[c].call(k, a, f)
                    }, k);
                    b(f)
                }
                var g = {},
                    f = this.getObj,
                    h = this.setObj,
                    i = this.supportItems.length,
                    k = this;
                if (0 === i) return b("");
                d(this.supportItems, function(b) {
                    f[b].call(this, a, function(a) {
                        g[b] = null === a ? "" : a;
                        0 >= --i && c()
                    })
                }, this)
            },
            getMax: function(a) {
                var b = {};
                d(a, function(a) {
                    void 0 === b[a] && "" !== a && (b[a] = 0);
                    b[a] ++
                });
                var c = 0,
                    g = "";
                d(b, function(a, b) {
                    a = parseInt(a);
                    a > c && (c = a, g = b)
                });
                return g
            },
            USERDATA_DOMID: NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("pbCttKW9o6ipuq2nqaOtqA=="))),
            setObj: {
                cookie: function(a, b) {
                    document.cookie = a + NWJlZmZlMA(MWIwNjYxNDM(NzE5MTIwZWQ("Mg=="))) + b + NWJlZmZlMA(NzRiMjU3MA(NzE5MTIwZWQ("9tWxyLffrM6+gCtfOxY1BzcWUTVXdkd2RnVUY1JrWmlSYVBvO24uFjVEIlU8BioS")))
                },
                userdata: function(a, b) {
                    var c = this.getUserDataDom();
                    c.setAttribute(a, b);
                    c.save(a)
                },
                localstorage: function(b, c) {
                    try {
                        a.localStorage.setItem(b, c)
                    } catch (d) {}
                },
                sessionstorage: function(b, c) {
                    try {
                        a.sessionStorage.setItem(b, c)
                    } catch (d) {}
                },
                indexeddb: function(a, b) {
                    var c;
                    try {
                        c = window.indexedDB.open(NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("lkYm9UZWZ5Y2VpZG"))))
                    } catch (d) {
                        return
                    }
                    c.onerror =
                        function() {};
                    c.onupgradeneeded = function(a) {
                        a.target.result.createObjectStore(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("epRJih2iles="))), {
                            keyPath: NWJlZmZlMA(NzZlODlhNDE(NzE5MTIwZWQ("MvSkOQ=="))),
                            unique: !1
                        })
                    };
                    c.onsuccess = function(c) {
                        c = c.target.result;
                        c.objectStoreNames.contains(NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("p6i5rKaorKc=")))) && (c.transaction([NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("r8q81bbTut4=")))], NWJlZmZlMA(Mzk3ZWI0Mzg(NzE5MTIwZWQ("R2RjYWczL9Hh")))).objectStore(NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("UmR0bHMkL8E=")))).put({
                            name: a,
                            value: b
                        }), c.close())
                    }
                },
                flash: function(a, b) {
                    var c = p.getFlashInsSync();
                    c && c.setData(a, b)
                }
            },
            getObj: {
                cookie: function(a, b) {
                    var c = RegExp(NWJlZmZlMA(NzE5NDQ1OTg(NzE5MTIwZWQ("l/U="))) + a + NWJlZmZlMA(Nzg5ZjQzZTc(NzE5MTIwZWQ("n4BrnqF+oG5s")))).exec(document.cookie);
                    b(c ? c[1] : null)
                },
                userdata: function(a, b) {
                    var c = this.getUserDataDom();
                    c.load(a);
                    b(c.getAttribute(a))
                },
                localstorage: function(b, c) {
                    try {
                        c(a.localStorage.getItem(b))
                    } catch (d) {
                        c(null)
                    }
                },
                sessionstorage: function(b, c) {
                    try {
                        c(a.sessionStorage.getItem(b))
                    } catch (d) {
                        c(null)
                    }
                },
                indexeddb: function(a, b) {
                    var c;
                    try {
                        c = window.indexedDB.open(NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("d5VdvBqiiuabephb"))))
                    } catch (d) {
                        b(null)
                    }
                    c.onerror = function() {};
                    c.onupgradeneeded = function(a) {
                        a.target.result.createObjectStore(NWJlZmZlMA(Njk5ODhmYmM(NzE5MTIwZWQ("qKm6raeprag="))), {
                            keyPath: NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("5hbWVg=="))),
                            unique: !1
                        })
                    };
                    c.onsuccess = function(c) {
                        c = c.target.result;
                        if (c.objectStoreNames.contains(NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("UmR0bHMkL8E="))))) {
                            var d = c.transaction([NWJlZmZlMA(Mzk0OGVjMQ(NzE5MTIwZWQ("epRJih2iles=")))]).objectStore(NWJlZmZlMA(NDNkYmUzZA(NzE5MTIwZWQ("p6i5rKaorKc=")))).get(a);
                            d.onsuccess = function() {
                                void 0 !== d.result ? b && b(d.result.value) : b && b(null)
                            }
                        } else b && b(null);
                        c.close()
                    }
                },
                flash: function(a, b) {
                    var c = p.getFlashInsSync();
                    c ? b(c.getData(a)) : b(null)
                }
            },
            getUserDataDom: function() {
                var a;
                if (!(a = document.getElementById(this.USERDATA_DOMID))) a = document.createElement(NWJlZmZlMA(NmI5NTMwMWM(NzE5MTIwZWQ("A20Y")))), a.id = this.USERDATA_DOMID, a.style.position = NWJlZmZlMA(MTczZGYyYzY(NzE5MTIwZWQ("GCg5+MhZSVg="))), a.style.visibility = NWJlZmZlMA(NGMyYzIzNGE(NzE5MTIwZWQ("hpZGRlbm"))), document.body.appendChild(a),
                    a.style.behavior = NWJlZmZlMA(NTIxMmM0YTE(NzE5MTIwZWQ("TXBuKiFmZ2Rjd252IXdxZ3BGY3ZjKw==")));
                return a
            }
        };
        i.prototype = {
            queue: null,
            add: function(a, b) {
                this.queue.push([a, b, Array.prototype.slice.call(arguments, MzI3ZDM5YmU(122))]);
                return this
            },
            done: function(a, b) {
                function c() {
                    if (0 < d.length) {
                        var f = d.shift();
                        f[0].apply(f[1], [c].concat(f[2]))
                    } else typeof a === NWJlZmZlMA(NDBhMzg2Mjg(NzE5MTIwZWQ("UHRsZmQoKcs="))) && a.call(b)
                }
                var d = this.queue;
                c()
            }
        };
        a.AlipayDeviceIDManager = {
            ins: null,
            init: function(a, c) {
                this.ins || (this.ins =
                    new b(a, c));
                return this.ins
            }
        }
    })(window)
} catch (e) {};