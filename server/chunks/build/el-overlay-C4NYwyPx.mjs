import { defineComponent, renderSlot, createBlock, openBlock, Teleport as Teleport$1, ref, provide, watch, unref, createVNode, h, inject, computed, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, toDisplayString, withCtx, resolveDynamicComponent, useSlots, Transition, mergeProps, withDirectives, createSlots, vShow, getCurrentInstance, nextTick, isRef, onScopeDispose } from 'vue';
import { NOOP, isObject, isArray, isFunction } from '@vue/shared';
import { w as withInstall, b as buildProps, f as definePropType, _ as _export_sfc, Z as PatchFlags, G as iconPropType, u as useLocale, c as ElIcon, $ as CloseComponents, J as useDeprecated, U as UPDATE_MODEL_EVENT, t as useGlobalConfig, K as addUnit, N as hasClass, D as addClass, a0 as getStyle } from './el-button-DUkK2qXZ.mjs';
import { u as useNamespace, b as isBoolean, j as useZIndex, f as useId, k as defaultNamespace, t as throwError } from './server.mjs';
import { isNil } from 'lodash-unified';
import { isClient, useTimeoutFn } from '@vueuse/core';

const useSameTarget = (handleClick) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return { onClick, onMousedown, onMouseup };
};
const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: Boolean,
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
});
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const BLOCK = "overlay";
var Overlay = defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? void 0 : onMaskClick
    );
    return () => {
      return props.mask ? createVNode(
        "div",
        {
          class: [ns.b(), props.overlayClass],
          style: {
            zIndex: props.zIndex
          },
          onClick,
          onMousedown,
          onMouseup
        },
        [renderSlot(slots, "default")],
        PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
        ["onClick", "onMouseup", "onMousedown"]
      ) : h(
        "div",
        {
          class: props.overlayClass,
          style: {
            zIndex: props.zIndex,
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        },
        [renderSlot(slots, "default")]
      );
    };
  }
});
const ElOverlay = Overlay;
const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
const FOCUSOUT_PREVENTED_OPTS = {
  cancelable: true,
  bubbles: false
};
const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
const FOCUS_TRAP_INJECTION_KEY = /* @__PURE__ */ Symbol("elFocusTrap");
const isHTMLElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") {
    return false;
  }
  switch (element.nodeName) {
    case "A": {
      return !!element.href && element.rel !== "ignore";
    }
    case "INPUT": {
      return !(element.type === "hidden" || element.type === "file");
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA": {
      return true;
    }
    default: {
      return false;
    }
  }
};
const focusElement = (el, options) => {
  if (!el || !el.focus)
    return;
  let cleanup = false;
  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
    cleanup = true;
  }
  el.focus(options);
  if (isHTMLElement(el) && cleanup) {
    el.removeAttribute("tabindex");
  }
};
const focusReason = ref();
const lastUserFocusTimestamp = ref(0);
const lastAutomatedFocusTimestamp = ref(0);
const obtainAllFocusableElements = (element) => {
  const nodes = [];
  const walker = (void 0).createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === (void 0).activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
};
const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container))
      return element;
  }
};
const isHidden = (element, container) => {
  if (getComputedStyle(element).visibility === "hidden")
    return true;
  while (element) {
    if (container && element === container)
      return false;
    if (getComputedStyle(element).display === "none")
      return true;
    element = element.parentElement;
  }
  return false;
};
const getEdges = (container) => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last = getVisibleElement(focusable.reverse(), container);
  return [first, last];
};
const isSelectable = (element) => {
  return element instanceof HTMLInputElement && "select" in element;
};
const tryFocus = (element, shouldSelect) => {
  if (element) {
    const prevFocusedElement = (void 0).activeElement;
    focusElement(element, { preventScroll: true });
    lastAutomatedFocusTimestamp.value = (void 0).performance.now();
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};
const useFocusReason = () => {
  return {
    focusReason,
    lastUserFocusTimestamp,
    lastAutomatedFocusTimestamp
  };
};
const createFocusOutPreventedEvent = (detail) => {
  return new CustomEvent(FOCUSOUT_PREVENTED, {
    ...FOCUSOUT_PREVENTED_OPTS,
    detail
  });
};
const isFirefox = () => isClient && /firefox/i.test((void 0).navigator.userAgent);
const isAndroid = () => isClient && /android/i.test((void 0).navigator.userAgent);
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler == null ? void 0 : oursHandler(event);
    }
  };
  return handleEvent;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified")
    return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(EVENT_CODE).includes(key))
      return key;
    switch (key) {
      case " ":
        return EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};
