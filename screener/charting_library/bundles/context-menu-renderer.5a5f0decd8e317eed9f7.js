(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [1584, 959, 6437],
  {
    259142: function (e, t) {
      var r, n, o;
      (n = [t]),
        (r = function (e) {
          'use strict';
          function t(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          Object.defineProperty(e, '__esModule', { value: !0 });
          var r = !1;
          if ('undefined' != typeof window) {
            var n = {
              get passive() {
                r = !0;
              },
            };
            window.addEventListener('testPassive', null, n),
              window.removeEventListener('testPassive', null, n);
          }
          var o =
              'undefined' != typeof window &&
              window.navigator &&
              window.navigator.platform &&
              /iP(ad|hone|od)/.test(window.navigator.platform),
            i = [],
            a = !1,
            s = -1,
            u = void 0,
            c = void 0,
            l = function (e) {
              return i.some(function (t) {
                return !(!t.options.allowTouchMove || !t.options.allowTouchMove(e));
              });
            },
            d = function (e) {
              var t = e || window.event;
              return (
                !!l(t.target) ||
                1 < t.touches.length ||
                (t.preventDefault && t.preventDefault(), !1)
              );
            },
            f = function () {
              setTimeout(function () {
                void 0 !== c && ((document.body.style.paddingRight = c), (c = void 0)),
                  void 0 !== u && ((document.body.style.overflow = u), (u = void 0));
              });
            };
          (e.disableBodyScroll = function (e, n) {
            if (o) {
              if (!e)
                return void console.error(
                  'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.',
                );
              if (
                e &&
                !i.some(function (t) {
                  return t.targetElement === e;
                })
              ) {
                var f = { targetElement: e, options: n || {} };
                (i = [].concat(t(i), [f])),
                  (e.ontouchstart = function (e) {
                    1 === e.targetTouches.length && (s = e.targetTouches[0].clientY);
                  }),
                  (e.ontouchmove = function (t) {
                    var r, n, o, i;
                    1 === t.targetTouches.length &&
                      ((n = e),
                      (i = (r = t).targetTouches[0].clientY - s),
                      !l(r.target) &&
                        ((n && 0 === n.scrollTop && 0 < i) ||
                        ((o = n) && o.scrollHeight - o.scrollTop <= o.clientHeight && i < 0)
                          ? d(r)
                          : r.stopPropagation()));
                  }),
                  a ||
                    (document.addEventListener('touchmove', d, r ? { passive: !1 } : void 0),
                    (a = !0));
              }
            } else {
              (v = n),
                setTimeout(function () {
                  if (void 0 === c) {
                    var e = !!v && !0 === v.reserveScrollBarGap,
                      t = window.innerWidth - document.documentElement.clientWidth;
                    e &&
                      0 < t &&
                      ((c = document.body.style.paddingRight),
                      (document.body.style.paddingRight = t + 'px'));
                  }
                  void 0 === u &&
                    ((u = document.body.style.overflow), (document.body.style.overflow = 'hidden'));
                });
              var h = { targetElement: e, options: n || {} };
              i = [].concat(t(i), [h]);
            }
            var v;
          }),
            (e.clearAllBodyScrollLocks = function () {
              o
                ? (i.forEach(function (e) {
                    (e.targetElement.ontouchstart = null), (e.targetElement.ontouchmove = null);
                  }),
                  a &&
                    (document.removeEventListener('touchmove', d, r ? { passive: !1 } : void 0),
                    (a = !1)),
                  (i = []),
                  (s = -1))
                : (f(), (i = []));
            }),
            (e.enableBodyScroll = function (e) {
              if (o) {
                if (!e)
                  return void console.error(
                    'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.',
                  );
                (e.ontouchstart = null),
                  (e.ontouchmove = null),
                  (i = i.filter(function (t) {
                    return t.targetElement !== e;
                  })),
                  a &&
                    0 === i.length &&
                    (document.removeEventListener('touchmove', d, r ? { passive: !1 } : void 0),
                    (a = !1));
              } else
                1 === i.length && i[0].targetElement === e
                  ? (f(), (i = []))
                  : (i = i.filter(function (t) {
                      return t.targetElement !== e;
                    }));
            });
        }),
        void 0 === (o = 'function' == typeof r ? r.apply(t, n) : r) || (e.exports = o);
    },
    966076: e => {
      e.exports = {
        'default-drawer-min-top-distance': '100px',
        wrap: 'wrap-_HnK0UIN',
        positionBottom: 'positionBottom-_HnK0UIN',
        backdrop: 'backdrop-_HnK0UIN',
        drawer: 'drawer-_HnK0UIN',
        positionLeft: 'positionLeft-_HnK0UIN',
      };
    },
    214877: e => {
      e.exports = {
        favorite: 'favorite-_FRQhM5Y',
        hovered: 'hovered-_FRQhM5Y',
        disabled: 'disabled-_FRQhM5Y',
        active: 'active-_FRQhM5Y',
        checked: 'checked-_FRQhM5Y',
      };
    },
    778199: (e, t, r) => {
      'use strict';
      function n(e, t, r, n, o) {
        function i(o) {
          if (e > o.timeStamp) return;
          const i = o.target;
          void 0 !== r &&
            null !== t &&
            null !== i &&
            i.ownerDocument === n &&
            (t.contains(i) || r(o));
        }
        return (
          o.click && n.addEventListener('click', i, !1),
          o.mouseDown && n.addEventListener('mousedown', i, !1),
          o.touchEnd && n.addEventListener('touchend', i, !1),
          o.touchStart && n.addEventListener('touchstart', i, !1),
          () => {
            n.removeEventListener('click', i, !1),
              n.removeEventListener('mousedown', i, !1),
              n.removeEventListener('touchend', i, !1),
              n.removeEventListener('touchstart', i, !1);
          }
        );
      }
      r.d(t, { addOutsideEventListener: () => n });
    },
    72571: (e, t, r) => {
      'use strict';
      r.d(t, { Icon: () => o });
      var n = r(50959);
      const o = n.forwardRef((e, t) => {
        const { icon: r = '', ...o } = e;
        return n.createElement('span', { ...o, ref: t, dangerouslySetInnerHTML: { __html: r } });
      });
    },
    800417: (e, t, r) => {
      'use strict';
      function n(e) {
        return i(e, a);
      }
      function o(e) {
        return i(e, s);
      }
      function i(e, t) {
        const r = Object.entries(e).filter(t),
          n = {};
        for (const [e, t] of r) n[e] = t;
        return n;
      }
      function a(e) {
        const [t, r] = e;
        return 0 === t.indexOf('data-') && 'string' == typeof r;
      }
      function s(e) {
        return 0 === e[0].indexOf('aria-');
      }
      r.d(t, {
        filterAriaProps: () => o,
        filterDataProps: () => n,
        filterProps: () => i,
        isAriaAttribute: () => s,
        isDataAttribute: () => a,
      });
    },
    163694: (e, t, r) => {
      'use strict';
      r.d(t, { DrawerContext: () => a, DrawerManager: () => i });
      var n = r(50959),
        o = r(285089);
      class i extends n.PureComponent {
        constructor(e) {
          super(e),
            (this._isBodyFixed = !1),
            (this._addDrawer = e => {
              this.setState(t => ({ stack: [...t.stack, e] }));
            }),
            (this._removeDrawer = e => {
              this.setState(t => ({ stack: t.stack.filter(t => t !== e) }));
            }),
            (this.state = { stack: [] });
        }
        componentDidUpdate(e, t) {
          !t.stack.length &&
            this.state.stack.length &&
            ((0, o.setFixedBodyState)(!0), (this._isBodyFixed = !0)),
            t.stack.length &&
              !this.state.stack.length &&
              this._isBodyFixed &&
              ((0, o.setFixedBodyState)(!1), (this._isBodyFixed = !1));
        }
        componentWillUnmount() {
          this.state.stack.length && this._isBodyFixed && (0, o.setFixedBodyState)(!1);
        }
        render() {
          return n.createElement(
            a.Provider,
            {
              value: {
                addDrawer: this._addDrawer,
                removeDrawer: this._removeDrawer,
                currentDrawer: this.state.stack.length
                  ? this.state.stack[this.state.stack.length - 1]
                  : null,
              },
            },
            this.props.children,
          );
        }
      }
      const a = n.createContext(null);
    },
    759339: (e, t, r) => {
      'use strict';
      r.d(t, { Drawer: () => f });
      var n = r(50959),
        o = r(650151),
        i = r(497754),
        a = r(189904),
        s = r(8361),
        u = r(163694),
        c = r(28466),
        l = r(742554),
        d = r(966076);
      function f(e) {
        const { position: t = 'Bottom', onClose: r, children: l, className: f, theme: v = d } = e,
          p = (0, o.ensureNotNull)((0, n.useContext)(u.DrawerContext)),
          [m] = (0, n.useState)(() => (0, a.randomHash)()),
          y = (0, n.useRef)(null),
          _ = (0, n.useContext)(c.CloseDelegateContext);
        return (
          (0, n.useLayoutEffect)(
            () => (
              (0, o.ensureNotNull)(y.current).focus({ preventScroll: !0 }),
              _.subscribe(p, r),
              p.addDrawer(m),
              () => {
                p.removeDrawer(m), _.unsubscribe(p, r);
              }
            ),
            [],
          ),
          n.createElement(
            s.Portal,
            null,
            n.createElement(
              'div',
              { className: i(d.wrap, d[`position${t}`]) },
              m === p.currentDrawer &&
                n.createElement('div', { className: d.backdrop, onClick: r }),
              n.createElement(
                h,
                {
                  className: i(v.drawer, d[`position${t}`], f),
                  ref: y,
                  'data-name': e['data-name'],
                },
                l,
              ),
            ),
          )
        );
      }
      const h = (0, n.forwardRef)((e, t) => {
        const { className: r, ...o } = e;
        return n.createElement(l.TouchScrollContainer, {
          className: i(d.drawer, r),
          tabIndex: -1,
          ref: t,
          ...o,
        });
      });
    },
    577687: (e, t, r) => {
      'use strict';
      r.d(t, { FavoriteButton: () => d });
      var n = r(509806),
        o = r(50959),
        i = r(497754),
        a = r(72571),
        s = r(239146),
        u = r(648010),
        c = r(214877);
      const l = { add: n.t(null, void 0, r(44629)), remove: n.t(null, void 0, r(572482)) };
      function d(e) {
        const { className: t, isFilled: r, isActive: n, onClick: d, ...f } = e;
        return o.createElement(a.Icon, {
          ...f,
          className: i(c.favorite, 'apply-common-tooltip', r && c.checked, n && c.active, t),
          icon: r ? s : u,
          onClick: d,
          title: r ? l.remove : l.add,
        });
      }
    },
    742554: (e, t, r) => {
      'use strict';
      r.d(t, { TouchScrollContainer: () => s });
      var n = r(50959),
        o = r(259142),
        i = r(650151),
        a = r(601227);
      const s = (0, n.forwardRef)((e, t) => {
        const { children: r, ...i } = e,
          s = (0, n.useRef)(null);
        return (
          (0, n.useImperativeHandle)(t, () => s.current),
          (0, n.useLayoutEffect)(() => {
            if (a.CheckMobile.iOS())
              return (
                null !== s.current && (0, o.disableBodyScroll)(s.current, { allowTouchMove: u(s) }),
                () => {
                  null !== s.current && (0, o.enableBodyScroll)(s.current);
                }
              );
          }, []),
          n.createElement('div', { ref: s, ...i }, r)
        );
      });
      function u(e) {
        return t => {
          const r = (0, i.ensureNotNull)(e.current),
            n = document.activeElement;
          return !r.contains(t) || (null !== n && r.contains(n) && n.contains(t));
        };
      }
    },
    695257: (e, t) => {
      'use strict';
      var r = Symbol.for('react.element'),
        n = Symbol.for('react.portal'),
        o = Symbol.for('react.fragment'),
        i = Symbol.for('react.strict_mode'),
        a = Symbol.for('react.profiler'),
        s = Symbol.for('react.provider'),
        u = Symbol.for('react.context'),
        c = Symbol.for('react.forward_ref'),
        l = Symbol.for('react.suspense'),
        d = Symbol.for('react.memo'),
        f = Symbol.for('react.lazy'),
        h = Symbol.iterator;
      var v = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        p = Object.assign,
        m = {};
      function y(e, t, r) {
        (this.props = e), (this.context = t), (this.refs = m), (this.updater = r || v);
      }
      function _() {}
      function w(e, t, r) {
        (this.props = e), (this.context = t), (this.refs = m), (this.updater = r || v);
      }
      (y.prototype.isReactComponent = {}),
        (y.prototype.setState = function (e, t) {
          if ('object' != typeof e && 'function' != typeof e && null != e)
            throw Error(
              'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
            );
          this.updater.enqueueSetState(this, e, t, 'setState');
        }),
        (y.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
        }),
        (_.prototype = y.prototype);
      var g = (w.prototype = new _());
      (g.constructor = w), p(g, y.prototype), (g.isPureReactComponent = !0);
      var b = Array.isArray,
        E = Object.prototype.hasOwnProperty,
        k = { current: null },
        S = { key: !0, ref: !0, __self: !0, __source: !0 };
      function x(e, t, n) {
        var o,
          i = {},
          a = null,
          s = null;
        if (null != t)
          for (o in (void 0 !== t.ref && (s = t.ref), void 0 !== t.key && (a = '' + t.key), t))
            E.call(t, o) && !S.hasOwnProperty(o) && (i[o] = t[o]);
        var u = arguments.length - 2;
        if (1 === u) i.children = n;
        else if (1 < u) {
          for (var c = Array(u), l = 0; l < u; l++) c[l] = arguments[l + 2];
          i.children = c;
        }
        if (e && e.defaultProps) for (o in (u = e.defaultProps)) void 0 === i[o] && (i[o] = u[o]);
        return { $$typeof: r, type: e, key: a, ref: s, props: i, _owner: k.current };
      }
      function C(e) {
        return 'object' == typeof e && null !== e && e.$$typeof === r;
      }
      var R = /\/+/g;
      function L(e, t) {
        return 'object' == typeof e && null !== e && null != e.key
          ? (function (e) {
              var t = { '=': '=0', ':': '=2' };
              return (
                '$' +
                e.replace(/[=:]/g, function (e) {
                  return t[e];
                })
              );
            })('' + e.key)
          : t.toString(36);
      }
      function D(e, t, o, i, a) {
        var s = typeof e;
        ('undefined' !== s && 'boolean' !== s) || (e = null);
        var u = !1;
        if (null === e) u = !0;
        else
          switch (s) {
            case 'string':
            case 'number':
              u = !0;
              break;
            case 'object':
              switch (e.$$typeof) {
                case r:
                case n:
                  u = !0;
              }
          }
        if (u)
          return (
            (a = a((u = e))),
            (e = '' === i ? '.' + L(u, 0) : i),
            b(a)
              ? ((o = ''),
                null != e && (o = e.replace(R, '$&/') + '/'),
                D(a, t, o, '', function (e) {
                  return e;
                }))
              : null != a &&
                (C(a) &&
                  (a = (function (e, t) {
                    return {
                      $$typeof: r,
                      type: e.type,
                      key: t,
                      ref: e.ref,
                      props: e.props,
                      _owner: e._owner,
                    };
                  })(
                    a,
                    o +
                      (!a.key || (u && u.key === a.key)
                        ? ''
                        : ('' + a.key).replace(R, '$&/') + '/') +
                      e,
                  )),
                t.push(a)),
            1
          );
        if (((u = 0), (i = '' === i ? '.' : i + ':'), b(e)))
          for (var c = 0; c < e.length; c++) {
            var l = i + L((s = e[c]), c);
            u += D(s, t, o, l, a);
          }
        else if (
          ((l = (function (e) {
            return null === e || 'object' != typeof e
              ? null
              : 'function' == typeof (e = (h && e[h]) || e['@@iterator'])
              ? e
              : null;
          })(e)),
          'function' == typeof l)
        )
          for (e = l.call(e), c = 0; !(s = e.next()).done; )
            u += D((s = s.value), t, o, (l = i + L(s, c++)), a);
        else if ('object' === s)
          throw (
            ((t = String(e)),
            Error(
              'Objects are not valid as a React child (found: ' +
                ('[object Object]' === t
                  ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                  : t) +
                '). If you meant to render a collection of children, use an array instead.',
            ))
          );
        return u;
      }
      function T(e, t, r) {
        if (null == e) return e;
        var n = [],
          o = 0;
        return (
          D(e, n, '', '', function (e) {
            return t.call(r, e, o++);
          }),
          n
        );
      }
      function B(e) {
        if (-1 === e._status) {
          var t = e._result;
          (t = t()).then(
            function (t) {
              (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
            },
            function (t) {
              (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
            },
          ),
            -1 === e._status && ((e._status = 0), (e._result = t));
        }
        if (1 === e._status) return e._result.default;
        throw e._result;
      }
      var N = { current: null },
        F = { transition: null },
        O = { ReactCurrentDispatcher: N, ReactCurrentBatchConfig: F, ReactCurrentOwner: k };
      (t.Children = {
        map: T,
        forEach: function (e, t, r) {
          T(
            e,
            function () {
              t.apply(this, arguments);
            },
            r,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            T(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            T(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!C(e))
            throw Error('React.Children.only expected to receive a single React element child.');
          return e;
        },
      }),
        (t.Component = y),
        (t.Fragment = o),
        (t.Profiler = a),
        (t.PureComponent = w),
        (t.StrictMode = i),
        (t.Suspense = l),
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O),
        (t.cloneElement = function (e, t, n) {
          if (null == e)
            throw Error(
              'React.cloneElement(...): The argument must be a React element, but you passed ' +
                e +
                '.',
            );
          var o = p({}, e.props),
            i = e.key,
            a = e.ref,
            s = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((a = t.ref), (s = k.current)),
              void 0 !== t.key && (i = '' + t.key),
              e.type && e.type.defaultProps)
            )
              var u = e.type.defaultProps;
            for (c in t)
              E.call(t, c) &&
                !S.hasOwnProperty(c) &&
                (o[c] = void 0 === t[c] && void 0 !== u ? u[c] : t[c]);
          }
          var c = arguments.length - 2;
          if (1 === c) o.children = n;
          else if (1 < c) {
            u = Array(c);
            for (var l = 0; l < c; l++) u[l] = arguments[l + 2];
            o.children = u;
          }
          return { $$typeof: r, type: e.type, key: i, ref: a, props: o, _owner: s };
        }),
        (t.createContext = function (e) {
          return (
            ((e = {
              $$typeof: u,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null,
            }).Provider = { $$typeof: s, _context: e }),
            (e.Consumer = e)
          );
        }),
        (t.createElement = x),
        (t.createFactory = function (e) {
          var t = x.bind(null, e);
          return (t.type = e), t;
        }),
        (t.createRef = function () {
          return { current: null };
        }),
        (t.forwardRef = function (e) {
          return { $$typeof: c, render: e };
        }),
        (t.isValidElement = C),
        (t.lazy = function (e) {
          return { $$typeof: f, _payload: { _status: -1, _result: e }, _init: B };
        }),
        (t.memo = function (e, t) {
          return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
        }),
        (t.startTransition = function (e) {
          var t = F.transition;
          F.transition = {};
          try {
            e();
          } finally {
            F.transition = t;
          }
        }),
        (t.unstable_act = function () {
          throw Error('act(...) is not supported in production builds of React.');
        }),
        (t.useCallback = function (e, t) {
          return N.current.useCallback(e, t);
        }),
        (t.useContext = function (e) {
          return N.current.useContext(e);
        }),
        (t.useDebugValue = function () {}),
        (t.useDeferredValue = function (e) {
          return N.current.useDeferredValue(e);
        }),
        (t.useEffect = function (e, t) {
          return N.current.useEffect(e, t);
        }),
        (t.useId = function () {
          return N.current.useId();
        }),
        (t.useImperativeHandle = function (e, t, r) {
          return N.current.useImperativeHandle(e, t, r);
        }),
        (t.useInsertionEffect = function (e, t) {
          return N.current.useInsertionEffect(e, t);
        }),
        (t.useLayoutEffect = function (e, t) {
          return N.current.useLayoutEffect(e, t);
        }),
        (t.useMemo = function (e, t) {
          return N.current.useMemo(e, t);
        }),
        (t.useReducer = function (e, t, r) {
          return N.current.useReducer(e, t, r);
        }),
        (t.useRef = function (e) {
          return N.current.useRef(e);
        }),
        (t.useState = function (e) {
          return N.current.useState(e);
        }),
        (t.useSyncExternalStore = function (e, t, r) {
          return N.current.useSyncExternalStore(e, t, r);
        }),
        (t.useTransition = function () {
          return N.current.useTransition();
        }),
        (t.version = '18.2.0');
    },
    50959: (e, t, r) => {
      'use strict';
      e.exports = r(695257);
    },
    429107: (e, t, r) => {
      'use strict';
      r.r(t), r.d(t, { ContextMenuRenderer: () => u });
      var n = r(50959),
        o = r(500962),
        i = r(820883),
        a = r(710263),
        s = r(630795);
      class u {
        constructor(e, t, r, o) {
          (this._root = document.createElement('div')),
            (this._isShown = !1),
            (this._manager = null),
            (this._props = {
              isOpened: !1,
              items: e,
              position: { x: 0, y: 0 },
              menuStatName: t.statName,
              mode: t.mode,
              'data-name': t['data-name'],
            }),
            (this._onDestroy = r),
            (this._onShow = o),
            (this._activeElement = document.activeElement),
            (this._returnFocus = t.returnFocus),
            (this._takeFocus = t.takeFocus),
            (this._menuElementRef = n.createRef()),
            (this._doNotCloseOn = t.doNotCloseOn),
            t.manager && (this._manager = t.manager);
        }
        show(e) {
          this._onShow && this._onShow(),
            (this._isShown = !0),
            this._render({
              ...this._props,
              position: (t, r, n, o) => {
                var i, s, u, c, l, d, f;
                let h;
                if (void 0 !== e.box) h = e.box;
                else {
                  h = {
                    x:
                      null !==
                        (s = null === (i = e.touches) || void 0 === i ? void 0 : i[0].clientX) &&
                      void 0 !== s
                        ? s
                        : e.clientX,
                    y:
                      null !==
                        (c = null === (u = e.touches) || void 0 === u ? void 0 : u[0].clientY) &&
                      void 0 !== c
                        ? c
                        : e.clientY,
                    w: 0,
                    h: 0,
                  };
                }
                const v = null !== (l = e.marginX) && void 0 !== l ? l : 0,
                  p = null !== (d = e.marginY) && void 0 !== d ? d : 0;
                let m, y;
                switch (
                  ((m =
                    void 0 === e.attachToXBy
                      ? (0, a.isRtl)()
                        ? 'right'
                        : 'left'
                      : 'auto' === e.attachToXBy
                      ? (0, a.isRtl)()
                        ? h.x - v - t >= 0
                          ? 'right'
                          : 'left'
                        : h.x + h.w + v + t <= n
                        ? 'left'
                        : 'right'
                      : e.attachToXBy),
                  m)
                ) {
                  case 'left':
                    y = h.x + h.w + v;
                    break;
                  case 'right':
                    y = h.x - t - v;
                }
                let _,
                  w = null !== (f = e.attachToYBy) && void 0 !== f ? f : 'auto';
                'auto-strict' === w && (w = o < h.y + h.h + p + r ? 'bottom' : 'top');
                let g = h.y;
                switch (w) {
                  case 'top':
                    (g = h.y + h.h + p), (_ = r > o - g ? o - g : void 0);
                    break;
                  case 'bottom':
                    (g = Math.max(0, h.y - p - r)), (_ = 0 === g ? h.y - p : void 0);
                }
                return { x: y, y: g, overrideHeight: _ };
              },
              isOpened: !0,
              onClose: () => {
                this.hide(), this._unmount();
              },
              doNotCloseOn: this._doNotCloseOn,
              takeFocus: this._takeFocus,
              menuElementReference: this._menuElementRef,
            });
        }
        hide() {
          (this._isShown = !1), this._render({ ...this._props, isOpened: !1 });
        }
        isShown() {
          return this._isShown;
        }
        _unmount() {
          (this._isShown = !1),
            o.unmountComponentAtNode(this._root),
            this._onDestroy && this._onDestroy(),
            this._returnFocus &&
              this._activeElement instanceof HTMLElement &&
              this._activeElement.focus({ preventScroll: !0 });
        }
        _render(e) {
          o.render(
            n.createElement(
              s.SlotContext.Provider,
              { value: this._manager },
              n.createElement(i.OverlapContextMenu, { ...e }),
            ),
            this._root,
          );
        }
      }
    },
    214665: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" width="10" height="16"><path d="M.6 1.4l1.4-1.4 8 8-8 8-1.4-1.4 6.389-6.532-6.389-6.668z"/></svg>';
    },
    239146: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" d="M9 1l2.35 4.76 5.26.77-3.8 3.7.9 5.24L9 13l-4.7 2.47.9-5.23-3.8-3.71 5.25-.77L9 1z"/></svg>';
    },
    648010: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M9 2.13l1.903 3.855.116.236.26.038 4.255.618-3.079 3.001-.188.184.044.259.727 4.237-3.805-2L9 12.434l-.233.122-3.805 2.001.727-4.237.044-.26-.188-.183-3.079-3.001 4.255-.618.26-.038.116-.236L9 2.13z"/></svg>';
    },
    44629: e => {
      e.exports = {
        ar: ['اضف إلى القائمة التفضيلات'],
        ca_ES: ['Afegeix a preferits'],
        cs: ['Přidat do oblíbených'],
        de: ['Zu Favoriten hinzufügen'],
        el: ['Προσθήκη στα αγαπημένα'],
        en: 'Add to favorites',
        es: ['Añadir a favoritos'],
        fa: ['افزودن به موارد مورد علاقه'],
        fr: ['Ajouter aux favoris'],
        he_IL: ['הוסף למועדפים'],
        hu_HU: ['Hozzáadás kedvencekhez'],
        id_ID: ['Tambah ke daftar favorit'],
        it: ['Aggiungi ai preferiti'],
        ja: ['お気に入りに追加'],
        ko: ['즐겨찾기에 넣기'],
        ms_MY: ['Tambah kepada kegemaran'],
        nl_NL: ['Voeg toe aan favorieten'],
        pl: ['Dodaj do ulubionych'],
        pt: ['Adicionar aos favoritos'],
        ro: 'Add to favorites',
        ru: ['Добавить в избранное'],
        sv: ['Lägg till som favorit'],
        th: ['เพิ่มลงรายการโปรด'],
        tr: ['Favorilere ekle'],
        vi: ['Thêm vào mục yêu thích'],
        zh: ['添加到收藏'],
        zh_TW: ['加入收藏'],
      };
    },
    572482: e => {
      e.exports = {
        ar: ['حذف من القائمة المفضلة'],
        ca_ES: ['Treure de preferits'],
        cs: ['Odebrat z oblíbených'],
        de: ['Aus Favoriten entfernen'],
        el: ['Διαγραφή απο τα αγαπημένα'],
        en: 'Remove from favorites',
        es: ['Quitar de favoritos'],
        fa: ['حذف از موارد مورد علاقه'],
        fr: ['Retirer des favoris'],
        he_IL: ['הסר ממועדפים'],
        hu_HU: ['Eltávolít kedvencek közül'],
        id_ID: ['Hilangkan dari favorit'],
        it: ['Rimuovi dai preferiti'],
        ja: ['お気に入りから削除'],
        ko: ['즐겨찾기지움'],
        ms_MY: ['Buang dari kegemaran'],
        nl_NL: ['Verwijder van favorieten'],
        pl: ['Usuń z ulubionych'],
        pt: ['Remover dos favoritos'],
        ro: 'Remove from favorites',
        ru: ['Удалить из предпочтений'],
        sv: ['Ta bort från favoriter'],
        th: ['ลบออกจากรายการโปรด'],
        tr: ['Favorilerimden çıkar'],
        vi: ['Loại bỏ khỏi mục yêu thích'],
        zh: ['从收藏中移除'],
        zh_TW: ['從收藏移除'],
      };
    },
  },
]);
