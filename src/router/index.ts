import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../components/Welcome.vue";
import Users from "../components/users/Users.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome
      },
      {
        path: "/users",
        component: Users
      },
      {
        path: "/rights",
        component: () => import("../components/rights/Rights.vue")
      }
    ]
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
