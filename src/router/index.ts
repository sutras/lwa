import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from "vue-router";

import { type App } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "start" },
    component: () => import("@/components/Layout.vue"),
    children: [
      {
        path: "start",
        name: "start",
        redirect: { name: "CssSelector" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "开始",
        },
        children: [
          {
            path: "install",
            name: "install",
            component: () => import("@/docs/start/install.md"),
            meta: {
              title: "安装",
            },
          },
          {
            path: "imports",
            name: "imports",
            component: () => import("@/docs/start/imports.md"),
            meta: {
              title: "导入",
            },
          },
        ],
      },
      {
        path: "target",
        name: "target",
        redirect: { name: "CssSelector" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "对象",
        },
        children: [
          {
            path: "CssSelector",
            name: "CssSelector",
            component: () => import("@/docs/target/CssSelector.md"),
            meta: {
              title: "css选择器",
            },
          },
          {
            path: "LikeArray",
            name: "LikeArray",
            component: () => import("@/docs/target/LikeArray.md"),
            meta: {
              title: "类数组对象",
            },
          },
          {
            path: "JavaScriptObject",
            name: "JavaScriptObject",
            component: () => import("@/docs/target/JavaScriptObject.md"),
            meta: {
              title: "JavaScript对象",
            },
          },
          {
            path: "ArrayType",
            name: "ArrayType",
            component: () => import("@/docs/target/ArrayType.md"),
            meta: {
              title: "类数组对象",
            },
          },
        ],
      },
      {
        path: "properties",
        name: "properties",
        redirect: { name: "CssProperties" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "属性",
        },
        children: [
          {
            path: "CssProperties",
            name: "CssProperties",
            component: () => import("@/docs/properties/CssProperties.md"),
            meta: {
              title: "css属性",
            },
          },
          {
            path: "CssTransform",
            name: "CssTransform",
            component: () => import("@/docs/properties/CssTransform.md"),
            meta: {
              title: "css transform",
            },
          },
          {
            path: "ObjectProperties",
            name: "ObjectProperties",
            component: () => import("@/docs/properties/ObjectProperties.md"),
            meta: {
              title: "对象属性",
            },
          },
          {
            path: "DomAttributes",
            name: "DomAttributes",
            component: () => import("@/docs/properties/DomAttributes.md"),
            meta: {
              title: "DOM属性",
            },
          },
          {
            path: "SvgAttributes",
            name: "SvgAttributes",
            component: () => import("@/docs/properties/SvgAttributes.md"),
            meta: {
              title: "SVG属性",
            },
          },
          {
            path: "AnimationKeyframes",
            name: "AnimationKeyframes",
            component: () => import("@/docs/properties/AnimationKeyframes.md"),
            meta: {
              title: "动画关键帧",
            },
          },
        ],
      },
      {
        path: "tweenOptions",
        name: "tweenOptions",
        redirect: { name: "Duration" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "补间选项",
        },
        children: [
          {
            path: "Duration",
            name: "Duration",
            component: () => import("@/docs/tweenOptions/Duration.md"),
            meta: {
              title: "持续时间",
            },
          },
          {
            path: "Delay",
            name: "Delay",
            component: () => import("@/docs/tweenOptions/Delay.md"),
            meta: {
              title: "延迟",
            },
          },
          {
            path: "EndDelay",
            name: "EndDelay",
            component: () => import("@/docs/tweenOptions/EndDelay.md"),
            meta: {
              title: "结束延迟",
            },
          },
          {
            path: "Easing",
            name: "Easing",
            component: () => import("@/docs/tweenOptions/Easing.md"),
            meta: {
              title: "缓动公式",
            },
          },
          {
            path: "Round",
            name: "Round",
            component: () => import("@/docs/tweenOptions/Round.md"),
            meta: {
              title: "四舍五入",
            },
          },
        ],
      },
      {
        path: "values",
        name: "values",
        redirect: { name: "UnitlessValue" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "属性值类型",
        },
        children: [
          {
            path: "UnitlessValue",
            name: "UnitlessValue",
            component: () => import("@/docs/values/UnitlessValue.md"),
            meta: {
              title: "无单位值",
            },
          },
          {
            path: "UnitValue",
            name: "UnitValue",
            component: () => import("@/docs/values/UnitValue.md"),
            meta: {
              title: "有单位值",
            },
          },
          {
            path: "RelativeValue",
            name: "RelativeValue",
            component: () => import("@/docs/values/RelativeValue.md"),
            meta: {
              title: "相对值",
            },
          },
          {
            path: "ColorValue",
            name: "ColorValue",
            component: () => import("@/docs/values/ColorValue.md"),
            meta: {
              title: "颜色值",
            },
          },
          {
            path: "WithFromValue",
            name: "WithFromValue",
            component: () => import("@/docs/values/WithFromValue.md"),
            meta: {
              title: "带起始值",
            },
          },
          {
            path: "FunctionValue",
            name: "FunctionValue",
            component: () => import("@/docs/values/FunctionValue.md"),
            meta: {
              title: "函数值",
            },
          },
          {
            path: "KeyframesValue",
            name: "KeyframesValue",
            component: () => import("@/docs/values/KeyframesValue.md"),
            meta: {
              title: "关键帧值",
            },
          },
        ],
      },
      {
        path: "svg",
        name: "svg",
        redirect: { name: "MotionPath" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "svg",
        },
        children: [
          {
            path: "MotionPath",
            name: "MotionPath",
            component: () => import("@/docs/svg/MotionPath.md"),
            meta: {
              title: "运动路径",
            },
          },
          {
            path: "LineDrawing",
            name: "LineDrawing",
            component: () => import("@/docs/svg/LineDrawing.md"),
            meta: {
              title: "线条绘制",
            },
          },
          {
            path: "Morphing",
            name: "Morphing",
            component: () => import("@/docs/svg/Morphing.md"),
            meta: {
              title: "变形动画",
            },
          },
        ],
      },
      {
        path: "timeline",
        name: "timeline",
        redirect: { name: "Direction" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "时间轴",
        },
        children: [
          {
            path: "Loop",
            name: "Loop",
            component: () => import("@/docs/timeline/Loop.md"),
            meta: {
              title: "重复次数",
            },
          },
          {
            path: "Direction",
            name: "Direction",
            component: () => import("@/docs/timeline/Direction.md"),
            meta: {
              title: "方向",
            },
          },
          {
            path: "Autoplay",
            name: "Autoplay",
            component: () => import("@/docs/timeline/Autoplay.md"),
            meta: {
              title: "自动播放",
            },
          },
          {
            path: "ExternalTicker",
            name: "ExternalTicker",
            component: () => import("@/docs/timeline/ExternalTicker.md"),
            meta: {
              title: "自定义ticker",
            },
          },
          {
            path: "TimelineAdd",
            name: "TimelineAdd",
            component: () => import("@/docs/timeline/TimelineAdd.md"),
            meta: {
              title: "添加动画",
            },
          },
          {
            path: "TimelinePosition",
            name: "TimelinePosition",
            component: () => import("@/docs/timeline/TimelinePosition.md"),
            meta: {
              title: "时间轴位置",
            },
          },
          {
            path: "Controls",
            name: "Controls",
            component: () => import("@/docs/timeline/Controls.md"),
            meta: {
              title: "时间轴控制",
            },
          },
          {
            path: "Callbacks",
            name: "Callbacks",
            component: () => import("@/docs/timeline/Callbacks.md"),
            meta: {
              title: "回调",
            },
          },
        ],
      },
      {
        path: "stagger",
        name: "stagger",
        redirect: { name: "StaggerBasic" },
        component: () => import("@/components/Empty.vue"),
        meta: {
          title: "交错",
        },
        children: [
          {
            path: "StaggerBasic",
            name: "StaggerBasic",
            component: () => import("@/docs/stagger/StaggerBasic.md"),
            meta: {
              title: "基础交错",
            },
          },
          {
            path: "StaggerStartValue",
            name: "StaggerStartValue",
            component: () => import("@/docs/stagger/StaggerStartValue.md"),
            meta: {
              title: "交错起始值",
            },
          },
          {
            path: "StaggerRange",
            name: "StaggerRange",
            component: () => import("@/docs/stagger/StaggerRange.md"),
            meta: {
              title: "交错范围",
            },
          },
          {
            path: "StaggerFrom",
            name: "StaggerFrom",
            component: () => import("@/docs/stagger/StaggerFrom.md"),
            meta: {
              title: "交错起始位置",
            },
          },
          {
            path: "StaggerDirection",
            name: "StaggerDirection",
            component: () => import("@/docs/stagger/StaggerDirection.md"),
            meta: {
              title: "交错方向",
            },
          },
          {
            path: "StaggerEasing",
            name: "StaggerEasing",
            component: () => import("@/docs/stagger/StaggerEasing.md"),
            meta: {
              title: "交错缓动公式",
            },
          },
          {
            path: "StaggerGrid",
            name: "StaggerGrid",
            component: () => import("@/docs/stagger/StaggerGrid.md"),
            meta: {
              title: "交错网格",
            },
          },
          {
            path: "StaggerAxis",
            name: "StaggerAxis",
            component: () => import("@/docs/stagger/StaggerAxis.md"),
            meta: {
              title: "交错轴线",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function registerRouter(app: App) {
  app.use(router);
}

export default router;
