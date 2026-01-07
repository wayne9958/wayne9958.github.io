import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, createBlock, openBlock, computed, unref, withDirectives, createElementBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, vShow, withModifiers, createElementVNode, Transition, Fragment, renderList, toDisplayString, provide, resolveDynamicComponent, inject, getCurrentInstance, reactive, useSlots, watch, shallowRef, h, isVNode, triggerRef, useSSRContext } from 'vue';
import { w as withInstall, a as withNoopInstall, E as ElButton, _ as _export_sfc$1, b as buildProps, u as useLocale, c as ElIcon, d as arrow_left_default, e as arrow_right_default, C as CHANGE_EVENT, m as mutable, f as definePropType, g as flattedChildren } from './el-button-DUkK2qXZ.mjs';
import { _ as _export_sfc, u as useNamespace, i as isNumber, a as isUndefined } from './server.mjs';
import { throttle } from 'lodash-unified';
import { isObject, isString } from '@vue/shared';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import '@vueuse/core';
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

const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: ""
  },
  trigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: {
    type: String,
    values: ["", "none", "outside"],
    default: ""
  },
  arrow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "hover"
  },
  type: {
    type: String,
    values: ["", "card"],
    default: ""
  },
  cardScale: {
    type: Number,
    default: 0.83
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  motionBlur: Boolean
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(isNumber)
};
const carouselContextKey = /* @__PURE__ */ Symbol("carouselContextKey");
const CAROUSEL_ITEM_NAME = "ElCarouselItem";
const getOrderedChildren = (vm, childComponentName, children) => {
  const nodes = flattedChildren(vm.subTree).filter(
    (n) => {
      var _a;
      return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === childComponentName && !!n.component;
    }
  );
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
  const children = shallowRef({});
  const orderedChildren = shallowRef([]);
  const nodesMap = /* @__PURE__ */ new WeakMap();
  const addChild = (child) => {
    children.value[child.uid] = child;
    triggerRef(children);
  };
  const removeChild = (child) => {
    delete children.value[child.uid];
    triggerRef(children);
    const childNode = child.getVnode().el;
    const parentNode = childNode.parentNode;
    const childNodes = nodesMap.get(parentNode);
    const index2 = childNodes.indexOf(childNode);
    childNodes.splice(index2, 1);
  };
  const sortChildren = () => {
    orderedChildren.value = getOrderedChildren(
      vm,
      childComponentName,
      children.value
    );
  };
  const IsolatedRenderer = (props) => {
    return props.render();
  };
  const ChildrenSorter = defineComponent({
    setup(_, { slots }) {
      return () => {
        sortChildren();
        return slots.default ? h(IsolatedRenderer, {
          render: slots.default
        }) : null;
      };
    }
  });
  return {
    children: orderedChildren,
    addChild,
    removeChild,
    ChildrenSorter
  };
};
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
    ChildrenSorter: ItemsSorter
  } = useOrderedChildren(
    getCurrentInstance(),
    CAROUSEL_ITEM_NAME
  );
  const slots = useSlots();
  const activeIndex = ref(-1);
  const timer = ref(null);
  const hover = ref(false);
  const root = ref();
  const containerHeight = ref(0);
  const isItemsTwoLength = ref(true);
  const arrowDisplay = computed(
    () => props.arrow !== "never" && !unref(isVertical)
  );
  const hasLabel = computed(() => {
    return items.value.some((item) => item.props.label.toString().length > 0);
  });
  const isCardType = computed(() => props.type === "card");
  const isVertical = computed(() => props.direction === "vertical");
  const containerStyle = computed(() => {
    if (props.height !== "auto") {
      return {
        height: props.height
      };
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: "hidden"
    };
  });
  const throttledArrowClick = throttle(
    (index2) => {
      setActiveItem(index2);
    },
    THROTTLE_TIME,
    { trailing: true }
  );
  const throttledIndicatorHover = throttle((index2) => {
    handleIndicatorHover(index2);
  }, THROTTLE_TIME);
  const isTwoLengthShow = (index2) => {
    if (!isItemsTwoLength.value)
      return true;
    return activeIndex.value <= 1 ? index2 <= 1 : index2 > 1;
  };
  function pauseTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
  function startTimer() {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return;
    timer.value = setInterval(() => playSlides(), props.interval);
  }
  const playSlides = () => {
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else if (props.loop) {
      activeIndex.value = 0;
    }
  };
  function setActiveItem(index2) {
    if (isString(index2)) {
      const filteredItems = items.value.filter(
        (item) => item.props.name === index2
      );
      if (filteredItems.length > 0) {
        index2 = items.value.indexOf(filteredItems[0]);
      }
    }
    index2 = Number(index2);
    if (Number.isNaN(index2) || index2 !== Math.floor(index2)) {
      return;
    }
    const itemCount = items.value.length;
    const oldIndex = activeIndex.value;
    if (index2 < 0) {
      activeIndex.value = props.loop ? itemCount - 1 : 0;
    } else if (index2 >= itemCount) {
      activeIndex.value = props.loop ? 0 : itemCount - 1;
    } else {
      activeIndex.value = index2;
    }
    if (oldIndex === activeIndex.value) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }
  function resetItemPosition(oldIndex) {
    items.value.forEach((item, index2) => {
      item.translateItem(index2, activeIndex.value, oldIndex);
    });
  }
  function itemInStage(item, index2) {
    var _a, _b, _c, _d;
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage)
      return false;
    const nextItemIndex = index2 + 1;
    const prevItemIndex = index2 - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = (_b = (_a = _items[nextItemIndex]) == null ? void 0 : _a.states) == null ? void 0 : _b.active;
    const isPrevItemActive = (_d = (_c = _items[prevItemIndex]) == null ? void 0 : _c.states) == null ? void 0 : _d.active;
    if (index2 === lastItemIndex && isFirstItemActive || isNextItemActive) {
      return "left";
    } else if (index2 === 0 && isLastItemActive || isPrevItemActive) {
      return "right";
    }
    return false;
  }
  function handleMouseEnter() {
    hover.value = true;
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }
  function handleMouseLeave() {
    hover.value = false;
    startTimer();
  }
  function handleButtonEnter(arrow) {
    if (unref(isVertical))
      return;
    items.value.forEach((item, index2) => {
      if (arrow === itemInStage(item, index2)) {
        item.states.hover = true;
      }
    });
  }
  function handleButtonLeave() {
    if (unref(isVertical))
      return;
    items.value.forEach((item) => {
      item.states.hover = false;
    });
  }
  function handleIndicatorClick(index2) {
    activeIndex.value = index2;
  }
  function handleIndicatorHover(index2) {
    if (props.trigger === "hover" && index2 !== activeIndex.value) {
      activeIndex.value = index2;
    }
  }
  function prev() {
    setActiveItem(activeIndex.value - 1);
  }
  function next() {
    setActiveItem(activeIndex.value + 1);
  }
  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover)
      startTimer();
  }
  function setContainerHeight(height) {
    if (props.height !== "auto")
      return;
    containerHeight.value = height;
  }
  function PlaceholderItem() {
    var _a;
    const defaultSlots = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (!defaultSlots)
      return null;
    const flatSlots = flattedChildren(defaultSlots);
    const normalizeSlots = flatSlots.filter((slot) => {
      return isVNode(slot) && slot.type.name === CAROUSEL_ITEM_NAME;
    });
    if ((normalizeSlots == null ? void 0 : normalizeSlots.length) === 2 && props.loop && !isCardType.value) {
      isItemsTwoLength.value = true;
      return normalizeSlots;
    }
    isItemsTwoLength.value = false;
    return null;
  }
  watch(
    () => activeIndex.value,
    (current, prev2) => {
      resetItemPosition(prev2);
      if (isItemsTwoLength.value) {
        current = current % 2;
        prev2 = prev2 % 2;
      }
      if (prev2 > -1) {
        emit(CHANGE_EVENT, current, prev2);
      }
    }
  );
  const exposeActiveIndex = computed({
    get: () => {
      return isItemsTwoLength.value ? activeIndex.value % 2 : activeIndex.value;
    },
    set: (value) => activeIndex.value = value
  });
  watch(
    () => props.autoplay,
    (autoplay) => {
      autoplay ? startTimer() : pauseTimer();
    }
  );
  watch(
    () => props.loop,
    () => {
      setActiveItem(activeIndex.value);
    }
  );
  watch(
    () => props.interval,
    () => {
      resetTimer();
    }
  );
  shallowRef();
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    cardScale: props.cardScale,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight
  });
  return {
    root,
    activeIndex,
    exposeActiveIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    ItemsSorter,
    throttledArrowClick,
    throttledIndicatorHover
  };
};
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["onMouseenter", "onClick"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  style: { "display": "none" }
};
const COMPONENT_NAME = "ElCarousel";
const _sfc_main$4 = defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "carousel",
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      root,
      activeIndex,
      exposeActiveIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      setActiveItem,
      prev,
      next,
      PlaceholderItem,
      isTwoLengthShow,
      ItemsSorter,
      throttledArrowClick,
      throttledIndicatorHover
    } = useCarousel(props, emit);
    const ns = useNamespace("carousel");
    const { t } = useLocale();
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (unref(hasLabel)) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside") {
        classes.push(ns.em("indicators", "outside"));
      }
      if (unref(isVertical)) {
        classes.push(ns.em("indicators", "right"));
      }
      return classes;
    });
    function handleTransitionStart(e) {
      if (!props.motionBlur)
        return;
      const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
      e.currentTarget.classList.add(kls);
    }
    function handleTransitionEnd(e) {
      if (!props.motionBlur)
        return;
      const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
      e.currentTarget.classList.remove(kls);
    }
    __expose({
      activeIndex: exposeActiveIndex,
      setActiveItem,
      prev,
      next
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: normalizeClass(carouselClasses.value),
          onMouseenter: _cache[6] || (_cache[6] = withModifiers(
            (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args),
            ["stop"]
          )),
          onMouseleave: _cache[7] || (_cache[7] = withModifiers(
            (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args),
            ["stop"]
          ))
        },
        [
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: "carousel-arrow-left",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
                "aria-label": unref(t)("el.carousel.leftArrow"),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleButtonEnter)("left")),
                onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 42, _hoisted_1), [
                [vShow, (_ctx.arrow === "always" || unref(hover)) && (_ctx.loop || unref(activeIndex) > 0)]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 1,
            name: "carousel-arrow-right",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
                "aria-label": unref(t)("el.carousel.rightArrow"),
                onMouseenter: _cache[3] || (_cache[3] = ($event) => unref(handleButtonEnter)("right")),
                onMouseleave: _cache[4] || (_cache[4] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 42, _hoisted_2), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (_ctx.loop || unref(activeIndex) < unref(items).length - 1)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("container")),
              style: normalizeStyle(unref(containerStyle)),
              onTransitionstart: handleTransitionStart,
              onTransitionend: handleTransitionEnd
            },
            [
              createVNode(unref(PlaceholderItem)),
              renderSlot(_ctx.$slots, "default")
            ],
            38
          ),
          createVNode(unref(ItemsSorter), null, {
            default: withCtx(() => [
              _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock(
                "ul",
                {
                  key: 0,
                  class: normalizeClass(indicatorsClasses.value)
                },
                [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(items), (item, index2) => {
                      return withDirectives((openBlock(), createElementBlock("li", {
                        key: index2,
                        class: normalizeClass([
                          unref(ns).e("indicator"),
                          unref(ns).em("indicator", _ctx.direction),
                          unref(ns).is("active", index2 === unref(activeIndex))
                        ]),
                        onMouseenter: ($event) => unref(throttledIndicatorHover)(index2),
                        onClick: withModifiers(($event) => unref(handleIndicatorClick)(index2), ["stop"])
                      }, [
                        createElementVNode("button", {
                          class: normalizeClass(unref(ns).e("button")),
                          "aria-label": unref(t)("el.carousel.indicator", { index: index2 + 1 })
                        }, [
                          unref(hasLabel) ? (openBlock(), createElementBlock(
                            "span",
                            _hoisted_5,
                            toDisplayString(item.props.label),
                            1
                          )) : createCommentVNode("v-if", true)
                        ], 10, _hoisted_4)
                      ], 42, _hoisted_3)), [
                        [vShow, unref(isTwoLengthShow)(index2)]
                      ]);
                    }),
                    128
                  ))
                ],
                2
              )) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }),
          _ctx.motionBlur ? (openBlock(), createElementBlock("svg", _hoisted_6, [..._cache[8] || (_cache[8] = [
            createElementVNode(
              "defs",
              null,
              [
                createElementVNode("filter", { id: "elCarouselHorizontal" }, [
                  createElementVNode("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: "12,0"
                  })
                ]),
                createElementVNode("filter", { id: "elCarouselVertical" }, [
                  createElementVNode("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: "0,10"
                  })
                ])
              ],
              -1
            )
          ])])) : createCommentVNode("v-if", true)
        ],
        34
      );
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);
const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});
const useCarouselItem = (props) => {
  const carouselContext = inject(carouselContextKey);
  const instance = getCurrentInstance();
  const carouselItemRef = ref();
  const hover = ref(false);
  const translate = ref(0);
  const scale = ref(1);
  const active = ref(false);
  const ready = ref(false);
  const inStage = ref(false);
  const animating = ref(false);
  const { isCardType, isVertical, cardScale } = carouselContext;
  function processIndex(index2, activeIndex, length) {
    const lastItemIndex = length - 1;
    const prevItemIndex = activeIndex - 1;
    const nextItemIndex = activeIndex + 1;
    const halfItemIndex = length / 2;
    if (activeIndex === 0 && index2 === lastItemIndex) {
      return -1;
    } else if (activeIndex === lastItemIndex && index2 === 0) {
      return length;
    } else if (index2 < prevItemIndex && activeIndex - index2 >= halfItemIndex) {
      return length + 1;
    } else if (index2 > nextItemIndex && index2 - activeIndex >= halfItemIndex) {
      return -2;
    }
    return index2;
  }
  function calcCardTranslate(index2, activeIndex) {
    var _a, _b;
    const parentWidth = unref(isVertical) ? ((_a = carouselContext.root.value) == null ? void 0 : _a.offsetHeight) || 0 : ((_b = carouselContext.root.value) == null ? void 0 : _b.offsetWidth) || 0;
    if (inStage.value) {
      return parentWidth * ((2 - cardScale) * (index2 - activeIndex) + 1) / 4;
    } else if (index2 < activeIndex) {
      return -(1 + cardScale) * parentWidth / 4;
    } else {
      return (3 + cardScale) * parentWidth / 4;
    }
  }
  function calcTranslate(index2, activeIndex, isVertical2) {
    const rootEl = carouselContext.root.value;
    if (!rootEl)
      return 0;
    const distance = (isVertical2 ? rootEl.offsetHeight : rootEl.offsetWidth) || 0;
    return distance * (index2 - activeIndex);
  }
  const translateItem = (index2, activeIndex, oldIndex) => {
    var _a;
    const _isCardType = unref(isCardType);
    const carouselItemLength = (_a = carouselContext.items.value.length) != null ? _a : Number.NaN;
    const isActive = index2 === activeIndex;
    if (!_isCardType && !isUndefined(oldIndex)) {
      animating.value = isActive || index2 === oldIndex;
    }
    if (!isActive && carouselItemLength > 2 && carouselContext.loop) {
      index2 = processIndex(index2, activeIndex, carouselItemLength);
    }
    const _isVertical = unref(isVertical);
    active.value = isActive;
    if (_isCardType) {
      inStage.value = Math.round(Math.abs(index2 - activeIndex)) <= 1;
      translate.value = calcCardTranslate(index2, activeIndex);
      scale.value = unref(active) ? 1 : cardScale;
    } else {
      translate.value = calcTranslate(index2, activeIndex, _isVertical);
    }
    ready.value = true;
    if (isActive && carouselItemRef.value) {
      carouselContext.setContainerHeight(carouselItemRef.value.offsetHeight);
    }
  };
  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index2 = carouselContext.items.value.findIndex(
        ({ uid }) => uid === instance.uid
      );
      carouselContext.setActiveItem(index2);
    }
  }
  const carouselItemContext = {
    props,
    states: reactive({
      hover,
      translate,
      scale,
      active,
      ready,
      inStage,
      animating
    }),
    uid: instance.uid,
    getVnode: () => instance.vnode,
    translateItem
  };
  carouselContext.addItem(carouselItemContext);
  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick
  };
};
const _sfc_main$3 = defineComponent({
  ...{
    name: CAROUSEL_ITEM_NAME
  },
  __name: "carousel-item",
  props: carouselItemProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem(props);
    const itemKls = computed(() => [
      ns.e("item"),
      ns.is("active", active.value),
      ns.is("in-stage", inStage.value),
      ns.is("hover", hover.value),
      ns.is("animating", animating.value),
      {
        [ns.em("item", "card")]: isCardType.value,
        [ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
      }
    ]);
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock(
        "div",
        {
          ref_key: "carouselItemRef",
          ref: carouselItemRef,
          class: normalizeClass(itemKls.value),
          style: normalizeStyle(itemStyle.value),
          onClick: _cache[0] || (_cache[0] = (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
        },
        [
          unref(isCardType) ? withDirectives((openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("mask"))
            },
            null,
            2
          )), [
            [vShow, !unref(active)]
          ]) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default")
        ],
        6
      )), [
        [vShow, unref(ready)]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);
const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);
const rowContextKey = /* @__PURE__ */ Symbol("rowContextKey");
const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  align: {
    type: String,
    values: RowAlign
  }
});
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElRow"
  },
  __name: "row",
  props: rowProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, !!props.align)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(rowKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Row = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);
