(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [6631, 959, 6437],
  {
    174786: (e, t, n) => {
      'use strict';
      n.d(t, { default: () => r });
      const r = function () {};
    },
    101414: e => {
      e.exports = {
        button: 'button-D4RPB3ZC',
        content: 'content-D4RPB3ZC',
        'icon-only': 'icon-only-D4RPB3ZC',
        link: 'link-D4RPB3ZC',
        'color-brand': 'color-brand-D4RPB3ZC',
        'variant-primary': 'variant-primary-D4RPB3ZC',
        'variant-secondary': 'variant-secondary-D4RPB3ZC',
        'color-gray': 'color-gray-D4RPB3ZC',
        'color-green': 'color-green-D4RPB3ZC',
        'color-red': 'color-red-D4RPB3ZC',
        'color-black': 'color-black-D4RPB3ZC',
        'size-xsmall': 'size-xsmall-D4RPB3ZC',
        'start-icon-wrap': 'start-icon-wrap-D4RPB3ZC',
        'end-icon-wrap': 'end-icon-wrap-D4RPB3ZC',
        'with-start-icon': 'with-start-icon-D4RPB3ZC',
        'with-end-icon': 'with-end-icon-D4RPB3ZC',
        'size-small': 'size-small-D4RPB3ZC',
        'size-medium': 'size-medium-D4RPB3ZC',
        'size-large': 'size-large-D4RPB3ZC',
        'size-xlarge': 'size-xlarge-D4RPB3ZC',
        animated: 'animated-D4RPB3ZC',
        stretch: 'stretch-D4RPB3ZC',
        grouped: 'grouped-D4RPB3ZC',
        'adjust-position': 'adjust-position-D4RPB3ZC',
        'first-row': 'first-row-D4RPB3ZC',
        'first-col': 'first-col-D4RPB3ZC',
        'no-corner-top-left': 'no-corner-top-left-D4RPB3ZC',
        'no-corner-top-right': 'no-corner-top-right-D4RPB3ZC',
        'no-corner-bottom-right': 'no-corner-bottom-right-D4RPB3ZC',
        'no-corner-bottom-left': 'no-corner-bottom-left-D4RPB3ZC',
        'text-wrap': 'text-wrap-D4RPB3ZC',
        'multiline-content': 'multiline-content-D4RPB3ZC',
        'secondary-text': 'secondary-text-D4RPB3ZC',
        'primary-text': 'primary-text-D4RPB3ZC',
      };
    },
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
    869789: e => {
      e.exports = {
        checkbox: 'checkbox-vyj6oJxw',
        reverse: 'reverse-vyj6oJxw',
        label: 'label-vyj6oJxw',
        baseline: 'baseline-vyj6oJxw',
      };
    },
    83073: e => {
      e.exports = {
        'small-height-breakpoint': 'screen and (max-height: 360px)',
        footer: 'footer-PhMf7PhQ',
        submitButton: 'submitButton-PhMf7PhQ',
        buttons: 'buttons-PhMf7PhQ',
      };
    },
    488803: e => {
      e.exports = {
        'tablet-normal-breakpoint': 'screen and (max-width: 768px)',
        'small-height-breakpoint': 'screen and (max-height: 360px)',
        'tablet-small-breakpoint': 'screen and (max-width: 430px)',
      };
    },
    755596: e => {
      e.exports = {
        dialog: 'dialog-b8SxMnzX',
        wrapper: 'wrapper-b8SxMnzX',
        separator: 'separator-b8SxMnzX',
        bounded: 'bounded-b8SxMnzX',
      };
    },
    869827: e => {
      e.exports = {
        'small-height-breakpoint': 'screen and (max-height: 360px)',
        container: 'container-BZKENkhT',
        unsetAlign: 'unsetAlign-BZKENkhT',
        title: 'title-BZKENkhT',
        subtitle: 'subtitle-BZKENkhT',
        textWrap: 'textWrap-BZKENkhT',
        ellipsis: 'ellipsis-BZKENkhT',
        close: 'close-BZKENkhT',
        icon: 'icon-BZKENkhT',
      };
    },
    345719: e => {
      e.exports = { separator: 'separator-Pf4rIzEt' };
    },
    934587: e => {
      e.exports = { icon: 'icon-WB2y0EnP', dropped: 'dropped-WB2y0EnP' };
    },
    171529: (e, t, n) => {
      'use strict';
      n.d(t, { SquareButton: () => m });
      var r = n(50959),
        a = n(497754),
        o = n(331774),
        i = n(72571),
        s = n(101414),
        l = n.n(s);
      function c(e) {
        const {
            color: t = 'brand',
            size: n = 'medium',
            variant: r = 'primary',
            stretch: i = !1,
            icon: s,
            startIcon: c,
            endIcon: u,
            iconOnly: d = !1,
            className: p,
            isGrouped: h,
            cellState: m,
            disablePositionAdjustment: f = !1,
            primaryText: v,
            secondaryText: b,
            isAnchor: g = !1,
          } = e,
          y = (function (e) {
            let t = '';
            return (
              0 !== e &&
                (1 & e && (t = a(t, l()['no-corner-top-left'])),
                2 & e && (t = a(t, l()['no-corner-top-right'])),
                4 & e && (t = a(t, l()['no-corner-bottom-right'])),
                8 & e && (t = a(t, l()['no-corner-bottom-left']))),
              t
            );
          })((0, o.getGroupCellRemoveRoundBorders)(m));
        return a(
          p,
          l().button,
          l()[`size-${n}`],
          l()[`color-${t}`],
          l()[`variant-${r}`],
          i && l().stretch,
          (s || c) && l()['with-start-icon'],
          u && l()['with-end-icon'],
          d && l()['icon-only'],
          y,
          h && l().grouped,
          h && !f && l()['adjust-position'],
          h && m.isTop && l()['first-row'],
          h && m.isLeft && l()['first-col'],
          v && b && l()['multiline-content'],
          g && l().link,
        );
      }
      function u(e) {
        const {
            startIcon: t,
            icon: n,
            iconOnly: a,
            children: o,
            endIcon: s,
            primaryText: c,
            secondaryText: u,
          } = e,
          d = null != t ? t : n,
          p = !(t || n || s || a) && !o && c && u;
        return r.createElement(
          r.Fragment,
          null,
          d && r.createElement(i.Icon, { icon: d, className: l()['start-icon-wrap'] }),
          o && r.createElement('span', { className: l().content }, o),
          s && !a && r.createElement(i.Icon, { icon: s, className: l()['end-icon-wrap'] }),
          p &&
            (function (e) {
              return (
                e.primaryText &&
                e.secondaryText &&
                r.createElement(
                  'div',
                  { className: l()['text-wrap'] },
                  r.createElement(
                    'span',
                    { className: l()['primary-text'] },
                    ' ',
                    e.primaryText,
                    ' ',
                  ),
                  'string' == typeof e.secondaryText
                    ? r.createElement(
                        'span',
                        { className: l()['secondary-text'] },
                        ' ',
                        e.secondaryText,
                        ' ',
                      )
                    : r.createElement(
                        'span',
                        { className: l()['secondary-text'] },
                        r.createElement('span', null, e.secondaryText.firstLine),
                        r.createElement('span', null, e.secondaryText.secondLine),
                      ),
                )
              );
            })(e),
        );
      }
      var d = n(380327),
        p = n(800417);
      function h(e) {
        const {
          className: t,
          color: n,
          variant: r,
          size: a,
          stretch: o,
          animated: i,
          icon: s,
          iconOnly: l,
          startIcon: c,
          endIcon: u,
          primaryText: d,
          secondaryText: h,
          ...m
        } = e;
        return { ...m, ...(0, p.filterDataProps)(e), ...(0, p.filterAriaProps)(e) };
      }
      function m(e) {
        const { reference: t, ...n } = e,
          {
            isGrouped: a,
            cellState: o,
            disablePositionAdjustment: i,
          } = (0, r.useContext)(d.ControlGroupContext),
          s = c({ ...n, isGrouped: a, cellState: o, disablePositionAdjustment: i });
        return r.createElement(
          'button',
          { ...h(n), className: s, ref: t },
          r.createElement(u, { ...n }),
        );
      }
    },
    408323: (e, t, n) => {
      'use strict';
      n.d(t, { CheckboxInput: () => u });
      var r = n(50959),
        a = n(497754),
        o = n(800417),
        i = n(72571),
        s = n(465890),
        l = n(470048),
        c = n.n(l);
      function u(e) {
        const t = a(c().box, c()[`intent-${e.intent}`], {
            [c().check]: !Boolean(e.indeterminate),
            [c().dot]: Boolean(e.indeterminate),
            [c().noOutline]: -1 === e.tabIndex,
          }),
          n = a(c().wrapper, e.className);
        return r.createElement(
          'span',
          { className: n, title: e.title, style: e.style },
          r.createElement('input', {
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
            ...(0, o.filterDataProps)(e),
          }),
          r.createElement(
            'span',
            { className: t },
            r.createElement(i.Icon, { icon: s, className: c().icon }),
          ),
        );
      }
    },
    302946: (e, t, n) => {
      'use strict';
      n.d(t, { Checkbox: () => c });
      var r = n(50959),
        a = n(497754),
        o = n(230789),
        i = n(408323),
        s = n(869789),
        l = n.n(s);
      class c extends r.PureComponent {
        render() {
          const { inputClassName: e, labelClassName: t, ...n } = this.props,
            o = a(this.props.className, l().checkbox, {
              [l().reverse]: Boolean(this.props.labelPositionReverse),
              [l().baseline]: Boolean(this.props.labelAlignBaseline),
            }),
            s = a(l().label, t, { [l().disabled]: this.props.disabled });
          let c = null;
          return (
            this.props.label &&
              (c = r.createElement(
                'span',
                { className: s, title: this.props.title },
                this.props.label,
              )),
            r.createElement(
              'label',
              { className: o },
              r.createElement(i.CheckboxInput, { ...n, className: e }),
              c,
            )
          );
        }
      }
      c.defaultProps = { value: 'on' };
      (0, o.makeSwitchGroupItem)(c);
    },
    380327: (e, t, n) => {
      'use strict';
      n.d(t, { ControlGroupContext: () => r });
      const r = n(50959).createContext({
        isGrouped: !1,
        cellState: { isTop: !0, isRight: !0, isBottom: !0, isLeft: !0 },
      });
    },
    331774: (e, t, n) => {
      'use strict';
      function r(e) {
        let t = 0;
        return (
          (e.isTop && e.isLeft) || (t += 1),
          (e.isTop && e.isRight) || (t += 2),
          (e.isBottom && e.isLeft) || (t += 8),
          (e.isBottom && e.isRight) || (t += 4),
          t
        );
      }
      n.d(t, { getGroupCellRemoveRoundBorders: () => r });
    },
    778199: (e, t, n) => {
      'use strict';
      function r(e, t, n, r, a) {
        function o(a) {
          if (e > a.timeStamp) return;
          const o = a.target;
          void 0 !== n &&
            null !== t &&
            null !== o &&
            o.ownerDocument === r &&
            (t.contains(o) || n(a));
        }
        return (
          a.click && r.addEventListener('click', o, !1),
          a.mouseDown && r.addEventListener('mousedown', o, !1),
          a.touchEnd && r.addEventListener('touchend', o, !1),
          a.touchStart && r.addEventListener('touchstart', o, !1),
          () => {
            r.removeEventListener('click', o, !1),
              r.removeEventListener('mousedown', o, !1),
              r.removeEventListener('touchend', o, !1),
              r.removeEventListener('touchstart', o, !1);
          }
        );
      }
      n.d(t, { addOutsideEventListener: () => r });
    },
    908783: (e, t, n) => {
      'use strict';
      n.d(t, { useOutsideEvent: () => o });
      var r = n(50959),
        a = n(778199);
      function o(e) {
        const {
            click: t,
            mouseDown: n,
            touchEnd: o,
            touchStart: i,
            handler: s,
            reference: l,
            ownerDocument: c = document,
          } = e,
          u = (0, r.useRef)(null),
          d = (0, r.useRef)(new CustomEvent('timestamp').timeStamp);
        return (
          (0, r.useLayoutEffect)(() => {
            const e = { click: t, mouseDown: n, touchEnd: o, touchStart: i },
              r = l ? l.current : u.current;
            return (0, a.addOutsideEventListener)(d.current, r, s, c, e);
          }, [t, n, o, i, s]),
          l || u
        );
      }
    },
    72571: (e, t, n) => {
      'use strict';
      n.d(t, { Icon: () => a });
      var r = n(50959);
      const a = r.forwardRef((e, t) => {
        const { icon: n = '', ...a } = e;
        return r.createElement('span', { ...a, ref: t, dangerouslySetInnerHTML: { __html: n } });
      });
    },
    230789: (e, t, n) => {
      'use strict';
      n.d(t, { SwitchGroup: () => i, makeSwitchGroupItem: () => s });
      var r = n(50959),
        a = n(174786);
      const o = (0, r.createContext)({
        getName: () => '',
        getValues: () => [],
        getOnChange: () => a.default,
        subscribe: a.default,
        unsubscribe: a.default,
      });
      class i extends r.PureComponent {
        constructor(e) {
          super(e),
            (this._subscriptions = new Set()),
            (this._getName = () => this.props.name),
            (this._getValues = () => this.props.values),
            (this._getOnChange = () => this.props.onChange),
            (this._subscribe = e => {
              this._subscriptions.add(e);
            }),
            (this._unsubscribe = e => {
              this._subscriptions.delete(e);
            }),
            (this.state = {
              switchGroupContext: {
                getName: this._getName,
                getValues: this._getValues,
                getOnChange: this._getOnChange,
                subscribe: this._subscribe,
                unsubscribe: this._unsubscribe,
              },
            });
        }
        render() {
          return r.createElement(
            o.Provider,
            { value: this.state.switchGroupContext },
            this.props.children,
          );
        }
        componentDidUpdate(e) {
          this._notify(this._getUpdates(this.props.values, e.values));
        }
        _notify(e) {
          this._subscriptions.forEach(t => t(e));
        }
        _getUpdates(e, t) {
          return [...t, ...e].filter(n => (t.includes(n) ? !e.includes(n) : e.includes(n)));
        }
      }
      function s(e) {
        var t;
        return (
          (t = class extends r.PureComponent {
            constructor() {
              super(...arguments),
                (this._onChange = e => {
                  this.context.getOnChange()(e);
                }),
                (this._onUpdate = e => {
                  e.includes(this.props.value) && this.forceUpdate();
                });
            }
            componentDidMount() {
              this.context.subscribe(this._onUpdate);
            }
            render() {
              return r.createElement(e, {
                ...this.props,
                name: this._getName(),
                onChange: this._onChange,
                checked: this._isChecked(),
              });
            }
            componentWillUnmount() {
              this.context.unsubscribe(this._onUpdate);
            }
            _getName() {
              return this.context.getName();
            }
            _isChecked() {
              return this.context.getValues().includes(this.props.value);
            }
          }),
          (t.contextType = o),
          t
        );
      }
    },
    800417: (e, t, n) => {
      'use strict';
      function r(e) {
        return o(e, i);
      }
      function a(e) {
        return o(e, s);
      }
      function o(e, t) {
        const n = Object.entries(e).filter(t),
          r = {};
        for (const [e, t] of n) r[e] = t;
        return r;
      }
      function i(e) {
        const [t, n] = e;
        return 0 === t.indexOf('data-') && 'string' == typeof n;
      }
      function s(e) {
        return 0 === e[0].indexOf('aria-');
      }
      n.d(t, {
        filterAriaProps: () => a,
        filterDataProps: () => r,
        filterProps: () => o,
        isAriaAttribute: () => s,
        isDataAttribute: () => i,
      });
    },
    273388: (e, t, n) => {
      'use strict';
      function r(e) {
        return t => {
          e.forEach(e => {
            'function' == typeof e ? e(t) : null != e && (e.current = t);
          });
        };
      }
      function a(e) {
        return r([e]);
      }
      n.d(t, { isomorphicRef: () => a, mergeRefs: () => r });
    },
    801808: (e, t, n) => {
      'use strict';
      n.d(t, { OverlapManager: () => o, getRootOverlapManager: () => s });
      var r = n(650151);
      class a {
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
      class o {
        constructor(e = document) {
          (this._storage = new a()),
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
          const r = this._document.createElement('div');
          if (
            ((r.style.position = t.position),
            (r.style.zIndex = this._index.toString()),
            (r.dataset.id = e),
            void 0 !== t.index)
          ) {
            const e = this._container.childNodes.length;
            if (t.index >= e) this._container.appendChild(r);
            else if (t.index <= 0) this._container.insertBefore(r, this._container.firstChild);
            else {
              const e = this._container.childNodes[t.index];
              this._container.insertBefore(r, e);
            }
          } else
            'reverse' === t.direction
              ? this._container.insertBefore(r, this._container.firstChild)
              : this._container.appendChild(r);
          return this._windows.set(e, r), ++this._index, r;
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
      const i = new WeakMap();
      function s(e = document) {
        const t = e.getElementById('overlap-manager-root');
        if (null !== t) return (0, r.ensureDefined)(i.get(t));
        {
          const t = new o(e),
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
          return i.set(n, t), t.setContainer(n), e.body.appendChild(n), t;
        }
      }
    },
    285089: (e, t, n) => {
      'use strict';
      n.d(t, { setFixedBodyState: () => l });
      var r = n(735922);
      const a = () => !window.matchMedia('screen and (min-width: 768px)').matches,
        o = () => !window.matchMedia('screen and (min-width: 1280px)').matches;
      let i = 0,
        s = !1;
      function l(e) {
        const { body: t } = document,
          n = t.querySelector('.widgetbar-wrap');
        if (e && 1 == ++i) {
          const e = (0, r.getCSSProperty)(t, 'overflow'),
            a = (0, r.getCSSPropertyNumericValue)(t, 'padding-right');
          'hidden' !== e.toLowerCase() &&
            t.scrollHeight > t.offsetHeight &&
            ((0, r.setStyle)(n, 'right', `${(0, r.getScrollbarWidth)()}px`),
            (t.style.paddingRight = `${a + (0, r.getScrollbarWidth)()}px`),
            (s = !0)),
            t.classList.add('i-no-scroll');
        } else if (!e && i > 0 && 0 == --i && (t.classList.remove('i-no-scroll'), s)) {
          (0, r.setStyle)(n, 'right', '0px');
          let e = 0;
          (e = n
            ? ((l = (0, r.getContentWidth)(n)), a() ? 0 : o() ? 45 : Math.min(Math.max(l, 45), 450))
            : 0),
            t.scrollHeight <= t.clientHeight && (e -= (0, r.getScrollbarWidth)()),
            (t.style.paddingRight = (e < 0 ? 0 : e) + 'px'),
            (s = !1);
        }
        var l;
      }
    },
    976669: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { AdaptiveConfirmDialog: () => p });
      var r = n(50959),
        a = n(497754),
        o = n.n(a),
        i = n(805184),
        s = n(650151),
        l = n(509806),
        c = n(180185),
        u = n(533408),
        d = n(83073);
      class p extends r.PureComponent {
        constructor() {
          super(...arguments),
            (this._dialogRef = r.createRef()),
            (this._handleClose = () => {
              const { defaultActionOnClose: e, onSubmit: t, onCancel: n, onClose: r } = this.props;
              switch (e) {
                case 'submit':
                  t();
                  break;
                case 'cancel':
                  n();
              }
              r();
            }),
            (this._handleCancel = () => {
              this.props.onCancel(), this.props.onClose();
            }),
            (this._handleKeyDown = e => {
              const { onSubmit: t, submitButtonDisabled: n, submitOnEnterKey: r } = this.props;
              13 === (0, c.hashFromEvent)(e) && r && (e.preventDefault(), n || t());
            });
        }
        render() {
          const {
            render: e,
            onClose: t,
            onSubmit: n,
            onCancel: a,
            footerLeftRenderer: o,
            submitButtonText: i,
            submitButtonDisabled: s,
            defaultActionOnClose: l,
            submitOnEnterKey: c,
            ...d
          } = this.props;
          return r.createElement(u.AdaptivePopupDialog, {
            ...d,
            ref: this._dialogRef,
            onKeyDown: this._handleKeyDown,
            render: this._renderChildren(),
            onClose: this._handleClose,
          });
        }
        focus() {
          (0, s.ensureNotNull)(this._dialogRef.current).focus();
        }
        _renderChildren() {
          return e => {
            const {
              render: t,
              footerLeftRenderer: a,
              additionalButtons: s,
              submitButtonText: c,
              submitButtonDisabled: u,
              onSubmit: p,
              cancelButtonText: h,
              showCancelButton: m = !0,
              submitButtonClassName: f,
              cancelButtonClassName: v,
              buttonsWrapperClassName: b,
            } = this.props;
            return r.createElement(
              r.Fragment,
              null,
              t(e),
              r.createElement(
                'div',
                { className: d.footer },
                a && a(e.isSmallWidth),
                r.createElement(
                  'div',
                  { className: o()(d.buttons, b) },
                  s,
                  m &&
                    r.createElement(
                      i.Button,
                      {
                        className: v,
                        name: 'cancel',
                        appearance: 'stroke',
                        onClick: this._handleCancel,
                      },
                      null != h ? h : l.t(null, void 0, n(620036)),
                    ),
                  r.createElement(
                    'span',
                    { className: d.submitButton },
                    r.createElement(
                      i.Button,
                      {
                        className: f,
                        disabled: u,
                        name: 'submit',
                        onClick: p,
                        'data-name': 'submit-button',
                      },
                      null != c ? c : l.t(null, void 0, n(468988)),
                    ),
                  ),
                ),
              ),
            );
          };
        }
      }
      p.defaultProps = { defaultActionOnClose: 'submit', submitOnEnterKey: !0 };
    },
    996038: (e, t, n) => {
      'use strict';
      n.d(t, { DialogBreakpoints: () => a });
      var r = n(488803);
      const a = {
        SmallHeight: r['small-height-breakpoint'],
        TabletSmall: r['tablet-small-breakpoint'],
        TabletNormal: r['tablet-normal-breakpoint'],
      };
    },
    533408: (e, t, n) => {
      'use strict';
      n.d(t, { AdaptivePopupDialog: () => D });
      var r = n(50959),
        a = n(650151),
        o = n(660538),
        i = n(497754),
        s = n.n(i),
        l = n(180185),
        c = n(710263),
        u = n(698043),
        d = n(40766),
        p = n(494707),
        h = n(996038),
        m = n(930052),
        f = n(910549);
      var v = n(206594),
        b = n(559410),
        g = n(72571),
        y = n(190410),
        _ = n(507720),
        S = n(869827);
      function w(e) {
        const {
            title: t,
            titleTextWrap: n = !1,
            subtitle: a,
            showCloseIcon: o = !0,
            onClose: i,
            onCloseButtonKeyDown: l,
            renderBefore: c,
            renderAfter: u,
            draggable: d,
            className: p,
            unsetAlign: h,
            closeAriaLabel: m,
            closeButtonReference: f,
          } = e,
          [v, b] = (0, r.useState)(!1);
        return r.createElement(
          y.DialogHeaderContext.Provider,
          { value: { setHideClose: b } },
          r.createElement(
            'div',
            { className: s()(S.container, p, (a || h) && S.unsetAlign) },
            c,
            r.createElement(
              'div',
              { 'data-dragg-area': d, className: S.title },
              r.createElement('div', { className: s()(n ? S.textWrap : S.ellipsis) }, t),
              a && r.createElement('div', { className: s()(S.ellipsis, S.subtitle) }, a),
            ),
            u,
            o &&
              !v &&
              r.createElement(
                'button',
                {
                  className: S.close,
                  onClick: i,
                  onKeyDown: l,
                  'data-name': 'close',
                  'aria-label': m,
                  type: 'button',
                  ref: f,
                },
                r.createElement(g.Icon, {
                  className: S.icon,
                  icon: _,
                  'data-name': 'close',
                  'data-role': 'button',
                }),
              ),
          ),
        );
      }
      var C = n(273388),
        x = n(800417),
        E = n(755596);
      const N = { vertical: 20 },
        k = { vertical: 0 };
      class D extends r.PureComponent {
        constructor() {
          super(...arguments),
            (this._controller = null),
            (this._reference = null),
            (this._orientationMediaQuery = null),
            (this._renderChildren = (e, t) => (
              (this._controller = e),
              this.props.render({
                requestResize: this._requestResize,
                centerAndFit: this._centerAndFit,
                isSmallWidth: t,
              })
            )),
            (this._handleReference = e => (this._reference = e)),
            (this._handleCloseBtnClick = () => {
              this.props.onKeyboardClose && this.props.onKeyboardClose(), this._handleClose();
            }),
            (this._handleClose = () => {
              this.props.onClose();
            }),
            (this._handleOpen = () => {
              void 0 !== this.props.onOpen &&
                this.props.isOpened &&
                this.props.onOpen(
                  this.props.fullScreen ||
                    window.matchMedia(h.DialogBreakpoints.TabletSmall).matches,
                );
            }),
            (this._handleKeyDown = e => {
              if (!e.defaultPrevented) {
                if (
                  (this.props.onKeyDown && this.props.onKeyDown(e), 27 === (0, l.hashFromEvent)(e))
                ) {
                  if (e.defaultPrevented) return;
                  if (this.props.forceCloseOnEsc && this.props.forceCloseOnEsc())
                    return (
                      this.props.onKeyboardClose && this.props.onKeyboardClose(),
                      void this._handleClose()
                    );
                  const { activeElement: n } = document,
                    r = (0, a.ensureNotNull)(this._reference);
                  if (null !== n) {
                    if (
                      (e.preventDefault(),
                      'true' === (t = n).getAttribute('data-haspopup') &&
                        'true' !== t.getAttribute('data-expanded'))
                    )
                      return void this._handleClose();
                    if ((0, u.isTextEditingField)(n)) return void r.focus();
                    if (r.contains(n))
                      return (
                        this.props.onKeyboardClose && this.props.onKeyboardClose(),
                        void this._handleClose()
                      );
                  }
                }
                var t, n;
                (function (e) {
                  if ('function' == typeof e) return e();
                  return Boolean(e);
                })(this.props.disableTabNavigationContainment) ||
                  ((n = e),
                  [9, l.Modifiers.Shift + 9].includes((0, l.hashFromEvent)(n)) &&
                    n.stopPropagation());
              }
            }),
            (this._requestResize = () => {
              null !== this._controller && this._controller.recalculateBounds();
            }),
            (this._centerAndFit = () => {
              null !== this._controller && this._controller.centerAndFit();
            }),
            (this._calculatePositionWithOffsets = (e, t) => {
              const n = (0, a.ensureDefined)(this.props.fullScreenViewOffsets).value();
              return {
                top: n.top,
                left: (0, c.isRtl)() ? -n.right : n.left,
                width: t.clientWidth - n.left - n.right,
                height: t.clientHeight - n.top - n.bottom,
              };
            });
        }
        componentDidMount() {
          this.props.ignoreClosePopupsAndDialog ||
            b.subscribe(v.CLOSE_POPUPS_AND_DIALOGS_COMMAND, this._handleClose, null),
            this._handleOpen(),
            void 0 !== this.props.onOpen &&
              ((this._orientationMediaQuery = window.matchMedia('(orientation: portrait)')),
              (0, o.mediaQueryAddEventListener)(this._orientationMediaQuery, this._handleOpen)),
            this.props.fullScreenViewOffsets &&
              this.props.fullScreen &&
              this.props.fullScreenViewOffsets.subscribe(this._requestResize);
        }
        componentWillUnmount() {
          this.props.ignoreClosePopupsAndDialog ||
            b.unsubscribe(v.CLOSE_POPUPS_AND_DIALOGS_COMMAND, this._handleClose, null),
            null !== this._orientationMediaQuery &&
              (0, o.mediaQueryRemoveEventListener)(this._orientationMediaQuery, this._handleOpen),
            this.props.fullScreenViewOffsets &&
              this.props.fullScreen &&
              this.props.fullScreenViewOffsets.unsubscribe(this._requestResize);
        }
        focus() {
          (0, a.ensureNotNull)(this._reference).focus();
        }
        getElement() {
          return this._reference;
        }
        contains(e) {
          var t, n;
          return (
            null !==
              (n = null === (t = this._reference) || void 0 === t ? void 0 : t.contains(e)) &&
            void 0 !== n &&
            n
          );
        }
        render() {
          const {
              className: e,
              wrapperClassName: t,
              headerClassName: n,
              isOpened: a,
              title: o,
              titleTextWrap: i,
              dataName: l,
              onClickOutside: c,
              additionalElementPos: u,
              additionalHeaderElement: v,
              backdrop: b,
              shouldForceFocus: g = !0,
              shouldReturnFocus: y,
              showSeparator: _,
              subtitle: S,
              draggable: D = !0,
              fullScreen: T = !1,
              showCloseIcon: B = !0,
              rounded: I = !0,
              isAnimationEnabled: R,
              growPoint: P,
              dialogTooltip: O,
              unsetHeaderAlign: L,
              onDragStart: M,
              dataDialogName: A,
              closeAriaLabel: z,
              containerAriaLabel: j,
              reference: Z,
              containerTabIndex: W,
              closeButtonReference: H,
              onCloseButtonKeyDown: q,
              shadowed: K,
              fullScreenViewOffsets: G,
            } = this.props,
            U = 'after' !== u ? v : void 0,
            $ = 'after' === u ? v : void 0,
            F = 'string' == typeof o ? o : A || '',
            V = (0, x.filterDataProps)(this.props),
            Q = (0, C.mergeRefs)([this._handleReference, Z]);
          return r.createElement(m.MatchMedia, { rule: h.DialogBreakpoints.SmallHeight }, u =>
            r.createElement(m.MatchMedia, { rule: h.DialogBreakpoints.TabletSmall }, h =>
              r.createElement(
                d.PopupDialog,
                {
                  rounded: !(h || T) && I,
                  className: s()(E.dialog, T && G && E.bounded, e),
                  isOpened: a,
                  reference: Q,
                  onKeyDown: this._handleKeyDown,
                  onClickOutside: c,
                  onClickBackdrop: c,
                  fullscreen: h || T,
                  guard: u ? k : N,
                  boundByScreen: h || T,
                  shouldForceFocus: g,
                  shouldReturnFocus: y,
                  backdrop: b,
                  draggable: D,
                  isAnimationEnabled: R,
                  growPoint: P,
                  name: this.props.dataName,
                  dialogTooltip: O,
                  onDragStart: M,
                  containerAriaLabel: j,
                  containerTabIndex: W,
                  calculateDialogPosition: T && G ? this._calculatePositionWithOffsets : void 0,
                  shadowed: K,
                  ...V,
                },
                r.createElement(
                  'div',
                  { className: s()(E.wrapper, t), 'data-name': l, 'data-dialog-name': F },
                  void 0 !== o &&
                    r.createElement(w, {
                      draggable: D && !(h || T),
                      onClose: this._handleCloseBtnClick,
                      renderAfter: $,
                      renderBefore: U,
                      subtitle: S,
                      title: o,
                      titleTextWrap: i,
                      showCloseIcon: B,
                      className: n,
                      unsetAlign: L,
                      closeAriaLabel: z,
                      closeButtonReference: H,
                      onCloseButtonKeyDown: q,
                    }),
                  _ && r.createElement(p.Separator, { className: E.separator }),
                  r.createElement(f.PopupContext.Consumer, null, e =>
                    this._renderChildren(e, h || T),
                  ),
                ),
              ),
            ),
          );
        }
      }
    },
    190410: (e, t, n) => {
      'use strict';
      n.d(t, { DialogHeaderContext: () => r });
      const r = n(50959).createContext({ setHideClose: () => {} });
    },
    930052: (e, t, n) => {
      'use strict';
      n.d(t, { MatchMedia: () => a });
      var r = n(50959);
      class a extends r.PureComponent {
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
    494707: (e, t, n) => {
      'use strict';
      n.d(t, { Separator: () => i });
      var r = n(50959),
        a = n(497754),
        o = n(345719);
      function i(e) {
        return r.createElement('div', { className: a(o.separator, e.className) });
      }
    },
    8361: (e, t, n) => {
      'use strict';
      n.d(t, { Portal: () => l, PortalContext: () => c });
      var r = n(50959),
        a = n(500962),
        o = n(189904),
        i = n(801808),
        s = n(630795);
      class l extends r.PureComponent {
        constructor() {
          super(...arguments), (this._uuid = (0, o.guid)());
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
            a.createPortal(r.createElement(c.Provider, { value: this }, this.props.children), e)
          );
        }
        moveToTop() {
          this._manager().moveToTop(this._uuid);
        }
        _manager() {
          return null === this.context ? (0, i.getRootOverlapManager)() : this.context;
        }
      }
      l.contextType = s.SlotContext;
      const c = r.createContext(null);
    },
    630795: (e, t, n) => {
      'use strict';
      n.d(t, { Slot: () => a, SlotContext: () => o });
      var r = n(50959);
      class a extends r.Component {
        shouldComponentUpdate() {
          return !1;
        }
        render() {
          return r.createElement('div', {
            style: { position: 'fixed', zIndex: 150, left: 0, top: 0 },
            ref: this.props.reference,
          });
        }
      }
      const o = r.createContext(null);
    },
    515783: (e, t, n) => {
      'use strict';
      n.d(t, { ToolWidgetCaret: () => l });
      var r = n(50959),
        a = n(497754),
        o = n(72571),
        i = n(934587),
        s = n(100578);
      function l(e) {
        const { dropped: t, className: n } = e;
        return r.createElement(o.Icon, { className: a(n, i.icon, { [i.dropped]: t }), icon: s });
      }
    },
    695257: (e, t) => {
      'use strict';
      var n = Symbol.for('react.element'),
        r = Symbol.for('react.portal'),
        a = Symbol.for('react.fragment'),
        o = Symbol.for('react.strict_mode'),
        i = Symbol.for('react.profiler'),
        s = Symbol.for('react.provider'),
        l = Symbol.for('react.context'),
        c = Symbol.for('react.forward_ref'),
        u = Symbol.for('react.suspense'),
        d = Symbol.for('react.memo'),
        p = Symbol.for('react.lazy'),
        h = Symbol.iterator;
      var m = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        f = Object.assign,
        v = {};
      function b(e, t, n) {
        (this.props = e), (this.context = t), (this.refs = v), (this.updater = n || m);
      }
      function g() {}
      function y(e, t, n) {
        (this.props = e), (this.context = t), (this.refs = v), (this.updater = n || m);
      }
      (b.prototype.isReactComponent = {}),
        (b.prototype.setState = function (e, t) {
          if ('object' != typeof e && 'function' != typeof e && null != e)
            throw Error(
              'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
            );
          this.updater.enqueueSetState(this, e, t, 'setState');
        }),
        (b.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
        }),
        (g.prototype = b.prototype);
      var _ = (y.prototype = new g());
      (_.constructor = y), f(_, b.prototype), (_.isPureReactComponent = !0);
      var S = Array.isArray,
        w = Object.prototype.hasOwnProperty,
        C = { current: null },
        x = { key: !0, ref: !0, __self: !0, __source: !0 };
      function E(e, t, r) {
        var a,
          o = {},
          i = null,
          s = null;
        if (null != t)
          for (a in (void 0 !== t.ref && (s = t.ref), void 0 !== t.key && (i = '' + t.key), t))
            w.call(t, a) && !x.hasOwnProperty(a) && (o[a] = t[a]);
        var l = arguments.length - 2;
        if (1 === l) o.children = r;
        else if (1 < l) {
          for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
          o.children = c;
        }
        if (e && e.defaultProps) for (a in (l = e.defaultProps)) void 0 === o[a] && (o[a] = l[a]);
        return { $$typeof: n, type: e, key: i, ref: s, props: o, _owner: C.current };
      }
      function N(e) {
        return 'object' == typeof e && null !== e && e.$$typeof === n;
      }
      var k = /\/+/g;
      function D(e, t) {
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
      function T(e, t, a, o, i) {
        var s = typeof e;
        ('undefined' !== s && 'boolean' !== s) || (e = null);
        var l = !1;
        if (null === e) l = !0;
        else
          switch (s) {
            case 'string':
            case 'number':
              l = !0;
              break;
            case 'object':
              switch (e.$$typeof) {
                case n:
                case r:
                  l = !0;
              }
          }
        if (l)
          return (
            (i = i((l = e))),
            (e = '' === o ? '.' + D(l, 0) : o),
            S(i)
              ? ((a = ''),
                null != e && (a = e.replace(k, '$&/') + '/'),
                T(i, t, a, '', function (e) {
                  return e;
                }))
              : null != i &&
                (N(i) &&
                  (i = (function (e, t) {
                    return {
                      $$typeof: n,
                      type: e.type,
                      key: t,
                      ref: e.ref,
                      props: e.props,
                      _owner: e._owner,
                    };
                  })(
                    i,
                    a +
                      (!i.key || (l && l.key === i.key)
                        ? ''
                        : ('' + i.key).replace(k, '$&/') + '/') +
                      e,
                  )),
                t.push(i)),
            1
          );
        if (((l = 0), (o = '' === o ? '.' : o + ':'), S(e)))
          for (var c = 0; c < e.length; c++) {
            var u = o + D((s = e[c]), c);
            l += T(s, t, a, u, i);
          }
        else if (
          ((u = (function (e) {
            return null === e || 'object' != typeof e
              ? null
              : 'function' == typeof (e = (h && e[h]) || e['@@iterator'])
              ? e
              : null;
          })(e)),
          'function' == typeof u)
        )
          for (e = u.call(e), c = 0; !(s = e.next()).done; )
            l += T((s = s.value), t, a, (u = o + D(s, c++)), i);
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
        return l;
      }
      function B(e, t, n) {
        if (null == e) return e;
        var r = [],
          a = 0;
        return (
          T(e, r, '', '', function (e) {
            return t.call(n, e, a++);
          }),
          r
        );
      }
      function I(e) {
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
      var R = { current: null },
        P = { transition: null },
        O = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: P, ReactCurrentOwner: C };
      (t.Children = {
        map: B,
        forEach: function (e, t, n) {
          B(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            B(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            B(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!N(e))
            throw Error('React.Children.only expected to receive a single React element child.');
          return e;
        },
      }),
        (t.Component = b),
        (t.Fragment = a),
        (t.Profiler = i),
        (t.PureComponent = y),
        (t.StrictMode = o),
        (t.Suspense = u),
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O),
        (t.cloneElement = function (e, t, r) {
          if (null == e)
            throw Error(
              'React.cloneElement(...): The argument must be a React element, but you passed ' +
                e +
                '.',
            );
          var a = f({}, e.props),
            o = e.key,
            i = e.ref,
            s = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (s = C.current)),
              void 0 !== t.key && (o = '' + t.key),
              e.type && e.type.defaultProps)
            )
              var l = e.type.defaultProps;
            for (c in t)
              w.call(t, c) &&
                !x.hasOwnProperty(c) &&
                (a[c] = void 0 === t[c] && void 0 !== l ? l[c] : t[c]);
          }
          var c = arguments.length - 2;
          if (1 === c) a.children = r;
          else if (1 < c) {
            l = Array(c);
            for (var u = 0; u < c; u++) l[u] = arguments[u + 2];
            a.children = l;
          }
          return { $$typeof: n, type: e.type, key: o, ref: i, props: a, _owner: s };
        }),
        (t.createContext = function (e) {
          return (
            ((e = {
              $$typeof: l,
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
        (t.createElement = E),
        (t.createFactory = function (e) {
          var t = E.bind(null, e);
          return (t.type = e), t;
        }),
        (t.createRef = function () {
          return { current: null };
        }),
        (t.forwardRef = function (e) {
          return { $$typeof: c, render: e };
        }),
        (t.isValidElement = N),
        (t.lazy = function (e) {
          return { $$typeof: p, _payload: { _status: -1, _result: e }, _init: I };
        }),
        (t.memo = function (e, t) {
          return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
        }),
        (t.startTransition = function (e) {
          var t = P.transition;
          P.transition = {};
          try {
            e();
          } finally {
            P.transition = t;
          }
        }),
        (t.unstable_act = function () {
          throw Error('act(...) is not supported in production builds of React.');
        }),
        (t.useCallback = function (e, t) {
          return R.current.useCallback(e, t);
        }),
        (t.useContext = function (e) {
          return R.current.useContext(e);
        }),
        (t.useDebugValue = function () {}),
        (t.useDeferredValue = function (e) {
          return R.current.useDeferredValue(e);
        }),
        (t.useEffect = function (e, t) {
          return R.current.useEffect(e, t);
        }),
        (t.useId = function () {
          return R.current.useId();
        }),
        (t.useImperativeHandle = function (e, t, n) {
          return R.current.useImperativeHandle(e, t, n);
        }),
        (t.useInsertionEffect = function (e, t) {
          return R.current.useInsertionEffect(e, t);
        }),
        (t.useLayoutEffect = function (e, t) {
          return R.current.useLayoutEffect(e, t);
        }),
        (t.useMemo = function (e, t) {
          return R.current.useMemo(e, t);
        }),
        (t.useReducer = function (e, t, n) {
          return R.current.useReducer(e, t, n);
        }),
        (t.useRef = function (e) {
          return R.current.useRef(e);
        }),
        (t.useState = function (e) {
          return R.current.useState(e);
        }),
        (t.useSyncExternalStore = function (e, t, n) {
          return R.current.useSyncExternalStore(e, t, n);
        }),
        (t.useTransition = function () {
          return R.current.useTransition();
        }),
        (t.version = '18.2.0');
    },
    50959: (e, t, n) => {
      'use strict';
      e.exports = n(695257);
    },
    792297: e => {
      e.exports = { loading: 'loading-BPaLXf0z' };
    },
    115747: e => {
      e.exports = {
        container: 'container-CD9TBN7D',
        withSuggestions: 'withSuggestions-CD9TBN7D',
        title: 'title-CD9TBN7D',
        autocomplete: 'autocomplete-CD9TBN7D',
        saveSymbol: 'saveSymbol-CD9TBN7D',
        saveInterval: 'saveInterval-CD9TBN7D',
        indicators: 'indicators-CD9TBN7D',
        hintLabel: 'hintLabel-CD9TBN7D',
        hintMark: 'hintMark-CD9TBN7D',
        hidden: 'hidden-CD9TBN7D',
      };
    },
    93264: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { StudyTemplateSaver: () => j });
      var r = n(650151),
        a = n(509806),
        o = n(50959),
        i = n(500962),
        s = (n(336379), n(497754)),
        l = n(302946),
        c = n(73007),
        u = n(72571),
        d = n(976669),
        p = n(630795),
        h = n(234404),
        m = n(792297);
      function f(e) {
        const { isLoading: t } = e;
        return o.createElement(
          'span',
          { className: t ? m.loading : void 0 },
          a.t(null, void 0, n(185520)),
          t && o.createElement(h.Loader, { color: 'white' }),
        );
      }
      class v extends o.PureComponent {
        constructor(e) {
          super(e),
            (this._dialogRef = o.createRef()),
            (this._manager = null),
            (this._handleSubmit = () => {
              this.setState({ isLoading: !0 }), this.props.onSubmit(this);
            }),
            (this.state = { isLoading: !1 });
        }
        render() {
          const { isOpened: e, saveDisabled: t, title: n, onClose: r } = this.props;
          return o.createElement(d.AdaptiveConfirmDialog, {
            ref: this._dialogRef,
            onClose: r,
            onSubmit: this._handleSubmit,
            onCancel: r,
            onClickOutside: r,
            isOpened: e,
            title: n,
            dataName: 'save-rename-dialog',
            render: this._renderDialogBody(),
            defaultActionOnClose: 'none',
            submitButtonText: o.createElement(f, { isLoading: this.state.isLoading }),
            submitButtonDisabled: t,
          });
        }
        focus() {
          (0, r.ensureNotNull)(this._dialogRef.current).focus();
        }
        manager() {
          return this._manager;
        }
        submit() {
          this.props.onSubmit(this);
        }
        close() {
          this.props.onClose();
        }
        dropLoading() {
          this.setState({ isLoading: !1 });
        }
        _renderDialogBody() {
          return () =>
            o.createElement(
              p.SlotContext.Consumer,
              null,
              e => ((this._manager = e), this.props.children),
            );
        }
      }
      var b = n(980458),
        g = n(785508),
        y = n(115747),
        _ = n(601227);
      const S = a.t(null, void 0, n(350912)),
        w = a.t(null, void 0, n(762764)),
        C = a.t(null, void 0, n(933455)),
        x = a.t(null, void 0, n(263135)),
        E = [y.hintMark, 'apply-common-tooltip'];
      function N(e) {
        const {
            title: t,
            saveSymbolHintText: n,
            saveIntervalHintText: a,
            indicatorsText: i,
            source: d,
            onClose: p,
            onSubmit: h,
          } = e,
          [m, f] = (0, o.useState)(''),
          [_, N] = (0, o.useState)(!1),
          [k, D] = (0, o.useState)(!1),
          [T, B] = (0, o.useState)(!1),
          I = (0, o.useRef)(null),
          R = (0, o.useRef)(null);
        return (
          (0, o.useEffect)(() => {
            (0, r.ensureNotNull)(R.current).focus();
          }, []),
          o.createElement(
            v,
            {
              ref: I,
              isOpened: !0,
              saveDisabled: !m,
              title: t,
              onClose: p,
              onSubmit: function (e) {
                h({ title: m, saveSymbol: _, saveInterval: k }, e);
              },
            },
            o.createElement(
              'div',
              { className: s(y.container, T && y.withSuggestions) },
              o.createElement('div', { className: y.title }, S),
              o.createElement(
                'div',
                {
                  className: y.autocomplete,
                },
                o.createElement(c.Autocomplete, {
                  maxLength: 64,
                  value: m,
                  onChange: f,
                  onBlur: function () {
                    (0, r.ensureNotNull)(I.current).focus();
                  },
                  source: d,
                  allowUserDefinedValues: !0,
                  preventOnFocusOpen: !0,
                  noEmptyText: !0,
                  preventSearchOnEmptyQuery: !0,
                  filter: b.autocompleteFilter,
                  setupHTMLInput: function (e) {
                    R.current = e;
                  },
                  onSuggestionsOpen: function () {
                    B(!0);
                  },
                  onSuggestionsClose: function () {
                    B(!1);
                  },
                }),
              ),
              o.createElement(
                'div',
                { className: y.saveSymbol },
                o.createElement(l.Checkbox, {
                  label: o.createElement(
                    'span',
                    { className: y.hintLabel },
                    C,
                    o.createElement(u.Icon, { icon: g, className: s(E), title: n }),
                  ),
                  onChange: function () {
                    N(!_), (0, r.ensureNotNull)(I.current).focus();
                  },
                  checked: _,
                }),
              ),
              o.createElement(
                'div',
                { className: y.saveInterval },
                o.createElement(l.Checkbox, {
                  label: o.createElement(
                    'span',
                    { className: y.hintLabel },
                    x,
                    o.createElement(u.Icon, { icon: g, className: s(E), title: a }),
                  ),
                  onChange: function () {
                    D(!k), (0, r.ensureNotNull)(I.current).focus();
                  },
                  checked: k,
                }),
              ),
              o.createElement('div', { className: y.title }, w),
              o.createElement('div', { className: s(y.indicators, T && y.withSuggestions) }, i),
            ),
          )
        );
      }
      _.CheckMobile.any() && E.push(y.hidden);
      var k = n(559410),
        D = n(206594);
      class T {
        constructor(e) {
          (this._container = document.createElement('div')),
            (this.close = () => {
              this.unmount(), this._onClose && this._onClose();
            }),
            (this.unmount = () => {
              k.unsubscribe(D.CLOSE_POPUPS_AND_DIALOGS_COMMAND, this.unmount, null),
                i.unmountComponentAtNode(this._container);
            }),
            (this._title = e.title),
            (this._saveSymbolHintText = e.saveSymbolHintText),
            (this._saveIntervalHintText = e.saveIntervalHintText),
            (this._indicatorsText = e.indicatorsText),
            (this._source = e.source),
            (this._onSubmit = e.onSubmit),
            (this._onClose = e.onClose),
            k.subscribe(D.CLOSE_POPUPS_AND_DIALOGS_COMMAND, this.unmount, null);
        }
        mount() {
          i.render(
            o.createElement(N, {
              title: this._title,
              saveSymbolHintText: this._saveSymbolHintText,
              saveIntervalHintText: this._saveIntervalHintText,
              indicatorsText: this._indicatorsText,
              source: this._source,
              onClose: this.close,
              onSubmit: this._onSubmit,
            }),
            this._container,
          );
        }
        destroy() {
          this.unmount();
        }
        show() {
          this.mount();
        }
      }
      var B = n(362830),
        I = n(153055),
        R = n(618861),
        P = n(557487);
      const O = a.t(null, void 0, n(921939)),
        L = a.t(null, void 0, n(161422)),
        M = a.t(null, void 0, n(630858)),
        A = a.t(null, void 0, n(83081));
      function z(e, t, n) {
        const r = () => {
          B.backend.invalidateStudyTemplatesList(), B.backend.getStudyTemplatesList().then(t);
        };
        B.backend.saveStudyTemplate(e).then(r);
      }
      class j {
        constructor(e) {
          (this._dialog = null),
            (this._onSave = e => {
              this._options.onSave(e), this._close();
            }),
            (this._showSaveDialog = async () => {
              const e = this._controller.model().mainSeries().symbol(),
                t = this._controller.model().mainSeries().interval(),
                n = await this._getActualTemplateList();
              await this._showTemplateSaveRenameDialog(n, e, t);
            }),
            (this._close = () => {
              this._dialog && (this._dialog.destroy(), (this._dialog = null));
            }),
            (this._options = e),
            (this._controller = e.controller);
        }
        show() {
          window.runOrSignIn(this._showSaveDialog, {
            source: 'Study templates save as',
            sourceMeta: 'Chart',
          });
        }
        _prepareData(e, t, n) {
          const r = this._controller.model().studyTemplate(t, n);
          return {
            name: e,
            content: JSON.stringify(r),
            meta_info: (0, P.createStudyTemplateMetaInfo)(this._controller, r.interval),
          };
        }
        _doSave(e, t, n) {
          const { title: r, saveSymbol: a, saveInterval: o } = t;
          if (!r) return;
          const i = n.manager() || void 0,
            s = this._prepareData(r, a, o);
          if (e.find(e => e.name === r)) {
            const e = e => {
              e ? z(s, this._onSave) : (n.focus(), n.dropLoading());
            };
            (function (e, t) {
              return new Promise(n =>
                (0, I.showConfirm)(
                  {
                    text: A.format({ templateName: e }),
                    onConfirm: ({ dialogClose: e }) => {
                      n(!0), e();
                    },
                    onClose: () => n(!1),
                  },
                  t,
                ),
              );
            })(r, i).then(e);
          } else {
            z(s, this._onSave);
          }
        }
        _getActualTemplateList() {
          return B.backend.invalidateStudyTemplatesList(), B.backend.getStudyTemplatesList();
        }
        _showTemplateSaveRenameDialog(e, t, n) {
          const r = (0, P.createStudyTemplateMetaInfo)(this._controller);
          (this._dialog = new T({
            source: e.map(e => e.name),
            title: O,
            saveSymbolHintText: L.format({ symbol: t }),
            saveIntervalHintText: M.format({ interval: (0, R.translatedIntervalString)(n) }),
            indicatorsText: (0, P.descriptionString)(r.indicators),
            onSubmit: (t, n) => this._doSave(e, t, n),
            onClose: this._close,
          })).show();
        }
      }
    },
    557487: (e, t, n) => {
      'use strict';
      n.d(t, { createStudyTemplateMetaInfo: () => o, descriptionString: () => i });
      var r = n(593194),
        a = n(562051);
      function o(e, t) {
        return {
          indicators: e
            .orderedDataSources(!0)
            .filter(e => (0, r.isStudy)(e) && !0)
            .map(e => ({
              id: e.metaInfo().id,
              description: e.title(a.TitleDisplayTarget.StatusLine, !0, void 0, !0),
            })),
          interval: t,
        };
      }
      function i(e) {
        const t = new Map();
        return (
          e.forEach(e => {
            const [n, r] = t.get(e.id) || [e.description, 0];
            t.set(e.id, [n, r + 1]);
          }),
          Array.from(t.values())
            .map(([e, t]) => `${e}${t > 1 ? ` x ${t}` : ''}`)
            .join(', ')
        );
      }
    },
    980458: (e, t, n) => {
      'use strict';
      function r(e, t) {
        return Boolean('' === e || (e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())));
      }
      n.d(t, { autocompleteFilter: () => r });
    },
    660538: (e, t, n) => {
      'use strict';
      n.d(t, { mediaQueryAddEventListener: () => r, mediaQueryRemoveEventListener: () => a });
      const r = (e, t) => {
          (null == e ? void 0 : e.addEventListener)
            ? e.addEventListener('change', t)
            : e.addListener(t);
        },
        a = (e, t) => {
          (null == e ? void 0 : e.removeEventListener)
            ? e.removeEventListener('change', t)
            : e.removeListener(t);
        };
    },
    465890: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9" width="11" height="9" fill="none"><path stroke-width="2" d="M0.999878 4L3.99988 7L9.99988 1"/></svg>';
    },
    100578: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path fill="currentColor" d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>';
    },
    507720: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17" fill="currentColor"><path d="m.58 1.42.82-.82 15 15-.82.82z"/><path d="m.58 15.58 15-15 .82.82-15 15z"/></svg>';
    },
    785508: e => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M8 8.5h1.5V14"/><circle fill="currentColor" cx="9" cy="5" r="1"/><path stroke="currentColor" d="M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"/></svg>';
    },
    620036: e => {
      e.exports = {
        ar: ['إلغاء'],
        ca_ES: ['Cancel·la'],
        cs: ['Zrušit'],
        de: ['Abbrechen'],
        el: ['Άκυρο'],
        en: 'Cancel',
        es: ['Cancelar'],
        fa: ['لغو'],
        fr: ['Annuler'],
        he_IL: ['ביטול'],
        hu_HU: ['Törlés'],
        id_ID: ['Batal'],
        it: ['Annulla'],
        ja: ['キャンセル'],
        ko: ['취소'],
        ms_MY: ['Batal'],
        nl_NL: ['Annuleren'],
        pl: ['Anuluj'],
        pt: ['Cancelar'],
        ro: 'Cancel',
        ru: ['Отмена'],
        sv: ['Avbryt'],
        th: ['ยกเลิก'],
        tr: ['İptal'],
        vi: ['Hủy bỏ'],
        zh: ['取消'],
        zh_TW: ['取消'],
      };
    },
    468988: e => {
      e.exports = {
        ar: ['موافق'],
        ca_ES: ['Acceptar'],
        cs: 'Ok',
        de: 'Ok',
        el: 'Ok',
        en: 'Ok',
        es: ['Aceptar'],
        fa: 'Ok',
        fr: ["D'accord"],
        he_IL: ['אוקיי'],
        hu_HU: ['Oké'],
        id_ID: 'Ok',
        it: 'Ok',
        ja: ['OK'],
        ko: ['확인'],
        ms_MY: 'Ok',
        nl_NL: 'Ok',
        pl: 'Ok',
        pt: 'Ok',
        ro: 'Ok',
        ru: ['Ок'],
        sv: ['OK'],
        th: ['ตกลง'],
        tr: ['Tamam'],
        vi: 'Ok',
        zh: ['确认'],
        zh_TW: ['確認'],
      };
    },
    921939: e => {
      e.exports = {
        ar: ['حفظ قالب المؤشر'],
        ca_ES: 'Save Indicator Template',
        cs: 'Save Indicator Template',
        de: ['Indikatorvorlage speichern'],
        el: 'Save Indicator Template',
        en: 'Save Indicator Template',
        es: ['Guardar plantilla de indicadores'],
        fa: 'Save Indicator Template',
        fr: ["Sauver le modèle d'indicateur"],
        he_IL: ['שמור תבנית אינדיקטור'],
        hu_HU: 'Save Indicator Template',
        id_ID: ['Simpan Template Indikator'],
        it: ['Salva modello indicatore'],
        ja: ['インジケーターテンプレートを保存'],
        ko: ['인디케이터 템플릿 세이브'],
        ms_MY: ['Simpan Templat Penunjuk'],
        nl_NL: 'Save Indicator Template',
        pl: ['Zapisz szablon wskaźnika'],
        pt: ['Salvar Conjunto de Indicadores'],
        ro: 'Save Indicator Template',
        ru: ['Сохранить шаблон индикаторов'],
        sv: ['Spara indikatormall'],
        th: ['บันทึกรูปแบบอินดิเคเตอร์'],
        tr: ['Gösterge Şablonu Kaydet'],
        vi: ['Lưu mẫu chỉ báo'],
        zh: ['保存指标模板'],
        zh_TW: ['儲存指標範本為'],
      };
    },
    762764: e => {
      e.exports = {
        ar: ['المؤشرات المحفوظة'],
        ca_ES: 'Saved indicators',
        cs: 'Saved indicators',
        de: ['Gespeicherte Indikatoren'],
        el: 'Saved indicators',
        en: 'Saved indicators',
        es: ['Indicadores guardados'],
        fa: 'Saved indicators',
        fr: ['Indicateurs sauvegardés'],
        he_IL: ['אינדיקטורים שמורים'],
        hu_HU: 'Saved indicators',
        id_ID: ['Indikator tersimpan'],
        it: ['Indicatori salvati'],
        ja: ['保存されたインジケーター'],
        ko: ['세이브된 인디케이터'],
        ms_MY: ['Petunjuk yang disimpan'],
        nl_NL: 'Saved indicators',
        pl: ['Zapisane wskaźniki'],
        pt: ['Indicadores salvos'],
        ro: 'Saved indicators',
        ru: ['Сохранённые индикаторы'],
        sv: ['Sparade indikatorer'],
        th: ['อินดิเคเตอร์ที่เซฟไว้'],
        tr: ['Kaydedilmiş göstergeler'],
        vi: ['Chỉ báo đã được lưu'],
        zh: ['已存指标'],
        zh_TW: ['已存指標'],
      };
    },
    630858: e => {
      e.exports = {
        ar: [
          'سيؤدي تحديد هذا الخيار إلى تعيين الفاصل الزمني‎{interval} ‎ على الرسم البياني عند تطبيق هذا القالب',
        ],
        ca_ES:
          'Selecting this option will set the {interval} interval on the chart when this template is applied',
        cs: 'Selecting this option will set the {interval} interval on the chart when this template is applied',
        de: [
          'Durch Auswahl dieser Option wird das {interval}-Intervall im Chart festgelegt, wenn diese Vorlage angewendet wird',
        ],
        el: 'Selecting this option will set the {interval} interval on the chart when this template is applied',
        en: 'Selecting this option will set the {interval} interval on the chart when this template is applied',
        es: [
          'Al seleccionar esta opción se establecerá el intervalo {interval} en el gráfico cuando se aplique esta plantilla',
        ],
        fa: 'Selecting this option will set the {interval} interval on the chart when this template is applied',
        fr: [
          "En sélectionnant cette option, l'intervalle {interval} sera placé sur le graphique lorsque ce modèle est appliqué",
        ],
        he_IL: ['בחירת אפשרות זו תגדיר את האינטרוול ‎{interval}‎ בגרף כאשר מיושמת תבנית זו'],
        hu_HU:
          'Selecting this option will set the {interval} interval on the chart when this template is applied',
        id_ID: [
          'Memilih opsi ini akan mengatur interval {interval} pada chart saat template ini diterapkan',
        ],
        it: [
          'Selezionando questa opzione, il modello viene applicato cambiando il timeframe in {interval}',
        ],
        ja: [
          'この項目を選択すると、テンプレートが適用された時にチャートの時間足が{interval}に設定されます',
        ],
        ko: ['이 옵션을 고르면 이 템플릿이 적용될 때 차트에 {interval} 을 세팅하게 됩니다.'],
        ms_MY: [
          'Memilih pilihan ini akan menetapkan selang masa {interval} pada carta apabila templat ini digunakan',
        ],
        nl_NL:
          'Selecting this option will set the {interval} interval on the chart when this template is applied',
        pl: [
          'Wybór tej opcji spowoduje ustawienie na wykresie interwału {interval} po zastosowaniu tego szablonu',
        ],
        pt: [
          'Selecionar esta opção definirá o intervalo {interval} no gráfico quando este modelo for aplicado',
        ],
        ro: 'Selecting this option will set the {interval} interval on the chart when this template is applied',
        ru: [
          'Включите, чтобы установить на графике интервал {interval}, когда этот шаблон применён',
        ],
        sv: [
          'Om du väljer detta alternativ ställer du in intervallet {interval} i diagrammet när den här mallen används',
        ],
        th: [
          'การเลือกตัวเลือกนี้จะเป็นการกำหนดช่วงเวลา {interval} บนชาร์ต เมื่อเทมเพลตนี้ถูกใช้งาน',
        ],
        tr: [
          'Bu seçeneğin belirlenmesi ile, bu taslak uygulandığında grafikte {interval} aralığı ayarlanır',
        ],
        vi: [
          'Chọn tùy chọn này sẽ đặt khoảng thời gian {interval} trên biểu đồ khi mẫu này được áp dụng',
        ],
        zh: ['套用此模板时，选择此选项将在图表上设置{interval}周期'],
        zh_TW: ['套用此模板時，選擇此選項將在圖表上設置{interval}周期'],
      };
    },
    161422: e => {
      e.exports = {
        ar: [
          'سيؤدي تحديد هذا الخيار إلى تعيين الرمز ‎{symbol}‎ على الرسم البياني عند تطبيق هذا القالب',
        ],
        ca_ES:
          'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        cs: 'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        de: [
          'Wenn Sie diese Option wählen, wird das {symbol}-Symbol auf dem Chart gesetzt, wenn diese Vorlage angewendet wird.',
        ],
        el: 'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        en: 'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        es: [
          'Al seleccionar esta opción se establecerá el símbolo {symbol} en el gráfico cuando se utilice esta plantilla',
        ],
        fa: 'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        fr: [
          'En sélectionnant cette option, le symbole {symbol} sera placé sur le graphique lorsque ce modèle est appliqué',
        ],
        he_IL: ['בחירת אפשרות זו תגדיר את הסימול ‎{symbol}‎ בגרף כאשר מיושמת תבנית זו'],
        hu_HU:
          'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        id_ID: [
          'Memilih opsi ini akan mengatur simbol {symbol} pada chart saat template ini diterapkan',
        ],
        it: [
          'Selezionando questa opzione, quando il modello viene applicato, viene inserito anche il simbolo {symbol}',
        ],
        ja: [
          'この項目を選択すると、テンプレートが適用された時にチャートのシンボルが{symbol}に設定されます',
        ],
        ko: ['이 옵션을 고르면 이 템플릿이 적용될 때 차트에 {symbol} 을 세팅하게 됩니다.'],
        ms_MY: [
          'Memilih pilihan ini akan menetapkan simbol {symbol} pada carta apabila templat ini digunakan',
        ],
        nl_NL:
          'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        pl: [
          'Wybór tej opcji spowoduje ustawienie na wykresie symbolu {symbol} po zastosowaniu tego szablonu',
        ],
        pt: [
          'Selecionar esta opção definirá o símbolo {symbol} no gráfico quando este modelo for aplicado',
        ],
        ro: 'Selecting this option will set the {symbol} symbol on the chart when this template is applied',
        ru: ['Включите, чтобы установить на графике символ {symbol}, когда этот шаблон применён'],
        sv: [
          'Om du väljer detta alternativ ställer du in symbolen {symbol} i diagrammet när den här mallen används',
        ],
        th: ['การเลือกตัวเลือกนี้จะเป็นการกำหนดตัวย่อ {symbol} บนชาร์ต เมื่อเทมเพลตนี้ถูกใช้งาน'],
        tr: [
          'Bu seçeneğin belirlenmesi ile, bu taslak uygulandığında grafikte {symbol} sembolü ayarlanacaktır.',
        ],
        vi: [
          'Chọn lựa chọn này sẽ đặt mã giao dịch {symbol} trên biểu đồ khi mẫu hình được áp dụng',
        ],
        zh: ['套用此模板时，选择此选项将在图表上设置{symbol}商品'],
        zh_TW: ['套用此模板時，選擇此選項將在圖表上設置{symbol}商品'],
      };
    },
    83081: e => {
      e.exports = {
        ar: ['نموذج الدراسة "‎{templateName}‎" موجود بالفعل، هل تريد حقًا استبداله؟'],
        ca_ES: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        cs: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        de: [
          "Studienvorlage '{templateName}' existiert bereits. Möchten Sie diese wirklich ersetzen?",
        ],
        el: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        en: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        es: [
          "La plantilla de estudio '{templateName}' ya existe. ¿Está seguro de que quiere reemplazarla?",
        ],
        fa: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        fr: ["Le Modèle d'Etude '{templateName}' existe déjà. Voulez-vous vraiment le remplacer ?"],
        he_IL: ['תבנית המחקר ‎{templateName}‎ קיימת כבר. האם אתה באמת רוצה להחליף אותה?'],
        hu_HU: ['{templateName} névvel már létezik tanulmánysablon. Biztos, hogy cserélni akarod?'],
        id_ID: ["Template Studi '{templateName}' sudah ada. Apakah anda ingin menggantinya?"],
        it: ["Il Modello di studio '{templateName}' esiste già. Sostituirlo?"],
        ja: ['テンプレート {templateName} は既に存在します。本当に上書きしますか？'],
        ko: ["같은 이름의 스터디 템플릿 '{templateName}' 가 이미 있습니다. 정말로 바꾸시겠습니까?"],
        ms_MY: [
          "Templat Kajian '{templateName}' sudah ada. Adakah anda benar-benar mahu menggantikannya?",
        ],
        nl_NL: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        pl: ["Szablon analizy '{templateName}' już istnieje. Naprawdę chcesz go zastąpić?"],
        pt: ["O modelo de estudo '{templateName}' já existe. Deseja substituí-lo?"],
        ro: "Study Template '{templateName}' already exists. Do you really want to replace it?",
        ru: [
          "Шаблон индикаторов '{templateName}' уже существует. Вы действительно хотите заменить его?",
        ],
        sv: ["Studiemall '{templateName}' finns redan. Vill du verkligen ersätta den?"],
        th: ["เทมเพลตการศึกษา '{templateName}' มีอยู่แล้ว คุณต้องการที่จะแทนที่มันใช่หรือไม่?"],
        tr: ["'{templateName}' Çalışma Şablonu zaten var.Yenisiyle değiştirmek mi istiyorsunuz?"],
        vi: ["Mẫu Nghiên cứu '{templateName}' đã tồn tại. Bạn có thực sự muốn thay thế nó?"],
        zh: ['指标模板{templateName}已经存在。确定替换？'],
        zh_TW: ["研究模板'{templateName}'已經存在，確定替換？"],
      };
    },
    263135: e => {
      e.exports = {
        ar: ['تذكر الفاصل الزمني'],
        ca_ES: 'Remember Interval',
        cs: 'Remember Interval',
        de: ['Interval merken'],
        el: 'Remember Interval',
        en: 'Remember Interval',
        es: ['Recordar intervalo'],
        fa: 'Remember Interval',
        fr: ["Se souvenir de l'intervalle"],
        he_IL: ['זכור אינטרוול'],
        hu_HU: 'Remember Interval',
        id_ID: ['Ingat Interval'],
        it: ['Ricorda timeframe'],
        ja: ['時間足を記憶'],
        ko: ['인터벌 기억하기'],
        ms_MY: ['Ingat Selang Masa'],
        nl_NL: 'Remember Interval',
        pl: ['Zapamiętaj interwał'],
        pt: ['Lembrar do Intervalo'],
        ro: 'Remember Interval',
        ru: ['Запомнить интервал'],
        sv: ['Kom ihåg intervall'],
        th: ['จำช่วงเวลา'],
        tr: ['Aralığı Hatırla'],
        vi: ['Nhớ Khoảng thời gian'],
        zh: ['记住周期'],
        zh_TW: ['記住周期'],
      };
    },
    933455: e => {
      e.exports = {
        ar: ['تذكر الرمز'],
        ca_ES: 'Remember Symbol',
        cs: 'Remember Symbol',
        de: ['Symbol merken'],
        el: 'Remember Symbol',
        en: 'Remember Symbol',
        es: ['Recordar símbolo'],
        fa: 'Remember Symbol',
        fr: ['Se souvenir du symbole'],
        he_IL: ['זכור את הסימול'],
        hu_HU: 'Remember Symbol',
        id_ID: ['Ingat Simbol'],
        it: ['Ricorda simbolo'],
        ja: ['シンボルを記憶'],
        ko: ['심볼 기억하기'],
        ms_MY: ['Ingat Simbol'],
        nl_NL: 'Remember Symbol',
        pl: ['Zapamiętaj symbol'],
        pt: ['Lembrar do Símbolo'],
        ro: 'Remember Symbol',
        ru: ['Запомнить инструмент'],
        sv: ['Kom ihåg symbol'],
        th: ['จำตัวย่อ'],
        tr: ['Sembolü Hatırla'],
        vi: ['Nhớ Mã giao dịch'],
        zh: ['记住商品'],
        zh_TW: ['記住商品'],
      };
    },
    350912: e => {
      e.exports = {
        ar: ['أسم القالب'],
        ca_ES: ['Nom de la plantilla'],
        cs: 'Template name',
        de: ['Name der Vorlage'],
        el: 'Template name',
        en: 'Template name',
        es: ['Nombre de la plantilla'],
        fa: 'Template name',
        fr: ['Nom du modèle'],
        he_IL: ['שם תבנית'],
        hu_HU: ['Sablon neve'],
        id_ID: ['Nama template'],
        it: ['Nome modello'],
        ja: ['テンプレート名'],
        ko: ['템플릿이름'],
        ms_MY: ['Nama templat'],
        nl_NL: 'Template name',
        pl: ['Nazwa Szablonu'],
        pt: ['Nome do modelo'],
        ro: 'Template name',
        ru: ['Имя шаблона'],
        sv: ['Mallnamn'],
        th: ['ชื่อเทมเพลต'],
        tr: ['Şablon adı'],
        vi: ['Tên Mẫu'],
        zh: ['模板名称'],
        zh_TW: ['範本名稱'],
      };
    },
  },
]);
