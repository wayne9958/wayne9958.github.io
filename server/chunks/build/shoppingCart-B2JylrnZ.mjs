import { E as ElDialog, i as isFocusable, a as isFirefox, t as teleportProps, g as getEventCode, b as EVENT_CODE, c as composeEventHandlers, d as ElTeleport, f as focusElement, e as ElFocusTrap } from './el-overlay-C4NYwyPx.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, h, getCurrentInstance, watchEffect, resolveComponent, resolveDirective, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, withDirectives, createCommentVNode, renderSlot, vShow, provide, unref, useAttrs as useAttrs$1, useSlots, shallowRef, watch, nextTick, toRef, resolveDynamicComponent, withModifiers, Comment, inject, reactive, isRef, toRefs, vModelCheckbox, isVNode, toRaw, render, readonly, Transition, cloneVNode, Text, shallowReactive, useSSRContext } from 'vue';
import { debounce, isNil, isNull, fromPairs, pick, isEqual, omit, merge, castArray as castArray$1, flatMap, get, isUndefined as isUndefined$1 } from 'lodash-unified';
import { useResizeObserver, isClient, useEventListener, tryOnScopeDispose, computedEager, onClickOutside, unrefElement, useTimeoutFn } from '@vueuse/core';
import { w as withInstall, a as withNoopInstall, E as ElButton, _ as _export_sfc$1, r as withInstallFunction, s as useSizeProp, u as useLocale, b as buildProps, t as useGlobalConfig, v as useFormSize, h as useFormDisabled, x as useFormItem, y as useFormItemInputId, V as ValidateComponentsMap, A as view_default, B as hide_default, c as ElIcon, D as addClass, F as removeClass, f as definePropType, U as UPDATE_MODEL_EVENT, m as mutable, G as iconPropType, q as circle_close_default, C as CHANGE_EVENT, I as INPUT_EVENT, H as getProp, e as arrow_right_default, J as useDeprecated, K as addUnit, L as arrow_up_default, M as arrow_down_default, N as hasClass, O as formContextKey, P as buildProp, Q as formItemContextKey, R as loading_default, S as useEmptyValuesProps, T as provideGlobalConfig, W as useGlobalComponentSettings, X as TypeComponentsMap, Y as TypeComponents } from './el-button-DUkK2qXZ.mjs';
import { _ as _export_sfc, u as useNamespace, d as debugWarn, a as isUndefined, i as isNumber, b as isBoolean, c as isPropAbsent, e as isElement, t as throwError, f as useId, g as useGetDerivedNamespace, h as useIdInjection, j as useZIndex } from './server.mjs';
import { isArray, isString, NOOP, hasOwn, isObject, isFunction } from '@vue/shared';
import { placements, createPopper } from '@popperjs/core';
import normalizeWheel from 'normalize-wheel-es';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import '@ctrl/tinycolor';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'vue-router';

