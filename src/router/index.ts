import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // 获取stoken
  const stokenStr = window.sessionStorage.getItem("stoken");

  // 如果访问的是登陆页面，直接放行
  if (to.path === "/login" && !stokenStr) return next();
  else if (to.path === "/login" && stokenStr) return next({ path: "/" });

  // 如果token不存在强制跳转到登陆页面
  if (!stokenStr) return next({ path: "/login" });
  next();
});

export default router;