const _sfc_main$3 = defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: false,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(props, { emit }) {
    const forwardRef = ref();
    let lastFocusAfterTrapped;
    const { focusReason: focusReason2 } = useFocusReason();
    const onKeydown = (e) => {
      if (!props.loop && !props.trapped)
        return;
      const { altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = props;
      const code = getEventCode(e);
      const isTabbing = code === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
      const currentFocusingEl = (void 0).activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget;
        const [first, last] = getEdges(container);
        const isTabbable = first && last;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
            }
          } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(last, true);
            }
          }
        }
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef,
      onKeydown
    });
    watch(
      () => props.focusTrapEl,
      (focusTrapEl) => {
        if (focusTrapEl) {
          forwardRef.value = focusTrapEl;
        }
      },
      { immediate: true }
    );
    watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
      if (forwardRef2) {
        forwardRef2.addEventListener("keydown", onKeydown);
        forwardRef2.addEventListener("focusin", onFocusIn);
        forwardRef2.addEventListener("focusout", onFocusOut);
      }
      if (oldForwardRef) {
        oldForwardRef.removeEventListener("keydown", onKeydown);
        oldForwardRef.removeEventListener("focusin", onFocusIn);
        oldForwardRef.removeEventListener("focusout", onFocusOut);
      }
    });
    const onFocusIn = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!props.trapped) {
        relatedTarget && trapContainer.contains(relatedTarget);
      }
      if (isFocusedInTrap)
        emit("focusin", e);
      if (props.trapped) {
        if (isFocusedInTrap) {
          lastFocusAfterTrapped = target;
        } else {
          tryFocus(lastFocusAfterTrapped, true);
        }
      }
    };
    const onFocusOut = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      if (props.trapped) {
        const relatedTarget = e.relatedTarget;
        if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
          setTimeout(() => {
            if (props.trapped) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          }, 0);
        }
      } else {
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!isFocusedInTrap)
          emit("focusout", e);
      }
    };
    return {
      onKeydown
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const teleportProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    required: true
  },
  disabled: Boolean
});
const _sfc_main$2 = defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport$1, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});
var Teleport = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/teleport/src/teleport.vue"]]);
const ElTeleport = withInstall(Teleport);
const dialogInjectionKey = /* @__PURE__ */ Symbol("dialogInjectionKey");
const DEFAULT_DIALOG_TRANSITION = "dialog-fade";
const dialogContentProps = buildProps({
  center: Boolean,
  alignCenter: {
    type: Boolean,
    default: void 0
  },
  closeIcon: {
    type: iconPropType
  },
  draggable: {
    type: Boolean,
    default: void 0
  },
  overflow: {
    type: Boolean,
    default: void 0
  },
  fullscreen: Boolean,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogContentEmits = {
  close: () => true
};
const useDraggable = (targetRef, dragRef, draggable, overflow) => {
  const transform = {
    offsetX: 0,
    offsetY: 0
  };
  const isDragging = ref(false);
  const adjustPosition = (moveX, moveY) => {
    if (targetRef.value) {
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const clientWidth = (void 0).documentElement.clientWidth;
      const clientHeight = (void 0).documentElement.clientHeight;
      const minLeft = -targetLeft + offsetX;
      const minTop = -targetTop + offsetY;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop = clientHeight - targetTop - (targetHeight < clientHeight ? targetHeight : 0) + offsetY;
      if (!(overflow == null ? void 0 : overflow.value)) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
        moveY = Math.min(Math.max(moveY, minTop), maxTop);
      }
      transform.offsetX = moveX;
      transform.offsetY = moveY;
      targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(
        moveY
      )})`;
    }
  };
  const resetPosition = () => {
    transform.offsetX = 0;
    transform.offsetY = 0;
    if (targetRef.value) {
      targetRef.value.style.transform = "";
    }
  };
  const updatePosition = () => {
    const { offsetX, offsetY } = transform;
    adjustPosition(offsetX, offsetY);
  };
  return {
    isDragging,
    resetPosition,
    updatePosition
  };
};
const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref2) => {
      ref2.value = el;
    });
  };
};
const _hoisted_1$1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
const _sfc_main$1 = defineComponent({
  ...{ name: "ElDialogContent" },
  __name: "dialog-content",
  props: dialogContentProps,
  emits: dialogContentEmits,
  setup(__props, { expose: __expose }) {
    const { t } = useLocale();
    const { Close } = CloseComponents;
    const props = __props;
    const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
    const draggable = computed(() => !!props.draggable);
    const overflow = computed(() => !!props.overflow);
    const { resetPosition, updatePosition, isDragging } = useDraggable(
      dialogRef,
      headerRef,
      draggable,
      overflow
    );
    const dialogKls = computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", draggable.value),
      ns.is("dragging", isDragging.value),
      ns.is("align-center", !!props.alignCenter),
      { [ns.m("center")]: props.center }
    ]);
    __expose({
      resetPosition,
      updatePosition
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref: unref(composedDialogRef),
          class: normalizeClass(dialogKls.value),
          style: normalizeStyle(unref(style)),
          tabindex: "-1"
        },
        [
          createElementVNode(
            "header",
            {
              ref_key: "headerRef",
              ref: headerRef,
              class: normalizeClass([unref(ns).e("header"), _ctx.headerClass, { "show-close": _ctx.showClose }])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createElementVNode("span", {
                  role: "heading",
                  "aria-level": _ctx.ariaLevel,
                  class: normalizeClass(unref(ns).e("title"))
                }, toDisplayString(_ctx.title), 11, _hoisted_1$1)
              ]),
              _ctx.showClose ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.dialog.close"),
                class: normalizeClass(unref(ns).e("headerbtn")),
                type: "button",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
              }, [
                createVNode(unref(ElIcon), {
                  class: normalizeClass(unref(ns).e("close"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon || unref(Close))))
                  ]),
                  _: 1
                }, 8, ["class"])
              ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
            ],
            2
          ),
          createElementVNode("div", {
            id: unref(bodyId),
            class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3),
          _ctx.$slots.footer ? (openBlock(), createElementBlock(
            "footer",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        6
      );
    };
  }
});
var ElDialogContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);
const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: Boolean,
  appendTo: {
    type: teleportProps.to.type,
    default: "body"
  },
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  modalPenetrable: Boolean,
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: Boolean,
  headerAriaLevel: {
    type: String,
    default: "2"
  },
  transition: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
let scrollBarWidth;
const getScrollBarWidth = (namespace) => {
  var _a;
  if (!isClient)
    return 0;
  if (scrollBarWidth !== void 0)
    return scrollBarWidth;
  const outer = (void 0).createElement("div");
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  (void 0).body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = (void 0).createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  (_a = outer.parentNode) == null ? void 0 : _a.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};
const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) {
    throwError(
      "[useLockscreen]",
      "You need to pass a ref param to this function"
    );
  }
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = computed(() => ns.bm("parent", "hidden"));
  let scrollBarWidth2 = 0;
  let withoutHiddenClass = false;
  const cleanup = () => {
    setTimeout(() => {
      return;
    }, 200);
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !hasClass((void 0).body, hiddenCls.value);
    if (withoutHiddenClass) {
      (void 0).body.style.width;
      addClass((void 0).body, hiddenCls.value);
    }
    scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = (void 0).documentElement.clientHeight < (void 0).body.scrollHeight;
    const bodyOverflowY = getStyle((void 0).body, "overflowY");
    if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      (void 0).body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
    }
  });
  onScopeDispose(() => cleanup());
};
const useDialog = (props, targetRef) => {
  var _a;
  const instance = getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
  const closing = ref(false);
  let openTimer = void 0;
  let closeTimer = void 0;
  const config = useGlobalConfig();
  const namespace = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.namespace) != null ? _b : defaultNamespace;
  });
  const globalConfig = computed(() => {
    var _a2;
    return (_a2 = config.value) == null ? void 0 : _a2.dialog;
  });
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      const width = addUnit(props.width);
      if (width) {
        style2[`${varPrefix}-width`] = width;
      }
    }
    return style2;
  });
  const _draggable = computed(
    () => {
      var _a2, _b, _c;
      return ((_c = (_b = props.draggable) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.draggable) != null ? _c : false) && !props.fullscreen;
    }
  );
  const _alignCenter = computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.alignCenter) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.alignCenter) != null ? _c : false;
    }
  );
  const _overflow = computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.overflow) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.overflow) != null ? _c : false;
    }
  );
  const overlayDialogStyle = computed(() => {
    if (_alignCenter.value) {
      return { display: "flex" };
    }
    return {};
  });
  const transitionConfig = computed(() => {
    var _a2, _b, _c;
    const transition = (_c = (_b = props.transition) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.transition) != null ? _c : DEFAULT_DIALOG_TRANSITION;
    const baseConfig = {
      name: transition,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave,
      onAfterLeave: afterLeave
    };
    if (isObject(transition)) {
      const config2 = { ...transition };
      const _mergeHook = (userHook, defaultHook) => {
        return (el) => {
          if (isArray(userHook)) {
            userHook.forEach((fn) => {
              if (isFunction(fn))
                fn(el);
            });
          } else if (isFunction(userHook)) {
            userHook(el);
          }
          defaultHook();
        };
      };
      config2.onAfterEnter = _mergeHook(config2.onAfterEnter, afterEnter);
      config2.onBeforeLeave = _mergeHook(config2.onBeforeLeave, beforeLeave);
      config2.onAfterLeave = _mergeHook(config2.onAfterLeave, afterLeave);
      if (!config2.name) {
        config2.name = DEFAULT_DIALOG_TRANSITION;
      }
      return config2;
    }
    return baseConfig;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
    closing.value = false;
  }
  function beforeLeave() {
    closing.value = true;
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel)
        return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (!isClient)
      return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  watch(
    () => props.zIndex,
    () => {
      var _a2;
      zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
    }
  );
  watch(
    () => props.modelValue,
    (val) => {
      var _a2;
      if (val) {
        closed.value = false;
        open();
        rendered.value = true;
        zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
        nextTick(() => {
          emit("open");
          if (targetRef.value) {
            targetRef.value.parentElement.scrollTop = 0;
            targetRef.value.parentElement.scrollLeft = 0;
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    }
  );
  watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.value)
        return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    }
  );
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
    transitionConfig,
    _draggable,
    _alignCenter,
    _overflow,
    closing
  };
};
const _hoisted_1 = ["aria-label", "aria-labelledby", "aria-describedby"];
const _sfc_main = defineComponent({
  ...{
    name: "ElDialog",
    inheritAttrs: false
  },
  __name: "dialog",
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated(
      {
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      },
      computed(() => !!slots.title)
    );
    const ns = useNamespace("dialog");
    const dialogRef = ref();
    const headerRef = ref();
    const dialogContentRef = ref();
    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      transitionConfig,
      zIndex,
      _draggable,
      _alignCenter,
      _overflow,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      closing
    } = useDialog(props, dialogRef);
    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = useSameTarget(onModalClick);
    const penetrable = computed(
      () => props.modalPenetrable && !props.modal && !props.fullscreen
    );
    const resetPosition = () => {
      var _a;
      (_a = dialogContentRef.value) == null ? void 0 : _a.resetPosition();
    };
    __expose({
      visible,
      dialogContentRef,
      resetPosition,
      handleClose
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        to: _ctx.appendTo,
        disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
      }, {
        default: withCtx(() => [
          createVNode(
            Transition,
            mergeProps(unref(transitionConfig), { persisted: "" }),
            {
              default: withCtx(() => {
                var _a;
                return [
                  withDirectives(createVNode(unref(ElOverlay), {
                    "custom-mask-event": "",
                    mask: _ctx.modal,
                    "overlay-class": [
                      (_a = _ctx.modalClass) != null ? _a : "",
                      `${unref(ns).namespace.value}-modal-dialog`,
                      unref(ns).is("penetrable", penetrable.value)
                    ],
                    "z-index": unref(zIndex)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": _ctx.title || void 0,
                        "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                        "aria-describedby": unref(bodyId),
                        class: normalizeClass([
                          `${unref(ns).namespace.value}-overlay-dialog`,
                          unref(ns).is("closing", unref(closing))
                        ]),
                        style: normalizeStyle(unref(overlayDialogStyle)),
                        onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
                        onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
                        onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
                      }, [
                        createVNode(unref(ElFocusTrap), {
                          loop: "",
                          trapped: unref(visible),
                          "focus-start-el": "container",
                          onFocusAfterTrapped: unref(onOpenAutoFocus),
                          onFocusAfterReleased: unref(onCloseAutoFocus),
                          onFocusoutPrevented: unref(onFocusoutPrevented),
                          onReleaseRequested: unref(onCloseRequested)
                        }, {
                          default: withCtx(() => [
                            unref(rendered) ? (openBlock(), createBlock(ElDialogContent, mergeProps({
                              key: 0,
                              ref_key: "dialogContentRef",
                              ref: dialogContentRef
                            }, _ctx.$attrs, {
                              center: _ctx.center,
                              "align-center": unref(_alignCenter),
                              "close-icon": _ctx.closeIcon,
                              draggable: unref(_draggable),
                              overflow: unref(_overflow),
                              fullscreen: _ctx.fullscreen,
                              "header-class": _ctx.headerClass,
                              "body-class": _ctx.bodyClass,
                              "footer-class": _ctx.footerClass,
                              "show-close": _ctx.showClose,
                              title: _ctx.title,
                              "aria-level": _ctx.headerAriaLevel,
                              onClose: unref(handleClose)
                            }), createSlots({
                              header: withCtx(() => [
                                !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                                  key: 0,
                                  close: unref(handleClose),
                                  titleId: unref(titleId),
                                  titleClass: unref(ns).e("title")
                                }) : renderSlot(_ctx.$slots, "title", { key: 1 })
                              ]),
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "default")
                              ]),
                              _: 2
                            }, [
                              _ctx.$slots.footer ? {
                                name: "footer",
                                fn: withCtx(() => [
                                  renderSlot(_ctx.$slots, "footer")
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "header-class", "body-class", "footer-class", "show-close", "title", "aria-level", "onClose"])) : createCommentVNode("v-if", true)
                          ]),
                          _: 3
                        }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                      ], 46, _hoisted_1)
                    ]),
                    _: 3
                  }, 8, ["mask", "overlay-class", "z-index"]), [
                    [vShow, unref(visible)]
                  ])
                ];
              }),
              _: 3
            },
            16
          )
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);
const ElDialog = withInstall(Dialog);

export { ElDialog as E, isFirefox as a, EVENT_CODE as b, composeEventHandlers as c, ElTeleport as d, ElFocusTrap as e, focusElement as f, getEventCode as g, isFocusable as i, teleportProps as t };
//# sourceMappingURL=el-overlay-C4NYwyPx.mjs.map
