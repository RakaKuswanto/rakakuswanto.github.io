(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [4970],
  {
    470048: e => {
      e.exports = {
        wrapper: 'wrapper-GZajBGIm',
        input: 'input-GZajBGIm',
        box: 'box-GZajBGIm',
        icon: 'icon-GZajBGIm',
        noOutline: 'noOutline-GZajBGIm',
        'intent-danger': 'intent-danger-GZajBGIm',
        check: 'check-GZajBGIm',
        dot: 'dot-GZajBGIm',
      };
    },
    625650: e => {
      e.exports = {
        loader: 'loader-UL6iwcBa',
        static: 'static-UL6iwcBa',
        item: 'item-UL6iwcBa',
        'tv-button-loader': 'tv-button-loader-UL6iwcBa',
        medium: 'medium-UL6iwcBa',
        small: 'small-UL6iwcBa',
        black: 'black-UL6iwcBa',
        white: 'white-UL6iwcBa',
        gray: 'gray-UL6iwcBa',
        primary: 'primary-UL6iwcBa',
        'loader-initial': 'loader-initial-UL6iwcBa',
        'loader-appear': 'loader-appear-UL6iwcBa',
      };
    },
    351331: e => {
      e.exports = {
        loaderWrap: 'loaderWrap-jGEARQlM',
        big: 'big-jGEARQlM',
        loader: 'loader-jGEARQlM',
      };
    },
    522436: e => {
      e.exports = {
        item: 'item-GJX1EXhk',
        interactive: 'interactive-GJX1EXhk',
        hovered: 'hovered-GJX1EXhk',
        disabled: 'disabled-GJX1EXhk',
        active: 'active-GJX1EXhk',
        shortcut: 'shortcut-GJX1EXhk',
        normal: 'normal-GJX1EXhk',
        big: 'big-GJX1EXhk',
        iconCell: 'iconCell-GJX1EXhk',
        icon: 'icon-GJX1EXhk',
        checkmark: 'checkmark-GJX1EXhk',
        content: 'content-GJX1EXhk',
        label: 'label-GJX1EXhk',
        checked: 'checked-GJX1EXhk',
        toolbox: 'toolbox-GJX1EXhk',
        showToolboxOnHover: 'showToolboxOnHover-GJX1EXhk',
        arrowIcon: 'arrowIcon-GJX1EXhk',
        subMenu: 'subMenu-GJX1EXhk',
        invisibleHotkey: 'invisibleHotkey-GJX1EXhk',
      };
    },
    886838: e => {
      e.exports = { row: 'row-DFIg7eOh', line: 'line-DFIg7eOh', hint: 'hint-DFIg7eOh' };
    },
    36002: e => {
      e.exports = { menu: 'menu-Tx5xMZww' };
    },
    829122: e => {
      e.exports = {
        item: 'item-WJDah4zD',
        emptyIcons: 'emptyIcons-WJDah4zD',
        loading: 'loading-WJDah4zD',
        disabled: 'disabled-WJDah4zD',
        interactive: 'interactive-WJDah4zD',
        hovered: 'hovered-WJDah4zD',
        normal: 'normal-WJDah4zD',
        big: 'big-WJDah4zD',
        icon: 'icon-WJDah4zD',
        label: 'label-WJDah4zD',
        title: 'title-WJDah4zD',
        nested: 'nested-WJDah4zD',
        shortcut: 'shortcut-WJDah4zD',
        remove: 'remove-WJDah4zD',
      };
    },
    333927: e => {
      e.exports = { separator: 'separator-Ymxd0dt_' };
    },
    927306: e => {
      e.exports = {
        button: 'button-iLKiGOdQ',
        hovered: 'hovered-iLKiGOdQ',
        disabled: 'disabled-iLKiGOdQ',
        active: 'active-iLKiGOdQ',
        hidden: 'hidden-iLKiGOdQ',
      };
    },
    408323: (e, t, n) => {
      'use strict';
      n.d(t, { CheckboxInput: () => h });
      var s = n(50959),
        o = n(497754),
        a = n(800417),
        i = n(72571),
        r = n(465890),
        l = n(470048),
        c = n.n(l);
      function h(e) {
        const t = o(c().box, c()[`intent-${e.intent}`], {
            [c().check]: !Boolean(e.indeterminate),
            [c().dot]: Boolean(e.indeterminate),
            [c().noOutline]: -1 === e.tabIndex,
          }),
          n = o(c().wrapper, e.className);
        return s.createElement(
          'span',
          { className: n, title: e.title, style: e.style },
          s.createElement('input', {
            id: e.id,
            tabIndex: e.tabIndex,
            className: c().input,
            type: 'checkbox',
            name: e.name,
            checked: e.checked,
            disabled: e.disabled,
            value: e.value,
            autoFocus: e.autoFocus,
            role: e.role,
            onChange: function () {
              e.onChange && e.onChange(e.value);
            },
            ref: e.reference,
            'aria-required': e['aria-required'],
            'aria-describedby': e['aria-describedby'],
            'aria-invalid': e['aria-invalid'],
            ...(0, a.filterDataProps)(e),
          }),
          s.createElement(
            'span',
            { className: t },
            s.createElement(i.Icon, { icon: r, className: c().icon }),
          ),
        );
      }
    },
    234404: (e, t, n) => {
      'use strict';
      n.d(t, { Loader: () => c });
      var s,
        o = n(50959),
        a = n(497754),
        i = n(549423),
        r = n(625650),
        l = n.n(r);
      !(function (e) {
        (e[(e.Initial = 0)] = 'Initial'),
          (e[(e.Appear = 1)] = 'Appear'),
          (e[(e.Active = 2)] = 'Active');
      })(s || (s = {}));
      class c extends o.PureComponent {
        constructor(e) {
          super(e), (this._stateChangeTimeout = null), (this.state = { state: s.Initial });
        }
        render() {
          const {
              className: e,
              color: t = 'black',
              size: n = 'medium',
              staticPosition: s,
            } = this.props,
            i = a(l().item, l()[t], l()[n]);
          return o.createElement(
            'span',
            { className: a(l().loader, s && l().static, this._getStateClass(), e) },
            o.createElement('span', { className: i }),
            o.createElement('span', { className: i }),
            o.createElement('span', { className: i }),
          );
        }
        componentDidMount() {
          this.setState({ state: s.Appear }),
            (this._stateChangeTimeout = setTimeout(() => {
              this.setState({ state: s.Active });
            }, 2 * i.dur));
        }
        componentWillUnmount() {
          this._stateChangeTimeout &&
            (clearTimeout(this._stateChangeTimeout), (this._stateChangeTimeout = null));
        }
        _getStateClass() {
          switch (this.state.state) {
            case s.Initial:
              return l()['loader-initial'];
            case s.Appear:
              return l()['loader-appear'];
            default:
              return '';
          }
        }
      }
    },
    820883: (e, t, n) => {
      'use strict';
      n.d(t, { ContextMenu: () => f, OverlapContextMenu: () => I });
      var s = n(50959),
        o = n(497754),
        a = n.n(o),
        i = n(874485),
        r = n(510618),
        l = n(923235),
        c = n(249161),
        h = n(351882),
        u = n(163694),
        p = n(930052),
        d = n(333927);
      function m(e) {
        return s.createElement('li', { className: d.separator });
      }
      var v = n(729624),
        b = n(759339),
        k = n(370981);
      function E(e) {
        const { action: t } = e,
          [n, o] = (0, s.useState)(() => t.getState()),
          [a, i] = (0, s.useState)(!1),
          r = !!n.subItems.length,
          l = r && a;
        return (
          (0, s.useEffect)(() => {
            const e = () => o(t.getState());
            return (
              t.onUpdate().subscribe(null, e),
              () => {
                t.onUpdate().unsubscribe(null, e);
              }
            );
          }, []),
          s.createElement(
            v.ContextMenuItem,
            {
              ...n,
              onClick: function (e) {
                if (n.disabled || e.defaultPrevented) return;
                if (r) return void i(!0);
                n.doNotCloseOnClick || (0, k.globalCloseMenu)();
                t.execute();
              },
              isLoading: n.loading,
              isHovered: l,
            },
            l &&
              s.createElement(
                b.Drawer,
                { onClose: c },
                s.createElement(g, { items: n.subItems, parentAction: t, closeNested: c }),
              ),
          )
        );
        function c(e) {
          e && e.preventDefault(), i(!1);
        }
      }
      var x = n(134064),
        C = n(366493);
      function g(e) {
        const { items: t, parentAction: n, closeNested: o } = e,
          a =
            !Boolean(n) &&
            t.every(
              e =>
                !Boolean('separator' !== e.type && (e.getState().icon || e.getState().checkable)),
            );
        return s.createElement(
          x.EmptyIconsContext.Provider,
          { value: a },
          s.createElement(
            'ul',
            null,
            n &&
              s.createElement(
                s.Fragment,
                null,
                s.createElement(v.ContextMenuItem, {
                  label: n.getState().label,
                  isTitle: !0,
                  active: !1,
                  disabled: !1,
                  subItems: [],
                  checkable: !1,
                  checked: !1,
                  doNotCloseOnClick: !1,
                  icon: C,
                  onClick: o,
                }),
                s.createElement(m, null),
              ),
            t.map(e => {
              switch (e.type) {
                case 'action':
                  return s.createElement(E, { key: e.id, action: e });
                case 'separator':
                  return s.createElement(m, { key: e.id });
              }
            }),
          ),
        );
      }
      const w = s.createContext(null);
      var _ = n(36002);
      class f extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._menuRef = s.createRef()),
            (this._handleRequestUpdate = () => {
              this.update();
            }),
            (this._handleClose = () => {
              this.props.onClose && this.props.onClose();
            }),
            (this._handleOutsideClickClose = e => {
              const { doNotCloseOn: t, onClose: n } = this.props;
              !n || (void 0 !== t && t.contains(e.target)) || n();
            }),
            (this._handleFocusOnOpen = () => {
              var e, t;
              (null === (e = this.props.menuElementReference) || void 0 === e
                ? void 0
                : e.current) &&
                this.props.takeFocus &&
                (null === (t = this.props.menuElementReference) ||
                  void 0 === t ||
                  t.current.focus({ preventScroll: !0 }));
            }),
            (this.state = {});
        }
        render() {
          const {
            isOpened: e,
            onClose: t,
            items: n,
            doNotCloseOn: o,
            menuStatName: i,
            parentStatName: d,
            takeFocus: m,
            ...v
          } = this.props;
          return e
            ? s.createElement(
                u.DrawerManager,
                null,
                s.createElement(c.KeyboardDocumentListener, {
                  keyCode: 27,
                  eventType: 'keyup',
                  handler: this._handleClose,
                }),
                s.createElement(p.MatchMedia, { rule: 'screen and (max-width: 430px)' }, t =>
                  this._isDrawer(t)
                    ? s.createElement(
                        w.Provider,
                        { value: { type: 'drawer' } },
                        s.createElement(
                          b.Drawer,
                          {
                            onClose: this._handleClose,
                            position: 'Bottom',
                            'data-name': v['data-name'],
                          },
                          s.createElement(g, { items: n }),
                        ),
                      )
                    : s.createElement(
                        w.Provider,
                        { value: { type: 'menu' } },
                        s.createElement(
                          l.OutsideEvent,
                          {
                            handler: this._handleOutsideClickClose,
                            mouseDown: !0,
                            touchStart: !0,
                            reference: this.props.menuElementReference,
                          },
                          t =>
                            s.createElement(
                              r.Menu,
                              {
                                ...v,
                                reference: t,
                                className: a()(_.menu, 'context-menu'),
                                onClose: this._handleClose,
                                noMomentumBasedScroll: !0,
                                ref: this._menuRef,
                                tabIndex: m ? -1 : void 0,
                                onOpen: this._handleFocusOnOpen,
                              },
                              s.createElement(h.ActionsTable, {
                                items: n,
                                menuStatName: i,
                                parentStatName: d,
                                parentIsOpened: e,
                                onRequestUpdate: this._handleRequestUpdate,
                              }),
                            ),
                        ),
                      ),
                ),
              )
            : null;
        }
        update() {
          this._menuRef.current && this._menuRef.current.update();
        }
        _isDrawer(e) {
          return void 0 === this.props.mode ? e : 'drawer' === this.props.mode;
        }
      }
      const I = (0, i.makeOverlapable)(f);
    },
    68620: (e, t, n) => {
      'use strict';
      n.d(t, { Hint: () => r });
      var s = n(50959),
        o = n(497754),
        a = n.n(o),
        i = n(522436);
      function r(e) {
        const { text: t = '', className: n } = e;
        return s.createElement('span', { className: a()(i.shortcut, n) }, t);
      }
    },
    729624: (e, t, n) => {
      'use strict';
      n.d(t, { ContextMenuItem: () => m });
      var s = n(50959),
        o = n(497754),
        a = n.n(o),
        i = n(72571),
        r = n(234404),
        l = n(134064),
        c = n(68620),
        h = n(339750),
        u = n(379978),
        p = n(69311),
        d = n(829122);
      function m(e) {
        const {
            className: t,
            isTitle: n,
            isLoading: o,
            isHovered: m,
            active: v,
            checkable: b,
            disabled: k,
            checked: E,
            icon: x,
            iconChecked: C,
            hint: g,
            subItems: w,
            label: _,
            onClick: f,
            children: I,
            toolbox: N,
            jsxLabel: S,
            size: M = 'normal',
          } = e,
          O = (0, s.useContext)(l.EmptyIconsContext),
          y = !!w.length;
        return o
          ? s.createElement(
              'li',
              { className: a()(t, d.item, d.loading, d[M]) },
              s.createElement(r.Loader, null),
            )
          : s.createElement(
              'li',
              {
                className: a()(
                  t,
                  d.item,
                  d.interactive,
                  n && d.title,
                  k && d.disabled,
                  m && d.hovered,
                  v && d.active,
                  O && d.emptyIcons,
                  d[M],
                ),
                onClick: f,
              },
              s.createElement(i.Icon, {
                className: a()(d.icon),
                icon: (function () {
                  if (b && E) return C || x || h;
                  return x;
                })(),
              }),
              s.createElement('span', { className: a()(d.label) }, null != S ? S : _),
              !!N &&
                s.createElement(i.Icon, {
                  onClick: function () {
                    N && N.action();
                  },
                  className: d.remove,
                  icon: p,
                }),
              !y && g && s.createElement(c.Hint, { className: d.shortcut, text: g }),
              y && s.createElement(i.Icon, { className: d.nested, icon: u }),
              I,
            );
      }
    },
    134064: (e, t, n) => {
      'use strict';
      n.d(t, { EmptyIconsContext: () => s });
      const s = n(50959).createContext(!1);
    },
    249161: (e, t, n) => {
      'use strict';
      n.d(t, { KeyboardDocumentListener: () => o });
      var s = n(50959);
      class o extends s.PureComponent {
        constructor() {
          super(...arguments),
            (this._handleKeyDown = e => {
              e.keyCode === this.props.keyCode && this.props.handler(e);
            });
        }
        componentDidMount() {
          document.addEventListener(this.props.eventType || 'keydown', this._handleKeyDown, !1);
        }
        componentWillUnmount() {
          document.removeEventListener(this.props.eventType || 'keydown', this._handleKeyDown, !1);
        }
        render() {
          return null;
        }
      }
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
      n.d(t, { makeOverlapable: () => a });
      var s = n(50959),
        o = n(8361);
      function a(e) {
        return class extends s.PureComponent {
          render() {
            const { isOpened: t, root: n } = this.props;
            if (!t) return null;
            const a = s.createElement(e, { ...this.props, zIndex: 150 });
            return 'parent' === n ? a : s.createElement(o.Portal, null, a);
          }
        };
      }
    },
    730743: (e, t, n) => {
      'use strict';
      n.d(t, { calcSubMenuPos: () => o });
      var s = n(710263);
      function o(e, t, n = { x: 0, y: 10 }) {
        if (t) {
          const { left: n, right: o, top: a } = t.getBoundingClientRect(),
            i = document.documentElement.clientWidth,
            r = { x: n - e, y: a },
            l = { x: o, y: a };
          return (0, s.isRtl)() ? (n <= e ? l : r) : i - o >= e ? l : r;
        }
        return n;
      }
    },
    72621: (e, t, n) => {
      'use strict';
      n.d(t, { RemoveButton: () => c });
      var s = n(509806),
        o = n(50959),
        a = n(497754),
        i = n(72571),
        r = n(333765),
        l = n(927306);
      function c(e) {
        const {
          className: t,
          isActive: c,
          onClick: h,
          onMouseDown: u,
          title: p,
          hidden: d,
          'data-name': m = 'remove-button',
          ...v
        } = e;
        return o.createElement(i.Icon, {
          ...v,
          'data-name': m,
          className: a(l.button, 'apply-common-tooltip', c && l.active, d && l.hidden, t),
          icon: r,
          onClick: h,
          onMouseDown: u,
          title: p || s.t(null, void 0, n(734596)),
        });
      }
    },
    351882: (e, t, n) => {
      'use strict';
      n.d(t, { ActionsTable: () => O });
      var s = n(50959),
        o = n(886838);
      function a(e) {
        return s.createElement(
          'tr',
          { className: o.row },
          s.createElement('td', null, s.createElement('div', { className: o.line })),
          s.createElement(
            'td',
            null,
            s.createElement('div', { className: o.line }),
            e.hint ? s.createElement('div', { className: o.hint }, e.hint) : null,
          ),
        );
      }
      var i = n(650151),
        r = n(497754),
        l = n.n(r),
        c = n(408323),
        h = n(601227),
        u = n(972535);
      var p = n(72621),
        d = n(577687),
        m = n(68620),
        v = n(76821),
        b = n(80802),
        k = n(214665),
        E = n(522436);
      class x extends s.PureComponent {
        constructor() {
          super(...arguments),
            (this._handleMouseOver = e => {
              (function (e) {
                const t = e.sourceCapabilities;
                let n = t && t.firesTouchEvents;
                return void 0 === n && (n = u.touch), n;
              })(e.nativeEvent) ||
                (this.props.onMouseOver && this.props.onMouseOver());
            }),
            (this._handleClickToolbox = e => {
              e.stopPropagation(), this.props.onClickToolbox && this.props.onClickToolbox();
            });
        }
        render() {
          const {
              hasSubItems: e,
              shortcutHint: t,
              hint: n,
              invisibleHotkey: o,
              favourite: a,
              theme: i = E,
              size: l = 'normal',
            } = this.props,
            c = this.props.checkable && this.props.checkboxInput ? 'label' : 'div';
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              'tr',
              {
                className: r(
                  this.props.className,
                  i.item,
                  !this.props.noInteractive && i.interactive,
                  this.props.hovered && i.hovered,
                  this.props.disabled && i.disabled,
                  this.props.active && i.active,
                  this.props.selected && i.selected,
                  i[l],
                ),
                onClick: this.props.onClick,
                onMouseOver: this._handleMouseOver,
                ref: this.props.reference,
                'data-action-name': this.props.actionName,
              },
              void 0 !== a &&
                s.createElement(
                  'td',
                  null,
                  s.createElement(d.FavoriteButton, {
                    className: i.favourite,
                    isFilled: a,
                    onClick: this.props.onFavouriteClick,
                  }),
                ),
              s.createElement(
                'td',
                { className: r(i.iconCell), 'data-icon-cell': !0 },
                this._icon(i),
              ),
              s.createElement(
                'td',
                { className: i.contentCell },
                s.createElement(
                  c,
                  { className: i.content },
                  s.createElement(
                    'span',
                    { className: r(i.label, this.props.checked && i.checked), 'data-label': !0 },
                    this.props.label,
                  ),
                  this._toolbox(i),
                  e &&
                    s.createElement('span', {
                      className: i.arrowIcon,
                      dangerouslySetInnerHTML: { __html: k },
                      'data-submenu-arrow': !0,
                    }),
                  !e &&
                    t &&
                    !h.CheckMobile.any() &&
                    s.createElement(m.Hint, { className: r(o && i.invisibleHotkey), text: t }),
                  !e && !t && n && s.createElement(m.Hint, { text: n }),
                ),
              ),
            ),
            s.createElement(
              'tr',
              { className: i.subMenu },
              s.createElement('td', null, this.props.children),
            ),
          );
        }
        _icon(e) {
          if (this.props.checkable) {
            if (this.props.checkboxInput)
              return s.createElement(c.CheckboxInput, {
                className: r(e.icon, e.checkboxInput),
                checked: this.props.checked,
              });
            if (this.props.checked) {
              const t = !this.props.icon && !this.props.iconChecked,
                n = this.props.iconChecked || this.props.icon || b;
              return s.createElement('span', {
                className: r(e.icon, t && e.checkmark),
                dangerouslySetInnerHTML: { __html: n },
                'data-icon-checkmark': t,
              });
            }
            return this.props.icon
              ? s.createElement('span', {
                  className: e.icon,
                  dangerouslySetInnerHTML: { __html: this.props.icon },
                })
              : s.createElement('span', { className: e.icon });
          }
          return this.props.icon
            ? s.createElement('span', {
                className: e.icon,
                dangerouslySetInnerHTML: { __html: this.props.icon },
              })
            : null;
        }
        _toolbox(e) {
          return this.props.toolbox
            ? s.createElement(
                'span',
                {
                  className: r(e.toolbox, this.props.showToolboxOnHover && e.showToolboxOnHover),
                  onClick: this._handleClickToolbox,
                  'data-toolbox': !0,
                },
                this._renderToolboxContent(),
              )
            : null;
        }
        _renderToolboxContent() {
          return this.props.toolbox && this.props.toolbox.type === v.ToolboxType.Delete
            ? s.createElement(p.RemoveButton, { onClick: this.props.toolbox.action })
            : null;
        }
      }
      var C = n(820883),
        g = n(370981),
        w = n(32133),
        _ = n(730743),
        f = n(823030),
        I = n(234404),
        N = n(351331);
      function S(e) {
        const { size: t = 'normal' } = e;
        return s.createElement(x, {
          size: t,
          label: s.createElement(
            'div',
            { className: l()(N.loaderWrap, N[t]) },
            s.createElement(I.Loader, { className: N.loader }),
          ),
          noInteractive: !0,
          onMouseOver: e.onMouseOver,
        });
      }
      class M extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._itemRef = null),
            (this._menuElementRef = s.createRef()),
            (this._menuRef = null),
            (this._handleClick = e => {
              e.isDefaultPrevented() ||
                this.state.disabled ||
                (this._hasSubItems()
                  ? this._showSubMenu()
                  : (this.state.doNotCloseOnClick || (0, g.globalCloseMenu)(),
                    this.props.action.execute(),
                    this._trackEvent(),
                    this.props.onExecute && this.props.onExecute(this.props.action)));
            }),
            (this._handleClickToolbox = () => {
              (0, g.globalCloseMenu)();
            }),
            (this._handleItemMouseOver = () => {
              this._showSubMenu(), this._setCurrentContextValue();
            }),
            (this._handleMenuMouseOver = () => {
              this._setCurrentContextValue();
            }),
            (this._showSubMenu = () => {
              this.props.onShowSubMenu(this.props.action);
            }),
            (this._calcSubMenuPos = e => (0, _.calcSubMenuPos)(e, this._itemRef)),
            (this._updateState = e => {
              this.setState(e.getState());
            }),
            (this._setItemRef = e => {
              this._itemRef = e;
            }),
            (this._handleMenuRef = e => {
              this._menuRef = e;
            }),
            (this._registerSubmenu = () => {
              var e;
              return null === (e = this.context) || void 0 === e
                ? void 0
                : e.registerSubmenu(
                    this.props.action.id,
                    e =>
                      (0, i.ensureNotNull)(this._itemRef).contains(e) ||
                      (null !== this._menuElementRef.current &&
                        this._menuElementRef.current.contains(e)),
                  );
            }),
            (this.state = { ...this.props.action.getState() });
        }
        componentDidMount() {
          this.props.action.onUpdate().subscribe(this, this._updateState),
            this.state.subItems.length && (this._unsubscribe = this._registerSubmenu()),
            this.props.reference && (this._itemRef = this.props.reference.current);
        }
        componentDidUpdate(e, t) {
          var n, s, o;
          t.loading !== this.state.loading &&
            (null === (s = (n = this.props).onRequestUpdate) || void 0 === s || s.call(n)),
            0 === t.subItems.length &&
              this.state.subItems.length > 0 &&
              (this._unsubscribe = this._registerSubmenu()),
            t.subItems.length > 0 &&
              0 === this.state.subItems.length &&
              (null === (o = this._unsubscribe) || void 0 === o || o.call(this)),
            t.subItems !== this.state.subItems && null !== this._menuRef && this._menuRef.update();
        }
        componentWillUnmount() {
          this.props.action.onUpdate().unsubscribe(this, this._updateState),
            this._unsubscribe && this._unsubscribe();
        }
        render() {
          var e, t, n;
          const o = null !== (e = this.state.jsxLabel) && void 0 !== e ? e : this.state.label,
            a = (null === (t = this.context) || void 0 === t ? void 0 : t.current)
              ? this.context.current === this.props.action.id
              : this.props.isSubMenuOpened;
          return this.state.loading
            ? s.createElement(S, { size: this.state.size })
            : s.createElement(
                x,
                {
                  theme: this.props.theme,
                  reference:
                    null !== (n = this.props.reference) && void 0 !== n ? n : this._setItemRef,
                  onClick: this._handleClick,
                  onClickToolbox: this._handleClickToolbox,
                  onMouseOver: this._handleItemMouseOver,
                  hovered: a,
                  hasSubItems: this._hasSubItems(),
                  actionName: this.state.name,
                  checkboxInput: this.props.checkboxInput,
                  selected: this.props.selected,
                  ...this.state,
                  label: o,
                },
                s.createElement(C.ContextMenu, {
                  isOpened: a,
                  items: this.state.subItems,
                  position: this._calcSubMenuPos,
                  menuStatName: this.props.menuStatName,
                  parentStatName: this._getStatName(),
                  menuElementReference: this._menuElementRef,
                  onMouseOver: this.state.subItems.length ? this._handleMenuMouseOver : void 0,
                  ref: this._handleMenuRef,
                }),
              );
        }
        _setCurrentContextValue() {
          var e;
          this.state.subItems.length &&
            (null === (e = this.context) || void 0 === e || e.setCurrent(this.props.action.id));
        }
        _hasSubItems() {
          return this.state.subItems.length > 0;
        }
        _trackEvent() {
          const e = this._getStatName();
          (0, w.trackEvent)('ContextMenuClick', this.props.menuStatName || '', e);
        }
        _getStatName() {
          return [this.props.parentStatName, this.state.statName].filter(e => Boolean(e)).join('.');
        }
      }
      M.contextType = f.SubmenuContext;
      class O extends s.PureComponent {
        constructor(e) {
          super(e),
            (this._handleShowSubMenu = e => {
              const t = e.getState();
              this.setState({ showSubMenuOf: t.subItems.length ? e : void 0 });
            }),
            (this.state = {});
        }
        render() {
          return s.createElement(
            'table',
            null,
            s.createElement(
              'tbody',
              null,
              this.props.items.map(e => this._item(e)),
            ),
          );
        }
        static getDerivedStateFromProps(e, t) {
          return !e.parentIsOpened && t.showSubMenuOf ? { showSubMenuOf: void 0 } : null;
        }
        _item(e) {
          switch (e.type) {
            case 'separator':
              return s.createElement(a, { key: e.id, hint: e.getHint() });
            case 'action':
              return s.createElement(M, {
                key: e.id,
                action: e,
                onShowSubMenu: this._handleShowSubMenu,
                isSubMenuOpened: this.state.showSubMenuOf === e,
                menuStatName: this.props.menuStatName,
                parentStatName: this.props.parentStatName,
                onRequestUpdate: this.props.onRequestUpdate,
              });
          }
        }
      }
    },
    465890: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9" width="11" height="9" fill="none"><path stroke-width="2" d="M0.999878 4L3.99988 7L9.99988 1"/></svg>';
    },
    366493: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 20L11 14.5 16.5 9"/></svg>';
    },
    379978: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M8 5l3.5 3.5L8 12"/></svg>';
    },
    80802: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" width="18" height="14"><path fill="currentColor" d="M6 11.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41-10.59 10.58z"/></svg>';
    },
    339750: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M7 15l5 5L23 9"/></svg>';
    },
    333765: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" d="M9.707 9l4.647-4.646-.707-.708L9 8.293 4.354 3.646l-.708.708L8.293 9l-4.647 4.646.708.708L9 9.707l4.646 4.647.708-.707L9.707 9z"/></svg>';
    },
    69311: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.7 9l4.65-4.65-.7-.7L9 8.29 4.35 3.65l-.7.7L8.29 9l-4.64 4.65.7.7L9 9.71l4.65 4.64.7-.7L9.71 9z"/></svg>';
    },
  },
]);
