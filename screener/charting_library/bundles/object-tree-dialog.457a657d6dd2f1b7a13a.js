(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [4862, 5416, 9937, 766],
  {
    425398: e => {
      e.exports = {
        'round-button': 'round-button-FujgyDpN',
        icon: 'icon-FujgyDpN',
        content: 'content-FujgyDpN',
        link: 'link-FujgyDpN',
        'color-brand': 'color-brand-FujgyDpN',
        'variant-primary': 'variant-primary-FujgyDpN',
        'disable-themes': 'disable-themes-FujgyDpN',
        activated: 'activated-FujgyDpN',
        'variant-quiet-primary': 'variant-quiet-primary-FujgyDpN',
        'variant-secondary': 'variant-secondary-FujgyDpN',
        'variant-ghost': 'variant-ghost-FujgyDpN',
        'color-gray': 'color-gray-FujgyDpN',
        'color-red': 'color-red-FujgyDpN',
        'color-black': 'color-black-FujgyDpN',
        'color-invertedblack': 'color-invertedblack-FujgyDpN',
        'size-xsmall': 'size-xsmall-FujgyDpN',
        'icon-only': 'icon-only-FujgyDpN',
        'with-start-icon': 'with-start-icon-FujgyDpN',
        'with-end-icon': 'with-end-icon-FujgyDpN',
        startIcon: 'startIcon-FujgyDpN',
        endIcon: 'endIcon-FujgyDpN',
        'size-small': 'size-small-FujgyDpN',
        'size-medium': 'size-medium-FujgyDpN',
        'size-large': 'size-large-FujgyDpN',
        'size-xlarge': 'size-xlarge-FujgyDpN',
        'size-xxlarge': 'size-xxlarge-FujgyDpN',
        animated: 'animated-FujgyDpN',
        stretch: 'stretch-FujgyDpN',
      };
    },
    448729: e => {
      e.exports = {
        'round-tabs': 'round-tabs-J4T7wK54',
        'align-start': 'align-start-J4T7wK54',
        'align-center': 'align-center-J4T7wK54',
        tab: 'tab-J4T7wK54',
        'tab-primary': 'tab-primary-J4T7wK54',
        checked: 'checked-J4T7wK54',
        'tab-ghost': 'tab-ghost-J4T7wK54',
        'size-xsmall': 'size-xsmall-J4T7wK54',
        'size-small': 'size-small-J4T7wK54',
        'size-large': 'size-large-J4T7wK54',
      };
    },
    528355: e => {
      e.exports = {
        title: 'title-QPktCwTY',
        tabs: 'tabs-QPktCwTY',
        empty: 'empty-QPktCwTY',
        image: 'image-QPktCwTY',
        spinner: 'spinner-QPktCwTY',
        contentList: 'contentList-QPktCwTY',
      };
    },
    317742: e => {
      e.exports = { dialog: 'dialog-VUnQLSMH', button: 'button-VUnQLSMH' };
    },
    19175: e => {
      e.exports = {
        dialog: 'dialog-CPGBbsmc',
        rounded: 'rounded-CPGBbsmc',
        shadowed: 'shadowed-CPGBbsmc',
        fullscreen: 'fullscreen-CPGBbsmc',
        darker: 'darker-CPGBbsmc',
        backdrop: 'backdrop-CPGBbsmc',
      };
    },
    308326: e => {
      e.exports = {
        'tablet-normal-breakpoint': 'screen and (max-width: 768px)',
        'tooltip-offset': '20px',
        dialog: 'dialog-qyCw0PaN',
        dragging: 'dragging-qyCw0PaN',
        dialogAnimatedAppearance: 'dialogAnimatedAppearance-qyCw0PaN',
        dialogAnimation: 'dialogAnimation-qyCw0PaN',
        dialogTooltip: 'dialogTooltip-qyCw0PaN',
      };
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
    540191: e => {
      e.exports = {
        menuWrap: 'menuWrap-Kq3ruQo8',
        isMeasuring: 'isMeasuring-Kq3ruQo8',
        scrollWrap: 'scrollWrap-Kq3ruQo8',
        momentumBased: 'momentumBased-Kq3ruQo8',
        menuBox: 'menuBox-Kq3ruQo8',
        isHidden: 'isHidden-Kq3ruQo8',
      };
    },
    934587: e => {
      e.exports = { icon: 'icon-WB2y0EnP', dropped: 'dropped-WB2y0EnP' };
    },
    959189: (e, t, n) => {
      'use strict';
      function s(e, t) {
        return t || null == e || (('string' == typeof e || Array.isArray(e)) && 0 === e.length);
      }
      n.d(t, { isIconOnly: () => s });
    },
    409245: (e, t, n) => {
      'use strict';
      function s(e) {
        const { reference: t, ...n } = e;
        return { ...n, ref: t };
      }
      n.d(t, { renameRef: () => s });
    },
    591365: (e, t, n) => {
      'use strict';
      n.d(t, {
        CustomComponentDefaultLink: () => i,
      });
      var s = n(50959),
        o = n(409245);
      function i(e) {
        return s.createElement('a', { ...(0, o.renameRef)(e) });
      }
      s.PureComponent;
    },
    908783: (e, t, n) => {
      'use strict';
      n.d(t, { useOutsideEvent: () => i });
      var s = n(50959),
        o = n(778199);
      function i(e) {
        const {
            click: t,
            mouseDown: n,
            touchEnd: i,
            touchStart: r,
            handler: a,
            reference: l,
            ownerDocument: d = document,
          } = e,
          u = (0, s.useRef)(null),
          c = (0, s.useRef)(new CustomEvent('timestamp').timeStamp);
        return (
          (0, s.useLayoutEffect)(() => {
            const e = { click: t, mouseDown: n, touchEnd: i, touchStart: r },
              s = l ? l.current : u.current;
            return (0, o.addOutsideEventListener)(c.current, s, a, d, e);
          }, [t, n, i, r, a]),
          l || u
        );
      }
    },
    823030: (e, t, n) => {
      'use strict';
      n.d(t, { SubmenuContext: () => o, SubmenuHandler: () => i });
      var s = n(50959);
      const o = s.createContext(null);
      function i(e) {
        const [t, n] = (0, s.useState)(null),
          i = (0, s.useRef)(null),
          r = (0, s.useRef)(new Map());
        return (
          (0, s.useEffect)(
            () => () => {
              null !== i.current && clearTimeout(i.current);
            },
            [],
          ),
          s.createElement(
            o.Provider,
            {
              value: {
                current: t,
                setCurrent: function (e) {
                  null !== i.current && (clearTimeout(i.current), (i.current = null));
                  null === t
                    ? n(e)
                    : (i.current = setTimeout(() => {
                        (i.current = null), n(e);
                      }, 100));
                },
                registerSubmenu: function (e, t) {
                  return (
                    r.current.set(e, t),
                    () => {
                      r.current.delete(e);
                    }
                  );
                },
                isSubmenuNode: function (e) {
                  return Array.from(r.current.values()).some(t => t(e));
                },
              },
            },
            e.children,
          )
        );
      }
    },
    111706: (e, t, n) => {
      'use strict';
      function s(e) {
        return 0 === e.detail;
      }
      n.d(t, { isKeyboardClick: () => s });
    },
    801808: (e, t, n) => {
      'use strict';
      n.d(t, { OverlapManager: () => i, getRootOverlapManager: () => a });
      var s = n(650151);
      class o {
        constructor() {
          this._storage = [];
        }
        add(e) {
          this._storage.push(e);
        }
        remove(e) {
          this._storage = this._storage.filter(t => e !== t);
        }
        has(e) {
          return this._storage.includes(e);
        }
        getItems() {
          return this._storage;
        }
      }
      class i {
        constructor(e = document) {
          (this._storage = new o()),
            (this._windows = new Map()),
            (this._index = 0),
            (this._document = e),
            (this._container = e.createDocumentFragment());
        }
        setContainer(e) {
          const t = this._container,
            n = null === e ? this._document.createDocumentFragment() : e;
          !(function (e, t) {
            Array.from(e.childNodes).forEach(e => {
              e.nodeType === Node.ELEMENT_NODE && t.appendChild(e);
            });
          })(t, n),
            (this._container = n);
        }
        registerWindow(e) {
          this._storage.has(e) || this._storage.add(e);
        }
        ensureWindow(e, t = { position: 'fixed', direction: 'normal' }) {
          const n = this._windows.get(e);
          if (void 0 !== n) return n;
          this.registerWindow(e);
          const s = this._document.createElement('div');
          if (
            ((s.style.position = t.position),
            (s.style.zIndex = this._index.toString()),
            (s.dataset.id = e),
            void 0 !== t.index)
          ) {
            const e = this._container.childNodes.length;
            if (t.index >= e) this._container.appendChild(s);
            else if (t.index <= 0) this._container.insertBefore(s, this._container.firstChild);
            else {
              const e = this._container.childNodes[t.index];
              this._container.insertBefore(s, e);
            }
          } else
            'reverse' === t.direction
              ? this._container.insertBefore(s, this._container.firstChild)
              : this._container.appendChild(s);
          return this._windows.set(e, s), ++this._index, s;
        }
        unregisterWindow(e) {
          this._storage.remove(e);
          const t = this._windows.get(e);
          void 0 !== t &&
            (null !== t.parentElement && t.parentElement.removeChild(t), this._windows.delete(e));
        }
        getZindex(e) {
          const t = this.ensureWindow(e);
          return parseInt(t.style.zIndex || '0');
        }
        moveToTop(e) {
          if (this.getZindex(e) !== this._index) {
            this.ensureWindow(e).style.zIndex = (++this._index).toString();
          }
        }
        removeWindow(e) {
          this.unregisterWindow(e);
        }
      }
      const r = new WeakMap();
      function a(e = document) {
        const t = e.getElementById('overlap-manager-root');
        if (null !== t) return (0, s.ensureDefined)(r.get(t));
        {
          const t = new i(e),
            n = (function (e) {
              const t = e.createElement('div');
              return (
                (t.style.position = 'absolute'),
                (t.style.zIndex = (150).toString()),
                (t.style.top = '0px'),
                (t.style.left = '0px'),
                (t.id = 'overlap-manager-root'),
                t
              );
            })(e);
          return r.set(n, t), t.setContainer(n), e.body.appendChild(n), t;
        }
      }
    },
    269842: (e, t, n) => {
      'use strict';
      function s(...e) {
        return t => {
          for (const n of e) void 0 !== n && n(t);
        };
      }
      n.d(t, { createSafeMulticastEventHandler: () => s });
    },
    247465: (e, t, n) => {
      'use strict';
      n.d(t, { isCancelled: () => i, makeCancelable: () => o });
      class s extends Error {
        constructor() {
          super('CancelToken');
        }
      }
      function o(e) {
        let t = !1;
        return {
          promise: new Promise((n, o) => {
            e.then(e => (t ? o(new s()) : n(e))), e.catch(e => o(t ? new s() : e));
          }),
          cancel() {
            t = !0;
          },
        };
      }
      function i(e) {
        return e instanceof s;
      }
    },
    285089: (e, t, n) => {
      'use strict';
      n.d(t, { setFixedBodyState: () => l });
      var s = n(735922);
      const o = () => !window.matchMedia('screen and (min-width: 768px)').matches,
        i = () => !window.matchMedia('screen and (min-width: 1280px)').matches;
      let r = 0,
        a = !1;
      function l(e) {
        const { body: t } = document,
          n = t.querySelector('.widgetbar-wrap');
        if (e && 1 == ++r) {
          const e = (0, s.getCSSProperty)(t, 'overflow'),
            o = (0, s.getCSSPropertyNumericValue)(t, 'padding-right');
          'hidden' !== e.toLowerCase() &&
            t.scrollHeight > t.offsetHeight &&
            ((0, s.setStyle)(n, 'right', `${(0, s.getScrollbarWidth)()}px`),
            (t.style.paddingRight = `${o + (0, s.getScrollbarWidth)()}px`),
            (a = !0)),
            t.classList.add('i-no-scroll');
        } else if (!e && r > 0 && 0 == --r && (t.classList.remove('i-no-scroll'), a)) {
          (0, s.setStyle)(n, 'right', '0px');
          let e = 0;
          (e = n
            ? ((l = (0, s.getContentWidth)(n)), o() ? 0 : i() ? 45 : Math.min(Math.max(l, 45), 450))
            : 0),
            t.scrollHeight <= t.clientHeight && (e -= (0, s.getScrollbarWidth)()),
            (t.style.paddingRight = (e < 0 ? 0 : e) + 'px'),
            (a = !1);
        }
        var l;
      }
    },
    340092: (e, t, n) => {
      'use strict';
      n.d(t, { ManageDrawings: () => I });
      var s = n(50959),
        o = n(343370),
        i = (n(650151), n(72571)),
        r = n(509806),
        a = n(664902),
        l = n(650802),
        d = n(6835),
        u = n(919577),
        c = n(73572),
        h = n(372605),
        p = n(665276),
        m = n(497754),
        g = n.n(m);
      var v = n(800417),
        f = n(959189),
        y = n(425398),
        _ = n.n(y);
      function w(e) {
        const {
          className: t,
          color: n,
          variant: s,
          size: o,
          stretch: i,
          animated: r,
          disableThemes: a,
          isInvertedColorTheme: l,
          ...d
        } = e;
        return { ...d, ...(0, v.filterDataProps)(e), ...(0, v.filterAriaProps)(e) };
      }
      function b(e) {
        const { reference: t, children: n, iconOnly: o, startIcon: r, endIcon: a, ...l } = e,
          d = (function (e, t) {
            const {
                className: n,
                color: s = 'brand',
                variant: o = 'primary',
                size: i = 'xlarge',
                stretch: r,
                animated: a = !1,
                disableThemes: l = !1,
                iconOnly: d = !1,
                isAnchor: u = !1,
                isActivated: c = !1,
                isInvertedColorTheme: h = !1,
                endIcon: p,
                startIcon: g,
              } = t,
              v = (function (e, t) {
                return !!t && 'black' === e;
              })(s, h);
            return m(
              n,
              e['round-button'],
              v ? e[`color-inverted${s}`] : e[`color-${s}`],
              e[`variant-${o}`],
              e[`size-${i}`],
              a && e.animated,
              r && e.stretch,
              l && e['disable-themes'],
              d && e['icon-only'],
              u && e.link,
              c && e.activated,
              g && e['with-start-icon'],
              p && e['with-end-icon'],
            );
          })(_(), e);
        return s.createElement(
          'button',
          { ...w(l), className: d, ref: t },
          r && s.createElement(i.Icon, { className: g()(_().icon, _().startIcon), icon: r }),
          !(0, f.isIconOnly)(n, o) && s.createElement('span', { className: _().content }, n),
          a && s.createElement(i.Icon, { className: g()(_().icon, _().endIcon), icon: a }),
        );
      }
      n(591365);
      function C(e, t) {
        const { align: n = 'start', size: s = 'xsmall' } = t;
        return m(e['round-tabs'], e[`align-${n}`], e[`size-${s}`]);
      }
      function S(e, t) {
        const { variant: n = 'primary', isChecked: s } = t;
        return m(e.tab, e[`tab-${n}`], s && e.checked);
      }
      var E = n(448729),
        x = n.n(E);
      const D = s.forwardRef((e, t) => {
        const { tabs: n, size: o = 'xsmall', variant: i = 'primary', theme: r = x() } = e;
        return s.createElement(
          'div',
          { className: C(r, e), ref: t },
          n.map(e => {
            const { isChecked: t, ...n } = e;
            return s.createElement(b, {
              ...n,
              className: S(r, { ...n, variant: i, isChecked: t }),
              size: o,
              variant: i,
            });
          }),
        );
      });
      D.displayName = 'RoundTabsButtons';
      r.t(null, void 0, n(587871)), r.t(null, void 0, n(310538)), r.t(null, void 0, n(274860));
      var M = n(229540),
        T = n(528355);
      const N = (0, d.getLogger)('Chart.ManageDrawings'),
        k = new Map();
      function O(e) {
        let t = k.get(e);
        return void 0 === t && ((t = new l.WatchedValue([])), k.set(e, t)), t;
      }
      const z = new a.TranslatedString(
          'remove all line tools for {symbol}',
          r.t(null, void 0, n(923481)),
        ),
        L = e =>
          r
            .t(null, { plural: '{drawingsCount} drawings', count: e }, n(988143))
            .format({ drawingsCount: e.toString() }),
        R = r.t(null, void 0, n(985128)),
        P = r.t(null, void 0, n(318570));
      function F(e) {
        const [t, n] = s.useState(null),
          [i, r] = s.useState(null),
          [a, l] = s.useState(null),
          [d, c] = (s.useRef(null), s.useState([]));
        return (
          s.useEffect(
            () => (
              e.withModel(null, () => {
                const t = e.model();
                n(t), r(t.mainSeries().symbol());
              }),
              () => n(null)
            ),
            [e],
          ),
          s.useEffect(() => {
            if (null !== t) {
              const e = {},
                n = (0, o.default)(v, 250, { leading: !1 });
              return (
                v(),
                t.model().dataSourceCollectionChanged().subscribe(e, n),
                () => {
                  t.model().dataSourceCollectionChanged().unsubscribe(e, n);
                }
              );
            }
          }, [t]),
          s.useEffect(() => {
            if (null !== t) {
              const e = O(t.model().id()).spawn();
              return (
                c([...e.value()]),
                e.subscribe(() => c([...e.value()])),
                () => (null == e ? void 0 : e.destroy())
              );
            }
          }, [t]),
          s.useMemo(
            () => ({
              currentSymbol: i,
              symbolDrawingsMaps: a,
              removeSymbolDrawings: p,
              changeSymbol: m,
              hiddenSymbols: d,
            }),
            [i, a, p, m, d],
          )
        );
        async function p(e, n) {
          if (t && a) {
            const s = a[n].get(e);
            if (s) {
              const n = Array.from(s)
                .map(e => t.model().dataSourceForId(e))
                .filter(h.notNull);
              n.length > 0 && t.removeSources(n, !1, z.format({ symbol: e }));
              const o = O(t.model().id());
              o.setValue([...o.value(), e]);
              try {
                await v();
              } catch (e) {
                N.logError(`Error removing line tools: ${e}`);
              }
              o.setValue(o.value().filter(t => t !== e));
            }
          }
        }
        function m(n) {
          e.setSymbol(n), null !== t && r(n);
        }
        async function g(e) {
          const t = (function (e) {
            const t = [new Map(), new Map(), new Map()];
            {
              const n = t[0];
              e.forEach(e => {
                var t;
                if ((0, u.isLineTool)(e) && e.showInObjectTree()) {
                  const s = null !== (t = e.symbol()) && void 0 !== t ? t : '',
                    o = n.get(s) || new Set();
                  o.add(e.id()), n.set(s, o);
                }
              });
            }
            return t;
          })(e);
          return (
            (
              await (async function () {
                return [new Map(), new Map(), new Map()];
              })()
            ).forEach((e, n) => {
              const s = t[n];
              e.forEach((e, t) => {
                const n = s.get(t) || new Set();
                e.forEach(e => n.add(e)), s.set(t, n);
              });
            }),
            t
          );
        }
        async function v() {
          null !== t && l(await g(t.dataSources()));
        }
      }
      function I(e) {
        const { isMobile: t, chartWidget: o, onClose: a, onInitialized: l } = e,
          {
            currentSymbol: d,
            symbolDrawingsMaps: u,
            removeSymbolDrawings: h,
            changeSymbol: m,
            hiddenSymbols: g,
          } = F(o),
          [v, f] = s.useState(0),
          [y, _, w] = s.useMemo(() => {
            var e;
            if (null !== d && null !== u) {
              const t = [];
              let n = 0,
                s = v;
              if (null === s)
                for (
                  s = 2;
                  s > 0 &&
                  !(((null === (e = u[s].get(d)) || void 0 === e ? void 0 : e.size) || 0) > 0);

                )
                  s--;
              return (
                u[s].forEach((e, s) => {
                  g.includes(s) ||
                    (t.push({
                      symbol: s,
                      drawingsCount: e.size,
                      onRemove: () =>
                        (function (e) {
                          h(e, w);
                        })(s),
                      onClick: () =>
                        (function (e) {
                          '' !== e && (m(e), null == a || a());
                        })(s),
                    }),
                    (n += e.size));
                }),
                t.sort((e, t) =>
                  e.drawingsCount === t.drawingsCount
                    ? e.symbol.localeCompare(t.symbol)
                    : e.drawingsCount > t.drawingsCount
                    ? -1
                    : 1,
                ),
                [t, n, s]
              );
            }
            return [[], 0, 0];
          }, [d, v, u, g]);
        return (
          s.useEffect(() => {
            null !== u && (null == l || l());
          }, [u]),
          s.createElement(
            s.Fragment,
            null,
            y.length > 0 &&
              s.createElement(
                'div',
                { className: T.title },
                `${
                  ((b = u ? u[w].size : 0),
                  r
                    .t(
                      null,
                      {
                        plural: '{symbolsCount} symbols',
                        context: 'symbols_and_drawings_count',
                        count: b,
                      },
                      n(352908),
                    )
                    .format({ symbolsCount: b.toString() }))
                } ${(e =>
                  r
                    .t(
                      null,
                      {
                        plural: 'with {drawingsCount} drawings',
                        context: 'symbols_and_drawings_count',
                        count: e,
                      },
                      n(542743),
                    )
                    .format({ drawingsCount: e.toString() }))(_)}`,
              ),
            0 === y.length
              ? null === u
                ? s.createElement(p.Spinner, { className: T.spinner })
                : s.createElement(
                    'div',
                    { className: T.empty },
                    s.createElement(i.Icon, { className: T.image, icon: M }),
                    s.createElement('span', null, P),
                  )
              : y.map(({ symbol: e, drawingsCount: n, onRemove: o, onClick: i }) =>
                  s.createElement(c.DialogContentItem, {
                    key: e,
                    title: e,
                    subtitle: L(n),
                    removeBtnLabel: R,
                    isActive: e === d,
                    isMobile: t,
                    onClick: i,
                    onClickRemove: o,
                    showFavorite: !1,
                  }),
                ),
          )
        );
        var b;
      }
    },
    899329: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { ObjectTreeDialogRenderer: () => S });
      var s = n(50959),
        o = n(500962),
        i = n(947088),
        r = n(759339),
        a = n(163694),
        l = n(930052),
        d = n(509806),
        u = n(533408),
        c = n(996038),
        h = n(340092);
      var p = n(993321),
        m = n(420779),
        g = n(535842),
        v = n(317742);
      class f extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._isMounted = !1),
            (this._dialogRef = s.createRef()),
            (this._renderChildren = e =>
              s.createElement(y, { isSmallTablet: e, viewModel: this.props.viewModel })),
            (this._handleMediaChange = () => {
              this.state.showDrawer &&
                !window.matchMedia(c.DialogBreakpoints.TabletSmall).matches &&
                this.setState({ showDrawer: !1 });
            }),
            (this._onManageDrawings = e => {
              throw new Error('not supported');
            }),
            (this._closeDrawer = () => {
              this.setState({ showDrawer: !1 });
            }),
            (this._handleContextMenuOpened = e => {
              this.setState({ isContextMenuOpened: e });
            }),
            (this._matchMedia = window.matchMedia(c.DialogBreakpoints.TabletSmall)),
            (this.state = { showDrawer: !1, showDialog: !1, isContextMenuOpened: !1 });
        }
        componentDidMount() {
          (this._isMounted = !0),
            this._matchMedia.addListener(this._handleMediaChange),
            this.props.viewModel.isContextMenuOpened().subscribe(this._handleContextMenuOpened);
        }
        componentWillUnmount() {
          (this._isMounted = !1),
            this._matchMedia.removeListener(this._handleMediaChange),
            this.props.viewModel.isContextMenuOpened().unsubscribe(this._handleContextMenuOpened);
        }
        render() {
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(l.MatchMedia, { rule: c.DialogBreakpoints.TabletSmall }, e =>
              s.createElement(u.AdaptivePopupDialog, {
                additionalElementPos: 'after',
                additionalHeaderElement: !1,
                className: v.dialog,
                dataName: 'object-tree-dialog',
                isOpened: !0,
                onClickOutside:
                  this.state.showDialog || e || this.state.isContextMenuOpened
                    ? () => {}
                    : this.props.onClose,
                onClose: this.props.onClose,
                ref: this._dialogRef,
                render: () => this._renderChildren(e),
                title: d.t(null, void 0, n(831095)),
                showSeparator: !0,
              }),
            ),
            s.createElement(
              a.DrawerManager,
              null,
              this.state.showDrawer &&
                s.createElement(
                  r.Drawer,
                  { onClose: this._closeDrawer, position: 'Bottom' },
                  s.createElement(h.ManageDrawings, {
                    onClose: this._closeDrawer,
                    chartWidget: this.props.activeChartWidget,
                    isMobile: !0,
                  }),
                ),
            ),
          );
        }
      }
      function y(e) {
        const { isSmallTablet: t, viewModel: n } = e,
          o = (0, s.useMemo)(() => ({ size: t ? 1 : 0, smallSizeTreeNodeAction: 0 }), [t]);
        return s.createElement(
          g.SizeContext.Provider,
          { value: o },
          s.createElement(p.ObjectTree, {
            nodeRenderer: m.NodeRenderer,
            showHeader: !1,
            viewModel: n,
            isDialog: !0,
          }),
        );
      }
      var _ = n(33290),
        w = n(557883),
        b = n(715489),
        C = n(19406);
      class S extends C.DialogRenderer {
        constructor() {
          super(),
            (this._handleClose = () => {
              o.unmountComponentAtNode(this._container),
                this._setVisibility(!1),
                null !== this._viewModel && (this._viewModel.destroy(), (this._viewModel = null));
            });
          const e = (0, _.service)(w.CHART_WIDGET_COLLECTION_SERVICE);
          (this._activeChartWidget = e.activeChartWidget.value()),
            (this._viewModel = new b.ObjectTree(e.activeChartWidget));
        }
        hide() {
          this._handleClose();
        }
        isVisible() {
          return this.visible().value();
        }
        show() {
          (0, i.loadAllSourcesIcons)().then(() => {
            null !== this._viewModel &&
              (o.render(
                s.createElement(f, {
                  onClose: this._handleClose,
                  viewModel: this._viewModel,
                  activeChartWidget: this._activeChartWidget,
                }),
                this._container,
              ),
              this._setVisibility(!0));
          });
        }
      }
    },
    131537: (e, t, n) => {
      'use strict';
      n.d(t, { Dialog: () => d });
      var s = n(50959),
        o = n(497754),
        i = n(630795),
        r = n(801808),
        a = n(800417),
        l = n(19175);
      class d extends s.PureComponent {
        constructor() {
          super(...arguments),
            (this._manager = new r.OverlapManager()),
            (this._handleSlot = e => {
              this._manager.setContainer(e);
            });
        }
        render() {
          const {
              rounded: e = !0,
              shadowed: t = !0,
              fullscreen: n = !1,
              darker: r = !1,
              className: d,
              backdrop: u,
              containerTabIndex: c = -1,
            } = this.props,
            h = o(d, l.dialog, e && l.rounded, t && l.shadowed, n && l.fullscreen, r && l.darker),
            p = (0, a.filterDataProps)(this.props),
            m = this.props.style
              ? { ...this._createStyles(), ...this.props.style }
              : this._createStyles();
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              i.SlotContext.Provider,
              { value: this._manager },
              u &&
                s.createElement('div', {
                  onClick: this.props.onClickBackdrop,
                  className: l.backdrop,
                }),
              s.createElement(
                'div',
                {
                  ...p,
                  className: h,
                  style: m,
                  ref: this.props.reference,
                  onFocus: this.props.onFocus,
                  onMouseDown: this.props.onMouseDown,
                  onMouseUp: this.props.onMouseUp,
                  onClick: this.props.onClick,
                  onKeyDown: this.props.onKeyDown,
                  tabIndex: c,
                  'aria-label': this.props.containerAriaLabel,
                },
                this.props.children,
              ),
            ),
            s.createElement(i.Slot, { reference: this._handleSlot }),
          );
        }
        _createStyles() {
          const {
            bottom: e,
            left: t,
            width: n,
            right: s,
            top: o,
            zIndex: i,
            height: r,
          } = this.props;
          return { bottom: e, left: t, right: s, top: o, zIndex: i, maxWidth: n, height: r };
        }
      }
    },
    910549: (e, t, n) => {
      'use strict';
      n.d(t, { PopupContext: () => s });
      const s = n(50959).createContext(null);
    },
    40766: (e, t, n) => {
      'use strict';
      n.d(t, { PopupDialog: () => C });
      var s = n(50959),
        o = n(497754),
        i = n(650151),
        r = n(131537),
        a = n(874485),
        l = n(923235),
        d = n(44681);
      function u(e, t, n, s) {
        return e + t > s && (e = s - t), e < n && (e = n), e;
      }
      function c(e) {
        return {
          x: (0, d.clamp)(e.x, 20, document.documentElement.clientWidth - 20),
          y: (0, d.clamp)(e.y, 20, window.innerHeight - 20),
        };
      }
      function h(e) {
        return { x: e.clientX, y: e.clientY };
      }
      function p(e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      class m {
        constructor(e, t, n = { boundByScreen: !0 }) {
          (this._drag = null),
            (this._canBeTouchClick = !1),
            (this._frame = null),
            (this._onMouseDragStart = e => {
              if (0 !== e.button || this._isTargetNoDraggable(e)) return;
              e.preventDefault(),
                document.addEventListener('mousemove', this._onMouseDragMove),
                document.addEventListener('mouseup', this._onMouseDragEnd);
              const t = c(h(e));
              this._dragStart(t);
            }),
            (this._onTouchDragStart = e => {
              if (this._isTargetNoDraggable(e)) return;
              (this._canBeTouchClick = !0),
                e.preventDefault(),
                this._header.addEventListener('touchmove', this._onTouchDragMove, { passive: !1 });
              const t = c(p(e));
              this._dragStart(t);
            }),
            (this._onMouseDragEnd = e => {
              e.target instanceof Node && this._header.contains(e.target) && e.preventDefault(),
                document.removeEventListener('mousemove', this._onMouseDragMove),
                document.removeEventListener('mouseup', this._onMouseDragEnd),
                this._onDragStop();
            }),
            (this._onTouchDragEnd = e => {
              this._header.removeEventListener('touchmove', this._onTouchDragMove),
                this._onDragStop(),
                this._canBeTouchClick &&
                  ((this._canBeTouchClick = !1),
                  (function (e) {
                    if (e instanceof SVGElement) {
                      const t = document.createEvent('SVGEvents');
                      t.initEvent('click', !0, !0), e.dispatchEvent(t);
                    }
                    e instanceof HTMLElement && e.click();
                  })(e.target));
            }),
            (this._onMouseDragMove = e => {
              const t = c(h(e));
              this._dragMove(t);
            }),
            (this._onTouchDragMove = e => {
              (this._canBeTouchClick = !1), e.preventDefault();
              const t = c(p(e));
              this._dragMove(t);
            }),
            (this._onDragStop = () => {
              (this._drag = null),
                this._header.classList.remove('dragging'),
                this._options.onDragEnd && this._options.onDragEnd();
            }),
            (this._dialog = e),
            (this._header = t),
            (this._options = n),
            this._header.addEventListener('mousedown', this._onMouseDragStart),
            this._header.addEventListener('touchstart', this._onTouchDragStart),
            this._header.addEventListener('touchend', this._onTouchDragEnd);
        }
        destroy() {
          null !== this._frame && cancelAnimationFrame(this._frame),
            this._header.removeEventListener('mousedown', this._onMouseDragStart),
            document.removeEventListener('mouseup', this._onMouseDragEnd),
            this._header.removeEventListener('touchstart', this._onTouchDragStart),
            this._header.removeEventListener('touchend', this._onTouchDragEnd),
            document.removeEventListener('mouseleave', this._onMouseDragEnd);
        }
        updateOptions(e) {
          this._options = e;
        }
        _dragStart(e) {
          const t = this._dialog.getBoundingClientRect();
          this._drag = {
            startX: e.x,
            startY: e.y,
            finishX: e.x,
            finishY: e.y,
            dialogX: t.left,
            dialogY: t.top,
          };
          const n = Math.round(t.left),
            s = Math.round(t.top);
          (this._dialog.style.transform = `translate(${n}px, ${s}px)`),
            this._header.classList.add('dragging'),
            this._options.onDragStart && this._options.onDragStart();
        }
        _dragMove(e) {
          if (this._drag) {
            if (((this._drag.finishX = e.x), (this._drag.finishY = e.y), null !== this._frame))
              return;
            this._frame = requestAnimationFrame(() => {
              if (this._drag) {
                const t = e.x - this._drag.startX,
                  n = e.y - this._drag.startY;
                this._moveDialog(this._drag.dialogX + t, this._drag.dialogY + n);
              }
              this._frame = null;
            });
          }
        }
        _moveDialog(e, t) {
          const n = this._dialog.getBoundingClientRect(),
            { boundByScreen: s } = this._options,
            o = u(e, n.width, s ? 0 : -1 / 0, s ? window.innerWidth : 1 / 0),
            i = u(t, n.height, s ? 0 : -1 / 0, s ? window.innerHeight : 1 / 0);
          this._dialog.style.transform = `translate(${Math.round(o)}px, ${Math.round(i)}px)`;
        }
        _isTargetNoDraggable(e) {
          return e.target instanceof Element && null !== e.target.closest('[data-disable-drag]');
        }
      }
      const g = { vertical: 0 };
      class v {
        constructor(e, t) {
          (this._frame = null),
            (this._isFullscreen = !1),
            (this._handleResize = () => {
              null === this._frame &&
                (this._frame = requestAnimationFrame(() => {
                  this.recalculateBounds(), (this._frame = null);
                }));
            }),
            (this._dialog = e),
            (this._guard = t.guard || g),
            (this._calculateDialogPosition = t.calculateDialogPosition),
            (this._initialHeight = e.style.height),
            window.addEventListener('resize', this._handleResize);
        }
        updateOptions(e) {
          (this._guard = e.guard || g), (this._calculateDialogPosition = e.calculateDialogPosition);
        }
        setFullscreen(e) {
          this._isFullscreen !== e && ((this._isFullscreen = e), this.recalculateBounds());
        }
        centerAndFit() {
          const { x: e, y: t } = this.getDialogsTopLeftCoordinates(),
            n = this._calcAvailableHeight(),
            s = this._calcDialogHeight();
          if (n === s)
            if (this._calculateDialogPosition) {
              const { left: e, top: t } = this._calculateDialogPosition(
                this._dialog,
                document.documentElement,
                this._guard,
              );
              this._dialog.style.transform = `translate(${Math.round(e)}px, ${Math.round(t)}px)`;
            } else this._dialog.style.height = s + 'px';
          (this._dialog.style.top = '0px'),
            (this._dialog.style.left = '0px'),
            (this._dialog.style.transform = `translate(${e}px, ${t}px)`);
        }
        getDialogsTopLeftCoordinates() {
          const { clientHeight: e, clientWidth: t } = document.documentElement,
            n = this._calcDialogHeight(),
            s = t / 2 - this._dialog.clientWidth / 2,
            o = e / 2 - n / 2;
          return { x: Math.round(s), y: Math.round(o) };
        }
        recalculateBounds() {
          var e;
          const { clientHeight: t, clientWidth: n } = document.documentElement,
            { vertical: s } = this._guard,
            o =
              null === (e = this._calculateDialogPosition) || void 0 === e
                ? void 0
                : e.call(this, this._dialog, { clientWidth: n, clientHeight: t }, { vertical: s });
          if (this._isFullscreen) {
            if (
              ((this._dialog.style.top = '0px'),
              (this._dialog.style.left = '0px'),
              (this._dialog.style.width = '100%'),
              (this._dialog.style.height = '100%'),
              (this._dialog.style.transform = 'none'),
              o)
            ) {
              const { left: e, top: t, width: n, height: s } = o;
              (this._dialog.style.transform = `translate(${Math.round(e)}px, ${Math.round(t)}px)`),
                n &&
                  ((this._dialog.style.width = `${n}px`), (this._dialog.style.minWidth = 'unset')),
                s &&
                  ((this._dialog.style.height = `${s}px`),
                  (this._dialog.style.minHeight = 'unset'));
            }
          } else if (o) {
            const { left: e, top: t } = o;
            this._dialog.style.transform = `translate(${Math.round(e)}px, ${Math.round(t)}px)`;
          } else {
            (this._dialog.style.width = ''), (this._dialog.style.height = '');
            const e = this._dialog.getBoundingClientRect(),
              o = t - 2 * s,
              i = u(e.left, e.width, 0, n),
              r = u(e.top, e.height, s, t);
            (this._dialog.style.top = '0px'),
              (this._dialog.style.left = '0px'),
              (this._dialog.style.transform = `translate(${Math.round(i)}px, ${Math.round(r)}px)`),
              (this._dialog.style.height = o < e.height ? o + 'px' : this._initialHeight);
          }
        }
        destroy() {
          window.removeEventListener('resize', this._handleResize),
            null !== this._frame && (cancelAnimationFrame(this._frame), (this._frame = null));
        }
        _calcDialogHeight() {
          const e = this._calcAvailableHeight();
          return e < this._dialog.clientHeight ? e : this._dialog.clientHeight;
        }
        _calcAvailableHeight() {
          return document.documentElement.clientHeight - 2 * this._guard.vertical;
        }
      }
      var f = n(8361),
        y = n(910549),
        _ = n(285089),
        w = n(308326);
      w['tooltip-offset'];
      class b extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._dialog = null),
            (this._cleanUpFunctions = []),
            (this._prevActiveElement = null),
            (this._handleDialogRef = e => {
              const { reference: t } = this.props;
              (this._dialog = e), 'function' == typeof t && t(e);
            }),
            (this._handleFocus = e => {
              this._moveToTop();
            }),
            (this._handleMouseDown = e => {
              this._moveToTop();
            }),
            (this._handleTouchStart = e => {
              this._moveToTop();
            }),
            (this.state = { canFitTooltip: !1 });
        }
        render() {
          return s.createElement(
            y.PopupContext.Provider,
            { value: this },
            s.createElement(
              l.OutsideEvent,
              { mouseDown: !0, touchStart: !0, handler: this.props.onClickOutside },
              e =>
                s.createElement(
                  'div',
                  {
                    ref: e,
                    'data-outside-boundary-for': this.props.name,
                    onFocus: this._handleFocus,
                    onMouseDown: this._handleMouseDown,
                    onTouchStart: this._handleTouchStart,
                    'data-dialog-name': this.props['data-dialog-name'],
                  },
                  s.createElement(
                    r.Dialog,
                    {
                      style: this._applyAnimationCSSVariables(),
                      ...this.props,
                      reference: this._handleDialogRef,
                      className: o(w.dialog, this.props.className),
                    },
                    !1,
                    this.props.children,
                  ),
                ),
            ),
          );
        }
        componentDidMount() {
          const { draggable: e, boundByScreen: t, onDragStart: n } = this.props,
            s = (0, i.ensureNotNull)(this._dialog);
          if (e) {
            const e = s.querySelector('[data-dragg-area]');
            if (e && e instanceof HTMLElement) {
              const o = new m(s, e, { boundByScreen: Boolean(t), onDragStart: n });
              this._cleanUpFunctions.push(() => o.destroy()), (this._drag = o);
            }
          }
          (this._prevActiveElement = document.activeElement),
            this.props.autofocus && !s.contains(document.activeElement) && s.focus(),
            (this._isFullScreen() || this.props.fixedBody) && (0, _.setFixedBodyState)(!0);
          const { guard: o, calculateDialogPosition: r } = this.props;
          if (this.props.resizeHandler) this._resize = this.props.resizeHandler;
          else {
            const e = new v(s, { guard: o, calculateDialogPosition: r });
            this._cleanUpFunctions.push(() => e.destroy()), (this._resize = e);
          }
          this.props.isAnimationEnabled &&
            this.props.growPoint &&
            this._applyAppearanceAnimation(this.props.growPoint),
            this.props.centeredOnMount && this._resize.centerAndFit(),
            this._resize.setFullscreen(this._isFullScreen()),
            this.props.shouldForceFocus && s.focus();
        }
        componentDidUpdate() {
          if (this._resize) {
            const { guard: e, calculateDialogPosition: t } = this.props;
            this._resize.updateOptions({ guard: e, calculateDialogPosition: t }),
              this._resize.setFullscreen(this._isFullScreen());
          }
          this._drag &&
            this._drag.updateOptions({
              boundByScreen: Boolean(this.props.boundByScreen),
              onDragStart: this.props.onDragStart,
            });
        }
        componentWillUnmount() {
          var e;
          if (
            this.props.shouldReturnFocus &&
            this._prevActiveElement &&
            document.body.contains(this._prevActiveElement) &&
            (null === document.activeElement ||
              document.activeElement === document.body ||
              (null === (e = this._dialog) || void 0 === e
                ? void 0
                : e.contains(document.activeElement)))
          )
            try {
              this._prevActiveElement.focus({ preventScroll: !0 });
            } catch (e) {}
          for (const e of this._cleanUpFunctions) e();
          (this._isFullScreen() || this.props.fixedBody) && (0, _.setFixedBodyState)(!1);
        }
        focus() {
          this._dialog && this._dialog.focus();
        }
        centerAndFit() {
          this._resize && this._resize.centerAndFit();
        }
        recalculateBounds() {
          this._resize && this._resize.recalculateBounds();
        }
        _moveToTop() {
          null !== this.context && this.context.moveToTop();
        }
        _applyAnimationCSSVariables() {
          return {
            '--animationTranslateStartX': null,
            '--animationTranslateStartY': null,
            '--animationTranslateEndX': null,
            '--animationTranslateEndY': null,
          };
        }
        _applyAppearanceAnimation(e) {
          if (this._resize && this._dialog) {
            const { x: t, y: n } = e,
              { x: s, y: o } = this._resize.getDialogsTopLeftCoordinates();
            this._dialog.style.setProperty('--animationTranslateStartX', `${t}px`),
              this._dialog.style.setProperty('--animationTranslateStartY', `${n}px`),
              this._dialog.style.setProperty('--animationTranslateEndX', `${s}px`),
              this._dialog.style.setProperty('--animationTranslateEndY', `${o}px`),
              this._dialog.classList.add(w.dialogAnimatedAppearance);
          }
        }
        _handleTooltipFit() {
          0;
        }
        _isFullScreen() {
          return Boolean(this.props.fullscreen);
        }
      }
      (b.contextType = f.PortalContext),
        (b.defaultProps = {
          boundByScreen: !0,
          draggable: !0,
          centeredOnMount: !0,
          shouldReturnFocus: !0,
        });
      const C = (0, a.makeOverlapable)(b);
    },
    163694: (e, t, n) => {
      'use strict';
      n.d(t, { DrawerContext: () => r, DrawerManager: () => i });
      var s = n(50959),
        o = n(285089);
      class i extends s.PureComponent {
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
          return s.createElement(
            r.Provider,
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
      const r = s.createContext(null);
    },
    759339: (e, t, n) => {
      'use strict';
      n.d(t, { Drawer: () => h });
      var s = n(50959),
        o = n(650151),
        i = n(497754),
        r = n(189904),
        a = n(8361),
        l = n(163694),
        d = n(28466),
        u = n(742554),
        c = n(966076);
      function h(e) {
        const { position: t = 'Bottom', onClose: n, children: u, className: h, theme: m = c } = e,
          g = (0, o.ensureNotNull)((0, s.useContext)(l.DrawerContext)),
          [v] = (0, s.useState)(() => (0, r.randomHash)()),
          f = (0, s.useRef)(null),
          y = (0, s.useContext)(d.CloseDelegateContext);
        return (
          (0, s.useLayoutEffect)(
            () => (
              (0, o.ensureNotNull)(f.current).focus({ preventScroll: !0 }),
              y.subscribe(g, n),
              g.addDrawer(v),
              () => {
                g.removeDrawer(v), y.unsubscribe(g, n);
              }
            ),
            [],
          ),
          s.createElement(
            a.Portal,
            null,
            s.createElement(
              'div',
              { className: i(c.wrap, c[`position${t}`]) },
              v === g.currentDrawer &&
                s.createElement('div', { className: c.backdrop, onClick: n }),
              s.createElement(
                p,
                {
                  className: i(m.drawer, c[`position${t}`], h),
                  ref: f,
                  'data-name': e['data-name'],
                },
                u,
              ),
            ),
          )
        );
      }
      const p = (0, s.forwardRef)((e, t) => {
        const { className: n, ...o } = e;
        return s.createElement(u.TouchScrollContainer, {
          className: i(c.drawer, n),
          tabIndex: -1,
          ref: t,
          ...o,
        });
      });
    },
    930052: (e, t, n) => {
      'use strict';
      n.d(t, { MatchMedia: () => o });
      var s = n(50959);
      class o extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._handleChange = () => {
              this.forceUpdate();
            }),
            (this.state = { query: window.matchMedia(this.props.rule) });
        }
        componentDidMount() {
          this._subscribe(this.state.query);
        }
        componentDidUpdate(e, t) {
          this.state.query !== t.query &&
            (this._unsubscribe(t.query), this._subscribe(this.state.query));
        }
        componentWillUnmount() {
          this._unsubscribe(this.state.query);
        }
        render() {
          return this.props.children(this.state.query.matches);
        }
        static getDerivedStateFromProps(e, t) {
          return e.rule !== t.query.media ? { query: window.matchMedia(e.rule) } : null;
        }
        _subscribe(e) {
          e.addListener(this._handleChange);
        }
        _unsubscribe(e) {
          e.removeListener(this._handleChange);
        }
      }
    },
    230553: (e, t, n) => {
      'use strict';
      n.d(t, { MenuContext: () => s });
      const s = n(50959).createContext(null);
    },
    510618: (e, t, n) => {
      'use strict';
      n.d(t, { DEFAULT_MENU_THEME: () => v, Menu: () => f });
      var s = n(50959),
        o = n(497754),
        i = n.n(o),
        r = n(650151),
        a = n(44681),
        l = n(199663),
        d = n(630795),
        u = n(370981),
        c = n(801808),
        h = n(376202),
        p = n(823030),
        m = n(230553),
        g = n(540191);
      const v = g;
      class f extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._containerRef = null),
            (this._scrollWrapRef = null),
            (this._raf = null),
            (this._scrollRaf = null),
            (this._scrollTimeout = void 0),
            (this._manager = new c.OverlapManager()),
            (this._hotkeys = null),
            (this._scroll = 0),
            (this._handleContainerRef = e => {
              (this._containerRef = e),
                this.props.reference &&
                  ('function' == typeof this.props.reference && this.props.reference(e),
                  'object' == typeof this.props.reference && (this.props.reference.current = e));
            }),
            (this._handleScrollWrapRef = e => {
              (this._scrollWrapRef = e),
                'function' == typeof this.props.scrollWrapReference &&
                  this.props.scrollWrapReference(e),
                'object' == typeof this.props.scrollWrapReference &&
                  (this.props.scrollWrapReference.current = e);
            }),
            (this._handleCustomRemeasureDelegate = () => {
              this._resizeForced(), this._handleMeasure();
            }),
            (this._handleMeasure = ({ callback: e, forceRecalcPosition: t } = {}) => {
              var n, s, o, i, l, d, u, c, h, p, m, g;
              if (this.state.isMeasureValid && !t) return;
              const { position: v } = this.props,
                f = (0, r.ensureNotNull)(this._containerRef);
              let y = f.getBoundingClientRect();
              const _ = document.documentElement.clientHeight,
                w = document.documentElement.clientWidth,
                b = null !== (n = this.props.closeOnScrollOutsideOffset) && void 0 !== n ? n : 0;
              let C = _ - 0 - b;
              const S = y.height > C;
              if (S) {
                ((0, r.ensureNotNull)(this._scrollWrapRef).style.overflowY = 'scroll'),
                  (y = f.getBoundingClientRect());
              }
              const { width: E, height: x } = y,
                D = 'function' == typeof v ? v(E, x, w, _) : v,
                M =
                  null !==
                    (o =
                      null === (s = null == D ? void 0 : D.indentFromWindow) || void 0 === s
                        ? void 0
                        : s.left) && void 0 !== o
                    ? o
                    : 0,
                T =
                  w -
                  (null !== (i = D.overrideWidth) && void 0 !== i ? i : E) -
                  (null !==
                    (d =
                      null === (l = null == D ? void 0 : D.indentFromWindow) || void 0 === l
                        ? void 0
                        : l.right) && void 0 !== d
                    ? d
                    : 0),
                N = (0, a.clamp)(D.x, M, Math.max(M, T)),
                k =
                  (null !==
                    (c =
                      null === (u = null == D ? void 0 : D.indentFromWindow) || void 0 === u
                        ? void 0
                        : u.top) && void 0 !== c
                    ? c
                    : 0) + b,
                O =
                  _ -
                  (null !== (h = D.overrideHeight) && void 0 !== h ? h : x) -
                  (null !==
                    (m =
                      null === (p = null == D ? void 0 : D.indentFromWindow) || void 0 === p
                        ? void 0
                        : p.bottom) && void 0 !== m
                    ? m
                    : 0);
              let z = (0, a.clamp)(D.y, k, Math.max(k, O));
              if (
                (D.forbidCorrectYCoord && z < D.y && ((C -= D.y - z), (z = D.y)),
                t &&
                  void 0 !== this.props.closeOnScrollOutsideOffset &&
                  D.y <= this.props.closeOnScrollOutsideOffset)
              )
                return void this._handleGlobalClose(!0);
              const L = null !== (g = D.overrideHeight) && void 0 !== g ? g : S ? C : void 0;
              this.setState(
                {
                  appearingMenuHeight: t ? this.state.appearingMenuHeight : L,
                  appearingMenuWidth: t ? this.state.appearingMenuWidth : D.overrideWidth,
                  appearingPosition: { x: N, y: z },
                  isMeasureValid: !0,
                },
                () => {
                  this._restoreScrollPosition(), e && e();
                },
              );
            }),
            (this._restoreScrollPosition = () => {
              const e = document.activeElement,
                t = (0, r.ensureNotNull)(this._containerRef);
              if (null !== e && t.contains(e))
                try {
                  e.scrollIntoView();
                } catch (e) {}
              else (0, r.ensureNotNull)(this._scrollWrapRef).scrollTop = this._scroll;
            }),
            (this._resizeForced = () => {
              this.setState({
                appearingMenuHeight: void 0,
                appearingMenuWidth: void 0,
                appearingPosition: void 0,
                isMeasureValid: void 0,
              });
            }),
            (this._resize = () => {
              null === this._raf &&
                (this._raf = requestAnimationFrame(() => {
                  this.setState({
                    appearingMenuHeight: void 0,
                    appearingMenuWidth: void 0,
                    appearingPosition: void 0,
                    isMeasureValid: void 0,
                  }),
                    (this._raf = null);
                }));
            }),
            (this._handleGlobalClose = e => {
              this.props.onClose(e);
            }),
            (this._handleSlot = e => {
              this._manager.setContainer(e);
            }),
            (this._handleScroll = () => {
              this._scroll = (0, r.ensureNotNull)(this._scrollWrapRef).scrollTop;
            }),
            (this._handleScrollOutsideEnd = () => {
              clearTimeout(this._scrollTimeout),
                (this._scrollTimeout = setTimeout(() => {
                  this._handleMeasure({ forceRecalcPosition: !0 });
                }, 80));
            }),
            (this._handleScrollOutside = e => {
              e.target !== this._scrollWrapRef &&
                (this._handleScrollOutsideEnd(),
                null === this._scrollRaf &&
                  (this._scrollRaf = requestAnimationFrame(() => {
                    this._handleMeasure({ forceRecalcPosition: !0 }), (this._scrollRaf = null);
                  })));
            }),
            (this.state = {});
        }
        componentDidMount() {
          this._handleMeasure({ callback: this.props.onOpen });
          const { customCloseDelegate: e = u.globalCloseDelegate, customRemeasureDelegate: t } =
            this.props;
          e.subscribe(this, this._handleGlobalClose),
            null == t || t.subscribe(null, this._handleCustomRemeasureDelegate),
            window.addEventListener('resize', this._resize);
          const n = null !== this.context;
          this._hotkeys ||
            n ||
            ((this._hotkeys = h.createGroup({ desc: 'Popup menu' })),
            this._hotkeys.add({
              desc: 'Close',
              hotkey: 27,
              handler: () => {
                this.props.onKeyboardClose && this.props.onKeyboardClose(),
                  this._handleGlobalClose();
              },
            })),
            this.props.repositionOnScroll &&
              window.addEventListener('scroll', this._handleScrollOutside, { capture: !0 });
        }
        componentDidUpdate() {
          this._handleMeasure();
        }
        componentWillUnmount() {
          const { customCloseDelegate: e = u.globalCloseDelegate, customRemeasureDelegate: t } =
            this.props;
          e.unsubscribe(this, this._handleGlobalClose),
            null == t || t.unsubscribe(null, this._handleCustomRemeasureDelegate),
            window.removeEventListener('resize', this._resize),
            window.removeEventListener('scroll', this._handleScrollOutside, { capture: !0 }),
            this._hotkeys && (this._hotkeys.destroy(), (this._hotkeys = null)),
            null !== this._raf && (cancelAnimationFrame(this._raf), (this._raf = null)),
            null !== this._scrollRaf &&
              (cancelAnimationFrame(this._scrollRaf), (this._scrollRaf = null)),
            this._scrollTimeout && clearTimeout(this._scrollTimeout);
        }
        render() {
          const {
              id: e,
              role: t,
              'aria-label': n,
              'aria-labelledby': o,
              'aria-activedescendant': r,
              'aria-hidden': a,
              'aria-describedby': u,
              'aria-invalid': c,
              children: h,
              minWidth: v,
              theme: f = g,
              className: _,
              maxHeight: w,
              onMouseOver: b,
              onMouseOut: C,
              onKeyDown: S,
              onFocus: E,
              onBlur: x,
            } = this.props,
            {
              appearingMenuHeight: D,
              appearingMenuWidth: M,
              appearingPosition: T,
              isMeasureValid: N,
            } = this.state,
            k = {
              '--ui-kit-menu-max-width': `${T && T.x}px`,
              maxWidth: 'calc(100vw - var(--ui-kit-menu-max-width) - 6px)',
            };
          return s.createElement(
            m.MenuContext.Provider,
            { value: this },
            s.createElement(
              p.SubmenuHandler,
              null,
              s.createElement(
                d.SlotContext.Provider,
                { value: this._manager },
                s.createElement(
                  'div',
                  {
                    id: e,
                    role: t,
                    'aria-label': n,
                    'aria-labelledby': o,
                    'aria-activedescendant': r,
                    'aria-hidden': a,
                    'aria-describedby': u,
                    'aria-invalid': c,
                    className: i()(_, f.menuWrap, !N && f.isMeasuring),
                    style: {
                      height: D,
                      left: T && T.x,
                      minWidth: v,
                      position: 'fixed',
                      top: T && T.y,
                      width: M,
                      ...(this.props.limitMaxWidth && k),
                    },
                    'data-name': this.props['data-name'],
                    ref: this._handleContainerRef,
                    onScrollCapture: this.props.onScroll,
                    onContextMenu: l.preventDefaultForContextMenu,
                    tabIndex: this.props.tabIndex,
                    onMouseOver: b,
                    onMouseOut: C,
                    onKeyDown: S,
                    onFocus: E,
                    onBlur: x,
                  },
                  s.createElement(
                    'div',
                    {
                      className: i()(
                        f.scrollWrap,
                        !this.props.noMomentumBasedScroll && f.momentumBased,
                      ),
                      style: { overflowY: void 0 !== D ? 'scroll' : 'auto', maxHeight: w },
                      onScrollCapture: this._handleScroll,
                      ref: this._handleScrollWrapRef,
                    },
                    s.createElement(y, { className: f.menuBox }, h),
                  ),
                ),
              ),
              s.createElement(d.Slot, { reference: this._handleSlot }),
            ),
          );
        }
        update(e) {
          e ? this._resizeForced() : this._resize();
        }
        focus(e) {
          var t;
          null === (t = this._containerRef) || void 0 === t || t.focus(e);
        }
        blur() {
          var e;
          null === (e = this._containerRef) || void 0 === e || e.blur();
        }
      }
      function y(e) {
        const t = (0, r.ensureNotNull)((0, s.useContext)(p.SubmenuContext)),
          n = s.useRef(null);
        return s.createElement(
          'div',
          {
            ref: n,
            className: e.className,
            onMouseOver: function (e) {
              if (
                !(
                  null !== t.current &&
                  e.target instanceof Node &&
                  ((s = e.target),
                  null === (o = n.current) || void 0 === o ? void 0 : o.contains(s))
                )
              )
                return;
              var s, o;
              t.isSubmenuNode(e.target) || t.setCurrent(null);
            },
            'data-name': 'menu-inner',
          },
          e.children,
        );
      }
      f.contextType = p.SubmenuContext;
    },
    923235: (e, t, n) => {
      'use strict';
      n.d(t, { OutsideEvent: () => o });
      var s = n(908783);
      function o(e) {
        const { children: t, ...n } = e;
        return t((0, s.useOutsideEvent)(n));
      }
    },
    874485: (e, t, n) => {
      'use strict';
      n.d(t, { makeOverlapable: () => i });
      var s = n(50959),
        o = n(8361);
      function i(e) {
        return class extends s.PureComponent {
          render() {
            const { isOpened: t, root: n } = this.props;
            if (!t) return null;
            const i = s.createElement(e, { ...this.props, zIndex: 150 });
            return 'parent' === n ? i : s.createElement(o.Portal, null, i);
          }
        };
      }
    },
    28466: (e, t, n) => {
      'use strict';
      n.d(t, { CloseDelegateContext: () => i });
      var s = n(50959),
        o = n(370981);
      const i = s.createContext(o.globalCloseDelegate);
    },
    8361: (e, t, n) => {
      'use strict';
      n.d(t, { Portal: () => l, PortalContext: () => d });
      var s = n(50959),
        o = n(500962),
        i = n(189904),
        r = n(801808),
        a = n(630795);
      class l extends s.PureComponent {
        constructor() {
          super(...arguments), (this._uuid = (0, i.guid)());
        }
        componentWillUnmount() {
          this._manager().removeWindow(this._uuid);
        }
        render() {
          const e = this._manager().ensureWindow(this._uuid, this.props.layerOptions);
          return (
            (e.style.top = this.props.top || ''),
            (e.style.bottom = this.props.bottom || ''),
            (e.style.left = this.props.left || ''),
            (e.style.right = this.props.right || ''),
            (e.style.pointerEvents = this.props.pointerEvents || ''),
            o.createPortal(s.createElement(d.Provider, { value: this }, this.props.children), e)
          );
        }
        moveToTop() {
          this._manager().moveToTop(this._uuid);
        }
        _manager() {
          return null === this.context ? (0, r.getRootOverlapManager)() : this.context;
        }
      }
      l.contextType = a.SlotContext;
      const d = s.createContext(null);
    },
    630795: (e, t, n) => {
      'use strict';
      n.d(t, { Slot: () => o, SlotContext: () => i });
      var s = n(50959);
      class o extends s.Component {
        shouldComponentUpdate() {
          return !1;
        }
        render() {
          return s.createElement('div', {
            style: { position: 'fixed', zIndex: 150, left: 0, top: 0 },
            ref: this.props.reference,
          });
        }
      }
      const i = s.createContext(null);
    },
    665276: (e, t, n) => {
      'use strict';
      n.d(t, { Spinner: () => r });
      var s = n(50959),
        o = n(497754),
        i = n(843442);
      n(683135);
      function r(e) {
        const t = o(
          e.className,
          'tv-spinner',
          'tv-spinner--shown',
          `tv-spinner--size_${i.spinnerSizeMap[e.size || i.DEFAULT_SIZE]}`,
        );
        return s.createElement('div', { className: t, style: e.style, role: 'progressbar' });
      }
    },
    515783: (e, t, n) => {
      'use strict';
      n.d(t, { ToolWidgetCaret: () => l });
      var s = n(50959),
        o = n(497754),
        i = n(72571),
        r = n(934587),
        a = n(100578);
      function l(e) {
        const { dropped: t, className: n } = e;
        return s.createElement(i.Icon, { className: o(n, r.icon, { [r.dropped]: t }), icon: a });
      }
    },
    742554: (e, t, n) => {
      'use strict';
      n.d(t, { TouchScrollContainer: () => a });
      var s = n(50959),
        o = n(259142),
        i = n(650151),
        r = n(601227);
      const a = (0, s.forwardRef)((e, t) => {
        const { children: n, ...i } = e,
          a = (0, s.useRef)(null);
        return (
          (0, s.useImperativeHandle)(t, () => a.current),
          (0, s.useLayoutEffect)(() => {
            if (r.CheckMobile.iOS())
              return (
                null !== a.current && (0, o.disableBodyScroll)(a.current, { allowTouchMove: l(a) }),
                () => {
                  null !== a.current && (0, o.enableBodyScroll)(a.current);
                }
              );
          }, []),
          s.createElement('div', { ref: a, ...i }, n)
        );
      });
      function l(e) {
        return t => {
          const n = (0, i.ensureNotNull)(e.current),
            s = document.activeElement;
          return !n.contains(t) || (null !== s && n.contains(s) && s.contains(t));
        };
      }
    },
    377145: (e, t, n) => {
      'use strict';
      function s(e, t) {
        return e === t;
      }
      function o(e, t, n) {
        if (null === t || null === n || t.length !== n.length) return !1;
        for (var s = t.length, o = 0; o < s; o++) if (!e(t[o], n[o])) return !1;
        return !0;
      }
      function i(e) {
        var t = Array.isArray(e[0]) ? e[0] : e;
        if (
          !t.every(function (e) {
            return 'function' == typeof e;
          })
        ) {
          var n = t
            .map(function (e) {
              return typeof e;
            })
            .join(', ');
          throw new Error(
            'Selector creators expect all input-selectors to be functions, instead received the following types: [' +
              n +
              ']',
          );
        }
        return t;
      }
      n.d(t, { createSelector: () => r });
      var r = (function (e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
          n[s - 1] = arguments[s];
        return function () {
          for (var t = arguments.length, s = Array(t), o = 0; o < t; o++) s[o] = arguments[o];
          var r = 0,
            a = s.pop(),
            l = i(s),
            d = e.apply(
              void 0,
              [
                function () {
                  return r++, a.apply(null, arguments);
                },
              ].concat(n),
            ),
            u = e(function () {
              for (var e = [], t = l.length, n = 0; n < t; n++) e.push(l[n].apply(null, arguments));
              return d.apply(null, e);
            });
          return (
            (u.resultFunc = a),
            (u.dependencies = l),
            (u.recomputations = function () {
              return r;
            }),
            (u.resetRecomputations = function () {
              return (r = 0);
            }),
            u
          );
        };
      })(function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s,
          n = null,
          i = null;
        return function () {
          return o(t, n, arguments) || (i = e.apply(null, arguments)), (n = arguments), i;
        };
      });
    },
    278029: e => {
      e.exports = {
        button: 'button-GwQQdU8S',
        hover: 'hover-GwQQdU8S',
        isInteractive: 'isInteractive-GwQQdU8S',
        accessible: 'accessible-GwQQdU8S',
        isGrouped: 'isGrouped-GwQQdU8S',
        isActive: 'isActive-GwQQdU8S',
        isOpened: 'isOpened-GwQQdU8S',
        isDisabled: 'isDisabled-GwQQdU8S',
        text: 'text-GwQQdU8S',
        icon: 'icon-GwQQdU8S',
        endIcon: 'endIcon-GwQQdU8S',
      };
    },
    442919: e => {
      e.exports = {
        button: 'button-merBkM5y',
        hover: 'hover-merBkM5y',
        accessible: 'accessible-merBkM5y',
        arrow: 'arrow-merBkM5y',
        arrowWrap: 'arrowWrap-merBkM5y',
        isOpened: 'isOpened-merBkM5y',
      };
    },
    747633: (e, t, n) => {
      'use strict';
      n.d(t, { DEFAULT_TOOL_WIDGET_BUTTON_THEME: () => a, ToolWidgetButton: () => l });
      var s = n(50959),
        o = n(497754),
        i = n(72571),
        r = n(278029);
      const a = r,
        l = s.forwardRef((e, t) => {
          const {
              tag: n = 'div',
              icon: a,
              endIcon: l,
              isActive: d,
              isOpened: u,
              isDisabled: c,
              isGrouped: h,
              isHovered: p,
              onClick: m,
              text: g,
              textBeforeIcon: v,
              title: f,
              theme: y = r,
              className: _,
              forceInteractive: w,
              inactive: b,
              'data-name': C,
              'data-tooltip': S,
              ...E
            } = e,
            x = o(_, y.button, (f || S) && 'apply-common-tooltip', {
              [y.isActive]: d,
              [y.isOpened]: u,
              [y.isInteractive]: (w || Boolean(m)) && !c && !b,
              [y.isDisabled]: Boolean(c || b),
              [y.isGrouped]: h,
              [y.hover]: p,
            }),
            D =
              a &&
              ('string' == typeof a
                ? s.createElement(i.Icon, { className: y.icon, icon: a })
                : s.cloneElement(a, { className: o(y.icon, a.props.className) }));
          return 'button' === n
            ? s.createElement(
                'button',
                {
                  ...E,
                  ref: t,
                  type: 'button',
                  className: o(x, y.accessible),
                  disabled: c && !b,
                  onClick: m,
                  title: f,
                  'data-name': C,
                  'data-tooltip': S,
                },
                v && g && s.createElement('div', { className: o('js-button-text', y.text) }, g),
                D,
                !v && g && s.createElement('div', { className: o('js-button-text', y.text) }, g),
              )
            : s.createElement(
                'div',
                {
                  ...E,
                  ref: t,
                  'data-role': 'button',
                  className: x,
                  onClick: c ? void 0 : m,
                  title: f,
                  'data-name': C,
                  'data-tooltip': S,
                },
                v && g && s.createElement('div', { className: o('js-button-text', y.text) }, g),
                D,
                !v && g && s.createElement('div', { className: o('js-button-text', y.text) }, g),
                l && s.createElement(i.Icon, { icon: l, className: r.endIcon }),
              );
        });
    },
    518799: (e, t, n) => {
      'use strict';
      n.d(t, { DEFAULT_TOOL_WIDGET_MENU_THEME: () => g, ToolWidgetMenu: () => v });
      var s = n(50959),
        o = n(497754),
        i = n(930202),
        r = n(624216),
        a = n(515783),
        l = n(800417),
        d = n(163694),
        u = n(759339),
        c = n(476853),
        h = n(930052),
        p = n(111706),
        m = n(442919);
      const g = m;
      class v extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._wrapperRef = null),
            (this._controller = s.createRef()),
            (this._handleWrapperRef = e => {
              (this._wrapperRef = e), this.props.reference && this.props.reference(e);
            }),
            (this._handleOpen = () => {
              var e;
              'div' !== this.props.tag &&
                (null === (e = this._controller.current) || void 0 === e || e.focus());
            }),
            (this._handleClick = e => {
              e.target instanceof Node &&
                e.currentTarget.contains(e.target) &&
                (this._handleToggleDropdown(void 0, (0, p.isKeyboardClick)(e)),
                this.props.onClick && this.props.onClick(e, !this.state.isOpened));
            }),
            (this._handleToggleDropdown = (e, t = !1) => {
              const { onClose: n, onOpen: s } = this.props,
                { isOpened: o } = this.state,
                i = 'boolean' == typeof e ? e : !o;
              this.setState({ isOpened: i, shouldReturnFocus: !!i && t }),
                i && s && s(),
                !i && n && n();
            }),
            (this._handleClose = () => {
              this.close();
            }),
            (this._handleKeyDown = e => {
              var t;
              const { orientation: n = 'horizontal' } = this.props;
              if (e.defaultPrevented) return;
              if (!(e.target instanceof Node)) return;
              const s = (0, i.hashFromEvent)(e);
              if (e.currentTarget.contains(e.target))
                switch (s) {
                  case 40:
                    if ('div' === this.props.tag || 'horizontal' !== n) return;
                    if (this.state.isOpened) return;
                    e.preventDefault(), this._handleToggleDropdown(!0, !0);
                    break;
                  case 27:
                    if (!this.state.isOpened || !this.props.closeOnEsc) return;
                    e.preventDefault(), e.stopPropagation(), this._handleToggleDropdown(!1);
                }
              else {
                if ('div' === this.props.tag) return;
                switch (s) {
                  case 27: {
                    e.preventDefault();
                    const { shouldReturnFocus: n } = this.state;
                    this._handleToggleDropdown(!1),
                      n && (null === (t = this._wrapperRef) || void 0 === t || t.focus());
                    break;
                  }
                }
              }
            }),
            (this.state = { isOpened: !1, shouldReturnFocus: !1 });
        }
        render() {
          const {
              tag: e = 'div',
              id: t,
              arrow: n,
              content: i,
              isDisabled: r,
              isDrawer: d,
              isShowTooltip: u,
              title: c,
              className: p,
              hotKey: m,
              theme: g,
              drawerBreakpoint: v,
              tabIndex: f,
            } = this.props,
            { isOpened: y } = this.state,
            _ = o(p, g.button, {
              'apply-common-tooltip': u || !r,
              [g.isDisabled]: r,
              [g.isOpened]: y,
            });
          return 'button' === e
            ? s.createElement(
                'button',
                {
                  type: 'button',
                  id: t,
                  className: o(_, g.accessible),
                  disabled: r,
                  onClick: this._handleClick,
                  title: c,
                  'data-tooltip-hotkey': m,
                  ref: this._handleWrapperRef,
                  onKeyDown: this._handleKeyDown,
                  tabIndex: f,
                  ...(0, l.filterDataProps)(this.props),
                  ...(0, l.filterAriaProps)(this.props),
                },
                i,
                n &&
                  s.createElement(
                    'div',
                    { className: g.arrow },
                    s.createElement(
                      'div',
                      { className: g.arrowWrap },
                      s.createElement(a.ToolWidgetCaret, { dropped: y }),
                    ),
                  ),
                this.state.isOpened &&
                  (v
                    ? s.createElement(h.MatchMedia, { rule: v }, e => this._renderContent(e))
                    : this._renderContent(d)),
              )
            : s.createElement(
                'div',
                {
                  id: t,
                  className: _,
                  onClick: r ? void 0 : this._handleClick,
                  title: c,
                  'data-tooltip-hotkey': m,
                  ref: this._handleWrapperRef,
                  'data-role': 'button',
                  tabIndex: f,
                  onKeyDown: this._handleKeyDown,
                  ...(0, l.filterDataProps)(this.props),
                },
                i,
                n &&
                  s.createElement(
                    'div',
                    { className: g.arrow },
                    s.createElement(
                      'div',
                      { className: g.arrowWrap },
                      s.createElement(a.ToolWidgetCaret, { dropped: y }),
                    ),
                  ),
                this.state.isOpened &&
                  (v
                    ? s.createElement(h.MatchMedia, { rule: v }, e => this._renderContent(e))
                    : this._renderContent(d)),
              );
        }
        close() {
          this._handleToggleDropdown(!1);
        }
        focus() {
          var e;
          null === (e = this._wrapperRef) || void 0 === e || e.focus();
        }
        update() {
          null !== this._controller.current && this._controller.current.update();
        }
        _renderContent(e) {
          const {
              menuDataName: t,
              minWidth: n,
              menuClassName: o,
              maxHeight: i,
              drawerPosition: a = 'Bottom',
              children: l,
            } = this.props,
            { isOpened: h } = this.state,
            p = {
              horizontalMargin: this.props.horizontalMargin || 0,
              verticalMargin: this.props.verticalMargin || 2,
              verticalAttachEdge: this.props.verticalAttachEdge,
              horizontalAttachEdge: this.props.horizontalAttachEdge,
              verticalDropDirection: this.props.verticalDropDirection,
              horizontalDropDirection: this.props.horizontalDropDirection,
              matchButtonAndListboxWidths: this.props.matchButtonAndListboxWidths,
            },
            m = Boolean(h && e && a),
            g = (function (e) {
              return 'function' == typeof e;
            })(l)
              ? l({ isDrawer: m })
              : l;
          return m
            ? s.createElement(
                d.DrawerManager,
                null,
                s.createElement(
                  u.Drawer,
                  { onClose: this._handleClose, position: a, 'data-name': t },
                  g,
                ),
              )
            : s.createElement(
                r.PopupMenu,
                {
                  reference: this.props.menuReference,
                  controller: this._controller,
                  closeOnClickOutside: this.props.closeOnClickOutside,
                  doNotCloseOn: this,
                  isOpened: h,
                  minWidth: n,
                  onClose: this._handleClose,
                  position: (0, c.getPopupPositioner)(this._wrapperRef, p),
                  className: o,
                  maxHeight: i,
                  'data-name': t,
                  tabIndex: 'div' !== this.props.tag ? -1 : void 0,
                  onOpen: this._handleOpen,
                  onKeyDown: this.props.onMenuKeyDown,
                  onFocus: this.props.onMenuFocus,
                },
                g,
              );
        }
      }
      v.defaultProps = { arrow: !0, closeOnClickOutside: !0, theme: m };
    },
    947088: (e, t, n) => {
      'use strict';
      async function s(e, t, n) {
        let s;
        for (let o = 0; o < t; ++o)
          try {
            return await e(s);
          } catch (e) {
            (s = e), await n(o);
          }
        throw s;
      }
      async function o(e, t) {
        return s(e, t, () => Promise.resolve());
      }
      n.d(t, { getAllSourcesIcons: () => c, loadAllSourcesIcons: () => u });
      const i = (0, n(6835).getLogger)('DataSourcesIcons');
      let r = null;
      function a() {
        const e = n.c[259517];
        return e
          ? Promise.resolve(e.exports.lineToolsIcons)
          : n
              .e(1890)
              .then(n.bind(n, 259517))
              .then(e => e.lineToolsIcons);
      }
      function l() {
        const e = n.c[583798];
        return e
          ? Promise.resolve(e.exports.SERIES_ICONS)
          : n
              .e(9685)
              .then(n.bind(n, 583798))
              .then(e => e.SERIES_ICONS);
      }
      let d = null;
      function u() {
        return (
          null === d &&
            (d = (function () {
              const e = o(a, 2)
                  .then(e => e)
                  .catch(e => (i.logWarn(e), {})),
                t = o(l, 2)
                  .then(e => e)
                  .catch(e => (i.logWarn(e), {}));
              return Promise.all([e, t]);
            })()),
          d.then(e => ((r = { linetool: e[0], series: e[1] }), r))
        );
      }
      function c() {
        return r;
      }
    },
    100578: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path fill="currentColor" d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>';
    },
    229540: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72"><path fill="currentColor" d="M15 24a21 21 0 1 1 42 0v7.41l8.97 5.01 1.08.6-.82.94-7.77 8.82 2.34 2.53-1.47 1.36L57 48.15V69H46v-7h-6v5h-9V56h-6v13H15V48.15l-2.33 2.52-1.47-1.36 2.35-2.53-7.78-8.82-.82-.93 1.08-.6L15 31.4V24Zm0 9.7-6.9 3.87L15 45.4V33.7Zm42 11.7 6.91-7.83-6.9-3.87v11.7ZM36 5a19 19 0 0 0-19 19v43h6V54h10v11h5v-5h10v7h7V24A19 19 0 0 0 36 5Zm-5 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM42.5 26a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>';
    },
    207809: (e, t, n) => {
      'use strict';
      n.d(t, { TouchBackend: () => m });
      var s,
        o = n(6346);
      !(function (e) {
        (e.mouse = 'mouse'), (e.touch = 'touch'), (e.keyboard = 'keyboard');
      })(s || (s = {}));
      class i {
        get delay() {
          var e;
          return null !== (e = this.args.delay) && void 0 !== e ? e : 0;
        }
        get scrollAngleRanges() {
          return this.args.scrollAngleRanges;
        }
        get getDropTargetElementsAtPoint() {
          return this.args.getDropTargetElementsAtPoint;
        }
        get ignoreContextMenu() {
          var e;
          return null !== (e = this.args.ignoreContextMenu) && void 0 !== e && e;
        }
        get enableHoverOutsideTarget() {
          var e;
          return null !== (e = this.args.enableHoverOutsideTarget) && void 0 !== e && e;
        }
        get enableKeyboardEvents() {
          var e;
          return null !== (e = this.args.enableKeyboardEvents) && void 0 !== e && e;
        }
        get enableMouseEvents() {
          var e;
          return null !== (e = this.args.enableMouseEvents) && void 0 !== e && e;
        }
        get enableTouchEvents() {
          var e;
          return null === (e = this.args.enableTouchEvents) || void 0 === e || e;
        }
        get touchSlop() {
          return this.args.touchSlop || 0;
        }
        get delayTouchStart() {
          var e, t, n, s;
          return null !==
            (s =
              null !==
                (n = null === (e = this.args) || void 0 === e ? void 0 : e.delayTouchStart) &&
              void 0 !== n
                ? n
                : null === (t = this.args) || void 0 === t
                ? void 0
                : t.delay) && void 0 !== s
            ? s
            : 0;
        }
        get delayMouseStart() {
          var e, t, n, s;
          return null !==
            (s =
              null !==
                (n = null === (e = this.args) || void 0 === e ? void 0 : e.delayMouseStart) &&
              void 0 !== n
                ? n
                : null === (t = this.args) || void 0 === t
                ? void 0
                : t.delay) && void 0 !== s
            ? s
            : 0;
        }
        get window() {
          return this.context && this.context.window
            ? this.context.window
            : 'undefined' != typeof window
            ? window
            : void 0;
        }
        get document() {
          var e;
          return (null === (e = this.context) || void 0 === e ? void 0 : e.document)
            ? this.context.document
            : this.window
            ? this.window.document
            : void 0;
        }
        get rootElement() {
          var e;
          return (
            (null === (e = this.args) || void 0 === e ? void 0 : e.rootElement) || this.document
          );
        }
        constructor(e, t) {
          (this.args = e), (this.context = t);
        }
      }
      const r = 1,
        a = 0;
      function l(e) {
        return void 0 === e.button || e.button === a;
      }
      function d(e) {
        return !!e.targetTouches;
      }
      function u(e, t) {
        return d(e)
          ? (function (e, t) {
              return 1 === e.targetTouches.length
                ? u(e.targetTouches[0])
                : t && 1 === e.touches.length && e.touches[0].target === t.target
                ? u(e.touches[0])
                : void 0;
            })(e, t)
          : { x: e.clientX, y: e.clientY };
      }
      const c = (() => {
          let e = !1;
          try {
            addEventListener(
              'test',
              () => {},
              Object.defineProperty({}, 'passive', { get: () => ((e = !0), !0) }),
            );
          } catch (e) {}
          return e;
        })(),
        h = {
          [s.mouse]: {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
            contextmenu: 'contextmenu',
          },
          [s.touch]: { start: 'touchstart', move: 'touchmove', end: 'touchend' },
          [s.keyboard]: { keydown: 'keydown' },
        };
      class p {
        profile() {
          var e;
          return {
            sourceNodes: this.sourceNodes.size,
            sourcePreviewNodes: this.sourcePreviewNodes.size,
            sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
            targetNodes: this.targetNodes.size,
            dragOverTargetIds:
              (null === (e = this.dragOverTargetIds) || void 0 === e ? void 0 : e.length) || 0,
          };
        }
        get document() {
          return this.options.document;
        }
        setup() {
          const e = this.options.rootElement;
          e &&
            ((0, o.invariant)(!p.isSetUp, 'Cannot have two Touch backends at the same time.'),
            (p.isSetUp = !0),
            this.addEventListener(e, 'start', this.getTopMoveStartHandler()),
            this.addEventListener(e, 'start', this.handleTopMoveStartCapture, !0),
            this.addEventListener(e, 'move', this.handleTopMove),
            this.addEventListener(e, 'move', this.handleTopMoveCapture, !0),
            this.addEventListener(e, 'end', this.handleTopMoveEndCapture, !0),
            this.options.enableMouseEvents &&
              !this.options.ignoreContextMenu &&
              this.addEventListener(e, 'contextmenu', this.handleTopMoveEndCapture),
            this.options.enableKeyboardEvents &&
              this.addEventListener(e, 'keydown', this.handleCancelOnEscape, !0));
        }
        teardown() {
          const e = this.options.rootElement;
          e &&
            ((p.isSetUp = !1),
            (this._mouseClientOffset = {}),
            this.removeEventListener(e, 'start', this.handleTopMoveStartCapture, !0),
            this.removeEventListener(e, 'start', this.handleTopMoveStart),
            this.removeEventListener(e, 'move', this.handleTopMoveCapture, !0),
            this.removeEventListener(e, 'move', this.handleTopMove),
            this.removeEventListener(e, 'end', this.handleTopMoveEndCapture, !0),
            this.options.enableMouseEvents &&
              !this.options.ignoreContextMenu &&
              this.removeEventListener(e, 'contextmenu', this.handleTopMoveEndCapture),
            this.options.enableKeyboardEvents &&
              this.removeEventListener(e, 'keydown', this.handleCancelOnEscape, !0),
            this.uninstallSourceNodeRemovalObserver());
        }
        addEventListener(e, t, n, s = !1) {
          const o = c ? { capture: s, passive: !1 } : s;
          this.listenerTypes.forEach(function (s) {
            const i = h[s][t];
            i && e.addEventListener(i, n, o);
          });
        }
        removeEventListener(e, t, n, s = !1) {
          const o = c ? { capture: s, passive: !1 } : s;
          this.listenerTypes.forEach(function (s) {
            const i = h[s][t];
            i && e.removeEventListener(i, n, o);
          });
        }
        connectDragSource(e, t) {
          const n = this.handleMoveStart.bind(this, e);
          return (
            this.sourceNodes.set(e, t),
            this.addEventListener(t, 'start', n),
            () => {
              this.sourceNodes.delete(e), this.removeEventListener(t, 'start', n);
            }
          );
        }
        connectDragPreview(e, t, n) {
          return (
            this.sourcePreviewNodeOptions.set(e, n),
            this.sourcePreviewNodes.set(e, t),
            () => {
              this.sourcePreviewNodes.delete(e), this.sourcePreviewNodeOptions.delete(e);
            }
          );
        }
        connectDropTarget(e, t) {
          const n = this.options.rootElement;
          if (!this.document || !n) return () => {};
          const s = s => {
            if (!this.document || !n || !this.monitor.isDragging()) return;
            let o;
            switch (s.type) {
              case h.mouse.move:
                o = { x: s.clientX, y: s.clientY };
                break;
              case h.touch.move:
                var i, r;
                o = {
                  x: (null === (i = s.touches[0]) || void 0 === i ? void 0 : i.clientX) || 0,
                  y: (null === (r = s.touches[0]) || void 0 === r ? void 0 : r.clientY) || 0,
                };
            }
            const a = null != o ? this.document.elementFromPoint(o.x, o.y) : void 0,
              l = a && t.contains(a);
            return a === t || l ? this.handleMove(s, e) : void 0;
          };
          return (
            this.addEventListener(this.document.body, 'move', s),
            this.targetNodes.set(e, t),
            () => {
              this.document &&
                (this.targetNodes.delete(e),
                this.removeEventListener(this.document.body, 'move', s));
            }
          );
        }
        getTopMoveStartHandler() {
          return this.options.delayTouchStart || this.options.delayMouseStart
            ? this.handleTopMoveStartDelay
            : this.handleTopMoveStart;
        }
        installSourceNodeRemovalObserver(e) {
          this.uninstallSourceNodeRemovalObserver(),
            (this.draggedSourceNode = e),
            (this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
              e &&
                !e.parentElement &&
                (this.resurrectSourceNode(), this.uninstallSourceNodeRemovalObserver());
            })),
            e &&
              e.parentElement &&
              this.draggedSourceNodeRemovalObserver.observe(e.parentElement, { childList: !0 });
        }
        resurrectSourceNode() {
          this.document &&
            this.draggedSourceNode &&
            ((this.draggedSourceNode.style.display = 'none'),
            this.draggedSourceNode.removeAttribute('data-reactid'),
            this.document.body.appendChild(this.draggedSourceNode));
        }
        uninstallSourceNodeRemovalObserver() {
          this.draggedSourceNodeRemovalObserver &&
            this.draggedSourceNodeRemovalObserver.disconnect(),
            (this.draggedSourceNodeRemovalObserver = void 0),
            (this.draggedSourceNode = void 0);
        }
        constructor(e, t, n) {
          (this.getSourceClientOffset = e => {
            const t = this.sourceNodes.get(e);
            return (
              t &&
              (function (e) {
                const t = 1 === e.nodeType ? e : e.parentElement;
                if (!t) return;
                const { top: n, left: s } = t.getBoundingClientRect();
                return { x: s, y: n };
              })(t)
            );
          }),
            (this.handleTopMoveStartCapture = e => {
              l(e) && (this.moveStartSourceIds = []);
            }),
            (this.handleMoveStart = e => {
              Array.isArray(this.moveStartSourceIds) && this.moveStartSourceIds.unshift(e);
            }),
            (this.handleTopMoveStart = e => {
              if (!l(e)) return;
              const t = u(e);
              t &&
                (d(e) && (this.lastTargetTouchFallback = e.targetTouches[0]),
                (this._mouseClientOffset = t)),
                (this.waitingForDelay = !1);
            }),
            (this.handleTopMoveStartDelay = e => {
              if (!l(e)) return;
              const t =
                e.type === h.touch.start
                  ? this.options.delayTouchStart
                  : this.options.delayMouseStart;
              (this.timeout = setTimeout(this.handleTopMoveStart.bind(this, e), t)),
                (this.waitingForDelay = !0);
            }),
            (this.handleTopMoveCapture = () => {
              this.dragOverTargetIds = [];
            }),
            (this.handleMove = (e, t) => {
              this.dragOverTargetIds && this.dragOverTargetIds.unshift(t);
            }),
            (this.handleTopMove = e => {
              if (
                (this.timeout && clearTimeout(this.timeout), !this.document || this.waitingForDelay)
              )
                return;
              const { moveStartSourceIds: t, dragOverTargetIds: n } = this,
                s = this.options.enableHoverOutsideTarget,
                o = u(e, this.lastTargetTouchFallback);
              if (!o) return;
              if (
                this._isScrolling ||
                (!this.monitor.isDragging() &&
                  (function (e, t, n, s, o) {
                    if (!o) return !1;
                    const i = (180 * Math.atan2(s - t, n - e)) / Math.PI + 180;
                    for (let e = 0; e < o.length; ++e) {
                      const t = o[e];
                      if (t && (null == t.start || i >= t.start) && (null == t.end || i <= t.end))
                        return !0;
                    }
                    return !1;
                  })(
                    this._mouseClientOffset.x || 0,
                    this._mouseClientOffset.y || 0,
                    o.x,
                    o.y,
                    this.options.scrollAngleRanges,
                  ))
              )
                return void (this._isScrolling = !0);
              var i, r, a, l;
              if (
                (!this.monitor.isDragging() &&
                  this._mouseClientOffset.hasOwnProperty('x') &&
                  t &&
                  ((i = this._mouseClientOffset.x || 0),
                  (r = this._mouseClientOffset.y || 0),
                  (a = o.x),
                  (l = o.y),
                  Math.sqrt(Math.pow(Math.abs(a - i), 2) + Math.pow(Math.abs(l - r), 2)) >
                    (this.options.touchSlop ? this.options.touchSlop : 0)) &&
                  ((this.moveStartSourceIds = void 0),
                  this.actions.beginDrag(t, {
                    clientOffset: this._mouseClientOffset,
                    getSourceClientOffset: this.getSourceClientOffset,
                    publishSource: !1,
                  })),
                !this.monitor.isDragging())
              )
                return;
              const d = this.sourceNodes.get(this.monitor.getSourceId());
              this.installSourceNodeRemovalObserver(d),
                this.actions.publishDragSource(),
                e.cancelable && e.preventDefault();
              const c = (n || []).map(e => this.targetNodes.get(e)).filter(e => !!e),
                h = this.options.getDropTargetElementsAtPoint
                  ? this.options.getDropTargetElementsAtPoint(o.x, o.y, c)
                  : this.document.elementsFromPoint(o.x, o.y),
                p = [];
              for (const e in h) {
                if (!h.hasOwnProperty(e)) continue;
                let t = h[e];
                for (null != t && p.push(t); t; )
                  (t = t.parentElement), t && -1 === p.indexOf(t) && p.push(t);
              }
              const m = p
                .filter(e => c.indexOf(e) > -1)
                .map(e => this._getDropTargetId(e))
                .filter(e => !!e)
                .filter((e, t, n) => n.indexOf(e) === t);
              if (s)
                for (const e in this.targetNodes) {
                  const t = this.targetNodes.get(e);
                  if (d && t && t.contains(d) && -1 === m.indexOf(e)) {
                    m.unshift(e);
                    break;
                  }
                }
              m.reverse(), this.actions.hover(m, { clientOffset: o });
            }),
            (this._getDropTargetId = e => {
              const t = this.targetNodes.keys();
              let n = t.next();
              for (; !1 === n.done; ) {
                const s = n.value;
                if (e === this.targetNodes.get(s)) return s;
                n = t.next();
              }
            }),
            (this.handleTopMoveEndCapture = e => {
              (this._isScrolling = !1),
                (this.lastTargetTouchFallback = void 0),
                (function (e) {
                  return void 0 === e.buttons || 0 == (e.buttons & r);
                })(e) &&
                  (this.monitor.isDragging() && !this.monitor.didDrop()
                    ? (e.cancelable && e.preventDefault(),
                      (this._mouseClientOffset = {}),
                      this.uninstallSourceNodeRemovalObserver(),
                      this.actions.drop(),
                      this.actions.endDrag())
                    : (this.moveStartSourceIds = void 0));
            }),
            (this.handleCancelOnEscape = e => {
              'Escape' === e.key &&
                this.monitor.isDragging() &&
                ((this._mouseClientOffset = {}),
                this.uninstallSourceNodeRemovalObserver(),
                this.actions.endDrag());
            }),
            (this.options = new i(n, t)),
            (this.actions = e.getActions()),
            (this.monitor = e.getMonitor()),
            (this.sourceNodes = new Map()),
            (this.sourcePreviewNodes = new Map()),
            (this.sourcePreviewNodeOptions = new Map()),
            (this.targetNodes = new Map()),
            (this.listenerTypes = []),
            (this._mouseClientOffset = {}),
            (this._isScrolling = !1),
            this.options.enableMouseEvents && this.listenerTypes.push(s.mouse),
            this.options.enableTouchEvents && this.listenerTypes.push(s.touch),
            this.options.enableKeyboardEvents && this.listenerTypes.push(s.keyboard);
        }
      }
      const m = function (e, t = {}, n = {}) {
        return new p(e, t, n);
      };
    },
    85783: (e, t, n) => {
      'use strict';
      n.d(t, { useDragLayer: () => r });
      var s = n(50959),
        o = n(76121),
        i = n(284570);
      function r(e) {
        const t = (0, i.useDragDropManager)().getMonitor(),
          [n, r] = (0, o.useCollector)(t, e);
        return (
          (0, s.useEffect)(() => t.subscribeToOffsetChange(r)),
          (0, s.useEffect)(() => t.subscribeToStateChange(r)),
          n
        );
      }
    },
    274860: e => {
      e.exports = {
        ar: ['رسومات محلية'],
        ca_ES: ['Dibuixos locals'],
        cs: 'Local drawings',
        de: ['Lokale Zeichnungen'],
        el: 'Local drawings',
        en: 'Local drawings',
        es: ['Dibujos locales'],
        fa: 'Local drawings',
        fr: ['Dessins locaux'],
        he_IL: ['שרטוטים מקומיים'],
        hu_HU: 'Local drawings',
        id_ID: ['Gambar lokal'],
        it: ['Disegni in loco'],
        ja: ['ローカルの描画'],
        ko: ['로컬 드로잉'],
        ms_MY: ['Lukisan tempatan'],
        nl_NL: 'Local drawings',
        pl: ['Rysunki lokalne'],
        pt: ['Desenhos locais'],
        ro: 'Local drawings',
        ru: ['На выбранном графике'],
        sv: ['Lokala ritningar'],
        th: ['ภาพวาดท้องถิ่น'],
        tr: ['Lokal çizimler'],
        vi: ['Bản vẽ cục bộ'],
        zh: ['本地绘图'],
        zh_TW: ['當地繪圖'],
      };
    },
    318570: e => {
      e.exports = {
        ar: ['لا يوجد رسوم حتى الآن'],
        ca_ES: ['Encara no hi ha dibuixos'],
        cs: ['Zatím Žádné Nákresy'],
        de: ['Noch keine Zeichnungen'],
        el: ['Δεν υπάρχουν ακομα σχέδια'],
        en: 'No drawings yet',
        es: ['No hay dibujos todavía'],
        fa: ['شکلی رسم نشده است'],
        fr: ['Pas de Dessins pour le moment'],
        he_IL: ['אין שרטוט עדיין'],
        hu_HU: ['Nincs még rajz'],
        id_ID: ['Belum ada gambar saat ini'],
        it: ['Nessun disegno disponibile'],
        ja: ['未描画'],
        ko: ['그림없음'],
        ms_MY: ['Masih belum ada lukisan'],
        nl_NL: ['Nog geen tekeningen'],
        pl: ['Brak rysunków'],
        pt: ['Ainda sem desenhos'],
        ro: 'No drawings yet',
        ru: ['Нет инструментов рисования'],
        sv: ['Inga ritningar än'],
        th: ['ยังไม่มีรูปวาด'],
        tr: ['Henüz çizim yok'],
        vi: ['Chưa có bản vẽ nào'],
        zh: ['尚未绘图'],
        zh_TW: ['尚無任何繪圖'],
      };
    },
    587871: e => {
      e.exports = {
        ar: ['متزامن كليًا'],
        ca_ES: ['Sincronitzat globalment'],
        cs: 'Synced globally',
        de: ['Global synchronisiert'],
        el: 'Synced globally',
        en: 'Synced globally',
        es: ['Sincronizado globalmente'],
        fa: 'Synced globally',
        fr: ['Synchronisé globalement'],
        he_IL: ['מסונכרן ברחבי העולם'],
        hu_HU: 'Synced globally',
        id_ID: ['Disinkronisasi secara global'],
        it: ['Sincronizzazione globale'],
        ja: ['グローバルに同期'],
        ko: ['전체 싱크'],
        ms_MY: ['Disegerakkan secara sejagat'],
        nl_NL: 'Synced globally',
        pl: ['Zsynchronizowane globalnie'],
        pt: ['Sincronizado em tudo'],
        ro: 'Synced globally',
        ru: ['Синхр. везде'],
        sv: ['Synkad globalt'],
        th: ['ซิงค์ทั่วโลก'],
        tr: ['Küresel senkronize'],
        vi: ['Đã đồng bộ hóa trên toàn cầu'],
        zh: ['全局同步'],
        zh_TW: ['全球同步'],
      };
    },
    310538: e => {
      e.exports = {
        ar: ['تمت المزامنة في التنسيق'],
        ca_ES: ['Sincronitzat a la plantilla'],
        cs: 'Synced in layout',
        de: ['Im Layout synchronisiert'],
        el: 'Synced in layout',
        en: 'Synced in layout',
        es: ['Sincronizado en la plantilla'],
        fa: 'Synced in layout',
        fr: ['Synchronisé dans la mise en page'],
        he_IL: ['מסונכרן בפריסה'],
        hu_HU: 'Synced in layout',
        id_ID: ['Disinkronisasi dalam layout'],
        it: ['Sincronizzazione su layout'],
        ja: ['レイアウト内で同期'],
        ko: ['레이아웃 싱크'],
        ms_MY: ['Disegerakkan di dalam susun atur'],
        nl_NL: 'Synced in layout',
        pl: ['Zsynchronizowane w układzie'],
        pt: ['Sincronizado no layout'],
        ro: 'Synced in layout',
        ru: ['Синхр. на всех графиках'],
        sv: ['Synkad i layout'],
        th: ['ซิงค์ในเลย์เอาต์'],
        tr: ['Düzende senkronize'],
        vi: ['Đã đồng bộ hóa trong bố cục'],
        zh: ['在布局内同步'],
        zh_TW: ['版面同步'],
      };
    },
    985128: e => {
      e.exports = {
        ar: ['إزالة كافة الرسومات لهذا الرمز'],
        ca_ES: ['Elimina tots els dibuixos per a aquest símbol'],
        cs: 'Remove all drawings for this symbol',
        de: ['Alle Zeichnungen für dieses Symbol entfernen'],
        el: 'Remove all drawings for this symbol',
        en: 'Remove all drawings for this symbol',
        es: ['Eliminar todos los dibujos para este símbolo'],
        fa: 'Remove all drawings for this symbol',
        fr: ['Supprimer tous les dessins pour ce symbole'],
        he_IL: ['הסר את כל השרטוטים לסימול זה'],
        hu_HU: 'Remove all drawings for this symbol',
        id_ID: ['Hilangkan seluruh gambar pada simbol ini'],
        it: ['Rimuove tutti i disegni su questo simbolo'],
        ja: ['このシンボルのすべての描画を削除'],
        ko: ['이 심볼에 대한 모든 드로잉 없애기'],
        ms_MY: ['Buang semua lukisan untuk simbol ini'],
        nl_NL: 'Remove all drawings for this symbol',
        pl: ['Usuń wszystkie obiekty rysowania dla tego symbolu'],
        pt: ['Remover todos os desenhos deste símbolo'],
        ro: 'Remove all drawings for this symbol',
        ru: ['Удалить все объекты рисования для этого символа'],
        sv: ['Ta bort alla ritningar för denna symbol'],
        th: ['ลบการวาดทั้งหมดของตัวย่อนี้'],
        tr: ['Bu sembol için tüm çizimleri kaldır'],
        vi: ['Loại bỏ tất cả nét vẽ cho mã này'],
        zh: ['移除该商品代码的所有绘图'],
        zh_TW: ['刪除此商品代碼的所有繪圖'],
      };
    },
    923481: e => {
      e.exports = {
        ar: ['حذف كافة خطوط الأدوات لـ {symbol}'],
        ca_ES: ['elimina totes les eines de línies per a {symbol}'],
        cs: 'remove all line tools for {symbol}',
        de: ['alle Linienwerkzeuge für {symbol} entfernen'],
        el: 'remove all line tools for {symbol}',
        en: 'remove all line tools for {symbol}',
        es: ['eliminar todas las herramientas de líneas para {symbol}'],
        fa: 'remove all line tools for {symbol}',
        fr: ['supprimer tous les outils de ligne pour {symbol}.'],
        he_IL: ['הסרת כל קבוצת כלי קו ‎{symbol}‎'],
        hu_HU: 'remove all line tools for {symbol}',
        id_ID: ['Hilangkan semua peralatan garis untuk {symbol}'],
        it: ['rimuovi tutte le linee da {symbol}'],
        ja: ['{symbol}のすべてのラインツールの削除'],
        ko: ['{symbol}의 모든 줄 도구 제거'],
        ms_MY: ['buang semua alat garisan untuk {symbol}'],
        nl_NL: 'remove all line tools for {symbol}',
        pl: ['usuń wszystkie narzędzia linii dla {symbol}'],
        pt: ['remover todas as ferramentas de linhas para {symbol}'],
        ro: 'remove all line tools for {symbol}',
        ru: ['удаление всех объектов рисования для {symbol}'],
        sv: ['Ta bort alla linjeverktyg för {symbol}'],
        th: ['ลบเครื่องมือเส้นทั้งหมดสำหรับ {symbol}'],
        tr: ['{symbol} için tüm çizgi araçlarını kaldır'],
        vi: ['loại bỏ tất cả đường công cụ cho {symbol}'],
        zh: ['移除{symbol}的所有线条工具'],
        zh_TW: ['移除{symbol}的所有線條工具'],
      };
    },
    542743: e => {
      e.exports = {
        ar: [
          'مع ‎{drawingsCount}‎ رسم',
          'مع ‎{drawingsCount}‎ رسم',
          'مع ‎{drawingsCount}‎ رسم',
          'مع ‎{drawingsCount}‎ رسوم',
          'مع ‎{drawingsCount}‎ رسماً',
          'مع ‎{drawingsCount}‎ رسماً',
        ],
        ca_ES: ['amb {drawingsCount} dibuix', 'amb {drawingsCount} dibuixos'],
        cs: 'with {drawingsCount} drawing',
        de: ['mit {drawingsCount} Zeichnung', 'mit {drawingsCount} Zeichnungen'],
        el: 'with {drawingsCount} drawing',
        en: 'with {drawingsCount} drawing',
        es: ['con {drawingsCount} dibujo', 'con {drawingsCount} dibujos'],
        fa: ['with {drawingsCount} drawings'],
        fr: ['avec {drawingsCount} dessin', 'avec {drawingsCount} dessins'],
        he_IL: [
          'עם שרטוט ‎{drawingsCount}‎',
          'עם ‎{drawingsCount}‎ שרטוטים',
          'עם ‎{drawingsCount}‎ שרטוטים',
          'עם ‎{drawingsCount}‎ שרטוטים',
        ],
        hu_HU: ['with {drawingsCount} drawings'],
        id_ID: ['dengan {drawingsCount} gambar'],
        it: ['con {drawingsCount} disegno', 'con {drawingsCount} disegni'],
        ja: ['に{drawingsCount}個の描画'],
        ko: ['{drawingsCount} 드로잉이 있는'],
        ms_MY: ['dengan {drawingsCount} lukisan'],
        nl_NL: 'with {drawingsCount} drawing',
        pl: [
          'z {drawingsCount} rysunkiem',
          'z {drawingsCount} rysunkami',
          'z {drawingsCount} rysunkami',
          'z {drawingsCount} rysunkami',
        ],
        pt: ['com {drawingsCount} desenho', 'com {drawingsCount} desenhos'],
        ro: 'with {drawingsCount} drawing',
        ru: [
          'с {drawingsCount} объектом рисования',
          'с {drawingsCount} объектами рисования',
          'с {drawingsCount} объектами рисования',
          'с {drawingsCount} объектами рисования',
        ],
        sv: ['med {drawingsCount} ritverktyg', 'med {drawingsCount} ritverktyg'],
        th: ['กับ {drawingsCount} การวาด'],
        tr: ['{drawingsCount} çizim ile', '{drawingsCount} çizim ile'],
        vi: ['với {drawingsCount} nét vẽ'],
        zh: ['含{drawingsCount}个绘图'],
        zh_TW: ['含{drawingsCount}個繪圖'],
      };
    },
    988143: e => {
      e.exports = {
        ar: [
          '‎{drawingsCount}‎ رسم',
          '‎{drawingsCount}‎ رسم',
          '‎{drawingsCount}‎ رسم',
          '‎{drawingsCount}‎ رسوم',
          '‎{drawingsCount}‎ رسماً',
          '‎{drawingsCount}‎ رسماً',
        ],
        ca_ES: ['{drawingsCount} dibuix', '{drawingsCount} dibuixos'],
        cs: '{drawingsCount} drawing',
        de: ['{drawingsCount} Zeichnung', '{drawingsCount} Zeichnungen'],
        el: '{drawingsCount} drawing',
        en: '{drawingsCount} drawing',
        es: ['{drawingsCount} dibujo', '{drawingsCount} dibujos'],
        fa: ['{drawingsCount} drawings'],
        fr: ['{drawingsCount} dessin', '{drawingsCount} dessins'],
        he_IL: [
          'שרטוט ‎{drawingsCount}‎',
          '‎{drawingsCount}‎ שרטוטים',
          '‎{drawingsCount}‎ שרטוטים',
          '‎{drawingsCount}‎ שרטוטים',
        ],
        hu_HU: ['{drawingsCount} drawings'],
        id_ID: ['{drawingsCount} gambar'],
        it: ['{drawingsCount} disegno', '{drawingsCount} disegni'],
        ja: ['{drawingsCount}個の描画'],
        ko: ['{drawingsCount} 드로잉'],
        ms_MY: ['{drawingsCount} lukisan'],
        nl_NL: '{drawingsCount} drawing',
        pl: [
          '{drawingsCount} rysunek',
          '{drawingsCount} rysunki',
          '{drawingsCount} rysunków',
          '{drawingsCount} rysunków',
        ],
        pt: ['{drawingsCount} desenho', '{drawingsCount} desenhos'],
        ro: '{drawingsCount} drawing',
        ru: [
          '{drawingsCount} объект рисования',
          '{drawingsCount} объекта рисования',
          '{drawingsCount} объектов рисования',
          '{drawingsCount} объектов рисования',
        ],
        sv: ['{drawingsCount} ritverktyg', '{drawingsCount} ritverktyg'],
        th: ['{drawingsCount} การวาด'],
        tr: ['{drawingsCount} çizimi', '{drawingsCount} çizimi'],
        vi: ['{drawingsCount} nét vẽ'],
        zh: ['{drawingsCount}个绘图'],
        zh_TW: ['{drawingsCount}個繪圖'],
      };
    },
    352908: e => {
      e.exports = {
        ar: [
          '‎{symbolsCount}‎ رمز',
          '‎{symbolsCount}‎ رمز',
          '‎{symbolsCount}‎ رمز',
          '‎{symbolsCount}‎ رموز',
          '‎{symbolsCount}‎ رمزاً',
          '‎{symbolsCount}‎ رمزاً',
        ],
        ca_ES: ['{symbolsCount} símbol', '{symbolsCount} símbols'],
        cs: '{symbolsCount} symbol',
        de: ['{symbolsCount} Symbol', '{symbolsCount} Symbole'],
        el: '{symbolsCount} symbol',
        en: '{symbolsCount} symbol',
        es: ['{symbolsCount} símbolo', '{symbolsCount} símbolos'],
        fa: ['{symbolsCount} symbols'],
        fr: ['{symbolsCount} symbole', '{symbolsCount} symboles'],
        he_IL: [
          'סימול ‎{symbolsCount}‎',
          '‎{symbolsCount}‎ סימולים',
          '‎{symbolsCount}‎ סימולים',
          '‎{symbolsCount}‎ סימולים',
        ],
        hu_HU: ['{symbolsCount} symbols'],
        id_ID: ['{symbolsCount} simbol'],
        it: ['{symbolsCount} simbolo', '{symbolsCount} simboli'],
        ja: ['{symbolsCount}シンボル'],
        ko: ['{symbolsCount} 심볼'],
        ms_MY: ['Simbol {symbolsCount}'],
        nl_NL: '{symbolsCount} symbol',
        pl: '{symbolsCount} symbol',
        pt: ['{symbolsCount} símbolo', '{symbolsCount} símbolos'],
        ro: '{symbolsCount} symbol',
        ru: [
          '{symbolsCount} символ',
          '{symbolsCount} символа',
          '{symbolsCount} символов',
          '{symbolsCount} символов',
        ],
        sv: '{symbolsCount} symbol',
        th: ['{symbolsCount} สัญลักษณ์'],
        tr: ['{symbolsCount} sembol', '{symbolsCount} sembol'],
        vi: ['{symbolsCount} mã giao dịch'],
        zh: ['{symbolsCount}个商品'],
        zh_TW: ['{symbolsCount}個商品'],
      };
    },
  },
]);