const ElRow = withInstall(Row);
const colProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElCol"
  },
  __name: "col",
  props: colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const ns = useNamespace("col");
    const style = computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === "span")
            classes.push(ns.b(`${props[prop]}`));
          else if (size > 0)
            classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`)
            );
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(colKls.value),
        style: normalizeStyle(style.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Col = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
const ElCol = withInstall(Col);
const _imports_0 = "data:image/png;base64,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";
const _imports_1 = "data:image/png;base64,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";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const profile = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_carousel = ElCarousel;
      const _component_el_carousel_item = ElCarouselItem;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_button = ElButton;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-790edd61><div data-v-790edd61>`);
      _push(ssrRenderComponent(_component_el_carousel, {
        height: "200px",
        "motion-blur": "",
        style: { "background-color": "darkgrey" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_carousel_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" })}" data-v-790edd61${_scopeId2}> Welcome </h3>`);
                } else {
                  return [
                    createVNode("h3", { style: { "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" } }, " Welcome ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_carousel_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" })}" data-v-790edd61${_scopeId2}> Wayne&#39;s Space </h3>`);
                } else {
                  return [
                    createVNode("h3", { style: { "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" } }, " Wayne's Space ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_carousel_item, null, {
                default: withCtx(() => [
                  createVNode("h3", { style: { "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" } }, " Welcome ")
                ]),
                _: 1
              }),
              createVNode(_component_el_carousel_item, null, {
                default: withCtx(() => [
                  createVNode("h3", { style: { "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "48px" } }, " Wayne's Space ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_row, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => profile.value = 1,
                    class: ["nav-btn", { "is-active": profile.value === 1 }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`簡介`);
                      } else {
                        return [
                          createTextVNode("簡介")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: ($event) => profile.value = 1,
                      class: ["nav-btn", { "is-active": profile.value === 1 }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("簡介")
                      ]),
                      _: 1
                    }, 8, ["onClick", "class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => profile.value = 2,
                    class: ["nav-btn", { "is-active": profile.value === 2 }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`經歷`);
                      } else {
                        return [
                          createTextVNode("經歷")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: ($event) => profile.value = 2,
                      class: ["nav-btn", { "is-active": profile.value === 2 }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("經歷")
                      ]),
                      _: 1
                    }, 8, ["onClick", "class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 8 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => profile.value = 3,
                    class: ["nav-btn", { "is-active": profile.value === 3 }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`作品集`);
                      } else {
                        return [
                          createTextVNode("作品集")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      onClick: ($event) => profile.value = 3,
                      class: ["nav-btn", { "is-active": profile.value === 3 }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("作品集")
                      ]),
                      _: 1
                    }, 8, ["onClick", "class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    onClick: ($event) => profile.value = 1,
                    class: ["nav-btn", { "is-active": profile.value === 1 }]
                  }, {
                    default: withCtx(() => [
                      createTextVNode("簡介")
                    ]),
                    _: 1
                  }, 8, ["onClick", "class"])
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    onClick: ($event) => profile.value = 2,
                    class: ["nav-btn", { "is-active": profile.value === 2 }]
                  }, {
                    default: withCtx(() => [
                      createTextVNode("經歷")
                    ]),
                    _: 1
                  }, 8, ["onClick", "class"])
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    onClick: ($event) => profile.value = 3,
                    class: ["nav-btn", { "is-active": profile.value === 3 }]
                  }, {
                    default: withCtx(() => [
                      createTextVNode("作品集")
                    ]),
                    _: 1
                  }, 8, ["onClick", "class"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div style="${ssrRenderStyle(profile.value === 1 ? null : { display: "none" })}" data-v-790edd61>`);
      _push(ssrRenderComponent(_component_el_row, { style: { "padding": "1rem", "font-size": "20px" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              sm: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-790edd61${_scopeId2}> 嗨你好，我是一個本科系畢業，有一年前端工作經驗的工程師<br data-v-790edd61${_scopeId2}><br data-v-790edd61${_scopeId2}> 能與後端工程師合作串接API、和設計師合作切版，和SA討論需求。<br data-v-790edd61${_scopeId2}><br data-v-790edd61${_scopeId2}> 若有興趣合作可用下方管道聯繫我 </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" 嗨你好，我是一個本科系畢業，有一年前端工作經驗的工程師"),
                      createVNode("br"),
                      createVNode("br"),
                      createTextVNode(" 能與後端工程師合作串接API、和設計師合作切版，和SA討論需求。"),
                      createVNode("br"),
                      createVNode("br"),
                      createTextVNode(" 若有興趣合作可用下方管道聯繫我 ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, {
              xs: 24,
              sm: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-790edd61${_scopeId2}>使用工具:</p><div class="slide" style="${ssrRenderStyle({ "width": "50%", "overflow": "hidden" })}" data-v-790edd61${_scopeId2}><div class="circleImg" style="${ssrRenderStyle({ "display": "flex", "width": "200%" })}" data-v-790edd61${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="" style="${ssrRenderStyle({ "width": "50%" })}" data-v-790edd61${_scopeId2}><img${ssrRenderAttr("src", _imports_1)} alt="" style="${ssrRenderStyle({ "width": "50%" })}" data-v-790edd61${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("p", null, "使用工具:"),
                    createVNode("div", {
                      class: "slide",
                      style: { "width": "50%", "overflow": "hidden" }
                    }, [
                      createVNode("div", {
                        class: "circleImg",
                        style: { "display": "flex", "width": "200%" }
                      }, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "",
                          style: { "width": "50%" }
                        }),
                        createVNode("img", {
                          src: _imports_1,
                          alt: "",
                          style: { "width": "50%" }
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" 嗨你好，我是一個本科系畢業，有一年前端工作經驗的工程師"),
                    createVNode("br"),
                    createVNode("br"),
                    createTextVNode(" 能與後端工程師合作串接API、和設計師合作切版，和SA討論需求。"),
                    createVNode("br"),
                    createVNode("br"),
                    createTextVNode(" 若有興趣合作可用下方管道聯繫我 ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_col, {
                xs: 24,
                sm: 12
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "使用工具:"),
                  createVNode("div", {
                    class: "slide",
                    style: { "width": "50%", "overflow": "hidden" }
                  }, [
                    createVNode("div", {
                      class: "circleImg",
                      style: { "display": "flex", "width": "200%" }
                    }, [
                      createVNode("img", {
                        src: _imports_0,
                        alt: "",
                        style: { "width": "50%" }
                      }),
                      createVNode("img", {
                        src: _imports_1,
                        alt: "",
                        style: { "width": "50%" }
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div style="${ssrRenderStyle(profile.value === 2 ? null : { display: "none" })}" data-v-790edd61><p style="${ssrRenderStyle({ "display": "flex", "padding": "0 1rem", "font-size": "24px", "align-items": "center", "justify-content": "center" })}" data-v-790edd61> 工作經歷:<br data-v-790edd61> 1.2024/7~2025/8:<br data-v-790edd61> 天方科技實業股份有限公司(前端工程師)<br data-v-790edd61> 參與內容:<br data-v-790edd61> 向上集中維護(高中職行政系統)<br data-v-790edd61> 排課系統開發<br data-v-790edd61> 台藝大師培作業開發<br data-v-790edd61></p></div><div style="${ssrRenderStyle([
        { "display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "center", "padding": "1rem" },
        profile.value === 3 ? null : { display: "none" }
      ])}" data-v-790edd61>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/listPage" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 自訂排名榜單(手機板無法使用) `);
          } else {
            return [
              createTextVNode(" 自訂排名榜單(手機板無法使用) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, { to: "/cart" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 購物清單(僅前端部分) `);
          } else {
            return [
              createTextVNode(" 購物清單(僅前端部分) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div data-v-790edd61>`);
      _push(ssrRenderComponent(_component_el_row, { class: "bottom" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-790edd61${_scopeId2}>Links:</p><a href="https://github.com/wayne9958" target="_blank" rel="noopener noreferrer" data-v-790edd61${_scopeId2}> Github </a><br data-v-790edd61${_scopeId2}><br data-v-790edd61${_scopeId2}>`);
                } else {
                  return [
                    createVNode("p", null, "Links:"),
                    createVNode("a", {
                      href: "https://github.com/wayne9958",
                      target: "_blank",
                      rel: "noopener noreferrer"
                    }, " Github "),
                    createVNode("br"),
                    createVNode("br")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-790edd61${_scopeId2}>聯繫我:</p><p style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-790edd61${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-790edd61${_scopeId2}><rect x="1" y="3" width="14" height="10" rx="2" ry="2" data-v-790edd61${_scopeId2}></rect><path d="M1 3 L8 9 L15 3" data-v-790edd61${_scopeId2}></path></svg> e-mail:spnk01154@gmail.com </p>`);
                } else {
                  return [
                    createVNode("p", null, "聯繫我:"),
                    createVNode("p", { style: { "display": "flex", "align-items": "center" } }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "16",
                        height: "16",
                        viewBox: "0 0 16 16",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "1.5",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createVNode("rect", {
                          x: "1",
                          y: "3",
                          width: "14",
                          height: "10",
                          rx: "2",
                          ry: "2"
                        }),
                        createVNode("path", { d: "M1 3 L8 9 L15 3" })
                      ])),
                      createTextVNode(" e-mail:spnk01154@gmail.com ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, { span: 6 }),
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("p", null, "Links:"),
                  createVNode("a", {
                    href: "https://github.com/wayne9958",
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }, " Github "),
                  createVNode("br"),
                  createVNode("br")
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode("p", null, "聯繫我:"),
                  createVNode("p", { style: { "display": "flex", "align-items": "center" } }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 16 16",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("rect", {
                        x: "1",
                        y: "3",
                        width: "14",
                        height: "10",
                        rx: "2",
                        ry: "2"
                      }),
                      createVNode("path", { d: "M1 3 L8 9 L15 3" })
                    ])),
                    createTextVNode(" e-mail:spnk01154@gmail.com ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-790edd61"]]);

export { index as default };
//# sourceMappingURL=index-U0w_uNKR.mjs.map
