parcelRequire = function (e, r, t, n)
{
	var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;

	function f(t, n)
	{
		if (!r[t])
		{
			if (!e[t])
			{
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i)
				{
					return i(t, !0);
				}
				if (o)
				{
					return o(t, !0);
				}
				if (u && "string" == typeof t)
				{
					return u(t);
				}
				var c = new Error("Cannot find module '" + t + "'");
				throw c.code = "MODULE_NOT_FOUND", c
			}
			p.resolve = function (r)
			{
				return e[t][1][r] || r
			}, p.cache = {};
			var l = r[t] = new f.Module(t);
			e[t][0].call(l.exports, p, l, l.exports, this)
		}
		return r[t].exports;

		function p(e)
		{
			return f(p.resolve(e))
		}
	}

	f.isParcelRequire = !0, f.Module = function (e)
	{
		this.id = e, this.bundle = f, this.exports = {}
	}, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t)
	{
		e[r] = [function (e, r)
		{
			r.exports = t
		}, {}]
	};
	for (var c = 0; c < t.length; c++) try
	{
		f(t[c])
	}
	catch (e)
	{
		i || (i = e)
	}
	if (t.length)
	{
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function ()
		{
			return l
		}) : n && (this[n] = l)
	}
	if (parcelRequire = f, i)
	{
		throw i;
	}
	return f
}({
	"O0ie": [function (require, module, exports)
	{
		"use strict";
		Object.defineProperty(exports, "__esModule", {value: !0}), exports.EasingFunctions = exports.EaseInOut = exports.EaseOut = exports.EaseIn = exports.default = void 0;
		var t = function (t)
		{
			return function (e)
			{
				return Math.pow(e, t)
			}
		};
		exports.EaseIn = t;
		var e = function (t)
		{
			return function (e)
			{
				return 1 - Math.abs(Math.pow(e - 1, t))
			}
		};
		exports.EaseOut = e;
		var n = function (n)
		{
			return function (a)
			{
				return a < .5 ? t(n)(2 * a) / 2 : e(n)(2 * a - 1) / 2 + .5
			}
		};
		exports.EaseInOut = n;
		var a = {
			linear: n(1), easeInQuad: t(2), easeOutQuad: e(2), easeInOutQuad: n(2), easeInCubic: t(3), easeOutCubic: e(3), easeInOutCubic: n(3), easeInQuart: t(4), easeOutQuart: e(4), easeInOutQuart: n(4), easeInQuint: t(5), easeOutQuint: e(5), easeInOutQuint: n(5), easeInElastic: function (t)
			{
				return (.04 - .04 / t) * Math.sin(25 * t) + 1
			}, easeOutElastic: function (t)
			{
				return .04 * t / --t * Math.sin(25 * t)
			}, easeInOutElastic: function (t)
			{
				return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
			}, easeInSin: function (t)
			{
				return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
			}, easeOutSin: function (t)
			{
				return Math.sin(Math.PI / 2 * t)
			}, easeInOutSin: function (t)
			{
				return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
			}, easeOutBack: function (t)
			{
				var c1 = 1.70158;
				var c3 = c1 + 1;
				return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
			}
		};
		exports.EasingFunctions = a;
		var u = a;
		exports.default = u;
	}, {}], "X9ZF": [function (require, module, exports)
	{
		var global = arguments[3];
		var e = arguments[3];
		Object.defineProperty(exports, "__esModule", {value: !0}), exports.default = void 0;
		var t = o(require("./Easing"));

		function o(e)
		{
			return e && e.__esModule ? e : {default: e}
		}

		function n(e)
		{
			return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e)
			{
				return typeof e
			} : function (e)
			{
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}

		function r(e, t)
		{
			if (!(e instanceof t))
			{
				throw new TypeError("Cannot call a class as a function")
			}
		}

		function s(e, t)
		{
			for (var o = 0; o < t.length; o++)
			{
				var n = t[o];
				n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
			}
		}

		function i(e, t, o)
		{
			return t && s(e.prototype, t), o && s(e, o), e
		}

		function a(e, t, o)
		{
			return t in e ? Object.defineProperty(e, t, {value: o, enumerable: !0, configurable: !0, writable: !0}) : e[t] = o, e
		}

		var u = "undefined" != typeof window ? window : e, _ = 1e3 / 60, c = u.requestAnimationFrame || u.webkitRequestAnimationFrame || u.oRequestAnimationFrame || u.msRequestAnimationFrame || u.mozCancelRequestAnimationFrame && u.mozRequestAnimationFrame || setTimeout, l = function (e, t, o)
		{
			var n = t.split("."), r = n.pop();
			return n.reduce(function (e, t)
			{
				return void 0 === e[t] && (e[t] = {}), e[t]
			}, e)[r] = o, e
		}, f = function ()
		{
			function e(o)
			{
				var s = this;
				r(this, e), a(this, "_timestamp", Date.now()), a(this, "_elapsed", 0), a(this, "_progress", 0), a(this, "_playing", 0), a(this, "_currentValues", {}), a(this, "__checkObj", function (e)
				{
					return "object" === n(e) ? e : {}
				}), a(this, "__checkNum", function (e)
				{
					return "number" == typeof e ? e : 0
				}), a(this, "__checkBool", function (e)
				{
					return "boolean" == typeof e && e
				}), a(this, "__checkEase", function (e)
				{
					return "function" == typeof t.default[e] && t.default[e]
				}), a(this, "__checkFunc", function (e)
				{
					return "function" == typeof e ? e : function (e)
					{
						return e
					}
				}), a(this, "play", function ()
				{
					var e = Date.now();
					s._timestamp = e - s._elapsed, s._playing = !0, s._runAnimation()
				}), a(this, "pause", function ()
				{
					return s._playing = !1
				}), a(this, "stop", function ()
				{
					s._playing = !1, s.seek(0)
				}), a(this, "seek", function (e)
				{
					var t = Date.now();
					s._elapsed = s._duration * e, s._timestamp = t - s._elapsed, s.t = s._duration > 0 ? s._elapsed / s._duration : 1, s._progress = s._ease(s.t), s._setValues(), s._onProgress(s._target, s._currentValues)
				}), a(this, "_setValues", function ()
				{
					Object.keys(s._from).map(function (e)
					{
						var t;
						t = s._reverse ? s._to[e] - s._to[e] * s._progress + s._from[e] * s._progress : s._from[e] - s._from[e] * s._progress + s._to[e] * s._progress, s._currentValues[e] = t, s._target && s._update_target && l(s._target, e, t)
					})
				}), a(this, "_restart", function ()
				{
					s._timestamp = Date.now(), s._elapsed = 0, s._progress = 0
				}), a(this, "_runAnimation", function ()
				{
					if (s._playing)
					{
						var e = Date.now();
						s._elapsed = e - s._timestamp, s.t = (s._duration > 0 ? s._elapsed / s._duration : 1).toFixed(5), s._progress = s._ease(s.t), s.t >= 1 ? s._progress = 1 : s.t <= 0 && (s._progress = 0), s._setValues(), s.t >= 1 ? (s._onProgress(s._target, s._currentValues), (s._yoyo && s._yoyoRun || !s._yoyo) && s._onComplete(s._target, s._currentValues), s._loop ? (s._restart(), s._yoyo && (s._reverse = !s._reverse, s._yoyoRun ? s._yoyoRun = !1 : s._yoyoRun = !0), c.call(u, s._runAnimation,
							_)) : s._yoyo && (s._reverse = !s._reverse, s._yoyoRun || (s.playing = !0), s._yoyoRun = !0)) : (s._onProgress(s._target, s._currentValues), c.call(u, s._runAnimation, _))
					}
				});
				var i = this.__checkEase, f = this.__checkFunc, p = this.__checkObj, y = this.__checkNum, m = this.__checkBool;
				this._from = p(o.from), this._to = p(o.to), this._duration = y(o.duration), this._ease = i(o.ease) || t.default.linear, this._onComplete = f(o.onComplete), this._onProgress = f(o.onProgress), this._loop = m(o.loop), this._yoyo = m(o.yoyo), this._reverse = m(o.reverse), this._target = o.target, this._update_target = o.update_target === undefined ? true : o.update_target, void 0 === o.autostart && (o.autostart = !0), m(o.autostart) && this.play()
			}

			return i(e, [{
				key: "destroy", value: function ()
				{
					for (var e in this) delete this[e]
				}
			}]), e
		}();
		u["TinyTween"] = f;
		var p = f;
		exports.default = p;
	}, {"./Easing": "O0ie"}]
}, {}, ["X9ZF"], null)