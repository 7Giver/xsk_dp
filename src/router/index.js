import Vue from "vue";
import VueRouter from "vue-router";
import "../../src/plugins/element";

const isProduction = process.env.NODE_ENV === "production";

// 解决当前路由和点击路由是同一个路由时的报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  { path: "*", component: () => import("../views/NotFoundComponent.vue") },
  {
    path: "/",
    redirect: "/home/material",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "material",
        name: "material",
        component: () => import("../components/HomeMaterial.vue"),
      },
      {
        path: "template",
        component: () => import("../components/HomeTemplate.vue"),
      },
      {
        path: "picture",
        component: () => import("../components/HomePicture.vue"),
      },
      {
        path: "draft",
        component: () => import("../components/HomeDraft.vue"),
      },
      {
        path: "article",
        component: () => import("../components/HomeArticle.vue"),
      },
      {
        path: "work",
        name: "work",
        component: () => import("../components/HomeWork.vue"),
      },
    ],
  },
  {
    path: "/qqmusic",
    name: "QQmusic",
    component: () => import("../views/QQmusic.vue"),
  },
  {
    path: "/protocol",
    name: "Protocol",
    component: () => import("../views/Protocol.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // TODO:
  // base: '/index/vue',
  // base: '/Public/Activity/dist',
  base:
    process.env.NODE_ENV === "production"
      ? "/index/editor"
      : "/Public/Activity/dist",
  routes,
});

export default router;