const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const GAP = 4;
const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};
const renderThumbStyle = ({
  move,
  size,
  bar
}) => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`
});
const scrollbarContextKey = /* @__PURE__ */ Symbol(
  "scrollbarContextKey"
);
const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});
const COMPONENT_NAME$2 = "Thumb";
const _sfc_main$k = defineComponent({
  __name: "thumb",
  props: thumbProps,
  setup(__props) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const ns = useNamespace("scrollbar");
    if (!scrollbar)
      throwError(COMPONENT_NAME$2, "can not inject scrollbar context");
    const instance = ref();
    const thumb = ref();
    const thumbState = ref({});
    const visible = ref(false);
    let cursorDown = false;
    let cursorLeave = false;
    let baseScrollHeight = 0;
    let baseScrollWidth = 0;
    let originalOnSelectStart = isClient ? (void 0).onselectstart : null;
    const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const thumbStyle = computed(
      () => renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    );
    const offsetRatio = computed(
      () => instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]
    );
    const clickThumbHandler = (e) => {
      var _a;
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button))
        return;
      (_a = (void 0).getSelection()) == null ? void 0 : _a.removeAllRanges();
      startDrag(e);
      const el = e.currentTarget;
      if (!el)
        return;
      thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };
    const clickTrackHandler = (e) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement)
        return;
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      baseScrollHeight = scrollbar.wrapElement.scrollHeight;
      baseScrollWidth = scrollbar.wrapElement.scrollWidth;
      (void 0).addEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).addEventListener("mouseup", mouseUpDocumentHandler);
      originalOnSelectStart = (void 0).onselectstart;
      (void 0).onselectstart = () => false;
    };
    const mouseMoveDocumentHandler = (e) => {
      if (!instance.value || !thumb.value)
        return;
      if (cursorDown === false)
        return;
      const prevPage = thumbState.value[bar.value.axis];
      if (!prevPage)
        return;
      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      if (bar.value.scroll === "scrollLeft") {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollWidth / 100;
      } else {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollHeight / 100;
      }
    };
    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      thumbState.value[bar.value.axis] = 0;
      (void 0).removeEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).removeEventListener("mouseup", mouseUpDocumentHandler);
      restoreOnselectstart();
      if (cursorLeave)
        visible.value = false;
    };
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = !!props.size;
    };
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };
    const restoreOnselectstart = () => {
      if ((void 0).onselectstart !== originalOnSelectStart)
        (void 0).onselectstart = originalOnSelectStart;
    };
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mousemove",
      mouseMoveScrollbarHandler
    );
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mouseleave",
      mouseLeaveScrollbarHandler
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              ref_key: "instance",
              ref: instance,
              class: normalizeClass([unref(ns).e("bar"), unref(ns).is(bar.value.key)]),
              onMousedown: clickTrackHandler,
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              createElementVNode(
                "div",
                {
                  ref_key: "thumb",
                  ref: thumb,
                  class: normalizeClass(unref(ns).e("thumb")),
                  style: normalizeStyle(thumbStyle.value),
                  onMousedown: clickThumbHandler
                },
                null,
                38
              )
            ],
            34
          ), [
            [vShow, _ctx.always || visible.value]
          ])
        ]),
        _: 1
      }, 8, ["name"]);
    };
  }
});
var Thumb = /* @__PURE__ */ _export_sfc$1(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const barProps = buildProps({
  always: {
    type: Boolean,
    default: true
  },
  minSize: {
    type: Number,
    required: true
  }
});
const _sfc_main$j = defineComponent({
  __name: "bar",
  props: barProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const moveX = ref(0);
    const moveY = ref(0);
    const sizeWidth = ref("");
    const sizeHeight = ref("");
    const ratioY = ref(1);
    const ratioX = ref(1);
    const handleScroll = (wrap) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP;
        const offsetWidth = wrap.offsetWidth - GAP;
        moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
        moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
      }
    };
    const update = () => {
      const wrap = scrollbar == null ? void 0 : scrollbar.wrapElement;
      if (!wrap)
        return;
      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;
      const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
    };
    __expose({
      handleScroll,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createVNode(Thumb, {
            move: moveX.value,
            ratio: ratioX.value,
            size: sizeWidth.value,
            always: _ctx.always
          }, null, 8, ["move", "ratio", "size", "always"]),
          createVNode(Thumb, {
            move: moveY.value,
            ratio: ratioY.value,
            size: sizeHeight.value,
            vertical: "",
            always: _ctx.always
          }, null, 8, ["move", "ratio", "size", "always"])
        ],
        64
      );
    };
  }
});
var Bar = /* @__PURE__ */ _export_sfc$1(_sfc_main$j, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const ariaProps = buildProps({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};
const scrollbarProps = buildProps({
  distance: {
    type: Number,
    default: 0
  },
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: Boolean,
  wrapStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  },
  tabindex: {
    type: [String, Number],
    default: void 0
  },
  id: String,
  role: String,
  ...useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
  "end-reached": (direction) => ["left", "right", "top", "bottom"].includes(direction),
  scroll: ({
    scrollTop,
    scrollLeft
  }) => [scrollTop, scrollLeft].every(isNumber)
};
const _hoisted_1$8 = ["tabindex"];
const COMPONENT_NAME$1 = "ElScrollbar";
const _sfc_main$i = defineComponent({
  ...{
    name: COMPONENT_NAME$1
  },
  __name: "scrollbar",
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("scrollbar");
    let stopResizeObserver = void 0;
    let stopWrapResizeObserver = void 0;
    let stopResizeListener = void 0;
    let wrapScrollTop = 0;
    let wrapScrollLeft = 0;
    let direction = "";
    const distanceScrollState = {
      bottom: false,
      top: false,
      right: false,
      left: false
    };
    const scrollbarRef = ref();
    const wrapRef = ref();
    const resizeRef = ref();
    const barRef = ref();
    const wrapStyle = computed(() => {
      const style = {};
      const height = addUnit(props.height);
      const maxHeight = addUnit(props.maxHeight);
      if (height)
        style.height = height;
      if (maxHeight)
        style.maxHeight = maxHeight;
      return [props.wrapStyle, style];
    });
    const wrapKls = computed(() => {
      return [
        props.wrapClass,
        ns.e("wrap"),
        { [ns.em("wrap", "hidden-default")]: !props.native }
      ];
    });
    const resizeKls = computed(() => {
      return [ns.e("view"), props.viewClass];
    });
    const shouldSkipDirection = (direction2) => {
      var _a;
      return (_a = distanceScrollState[direction2]) != null ? _a : false;
    };
    const DIRECTION_PAIRS = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const updateTriggerStatus = (arrivedStates) => {
      const oppositeDirection = DIRECTION_PAIRS[direction];
      if (!oppositeDirection)
        return;
      const arrived = arrivedStates[direction];
      const oppositeArrived = arrivedStates[oppositeDirection];
      if (arrived && !distanceScrollState[direction]) {
        distanceScrollState[direction] = true;
      }
      if (!oppositeArrived && distanceScrollState[oppositeDirection]) {
        distanceScrollState[oppositeDirection] = false;
      }
    };
    const handleScroll = () => {
      var _a;
      if (wrapRef.value) {
        (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
        const prevTop = wrapScrollTop;
        const prevLeft = wrapScrollLeft;
        wrapScrollTop = wrapRef.value.scrollTop;
        wrapScrollLeft = wrapRef.value.scrollLeft;
        const arrivedStates = {
          bottom: wrapScrollTop + wrapRef.value.clientHeight >= wrapRef.value.scrollHeight - props.distance,
          top: wrapScrollTop <= props.distance && prevTop !== 0,
          right: wrapScrollLeft + wrapRef.value.clientWidth >= wrapRef.value.scrollWidth - props.distance && prevLeft !== wrapScrollLeft,
          left: wrapScrollLeft <= props.distance && prevLeft !== 0
        };
        emit("scroll", {
          scrollTop: wrapScrollTop,
          scrollLeft: wrapScrollLeft
        });
        if (prevTop !== wrapScrollTop) {
          direction = wrapScrollTop > prevTop ? "bottom" : "top";
        }
        if (prevLeft !== wrapScrollLeft) {
          direction = wrapScrollLeft > prevLeft ? "right" : "left";
        }
        if (props.distance > 0) {
          if (shouldSkipDirection(direction)) {
            return;
          }
          updateTriggerStatus(arrivedStates);
        }
        if (arrivedStates[direction])
          emit("end-reached", direction);
      }
    };
    function scrollTo(arg1, arg2) {
      if (isObject(arg1)) {
        wrapRef.value.scrollTo(arg1);
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrapRef.value.scrollTo(arg1, arg2);
      }
    }
    const setScrollTop = (value) => {
      if (!isNumber(value)) {
        return;
      }
      wrapRef.value.scrollTop = value;
    };
    const setScrollLeft = (value) => {
      if (!isNumber(value)) {
        return;
      }
      wrapRef.value.scrollLeft = value;
    };
    const update = () => {
      var _a;
      (_a = barRef.value) == null ? void 0 : _a.update();
      distanceScrollState[direction] = false;
    };
    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver == null ? void 0 : stopResizeObserver();
          stopWrapResizeObserver == null ? void 0 : stopWrapResizeObserver();
          stopResizeListener == null ? void 0 : stopResizeListener();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
          ({ stop: stopWrapResizeObserver } = useResizeObserver(wrapRef, update));
          stopResizeListener = useEventListener("resize", update);
        }
      },
      { immediate: true }
    );
    watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          nextTick(() => {
            var _a;
            update();
            if (wrapRef.value) {
              (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
            }
          });
      }
    );
    provide(
      scrollbarContextKey,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef
      })
    );
    __expose({
      wrapRef,
      update,
      scrollTo,
      setScrollTop,
      setScrollLeft,
      handleScroll
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode("div", {
            ref_key: "wrapRef",
            ref: wrapRef,
            class: normalizeClass(wrapKls.value),
            style: normalizeStyle(wrapStyle.value),
            tabindex: _ctx.tabindex,
            onScroll: handleScroll
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
              id: _ctx.id,
              ref_key: "resizeRef",
              ref: resizeRef,
              class: normalizeClass(resizeKls.value),
              style: normalizeStyle(_ctx.viewStyle),
              role: _ctx.role,
              "aria-label": _ctx.ariaLabel,
              "aria-orientation": _ctx.ariaOrientation
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
          ], 46, _hoisted_1$8),
          !_ctx.native ? (openBlock(), createBlock(Bar, {
            key: 0,
            ref_key: "barRef",
            ref: barRef,
            always: _ctx.always,
            "min-size": _ctx.minSize
          }, null, 8, ["always", "min-size"])) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var Scrollbar = /* @__PURE__ */ _export_sfc$1(_sfc_main$i, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const ElScrollbar = withInstall(Scrollbar);
const POPPER_INJECTION_KEY = /* @__PURE__ */ Symbol("popper");
const POPPER_CONTENT_INJECTION_KEY = /* @__PURE__ */ Symbol("popperContent");
const roleTypes = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
];
const popperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: "tooltip"
  }
});
const _sfc_main$h = defineComponent({
  ...{
    name: "ElPopper",
    inheritAttrs: false
  },
  __name: "popper",
  props: popperProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const triggerRef = ref();
    const popperInstanceRef = ref();
    const contentRef = ref();
    const referenceRef = ref();
    const role = computed(() => props.role);
    const popperProvides = {
      triggerRef,
      popperInstanceRef,
      contentRef,
      referenceRef,
      role
    };
    __expose(popperProvides);
    provide(POPPER_INJECTION_KEY, popperProvides);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
var Popper = /* @__PURE__ */ _export_sfc$1(_sfc_main$h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const _sfc_main$g = defineComponent({
  ...{
    name: "ElPopperArrow",
    inheritAttrs: false
  },
  __name: "arrow",
  setup(__props, { expose: __expose }) {
    const ns = useNamespace("popper");
    const { arrowRef, arrowStyle } = inject(
      POPPER_CONTENT_INJECTION_KEY,
      void 0
    );
    __expose({
      arrowRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          ref_key: "arrowRef",
          ref: arrowRef,
          class: normalizeClass(unref(ns).e("arrow")),
          style: normalizeStyle(unref(arrowStyle)),
          "data-popper-arrow": ""
        },
        null,
        6
      );
    };
  }
});
var ElPopperArrow = /* @__PURE__ */ _export_sfc$1(_sfc_main$g, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const popperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType(Function)
  },
  onMouseleave: {
    type: definePropType(Function)
  },
  onClick: {
    type: definePropType(Function)
  },
  onKeydown: {
    type: definePropType(Function)
  },
  onFocus: {
    type: definePropType(Function)
  },
  onBlur: {
    type: definePropType(Function)
  },
  onContextmenu: {
    type: definePropType(Function)
  },
  id: String,
  open: Boolean
});
const FORWARD_REF_INJECTION_KEY = /* @__PURE__ */ Symbol("elForwardRef");
const useForwardRef = (forwardRef) => {
  const setForwardRef = (el) => {
    forwardRef.value = el;
  };
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  });
};
const useForwardRefDirective = (setForwardRef) => {
  return {
    mounted(el) {
      setForwardRef(el);
    },
    updated(el) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    }
  };
};
const NAME = "ElOnlyChild";
const OnlyChild = defineComponent({
  name: NAME,
  setup(_, {
    slots,
    attrs
  }) {
    var _a;
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective((_a = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a : NOOP);
    return () => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
      if (!defaultSlot)
        return null;
      const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        return null;
      }
      return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  }
});
function findFirstLegitChild(node) {
  if (!node)
    return [null, 0];
  const children = node;
  const len = children.filter((c) => c.type !== Comment).length;
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return [wrapTextContent(child), len];
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return [child, len];
      }
    }
    return [wrapTextContent(child), len];
  }
  return [null, 0];
}
function wrapTextContent(s) {
  const ns = useNamespace("only-child");
  return createVNode("span", {
    "class": ns.e("content")
  }, [s]);
}
const _sfc_main$f = defineComponent({
  ...{
    name: "ElPopperTrigger",
    inheritAttrs: false
  },
  __name: "trigger",
  props: popperTriggerProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { role, triggerRef } = inject(POPPER_INJECTION_KEY, void 0);
    useForwardRef(triggerRef);
    const ariaControls = computed(() => {
      return ariaHaspopup.value ? props.id : void 0;
    });
    const ariaDescribedby = computed(() => {
      if (role && role.value === "tooltip") {
        return props.open && props.id ? props.id : void 0;
      }
      return void 0;
    });
    const ariaHaspopup = computed(() => {
      if (role && role.value !== "tooltip") {
        return role.value;
      }
      return void 0;
    });
    const ariaExpanded = computed(() => {
      return ariaHaspopup.value ? `${props.open}` : void 0;
    });
    __expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return !_ctx.virtualTriggering ? (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, _ctx.$attrs, {
        "aria-controls": ariaControls.value,
        "aria-describedby": ariaDescribedby.value,
        "aria-expanded": ariaExpanded.value,
        "aria-haspopup": ariaHaspopup.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : createCommentVNode("v-if", true);
    };
  }
});
var ElPopperTrigger = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
});
const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: placements,
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  ...popperArrowProps,
  id: String,
  style: {
    type: definePropType([String, Array, Object])
  },
  className: {
    type: definePropType([String, Array, Object])
  },
  effect: {
    type: definePropType(String),
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: definePropType([String, Array, Object])
  },
  popperStyle: {
    type: definePropType([String, Array, Object])
  },
  referenceEl: {
    type: definePropType(Object)
  },
  triggerTargetEl: {
    type: definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...useAriaProps(["ariaLabel"]),
  loop: Boolean
});
const popperContentEmits = {
  mouseenter: (evt) => evt instanceof MouseEvent,
  mouseleave: (evt) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true
};
const usePopperContentFocusTrap = (props, emit) => {
  const trapped = ref(false);
  const focusStartRef = ref();
  const onFocusAfterTrapped = () => {
    emit("focus");
  };
  const onFocusAfterReleased = (event) => {
    var _a;
    if (((_a = event.detail) == null ? void 0 : _a.focusReason) !== "pointer") {
      focusStartRef.value = "first";
      emit("blur");
    }
  };
  const onFocusInTrap = (event) => {
    if (props.visible && !trapped.value) {
      if (event.target) {
        focusStartRef.value = event.target;
      }
      trapped.value = true;
    }
  };
  const onFocusoutPrevented = (event) => {
    if (!props.trapping) {
      if (event.detail.focusReason === "pointer") {
        event.preventDefault();
      }
      trapped.value = false;
    }
  };
  const onReleaseRequested = () => {
    trapped.value = false;
    emit("close");
  };
  return {
    focusStartRef,
    trapped,
    onFocusAfterReleased,
    onFocusAfterTrapped,
    onFocusInTrap,
    onFocusoutPrevented,
    onReleaseRequested
  };
};
const buildPopperOptions = (props, modifiers = []) => {
  const { placement, strategy, popperOptions } = props;
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  };
  deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
  return options;
};
const unwrapMeasurableEl = ($el) => {
  if (!isClient)
    return;
  return unrefElement($el);
};
function genModifiers(options) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: "offset",
      options: {
        offset: [0, offset != null ? offset : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration
      }
    }
  ];
}
function deriveExtraModifiers(options, modifiers) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
  }
}
const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
  const stateUpdater = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => {
      const derivedState = deriveState(state);
      Object.assign(states.value, derivedState);
    },
    requires: ["computeStyles"]
  };
  const options = computed(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [
        ...modifiers || [],
        stateUpdater,
        { name: "applyStyles", enabled: false }
      ]
    };
  });
  const instanceRef = shallowRef();
  const states = ref({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  });
  const destroy = () => {
    if (!instanceRef.value)
      return;
    instanceRef.value.destroy();
    instanceRef.value = void 0;
  };
  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef);
      if (instance) {
        instance.setOptions(newOptions);
      }
    },
    {
      deep: true
    }
  );
  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy();
      if (!referenceElement || !popperElement)
        return;
      instanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options)
      );
    }
  );
  return {
    state: computed(() => {
      var _a;
      return { ...((_a = unref(instanceRef)) == null ? void 0 : _a.state) || {} };
    }),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.update();
    },
    forceUpdate: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.forceUpdate();
    },
    instanceRef: computed(() => unref(instanceRef))
  };
};
function deriveState(state) {
  const elements = Object.keys(state.elements);
  const styles = fromPairs(
    elements.map(
      (element) => [element, state.styles[element] || {}]
    )
  );
  const attributes = fromPairs(
    elements.map(
      (element) => [element, state.attributes[element]]
    )
  );
  return {
    styles,
    attributes
  };
}
const DEFAULT_ARROW_OFFSET = 0;
const usePopperContent = (props) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    POPPER_INJECTION_KEY,
    void 0
  );
  const arrowRef = ref();
  const arrowOffset = computed(() => props.arrowOffset);
  const eventListenerModifier = computed(() => {
    return {
      name: "eventListeners",
      enabled: !!props.visible
    };
  });
  const arrowModifier = computed(() => {
    var _a;
    const arrowEl = unref(arrowRef);
    const offset = (_a = unref(arrowOffset)) != null ? _a : DEFAULT_ARROW_OFFSET;
    return {
      name: "arrow",
      enabled: !isUndefined$1(arrowEl),
      options: {
        element: arrowEl,
        padding: offset
      }
    };
  });
  const options = computed(() => {
    return {
      onFirstUpdate: () => {
        update();
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier)
      ])
    };
  });
  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
  );
  const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
  watch(instanceRef, (instance) => popperInstanceRef.value = instance, {
    flush: "sync"
  });
  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,
    forceUpdate,
    update
  };
};
const usePopperContentDOM = (props, {
  attributes,
  styles,
  role
}) => {
  const { nextZIndex } = useZIndex();
  const ns = useNamespace("popper");
  const contentAttrs = computed(() => unref(attributes).popper);
  const contentZIndex = ref(
    isNumber(props.zIndex) ? props.zIndex : nextZIndex()
  );
  const contentClass = computed(() => [
    ns.b(),
    ns.is("pure", props.pure),
    ns.is(props.effect),
    props.popperClass
  ]);
  const contentStyle = computed(() => {
    return [
      { zIndex: unref(contentZIndex) },
      unref(styles).popper,
      props.popperStyle || {}
    ];
  });
  const ariaModal = computed(
    () => role.value === "dialog" ? "false" : void 0
  );
  const arrowStyle = computed(
    () => unref(styles).arrow || {}
  );
  const updateZIndex = () => {
    contentZIndex.value = isNumber(props.zIndex) ? props.zIndex : nextZIndex();
  };
  return {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentClass,
    contentStyle,
    contentZIndex,
    updateZIndex
  };
};
const _sfc_main$e = defineComponent({
  ...{
    name: "ElPopperContent"
  },
  __name: "content",
  props: popperContentProps,
  emits: popperContentEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const {
      focusStartRef,
      trapped,
      onFocusAfterReleased,
      onFocusAfterTrapped,
      onFocusInTrap,
      onFocusoutPrevented,
      onReleaseRequested
    } = usePopperContentFocusTrap(props, emit);
    const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
    const {
      arrowStyle,
      contentAttrs,
      contentClass,
      contentStyle,
      updateZIndex
    } = usePopperContentDOM(props, {
      styles,
      attributes,
      role
    });
    const formItemContext = inject(formItemContextKey, void 0);
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowStyle,
      arrowRef
    });
    if (formItemContext) {
      provide(formItemContextKey, {
        ...formItemContext,
        addInputId: NOOP,
        removeInputId: NOOP
      });
    }
    const updatePopper = (shouldUpdateZIndex = true) => {
      update();
      shouldUpdateZIndex && updateZIndex();
    };
    __expose({
      popperContentRef: contentRef,
      popperInstanceRef: instanceRef,
      updatePopper,
      contentStyle
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        mergeProps({
          ref_key: "contentRef",
          ref: contentRef
        }, unref(contentAttrs), {
          style: unref(contentStyle),
          class: unref(contentClass),
          tabindex: "-1",
          onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
          onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
        }),
        [
          createVNode(unref(ElFocusTrap), {
            loop: _ctx.loop,
            trapped: unref(trapped),
            "trap-on-focus-in": true,
            "focus-trap-el": unref(contentRef),
            "focus-start-el": unref(focusStartRef),
            onFocusAfterTrapped: unref(onFocusAfterTrapped),
            onFocusAfterReleased: unref(onFocusAfterReleased),
            onFocusin: unref(onFocusInTrap),
            onFocusoutPrevented: unref(onFocusoutPrevented),
            onReleaseRequested: unref(onReleaseRequested)
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["loop", "trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
        ],
        16
      );
    };
  }
});
var ElPopperContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const ElPopper = withInstall(Popper);
const TOOLTIP_INJECTION_KEY = /* @__PURE__ */ Symbol("elTooltip");
function useTimeout() {
  let timeoutHandle;
  const registerTimeout = (fn, delay) => {
    cancelTimeout();
    timeoutHandle = (void 0).setTimeout(fn, delay);
  };
  const cancelTimeout = () => (void 0).clearTimeout(timeoutHandle);
  tryOnScopeDispose(() => cancelTimeout());
  return {
    registerTimeout,
    cancelTimeout
  };
}
const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
});
const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}) => {
  const { registerTimeout } = useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout();
  const onOpen = (event, delay = unref(showAfter)) => {
    registerTimeout(() => {
      open(event);
      const _autoClose = unref(autoClose);
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event);
        }, _autoClose);
      }
    }, delay);
  };
  const onClose = (event, delay = unref(hideAfter)) => {
    cancelTimeoutForAutoClose();
    registerTimeout(() => {
      close(event);
    }, delay);
  };
  return {
    onOpen,
    onClose
  };
};
const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: teleportProps.to.type
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: Boolean,
  persistent: Boolean,
  visible: {
    type: definePropType(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  ...useAriaProps(["ariaLabel"])
});
const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space]
  },
  focusOnTarget: Boolean
});
const _prop = buildProp({
  type: definePropType(Boolean),
  default: null
});
const _event = buildProp({
  type: definePropType(Function)
});
const createModelToggleComposable = (name) => {
  const updateEventKey = `update:${name}`;
  const updateEventKeyRaw = `onUpdate:${name}`;
  const useModelToggleEmits2 = [updateEventKey];
  const useModelToggleProps2 = {
    [name]: _prop,
    [updateEventKeyRaw]: _event
  };
  const useModelToggle2 = ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }) => {
    const instance = getCurrentInstance();
    const { emit } = instance;
    const props = instance.props;
    const hasUpdateHandler = computed(
      () => isFunction(props[updateEventKeyRaw])
    );
    const isModelBindingAbsent = computed(() => props[name] === null);
    const doShow = (event) => {
      if (indicator.value === true) {
        return;
      }
      indicator.value = true;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (isFunction(onShow)) {
        onShow(event);
      }
    };
    const doHide = (event) => {
      if (indicator.value === false) {
        return;
      }
      indicator.value = false;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (isFunction(onHide)) {
        onHide(event);
      }
    };
    const show = (event) => {
      if (props.disabled === true || isFunction(shouldProceed) && !shouldProceed())
        return;
      const shouldEmit = hasUpdateHandler.value && isClient;
      if (shouldEmit) {
        emit(updateEventKey, true);
      }
      if (isModelBindingAbsent.value || !shouldEmit) {
        doShow(event);
      }
    };
    const hide = (event) => {
      if (props.disabled === true || !isClient)
        return;
      const shouldEmit = hasUpdateHandler.value && isClient;
      if (shouldEmit) {
        emit(updateEventKey, false);
      }
      if (isModelBindingAbsent.value || !shouldEmit) {
        doHide(event);
      }
    };
    const onChange = (val) => {
      if (!isBoolean(val))
        return;
      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false);
        }
      } else if (indicator.value !== val) {
        if (val) {
          doShow();
        } else {
          doHide();
        }
      }
    };
    const toggle = () => {
      if (indicator.value) {
        hide();
      } else {
        show();
      }
    };
    watch(() => props[name], onChange);
    if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
      watch(
        () => ({
          ...instance.proxy.$route
        }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide();
          }
        }
      );
    }
    return {
      hide,
      show,
      toggle,
      hasUpdateHandler
    };
  };
  return {
    useModelToggle: useModelToggle2,
    useModelToggleProps: useModelToggleProps2,
    useModelToggleEmits: useModelToggleEmits2
  };
};
const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable("visible");
const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true
  }
});
const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
];
const isTriggerType = (trigger, type) => {
  if (isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
};
const whenTrigger = (trigger, type, handler) => {
  return (e) => {
    isTriggerType(unref(trigger), type) && handler(e);
  };
};
const _sfc_main$d = defineComponent({
  ...{
    name: "ElTooltipTrigger"
  },
  __name: "trigger",
  props: useTooltipTriggerProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("tooltip");
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(
      TOOLTIP_INJECTION_KEY,
      void 0
    );
    const triggerRef = ref(null);
    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true;
      }
    };
    const trigger = toRef(props, "trigger");
    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "hover", (e) => {
        onOpen(e);
        if (props.focusOnTarget && e.target) {
          nextTick(() => {
            focusElement(e.target, { preventScroll: true });
          });
        }
      })
    );
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "hover", onClose)
    );
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "click", (e) => {
        if (e.button === 0) {
          onToggle(e);
        }
      })
    );
    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "focus", onOpen)
    );
    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "focus", onClose)
    );
    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, "contextmenu", (e) => {
        e.preventDefault();
        onToggle(e);
      })
    );
    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e) => {
        const code = getEventCode(e);
        if (props.triggerKeys.includes(code)) {
          e.preventDefault();
          onToggle(e);
        }
      }
    );
    __expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopperTrigger), {
        id: unref(id),
        "virtual-ref": _ctx.virtualRef,
        open: unref(open),
        "virtual-triggering": _ctx.virtualTriggering,
        class: normalizeClass(unref(ns).e("trigger")),
        onBlur: unref(onBlur),
        onClick: unref(onClick),
        onContextmenu: unref(onContextMenu),
        onFocus: unref(onFocus),
        onMouseenter: unref(onMouseenter),
        onMouseleave: unref(onMouseleave),
        onKeydown: unref(onKeydown)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
    };
  }
});
var ElTooltipTrigger = /* @__PURE__ */ _export_sfc$1(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const usePopperContainerId = () => {
  const namespace = useGetDerivedNamespace();
  const idInjection = useIdInjection();
  const id = computed(() => {
    return `${namespace.value}-popper-container-${idInjection.prefix}`;
  });
  const selector = computed(() => `#${id.value}`);
  return {
    id,
    selector
  };
};
const usePopperContainer = () => {
  const { id, selector } = usePopperContainerId();
  return {
    id,
    selector
  };
};
const castArray = (arr) => {
  if (!arr && arr !== 0)
    return [];
  return isArray(arr) ? arr : [arr];
};
const _sfc_main$c = defineComponent({
  ...{
    name: "ElTooltipContent",
    inheritAttrs: false
  },
  __name: "content",
  props: useTooltipContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { selector } = usePopperContainerId();
    const ns = useNamespace("tooltip");
    const contentRef = ref();
    const popperContentRef = computedEager(() => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
    });
    let stopHandle;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide
    } = inject(TOOLTIP_INJECTION_KEY, void 0);
    const transitionClass = computed(() => {
      return props.transition || `${ns.namespace.value}-fade-in-linear`;
    });
    const persistentRef = computed(() => {
      return props.persistent;
    });
    const shouldRender = computed(() => {
      return unref(persistentRef) ? true : unref(open);
    });
    const shouldShow = computed(() => {
      return props.disabled ? false : unref(open);
    });
    const appendTo = computed(() => {
      return props.appendTo || selector.value;
    });
    const contentStyle = computed(() => {
      var _a;
      return (_a = props.style) != null ? _a : {};
    });
    const ariaHidden = ref(true);
    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && focusElement((void 0).body, { preventScroll: true });
      ariaHidden.value = true;
    };
    const stopWhenControlled = () => {
      if (unref(controlled))
        return true;
    };
    const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && isTriggerType(unref(trigger), "hover")) {
        onOpen();
      }
    });
    const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
      if (isTriggerType(unref(trigger), "hover")) {
        onClose();
      }
    });
    const onBeforeEnter = () => {
      var _a, _b;
      (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      onBeforeShow == null ? void 0 : onBeforeShow();
    };
    const onBeforeLeave = () => {
      onBeforeHide == null ? void 0 : onBeforeHide();
    };
    const onAfterShow = () => {
      onShow();
    };
    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };
    const isFocusInsideContent = (event) => {
      var _a;
      const popperContent = (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
      const activeElement = (event == null ? void 0 : event.relatedTarget) || (void 0).activeElement;
      return popperContent == null ? void 0 : popperContent.contains(activeElement);
    };
    watch(
      () => unref(open),
      (val) => {
        if (!val) {
          stopHandle == null ? void 0 : stopHandle();
        } else {
          ariaHidden.value = false;
          stopHandle = onClickOutside(
            popperContentRef,
            () => {
              if (unref(controlled))
                return;
              const needClose = castArray(unref(trigger)).every((item) => {
                return item !== "hover" && item !== "focus";
              });
              if (needClose) {
                onClose();
              }
            },
            { detectIframe: true }
          );
        }
      },
      {
        flush: "post"
      }
    );
    watch(
      () => props.content,
      () => {
        var _a, _b;
        (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      }
    );
    __expose({
      contentRef,
      isFocusInsideContent
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        disabled: !_ctx.teleported,
        to: appendTo.value
      }, {
        default: withCtx(() => [
          shouldRender.value || !ariaHidden.value ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: transitionClass.value,
            appear: !persistentRef.value,
            onAfterLeave: onTransitionLeave,
            onBeforeEnter,
            onAfterEnter: onAfterShow,
            onBeforeLeave,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(unref(ElPopperContent), mergeProps({
                id: unref(id),
                ref_key: "contentRef",
                ref: contentRef
              }, _ctx.$attrs, {
                "aria-label": _ctx.ariaLabel,
                "aria-hidden": ariaHidden.value,
                "boundaries-padding": _ctx.boundariesPadding,
                "fallback-placements": _ctx.fallbackPlacements,
                "gpu-acceleration": _ctx.gpuAcceleration,
                offset: _ctx.offset,
                placement: _ctx.placement,
                "popper-options": _ctx.popperOptions,
                "arrow-offset": _ctx.arrowOffset,
                strategy: _ctx.strategy,
                effect: _ctx.effect,
                enterable: _ctx.enterable,
                pure: _ctx.pure,
                "popper-class": _ctx.popperClass,
                "popper-style": [_ctx.popperStyle, contentStyle.value],
                "reference-el": _ctx.referenceEl,
                "trigger-target-el": _ctx.triggerTargetEl,
                visible: shouldShow.value,
                "z-index": _ctx.zIndex,
                loop: _ctx.loop,
                onMouseenter: unref(onContentEnter),
                onMouseleave: unref(onContentLeave),
                onBlur,
                onClose: unref(onClose)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "loop", "onMouseenter", "onMouseleave", "onClose"]), [
                [vShow, shouldShow.value]
              ])
            ]),
            _: 3
          }, 8, ["name", "appear"])) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["disabled", "to"]);
    };
  }
});
var ElTooltipContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const _hoisted_1$7 = ["innerHTML"];
const _hoisted_2$4 = { key: 1 };
const _sfc_main$b = defineComponent({
  ...{
    name: "ElTooltip"
  },
  __name: "tooltip",
  props: useTooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    usePopperContainer();
    const ns = useNamespace("tooltip");
    const id = useId();
    const popperRef = ref();
    const contentRef = ref();
    const updatePopper = () => {
      var _a;
      const popperComponent = unref(popperRef);
      if (popperComponent) {
        (_a = popperComponent.popperInstanceRef) == null ? void 0 : _a.update();
      }
    };
    const open = ref(false);
    const toggleReason = ref();
    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason
    });
    const { onOpen, onClose } = useDelayedToggle({
      showAfter: toRef(props, "showAfter"),
      hideAfter: toRef(props, "hideAfter"),
      autoClose: toRef(props, "autoClose"),
      open: show,
      close: hide
    });
    const controlled = computed(
      () => isBoolean(props.visible) && !hasUpdateHandler.value
    );
    const kls = computed(() => {
      return [ns.b(), props.popperClass];
    });
    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: readonly(open),
      trigger: toRef(props, "trigger"),
      onOpen,
      onClose,
      onToggle: (event) => {
        if (unref(open)) {
          onClose(event);
        } else {
          onOpen(event);
        }
      },
      onShow: () => {
        emit("show", toggleReason.value);
      },
      onHide: () => {
        emit("hide", toggleReason.value);
      },
      onBeforeShow: () => {
        emit("before-show", toggleReason.value);
      },
      onBeforeHide: () => {
        emit("before-hide", toggleReason.value);
      },
      updatePopper
    });
    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled && open.value) {
          open.value = false;
        }
      }
    );
    const isFocusInsideContent = (event) => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
    };
    __expose({
      popperRef,
      contentRef,
      isFocusInsideContent,
      updatePopper,
      onOpen,
      onClose,
      hide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopper), {
        ref_key: "popperRef",
        ref: popperRef,
        role: _ctx.role
      }, {
        default: withCtx(() => [
          createVNode(ElTooltipTrigger, {
            disabled: _ctx.disabled,
            trigger: _ctx.trigger,
            "trigger-keys": _ctx.triggerKeys,
            "virtual-ref": _ctx.virtualRef,
            "virtual-triggering": _ctx.virtualTriggering,
            "focus-on-target": _ctx.focusOnTarget
          }, {
            default: withCtx(() => [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
          createVNode(ElTooltipContent, {
            ref_key: "contentRef",
            ref: contentRef,
            "aria-label": _ctx.ariaLabel,
            "boundaries-padding": _ctx.boundariesPadding,
            content: _ctx.content,
            disabled: _ctx.disabled,
            effect: _ctx.effect,
            enterable: _ctx.enterable,
            "fallback-placements": _ctx.fallbackPlacements,
            "hide-after": _ctx.hideAfter,
            "gpu-acceleration": _ctx.gpuAcceleration,
            offset: _ctx.offset,
            persistent: _ctx.persistent,
            "popper-class": kls.value,
            "popper-style": _ctx.popperStyle,
            placement: _ctx.placement,
            "popper-options": _ctx.popperOptions,
            "arrow-offset": _ctx.arrowOffset,
            pure: _ctx.pure,
            "raw-content": _ctx.rawContent,
            "reference-el": _ctx.referenceEl,
            "trigger-target-el": _ctx.triggerTargetEl,
            "show-after": _ctx.showAfter,
            strategy: _ctx.strategy,
            teleported: _ctx.teleported,
            transition: _ctx.transition,
            "virtual-triggering": _ctx.virtualTriggering,
            "z-index": _ctx.zIndex,
            "append-to": _ctx.appendTo,
            loop: _ctx.loop
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "content", {}, () => [
                _ctx.rawContent ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  innerHTML: _ctx.content
                }, null, 8, _hoisted_1$7)) : (openBlock(), createElementBlock(
                  "span",
                  _hoisted_2$4,
                  toDisplayString(_ctx.content),
                  1
                ))
              ]),
              _ctx.showArrow ? (openBlock(), createBlock(unref(ElPopperArrow), { key: 0 })) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "arrow-offset", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to", "loop"])
        ]),
        _: 3
      }, 8, ["role"]);
    };
  }
});
var Tooltip = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const ElTooltip = withInstall(Tooltip);
const getCell = function(event) {
  var _a;
  return (_a = event.target) == null ? void 0 : _a.closest("td");
};
const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  if (isString(reverse)) {
    reverse = reverse === "descending" ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  const getKey = sortMethod ? null : function(value, index) {
    if (sortBy) {
      return flatMap(castArray$1(sortBy), (by) => {
        if (isString(by)) {
          return get(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== "$key") {
      if (isObject(value) && "$value" in value)
        value = value.$value;
    }
    return [
      isObject(value) ? sortKey ? get(value, sortKey) : null : value
    ];
  };
  const compare = function(a, b) {
    var _a, _b, _c, _d, _e, _f;
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (let i = 0, len = (_b = (_a = a.key) == null ? void 0 : _a.length) != null ? _b : 0; i < len; i++) {
      if (((_c = a.key) == null ? void 0 : _c[i]) < ((_d = b.key) == null ? void 0 : _d[i])) {
        return -1;
      }
      if (((_e = a.key) == null ? void 0 : _e[i]) > ((_f = b.key) == null ? void 0 : _f[i])) {
        return 1;
      }
    }
    return 0;
  };
  return array.map((value, index) => {
    return {
      value,
      index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort((a, b) => {
    let order = compare(a, b);
    if (!order) {
      order = a.index - b.index;
    }
    return order * +reverse;
  }).map((item) => item.value);
};
const getColumnById = function(table, columnId) {
  let column = null;
  table.columns.forEach((item) => {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};
const getColumnByKey = function(table, columnKey) {
  let column = null;
  for (let i = 0; i < table.columns.length; i++) {
    const item = table.columns[i];
    if (item.columnKey === columnKey) {
      column = item;
      break;
    }
  }
  if (!column)
    throwError("ElTable", `No column matching with column-key: ${columnKey}`);
  return column;
};
const getColumnByCell = function(table, cell, namespace) {
  const matches = (cell.className || "").match(
    new RegExp(`${namespace}-table_[^\\s]+`, "gm")
  );
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};
const getRowIdentity = (row, rowKey) => {
  if (!row)
    throw new Error("Row is required when get row identity");
  if (isString(rowKey)) {
    if (!rowKey.includes(".")) {
      return `${row[rowKey]}`;
    }
    const key = rowKey.split(".");
    let current = row;
    for (const element of key) {
      current = current[element];
    }
    return `${current}`;
  } else if (isFunction(rowKey)) {
    return rowKey.call(null, row);
  }
  return "";
};
const getKeysMap = function(array, rowKey, flatten = false, childrenKey = "children") {
  const data = array || [];
  const arrayMap = {};
  data.forEach((row, index) => {
    arrayMap[getRowIdentity(row, rowKey)] = { row, index };
    if (flatten) {
      const children = row[childrenKey];
      if (isArray(children)) {
        Object.assign(arrayMap, getKeysMap(children, rowKey, true, childrenKey));
      }
    }
  });
  return arrayMap;
};
function parseWidth(width) {
  if (width === "")
    return width;
  if (!isUndefined(width)) {
    width = Number.parseInt(width, 10);
    if (Number.isNaN(width)) {
      width = "";
    }
  }
  return width;
}
function parseMinWidth(minWidth) {
  if (minWidth === "")
    return minWidth;
  if (!isUndefined(minWidth)) {
    minWidth = parseWidth(minWidth);
    if (Number.isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
}
function parseHeight(height) {
  if (isNumber(height)) {
    return height;
  }
  if (isString(height)) {
    if (/^\d+(?:px)?$/.test(height)) {
      return Number.parseInt(height, 10);
    } else {
      return height;
    }
  }
  return null;
}
function toggleRowStatus(statusArr, row, newVal, tableTreeProps, selectable, rowIndex, rowKey) {
  let _rowIndex = rowIndex != null ? rowIndex : 0;
  let changed = false;
  const getIndex = () => {
    if (!rowKey) {
      return statusArr.indexOf(row);
    }
    const id = getRowIdentity(row, rowKey);
    return statusArr.findIndex((item) => getRowIdentity(item, rowKey) === id);
  };
  const index = getIndex();
  const included = index !== -1;
  const isRowSelectable = selectable == null ? void 0 : selectable.call(null, row, _rowIndex);
  const toggleStatus = (type) => {
    if (type === "add") {
      statusArr.push(row);
    } else {
      statusArr.splice(index, 1);
    }
    changed = true;
  };
  const getChildrenCount = (row2) => {
    let count = 0;
    const children = (tableTreeProps == null ? void 0 : tableTreeProps.children) && row2[tableTreeProps.children];
    if (children && isArray(children)) {
      count += children.length;
      children.forEach((item) => {
        count += getChildrenCount(item);
      });
    }
    return count;
  };
  if (!selectable || isRowSelectable) {
    if (isBoolean(newVal)) {
      if (newVal && !included) {
        toggleStatus("add");
      } else if (!newVal && included) {
        toggleStatus("remove");
      }
    } else {
      included ? toggleStatus("remove") : toggleStatus("add");
    }
  }
  if (!(tableTreeProps == null ? void 0 : tableTreeProps.checkStrictly) && (tableTreeProps == null ? void 0 : tableTreeProps.children) && isArray(row[tableTreeProps.children])) {
    row[tableTreeProps.children].forEach((item) => {
      const childChanged = toggleRowStatus(
        statusArr,
        item,
        newVal != null ? newVal : !included,
        tableTreeProps,
        selectable,
        _rowIndex + 1,
        rowKey
      );
      _rowIndex += getChildrenCount(item) + 1;
      if (childChanged) {
        changed = childChanged;
      }
    });
  }
  return changed;
}
function walkTreeNode(root, cb, childrenKey = "children", lazyKey = "hasChildren", lazy = false) {
  const isNil2 = (array) => !(isArray(array) && array.length);
  function _walker(parent, children, level) {
    cb(parent, children, level);
    children.forEach((item) => {
      if (item[lazyKey] && lazy) {
        cb(item, null, level + 1);
        return;
      }
      const children2 = item[childrenKey];
      if (!isNil2(children2)) {
        _walker(item, children2, level + 1);
      }
    });
  }
  root.forEach((item) => {
    if (item[lazyKey] && lazy) {
      cb(item, null, 0);
      return;
    }
    const children = item[childrenKey];
    if (!isNil2(children)) {
      _walker(item, children, 0);
    }
  });
}
const getTableOverflowTooltipProps = (props, innerText, row, column) => {
  const popperOptions = {
    strategy: "fixed",
    ...props.popperOptions
  };
  const tooltipFormatterContent = isFunction(column == null ? void 0 : column.tooltipFormatter) ? column.tooltipFormatter({
    row,
    column,
    cellValue: getProp(row, column.property).value
  }) : void 0;
  if (isVNode(tooltipFormatterContent)) {
    return {
      slotContent: tooltipFormatterContent,
      content: null,
      ...props,
      popperOptions
    };
  }
  return {
    slotContent: null,
    content: tooltipFormatterContent != null ? tooltipFormatterContent : innerText,
    ...props,
    popperOptions
  };
};
let removePopper = null;
function createTablePopper(props, popperContent, row, column, trigger, table) {
  var _a;
  const tableOverflowTooltipProps = getTableOverflowTooltipProps(
    props,
    popperContent,
    row,
    column
  );
  const mergedProps = {
    ...tableOverflowTooltipProps,
    slotContent: void 0
  };
  if ((removePopper == null ? void 0 : removePopper.trigger) === trigger) {
    const comp = (_a = removePopper.vm) == null ? void 0 : _a.component;
    merge(comp == null ? void 0 : comp.props, mergedProps);
    if (comp && tableOverflowTooltipProps.slotContent) {
      comp.slots.content = () => [tableOverflowTooltipProps.slotContent];
    }
    return;
  }
  removePopper == null ? void 0 : removePopper();
  const parentNode = table == null ? void 0 : table.refs.tableWrapper;
  const ns = parentNode == null ? void 0 : parentNode.dataset.prefix;
  const vm = createVNode(
    ElTooltip,
    {
      virtualTriggering: true,
      virtualRef: trigger,
      appendTo: parentNode,
      placement: "top",
      transition: "none",
      offset: 0,
      hideAfter: 0,
      ...mergedProps
    },
    tableOverflowTooltipProps.slotContent ? {
      content: () => tableOverflowTooltipProps.slotContent
    } : void 0
  );
  vm.appContext = { ...table.appContext, ...table };
  const container = (void 0).createElement("div");
  render(vm, container);
  vm.component.exposed.onOpen();
  const scrollContainer = parentNode == null ? void 0 : parentNode.querySelector(`.${ns}-scrollbar__wrap`);
  removePopper = () => {
    var _a2, _b;
    if ((_b = (_a2 = vm.component) == null ? void 0 : _a2.exposed) == null ? void 0 : _b.onClose) {
      vm.component.exposed.onClose();
    }
    render(null, container);
    const currentRemovePopper = removePopper;
    scrollContainer == null ? void 0 : scrollContainer.removeEventListener("scroll", currentRemovePopper);
    currentRemovePopper.trigger = void 0;
    currentRemovePopper.vm = void 0;
    removePopper = null;
  };
  removePopper.trigger = trigger != null ? trigger : void 0;
  removePopper.vm = vm;
  scrollContainer == null ? void 0 : scrollContainer.addEventListener("scroll", removePopper);
}
function getCurrentColumns(column) {
  if (column.children) {
    return flatMap(column.children, getCurrentColumns);
  } else {
    return [column];
  }
}
function getColSpan(colSpan, column) {
  return colSpan + column.colSpan;
}
const isFixedColumn = (index, fixed, store, realColumns) => {
  let start = 0;
  let after = index;
  const columns = store.states.columns.value;
  if (realColumns) {
    const curColumns = getCurrentColumns(realColumns[index]);
    const preColumns = columns.slice(0, columns.indexOf(curColumns[0]));
    start = preColumns.reduce(getColSpan, 0);
    after = start + curColumns.reduce(getColSpan, 0) - 1;
  } else {
    start = index;
  }
  let fixedLayout;
  switch (fixed) {
    case "left":
      if (after < store.states.fixedLeafColumnsLength.value) {
        fixedLayout = "left";
      }
      break;
    case "right":
      if (start >= columns.length - store.states.rightFixedLeafColumnsLength.value) {
        fixedLayout = "right";
      }
      break;
    default:
      if (after < store.states.fixedLeafColumnsLength.value) {
        fixedLayout = "left";
      } else if (start >= columns.length - store.states.rightFixedLeafColumnsLength.value) {
        fixedLayout = "right";
      }
  }
  return fixedLayout ? {
    direction: fixedLayout,
    start,
    after
  } : {};
};
const getFixedColumnsClass = (namespace, index, fixed, store, realColumns, offset = 0) => {
  const classes = [];
  const { direction, start, after } = isFixedColumn(
    index,
    fixed,
    store,
    realColumns
  );
  if (direction) {
    const isLeft = direction === "left";
    classes.push(`${namespace}-fixed-column--${direction}`);
    if (isLeft && after + offset === store.states.fixedLeafColumnsLength.value - 1) {
      classes.push("is-last-column");
    } else if (!isLeft && start - offset === store.states.columns.value.length - store.states.rightFixedLeafColumnsLength.value) {
      classes.push("is-first-column");
    }
  }
  return classes;
};
function getOffset(offset, column) {
  return offset + (isNull(column.realWidth) || Number.isNaN(column.realWidth) ? Number(column.width) : column.realWidth);
}
const getFixedColumnOffset = (index, fixed, store, realColumns) => {
  const {
    direction,
    start = 0,
    after = 0
  } = isFixedColumn(index, fixed, store, realColumns);
  if (!direction) {
    return;
  }
  const styles = {};
  const isLeft = direction === "left";
  const columns = store.states.columns.value;
  if (isLeft) {
    styles.left = columns.slice(0, start).reduce(getOffset, 0);
  } else {
    styles.right = columns.slice(after + 1).reverse().reduce(getOffset, 0);
  }
  return styles;
};
const ensurePosition = (style, key) => {
  if (!style)
    return;
  if (!Number.isNaN(style[key])) {
    style[key] = `${style[key]}px`;
  }
};
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false;
    }
    return true;
  }) ? vnodes : null;
}
function useExpand(watcherData) {
  const instance = getCurrentInstance();
  const defaultExpandAll = ref(false);
  const expandRows = ref([]);
  const updateExpandRows = () => {
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    if (defaultExpandAll.value) {
      expandRows.value = data.slice();
    } else if (rowKey) {
      const expandRowsMap = getKeysMap(expandRows.value, rowKey);
      expandRows.value = data.reduce((prev, row) => {
        const rowId = getRowIdentity(row, rowKey);
        const rowInfo = expandRowsMap[rowId];
        if (rowInfo) {
          prev.push(row);
        }
        return prev;
      }, []);
    } else {
      expandRows.value = [];
    }
  };
  const toggleRowExpansion = (row, expanded) => {
    const changed = toggleRowStatus(
      expandRows.value,
      row,
      expanded,
      void 0,
      void 0,
      void 0,
      watcherData.rowKey.value
    );
    if (changed) {
      instance.emit("expand-change", row, expandRows.value.slice());
    }
  };
  const setExpandRowKeys = (rowKeys) => {
    instance.store.assertRowKey();
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    const keysMap = getKeysMap(data, rowKey);
    expandRows.value = rowKeys.reduce((prev, cur) => {
      const info = keysMap[cur];
      if (info) {
        prev.push(info.row);
      }
      return prev;
    }, []);
  };
  const isRowExpanded = (row) => {
    const rowKey = watcherData.rowKey.value;
    if (rowKey) {
      const expandMap = getKeysMap(expandRows.value, rowKey);
      return !!expandMap[getRowIdentity(row, rowKey)];
    }
    return expandRows.value.includes(row);
  };
  return {
    updateExpandRows,
    toggleRowExpansion,
    setExpandRowKeys,
    isRowExpanded,
    states: {
      expandRows,
      defaultExpandAll
    }
  };
}
function useCurrent(watcherData) {
  const instance = getCurrentInstance();
  const _currentRowKey = ref(null);
  const currentRow = ref(null);
  const setCurrentRowKey = (key) => {
    instance.store.assertRowKey();
    _currentRowKey.value = key;
    setCurrentRowByKey(key);
  };
  const restoreCurrentRowKey = () => {
    _currentRowKey.value = null;
  };
  const setCurrentRowByKey = (key) => {
    var _a;
    const { data, rowKey } = watcherData;
    let _currentRow = null;
    if (rowKey.value) {
      _currentRow = (_a = (unref(data) || []).find(
        (item) => getRowIdentity(item, rowKey.value) === key
      )) != null ? _a : null;
    }
    currentRow.value = _currentRow != null ? _currentRow : null;
    instance.emit("current-change", currentRow.value, null);
  };
  const updateCurrentRow = (_currentRow) => {
    const oldCurrentRow = currentRow.value;
    if (_currentRow && _currentRow !== oldCurrentRow) {
      currentRow.value = _currentRow;
      instance.emit("current-change", currentRow.value, oldCurrentRow);
      return;
    }
    if (!_currentRow && oldCurrentRow) {
      currentRow.value = null;
      instance.emit("current-change", null, oldCurrentRow);
    }
  };
  const updateCurrentRowData = () => {
    const rowKey = watcherData.rowKey.value;
    const data = watcherData.data.value || [];
    const oldCurrentRow = currentRow.value;
    if (oldCurrentRow && !data.includes(oldCurrentRow)) {
      if (rowKey) {
        const currentRowKey = getRowIdentity(oldCurrentRow, rowKey);
        setCurrentRowByKey(currentRowKey);
      } else {
        currentRow.value = null;
      }
      if (isNull(currentRow.value)) {
        instance.emit("current-change", null, oldCurrentRow);
      }
    } else if (_currentRowKey.value) {
      setCurrentRowByKey(_currentRowKey.value);
      restoreCurrentRowKey();
    }
  };
  return {
    setCurrentRowKey,
    restoreCurrentRowKey,
    setCurrentRowByKey,
    updateCurrentRow,
    updateCurrentRowData,
    states: {
      _currentRowKey,
      currentRow
    }
  };
}
function useTree(watcherData) {
  const expandRowKeys = ref([]);
  const treeData = ref({});
  const indent = ref(16);
  const lazy = ref(false);
  const lazyTreeNodeMap = ref({});
  const lazyColumnIdentifier = ref("hasChildren");
  const childrenColumnName = ref("children");
  const checkStrictly = ref(false);
  const instance = getCurrentInstance();
  const normalizedData = computed(() => {
    if (!watcherData.rowKey.value)
      return {};
    const data = watcherData.data.value || [];
    return normalize(data);
  });
  const normalizedLazyNode = computed(() => {
    const rowKey = watcherData.rowKey.value;
    const keys = Object.keys(lazyTreeNodeMap.value);
    const res = {};
    if (!keys.length)
      return res;
    keys.forEach((key) => {
      if (lazyTreeNodeMap.value[key].length) {
        const item = { children: [] };
        lazyTreeNodeMap.value[key].forEach((row) => {
          const currentRowKey = getRowIdentity(row, rowKey);
          item.children.push(currentRowKey);
          if (row[lazyColumnIdentifier.value] && !res[currentRowKey]) {
            res[currentRowKey] = { children: [] };
          }
        });
        res[key] = item;
      }
    });
    return res;
  });
  const normalize = (data) => {
    const rowKey = watcherData.rowKey.value;
    const res = {};
    walkTreeNode(
      data,
      (parent, children, level) => {
        const parentId = getRowIdentity(parent, rowKey);
        if (isArray(children)) {
          res[parentId] = {
            children: children.map((row) => getRowIdentity(row, rowKey)),
            level
          };
        } else if (lazy.value) {
          res[parentId] = {
            children: [],
            lazy: true,
            level
          };
        }
      },
      childrenColumnName.value,
      lazyColumnIdentifier.value,
      lazy.value
    );
    return res;
  };
  const updateTreeData = (ifChangeExpandRowKeys = false, ifExpandAll) => {
    var _a, _b;
    ifExpandAll || (ifExpandAll = (_a = instance.store) == null ? void 0 : _a.states.defaultExpandAll.value);
    const nested = normalizedData.value;
    const normalizedLazyNode_ = normalizedLazyNode.value;
    const keys = Object.keys(nested);
    const newTreeData = {};
    if (keys.length) {
      const oldTreeData = unref(treeData);
      const rootLazyRowKeys = [];
      const getExpanded = (oldValue, key) => {
        if (ifChangeExpandRowKeys) {
          if (expandRowKeys.value) {
            return ifExpandAll || expandRowKeys.value.includes(key);
          } else {
            return !!(ifExpandAll || (oldValue == null ? void 0 : oldValue.expanded));
          }
        } else {
          const included = ifExpandAll || expandRowKeys.value && expandRowKeys.value.includes(key);
          return !!((oldValue == null ? void 0 : oldValue.expanded) || included);
        }
      };
      keys.forEach((key) => {
        const oldValue = oldTreeData[key];
        const newValue = { ...nested[key] };
        newValue.expanded = getExpanded(oldValue, key);
        if (newValue.lazy) {
          const { loaded = false, loading = false } = oldValue || {};
          newValue.loaded = !!loaded;
          newValue.loading = !!loading;
          rootLazyRowKeys.push(key);
        }
        newTreeData[key] = newValue;
      });
      const lazyKeys = Object.keys(normalizedLazyNode_);
      if (lazy.value && lazyKeys.length && rootLazyRowKeys.length) {
        lazyKeys.forEach((key) => {
          var _a2;
          const oldValue = oldTreeData[key];
          const lazyNodeChildren = normalizedLazyNode_[key].children;
          if (rootLazyRowKeys.includes(key)) {
            if (((_a2 = newTreeData[key].children) == null ? void 0 : _a2.length) !== 0) {
              throw new Error("[ElTable]children must be an empty array.");
            }
            newTreeData[key].children = lazyNodeChildren;
          } else {
            const { loaded = false, loading = false } = oldValue || {};
            newTreeData[key] = {
              lazy: true,
              loaded: !!loaded,
              loading: !!loading,
              expanded: getExpanded(oldValue, key),
              children: lazyNodeChildren,
              level: void 0
            };
          }
        });
      }
    }
    treeData.value = newTreeData;
    (_b = instance.store) == null ? void 0 : _b.updateTableScrollY();
  };
  watch(
    () => expandRowKeys.value,
    () => {
      updateTreeData(true);
    }
  );
  watch(
    () => normalizedData.value,
    () => {
      updateTreeData();
    }
  );
  watch(
    () => normalizedLazyNode.value,
    () => {
      updateTreeData();
    }
  );
  const updateTreeExpandKeys = (value) => {
    expandRowKeys.value = value;
    updateTreeData();
  };
  const isUseLazy = (data) => {
    return lazy.value && data && "loaded" in data && !data.loaded;
  };
  const toggleTreeExpansion = (row, expanded) => {
    instance.store.assertRowKey();
    const rowKey = watcherData.rowKey.value;
    const id = getRowIdentity(row, rowKey);
    const data = id && treeData.value[id];
    if (id && data && "expanded" in data) {
      const oldExpanded = data.expanded;
      expanded = isUndefined(expanded) ? !data.expanded : expanded;
      treeData.value[id].expanded = expanded;
      if (oldExpanded !== expanded) {
        instance.emit("expand-change", row, expanded);
      }
      expanded && isUseLazy(data) && loadData(row, id, data);
      instance.store.updateTableScrollY();
    }
  };
  const loadOrToggle = (row) => {
    instance.store.assertRowKey();
    const rowKey = watcherData.rowKey.value;
    const id = getRowIdentity(row, rowKey);
    const data = treeData.value[id];
    if (isUseLazy(data)) {
      loadData(row, id, data);
    } else {
      toggleTreeExpansion(row, void 0);
    }
  };
  const loadData = (row, key, treeNode) => {
    const { load } = instance.props;
    if (load && !treeData.value[key].loaded) {
      treeData.value[key].loading = true;
      load(row, treeNode, (data) => {
        if (!isArray(data)) {
          throw new TypeError("[ElTable] data must be an array");
        }
        treeData.value[key].loading = false;
        treeData.value[key].loaded = true;
        treeData.value[key].expanded = true;
        if (data.length) {
          lazyTreeNodeMap.value[key] = data;
        }
        instance.emit("expand-change", row, true);
      });
    }
  };
  const updateKeyChildren = (key, data) => {
    const { lazy: lazy2, rowKey } = instance.props;
    if (!lazy2)
      return;
    if (!rowKey)
      throw new Error("[Table] rowKey is required in updateKeyChild");
    if (lazyTreeNodeMap.value[key]) {
      lazyTreeNodeMap.value[key] = data;
    }
  };
  return {
    loadData,
    loadOrToggle,
    toggleTreeExpansion,
    updateTreeExpandKeys,
    updateTreeData,
    updateKeyChildren,
    normalize,
    states: {
      expandRowKeys,
      treeData,
      indent,
      lazy,
      lazyTreeNodeMap,
      lazyColumnIdentifier,
      childrenColumnName,
      checkStrictly
    }
  };
}
const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || isString(sortingColumn.sortable)) {
    return data;
  }
  return orderBy(
    data,
    states.sortProp,
    states.sortOrder,
    sortingColumn.sortMethod,
    sortingColumn.sortBy
  );
};
const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children && column.children.length > 0) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
function useWatcher$1() {
  var _a;
  const instance = getCurrentInstance();
  const { size: tableSize } = toRefs((_a = instance.proxy) == null ? void 0 : _a.$props);
  const rowKey = ref(null);
  const data = ref([]);
  const _data = ref([]);
  const isComplex = ref(false);
  const _columns = ref([]);
  const originColumns = ref([]);
  const columns = ref([]);
  const fixedColumns = ref([]);
  const rightFixedColumns = ref([]);
  const leafColumns = ref([]);
  const fixedLeafColumns = ref([]);
  const rightFixedLeafColumns = ref([]);
  const updateOrderFns = [];
  const leafColumnsLength = ref(0);
  const fixedLeafColumnsLength = ref(0);
  const rightFixedLeafColumnsLength = ref(0);
  const isAllSelected = ref(false);
  const selection = ref([]);
  const reserveSelection = ref(false);
  const selectOnIndeterminate = ref(false);
  const selectable = ref(null);
  const filters = ref({});
  const filteredData = ref(null);
  const sortingColumn = ref(null);
  const sortProp = ref(null);
  const sortOrder = ref(null);
  const hoverRow = ref(null);
  const selectedMap = computed(() => {
    return rowKey.value ? getKeysMap(selection.value, rowKey.value) : void 0;
  });
  watch(
    data,
    () => {
      var _a2;
      if (instance.state) {
        scheduleLayout(false);
        const needUpdateFixed = instance.props.tableLayout === "auto";
        if (needUpdateFixed) {
          (_a2 = instance.refs.tableHeaderRef) == null ? void 0 : _a2.updateFixedColumnStyle();
        }
      }
    },
    {
      deep: true
    }
  );
  const assertRowKey = () => {
    if (!rowKey.value)
      throw new Error("[ElTable] prop row-key is required");
  };
  const updateChildFixed = (column) => {
    var _a2;
    (_a2 = column.children) == null ? void 0 : _a2.forEach((childColumn) => {
      childColumn.fixed = column.fixed;
      updateChildFixed(childColumn);
    });
  };
  const updateColumns = () => {
    _columns.value.forEach((column) => {
      updateChildFixed(column);
    });
    fixedColumns.value = _columns.value.filter(
      (column) => [true, "left"].includes(column.fixed)
    );
    const selectColumn = _columns.value.find(
      (column) => column.type === "selection"
    );
    let selectColFixLeft;
    if (selectColumn && selectColumn.fixed !== "right" && !fixedColumns.value.includes(selectColumn)) {
      const selectColumnIndex = _columns.value.indexOf(selectColumn);
      if (selectColumnIndex === 0 && fixedColumns.value.length) {
        fixedColumns.value.unshift(selectColumn);
        selectColFixLeft = true;
      }
    }
    rightFixedColumns.value = _columns.value.filter(
      (column) => column.fixed === "right"
    );
    const notFixedColumns = _columns.value.filter(
      (column) => (selectColFixLeft ? column.type !== "selection" : true) && !column.fixed
    );
    originColumns.value = Array.from(fixedColumns.value).concat(notFixedColumns).concat(rightFixedColumns.value);
    const leafColumns2 = doFlattenColumns(notFixedColumns);
    const fixedLeafColumns2 = doFlattenColumns(fixedColumns.value);
    const rightFixedLeafColumns2 = doFlattenColumns(rightFixedColumns.value);
    leafColumnsLength.value = leafColumns2.length;
    fixedLeafColumnsLength.value = fixedLeafColumns2.length;
    rightFixedLeafColumnsLength.value = rightFixedLeafColumns2.length;
    columns.value = Array.from(fixedLeafColumns2).concat(leafColumns2).concat(rightFixedLeafColumns2);
    isComplex.value = fixedColumns.value.length > 0 || rightFixedColumns.value.length > 0;
  };
  const scheduleLayout = (needUpdateColumns, immediate = false) => {
    if (needUpdateColumns) {
      updateColumns();
    }
    if (immediate) {
      instance.state.doLayout();
    } else {
      instance.state.debouncedUpdateLayout();
    }
  };
  const isSelected = (row) => {
    if (selectedMap.value) {
      return !!selectedMap.value[getRowIdentity(row, rowKey.value)];
    } else {
      return selection.value.includes(row);
    }
  };
  const clearSelection = () => {
    isAllSelected.value = false;
    const oldSelection = selection.value;
    selection.value = [];
    if (oldSelection.length) {
      instance.emit("selection-change", []);
    }
  };
  const cleanSelection = () => {
    var _a2, _b;
    let deleted;
    if (rowKey.value) {
      deleted = [];
      const childrenKey = (_b = (_a2 = instance == null ? void 0 : instance.store) == null ? void 0 : _a2.states) == null ? void 0 : _b.childrenColumnName.value;
      const dataMap = getKeysMap(data.value, rowKey.value, true, childrenKey);
      for (const key in selectedMap.value) {
        if (hasOwn(selectedMap.value, key) && !dataMap[key]) {
          deleted.push(selectedMap.value[key].row);
        }
      }
    } else {
      deleted = selection.value.filter((item) => !data.value.includes(item));
    }
    if (deleted.length) {
      const newSelection = selection.value.filter(
        (item) => !deleted.includes(item)
      );
      selection.value = newSelection;
      instance.emit("selection-change", newSelection.slice());
    }
  };
  const getSelectionRows = () => {
    return (selection.value || []).slice();
  };
  const toggleRowSelection = (row, selected, emitChange = true, ignoreSelectable = false) => {
    var _a2, _b, _c, _d;
    const treeProps = {
      children: (_b = (_a2 = instance == null ? void 0 : instance.store) == null ? void 0 : _a2.states) == null ? void 0 : _b.childrenColumnName.value,
      checkStrictly: (_d = (_c = instance == null ? void 0 : instance.store) == null ? void 0 : _c.states) == null ? void 0 : _d.checkStrictly.value
    };
    const changed = toggleRowStatus(
      selection.value,
      row,
      selected,
      treeProps,
      ignoreSelectable ? void 0 : selectable.value,
      data.value.indexOf(row),
      rowKey.value
    );
    if (changed) {
      const newSelection = (selection.value || []).slice();
      if (emitChange) {
        instance.emit("select", newSelection, row);
      }
      instance.emit("selection-change", newSelection);
    }
  };
  const _toggleAllSelection = () => {
    var _a2, _b;
    const value = selectOnIndeterminate.value ? !isAllSelected.value : !(isAllSelected.value || selection.value.length);
    isAllSelected.value = value;
    let selectionChanged = false;
    let childrenCount = 0;
    const rowKey2 = (_b = (_a2 = instance == null ? void 0 : instance.store) == null ? void 0 : _a2.states) == null ? void 0 : _b.rowKey.value;
    const { childrenColumnName } = instance.store.states;
    const treeProps = {
      children: childrenColumnName.value,
      checkStrictly: false
    };
    data.value.forEach((row, index) => {
      const rowIndex = index + childrenCount;
      if (toggleRowStatus(
        selection.value,
        row,
        value,
        treeProps,
        selectable.value,
        rowIndex,
        rowKey2
      )) {
        selectionChanged = true;
      }
      childrenCount += getChildrenCount(getRowIdentity(row, rowKey2));
    });
    if (selectionChanged) {
      instance.emit(
        "selection-change",
        selection.value ? selection.value.slice() : []
      );
    }
    instance.emit("select-all", (selection.value || []).slice());
  };
  const updateAllSelected = () => {
    var _a2;
    if (((_a2 = data.value) == null ? void 0 : _a2.length) === 0) {
      isAllSelected.value = false;
      return;
    }
    const { childrenColumnName } = instance.store.states;
    let rowIndex = 0;
    let selectedCount = 0;
    const checkSelectedStatus = (data2) => {
      var _a3;
      for (const row of data2) {
        const isRowSelectable = selectable.value && selectable.value.call(null, row, rowIndex);
        if (!isSelected(row)) {
          if (!selectable.value || isRowSelectable) {
            return false;
          }
        } else {
          selectedCount++;
        }
        rowIndex++;
        if (((_a3 = row[childrenColumnName.value]) == null ? void 0 : _a3.length) && !checkSelectedStatus(row[childrenColumnName.value])) {
          return false;
        }
      }
      return true;
    };
    const isAllSelected_ = checkSelectedStatus(data.value || []);
    isAllSelected.value = selectedCount === 0 ? false : isAllSelected_;
  };
  const getChildrenCount = (rowKey2) => {
    var _a2;
    if (!instance || !instance.store)
      return 0;
    const { treeData } = instance.store.states;
    let count = 0;
    const children = (_a2 = treeData.value[rowKey2]) == null ? void 0 : _a2.children;
    if (children) {
      count += children.length;
      children.forEach((childKey) => {
        count += getChildrenCount(childKey);
      });
    }
    return count;
  };
  const updateFilters = (column, values) => {
    const filters_ = {};
    castArray$1(column).forEach((col) => {
      filters.value[col.id] = values;
      filters_[col.columnKey || col.id] = values;
    });
    return filters_;
  };
  const updateSort = (column, prop, order) => {
    if (sortingColumn.value && sortingColumn.value !== column) {
      sortingColumn.value.order = null;
    }
    sortingColumn.value = column;
    sortProp.value = prop;
    sortOrder.value = order;
  };
  const execFilter = () => {
    let sourceData = unref(_data);
    Object.keys(filters.value).forEach((columnId) => {
      const values = filters.value[columnId];
      if (!values || values.length === 0)
        return;
      const column = getColumnById(
        {
          columns: columns.value
        },
        columnId
      );
      if (column && column.filterMethod) {
        sourceData = sourceData.filter((row) => {
          return values.some(
            (value) => column.filterMethod.call(null, value, row, column)
          );
        });
      }
    });
    filteredData.value = sourceData;
  };
  const execSort = () => {
    var _a2;
    data.value = sortData((_a2 = filteredData.value) != null ? _a2 : [], {
      sortingColumn: sortingColumn.value,
      sortProp: sortProp.value,
      sortOrder: sortOrder.value
    });
  };
  const execQuery = (ignore = void 0) => {
    if (!(ignore == null ? void 0 : ignore.filter)) {
      execFilter();
    }
    execSort();
  };
  const clearFilter = (columnKeys) => {
    const { tableHeaderRef } = instance.refs;
    if (!tableHeaderRef)
      return;
    const panels = Object.assign({}, tableHeaderRef.filterPanels);
    const keys = Object.keys(panels);
    if (!keys.length)
      return;
    if (isString(columnKeys)) {
      columnKeys = [columnKeys];
    }
    if (isArray(columnKeys)) {
      const columns_ = columnKeys.map(
        (key) => getColumnByKey(
          {
            columns: columns.value
          },
          key
        )
      );
      keys.forEach((key) => {
        const column = columns_.find((col) => col.id === key);
        if (column) {
          column.filteredValue = [];
        }
      });
      instance.store.commit("filterChange", {
        column: columns_,
        values: [],
        silent: true,
        multi: true
      });
    } else {
      keys.forEach((key) => {
        const column = columns.value.find((col) => col.id === key);
        if (column) {
          column.filteredValue = [];
        }
      });
      filters.value = {};
      instance.store.commit("filterChange", {
        column: {},
        values: [],
        silent: true
      });
    }
  };
  const clearSort = () => {
    if (!sortingColumn.value)
      return;
    updateSort(null, null, null);
    instance.store.commit("changeSortCondition", {
      silent: true
    });
  };
  const {
    setExpandRowKeys,
    toggleRowExpansion,
    updateExpandRows,
    states: expandStates,
    isRowExpanded
  } = useExpand({
    data,
    rowKey
  });
  const {
    updateTreeExpandKeys,
    toggleTreeExpansion,
    updateTreeData,
    updateKeyChildren,
    loadOrToggle,
    states: treeStates
  } = useTree({
    data,
    rowKey
  });
  const {
    updateCurrentRowData,
    updateCurrentRow,
    setCurrentRowKey,
    states: currentData
  } = useCurrent({
    data,
    rowKey
  });
  const setExpandRowKeysAdapter = (val) => {
    setExpandRowKeys(val);
    updateTreeExpandKeys(val);
  };
  const toggleRowExpansionAdapter = (row, expanded) => {
    const hasExpandColumn = columns.value.some(({ type }) => type === "expand");
    if (hasExpandColumn) {
      toggleRowExpansion(row, expanded);
    } else {
      toggleTreeExpansion(row, expanded);
    }
  };
  return {
    assertRowKey,
    updateColumns,
    scheduleLayout,
    isSelected,
    clearSelection,
    cleanSelection,
    getSelectionRows,
    toggleRowSelection,
    _toggleAllSelection,
    toggleAllSelection: null,
    updateAllSelected,
    updateFilters,
    updateCurrentRow,
    updateSort,
    execFilter,
    execSort,
    execQuery,
    clearFilter,
    clearSort,
    toggleRowExpansion,
    setExpandRowKeysAdapter,
    setCurrentRowKey,
    toggleRowExpansionAdapter,
    isRowExpanded,
    updateExpandRows,
    updateCurrentRowData,
    loadOrToggle,
    updateTreeData,
    updateKeyChildren,
    states: {
      tableSize,
      rowKey,
      data,
      _data,
      isComplex,
      _columns,
      originColumns,
      columns,
      fixedColumns,
      rightFixedColumns,
      leafColumns,
      fixedLeafColumns,
      rightFixedLeafColumns,
      updateOrderFns,
      leafColumnsLength,
      fixedLeafColumnsLength,
      rightFixedLeafColumnsLength,
      isAllSelected,
      selection,
      reserveSelection,
      selectOnIndeterminate,
      selectable,
      filters,
      filteredData,
      sortingColumn,
      sortProp,
      sortOrder,
      hoverRow,
      ...expandStates,
      ...treeStates,
      ...currentData
    }
  };
}
function replaceColumn(array, column) {
  return array.map((item) => {
    var _a;
    if (item.id === column.id) {
      return column;
    } else if ((_a = item.children) == null ? void 0 : _a.length) {
      item.children = replaceColumn(item.children, column);
    }
    return item;
  });
}
function sortColumn(array) {
  array.forEach((item) => {
    var _a, _b;
    item.no = (_a = item.getColumnIndex) == null ? void 0 : _a.call(item);
    if ((_b = item.children) == null ? void 0 : _b.length) {
      sortColumn(item.children);
    }
  });
  array.sort((cur, pre) => cur.no - pre.no);
}
function useStore() {
  const instance = getCurrentInstance();
  const watcher = useWatcher$1();
  const ns = useNamespace("table");
  const { t } = useLocale();
  const mutations = {
    setData(states, data) {
      const dataInstanceChanged = unref(states._data) !== data;
      states.data.value = data;
      states._data.value = data;
      instance.store.execQuery();
      instance.store.updateCurrentRowData();
      instance.store.updateExpandRows();
      instance.store.updateTreeData(
        instance.store.states.defaultExpandAll.value
      );
      if (unref(states.reserveSelection)) {
        instance.store.assertRowKey();
      } else {
        if (dataInstanceChanged) {
          instance.store.clearSelection();
        } else {
          instance.store.cleanSelection();
        }
      }
      instance.store.updateAllSelected();
      if (instance.$ready) {
        instance.store.scheduleLayout();
      }
    },
    insertColumn(states, column, parent, updateColumnOrder) {
      var _a;
      const array = unref(states._columns);
      let newColumns = [];
      if (!parent) {
        array.push(column);
        newColumns = array;
      } else {
        if (parent && !parent.children) {
          parent.children = [];
        }
        (_a = parent.children) == null ? void 0 : _a.push(column);
        newColumns = replaceColumn(array, parent);
      }
      sortColumn(newColumns);
      states._columns.value = newColumns;
      states.updateOrderFns.push(updateColumnOrder);
      if (column.type === "selection") {
        states.selectable.value = column.selectable;
        states.reserveSelection.value = column.reserveSelection;
      }
      if (instance.$ready) {
        instance.store.updateColumns();
        instance.store.scheduleLayout();
      }
    },
    updateColumnOrder(states, column) {
      var _a;
      const newColumnIndex = (_a = column.getColumnIndex) == null ? void 0 : _a.call(column);
      if (newColumnIndex === column.no)
        return;
      sortColumn(states._columns.value);
      if (instance.$ready) {
        instance.store.updateColumns();
      }
    },
    removeColumn(states, column, parent, updateColumnOrder) {
      var _a;
      const array = unref(states._columns) || [];
      if (parent) {
        (_a = parent.children) == null ? void 0 : _a.splice(
          parent.children.findIndex((item) => item.id === column.id),
          1
        );
        nextTick(() => {
          var _a2;
          if (((_a2 = parent.children) == null ? void 0 : _a2.length) === 0) {
            delete parent.children;
          }
        });
        states._columns.value = replaceColumn(array, parent);
      } else {
        const index = array.indexOf(column);
        if (index > -1) {
          array.splice(index, 1);
          states._columns.value = array;
        }
      }
      const updateFnIndex = states.updateOrderFns.indexOf(updateColumnOrder);
      updateFnIndex > -1 && states.updateOrderFns.splice(updateFnIndex, 1);
      if (instance.$ready) {
        instance.store.updateColumns();
        instance.store.scheduleLayout();
      }
    },
    sort(states, options) {
      const { prop, order, init } = options;
      if (prop) {
        const column = unref(states.columns).find(
          (column2) => column2.property === prop
        );
        if (column) {
          column.order = order;
          instance.store.updateSort(column, prop, order);
          instance.store.commit("changeSortCondition", { init });
        }
      }
    },
    changeSortCondition(states, options) {
      const { sortingColumn, sortProp, sortOrder } = states;
      const columnValue = unref(sortingColumn), propValue = unref(sortProp), orderValue = unref(sortOrder);
      if (isNull(orderValue)) {
        states.sortingColumn.value = null;
        states.sortProp.value = null;
      }
      const ignore = { filter: true };
      instance.store.execQuery(ignore);
      if (!options || !(options.silent || options.init)) {
        instance.emit("sort-change", {
          column: columnValue,
          prop: propValue,
          order: orderValue
        });
      }
      instance.store.updateTableScrollY();
    },
    filterChange(_states, options) {
      const { column, values, silent } = options;
      const newFilters = instance.store.updateFilters(column, values);
      instance.store.execQuery();
      if (!silent) {
        instance.emit("filter-change", newFilters);
      }
      instance.store.updateTableScrollY();
    },
    toggleAllSelection() {
      var _a, _b;
      (_b = (_a = instance.store).toggleAllSelection) == null ? void 0 : _b.call(_a);
    },
    rowSelectedChanged(_states, row) {
      instance.store.toggleRowSelection(row);
      instance.store.updateAllSelected();
    },
    setHoverRow(states, row) {
      states.hoverRow.value = row;
    },
    setCurrentRow(_states, row) {
      instance.store.updateCurrentRow(row);
    }
  };
  const commit = function(name, ...args) {
    const mutations2 = instance.store.mutations;
    if (mutations2[name]) {
      mutations2[name].apply(instance, [
        instance.store.states,
        ...args
      ]);
    } else {
      throw new Error(`Action not found: ${name}`);
    }
  };
  const updateTableScrollY = function() {
    nextTick(() => instance.layout.updateScrollY.apply(instance.layout));
  };
  return {
    ns,
    t,
    ...watcher,
    mutations,
    commit,
    updateTableScrollY
  };
}
const InitialStateMap = {
  rowKey: "rowKey",
  defaultExpandAll: "defaultExpandAll",
  selectOnIndeterminate: "selectOnIndeterminate",
  indent: "indent",
  lazy: "lazy",
  ["treeProps.hasChildren"]: {
    key: "lazyColumnIdentifier",
    default: "hasChildren"
  },
  ["treeProps.children"]: {
    key: "childrenColumnName",
    default: "children"
  },
  ["treeProps.checkStrictly"]: {
    key: "checkStrictly",
    default: false
  }
};
function createStore(table, props) {
  if (!table) {
    throw new Error("Table is required.");
  }
  const store = useStore();
  store.toggleAllSelection = debounce(store._toggleAllSelection, 10);
  Object.keys(InitialStateMap).forEach((key) => {
    handleValue(getArrKeysValue(props, key), key, store);
  });
  proxyTableProps(store, props);
  return store;
}
function proxyTableProps(store, props) {
  Object.keys(InitialStateMap).forEach((key) => {
    watch(
      () => getArrKeysValue(props, key),
      (value) => {
        handleValue(value, key, store);
      }
    );
  });
}
function handleValue(value, propsKey, store) {
  let newVal = value;
  let storeKey = InitialStateMap[propsKey];
  if (isObject(storeKey)) {
    newVal = newVal || storeKey.default;
    storeKey = storeKey.key;
  }
  store.states[storeKey].value = newVal;
}
function getArrKeysValue(props, key) {
  if (key.includes(".")) {
    const keyList = key.split(".");
    let value = props;
    keyList.forEach((k) => {
      value = value[k];
    });
    return value;
  } else {
    return props[key];
  }
}
class TableLayout {
  constructor(options) {
    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = [];
    this.fit = true;
    this.showHeader = true;
    this.height = ref(null);
    this.scrollX = ref(false);
    this.scrollY = ref(false);
    this.bodyWidth = ref(null);
    this.fixedWidth = ref(null);
    this.rightFixedWidth = ref(null);
    this.gutterWidth = 0;
    for (const name in options) {
      if (hasOwn(options, name)) {
        if (isRef(this[name])) {
          this[name].value = options[name];
        } else {
          this[name] = options[name];
        }
      }
    }
    if (!this.table) {
      throw new Error("Table is required for Table Layout");
    }
    if (!this.store) {
      throw new Error("Store is required for Table Layout");
    }
  }
  updateScrollY() {
    const height = this.height.value;
    if (isNull(height))
      return false;
    const scrollBarRef = this.table.refs.scrollBarRef;
    if (this.table.vnode.el && (scrollBarRef == null ? void 0 : scrollBarRef.wrapRef)) {
      let scrollY = true;
      const prevScrollY = this.scrollY.value;
      scrollY = scrollBarRef.wrapRef.scrollHeight > scrollBarRef.wrapRef.clientHeight;
      this.scrollY.value = scrollY;
      return prevScrollY !== scrollY;
    }
    return false;
  }
  setHeight(value, prop = "height") {
    if (!isClient)
      return;
    const el = this.table.vnode.el;
    value = parseHeight(value);
    this.height.value = Number(value);
    if (!el && (value || value === 0)) {
      nextTick(() => this.setHeight(value, prop));
      return;
    }
    if (el && isNumber(value)) {
      el.style[prop] = `${value}px`;
      this.updateElsHeight();
    } else if (el && isString(value)) {
      el.style[prop] = value;
      this.updateElsHeight();
    }
  }
  setMaxHeight(value) {
    this.setHeight(value, "max-height");
  }
  getFlattenColumns() {
    const flattenColumns = [];
    const columns = this.table.store.states.columns.value;
    columns.forEach((column) => {
      if (column.isColumnGroup) {
        flattenColumns.push.apply(flattenColumns, column.columns);
      } else {
        flattenColumns.push(column);
      }
    });
    return flattenColumns;
  }
  updateElsHeight() {
    this.updateScrollY();
    this.notifyObservers("scrollable");
  }
  headerDisplayNone(elm) {
    if (!elm)
      return true;
    let headerChild = elm;
    while (headerChild.tagName !== "DIV") {
      if (getComputedStyle(headerChild).display === "none") {
        return true;
      }
      headerChild = headerChild.parentElement;
    }
    return false;
  }
  updateColumnsWidth() {
    var _a;
    if (!isClient)
      return;
    const fit = this.fit;
    const bodyWidth = (_a = this.table.vnode.el) == null ? void 0 : _a.clientWidth;
    let bodyMinWidth = 0;
    const flattenColumns = this.getFlattenColumns();
    const flexColumns = flattenColumns.filter(
      (column) => !isNumber(column.width)
    );
    flattenColumns.forEach((column) => {
      if (isNumber(column.width) && column.realWidth)
        column.realWidth = null;
    });
    if (flexColumns.length > 0 && fit) {
      flattenColumns.forEach((column) => {
        bodyMinWidth += Number(column.width || column.minWidth || 80);
      });
      if (bodyMinWidth <= bodyWidth) {
        this.scrollX.value = false;
        const totalFlexWidth = bodyWidth - bodyMinWidth;
        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth;
        } else {
          const allColumnsWidth = flexColumns.reduce(
            (prev, column) => prev + Number(column.minWidth || 80),
            0
          );
          const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
          let noneFirstWidth = 0;
          flexColumns.forEach((column, index) => {
            if (index === 0)
              return;
            const flexWidth = Math.floor(
              Number(column.minWidth || 80) * flexWidthPerPixel
            );
            noneFirstWidth += flexWidth;
            column.realWidth = Number(column.minWidth || 80) + flexWidth;
          });
          flexColumns[0].realWidth = Number(flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
        }
      } else {
        this.scrollX.value = true;
        flexColumns.forEach((column) => {
          column.realWidth = Number(column.minWidth);
        });
      }
      this.bodyWidth.value = Math.max(bodyMinWidth, bodyWidth);
      this.table.state.resizeState.value.width = this.bodyWidth.value;
    } else {
      flattenColumns.forEach((column) => {
        if (!column.width && !column.minWidth) {
          column.realWidth = 80;
        } else {
          column.realWidth = Number(column.width || column.minWidth);
        }
        bodyMinWidth += column.realWidth;
      });
      this.scrollX.value = bodyMinWidth > bodyWidth;
      this.bodyWidth.value = bodyMinWidth;
    }
    const fixedColumns = this.store.states.fixedColumns.value;
    if (fixedColumns.length > 0) {
      let fixedWidth = 0;
      fixedColumns.forEach((column) => {
        fixedWidth += Number(column.realWidth || column.width);
      });
      this.fixedWidth.value = fixedWidth;
    }
    const rightFixedColumns = this.store.states.rightFixedColumns.value;
    if (rightFixedColumns.length > 0) {
      let rightFixedWidth = 0;
      rightFixedColumns.forEach((column) => {
        rightFixedWidth += Number(column.realWidth || column.width);
      });
      this.rightFixedWidth.value = rightFixedWidth;
    }
    this.notifyObservers("columns");
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  notifyObservers(event) {
    const observers = this.observers;
    observers.forEach((observer) => {
      var _a, _b;
      switch (event) {
        case "columns":
          (_a = observer.state) == null ? void 0 : _a.onColumnsChange(this);
          break;
        case "scrollable":
          (_b = observer.state) == null ? void 0 : _b.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${event}.`);
      }
    });
  }
}
const checkboxProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: void 0
  },
  label: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  value: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  indeterminate: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  checked: Boolean,
  name: {
    type: String,
    default: void 0
  },
  trueValue: {
    type: [String, Number],
    default: void 0
  },
  falseValue: {
    type: [String, Number],
    default: void 0
  },
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  id: {
    type: String,
    default: void 0
  },
  border: Boolean,
  size: useSizeProp,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: String,
  ...useAriaProps(["ariaControls"])
};
const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  change: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const checkboxGroupContextKey = /* @__PURE__ */ Symbol("checkboxGroupContextKey");
const useCheckboxDisabled = ({
  model,
  isChecked
}) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const formContext = inject(formContextKey, void 0);
  const isLimitDisabled = computed(() => {
    var _a, _b;
    const max = (_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value;
    const min = (_b = checkboxGroup == null ? void 0 : checkboxGroup.min) == null ? void 0 : _b.value;
    return !isUndefined(max) && model.value.length >= max && !isChecked.value || !isUndefined(min) && model.value.length <= min && isChecked.value;
  });
  const isDisabled = useFormDisabled(
    computed(() => {
      var _a, _b;
      if (checkboxGroup === void 0) {
        return (_a = formContext == null ? void 0 : formContext.disabled) != null ? _a : isLimitDisabled.value;
      } else {
        return ((_b = checkboxGroup.disabled) == null ? void 0 : _b.value) || isLimitDisabled.value;
      }
    })
  );
  return {
    isDisabled,
    isLimitDisabled
  };
};
const useCheckboxEvent = (props, {
  model,
  isLimitExceeded,
  hasOwnLabel,
  isDisabled,
  isLabeledByFormItem
}) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const { formItem } = useFormItem();
  const { emit } = getCurrentInstance();
  function getLabeledValue(value) {
    var _a, _b, _c, _d;
    return [true, props.trueValue, props.trueLabel].includes(value) ? (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true : (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false;
  }
  function emitChangeEvent(checked, e) {
    emit(CHANGE_EVENT, getLabeledValue(checked), e);
  }
  function handleChange(e) {
    if (isLimitExceeded.value)
      return;
    const target = e.target;
    emit(CHANGE_EVENT, getLabeledValue(target.checked), e);
  }
  async function onClickRoot(e) {
    if (isLimitExceeded.value)
      return;
    if (!hasOwnLabel.value && !isDisabled.value && isLabeledByFormItem.value) {
      const eventTargets = e.composedPath();
      const hasLabel = eventTargets.some(
        (item) => item.tagName === "LABEL"
      );
      if (!hasLabel) {
        model.value = getLabeledValue(
          [false, props.falseValue, props.falseLabel].includes(model.value)
        );
        await nextTick();
        emitChangeEvent(model.value, e);
      }
    }
  }
  const validateEvent = computed(
    () => (checkboxGroup == null ? void 0 : checkboxGroup.validateEvent) || props.validateEvent
  );
  watch(
    () => props.modelValue,
    () => {
      if (validateEvent.value) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
      }
    }
  );
  return {
    handleChange,
    onClickRoot
  };
};
const useCheckboxModel = (props) => {
  const selfModel = ref(false);
  const { emit } = getCurrentInstance();
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const isGroup = computed(() => isUndefined(checkboxGroup) === false);
  const isLimitExceeded = ref(false);
  const model = computed({
    get() {
      var _a, _b;
      return isGroup.value ? (_a = checkboxGroup == null ? void 0 : checkboxGroup.modelValue) == null ? void 0 : _a.value : (_b = props.modelValue) != null ? _b : selfModel.value;
    },
    set(val) {
      var _a, _b;
      if (isGroup.value && isArray(val)) {
        isLimitExceeded.value = ((_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value) !== void 0 && val.length > (checkboxGroup == null ? void 0 : checkboxGroup.max.value) && val.length > model.value.length;
        isLimitExceeded.value === false && ((_b = checkboxGroup == null ? void 0 : checkboxGroup.changeEvent) == null ? void 0 : _b.call(checkboxGroup, val));
      } else {
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.value = val;
      }
    }
  });
  return {
    model,
    isGroup,
    isLimitExceeded
  };
};
const useCheckboxStatus = (props, slots, { model }) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const isFocused = ref(false);
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const isChecked = computed(() => {
    const value = model.value;
    if (isBoolean(value)) {
      return value;
    } else if (isArray(value)) {
      if (isObject(actualValue.value)) {
        return value.map(toRaw).some((o) => isEqual(o, actualValue.value));
      } else {
        return value.map(toRaw).includes(actualValue.value);
      }
    } else if (value !== null && value !== void 0) {
      return value === props.trueValue || value === props.trueLabel;
    } else {
      return !!value;
    }
  });
  const checkboxButtonSize = useFormSize(
    computed(() => {
      var _a;
      return (_a = checkboxGroup == null ? void 0 : checkboxGroup.size) == null ? void 0 : _a.value;
    }),
    {
      prop: true
    }
  );
  const checkboxSize = useFormSize(computed(() => {
    var _a;
    return (_a = checkboxGroup == null ? void 0 : checkboxGroup.size) == null ? void 0 : _a.value;
  }));
  const hasOwnLabel = computed(() => {
    return !!slots.default || !isPropAbsent(actualValue.value);
  });
  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue
  };
};
const useCheckbox = (props, slots) => {
  const { formItem: elFormItem } = useFormItem();
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props);
  const {
    isFocused,
    isChecked,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    actualValue
  } = useCheckboxStatus(props, slots, { model });
  const { isDisabled } = useCheckboxDisabled({ model, isChecked });
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: elFormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup
  });
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem
  });
  const setStoreValue = () => {
    function addToStore() {
      var _a, _b;
      if (isArray(model.value) && !model.value.includes(actualValue.value)) {
        model.value.push(actualValue.value);
      } else {
        model.value = (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true;
      }
    }
    props.checked && addToStore();
  };
  setStoreValue();
  useDeprecated(
    {
      from: "label act as value",
      replacement: "value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => isGroup.value && isPropAbsent(props.value))
  );
  useDeprecated(
    {
      from: "true-label",
      replacement: "true-value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => !!props.trueLabel)
  );
  useDeprecated(
    {
      from: "false-label",
      replacement: "false-value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => !!props.falseLabel)
  );
  return {
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isFocused,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    model,
    actualValue,
    handleChange,
    onClickRoot
  };
};
const _hoisted_1$6 = ["id", "indeterminate", "name", "tabindex", "disabled"];
const _sfc_main$a = defineComponent({
  ...{
    name: "ElCheckbox"
  },
  __name: "checkbox",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isFocused,
      checkboxSize,
      hasOwnLabel,
      model,
      actualValue,
      handleChange,
      onClickRoot
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const ns = useNamespace("checkbox");
    const compKls = computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(!unref(hasOwnLabel) && unref(isLabeledByFormItem) ? "span" : "label"), {
        for: !unref(hasOwnLabel) && unref(isLabeledByFormItem) ? null : unref(inputId),
        class: normalizeClass(compKls.value),
        "aria-controls": _ctx.indeterminate ? _ctx.ariaControls : null,
        "aria-checked": _ctx.indeterminate ? "mixed" : void 0,
        "aria-label": _ctx.ariaLabel,
        onClick: unref(onClickRoot)
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(spanKls.value)
            },
            [
              withDirectives(createElementVNode("input", mergeProps({
                id: unref(inputId),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
                class: unref(ns).e("original"),
                type: "checkbox",
                indeterminate: _ctx.indeterminate,
                name: _ctx.name,
                tabindex: _ctx.tabindex,
                disabled: unref(isDisabled)
              }, inputBindings.value, {
                onChange: _cache[1] || (_cache[1] = (...args) => unref(handleChange) && unref(handleChange)(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
                onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
                onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["stop"]))
              }), null, 16, _hoisted_1$6), [
                [vModelCheckbox, unref(model)]
              ]),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("inner"))
                },
                null,
                2
              )
            ],
            2
          ),
          unref(hasOwnLabel) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("label"))
            },
            [
              renderSlot(_ctx.$slots, "default"),
              !_ctx.$slots.default ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.label),
                    1
                  )
                ],
                64
              )) : createCommentVNode("v-if", true)
            ],
            2
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["for", "class", "aria-controls", "aria-checked", "aria-label", "onClick"]);
    };
  }
});
var Checkbox = /* @__PURE__ */ _export_sfc$1(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
const _hoisted_1$5 = ["name", "tabindex", "disabled"];
const _sfc_main$9 = defineComponent({
  ...{
    name: "ElCheckboxButton"
  },
  __name: "checkbox-button",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      isFocused,
      isChecked,
      isDisabled,
      checkboxButtonSize,
      model,
      actualValue,
      handleChange
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const checkboxGroup = inject(checkboxGroupContextKey, void 0);
    const ns = useNamespace("checkbox");
    const activeStyle = computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
      };
    });
    const labelKls = computed(() => {
      return [
        ns.b("button"),
        ns.bm("button", checkboxButtonSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass(labelKls.value)
        },
        [
          withDirectives(createElementVNode("input", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
            class: unref(ns).be("button", "original"),
            type: "checkbox",
            name: _ctx.name,
            tabindex: _ctx.tabindex,
            disabled: unref(isDisabled)
          }, inputBindings.value, {
            onChange: _cache[1] || (_cache[1] = (...args) => unref(handleChange) && unref(handleChange)(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
            onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
            onClick: _cache[4] || (_cache[4] = withModifiers(() => {
            }, ["stop"]))
          }), null, 16, _hoisted_1$5), [
            [vModelCheckbox, unref(model)]
          ]),
          _ctx.$slots.default || _ctx.label ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(isChecked) ? activeStyle.value : void 0)
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                )
              ])
            ],
            6
          )) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var CheckboxButton = /* @__PURE__ */ _export_sfc$1(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
const checkboxGroupProps = buildProps({
  modelValue: {
    type: definePropType(Array),
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  min: Number,
  max: Number,
  size: useSizeProp,
  fill: String,
  textColor: String,
  tag: {
    type: String,
    default: "div"
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  options: {
    type: definePropType(Array)
  },
  props: {
    type: definePropType(Object),
    default: () => checkboxDefaultProps
  },
  type: {
    type: String,
    values: ["checkbox", "button"],
    default: "checkbox"
  },
  ...useAriaProps(["ariaLabel"])
});
const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isArray(val),
  change: (val) => isArray(val)
};
const checkboxDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const _sfc_main$8 = defineComponent({
  ...{
    name: "ElCheckboxGroup"
  },
  __name: "checkbox-group",
  props: checkboxGroupProps,
  emits: checkboxGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox");
    const checkboxDisabled = useFormDisabled();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = async (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      await nextTick();
      emit(CHANGE_EVENT, value);
    };
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    const aliasProps = computed(() => ({
      ...checkboxDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return { ...omit(option, [label, value, disabled]), ...base };
    };
    const optionComponent = computed(
      () => props.type === "button" ? CheckboxButton : Checkbox
    );
    provide(checkboxGroupContextKey, {
      ...pick(toRefs(props), [
        "size",
        "min",
        "max",
        "validateEvent",
        "fill",
        "textColor"
      ]),
      disabled: checkboxDisabled,
      modelValue,
      changeEvent
    });
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
        }
      }
    );
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        id: unref(groupId),
        class: normalizeClass(unref(ns).b("group")),
        role: "group",
        "aria-label": !unref(isLabeledByFormItem) ? _ctx.ariaLabel || "checkbox-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? (_a = unref(formItem)) == null ? void 0 : _a.labelId : void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(_ctx.options, (item, index) => {
                return openBlock(), createBlock(
                  resolveDynamicComponent(optionComponent.value),
                  mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)),
                  null,
                  16
                );
              }),
              128
            ))
          ])
        ]),
        _: 3
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});
var CheckboxGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
const ElCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup
});
withNoopInstall(CheckboxButton);
const ElCheckboxGroup = withNoopInstall(CheckboxGroup);
const _sfc_main$7 = defineComponent({
  name: "ElTableFilterPanel",
  components: {
    ElCheckbox,
    ElCheckboxGroup,
    ElScrollbar,
    ElTooltip,
    ElIcon,
    ArrowDown: arrow_down_default,
    ArrowUp: arrow_up_default
  },
  props: {
    placement: {
      type: String,
      default: "bottom-start"
    },
    store: {
      type: Object
    },
    column: {
      type: Object
    },
    upDataColumn: {
      type: Function
    },
    appendTo: useTooltipContentProps.appendTo
  },
  setup(props) {
    const instance = getCurrentInstance();
    const { t } = useLocale();
    const ns = useNamespace("table-filter");
    const parent = instance == null ? void 0 : instance.parent;
    if (props.column && !parent.filterPanels.value[props.column.id]) {
      parent.filterPanels.value[props.column.id] = instance;
    }
    const tooltipRef = ref(null);
    const rootRef = ref(null);
    const checkedIndex = ref(0);
    const filters = computed(() => {
      return props.column && props.column.filters;
    });
    const filterClassName = computed(() => {
      if (props.column && props.column.filterClassName) {
        return `${ns.b()} ${props.column.filterClassName}`;
      }
      return ns.b();
    });
    const filterValue = computed({
      get: () => {
        var _a;
        return (((_a = props.column) == null ? void 0 : _a.filteredValue) || [])[0];
      },
      set: (value) => {
        if (filteredValue.value) {
          if (!isPropAbsent(value)) {
            filteredValue.value.splice(0, 1, value);
          } else {
            filteredValue.value.splice(0, 1);
          }
        }
      }
    });
    const filteredValue = computed({
      get() {
        if (props.column) {
          return props.column.filteredValue || [];
        }
        return [];
      },
      set(value) {
        var _a;
        if (props.column) {
          (_a = props.upDataColumn) == null ? void 0 : _a.call(props, "filteredValue", value);
        }
      }
    });
    const multiple = computed(() => {
      if (props.column) {
        return props.column.filterMultiple;
      }
      return true;
    });
    const isActive = (filter) => {
      return filter.value === filterValue.value;
    };
    const hidden = () => {
      var _a;
      (_a = tooltipRef.value) == null ? void 0 : _a.onClose();
    };
    const handleConfirm = () => {
      confirmFilter(filteredValue.value);
      hidden();
    };
    const handleReset = () => {
      filteredValue.value = [];
      confirmFilter(filteredValue.value);
      hidden();
    };
    const handleSelect = (_filterValue, index) => {
      filterValue.value = _filterValue;
      checkedIndex.value = index;
      if (!isPropAbsent(_filterValue)) {
        confirmFilter(filteredValue.value);
      } else {
        confirmFilter([]);
      }
      hidden();
    };
    const confirmFilter = (filteredValue2) => {
      var _a, _b;
      (_a = props.store) == null ? void 0 : _a.commit("filterChange", {
        column: props.column,
        values: filteredValue2
      });
      (_b = props.store) == null ? void 0 : _b.updateAllSelected();
    };
    const handleShowTooltip = () => {
      var _a, _b;
      (_a = rootRef.value) == null ? void 0 : _a.focus();
      !multiple.value && initCheckedIndex();
      if (props.column) {
        (_b = props.upDataColumn) == null ? void 0 : _b.call(props, "filterOpened", true);
      }
    };
    const handleHideTooltip = () => {
      var _a;
      if (props.column) {
        (_a = props.upDataColumn) == null ? void 0 : _a.call(props, "filterOpened", false);
      }
    };
    const initCheckedIndex = () => {
      if (isPropAbsent(filterValue)) {
        checkedIndex.value = 0;
        return;
      }
      const idx = (filters.value || []).findIndex((item) => {
        return item.value === filterValue.value;
      });
      checkedIndex.value = idx >= 0 ? idx + 1 : 0;
    };
    const handleKeydown = (event) => {
      var _a, _b;
      const code = getEventCode(event);
      const len = (filters.value ? filters.value.length : 0) + 1;
      let index = checkedIndex.value;
      let isPreventDefault = true;
      switch (code) {
        case EVENT_CODE.down:
        case EVENT_CODE.right:
          index = (index + 1) % len;
          break;
        case EVENT_CODE.up:
        case EVENT_CODE.left:
          index = (index - 1 + len) % len;
          break;
        case EVENT_CODE.tab:
          hidden();
          isPreventDefault = false;
          break;
        case EVENT_CODE.enter:
        case EVENT_CODE.space:
          if (index === 0) {
            handleSelect(null, 0);
          } else {
            const item = (filters.value || [])[index - 1];
            item.value && handleSelect(item.value, index);
          }
          break;
        default:
          isPreventDefault = false;
          break;
      }
      isPreventDefault && event.preventDefault();
      checkedIndex.value = index;
      (_b = (_a = rootRef.value) == null ? void 0 : _a.querySelector(
        `.${ns.e("list-item")}:nth-child(${index + 1})`
      )) == null ? void 0 : _b.focus();
    };
    return {
      multiple,
      filterClassName,
      filteredValue,
      filterValue,
      filters,
      handleConfirm,
      handleReset,
      handleSelect,
      isPropAbsent,
      isActive,
      t,
      ns,
      tooltipRef,
      rootRef,
      checkedIndex,
      handleShowTooltip,
      handleHideTooltip,
      handleKeydown
    };
  }
});
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$3 = ["tabindex", "aria-checked"];
const _hoisted_3 = ["tabindex", "aria-checked", "onClick"];
const _hoisted_4 = ["aria-label"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_arrow_up = resolveComponent("arrow-up");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createBlock(_component_el_tooltip, {
    ref: "tooltipRef",
    offset: 0,
    placement: _ctx.placement,
    "show-arrow": false,
    trigger: "click",
    role: "dialog",
    teleported: "",
    effect: "light",
    pure: "",
    loop: "",
    "popper-class": _ctx.filterClassName,
    persistent: "",
    "append-to": _ctx.appendTo,
    onShow: _ctx.handleShowTooltip,
    onHide: _ctx.handleHideTooltip
  }, {
    content: withCtx(() => [
      _ctx.multiple ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          ref: "rootRef",
          tabindex: "-1",
          class: normalizeClass(_ctx.ns.e("multiple"))
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(_ctx.ns.e("content"))
            },
            [
              createVNode(_component_el_scrollbar, {
                "wrap-class": _ctx.ns.e("wrap")
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_checkbox_group, {
                    modelValue: _ctx.filteredValue,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filteredValue = $event),
                    class: normalizeClass(_ctx.ns.e("checkbox-group"))
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.filters, (filter) => {
                          return openBlock(), createBlock(_component_el_checkbox, {
                            key: filter.value,
                            value: filter.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(filter.text),
                                1
                              )
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }),
                        128
                      ))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "class"])
                ]),
                _: 1
              }, 8, ["wrap-class"])
            ],
            2
          ),
          createElementVNode(
            "div",
            {
              class: normalizeClass(_ctx.ns.e("bottom"))
            },
            [
              createElementVNode("button", {
                class: normalizeClass(_ctx.ns.is("disabled", _ctx.filteredValue.length === 0)),
                disabled: _ctx.filteredValue.length === 0,
                type: "button",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleConfirm && _ctx.handleConfirm(...args))
              }, toDisplayString(_ctx.t("el.table.confirmFilter")), 11, _hoisted_1$4),
              createElementVNode(
                "button",
                {
                  type: "button",
                  onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleReset && _ctx.handleReset(...args))
                },
                toDisplayString(_ctx.t("el.table.resetFilter")),
                1
              )
            ],
            2
          )
        ],
        2
      )) : (openBlock(), createElementBlock(
        "ul",
        {
          key: 1,
          ref: "rootRef",
          tabindex: "-1",
          role: "radiogroup",
          class: normalizeClass(_ctx.ns.e("list")),
          onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
        },
        [
          createElementVNode("li", {
            role: "radio",
            class: normalizeClass([
              _ctx.ns.e("list-item"),
              _ctx.ns.is("active", _ctx.isPropAbsent(_ctx.filterValue))
            ]),
            tabindex: _ctx.checkedIndex === 0 ? 0 : -1,
            "aria-checked": _ctx.isPropAbsent(_ctx.filterValue),
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleSelect(null, 0))
          }, toDisplayString(_ctx.t("el.table.clearFilter")), 11, _hoisted_2$3),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.filters, (filter, idx) => {
              return openBlock(), createElementBlock("li", {
                key: filter.value,
                role: "radio",
                class: normalizeClass([_ctx.ns.e("list-item"), _ctx.ns.is("active", _ctx.isActive(filter))]),
                tabindex: _ctx.checkedIndex === idx + 1 ? 0 : -1,
                "aria-checked": _ctx.isActive(filter),
                onClick: ($event) => _ctx.handleSelect(filter.value, idx + 1)
              }, toDisplayString(filter.text), 11, _hoisted_3);
            }),
            128
          ))
        ],
        34
      ))
    ]),
    default: withCtx(() => {
      var _a;
      return [
        createElementVNode("button", {
          type: "button",
          class: normalizeClass(`${_ctx.ns.namespace.value}-table__column-filter-trigger`),
          "aria-label": _ctx.t("el.table.filterLabel", { column: ((_a = _ctx.column) == null ? void 0 : _a.label) || "" })
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "filter-icon", {}, () => {
                var _a2;
                return [
                  ((_a2 = _ctx.column) == null ? void 0 : _a2.filterOpened) ? (openBlock(), createBlock(_component_arrow_up, { key: 0 })) : (openBlock(), createBlock(_component_arrow_down, { key: 1 }))
                ];
              })
            ]),
            _: 3
          })
        ], 10, _hoisted_4)
      ];
    }),
    _: 3
  }, 8, ["placement", "popper-class", "append-to", "onShow", "onHide"]);
}
var FilterPanel = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue"]]);
function useLayoutObserver(root) {
  getCurrentInstance();
  const tableLayout = computed(() => {
    const layout = root.layout;
    if (!layout) {
      throw new Error("Can not find table layout.");
    }
    return layout;
  });
  const onColumnsChange = (layout) => {
    var _a;
    const cols = ((_a = root.vnode.el) == null ? void 0 : _a.querySelectorAll("colgroup > col")) || [];
    if (!cols.length)
      return;
    const flattenColumns = layout.getFlattenColumns();
    const columnsMap = {};
    flattenColumns.forEach((column) => {
      columnsMap[column.id] = column;
    });
    for (let i = 0, j = cols.length; i < j; i++) {
      const col = cols[i];
      const name = col.getAttribute("name");
      const column = columnsMap[name];
      if (column) {
        col.setAttribute("width", column.realWidth || column.width);
      }
    }
  };
  const onScrollableChange = (layout) => {
    var _a, _b;
    const cols = ((_a = root.vnode.el) == null ? void 0 : _a.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let i = 0, j = cols.length; i < j; i++) {
      const col = cols[i];
      col.setAttribute("width", layout.scrollY.value ? layout.gutterWidth : "0");
    }
    const ths = ((_b = root.vnode.el) == null ? void 0 : _b.querySelectorAll("th.gutter")) || [];
    for (let i = 0, j = ths.length; i < j; i++) {
      const th = ths[i];
      th.style.width = layout.scrollY.value ? `${layout.gutterWidth}px` : "0";
      th.style.display = layout.scrollY.value ? "" : "none";
    }
  };
  return {
    tableLayout: tableLayout.value,
    onColumnsChange,
    onScrollableChange
  };
}
const TABLE_INJECTION_KEY = /* @__PURE__ */ Symbol("ElTable");
function useEvent(props, emit) {
  const instance = getCurrentInstance();
  const parent = inject(TABLE_INJECTION_KEY);
  const handleFilterClick = (event) => {
    event.stopPropagation();
    return;
  };
  const handleHeaderClick = (event, column) => {
    if (!column.filters && column.sortable) {
      handleSortClick(event, column, false);
    } else if (column.filterable && !column.sortable) {
      handleFilterClick(event);
    }
    parent == null ? void 0 : parent.emit("header-click", column, event);
  };
  const handleHeaderContextMenu = (event, column) => {
    parent == null ? void 0 : parent.emit("header-contextmenu", column, event);
  };
  const draggingColumn = ref(null);
  const dragging = ref(false);
  const dragState = ref();
  const handleMouseDown = (event, column) => {
    var _a, _b;
    if (!isClient)
      return;
    if (column.children && column.children.length > 0)
      return;
    if (draggingColumn.value && props.border && draggingColumn.value.id === column.id) {
      dragging.value = true;
      const table = parent;
      emit("set-drag-visible", true);
      const tableEl = table == null ? void 0 : table.vnode.el;
      const tableLeft = tableEl == null ? void 0 : tableEl.getBoundingClientRect().left;
      const columnEl = (_b = (_a = instance == null ? void 0 : instance.vnode) == null ? void 0 : _a.el) == null ? void 0 : _b.querySelector(`th.${column.id}`);
      const columnRect = columnEl.getBoundingClientRect();
      const minLeft = columnRect.left - tableLeft + 30;
      addClass(columnEl, "noclick");
      dragState.value = {
        startMouseLeft: event.clientX,
        startLeft: columnRect.right - tableLeft,
        startColumnLeft: columnRect.left - tableLeft,
        tableLeft
      };
      const resizeProxy = table == null ? void 0 : table.refs.resizeProxy;
      resizeProxy.style.left = `${dragState.value.startLeft}px`;
      (void 0).onselectstart = function() {
        return false;
      };
      (void 0).ondragstart = function() {
        return false;
      };
      const handleMouseMove2 = (event2) => {
        const deltaLeft = event2.clientX - dragState.value.startMouseLeft;
        const proxyLeft = dragState.value.startLeft + deltaLeft;
        resizeProxy.style.left = `${Math.max(minLeft, proxyLeft)}px`;
      };
      const handleMouseUp = () => {
        if (dragging.value) {
          const { startColumnLeft, startLeft } = dragState.value;
          const finalLeft = Number.parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          column.width = column.realWidth = columnWidth;
          table == null ? void 0 : table.emit(
            "header-dragend",
            column.width,
            startLeft - startColumnLeft,
            column,
            event
          );
          requestAnimationFrame(() => {
            props.store.scheduleLayout(false, true);
          });
          (void 0).body.style.cursor = "";
          dragging.value = false;
          draggingColumn.value = null;
          dragState.value = void 0;
          emit("set-drag-visible", false);
        }
        (void 0).removeEventListener("mousemove", handleMouseMove2);
        (void 0).removeEventListener("mouseup", handleMouseUp);
        (void 0).onselectstart = null;
        (void 0).ondragstart = null;
        setTimeout(() => {
          removeClass(columnEl, "noclick");
        }, 0);
      };
      (void 0).addEventListener("mousemove", handleMouseMove2);
      (void 0).addEventListener("mouseup", handleMouseUp);
    }
  };
  const handleMouseMove = (event, column) => {
    var _a;
    if (!props.border || column.children && column.children.length > 0)
      return;
    const el = event.target;
    const target = isElement(el) ? el.closest("th") : null;
    if (!target) {
      return;
    }
    const isSortable = hasClass(target, "is-sortable");
    if (isSortable) {
      const cursor2 = dragging.value ? "col-resize" : "";
      target.style.cursor = cursor2;
      const caret = target.querySelector(".caret-wrapper");
      if (caret) {
        caret.style.cursor = cursor2;
      }
    }
    if (!column.resizable || dragging.value) {
      draggingColumn.value = null;
      return;
    }
    const rect = target.getBoundingClientRect();
    const isLastTh = ((_a = target.parentNode) == null ? void 0 : _a.lastElementChild) === target;
    const allowDrag = props.allowDragLastColumn || !isLastTh;
    const isResizeHandleActive = rect.width > 12 && rect.right - event.clientX < 8 && allowDrag;
    const cursor = isResizeHandleActive ? "col-resize" : "";
    (void 0).body.style.cursor = cursor;
    draggingColumn.value = isResizeHandleActive ? column : null;
    if (isSortable) {
      target.style.cursor = cursor;
    }
  };
  const handleMouseOut = () => {
    if (!isClient || dragging.value)
      return;
    (void 0).body.style.cursor = "";
  };
  const toggleOrder = ({ order, sortOrders }) => {
    if (order === "")
      return sortOrders[0];
    const index = sortOrders.indexOf(order || null);
    return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
  };
  const handleSortClick = (event, column, givenOrder) => {
    var _a;
    event.stopPropagation();
    const order = column.order === givenOrder ? null : givenOrder || toggleOrder(column);
    const target = (_a = event.target) == null ? void 0 : _a.closest("th");
    if (target) {
      if (hasClass(target, "noclick")) {
        removeClass(target, "noclick");
        return;
      }
    }
    if (!column.sortable)
      return;
    const clickTarget = event.currentTarget;
    if (["ascending", "descending"].some(
      (str) => hasClass(clickTarget, str) && !column.sortOrders.includes(str)
    )) {
      return;
    }
    const states = props.store.states;
    let sortProp = states.sortProp.value;
    let sortOrder;
    const sortingColumn = states.sortingColumn.value;
    if (sortingColumn !== column || sortingColumn === column && isNull(sortingColumn.order)) {
      if (sortingColumn) {
        sortingColumn.order = null;
      }
      states.sortingColumn.value = column;
      sortProp = column.property;
    }
    if (!order) {
      sortOrder = column.order = null;
    } else {
      sortOrder = column.order = order;
    }
    states.sortProp.value = sortProp;
    states.sortOrder.value = sortOrder;
    parent == null ? void 0 : parent.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick,
    handleHeaderContextMenu,
    handleMouseDown,
    handleMouseMove,
    handleMouseOut,
    handleSortClick,
    handleFilterClick
  };
}
function useStyle$2(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const ns = useNamespace("table");
  const getHeaderRowStyle = (rowIndex) => {
    const headerRowStyle = parent == null ? void 0 : parent.props.headerRowStyle;
    if (isFunction(headerRowStyle)) {
      return headerRowStyle.call(null, { rowIndex });
    }
    return headerRowStyle;
  };
  const getHeaderRowClass = (rowIndex) => {
    const classes = [];
    const headerRowClassName = parent == null ? void 0 : parent.props.headerRowClassName;
    if (isString(headerRowClassName)) {
      classes.push(headerRowClassName);
    } else if (isFunction(headerRowClassName)) {
      classes.push(headerRowClassName.call(null, { rowIndex }));
    }
    return classes.join(" ");
  };
  const getHeaderCellStyle = (rowIndex, columnIndex, row, column) => {
    var _a;
    let headerCellStyles = (_a = parent == null ? void 0 : parent.props.headerCellStyle) != null ? _a : {};
    if (isFunction(headerCellStyles)) {
      headerCellStyles = headerCellStyles.call(null, {
        rowIndex,
        columnIndex,
        row,
        column
      });
    }
    const fixedStyle = getFixedColumnOffset(
      columnIndex,
      column.fixed,
      props.store,
      row
    );
    ensurePosition(fixedStyle, "left");
    ensurePosition(fixedStyle, "right");
    return Object.assign({}, headerCellStyles, fixedStyle);
  };
  const getHeaderCellClass = (rowIndex, columnIndex, row, column) => {
    const fixedClasses = getFixedColumnsClass(
      ns.b(),
      columnIndex,
      column.fixed,
      props.store,
      row
    );
    const classes = [
      column.id,
      column.order,
      column.headerAlign,
      column.className,
      column.labelClassName,
      ...fixedClasses
    ];
    if (!column.children) {
      classes.push("is-leaf");
    }
    if (column.sortable) {
      classes.push("is-sortable");
    }
    const headerCellClassName = parent == null ? void 0 : parent.props.headerCellClassName;
    if (isString(headerCellClassName)) {
      classes.push(headerCellClassName);
    } else if (isFunction(headerCellClassName)) {
      classes.push(
        headerCellClassName.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        })
      );
    }
    classes.push(ns.e("cell"));
    return classes.filter((className) => Boolean(className)).join(" ");
  };
  return {
    getHeaderRowStyle,
    getHeaderRowClass,
    getHeaderCellStyle,
    getHeaderCellClass
  };
}
const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column, void 0);
  });
  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllColumns(originColumns);
  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
      column.children.forEach((col) => col.isSubColumn = true);
    }
    rows[column.level - 1].push(column);
  });
  return rows;
};
function useUtils$1(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const columnRows = computed(() => {
    return convertToRows(props.store.states.originColumns.value);
  });
  const isGroup = computed(() => {
    const result = columnRows.value.length > 1;
    if (result && parent) {
      parent.state.isGroup.value = true;
    }
    return result;
  });
  const toggleAllSelection = (event) => {
    event.stopPropagation();
    parent == null ? void 0 : parent.store.commit("toggleAllSelection");
  };
  return {
    isGroup,
    toggleAllSelection,
    columnRows
  };
}
var TableHeader = defineComponent({
  name: "ElTableHeader",
  components: {
    ElCheckbox
  },
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: true,
      type: Object
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: "",
          order: ""
        };
      }
    },
    appendFilterPanelTo: {
      type: String
    },
    allowDragLastColumn: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const parent = inject(TABLE_INJECTION_KEY);
    const ns = useNamespace("table");
    const filterPanels = ref({});
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
    const isTableLayoutAuto = (parent == null ? void 0 : parent.props.tableLayout) === "auto";
    const saveIndexSelection = reactive(/* @__PURE__ */ new Map());
    const theadRef = ref();
    const updateFixedColumnStyle = () => {
      setTimeout(() => {
        if (saveIndexSelection.size > 0) {
          saveIndexSelection.forEach((column, key) => {
            const el = theadRef.value.querySelector(
              `.${key.replace(/\s/g, ".")}`
            );
            if (el) {
              const width = el.getBoundingClientRect().width;
              column.width = width || column.width;
            }
          });
          saveIndexSelection.clear();
        }
      });
    };
    watch(saveIndexSelection, updateFixedColumnStyle);
    const {
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick
    } = useEvent(props, emit);
    const {
      getHeaderRowStyle,
      getHeaderRowClass,
      getHeaderCellStyle,
      getHeaderCellClass
    } = useStyle$2(props);
    const { isGroup, toggleAllSelection, columnRows } = useUtils$1(
      props
    );
    const { t } = useLocale();
    instance.state = {
      onColumnsChange,
      onScrollableChange
    };
    instance.filterPanels = filterPanels;
    return {
      ns,
      t,
      filterPanels,
      onColumnsChange,
      onScrollableChange,
      columnRows,
      getHeaderRowClass,
      getHeaderRowStyle,
      getHeaderCellClass,
      getHeaderCellStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick,
      isGroup,
      toggleAllSelection,
      saveIndexSelection,
      isTableLayoutAuto,
      theadRef,
      updateFixedColumnStyle
    };
  },
  render() {
    const {
      ns,
      t,
      isGroup,
      columnRows,
      getHeaderCellStyle,
      getHeaderCellClass,
      getHeaderRowClass,
      getHeaderRowStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleSortClick,
      handleMouseOut,
      store,
      $parent,
      saveIndexSelection,
      isTableLayoutAuto
    } = this;
    let rowSpan = 1;
    return h(
      "thead",
      {
        ref: "theadRef",
        class: ns.is("group", isGroup)
      },
      columnRows.map(
        (subColumns, rowIndex) => h(
          "tr",
          {
            class: getHeaderRowClass(rowIndex),
            key: rowIndex,
            style: getHeaderRowStyle(rowIndex)
          },
          subColumns.map((column, cellIndex) => {
            if (column.rowSpan > rowSpan) {
              rowSpan = column.rowSpan;
            }
            const _class = getHeaderCellClass(
              rowIndex,
              cellIndex,
              subColumns,
              column
            );
            if (isTableLayoutAuto && column.fixed) {
              saveIndexSelection.set(_class, column);
            }
            return h(
              "th",
              {
                class: _class,
                colspan: column.colSpan,
                key: `${column.id}-thead`,
                rowspan: column.rowSpan,
                scope: column.colSpan > 1 ? "colgroup" : "col",
                ariaSort: column.sortable ? column.order : void 0,
                style: getHeaderCellStyle(
                  rowIndex,
                  cellIndex,
                  subColumns,
                  column
                ),
                onClick: ($event) => {
                  var _a;
                  if ((_a = $event.currentTarget) == null ? void 0 : _a.classList.contains(
                    "noclick"
                  )) {
                    return;
                  }
                  handleHeaderClick($event, column);
                },
                onContextmenu: ($event) => handleHeaderContextMenu($event, column),
                onMousedown: ($event) => handleMouseDown($event, column),
                onMousemove: ($event) => handleMouseMove($event, column),
                onMouseout: handleMouseOut
              },
              [
                h(
                  "div",
                  {
                    class: [
                      "cell",
                      column.filteredValue && column.filteredValue.length > 0 ? "highlight" : ""
                    ]
                  },
                  [
                    column.renderHeader ? column.renderHeader({
                      column,
                      $index: cellIndex,
                      store,
                      _self: $parent
                    }) : column.label,
                    column.sortable && h(
                      "button",
                      {
                        type: "button",
                        class: "caret-wrapper",
                        "aria-label": t("el.table.sortLabel", {
                          column: column.label || ""
                        }),
                        onClick: ($event) => handleSortClick($event, column)
                      },
                      [
                        h("i", {
                          onClick: ($event) => handleSortClick($event, column, "ascending"),
                          class: "sort-caret ascending"
                        }),
                        h("i", {
                          onClick: ($event) => handleSortClick($event, column, "descending"),
                          class: "sort-caret descending"
                        })
                      ]
                    ),
                    column.filterable && h(
                      FilterPanel,
                      {
                        store,
                        placement: column.filterPlacement || "bottom-start",
                        appendTo: $parent == null ? void 0 : $parent.appendFilterPanelTo,
                        column,
                        upDataColumn: (key, value) => {
                          column[key] = value;
                        }
                      },
                      {
                        "filter-icon": () => column.renderFilterIcon ? column.renderFilterIcon({
                          filterOpened: column.filterOpened
                        }) : null
                      }
                    )
                  ]
                )
              ]
            );
          })
        )
      )
    );
  }
});
function isGreaterThan(a, b, epsilon = 0.03) {
  return a - b > epsilon;
}
function useEvents(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const tooltipContent = ref("");
  const tooltipTrigger = ref(h("div"));
  const handleEvent = (event, row, name) => {
    var _a, _b, _c;
    const table = parent;
    const cell = getCell(event);
    let column = null;
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    if (cell) {
      column = getColumnByCell(
        {
          columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
        },
        cell,
        namespace
      );
      if (column) {
        table == null ? void 0 : table.emit(`cell-${name}`, row, column, cell, event);
      }
    }
    table == null ? void 0 : table.emit(`row-${name}`, row, column, event);
  };
  const handleDoubleClick = (event, row) => {
    handleEvent(event, row, "dblclick");
  };
  const handleClick = (event, row) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setCurrentRow", row);
    handleEvent(event, row, "click");
  };
  const handleContextMenu = (event, row) => {
    handleEvent(event, row, "contextmenu");
  };
  const handleMouseEnter = debounce((index) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", index);
  }, 30);
  const handleMouseLeave = debounce(() => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", null);
  }, 30);
  const getPadding = (el) => {
    const style = (void 0).getComputedStyle(el, null);
    const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
    const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
    const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
    const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
    return {
      left: paddingLeft,
      right: paddingRight,
      top: paddingTop,
      bottom: paddingBottom
    };
  };
  const toggleRowClassByCell = (rowSpan, event, toggle) => {
    var _a;
    let node = (_a = event == null ? void 0 : event.target) == null ? void 0 : _a.parentNode;
    while (rowSpan > 1) {
      node = node == null ? void 0 : node.nextSibling;
      if (!node || node.nodeName !== "TR")
        break;
      toggle(node, "hover-row hover-fixed-row");
      rowSpan--;
    }
  };
  const handleCellMouseEnter = (event, row, tooltipOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!parent)
      return;
    const table = parent;
    const cell = getCell(event);
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    let column = null;
    if (cell) {
      column = getColumnByCell(
        {
          columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
        },
        cell,
        namespace
      );
      if (!column) {
        return;
      }
      if (cell.rowSpan > 1) {
        toggleRowClassByCell(cell.rowSpan, event, addClass);
      }
      const hoverState = table.hoverState = {
        cell,
        column,
        row
      };
      table == null ? void 0 : table.emit(
        "cell-mouse-enter",
        hoverState.row,
        hoverState.column,
        hoverState.cell,
        event
      );
    }
    if (!tooltipOptions) {
      if (((_d = removePopper) == null ? void 0 : _d.trigger) === cell) {
        (_e = removePopper) == null ? void 0 : _e();
      }
      return;
    }
    const cellChild = event.target.querySelector(
      ".cell"
    );
    if (!(hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length && ((_f = cellChild.textContent) == null ? void 0 : _f.trim()))) {
      return;
    }
    const range = (void 0).createRange();
    range.setStart(cellChild, 0);
    range.setEnd(cellChild, cellChild.childNodes.length);
    const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
    const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
    const { top, left, right, bottom } = getPadding(cellChild);
    const horizontalPadding = left + right;
    const verticalPadding = top + bottom;
    if (isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth)) {
      createTablePopper(
        tooltipOptions,
        (_g = (cell == null ? void 0 : cell.innerText) || (cell == null ? void 0 : cell.textContent)) != null ? _g : "",
        row,
        column,
        cell,
        table
      );
    } else if (((_h = removePopper) == null ? void 0 : _h.trigger) === cell) {
      (_i = removePopper) == null ? void 0 : _i();
    }
  };
  const handleCellMouseLeave = (event) => {
    const cell = getCell(event);
    if (!cell)
      return;
    if (cell.rowSpan > 1) {
      toggleRowClassByCell(cell.rowSpan, event, removeClass);
    }
    const oldHoverState = parent == null ? void 0 : parent.hoverState;
    parent == null ? void 0 : parent.emit(
      "cell-mouse-leave",
      oldHoverState == null ? void 0 : oldHoverState.row,
      oldHoverState == null ? void 0 : oldHoverState.column,
      oldHoverState == null ? void 0 : oldHoverState.cell,
      event
    );
  };
  return {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger
  };
}
function useStyles(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const ns = useNamespace("table");
  const getRowStyle = (row, rowIndex) => {
    const rowStyle = parent == null ? void 0 : parent.props.rowStyle;
    if (isFunction(rowStyle)) {
      return rowStyle.call(null, {
        row,
        rowIndex
      });
    }
    return rowStyle || null;
  };
  const getRowClass = (row, rowIndex, displayIndex) => {
    var _a;
    const classes = [ns.e("row")];
    if ((parent == null ? void 0 : parent.props.highlightCurrentRow) && row === ((_a = props.store) == null ? void 0 : _a.states.currentRow.value)) {
      classes.push("current-row");
    }
    if (props.stripe && displayIndex % 2 === 1) {
      classes.push(ns.em("row", "striped"));
    }
    const rowClassName = parent == null ? void 0 : parent.props.rowClassName;
    if (isString(rowClassName)) {
      classes.push(rowClassName);
    } else if (isFunction(rowClassName)) {
      classes.push(
        rowClassName.call(null, {
          row,
          rowIndex
        })
      );
    }
    return classes;
  };
  const getCellStyle = (rowIndex, columnIndex, row, column) => {
    const cellStyle = parent == null ? void 0 : parent.props.cellStyle;
    let cellStyles = cellStyle != null ? cellStyle : {};
    if (isFunction(cellStyle)) {
      cellStyles = cellStyle.call(null, {
        rowIndex,
        columnIndex,
        row,
        column
      });
    }
    const fixedStyle = getFixedColumnOffset(
      columnIndex,
      props == null ? void 0 : props.fixed,
      props.store
    );
    ensurePosition(fixedStyle, "left");
    ensurePosition(fixedStyle, "right");
    return Object.assign({}, cellStyles, fixedStyle);
  };
  const getCellClass = (rowIndex, columnIndex, row, column, offset) => {
    const fixedClasses = getFixedColumnsClass(
      ns.b(),
      columnIndex,
      props == null ? void 0 : props.fixed,
      props.store,
      void 0,
      offset
    );
    const classes = [column.id, column.align, column.className, ...fixedClasses];
    const cellClassName = parent == null ? void 0 : parent.props.cellClassName;
    if (isString(cellClassName)) {
      classes.push(cellClassName);
    } else if (isFunction(cellClassName)) {
      classes.push(
        cellClassName.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        })
      );
    }
    classes.push(ns.e("cell"));
    return classes.filter((className) => Boolean(className)).join(" ");
  };
  const getSpan = (row, column, rowIndex, columnIndex) => {
    let rowspan = 1;
    let colspan = 1;
    const fn = parent == null ? void 0 : parent.props.spanMethod;
    if (isFunction(fn)) {
      const result = fn({
        row,
        column,
        rowIndex,
        columnIndex
      });
      if (isArray(result)) {
        rowspan = result[0];
        colspan = result[1];
      } else if (isObject(result)) {
        rowspan = result.rowspan;
        colspan = result.colspan;
      }
    }
    return { rowspan, colspan };
  };
  const getColspanRealWidth = (columns, colspan, index) => {
    if (colspan < 1) {
      return columns[index].realWidth;
    }
    const widthArr = columns.map(({ realWidth, width }) => realWidth || width).slice(index, index + colspan);
    return Number(
      widthArr.reduce((acc, width) => Number(acc) + Number(width), -1)
    );
  };
  return {
    getRowStyle,
    getRowClass,
    getCellStyle,
    getCellClass,
    getSpan,
    getColspanRealWidth
  };
}
const _hoisted_1$3 = ["colspan", "rowspan"];
const _sfc_main$6 = defineComponent({
  ...{
    name: "TableTdWrapper"
  },
  __name: "td-wrapper",
  props: {
    colspan: {
      type: Number,
      default: 1
    },
    rowspan: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("td", {
        colspan: __props.colspan,
        rowspan: __props.rowspan
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_1$3);
    };
  }
});
var TdWrapper = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table-body/td-wrapper.vue"]]);
function useRender$1(props) {
  const parent = inject(TABLE_INJECTION_KEY);
  const ns = useNamespace("table");
  const {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger
  } = useEvents(props);
  const {
    getRowStyle,
    getRowClass,
    getCellStyle,
    getCellClass,
    getSpan,
    getColspanRealWidth
  } = useStyles(props);
  let displayIndex = -1;
  const firstDefaultColumnIndex = computed(() => {
    var _a;
    return (_a = props.store) == null ? void 0 : _a.states.columns.value.findIndex(
      ({ type }) => type === "default"
    );
  });
  const getKeyOfRow = (row, index) => {
    var _a;
    const rowKey = (_a = parent == null ? void 0 : parent.props) == null ? void 0 : _a.rowKey;
    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }
    return index;
  };
  const rowRender = (row, $index, treeRowData, expanded = false) => {
    const { tooltipEffect, tooltipOptions, store } = props;
    const { indent, columns } = store.states;
    const rowClasses = [];
    let display = true;
    if (treeRowData) {
      rowClasses.push(ns.em("row", `level-${treeRowData.level}`));
      display = !!treeRowData.display;
    }
    if ($index === 0) {
      displayIndex = -1;
    }
    if (props.stripe && display) {
      displayIndex++;
    }
    rowClasses.push(...getRowClass(row, $index, displayIndex));
    const displayStyle = display ? null : { display: "none" };
    return h(
      "tr",
      {
        style: [displayStyle, getRowStyle(row, $index)],
        class: rowClasses,
        key: getKeyOfRow(row, $index),
        onDblclick: ($event) => handleDoubleClick($event, row),
        onClick: ($event) => handleClick($event, row),
        onContextmenu: ($event) => handleContextMenu($event, row),
        onMouseenter: () => handleMouseEnter($index),
        onMouseleave: handleMouseLeave
      },
      columns.value.map((column, cellIndex) => {
        const { rowspan, colspan } = getSpan(row, column, $index, cellIndex);
        if (!rowspan || !colspan) {
          return null;
        }
        const columnData = Object.assign({}, column);
        columnData.realWidth = getColspanRealWidth(
          columns.value,
          colspan,
          cellIndex
        );
        const data = {
          store,
          _self: props.context || parent,
          column: columnData,
          row,
          $index,
          cellIndex,
          expanded
        };
        if (cellIndex === firstDefaultColumnIndex.value && treeRowData) {
          data.treeNode = {
            indent: treeRowData.level && treeRowData.level * indent.value,
            level: treeRowData.level
          };
          if (isBoolean(treeRowData.expanded)) {
            data.treeNode.expanded = treeRowData.expanded;
            if ("loading" in treeRowData) {
              data.treeNode.loading = treeRowData.loading;
            }
            if ("noLazyChildren" in treeRowData) {
              data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
            }
          }
        }
        const baseKey = `${getKeyOfRow(row, $index)},${cellIndex}`;
        const patchKey = columnData.columnKey || columnData.rawColumnKey || "";
        const mergedTooltipOptions = column.showOverflowTooltip && merge(
          {
            effect: tooltipEffect
          },
          tooltipOptions,
          column.showOverflowTooltip
        );
        return h(
          TdWrapper,
          {
            style: getCellStyle($index, cellIndex, row, column),
            class: getCellClass($index, cellIndex, row, column, colspan - 1),
            key: `${patchKey}${baseKey}`,
            rowspan,
            colspan,
            onMouseenter: ($event) => handleCellMouseEnter(
              $event,
              row,
              mergedTooltipOptions
            ),
            onMouseleave: handleCellMouseLeave
          },
          {
            default: () => cellChildren(cellIndex, column, data)
          }
        );
      })
    );
  };
  const cellChildren = (_cellIndex, column, data) => {
    return column.renderCell(data);
  };
  const wrappedRowRender = (row, $index) => {
    const store = props.store;
    const { isRowExpanded, assertRowKey } = store;
    const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } = store.states;
    const columns = store.states.columns.value;
    const hasExpandColumn = columns.some(({ type }) => type === "expand");
    if (hasExpandColumn) {
      const expanded = isRowExpanded(row);
      const tr = rowRender(row, $index, void 0, expanded);
      const renderExpanded = parent == null ? void 0 : parent.renderExpanded;
      if (!renderExpanded) {
        console.error("[Element Error]renderExpanded is required.");
        return tr;
      }
      const rows = [[tr]];
      if (parent.props.preserveExpandedContent || expanded) {
        rows[0].push(
          h(
            "tr",
            {
              key: `expanded-row__${tr.key}`,
              style: { display: expanded ? "" : "none" }
            },
            [
              h(
                "td",
                {
                  colspan: columns.length,
                  class: `${ns.e("cell")} ${ns.e("expanded-cell")}`
                },
                [renderExpanded({ row, $index, store, expanded })]
              )
            ]
          )
        );
      }
      return rows;
    } else if (Object.keys(treeData.value).length) {
      assertRowKey();
      const key = getRowIdentity(row, rowKey.value);
      let cur = treeData.value[key];
      let treeRowData = null;
      if (cur) {
        treeRowData = {
          expanded: cur.expanded,
          level: cur.level,
          display: true,
          noLazyChildren: void 0,
          loading: void 0
        };
        if (isBoolean(cur.lazy)) {
          if (treeRowData && isBoolean(cur.loaded) && cur.loaded) {
            treeRowData.noLazyChildren = !(cur.children && cur.children.length);
          }
          treeRowData.loading = cur.loading;
        }
      }
      const tmp = [rowRender(row, $index, treeRowData != null ? treeRowData : void 0)];
      if (cur) {
        let i = 0;
        const traverse = (children, parent2) => {
          if (!(children && children.length && parent2))
            return;
          children.forEach((node) => {
            const innerTreeRowData = {
              display: parent2.display && parent2.expanded,
              level: parent2.level + 1,
              expanded: false,
              noLazyChildren: false,
              loading: false
            };
            const childKey = getRowIdentity(node, rowKey.value);
            if (isPropAbsent(childKey)) {
              throw new Error("For nested data item, row-key is required.");
            }
            cur = { ...treeData.value[childKey] };
            if (cur) {
              innerTreeRowData.expanded = cur.expanded;
              cur.level = cur.level || innerTreeRowData.level;
              cur.display = !!(cur.expanded && innerTreeRowData.display);
              if (isBoolean(cur.lazy)) {
                if (isBoolean(cur.loaded) && cur.loaded) {
                  innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
                }
                innerTreeRowData.loading = cur.loading;
              }
            }
            i++;
            tmp.push(rowRender(node, $index + i, innerTreeRowData));
            if (cur) {
              const nodes2 = lazyTreeNodeMap.value[childKey] || node[childrenColumnName.value];
              traverse(nodes2, cur);
            }
          });
        };
        cur.display = true;
        const nodes = lazyTreeNodeMap.value[key] || row[childrenColumnName.value];
        traverse(nodes, cur);
      }
      return tmp;
    } else {
      return rowRender(row, $index, void 0);
    }
  };
  return {
    wrappedRowRender,
    tooltipContent,
    tooltipTrigger
  };
}
const defaultProps$2 = {
  store: {
    required: true,
    type: Object
  },
  stripe: Boolean,
  tooltipEffect: String,
  tooltipOptions: {
    type: Object
  },
  context: {
    default: () => ({}),
    type: Object
  },
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  fixed: {
    type: String,
    default: ""
  },
  highlight: Boolean
};
var TableBody = defineComponent({
  name: "ElTableBody",
  props: defaultProps$2,
  setup(props) {
    var _a;
    const instance = getCurrentInstance();
    const parent = inject(TABLE_INJECTION_KEY);
    const ns = useNamespace("table");
    const { wrappedRowRender, tooltipContent, tooltipTrigger } = useRender$1(props);
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
    const hoveredCellList = [];
    watch((_a = props.store) == null ? void 0 : _a.states.hoverRow, (newVal, oldVal) => {
      var _a2, _b;
      const el = instance == null ? void 0 : instance.vnode.el;
      const rows = Array.from((el == null ? void 0 : el.children) || []).filter(
        (e) => e == null ? void 0 : e.classList.contains(`${ns.e("row")}`)
      );
      let rowNum = newVal;
      const childNodes = (_a2 = rows[rowNum]) == null ? void 0 : _a2.childNodes;
      if (childNodes == null ? void 0 : childNodes.length) {
        let control = 0;
        const indexes = Array.from(childNodes).reduce((acc, item, index) => {
          var _a3, _b2;
          if (((_a3 = childNodes[index]) == null ? void 0 : _a3.colSpan) > 1) {
            control = (_b2 = childNodes[index]) == null ? void 0 : _b2.colSpan;
          }
          if (item.nodeName !== "TD" && control === 0) {
            acc.push(index);
          }
          control > 0 && control--;
          return acc;
        }, []);
        indexes.forEach((rowIndex) => {
          var _a3;
          rowNum = newVal;
          while (rowNum > 0) {
            const preChildNodes = (_a3 = rows[rowNum - 1]) == null ? void 0 : _a3.childNodes;
            if (preChildNodes[rowIndex] && preChildNodes[rowIndex].nodeName === "TD" && preChildNodes[rowIndex].rowSpan > 1) {
              addClass(preChildNodes[rowIndex], "hover-cell");
              hoveredCellList.push(preChildNodes[rowIndex]);
              break;
            }
            rowNum--;
          }
        });
      } else {
        hoveredCellList.forEach((item) => removeClass(item, "hover-cell"));
        hoveredCellList.length = 0;
      }
      if (!((_b = props.store) == null ? void 0 : _b.states.isComplex.value) || !isClient)
        return;
      rAF(() => {
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow && !oldRow.classList.contains("hover-fixed-row")) {
          removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          addClass(newRow, "hover-row");
        }
      });
    });
    return {
      ns,
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger
    };
  },
  render() {
    const { wrappedRowRender, store } = this;
    const data = (store == null ? void 0 : store.states.data.value) || [];
    return h("tbody", { tabIndex: -1 }, [
      data.reduce((acc, row) => {
        return acc.concat(wrappedRowRender(row, acc.length));
      }, [])
    ]);
  }
});
function useMapState() {
  const table = inject(TABLE_INJECTION_KEY);
  const store = table == null ? void 0 : table.store;
  const leftFixedLeafCount = computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.fixedLeafColumnsLength.value) != null ? _a : 0;
  });
  const rightFixedLeafCount = computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.rightFixedColumns.value.length) != null ? _a : 0;
  });
  const columnsCount = computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.columns.value.length) != null ? _a : 0;
  });
  const leftFixedCount = computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.fixedColumns.value.length) != null ? _a : 0;
  });
  const rightFixedCount = computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.rightFixedColumns.value.length) != null ? _a : 0;
  });
  return {
    leftFixedLeafCount,
    rightFixedLeafCount,
    columnsCount,
    leftFixedCount,
    rightFixedCount,
    columns: computed(() => {
      var _a;
      return (_a = store == null ? void 0 : store.states.columns.value) != null ? _a : [];
    })
  };
}
function useStyle$1(props) {
  const { columns } = useMapState();
  const ns = useNamespace("table");
  const getCellClasses = (columns2, cellIndex) => {
    const column = columns2[cellIndex];
    const classes = [
      ns.e("cell"),
      column.id,
      column.align,
      column.labelClassName,
      ...getFixedColumnsClass(ns.b(), cellIndex, column.fixed, props.store)
    ];
    if (column.className) {
      classes.push(column.className);
    }
    if (!column.children) {
      classes.push(ns.is("leaf"));
    }
    return classes;
  };
  const getCellStyles = (column, cellIndex) => {
    const fixedStyle = getFixedColumnOffset(
      cellIndex,
      column.fixed,
      props.store
    );
    ensurePosition(fixedStyle, "left");
    ensurePosition(fixedStyle, "right");
    return fixedStyle;
  };
  return {
    getCellClasses,
    getCellStyles,
    columns
  };
}
var TableFooter = defineComponent({
  name: "ElTableFooter",
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: true,
      type: Object
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: "",
          order: ""
        };
      }
    }
  },
  setup(props) {
    const parent = inject(TABLE_INJECTION_KEY);
    const ns = useNamespace("table");
    const { getCellClasses, getCellStyles, columns } = useStyle$1(
      props
    );
    const { onScrollableChange, onColumnsChange } = useLayoutObserver(parent);
    return {
      ns,
      onScrollableChange,
      onColumnsChange,
      getCellClasses,
      getCellStyles,
      columns
    };
  },
  render() {
    const { columns, getCellStyles, getCellClasses, summaryMethod, sumText } = this;
    const data = this.store.states.data.value;
    let sums = [];
    if (summaryMethod) {
      sums = summaryMethod({
        columns,
        data
      });
    } else {
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = sumText;
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        const precisions = [];
        let notNumber = true;
        values.forEach((value) => {
          if (!Number.isNaN(+value)) {
            notNumber = false;
            const decimal = `${value}`.split(".")[1];
            precisions.push(decimal ? decimal.length : 0);
          }
        });
        const precision = Math.max.apply(null, precisions);
        if (!notNumber) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!Number.isNaN(+value)) {
              return Number.parseFloat(
                (prev + curr).toFixed(Math.min(precision, 20))
              );
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
    }
    return h(
      h("tfoot", [
        h("tr", {}, [
          ...columns.map(
            (column, cellIndex) => h(
              "td",
              {
                key: cellIndex,
                colspan: column.colSpan,
                rowspan: column.rowSpan,
                class: getCellClasses(columns, cellIndex),
                style: getCellStyles(column, cellIndex)
              },
              [
                h(
                  "div",
                  {
                    class: ["cell", column.labelClassName]
                  },
                  [sums[cellIndex]]
                )
              ]
            )
          )
        ])
      ])
    );
  }
});
function useUtils(store) {
  const setCurrentRow = (row) => {
    store.commit("setCurrentRow", row);
  };
  const getSelectionRows = () => {
    return store.getSelectionRows();
  };
  const toggleRowSelection = (row, selected, ignoreSelectable = true) => {
    store.toggleRowSelection(row, selected, false, ignoreSelectable);
    store.updateAllSelected();
  };
  const clearSelection = () => {
    store.clearSelection();
  };
  const clearFilter = (columnKeys) => {
    store.clearFilter(columnKeys);
  };
  const toggleAllSelection = () => {
    store.commit("toggleAllSelection");
  };
  const toggleRowExpansion = (row, expanded) => {
    store.toggleRowExpansionAdapter(row, expanded);
  };
  const clearSort = () => {
    store.clearSort();
  };
  const sort = (prop, order) => {
    store.commit("sort", { prop, order });
  };
  const updateKeyChildren = (key, data) => {
    store.updateKeyChildren(key, data);
  };
  return {
    setCurrentRow,
    getSelectionRows,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
    updateKeyChildren
  };
}
function useStyle(props, layout, store, table) {
  const isHidden = ref(false);
  const renderExpanded = ref(null);
  const resizeProxyVisible = ref(false);
  const setDragVisible = (visible) => {
    resizeProxyVisible.value = visible;
  };
  const resizeState = ref({
    width: null,
    height: null,
    headerHeight: null
  });
  const isGroup = ref(false);
  const scrollbarViewStyle = {
    display: "inline-block",
    verticalAlign: "middle"
  };
  const tableWidth = ref();
  ref(0);
  const bodyScrollHeight = ref(0);
  const headerScrollHeight = ref(0);
  const footerScrollHeight = ref(0);
  ref(0);
  watch(
    () => props.height,
    (value) => {
      layout.setHeight(value != null ? value : null);
    },
    { immediate: true }
  );
  watch(
    () => props.maxHeight,
    (value) => {
      layout.setMaxHeight(value != null ? value : null);
    },
    { immediate: true }
  );
  watch(
    () => [props.currentRowKey, store.states.rowKey],
    ([currentRowKey, rowKey]) => {
      if (!unref(rowKey) || !unref(currentRowKey))
        return;
      store.setCurrentRowKey(`${currentRowKey}`);
    },
    {
      immediate: true
    }
  );
  watch(
    () => props.data,
    (data) => {
      table.store.commit("setData", data);
    },
    {
      immediate: true,
      deep: true
    }
  );
  watchEffect(() => {
    if (props.expandRowKeys) {
      store.setExpandRowKeysAdapter(props.expandRowKeys);
    }
  });
  const handleMouseLeave = () => {
    table.store.commit("setHoverRow", null);
    if (table.hoverState)
      table.hoverState = null;
  };
  const handleHeaderFooterMousewheel = (_event2, data) => {
    const { pixelX, pixelY } = data;
    if (Math.abs(pixelX) >= Math.abs(pixelY)) {
      table.refs.bodyWrapper.scrollLeft += data.pixelX / 5;
    }
  };
  const shouldUpdateHeight = computed(() => {
    return props.height || props.maxHeight || store.states.fixedColumns.value.length > 0 || store.states.rightFixedColumns.value.length > 0;
  });
  const tableBodyStyles = computed(() => {
    return {
      width: layout.bodyWidth.value ? `${layout.bodyWidth.value}px` : ""
    };
  });
  const doLayout = () => {
    if (shouldUpdateHeight.value) {
      layout.updateElsHeight();
    }
    layout.updateColumnsWidth();
    return;
  };
  const tableSize = useFormSize();
  const bodyWidth = computed(() => {
    const { bodyWidth: bodyWidth_, scrollY, gutterWidth } = layout;
    return bodyWidth_.value ? `${bodyWidth_.value - (scrollY.value ? gutterWidth : 0)}px` : "";
  });
  const tableLayout = computed(() => {
    if (props.maxHeight)
      return "fixed";
    return props.tableLayout;
  });
  const emptyBlockStyle = computed(() => {
    if (props.data && props.data.length)
      return;
    let height = "100%";
    if (props.height && bodyScrollHeight.value) {
      height = `${bodyScrollHeight.value}px`;
    }
    const width = tableWidth.value;
    return {
      width: width ? `${width}px` : "",
      height
    };
  });
  const scrollbarStyle = computed(() => {
    if (props.height) {
      return {
        height: "100%"
      };
    }
    if (props.maxHeight) {
      if (!Number.isNaN(Number(props.maxHeight))) {
        return {
          maxHeight: `${+props.maxHeight - headerScrollHeight.value - footerScrollHeight.value}px`
        };
      } else {
        return {
          maxHeight: `calc(${props.maxHeight} - ${headerScrollHeight.value + footerScrollHeight.value}px)`
        };
      }
    }
    return {};
  });
  return {
    isHidden,
    renderExpanded,
    setDragVisible,
    isGroup,
    handleMouseLeave,
    handleHeaderFooterMousewheel,
    tableSize,
    emptyBlockStyle,
    resizeProxyVisible,
    bodyWidth,
    resizeState,
    doLayout,
    tableBodyStyles,
    tableLayout,
    scrollbarViewStyle,
    scrollbarStyle
  };
}
function useKeyRender(table) {
  ref();
}
var defaultProps$1 = {
  data: {
    type: Array,
    default: () => []
  },
  size: useSizeProp,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  tooltipOptions: Object,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default: () => {
      return {
        hasChildren: "hasChildren",
        children: "children",
        checkStrictly: false
      };
    }
  },
  lazy: Boolean,
  load: Function,
  style: {
    type: [String, Object, Array],
    default: () => ({})
  },
  className: {
    type: String,
    default: ""
  },
  tableLayout: {
    type: String,
    default: "fixed"
  },
  scrollbarAlwaysOn: Boolean,
  flexible: Boolean,
  showOverflowTooltip: [Boolean, Object],
  tooltipFormatter: Function,
  appendFilterPanelTo: String,
  scrollbarTabindex: {
    type: [Number, String],
    default: void 0
  },
  allowDragLastColumn: {
    type: Boolean,
    default: true
  },
  preserveExpandedContent: Boolean,
  nativeScrollbar: Boolean
};
function hColgroup(props) {
  const isAuto = props.tableLayout === "auto";
  let columns = props.columns || [];
  if (isAuto) {
    if (columns.every(({ width }) => isUndefined(width))) {
      columns = [];
    }
  }
  const getPropsData = (column) => {
    const propsData = {
      key: `${props.tableLayout}_${column.id}`,
      style: {},
      name: void 0
    };
    if (isAuto) {
      propsData.style = {
        width: `${column.width}px`
      };
    } else {
      propsData.name = column.id;
    }
    return propsData;
  };
  return h(
    "colgroup",
    {},
    columns.map((column) => h("col", getPropsData(column)))
  );
}
hColgroup.props = ["columns", "tableLayout"];
const useScrollbar = () => {
  const scrollBarRef = ref();
  const scrollTo = (options, yCoord) => {
    const scrollbar = scrollBarRef.value;
    if (scrollbar) {
      scrollbar.scrollTo(options, yCoord);
    }
  };
  const setScrollPosition = (position, offset) => {
    const scrollbar = scrollBarRef.value;
    if (scrollbar && isNumber(offset) && ["Top", "Left"].includes(position)) {
      scrollbar[`setScroll${position}`](offset);
    }
  };
  const setScrollTop = (top) => setScrollPosition("Top", top);
  const setScrollLeft = (left) => setScrollPosition("Left", left);
  return {
    scrollBarRef,
    scrollTo,
    setScrollTop,
    setScrollLeft
  };
};
const SCOPE = "_Mousewheel";
const mousewheel = function(element, callback) {
  if (element && element.addEventListener) {
    removeWheelHandler(element);
    const fn = function(event) {
      const normalized = normalizeWheel(event);
      callback && Reflect.apply(callback, this, [event, normalized]);
    };
    element[SCOPE] = { wheelHandler: fn };
    element.addEventListener("wheel", fn, { passive: true });
  }
};
const removeWheelHandler = (element) => {
  var _a;
  if ((_a = element[SCOPE]) == null ? void 0 : _a.wheelHandler) {
    element.removeEventListener("wheel", element[SCOPE].wheelHandler);
    element[SCOPE] = null;
  }
};
const Mousewheel = {
  beforeMount(el, binding) {
    mousewheel(el, binding.value);
  },
  unmounted(el) {
    removeWheelHandler(el);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      mousewheel(el, binding.value);
    }
  }
};
let tableIdSeed = 1;
const _sfc_main$5 = defineComponent({
  name: "ElTable",
  directives: {
    Mousewheel
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    ElScrollbar,
    hColgroup
  },
  props: defaultProps$1,
  emits: [
    "select",
    "select-all",
    "selection-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-contextmenu",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change",
    "scroll"
  ],
  setup(props) {
    const { t } = useLocale();
    const ns = useNamespace("table");
    const table = getCurrentInstance();
    provide(TABLE_INJECTION_KEY, table);
    const store = createStore(table, props);
    table.store = store;
    const layout = new TableLayout({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader
    });
    table.layout = layout;
    const isEmpty = computed(() => (store.states.data.value || []).length === 0);
    const {
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      sort,
      updateKeyChildren
    } = useUtils(store);
    const {
      isHidden,
      renderExpanded,
      setDragVisible,
      isGroup,
      handleMouseLeave,
      handleHeaderFooterMousewheel,
      tableSize,
      emptyBlockStyle,
      resizeProxyVisible,
      bodyWidth,
      resizeState,
      doLayout,
      tableBodyStyles,
      tableLayout,
      scrollbarViewStyle,
      scrollbarStyle
    } = useStyle(props, layout, store, table);
    const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar();
    const debouncedUpdateLayout = debounce(doLayout, 50);
    const tableId = `${ns.namespace.value}-table_${tableIdSeed++}`;
    table.tableId = tableId;
    table.state = {
      isGroup,
      resizeState,
      doLayout,
      debouncedUpdateLayout
    };
    const computedSumText = computed(
      () => {
        var _a;
        return (_a = props.sumText) != null ? _a : t("el.table.sumText");
      }
    );
    const computedEmptyText = computed(() => {
      var _a;
      return (_a = props.emptyText) != null ? _a : t("el.table.emptyText");
    });
    const columns = computed(() => {
      return convertToRows(store.states.originColumns.value)[0];
    });
    useKeyRender();
    return {
      ns,
      layout,
      store,
      columns,
      handleHeaderFooterMousewheel,
      handleMouseLeave,
      tableId,
      tableSize,
      isHidden,
      isEmpty,
      renderExpanded,
      resizeProxyVisible,
      resizeState,
      isGroup,
      bodyWidth,
      tableBodyStyles,
      emptyBlockStyle,
      debouncedUpdateLayout,
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      doLayout,
      sort,
      updateKeyChildren,
      t,
      setDragVisible,
      context: table,
      computedSumText,
      computedEmptyText,
      tableLayout,
      scrollbarViewStyle,
      scrollbarStyle,
      scrollBarRef,
      scrollTo,
      setScrollLeft,
      setScrollTop,
      allowDragLastColumn: props.allowDragLastColumn
    };
  }
});
const _hoisted_1$2 = ["data-prefix"];
const _hoisted_2$2 = {
  ref: "hiddenColumns",
  class: "hidden-columns"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_hColgroup = resolveComponent("hColgroup");
  const _component_table_header = resolveComponent("table-header");
  const _component_table_body = resolveComponent("table-body");
  const _component_table_footer = resolveComponent("table-footer");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _directive_mousewheel = resolveDirective("mousewheel");
  return openBlock(), createElementBlock("div", {
    ref: "tableWrapper",
    class: normalizeClass([
      {
        [_ctx.ns.m("fit")]: _ctx.fit,
        [_ctx.ns.m("striped")]: _ctx.stripe,
        [_ctx.ns.m("border")]: _ctx.border || _ctx.isGroup,
        [_ctx.ns.m("hidden")]: _ctx.isHidden,
        [_ctx.ns.m("group")]: _ctx.isGroup,
        [_ctx.ns.m("fluid-height")]: _ctx.maxHeight,
        [_ctx.ns.m("scrollable-x")]: _ctx.layout.scrollX.value,
        [_ctx.ns.m("scrollable-y")]: _ctx.layout.scrollY.value,
        [_ctx.ns.m("enable-row-hover")]: !_ctx.store.states.isComplex.value,
        [_ctx.ns.m("enable-row-transition")]: (_ctx.store.states.data.value || []).length !== 0 && (_ctx.store.states.data.value || []).length < 100,
        "has-footer": _ctx.showSummary
      },
      _ctx.ns.m(_ctx.tableSize),
      _ctx.className,
      _ctx.ns.b(),
      _ctx.ns.m(`layout-${_ctx.tableLayout}`)
    ]),
    style: normalizeStyle(_ctx.style),
    "data-prefix": _ctx.ns.namespace.value,
    onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))
  }, [
    createElementVNode(
      "div",
      {
        ref: "tableInnerWrapper",
        class: normalizeClass(_ctx.ns.e("inner-wrapper"))
      },
      [
        createElementVNode(
          "div",
          _hoisted_2$2,
          [
            renderSlot(_ctx.$slots, "default")
          ],
          512
        ),
        _ctx.showHeader && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            ref: "headerWrapper",
            class: normalizeClass(_ctx.ns.e("header-wrapper"))
          },
          [
            createElementVNode(
              "table",
              {
                ref: "tableHeader",
                class: normalizeClass(_ctx.ns.e("header")),
                style: normalizeStyle(_ctx.tableBodyStyles),
                border: "0",
                cellpadding: "0",
                cellspacing: "0"
              },
              [
                createVNode(_component_hColgroup, {
                  columns: _ctx.store.states.columns.value,
                  "table-layout": _ctx.tableLayout
                }, null, 8, ["columns", "table-layout"]),
                createVNode(_component_table_header, {
                  ref: "tableHeaderRef",
                  border: _ctx.border,
                  "default-sort": _ctx.defaultSort,
                  store: _ctx.store,
                  "append-filter-panel-to": _ctx.appendFilterPanelTo,
                  "allow-drag-last-column": _ctx.allowDragLastColumn,
                  onSetDragVisible: _ctx.setDragVisible
                }, null, 8, ["border", "default-sort", "store", "append-filter-panel-to", "allow-drag-last-column", "onSetDragVisible"])
              ],
              6
            )
          ],
          2
        )), [
          [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]
        ]) : createCommentVNode("v-if", true),
        createElementVNode(
          "div",
          {
            ref: "bodyWrapper",
            class: normalizeClass(_ctx.ns.e("body-wrapper"))
          },
          [
            createVNode(_component_el_scrollbar, {
              ref: "scrollBarRef",
              "view-style": _ctx.scrollbarViewStyle,
              "wrap-style": _ctx.scrollbarStyle,
              always: _ctx.scrollbarAlwaysOn,
              tabindex: _ctx.scrollbarTabindex,
              native: _ctx.nativeScrollbar,
              onScroll: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("scroll", $event))
            }, {
              default: withCtx(() => [
                createElementVNode(
                  "table",
                  {
                    ref: "tableBody",
                    class: normalizeClass(_ctx.ns.e("body")),
                    cellspacing: "0",
                    cellpadding: "0",
                    border: "0",
                    style: normalizeStyle({
                      width: _ctx.bodyWidth,
                      tableLayout: _ctx.tableLayout
                    })
                  },
                  [
                    createVNode(_component_hColgroup, {
                      columns: _ctx.store.states.columns.value,
                      "table-layout": _ctx.tableLayout
                    }, null, 8, ["columns", "table-layout"]),
                    _ctx.showHeader && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_header, {
                      key: 0,
                      ref: "tableHeaderRef",
                      class: normalizeClass(_ctx.ns.e("body-header")),
                      border: _ctx.border,
                      "default-sort": _ctx.defaultSort,
                      store: _ctx.store,
                      "append-filter-panel-to": _ctx.appendFilterPanelTo,
                      onSetDragVisible: _ctx.setDragVisible
                    }, null, 8, ["class", "border", "default-sort", "store", "append-filter-panel-to", "onSetDragVisible"])) : createCommentVNode("v-if", true),
                    createVNode(_component_table_body, {
                      context: _ctx.context,
                      highlight: _ctx.highlightCurrentRow,
                      "row-class-name": _ctx.rowClassName,
                      "tooltip-effect": _ctx.tooltipEffect,
                      "tooltip-options": _ctx.tooltipOptions,
                      "row-style": _ctx.rowStyle,
                      store: _ctx.store,
                      stripe: _ctx.stripe
                    }, null, 8, ["context", "highlight", "row-class-name", "tooltip-effect", "tooltip-options", "row-style", "store", "stripe"]),
                    _ctx.showSummary && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_footer, {
                      key: 1,
                      class: normalizeClass(_ctx.ns.e("body-footer")),
                      border: _ctx.border,
                      "default-sort": _ctx.defaultSort,
                      store: _ctx.store,
                      "sum-text": _ctx.computedSumText,
                      "summary-method": _ctx.summaryMethod
                    }, null, 8, ["class", "border", "default-sort", "store", "sum-text", "summary-method"])) : createCommentVNode("v-if", true)
                  ],
                  6
                ),
                _ctx.isEmpty ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    ref: "emptyBlock",
                    style: normalizeStyle(_ctx.emptyBlockStyle),
                    class: normalizeClass(_ctx.ns.e("empty-block"))
                  },
                  [
                    createElementVNode(
                      "span",
                      {
                        class: normalizeClass(_ctx.ns.e("empty-text"))
                      },
                      [
                        renderSlot(_ctx.$slots, "empty", {}, () => [
                          createTextVNode(
                            toDisplayString(_ctx.computedEmptyText),
                            1
                          )
                        ])
                      ],
                      2
                    )
                  ],
                  6
                )) : createCommentVNode("v-if", true),
                _ctx.$slots.append ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 1,
                    ref: "appendWrapper",
                    class: normalizeClass(_ctx.ns.e("append-wrapper"))
                  },
                  [
                    renderSlot(_ctx.$slots, "append")
                  ],
                  2
                )) : createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["view-style", "wrap-style", "always", "tabindex", "native"])
          ],
          2
        ),
        _ctx.showSummary && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            ref: "footerWrapper",
            class: normalizeClass(_ctx.ns.e("footer-wrapper"))
          },
          [
            createElementVNode(
              "table",
              {
                class: normalizeClass(_ctx.ns.e("footer")),
                cellspacing: "0",
                cellpadding: "0",
                border: "0",
                style: normalizeStyle(_ctx.tableBodyStyles)
              },
              [
                createVNode(_component_hColgroup, {
                  columns: _ctx.store.states.columns.value,
                  "table-layout": _ctx.tableLayout
                }, null, 8, ["columns", "table-layout"]),
                createVNode(_component_table_footer, {
                  border: _ctx.border,
                  "default-sort": _ctx.defaultSort,
                  store: _ctx.store,
                  "sum-text": _ctx.computedSumText,
                  "summary-method": _ctx.summaryMethod
                }, null, 8, ["border", "default-sort", "store", "sum-text", "summary-method"])
              ],
              6
            )
          ],
          2
        )), [
          [vShow, !_ctx.isEmpty],
          [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]
        ]) : createCommentVNode("v-if", true),
        _ctx.border || _ctx.isGroup ? (openBlock(), createElementBlock(
          "div",
          {
            key: 2,
            class: normalizeClass(_ctx.ns.e("border-left-patch"))
          },
          null,
          2
        )) : createCommentVNode("v-if", true)
      ],
      2
    ),
    withDirectives(createElementVNode(
      "div",
      {
        ref: "resizeProxy",
        class: normalizeClass(_ctx.ns.e("column-resize-proxy"))
      },
      null,
      2
    ), [
      [vShow, _ctx.resizeProxyVisible]
    ])
  ], 46, _hoisted_1$2);
}
var Table = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue"]]);
const defaultClassNames = {
  selection: "table-column--selection",
  expand: "table__expand-column"
};
const getDefaultClassName = (type) => {
  return defaultClassNames[type] || "";
};
const cellForced = {
  selection: {
    renderHeader({ store }) {
      var _a;
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return h(ElCheckbox, {
        disabled: isDisabled(),
        size: store.states.tableSize.value,
        indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
        "onUpdate:modelValue": (_a = store.toggleAllSelection) != null ? _a : void 0,
        modelValue: store.states.isAllSelected.value,
        ariaLabel: store.t("el.table.selectAllLabel")
      });
    },
    renderCell({
      row,
      column,
      store,
      $index
    }) {
      return h(ElCheckbox, {
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
        size: store.states.tableSize.value,
        onChange: () => {
          store.commit("rowSelectedChanged", row);
        },
        onClick: (event) => event.stopPropagation(),
        modelValue: store.isSelected(row),
        ariaLabel: store.t("el.table.selectRowLabel")
      });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader({
      column
    }) {
      return column.label || "#";
    },
    renderCell({
      column,
      $index
    }) {
      let i = $index + 1;
      const index = column.index;
      if (isNumber(index)) {
        i = $index + index;
      } else if (isFunction(index)) {
        i = index($index);
      }
      return h("div", {}, [i]);
    },
    sortable: false
  },
  expand: {
    renderHeader({
      column
    }) {
      return column.label || "";
    },
    renderCell({
      column,
      row,
      store,
      expanded
    }) {
      const { ns } = store;
      const classes = [ns.e("expand-icon")];
      if (!column.renderExpand && expanded) {
        classes.push(ns.em("expand-icon", "expanded"));
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return h(
        "button",
        {
          type: "button",
          "aria-label": store.t(
            expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"
          ),
          "aria-expanded": expanded,
          class: classes,
          onClick: callback
        },
        {
          default: () => {
            if (column.renderExpand) {
              return [
                column.renderExpand({
                  expanded
                })
              ];
            }
            return [
              h(ElIcon, null, {
                default: () => {
                  return [h(arrow_right_default)];
                }
              })
            ];
          }
        }
      );
    },
    sortable: false,
    resizable: false
  }
};
function defaultRenderCell({
  row,
  column,
  $index
}) {
  var _a;
  const property = column.property;
  const value = property && getProp(row, property).value;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return ((_a = value == null ? void 0 : value.toString) == null ? void 0 : _a.call(value)) || "";
}
function treeCellPrefix({
  row,
  treeNode,
  store
}, createPlaceholder = false) {
  const { ns } = store;
  if (!treeNode) {
    if (createPlaceholder) {
      return [
        h("span", {
          class: ns.e("placeholder")
        })
      ];
    }
    return null;
  }
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    if (treeNode.loading) {
      return;
    }
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(
      h("span", {
        class: ns.e("indent"),
        style: { "padding-left": `${treeNode.indent}px` }
      })
    );
  }
  if (isBoolean(treeNode.expanded) && !treeNode.noLazyChildren) {
    const expandClasses = [
      ns.e("expand-icon"),
      treeNode.expanded ? ns.em("expand-icon", "expanded") : ""
    ];
    let icon = arrow_right_default;
    if (treeNode.loading) {
      icon = loading_default;
    }
    ele.push(
      h(
        "button",
        {
          type: "button",
          "aria-label": store.t(
            treeNode.expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"
          ),
          "aria-expanded": treeNode.expanded,
          class: expandClasses,
          onClick: callback
        },
        {
          default: () => {
            return [
              h(
                ElIcon,
                { class: ns.is("loading", treeNode.loading) },
                {
                  default: () => [h(icon)]
                }
              )
            ];
          }
        }
      )
    );
  } else {
    ele.push(
      h("span", {
        class: ns.e("placeholder")
      })
    );
  }
  return ele;
}
function getAllAliases(props, aliases) {
  return props.reduce((prev, cur) => {
    prev[cur] = cur;
    return prev;
  }, aliases);
}
function useWatcher(owner, props_) {
  const instance = getCurrentInstance();
  const registerComplexWatchers = () => {
    const props = ["fixed"];
    const aliases = {
      realWidth: "width",
      realMinWidth: "minWidth"
    };
    const allAliases = getAllAliases(props, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (hasOwn(props_, columnKey)) {
        watch(
          () => props_[columnKey],
          (newVal) => {
            let value = newVal;
            if (columnKey === "width" && key === "realWidth") {
              value = parseWidth(newVal);
            }
            if (columnKey === "minWidth" && key === "realMinWidth") {
              value = parseMinWidth(newVal);
            }
            instance.columnConfig.value[columnKey] = value;
            instance.columnConfig.value[key] = value;
            const updateColumns = columnKey === "fixed";
            owner.value.store.scheduleLayout(updateColumns);
          }
        );
      }
    });
  };
  const registerNormalWatchers = () => {
    const props = [
      "label",
      "filters",
      "filterMultiple",
      "filteredValue",
      "sortable",
      "index",
      "formatter",
      "className",
      "labelClassName",
      "filterClassName",
      "showOverflowTooltip",
      "tooltipFormatter",
      "resizable"
    ];
    const parentProps = ["showOverflowTooltip"];
    const aliases = {
      property: "prop",
      align: "realAlign",
      headerAlign: "realHeaderAlign"
    };
    const allAliases = getAllAliases(props, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (hasOwn(props_, columnKey)) {
        watch(
          () => props_[columnKey],
          (newVal) => {
            instance.columnConfig.value[key] = newVal;
            if (key === "filters" || key === "filterMethod") {
              instance.columnConfig.value["filterable"] = !!(instance.columnConfig.value["filters"] || instance.columnConfig.value["filterMethod"]);
            }
          }
        );
      }
    });
    parentProps.forEach((key) => {
      if (hasOwn(owner.value.props, key)) {
        watch(
          () => owner.value.props[key],
          (newVal) => {
            instance.columnConfig.value[key] = newVal;
          }
        );
      }
    });
  };
  return {
    registerComplexWatchers,
    registerNormalWatchers
  };
}
function useRender(props, slots, owner) {
  const instance = getCurrentInstance();
  const columnId = ref("");
  const isSubColumn = ref(false);
  const realAlign = ref();
  const realHeaderAlign = ref();
  const ns = useNamespace("table");
  watchEffect(() => {
    realAlign.value = props.align ? `is-${props.align}` : null;
    realAlign.value;
  });
  watchEffect(() => {
    realHeaderAlign.value = props.headerAlign ? `is-${props.headerAlign}` : realAlign.value;
    realHeaderAlign.value;
  });
  const columnOrTableParent = computed(() => {
    let parent = instance.vnode.vParent || instance.parent;
    while (parent && !parent.tableId && !parent.columnId) {
      parent = parent.vnode.vParent || parent.parent;
    }
    return parent;
  });
  const hasTreeColumn = computed(() => {
    const { store } = instance.parent;
    if (!store)
      return false;
    const { treeData } = store.states;
    const treeDataValue = treeData.value;
    return treeDataValue && Object.keys(treeDataValue).length > 0;
  });
  const realWidth = ref(parseWidth(props.width));
  const realMinWidth = ref(parseMinWidth(props.minWidth));
  const setColumnWidth = (column) => {
    if (realWidth.value)
      column.width = realWidth.value;
    if (realMinWidth.value) {
      column.minWidth = realMinWidth.value;
    }
    if (!realWidth.value && realMinWidth.value) {
      column.width = void 0;
    }
    if (!column.minWidth) {
      column.minWidth = 80;
    }
    column.realWidth = Number(
      isUndefined(column.width) ? column.minWidth : column.width
    );
    return column;
  };
  const setColumnForcedProps = (column) => {
    const type = column.type;
    const source = cellForced[type] || {};
    Object.keys(source).forEach((prop) => {
      const value = source[prop];
      if (prop !== "className" && !isUndefined(value)) {
        column[prop] = value;
      }
    });
    const className = getDefaultClassName(type);
    if (className) {
      const forceClass = `${unref(ns.namespace)}-${className}`;
      column.className = column.className ? `${column.className} ${forceClass}` : forceClass;
    }
    return column;
  };
  const checkSubColumn = (children) => {
    if (isArray(children)) {
      children.forEach((child) => check(child));
    } else {
      check(children);
    }
    function check(item) {
      var _a;
      if (((_a = item == null ? void 0 : item.type) == null ? void 0 : _a.name) === "ElTableColumn") {
        item.vParent = instance;
      }
    }
  };
  const setColumnRenders = (column) => {
    if (props.renderHeader) ; else if (column.type !== "selection") {
      column.renderHeader = (scope) => {
        instance.columnConfig.value["label"];
        if (slots.header) {
          const slotResult = slots.header(scope);
          if (ensureValidVNode(slotResult)) {
            return h(Fragment, slotResult);
          }
        }
        return createTextVNode(column.label);
      };
    }
    if (slots["filter-icon"]) {
      column.renderFilterIcon = (scope) => {
        return renderSlot(slots, "filter-icon", scope);
      };
    }
    if (slots.expand) {
      column.renderExpand = (scope) => {
        return renderSlot(slots, "expand", scope);
      };
    }
    let originRenderCell = column.renderCell;
    if (column.type === "expand") {
      column.renderCell = (data) => h(
        "div",
        {
          class: "cell"
        },
        [originRenderCell(data)]
      );
      owner.value.renderExpanded = (row) => {
        return slots.default ? slots.default(row) : slots.default;
      };
    } else {
      originRenderCell = originRenderCell || defaultRenderCell;
      column.renderCell = (data) => {
        let children = null;
        if (slots.default) {
          const vnodes = slots.default(data);
          children = vnodes.some((v) => v.type !== Comment) ? vnodes : originRenderCell(data);
        } else {
          children = originRenderCell(data);
        }
        const { columns } = owner.value.store.states;
        const firstUserColumnIndex = columns.value.findIndex(
          (item) => item.type === "default"
        );
        const shouldCreatePlaceholder = hasTreeColumn.value && data.cellIndex === firstUserColumnIndex;
        const prefix = treeCellPrefix(data, shouldCreatePlaceholder);
        const props2 = {
          class: "cell",
          style: {}
        };
        if (column.showOverflowTooltip) {
          props2.class = `${props2.class} ${unref(ns.namespace)}-tooltip`;
          props2.style = {
            width: `${(data.column.realWidth || Number(data.column.width)) - 1}px`
          };
        }
        checkSubColumn(children);
        return h("div", props2, [prefix, children]);
      };
    }
    return column;
  };
  const getPropsData = (...propsKey) => {
    return propsKey.reduce(
      (prev, cur) => {
        if (isArray(cur)) {
          cur.forEach((key) => {
            prev[key] = props[key];
          });
        }
        return prev;
      },
      {}
    );
  };
  const getColumnElIndex = (children, child) => {
    return Array.prototype.indexOf.call(children, child);
  };
  const updateColumnOrder = () => {
    owner.value.store.commit("updateColumnOrder", instance.columnConfig.value);
  };
  return {
    columnId,
    realAlign,
    isSubColumn,
    realHeaderAlign,
    columnOrTableParent,
    setColumnWidth,
    setColumnForcedProps,
    setColumnRenders,
    getPropsData,
    getColumnElIndex,
    updateColumnOrder
  };
}
var defaultProps = {
  type: {
    type: String,
    default: "default"
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: ""
  },
  minWidth: {
    type: [String, Number],
    default: ""
  },
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: false
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: true
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showOverflowTooltip: {
    type: [Boolean, Object],
    default: void 0
  },
  tooltipFormatter: Function,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true
  },
  filterClassName: String,
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => {
      return ["ascending", "descending", null];
    },
    validator: (val) => {
      return val.every(
        (order) => ["ascending", "descending", null].includes(order)
      );
    }
  }
};
let columnIdSeed = 1;
var ElTableColumn$1 = defineComponent({
  name: "ElTableColumn",
  components: {
    ElCheckbox
  },
  props: defaultProps,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const columnConfig = ref({});
    const owner = computed(() => {
      let parent2 = instance.parent;
      while (parent2 && !parent2.tableId) {
        parent2 = parent2.parent;
      }
      return parent2;
    });
    useWatcher(
      owner,
      props
    );
    const {
      columnId,
      columnOrTableParent
    } = useRender(props, slots, owner);
    const parent = columnOrTableParent.value;
    columnId.value = `${"tableId" in parent && parent.tableId || "columnId" in parent && parent.columnId}_column_${columnIdSeed++}`;
    instance.columnId = columnId.value;
    instance.columnConfig = columnConfig;
    return;
  },
  render() {
    var _a, _b, _c;
    try {
      const renderDefault = (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a, {
        row: {},
        column: {},
        $index: -1
      });
      const children = [];
      if (isArray(renderDefault)) {
        for (const childNode of renderDefault) {
          if (((_c = childNode.type) == null ? void 0 : _c.name) === "ElTableColumn" || childNode.shapeFlag & 2) {
            children.push(childNode);
          } else if (childNode.type === Fragment && isArray(childNode.children)) {
            childNode.children.forEach((vnode2) => {
              if ((vnode2 == null ? void 0 : vnode2.patchFlag) !== 1024 && !isString(vnode2 == null ? void 0 : vnode2.children)) {
                children.push(vnode2);
              }
            });
          }
        }
      }
      const vnode = h("div", children);
      return vnode;
    } catch (e) {
      return h("div", []);
    }
  }
});
const ElTable = withInstall(Table, {
  TableColumn: ElTableColumn$1
});
const ElTableColumn = withNoopInstall(ElTableColumn$1);
const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const _sfc_main$4 = defineComponent({
  ...{
    name: "ElCard"
  },
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is(`${_ctx.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
          ])
        },
        [
          _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.header),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
              style: normalizeStyle(_ctx.bodyStyle)
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            6
          ),
          _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer", {}, () => [
                createTextVNode(
                  toDisplayString(_ctx.footer),
                  1
                )
              ])
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        2
      );
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);
const ElCard = withInstall(Card);
let hiddenTextarea = void 0;
const HIDDEN_STYLE = {
  height: "0",
  visibility: "hidden",
  overflow: isFirefox() ? "" : "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];
const looseToNumber = (val) => {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
};
function calculateNodeStyling(targetElement) {
  const style = (void 0).getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => [
    name,
    style.getPropertyValue(name)
  ]);
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a, _b;
  if (!hiddenTextarea) {
    hiddenTextarea = (void 0).createElement("textarea");
    ((_a = targetElement.parentNode) != null ? _a : (void 0).body).appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  contextStyle.forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value)
  );
  Object.entries(HIDDEN_STYLE).forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value, "important")
  );
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_b = hiddenTextarea.parentNode) == null ? void 0 : _b.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}
const inputProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  size: useSizeProp,
  disabled: {
    type: Boolean,
    default: void 0
  },
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  modelModifiers: {
    type: definePropType(Object),
    default: () => ({})
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: definePropType(String),
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: definePropType([Boolean, Object]),
    default: false
  },
  autocomplete: {
    type: definePropType(String),
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: Boolean,
  clearable: Boolean,
  clearIcon: {
    type: iconPropType,
    default: circle_close_default
  },
  showPassword: Boolean,
  showWordLimit: Boolean,
  wordLimitPosition: {
    type: String,
    values: ["inside", "outside"],
    default: "inside"
  },
  suffixIcon: {
    type: iconPropType
  },
  prefixIcon: {
    type: iconPropType
  },
  containerRole: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: definePropType([Object, Array, String]),
    default: () => mutable({})
  },
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...useAriaProps(["ariaLabel"]),
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  name: String
});
const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  input: (value) => isString(value),
  change: (value, evt) => isString(value) && (evt instanceof Event || evt === void 0),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed(() => {
    return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
  });
  const instance = getCurrentInstance();
  if (!instance) {
    return computed(() => ({}));
  }
  return computed(
    () => {
      var _a;
      return fromPairs(
        Object.entries((_a = instance.proxy) == null ? void 0 : _a.$attrs).filter(
          ([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))
        )
      );
    }
  );
};
function useFocusController(target, {
  disabled,
  beforeFocus,
  afterFocus,
  beforeBlur,
  afterBlur
} = {}) {
  const instance = getCurrentInstance();
  const { emit } = instance;
  const wrapperRef = shallowRef();
  const isFocused = ref(false);
  const handleFocus = (event) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
    if (unref(disabled) || isFocused.value || cancelFocus)
      return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus == null ? void 0 : afterFocus();
  };
  const handleBlur = (event) => {
    var _a;
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (unref(disabled) || event.relatedTarget && ((_a = wrapperRef.value) == null ? void 0 : _a.contains(event.relatedTarget)) || cancelBlur)
      return;
    isFocused.value = false;
    emit("blur", event);
    afterBlur == null ? void 0 : afterBlur();
  };
  const handleClick = (event) => {
    var _a, _b;
    if (unref(disabled) || isFocusable(event.target) || ((_a = wrapperRef.value) == null ? void 0 : _a.contains((void 0).activeElement)) && wrapperRef.value !== (void 0).activeElement)
      return;
    (_b = target.value) == null ? void 0 : _b.focus();
  };
  watch([wrapperRef, () => unref(disabled)], ([el, disabled2]) => {
    if (!el)
      return;
    if (disabled2) {
      el.removeAttribute("tabindex");
    } else {
      el.setAttribute("tabindex", "-1");
    }
  });
  useEventListener(wrapperRef, "focus", handleFocus, true);
  useEventListener(wrapperRef, "blur", handleBlur, true);
  useEventListener(wrapperRef, "click", handleClick, true);
  return {
    isFocused,
    wrapperRef,
    handleFocus,
    handleBlur
  };
}
const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
function useComposition({
  afterComposition,
  emit
}) {
  const isComposing = ref(false);
  const handleCompositionStart = (event) => {
    emit == null ? void 0 : emit("compositionstart", event);
    isComposing.value = true;
  };
  const handleCompositionUpdate = (event) => {
    var _a;
    emit == null ? void 0 : emit("compositionupdate", event);
    const text = (_a = event.target) == null ? void 0 : _a.value;
    const lastCharacter = text[text.length - 1] || "";
    isComposing.value = !isKorean(lastCharacter);
  };
  const handleCompositionEnd = (event) => {
    emit == null ? void 0 : emit("compositionend", event);
    if (isComposing.value) {
      isComposing.value = false;
      nextTick(() => afterComposition(event));
    }
  };
  const handleComposition = (event) => {
    event.type === "compositionend" ? handleCompositionEnd(event) : handleCompositionUpdate(event);
  };
  return {
    isComposing,
    handleComposition,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  };
}
function useCursor(input) {
  let selectionInfo;
  function recordCursor() {
    if (input.value == void 0)
      return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null)
      return;
    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));
    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt
    };
  }
  function setCursor() {
    if (input.value == void 0 || selectionInfo == void 0)
      return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo;
    if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
      return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    input.value.setSelectionRange(startPos, startPos);
  }
  return [recordCursor, setCursor];
}
const _hoisted_1$1 = ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode"];
const _hoisted_2$1 = ["id", "name", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role"];
const COMPONENT_NAME = "ElInput";
const _sfc_main$3 = defineComponent({
  ...{
    name: COMPONENT_NAME,
    inheritAttrs: false
  },
  __name: "input",
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rawAttrs = useAttrs$1();
    const attrs = useAttrs();
    const slots = useSlots();
    const containerKls = computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value)
    ]);
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = shallowRef();
    const textarea = shallowRef();
    const hovering = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref();
    const textareaCalcStyle = shallowRef(props.inputStyle);
    const _ref = computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
      _ref,
      {
        disabled: inputDisabled,
        afterBlur() {
          var _a;
          if (props.validateEvent) {
            (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => debugWarn());
          }
        }
      }
    );
    const needStatusIcon = computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateIcon = computed(
      () => validateState.value && ValidateComponentsMap[validateState.value]
    );
    const passwordIcon = computed(
      () => passwordVisible.value ? view_default : hide_default
    );
    const containerStyle = computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = computed(
      () => isNil(props.modelValue) ? "" : String(props.modelValue)
    );
    const showClear = computed(
      () => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value)
    );
    const showPwdVisible = computed(
      () => props.showPassword && !inputDisabled.value && !!nativeInputValue.value
    );
    const isWordLimitVisible = computed(
      () => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword
    );
    const textLength = computed(() => nativeInputValue.value.length);
    const inputExceed = computed(
      () => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength)
    );
    const suffixVisible = computed(
      () => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value
    );
    const hasModelModifiers = computed(
      () => !!Object.keys(props.modelModifiers).length
    );
    const [recordCursor, setCursor] = useCursor(input);
    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value || props.resize !== "both" && props.resize !== "horizontal")
        return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        right: `calc(100% - ${width + 22 - 10}px)`
      };
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!isClient || type !== "textarea" || !textarea.value)
        return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        var _a;
        if (isInit || !props.autosize)
          return;
        const isElHidden = ((_a = textarea.value) == null ? void 0 : _a.offsetParent) === null;
        if (!isElHidden) {
          setTimeout(resizeTextarea2);
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue || props.type === "file")
        return;
      input2.value = formatterValue;
    };
    const formatValue = (value) => {
      const { trim, number } = props.modelModifiers;
      if (trim) {
        value = value.trim();
      }
      if (number) {
        value = `${looseToNumber(value)}`;
      }
      if (props.formatter && props.parser) {
        value = props.parser(value);
      }
      return value;
    };
    const handleInput = async (event) => {
      if (isComposing.value)
        return;
      const { lazy } = props.modelModifiers;
      let { value } = event.target;
      if (lazy) {
        emit(INPUT_EVENT, value);
        return;
      }
      value = formatValue(value);
      if (String(value) === nativeInputValue.value) {
        if (props.formatter) {
          setNativeInputValue();
        }
        return;
      }
      recordCursor();
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
      await nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) {
        setNativeInputValue();
      }
      setCursor();
    };
    const handleChange = async (event) => {
      let { value } = event.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) {
        emit(UPDATE_MODEL_EVENT, value);
      }
      emit(CHANGE_EVENT, value, event);
      await nextTick();
      setNativeInputValue();
    };
    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    } = useComposition({ emit, afterComposition: handleInput });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const focus = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.blur();
    };
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      var _a;
      (_a = _ref.value) == null ? void 0 : _a.select();
    };
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, "");
      emit(CHANGE_EVENT, "");
      emit("clear");
      emit(INPUT_EVENT, "");
    };
    watch(
      () => props.modelValue,
      () => {
        var _a;
        nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn());
        }
      }
    );
    watch(nativeInputValue, (newValue) => {
      if (!_ref.value) {
        return;
      }
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
      if (displayValue === newValue) {
        return;
      }
      if ((void 0).activeElement === _ref.value && _ref.value.type !== "range") {
        if (trim && displayValue.trim() === newValue) {
          return;
        }
      }
      setNativeInputValue();
    });
    watch(
      () => props.type,
      async () => {
        await nextTick();
        setNativeInputValue();
        resizeTextarea();
      }
    );
    __expose({
      input,
      textarea,
      ref: _ref,
      textareaStyle,
      autosize: toRef(props, "autosize"),
      isComposing,
      focus,
      blur,
      select,
      clear,
      resizeTextarea
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            containerKls.value,
            {
              [unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
              [unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
            }
          ]),
          style: normalizeStyle(containerStyle.value),
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        },
        [
          createCommentVNode(" input "),
          _ctx.type !== "textarea" ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              createCommentVNode(" prepend slot "),
              _ctx.$slots.prepend ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(nsInput).be("group", "prepend"))
                },
                [
                  renderSlot(_ctx.$slots, "prepend")
                ],
                2
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  class: normalizeClass(wrapperKls.value)
                },
                [
                  createCommentVNode(" prefix slot "),
                  _ctx.$slots.prefix || _ctx.prefixIcon ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass(unref(nsInput).e("prefix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("prefix-inner"))
                        },
                        [
                          renderSlot(_ctx.$slots, "prefix"),
                          _ctx.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 0,
                            class: normalizeClass(unref(nsInput).e("icon"))
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                      )
                    ],
                    2
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("input", mergeProps({
                    id: unref(inputId),
                    ref_key: "input",
                    ref: input,
                    class: unref(nsInput).e("inner")
                  }, unref(attrs), {
                    name: _ctx.name,
                    minlength: _ctx.minlength,
                    maxlength: _ctx.maxlength,
                    type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                    disabled: unref(inputDisabled),
                    readonly: _ctx.readonly,
                    autocomplete: _ctx.autocomplete,
                    tabindex: _ctx.tabindex,
                    "aria-label": _ctx.ariaLabel,
                    placeholder: _ctx.placeholder,
                    style: _ctx.inputStyle,
                    form: _ctx.form,
                    autofocus: _ctx.autofocus,
                    role: _ctx.containerRole,
                    inputmode: _ctx.inputmode,
                    onCompositionstart: _cache[0] || (_cache[0] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                    onCompositionupdate: _cache[1] || (_cache[1] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                    onCompositionend: _cache[2] || (_cache[2] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                    onInput: handleInput,
                    onChange: handleChange,
                    onKeydown: handleKeydown
                  }), null, 16, _hoisted_1$1),
                  createCommentVNode(" suffix slot "),
                  suffixVisible.value ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 1,
                      class: normalizeClass(unref(nsInput).e("suffix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("suffix-inner"))
                        },
                        [
                          !showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              renderSlot(_ctx.$slots, "suffix"),
                              _ctx.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                                key: 0,
                                class: normalizeClass(unref(nsInput).e("icon"))
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.suffixIcon)))
                                ]),
                                _: 1
                              }, 8, ["class"])) : createCommentVNode("v-if", true)
                            ],
                            64
                          )) : createCommentVNode("v-if", true),
                          showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 1,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onClick: clear
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))
                            ]),
                            _: 1
                          }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
                          showPwdVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 2,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
                            onClick: handlePasswordVisible,
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onMouseup: withModifiers(unref(NOOP), ["prevent"])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(passwordIcon.value)))
                            ]),
                            _: 1
                          }, 8, ["class", "onMousedown", "onMouseup"])) : createCommentVNode("v-if", true),
                          isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            "span",
                            {
                              key: 3,
                              class: normalizeClass([
                                unref(nsInput).e("count"),
                                unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                              ])
                            },
                            [
                              createElementVNode(
                                "span",
                                {
                                  class: normalizeClass(unref(nsInput).e("count-inner"))
                                },
                                toDisplayString(textLength.value) + " / " + toDisplayString(_ctx.maxlength),
                                3
                              )
                            ],
                            2
                          )) : createCommentVNode("v-if", true),
                          validateState.value && validateIcon.value && needStatusIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 4,
                            class: normalizeClass([
                              unref(nsInput).e("icon"),
                              unref(nsInput).e("validateIcon"),
                              unref(nsInput).is("loading", validateState.value === "validating")
                            ])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(validateIcon.value)))
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                      )
                    ],
                    2
                  )) : createCommentVNode("v-if", true)
                ],
                2
              ),
              createCommentVNode(" append slot "),
              _ctx.$slots.append ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(nsInput).be("group", "append"))
                },
                [
                  renderSlot(_ctx.$slots, "append")
                ],
                2
              )) : createCommentVNode("v-if", true)
            ],
            64
          )) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createCommentVNode(" textarea "),
              createElementVNode("textarea", mergeProps({
                id: unref(inputId),
                ref_key: "textarea",
                ref: textarea,
                class: [unref(nsTextarea).e("inner"), unref(nsInput).is("focus", unref(isFocused))]
              }, unref(attrs), {
                name: _ctx.name,
                minlength: _ctx.minlength,
                maxlength: _ctx.maxlength,
                tabindex: _ctx.tabindex,
                disabled: unref(inputDisabled),
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                style: textareaStyle.value,
                "aria-label": _ctx.ariaLabel,
                placeholder: _ctx.placeholder,
                form: _ctx.form,
                autofocus: _ctx.autofocus,
                rows: _ctx.rows,
                role: _ctx.containerRole,
                onCompositionstart: _cache[3] || (_cache[3] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                onCompositionupdate: _cache[4] || (_cache[4] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                onCompositionend: _cache[5] || (_cache[5] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                onInput: handleInput,
                onFocus: _cache[6] || (_cache[6] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
                onBlur: _cache[7] || (_cache[7] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_2$1),
              isWordLimitVisible.value ? (openBlock(), createElementBlock(
                "span",
                {
                  key: 0,
                  style: normalizeStyle(countStyle.value),
                  class: normalizeClass([
                    unref(nsInput).e("count"),
                    unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                  ])
                },
                toDisplayString(textLength.value) + " / " + toDisplayString(_ctx.maxlength),
                7
              )) : createCommentVNode("v-if", true)
            ],
            64
          ))
        ],
        38
      );
    };
  }
});
var Input = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const ElInput = withInstall(Input);
const badgeProps = buildProps({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  },
  showZero: {
    type: Boolean,
    default: true
  },
  color: String,
  badgeStyle: {
    type: definePropType([String, Object, Array])
  },
  offset: {
    type: definePropType(Array),
    default: [0, 0]
  },
  badgeClass: {
    type: String
  }
});
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElBadge"
  },
  __name: "badge",
  props: badgeProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = computed(() => {
      if (props.isDot)
        return "";
      if (isNumber(props.value) && isNumber(props.max)) {
        return props.max < props.value ? `${props.max}+` : `${props.value}`;
      }
      return `${props.value}`;
    });
    const style = computed(() => {
      var _a;
      return [
        {
          backgroundColor: props.color,
          marginRight: addUnit(-props.offset[0]),
          marginTop: addUnit(props.offset[1])
        },
        (_a = props.badgeStyle) != null ? _a : {}
      ];
    });
    __expose({
      content
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ns).namespace.value}-zoom-in-center`,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode(
                "sup",
                {
                  class: normalizeClass([
                    unref(ns).e("content"),
                    unref(ns).em("content", _ctx.type),
                    unref(ns).is("fixed", !!_ctx.$slots.default),
                    unref(ns).is("dot", _ctx.isDot),
                    unref(ns).is("hide-zero", !_ctx.showZero && _ctx.value === 0),
                    _ctx.badgeClass
                  ]),
                  style: normalizeStyle(style.value)
                },
                [
                  renderSlot(_ctx.$slots, "content", { value: content.value }, () => [
                    createTextVNode(
                      toDisplayString(content.value),
                      1
                    )
                  ])
                ],
                6
              ), [
                [vShow, !_ctx.hidden && (content.value || _ctx.isDot || _ctx.$slots.content)]
              ])
            ]),
            _: 3
          }, 8, ["name"])
        ],
        2
      );
    };
  }
});
var Badge = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
const ElBadge = withInstall(Badge);
const configProviderProps = buildProps({
  a11y: {
    type: Boolean,
    default: true
  },
  locale: {
    type: definePropType(Object)
  },
  size: useSizeProp,
  button: {
    type: definePropType(Object)
  },
  card: {
    type: definePropType(Object)
  },
  dialog: {
    type: definePropType(Object)
  },
  link: {
    type: definePropType(Object)
  },
  experimentalFeatures: {
    type: definePropType(Object)
  },
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  message: {
    type: definePropType(Object)
  },
  zIndex: Number,
  namespace: {
    type: String,
    default: "el"
  },
  ...useEmptyValuesProps
});
const messageConfig = {
  placement: "top"
};
defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    watch(
      () => props.message,
      (val) => {
        var _a, _b;
        Object.assign(messageConfig, (_b = (_a = config == null ? void 0 : config.value) == null ? void 0 : _a.message) != null ? _b : {}, val != null ? val : {});
      },
      { immediate: true, deep: true }
    );
    return () => renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});
const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? (void 0).body : void 0
});
const messageProps = buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};
const placementInstances = shallowReactive(
  {}
);
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) {
    placementInstances[placement] = shallowReactive([]);
  }
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev)
    return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElMessage"
  },
  __name: "message",
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const isStartTransition = ref(false);
    const { ns, zIndex } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex;
    const messageRef = ref();
    const visible = ref(false);
    const height = ref(0);
    let stopTimer = void 0;
    const badgeType = computed(
      () => props.type ? props.type === "error" ? "danger" : props.type : "info"
    );
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = computed(
      () => props.icon || TypeComponentsMap[props.type] || ""
    );
    const placement = computed(() => props.placement || MESSAGE_DEFAULT_PLACEMENT);
    const lastOffset = computed(() => getLastOffset(props.id, placement.value));
    const offset = computed(() => {
      return getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value;
    });
    const bottom = computed(() => height.value + offset.value);
    const horizontalClass = computed(() => {
      if (placement.value.includes("left"))
        return ns.is("left");
      if (placement.value.includes("right"))
        return ns.is("right");
      return ns.is("center");
    });
    const verticalProperty = computed(
      () => placement.value.startsWith("top") ? "top" : "bottom"
    );
    const customStyle = computed(() => ({
      [verticalProperty.value]: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0)
        return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer == null ? void 0 : stopTimer();
    }
    function close() {
      visible.value = false;
      nextTick(() => {
        var _a;
        if (!isStartTransition.value) {
          (_a = props.onClose) == null ? void 0 : _a.call(props);
          emit("destroy");
        }
      });
    }
    function keydown(event) {
      const code = getEventCode(event);
      if (code === EVENT_CODE.esc) {
        close();
      }
    }
    watch(
      () => props.repeatNum,
      () => {
        clearTimer();
        startTimer();
      }
    );
    useEventListener(void 0, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    __expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
        onBeforeLeave: _ctx.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            id: _ctx.id,
            ref_key: "messageRef",
            ref: messageRef,
            class: normalizeClass([
              unref(ns).b(),
              { [unref(ns).m(_ctx.type)]: _ctx.type },
              unref(ns).is("closable", _ctx.showClose),
              unref(ns).is("plain", _ctx.plain),
              unref(ns).is("bottom", verticalProperty.value === "bottom"),
              horizontalClass.value,
              _ctx.customClass
            ]),
            style: normalizeStyle(customStyle.value),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer
          }, [
            _ctx.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
              key: 0,
              value: _ctx.repeatNum,
              type: badgeType.value,
              class: normalizeClass(unref(ns).e("badge"))
            }, null, 8, ["value", "type", "class"])) : createCommentVNode("v-if", true),
            iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(ns).e("icon"), typeClass.value])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (openBlock(), createElementBlock(
                "p",
                {
                  key: 0,
                  class: normalizeClass(unref(ns).e("content"))
                },
                toDisplayString(_ctx.message),
                3
              )) : (openBlock(), createElementBlock(
                Fragment,
                { key: 1 },
                [
                  createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                  createElementVNode("p", {
                    class: normalizeClass(unref(ns).e("content")),
                    innerHTML: _ctx.message
                  }, null, 10, _hoisted_2)
                ],
                2112
              ))
            ]),
            _ctx.showClose ? (openBlock(), createBlock(unref(ElIcon), {
              key: 2,
              class: normalizeClass(unref(ns).e("closeBtn")),
              onClick: withModifiers(close, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(unref(Close))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true)
          ], 46, _hoisted_1), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
var MessageConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
let seed = 1;
const normalizeAppendTo = (normalized) => {
  const appendTo = normalized.appendTo;
  if (!appendTo) {
    normalized.appendTo = (void 0).body;
  } else if (isString(normalized.appendTo)) {
    let appendTo2 = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo2)) {
      appendTo2 = (void 0).body;
    }
    normalized.appendTo = appendTo2;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && isString(messageConfig.placement) && messageConfig.placement) {
    normalized.placement = messageConfig.placement;
  }
  if (!normalized.placement) {
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
  if (!messagePlacement.includes(normalized.placement)) {
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT;
  }
};
const normalizeOptions = (params) => {
  const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = messageConfig.grouping;
  }
  if (isNumber(messageConfig.duration) && normalized.duration === 3e3) {
    normalized.duration = messageConfig.duration;
  }
  if (isNumber(messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = messageConfig.offset;
  }
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = messageConfig.showClose;
  }
  if (isBoolean(messageConfig.plain) && !normalized.plain) {
    normalized.plain = messageConfig.plain;
  }
  return normalized;
};
const closeMessage = (instance) => {
  const placement = instance.props.placement || MESSAGE_DEFAULT_PLACEMENT;
  const instances = placementInstances[placement];
  const idx = instances.indexOf(instance);
  if (idx === -1)
    return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = (void 0).createElement("div");
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose == null ? void 0 : userOnClose();
      closeMessage(instance);
    },
    onDestroy: () => {
      render(null, container);
    }
  };
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message) ? {
      default: isFunction(props.message) ? props.message : () => props.message
    } : null
  );
  vnode.appContext = context || message._context;
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const handler = {
    close: () => {
      vm.exposed.close();
    }
  };
  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient)
    return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = getOrCreatePlacementInstances(
    normalized.placement || MESSAGE_DEFAULT_PLACEMENT
  );
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(
      ({ vnode: vm }) => {
        var _a;
        return ((_a = vm.props) == null ? void 0 : _a.message) === normalized.message;
      }
    );
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => void 0 };
  }
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});
function closeAll(type) {
  for (const placement in placementInstances) {
    if (hasOwn(placementInstances, placement)) {
      const instances = [...placementInstances[placement]];
      for (const instance of instances) {
        if (!type || type === instance.props.type) {
          instance.handler.close();
        }
      }
    }
  }
}
function closeAllByPlacement(placement) {
  if (!placementInstances[placement])
    return;
  const instances = [...placementInstances[placement]];
  instances.forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
const MOBILE_BREAKPOINT = 768;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shoppingCart",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultItems = [
      {
        id: 1,
        name: "A品項",
        price: 99,
        count: 0,
        available: true
      },
      {
        id: 2,
        name: "B品項",
        price: 45.5,
        count: 0,
        available: true
      },
      {
        id: 3,
        name: "C品項",
        price: 120,
        count: 0,
        available: false
      },
      {
        id: 4,
        name: "D品項",
        price: 88.8,
        count: 0,
        available: true
      }
    ];
    const HistoryOpen = ref(false);
    const carOpen = ref(false);
    const Items = ref([]);
    const ItemsIncar = ref([]);
    const ItemsHistory = ref([]);
    const windowWidth = ref((void 0).innerWidth);
    const isSmallScreen = computed(() => {
      return windowWidth.value <= MOBILE_BREAKPOINT ? true : false;
    });
    const ItemAdd = () => {
      const cartItems = Items.value.filter((item) => item.count > 0);
      if (!ItemsIncar.value || ItemsIncar.value.length === 0) {
        ItemsIncar.value = cartItems;
      } else {
        const existingMap = /* @__PURE__ */ new Map();
        ItemsIncar.value.forEach((item) => {
          existingMap.set(item.name, item);
        });
        cartItems.forEach((newItem) => {
          const existingItem = existingMap.get(newItem.name);
          if (existingItem) {
            existingItem.count += newItem.count;
          } else {
            existingMap.set(newItem.name, { ...newItem });
          }
        });
        ItemsIncar.value = Array.from(existingMap.values());
      }
      ElMessage.success("已成功加入購物車");
      Items.value = JSON.parse(JSON.stringify(defaultItems));
      totalAmount.value = calculateTotal();
    };
    const countminus = (id) => {
      const itemToUpdate = Items.value.find((item) => item.id === id);
      if (itemToUpdate && itemToUpdate.count > 0) {
        itemToUpdate.count -= 1;
      }
    };
    const countplus = (id) => {
      const itemToUpdate = Items.value.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.count += 1;
      }
    };
    const calculateTotal = () => {
      if (ItemsIncar.value.length === 0) {
        return 0;
      }
      const totalAmount2 = ItemsIncar.value.reduce((accumulator, item) => {
        const itemTotal = item.count * item.price;
        return accumulator + itemTotal;
      }, 0);
      return parseFloat(totalAmount2.toFixed(2));
    };
    const totalAmount = ref();
    const carClose = (confirm) => {
      if (confirm) {
        ElMessage.success("已成功送出訂單");
        ItemsHistory.value.push(ItemsIncar.value);
        console.log(ItemsHistory.value[1]);
        ItemsIncar.value = [];
        totalAmount.value = 0;
      }
      carOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_input = ElInput;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "padding": "1rem 1rem" } }, _attrs))} data-v-98f0f20a>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: carOpen.value,
        "onUpdate:modelValue": ($event) => carOpen.value = $event,
        title: "購物車"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "font-size": "16px" })}" data-v-98f0f20a${_scopeId}><h3 data-v-98f0f20a${_scopeId}>您購買的清單如下:</h3>`);
            _push2(ssrRenderComponent(_component_el_table, {
              data: ItemsIncar.value,
              style: { "width": "100%", "border-radius": "8px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "name",
                    label: "名稱"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "count",
                    label: "數量"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "price",
                    label: "價格"
                  }, {
                    default: withCtx((scope, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-98f0f20a${_scopeId3}>${ssrInterpolate(scope.row.price * scope.row.count)}</span>`);
                      } else {
                        return [
                          createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "name",
                      label: "名稱"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "count",
                      label: "數量"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "price",
                      label: "價格"
                    }, {
                      default: withCtx((scope) => [
                        createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<br data-v-98f0f20a${_scopeId}><p data-v-98f0f20a${_scopeId}>總金額為：${ssrInterpolate(totalAmount.value)}</p>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "success",
              onClick: ($event) => carClose(true)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`確認送出`);
                } else {
                  return [
                    createTextVNode("確認送出")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "danger",
              onClick: ($event) => carClose(false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "font-size": "16px" } }, [
                createVNode("h3", null, "您購買的清單如下:"),
                createVNode(_component_el_table, {
                  data: ItemsIncar.value,
                  style: { "width": "100%", "border-radius": "8px" }
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_table_column, {
                      prop: "name",
                      label: "名稱"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "count",
                      label: "數量"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "price",
                      label: "價格"
                    }, {
                      default: withCtx((scope) => [
                        createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"]),
                createVNode("br"),
                createVNode("p", null, "總金額為：" + toDisplayString(totalAmount.value), 1),
                createVNode(_component_el_button, {
                  type: "success",
                  onClick: ($event) => carClose(true)
                }, {
                  default: withCtx(() => [
                    createTextVNode("確認送出")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_el_button, {
                  type: "danger",
                  onClick: ($event) => carClose(false)
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: HistoryOpen.value,
        "onUpdate:modelValue": ($event) => HistoryOpen.value = $event,
        title: "歷史訂單"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "font-size": "16px" })}" data-v-98f0f20a${_scopeId}><!--[-->`);
            ssrRenderList(ItemsHistory.value, (item, index) => {
              _push2(`<div data-v-98f0f20a${_scopeId}><p style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "center", "background-color": "beige" })}" data-v-98f0f20a${_scopeId}> 第${ssrInterpolate(index + 1)}筆 </p>`);
              _push2(ssrRenderComponent(_component_el_table, {
                data: item,
                style: { "width": "100%" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      prop: "name",
                      label: "名稱"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      prop: "count",
                      label: "數量"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_table_column, {
                      prop: "price",
                      label: "價格"
                    }, {
                      default: withCtx((scope, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span data-v-98f0f20a${_scopeId3}>${ssrInterpolate(scope.row.price * scope.row.count)}</span>`);
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_table_column, {
                        prop: "name",
                        label: "名稱"
                      }),
                      createVNode(_component_el_table_column, {
                        prop: "count",
                        label: "數量"
                      }),
                      createVNode(_component_el_table_column, {
                        prop: "price",
                        label: "價格"
                      }, {
                        default: withCtx((scope) => [
                          createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<br data-v-98f0f20a${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { style: { "font-size": "16px" } }, [
                (openBlock(true), createBlock(Fragment, null, renderList(ItemsHistory.value, (item, index) => {
                  return openBlock(), createBlock("div", { key: index }, [
                    createVNode("p", { style: { "display": "flex", "align-items": "center", "justify-content": "center", "background-color": "beige" } }, " 第" + toDisplayString(index + 1) + "筆 ", 1),
                    createVNode(_component_el_table, {
                      data: item,
                      style: { "width": "100%" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          prop: "name",
                          label: "名稱"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "count",
                          label: "數量"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "price",
                          label: "價格"
                        }, {
                          default: withCtx((scope) => [
                            createVNode("span", null, toDisplayString(scope.row.price * scope.row.count), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"]),
                    createVNode("br")
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "end" })}" data-v-98f0f20a>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => HistoryOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`歷史訂單`);
          } else {
            return [
              createTextVNode("歷史訂單")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: ($event) => carOpen.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`購物車`);
          } else {
            return [
              createTextVNode("購物車")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><br data-v-98f0f20a><!--[-->`);
      ssrRenderList(Items.value, (item) => {
        _push(ssrRenderComponent(_component_el_card, {
          style: [
            isSmallScreen.value ? null : { display: "none" },
            { "margin": "0.5rem", "border-radius": "8px" }
          ],
          key: item.id,
          value: item.count
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "align-items": "center" })}" data-v-98f0f20a${_scopeId}><p data-v-98f0f20a${_scopeId}>${ssrInterpolate(item.id)}</p><p data-v-98f0f20a${_scopeId}>名稱： ${ssrInterpolate(item.name)}</p><p data-v-98f0f20a${_scopeId}>價格(單個)： ${ssrInterpolate(item.price)}</p><p data-v-98f0f20a${_scopeId}>是否有存貨： ${ssrInterpolate(item.available ? "有" : "無")}</p><p data-v-98f0f20a${_scopeId}>數量：</p>`);
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: item.count,
                "onUpdate:modelValue": ($event) => item.count = $event
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
                  createVNode("p", null, toDisplayString(item.id), 1),
                  createVNode("p", null, "名稱： " + toDisplayString(item.name), 1),
                  createVNode("p", null, "價格(單個)： " + toDisplayString(item.price), 1),
                  createVNode("p", null, "是否有存貨： " + toDisplayString(item.available ? "有" : "無"), 1),
                  createVNode("p", null, "數量："),
                  createVNode(_component_el_input, {
                    modelValue: item.count,
                    "onUpdate:modelValue": ($event) => item.count = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_el_table, {
        style: [
          !isSmallScreen.value ? null : { display: "none" },
          { "width": "100%", "border-radius": "8px" }
        ],
        data: Items.value,
        class: "responsive-car-table",
        "header-cell-style": { backgroundColor: "#C0C7D8", color: "black" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, { prop: "id" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "名稱"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "price",
              label: "價格(單個)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "available",
              label: "是否有存貨"
            }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-98f0f20a${_scopeId2}>${ssrInterpolate(scope.row.available ? "有" : "無")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(scope.row.available ? "有" : "無"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "count",
              label: "數量"
            }, {
              default: withCtx((scope, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "0.5rem", "align-items": "center" })}" data-v-98f0f20a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => countplus(scope.row.id)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-98f0f20a${_scopeId3}><path d="M2 8H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-98f0f20a${_scopeId3}></path><path d="M8 2V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-98f0f20a${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2 8H14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            }),
                            createVNode("path", {
                              d: "M8 2V14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<span style="${ssrRenderStyle({ "font-size": "24px", "font-weight": "bold", "padding": "0" })}" data-v-98f0f20a${_scopeId2}>${ssrInterpolate(scope.row.count)}</span>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => countminus(scope.row.id)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-98f0f20a${_scopeId3}><path d="M2 8H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-98f0f20a${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2 8H14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { style: { "display": "flex", "gap": "0.5rem", "align-items": "center" } }, [
                      createVNode(_component_el_button, {
                        onClick: ($event) => countplus(scope.row.id)
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2 8H14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            }),
                            createVNode("path", {
                              d: "M8 2V14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ]))
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode("span", { style: { "font-size": "24px", "font-weight": "bold", "padding": "0" } }, toDisplayString(scope.row.count), 1),
                      createVNode(_component_el_button, {
                        onClick: ($event) => countminus(scope.row.id)
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              d: "M2 8H14",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ]))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, { prop: "id" }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "名稱"
              }),
              createVNode(_component_el_table_column, {
                prop: "price",
                label: "價格(單個)"
              }),
              createVNode(_component_el_table_column, {
                prop: "available",
                label: "是否有存貨"
              }, {
                default: withCtx((scope) => [
                  createVNode("span", null, toDisplayString(scope.row.available ? "有" : "無"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "count",
                label: "數量"
              }, {
                default: withCtx((scope) => [
                  createVNode("div", { style: { "display": "flex", "gap": "0.5rem", "align-items": "center" } }, [
                    createVNode(_component_el_button, {
                      onClick: ($event) => countplus(scope.row.id)
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 16 16",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M2 8H14",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }),
                          createVNode("path", {
                            d: "M8 2V14",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode("span", { style: { "font-size": "24px", "font-weight": "bold", "padding": "0" } }, toDisplayString(scope.row.count), 1),
                    createVNode(_component_el_button, {
                      onClick: ($event) => countminus(scope.row.id)
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          width: "16",
                          height: "16",
                          viewBox: "0 0 16 16",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M2 8H14",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br data-v-98f0f20a>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "success",
        onClick: ItemAdd
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`加入購物車`);
          } else {
            return [
              createTextVNode("加入購物車")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shoppingCart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const shoppingCart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98f0f20a"]]);

export { shoppingCart as default };
//# sourceMappingURL=shoppingCart-B2JylrnZ.mjs.map
