import { E as ElDialog } from './el-overlay-C4NYwyPx.mjs';
import { E as ElButton, w as withInstall, _ as _export_sfc, b as buildProps, h as useFormDisabled, f as definePropType, m as mutable, u as useLocale, c as ElIcon, i as document_default, j as circle_check_default, k as check_default, l as close_default, z as zoom_in_default, n as delete_default, o as entriesOf, p as warning_filled_default, q as circle_close_default } from './el-button-DUkK2qXZ.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, shallowRef, computed, provide, toRef, createElementBlock, openBlock, createBlock, createCommentVNode, renderSlot, unref, createSlots, watch, TransitionGroup, normalizeClass, Fragment, renderList, withKeys, createElementVNode, withModifiers, toDisplayString, normalizeStyle, nextTick, inject, resolveDynamicComponent, useSSRContext } from 'vue';
import { t as throwError, d as debugWarn, u as useNamespace } from './server.mjs';
import { NOOP, isArray, isPlainObject, isFunction, isString } from '@vue/shared';
import { isNil, cloneDeep, isEqual } from 'lodash-unified';
import { useVModel } from '@vueuse/core';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const uploadContextKey = /* @__PURE__ */ Symbol("uploadContextKey");
const progressProps = buildProps({
  type: {
    type: String,
    default: "line",
    values: ["line", "circle", "dashboard"]
  },
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  status: {
    type: String,
    default: "",
    values: ["", "success", "exception", "warning"]
  },
  indeterminate: Boolean,
  duration: {
    type: Number,
    default: 3
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  strokeLinecap: {
    type: definePropType(String),
    default: "round"
  },
  textInside: Boolean,
  width: {
    type: Number,
    default: 126
  },
  showText: {
    type: Boolean,
    default: true
  },
  color: {
    type: definePropType([
      String,
      Array,
      Function
    ]),
    default: ""
  },
  striped: Boolean,
  stripedFlow: Boolean,
  format: {
    type: definePropType(Function),
    default: (percentage) => `${percentage}%`
  }
});
const _hoisted_1$2 = ["aria-valuenow"];
const _hoisted_2$2 = { viewBox: "0 0 100 100" };
const _hoisted_3$1 = ["d", "stroke", "stroke-linecap", "stroke-width"];
const _hoisted_4$1 = ["d", "stroke", "opacity", "stroke-linecap", "stroke-width"];
const _hoisted_5$1 = { key: 0 };
const _sfc_main$5 = defineComponent({
  ...{
    name: "ElProgress"
  },
  __name: "progress",
  props: progressProps,
  setup(__props) {
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const props = __props;
    const ns = useNamespace("progress");
    const barStyle = computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) {
        barStyle2.background = color;
      } else {
        barStyle2.backgroundColor = color;
      }
      return barStyle2;
    });
    const relativeStrokeWidth = computed(
      () => (props.strokeWidth / props.width * 100).toFixed(1)
    );
    const radius = computed(() => {
      if (["circle", "dashboard"].includes(props.type)) {
        return Number.parseInt(
          `${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        );
      }
      return 0;
    });
    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = computed(() => {
      const offset = -1 * perimeter.value * (1 - rate.value) / 2;
      return `${offset}px`;
    });
    const trailPathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = computed(() => {
      let ret;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      }
      return ret;
    });
    const statusIcon = computed(() => {
      if (props.status === "warning") {
        return warning_filled_default;
      }
      if (props.type === "line") {
        return props.status === "success" ? circle_check_default : circle_close_default;
      } else {
        return props.status === "success" ? check_default : close_default;
      }
    });
    const progressTextSize = computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      const seriesColors = color.map((seriesColor, index) => {
        if (isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span
          };
        }
        return seriesColor;
      });
      return seriesColors.sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (isFunction(color)) {
        return color(percentage);
      } else if (isString(color)) {
        return color;
      } else {
        const colors = getColors(color);
        for (const color2 of colors) {
          if (color2.percentage > percentage)
            return color2.color;
        }
        return (_a = colors[colors.length - 1]) == null ? void 0 : _a.color;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(_ctx.type),
          unref(ns).is(_ctx.status),
          {
            [unref(ns).m("without-text")]: !_ctx.showText,
            [unref(ns).m("text-inside")]: _ctx.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": _ctx.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        _ctx.type === "line" ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(unref(ns).b("bar"))
          },
          [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).be("bar", "outer")),
                style: normalizeStyle({ height: `${_ctx.strokeWidth}px` })
              },
              [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass([
                      unref(ns).be("bar", "inner"),
                      { [unref(ns).bem("bar", "inner", "indeterminate")]: _ctx.indeterminate },
                      { [unref(ns).bem("bar", "inner", "striped")]: _ctx.striped },
                      { [unref(ns).bem("bar", "inner", "striped-flow")]: _ctx.stripedFlow }
                    ]),
                    style: normalizeStyle(barStyle.value)
                  },
                  [
                    (_ctx.showText || _ctx.$slots.default) && _ctx.textInside ? (openBlock(), createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: normalizeClass(unref(ns).be("bar", "innerText"))
                      },
                      [
                        renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
                          createElementVNode(
                            "span",
                            null,
                            toDisplayString(content.value),
                            1
                          )
                        ])
                      ],
                      2
                    )) : createCommentVNode("v-if", true)
                  ],
                  6
                )
              ],
              6
            )
          ],
          2
        )) : (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            class: normalizeClass(unref(ns).b("circle")),
            style: normalizeStyle({ height: `${_ctx.width}px`, width: `${_ctx.width}px` })
          },
          [
            (openBlock(), createElementBlock("svg", _hoisted_2$2, [
              createElementVNode("path", {
                class: normalizeClass(unref(ns).be("circle", "track")),
                d: trackPath.value,
                stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
                "stroke-linecap": _ctx.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                fill: "none",
                style: normalizeStyle(trailPathStyle.value)
              }, null, 14, _hoisted_3$1),
              createElementVNode("path", {
                class: normalizeClass(unref(ns).be("circle", "path")),
                d: trackPath.value,
                stroke: stroke.value,
                fill: "none",
                opacity: _ctx.percentage ? 1 : 0,
                "stroke-linecap": _ctx.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                style: normalizeStyle(circlePathStyle.value)
              }, null, 14, _hoisted_4$1)
            ]))
          ],
          6
        )),
        (_ctx.showText || _ctx.$slots.default) && !_ctx.textInside ? (openBlock(), createElementBlock(
          "div",
          {
            key: 2,
            class: normalizeClass(unref(ns).e("text")),
            style: normalizeStyle({ fontSize: `${progressTextSize.value}px` })
          },
          [
            renderSlot(_ctx.$slots, "default", { percentage: _ctx.percentage }, () => [
              !_ctx.status ? (openBlock(), createElementBlock(
                "span",
                _hoisted_5$1,
                toDisplayString(content.value),
                1
              )) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(statusIcon.value)))
                ]),
                _: 1
              }))
            ])
          ],
          6
        )) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1$2);
    };
  }
});
var Progress = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/progress/src/progress.vue"]]);
const ElProgress = withInstall(Progress);
const SCOPE$1 = "ElUpload";
class UploadAjaxError extends Error {
  constructor(message, status, method, url) {
    super(message);
    this.name = "UploadAjaxError";
    this.status = status;
    this.method = method;
    this.url = url;
  }
}
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${option.method} ${action} ${xhr.status}`;
  }
  return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
const ajaxUpload = (option) => {
  throwError(SCOPE$1, "XMLHttpRequest is undefined");
  const xhr = new (void 0)();
  const action = option.action;
  if (xhr.upload) {
    xhr.upload.addEventListener("progress", (evt) => {
      const progressEvt = evt;
      progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
      option.onProgress(progressEvt);
    });
  }
  const formData = new FormData();
  if (option.data) {
    for (const [key, value] of Object.entries(option.data)) {
      if (isArray(value) && value.length)
        formData.append(key, ...value);
      else
        formData.append(key, value);
    }
  }
  formData.append(option.filename, option.file, option.file.name);
  xhr.addEventListener("error", () => {
    option.onError(getError(action, option, xhr));
  });
  xhr.addEventListener("load", () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  });
  xhr.open(option.method, action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  if (headers instanceof Headers) {
    headers.forEach((value, key) => xhr.setRequestHeader(key, value));
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (isNil(value))
        continue;
      xhr.setRequestHeader(key, String(value));
    }
  }
  xhr.send(formData);
  return xhr;
};
const uploadListTypes = ["text", "picture", "picture-card"];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
const uploadBaseProps = buildProps({
  action: {
    type: String,
    default: "#"
  },
  headers: {
    type: definePropType(Object)
  },
  method: {
    type: String,
    default: "post"
  },
  data: {
    type: definePropType([Object, Function, Promise]),
    default: () => mutable({})
  },
  multiple: Boolean,
  name: {
    type: String,
    default: "file"
  },
  drag: Boolean,
  withCredentials: Boolean,
  showFileList: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: ""
  },
  fileList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  httpRequest: {
    type: definePropType(Function),
    default: ajaxUpload
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  limit: Number
});
const uploadProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  beforeRemove: {
    type: definePropType(Function)
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onChange: {
    type: definePropType(Function),
    default: NOOP
  },
  onPreview: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  },
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListProps = buildProps({
  files: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  handlePreview: {
    type: definePropType(Function),
    default: NOOP
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};
const _hoisted_1$1 = ["tabindex", "aria-disabled", "onKeydown"];
const _hoisted_2$1 = ["src", "crossorigin"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["title"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
const _sfc_main$4 = defineComponent({
  ...{
    name: "ElUploadList"
  },
  __name: "upload-list",
  props: uploadListProps,
  emits: uploadListEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const nsUpload = useNamespace("upload");
    const nsIcon = useNamespace("icon");
    const nsList = useNamespace("list");
    const disabled = useFormDisabled();
    const focusing = ref(false);
    const containerKls = computed(() => [
      nsUpload.b("list"),
      nsUpload.bm("list", props.listType),
      nsUpload.is("disabled", disabled.value)
    ]);
    const handleRemove = (file) => {
      emit("remove", file);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        tag: "ul",
        class: normalizeClass(containerKls.value),
        name: unref(nsList).b()
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.files, (file, index) => {
              return openBlock(), createElementBlock("li", {
                key: file.uid || file.name,
                class: normalizeClass([
                  unref(nsUpload).be("list", "item"),
                  unref(nsUpload).is(file.status),
                  { focusing: focusing.value }
                ]),
                tabindex: unref(disabled) ? void 0 : 0,
                "aria-disabled": unref(disabled),
                role: "button",
                onKeydown: withKeys(($event) => !unref(disabled) && handleRemove(file), ["delete"]),
                onFocus: _cache[0] || (_cache[0] = ($event) => focusing.value = true),
                onBlur: _cache[1] || (_cache[1] = ($event) => focusing.value = false),
                onClick: _cache[2] || (_cache[2] = ($event) => focusing.value = false)
              }, [
                renderSlot(_ctx.$slots, "default", {
                  file,
                  index
                }, () => [
                  _ctx.listType === "picture" || file.status !== "uploading" && _ctx.listType === "picture-card" ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    class: normalizeClass(unref(nsUpload).be("list", "item-thumbnail")),
                    src: file.url,
                    crossorigin: _ctx.crossorigin,
                    alt: ""
                  }, null, 10, _hoisted_2$1)) : createCommentVNode("v-if", true),
                  file.status === "uploading" || _ctx.listType !== "picture-card" ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass(unref(nsUpload).be("list", "item-info"))
                    },
                    [
                      createElementVNode("a", {
                        class: normalizeClass(unref(nsUpload).be("list", "item-name")),
                        onClick: withModifiers(($event) => _ctx.handlePreview(file), ["prevent"])
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("document"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(document_default))
                          ]),
                          _: 1
                        }, 8, ["class"]),
                        createElementVNode("span", {
                          class: normalizeClass(unref(nsUpload).be("list", "item-file-name")),
                          title: file.name
                        }, toDisplayString(file.name), 11, _hoisted_4)
                      ], 10, _hoisted_3),
                      file.status === "uploading" ? (openBlock(), createBlock(unref(ElProgress), {
                        key: 0,
                        type: _ctx.listType === "picture-card" ? "circle" : "line",
                        "stroke-width": _ctx.listType === "picture-card" ? 6 : 2,
                        percentage: Number(file.percentage),
                        style: normalizeStyle(_ctx.listType === "picture-card" ? "" : "margin-top: 0.5rem")
                      }, null, 8, ["type", "stroke-width", "percentage", "style"])) : createCommentVNode("v-if", true)
                    ],
                    2
                  )) : createCommentVNode("v-if", true),
                  createElementVNode(
                    "label",
                    {
                      class: normalizeClass(unref(nsUpload).be("list", "item-status-label"))
                    },
                    [
                      _ctx.listType === "text" ? (openBlock(), createBlock(unref(ElIcon), {
                        key: 0,
                        class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("circle-check")])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(circle_check_default))
                        ]),
                        _: 1
                      }, 8, ["class"])) : ["picture-card", "picture"].includes(_ctx.listType) ? (openBlock(), createBlock(unref(ElIcon), {
                        key: 1,
                        class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("check")])
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(check_default))
                        ]),
                        _: 1
                      }, 8, ["class"])) : createCommentVNode("v-if", true)
                    ],
                    2
                  ),
                  !unref(disabled) ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 2,
                    class: normalizeClass(unref(nsIcon).m("close")),
                    onClick: ($event) => handleRemove(file)
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(close_default))
                    ]),
                    _: 1
                  }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
                  createCommentVNode(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),
                  createCommentVNode(" This is a bug which needs to be fixed "),
                  createCommentVNode(" TODO: Fix the incorrect navigation interaction "),
                  !unref(disabled) ? (openBlock(), createElementBlock(
                    "i",
                    {
                      key: 3,
                      class: normalizeClass(unref(nsIcon).m("close-tip"))
                    },
                    toDisplayString(unref(t)("el.upload.deleteTip")),
                    3
                  )) : createCommentVNode("v-if", true),
                  _ctx.listType === "picture-card" ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 4,
                      class: normalizeClass(unref(nsUpload).be("list", "item-actions"))
                    },
                    [
                      createElementVNode("span", {
                        class: normalizeClass(unref(nsUpload).be("list", "item-preview")),
                        onClick: ($event) => _ctx.handlePreview(file)
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("zoom-in"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(zoom_in_default))
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ], 10, _hoisted_5),
                      !unref(disabled) ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(unref(nsUpload).be("list", "item-delete")),
                        onClick: ($event) => handleRemove(file)
                      }, [
                        createVNode(unref(ElIcon), {
                          class: normalizeClass(unref(nsIcon).m("delete"))
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ], 10, _hoisted_6)) : createCommentVNode("v-if", true)
                    ],
                    2
                  )) : createCommentVNode("v-if", true)
                ])
              ], 42, _hoisted_1$1);
            }),
            128
          )),
          renderSlot(_ctx.$slots, "append")
        ]),
        _: 3
      }, 8, ["class", "name"]);
    };
  }
});
var UploadList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-list.vue"]]);
const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: void 0
  }
});
const uploadDraggerEmits = {
  file: (file) => isArray(file)
};
const COMPONENT_NAME = "ElUploadDrag";
const _sfc_main$3 = defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "upload-dragger",
  props: uploadDraggerProps,
  emits: uploadDraggerEmits,
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const uploaderContext = inject(uploadContextKey);
    if (!uploaderContext) {
      throwError(
        COMPONENT_NAME,
        "usage: <el-upload><el-upload-dragger /></el-upload>"
      );
    }
    const ns = useNamespace("upload");
    const dragover = ref(false);
    const disabled = useFormDisabled();
    const onDrop = (e) => {
      if (disabled.value)
        return;
      dragover.value = false;
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      const items = e.dataTransfer.items || [];
      files.forEach((file, index) => {
        var _a;
        const item = items[index];
        const entry = (_a = item == null ? void 0 : item.webkitGetAsEntry) == null ? void 0 : _a.call(item);
        if (entry) {
          file.isDirectory = entry.isDirectory;
        }
      });
      emit("file", files);
    };
    const onDragover = () => {
      if (!disabled.value)
        dragover.value = true;
    };
    const onDragleave = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget))
        dragover.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
          onDrop: withModifiers(onDrop, ["prevent"]),
          onDragover: withModifiers(onDragover, ["prevent"]),
          onDragleave: withModifiers(onDragleave, ["prevent"])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        34
      );
    };
  }
});
var UploadDragger = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-dragger.vue"]]);
const uploadContentProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onStart: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(
      Function
    ),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  }
});
const _hoisted_1 = ["tabindex", "aria-disabled", "onKeydown"];
const _hoisted_2 = ["name", "disabled", "multiple", "accept"];
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElUploadContent",
    inheritAttrs: false
  },
  __name: "upload-content",
  props: uploadContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("upload");
    const disabled = useFormDisabled();
    const requests = shallowRef(
      {}
    );
    const inputRef = shallowRef();
    const uploadFiles = (files) => {
      if (files.length === 0)
        return;
      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      if (limit && fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      if (!multiple) {
        files = files.slice(0, 1);
      }
      for (const file of files) {
        const rawFile = file;
        rawFile.uid = genFileId();
        onStart(rawFile);
        if (autoUpload)
          upload(rawFile);
      }
    };
    const upload = async (rawFile) => {
      inputRef.value.value = "";
      if (!props.beforeUpload) {
        return doUpload(rawFile);
      }
      let hookResult;
      let beforeData = {};
      try {
        const originData = props.data;
        const beforeUploadPromise = props.beforeUpload(rawFile);
        beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data;
        hookResult = await beforeUploadPromise;
        if (isPlainObject(props.data) && isEqual(originData, beforeData)) {
          beforeData = cloneDeep(props.data);
        }
      } catch (e) {
        hookResult = false;
      }
      if (hookResult === false) {
        props.onRemove(rawFile);
        return;
      }
      let file = rawFile;
      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file = hookResult;
        } else {
          file = new File([hookResult], rawFile.name, {
            type: rawFile.type
          });
        }
      }
      doUpload(
        Object.assign(file, {
          uid: rawFile.uid
        }),
        beforeData
      );
    };
    const resolveData = async (data, rawFile) => {
      if (isFunction(data)) {
        return data(rawFile);
      }
      return data;
    };
    const doUpload = async (rawFile, beforeData) => {
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest
      } = props;
      try {
        beforeData = await resolveData(beforeData != null ? beforeData : data, rawFile);
      } catch (e) {
        props.onRemove(rawFile);
        return;
      }
      const { uid } = rawFile;
      const options = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile);
        },
        onSuccess: (res) => {
          onSuccess(res, rawFile);
          delete requests.value[uid];
        },
        onError: (err) => {
          onError(err, rawFile);
          delete requests.value[uid];
        }
      };
      const request = httpRequest(options);
      requests.value[uid] = request;
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError);
      }
    };
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files)
        return;
      uploadFiles(Array.from(files));
    };
    const handleClick = () => {
      if (!disabled.value) {
        inputRef.value.value = "";
        inputRef.value.click();
      }
    };
    const handleKeydown = () => {
      handleClick();
    };
    const abort = (file) => {
      const _reqs = entriesOf(requests.value).filter(
        file ? ([uid]) => String(file.uid) === uid : () => true
      );
      _reqs.forEach(([uid, req]) => {
        if (req instanceof void 0)
          req.abort();
        delete requests.value[uid];
      });
    };
    __expose({
      abort,
      upload
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(_ctx.listType),
          unref(ns).is("drag", _ctx.drag),
          unref(ns).is("disabled", unref(disabled))
        ]),
        tabindex: unref(disabled) ? void 0 : 0,
        "aria-disabled": unref(disabled),
        role: "button",
        onClick: handleClick,
        onKeydown: withKeys(withModifiers(handleKeydown, ["self"]), ["enter", "space"])
      }, [
        _ctx.drag ? (openBlock(), createBlock(UploadDragger, {
          key: 0,
          disabled: unref(disabled),
          onFile: uploadFiles
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["disabled"])) : renderSlot(_ctx.$slots, "default", { key: 1 }),
        createElementVNode("input", {
          ref_key: "inputRef",
          ref: inputRef,
          class: normalizeClass(unref(ns).e("input")),
          name: _ctx.name,
          disabled: unref(disabled),
          multiple: _ctx.multiple,
          accept: _ctx.accept,
          type: "file",
          onChange: handleChange,
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, null, 42, _hoisted_2)
      ], 42, _hoisted_1);
    };
  }
});
var UploadContent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-content.vue"]]);
const SCOPE = "ElUpload";
const revokeFileObjectURL = (file) => {
  var _a;
  if ((_a = file.url) == null ? void 0 : _a.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = useVModel(
    props,
    "fileList",
    void 0,
    { passive: true }
  );
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    var _a;
    (_a = uploadRef.value) == null ? void 0 : _a.abort(file);
  }
  function clearFiles(states = ["ready", "uploading", "success", "fail"]) {
    uploadFiles.value = uploadFiles.value.filter(
      (row) => !states.includes(row.status)
    );
  }
  function removeFile(file) {
    uploadFiles.value = uploadFiles.value.filter(
      (uploadFile) => uploadFile.uid !== file.uid
    );
  }
  const emitChange = (file) => {
    nextTick(() => props.onChange(file, uploadFiles.value));
  };
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    console.error(err);
    file.status = "fail";
    removeFile(file);
    props.onError(err, file, uploadFiles.value);
    emitChange(file);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file)
      return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    emitChange(file);
  };
  const handleStart = (file) => {
    if (isNil(file.uid))
      file.uid = genFileId();
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") {
      try {
        uploadFile.url = URL.createObjectURL(file);
      } catch (err) {
        debugWarn(SCOPE, err.message);
        props.onError(err, uploadFile, uploadFiles.value);
      }
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile];
    emitChange(uploadFile);
  };
  const handleRemove = async (file) => {
    const uploadFile = file instanceof File ? getFile(file) : file;
    if (!uploadFile)
      throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      removeFile(file2);
      props.onRemove(file2, uploadFiles.value);
      revokeFileObjectURL(file2);
    };
    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value);
      if (before !== false)
        doRemove(uploadFile);
    } else {
      doRemove(uploadFile);
    }
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => {
      var _a;
      return raw && ((_a = uploadRef.value) == null ? void 0 : _a.upload(raw));
    });
  }
  watch(
    () => props.listType,
    (val) => {
      if (val !== "picture-card" && val !== "picture") {
        return;
      }
      uploadFiles.value = uploadFiles.value.map((file) => {
        const { raw, url } = file;
        if (!url && raw) {
          try {
            file.url = URL.createObjectURL(raw);
          } catch (err) {
            props.onError(err, file, uploadFiles.value);
          }
        }
        return file;
      });
    }
  );
  watch(
    uploadFiles,
    (files) => {
      for (const file of files) {
        file.uid || (file.uid = genFileId());
        file.status || (file.status = "success");
      }
    },
    { immediate: true, deep: true }
  );
  return {
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    revokeFileObjectURL
  };
};
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElUpload"
  },
  __name: "upload",
  props: uploadProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const disabled = useFormDisabled();
    const uploadRef = shallowRef();
    const {
      abort,
      submit,
      clearFiles,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress
    } = useHandlers(props, uploadRef);
    const isPictureCard = computed(() => props.listType === "picture-card");
    const uploadContentProps2 = computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    provide(uploadContextKey, {
      accept: toRef(props, "accept")
    });
    __expose({
      abort,
      submit,
      clearFiles,
      handleStart,
      handleRemove
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        isPictureCard.value && _ctx.showFileList ? (openBlock(), createBlock(UploadList, {
          key: 0,
          disabled: unref(disabled),
          "list-type": _ctx.listType,
          files: unref(uploadFiles),
          crossorigin: _ctx.crossorigin,
          "handle-preview": _ctx.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          append: withCtx(() => [
            createVNode(
              UploadContent,
              mergeProps({
                ref_key: "uploadRef",
                ref: uploadRef
              }, uploadContentProps2.value),
              {
                default: withCtx(() => [
                  _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
                  !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
                ]),
                _: 3
              },
              16
            )
          ]),
          _: 2
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true),
        !isPictureCard.value || isPictureCard.value && !_ctx.showFileList ? (openBlock(), createBlock(
          UploadContent,
          mergeProps({
            key: 1,
            ref_key: "uploadRef",
            ref: uploadRef
          }, uploadContentProps2.value),
          {
            default: withCtx(() => [
              _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true),
              !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
          },
          16
        )) : createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "tip"),
        !isPictureCard.value && _ctx.showFileList ? (openBlock(), createBlock(UploadList, {
          key: 3,
          disabled: unref(disabled),
          "list-type": _ctx.listType,
          files: unref(uploadFiles),
          crossorigin: _ctx.crossorigin,
          "handle-preview": _ctx.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          _: 2
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: withCtx(({ file, index }) => [
              renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var Upload = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload.vue"]]);
const ElUpload = withInstall(Upload);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "listPage",
  __ssrInlineRender: true,
  setup(__props) {
    const Images1 = ref([]);
    const Images2 = ref([]);
    const Images3 = ref([]);
    const Images4 = ref([]);
    const ImagesStart = ref([]);
    const alertOpen = ref(false);
    ref();
    const defaultImg = async () => {
      Images1.value = [];
      Images2.value = [];
      Images3.value = [];
      Images4.value = [];
      try {
        const catRes = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        const cats = await catRes.json();
        ImagesStart.value = [...cats].map((item) => item.url);
      } catch (error) {
        console.error("抓取失敗:", error);
      }
    };
    const onUpload = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const target = e.target;
        if (target && target.result) {
          ImagesStart.value.push(target.result);
        }
      };
      reader.readAsDataURL(file.raw);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_button = ElButton;
      const _component_el_upload = ElUpload;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "padding": "1rem 2rem" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: alertOpen.value,
        "onUpdate:modelValue": ($event) => alertOpen.value = $event,
        title: "使用說明"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "24px" })}"${_scopeId}> 請自行上傳圖片或使用下方匯入預設套圖，<br${_scopeId}> 並從待選區拖曳圖片至想要的位置(拖曳後可換位，但無法回到待選區) </span><br${_scopeId}><p style="${ssrRenderStyle({ "font-size": "24px", "color": "red" })}"${_scopeId}>*請勿上傳過大圖片，可能會因此造成拖曳出現問題</p><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "end" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => alertOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`OK`);
                } else {
                  return [
                    createTextVNode("OK")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "24px" } }, [
                createTextVNode(" 請自行上傳圖片或使用下方匯入預設套圖，"),
                createVNode("br"),
                createTextVNode(" 並從待選區拖曳圖片至想要的位置(拖曳後可換位，但無法回到待選區) ")
              ]),
              createVNode("br"),
              createVNode("p", { style: { "font-size": "24px", "color": "red" } }, "*請勿上傳過大圖片，可能會因此造成拖曳出現問題"),
              createVNode("div", { style: { "display": "flex", "justify-content": "end" } }, [
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => alertOpen.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("OK")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-2 border-dashed border-gray-400 rounded-xl p-4 min-h-[300px]"><div style="${ssrRenderStyle({ "display": "flex", "height": "120px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "width": "60px", "height": "120px" })}">S tier</span><!--[-->`);
      ssrRenderList(Images1.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="w-24 h-24 object-cover rounded-lg shadow-md mb-2 cursor-move" style="${ssrRenderStyle({ "width": "120px", "height": "120px", "border-radius": "8px" })}" draggable="true">`);
      });
      _push(`<!--]--></div></div><div class="border-2 border-dashed border-gray-400 rounded-xl p-4 min-h-[300px]"><div style="${ssrRenderStyle({ "display": "flex", "height": "120px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "width": "60px", "height": "120px" })}">A tier</span><!--[-->`);
      ssrRenderList(Images2.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="w-24 h-24 object-cover rounded-lg shadow-md mb-2 cursor-move" style="${ssrRenderStyle({ "width": "120px", "height": "120px", "border-radius": "8px" })}" draggable="true">`);
      });
      _push(`<!--]--></div></div><div class="border-2 border-dashed border-gray-400 rounded-xl p-4 min-h-[300px]"><div style="${ssrRenderStyle({ "display": "flex", "height": "120px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "width": "60px", "height": "120px" })}">B tier</span><!--[-->`);
      ssrRenderList(Images3.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="w-24 h-24 object-cover rounded-lg shadow-md mb-2 cursor-move" style="${ssrRenderStyle({ "width": "120px", "height": "120px", "border-radius": "8px" })}" draggable="true">`);
      });
      _push(`<!--]--></div></div><div class="border-2 border-dashed border-gray-400 rounded-xl p-4 min-h-[300px]"><div style="${ssrRenderStyle({ "display": "flex", "height": "120px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "width": "60px", "height": "120px" })}">C tier</span><!--[-->`);
      ssrRenderList(Images4.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="w-24 h-24 object-cover rounded-lg shadow-md mb-2 cursor-move" style="${ssrRenderStyle({ "width": "120px", "height": "120px", "border-radius": "8px" })}" draggable="true">`);
      });
      _push(`<!--]--></div></div><br><br><div class="border-2 border-dashed border-gray-400 rounded-xl p-4 min-h-[300px]"><div style="${ssrRenderStyle({ "display": "flex", "height": "120px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}">待選區</span><!--[-->`);
      ssrRenderList(ImagesStart.value, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="w-24 h-24 object-cover rounded-lg shadow-md mb-2 cursor-move" style="${ssrRenderStyle({ "width": "120px", "height": "120px", "border-radius": "8px" })}" draggable="true">`);
      });
      _push(`<!--]--></div></div><div class="col-span-2 mb-4">`);
      _push(ssrRenderComponent(_component_el_upload, {
        class: "upload-demo",
        action: "",
        multiple: "",
        "auto-upload": false,
        "show-file-list": false,
        accept: "image/*",
        "on-change": onUpload
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, { type: "primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上傳圖片`);
                } else {
                  return [
                    createTextVNode("上傳圖片")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, { type: "primary" }, {
                default: withCtx(() => [
                  createTextVNode("上傳圖片")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        style: { "margin-top": "1rem" },
        onClick: defaultImg
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`匯入預設套圖`);
          } else {
            return [
              createTextVNode("匯入預設套圖")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br><br></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/listPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=listPage-DK-WY0VM.mjs.map
