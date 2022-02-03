export default [
  {
    name: "login",
    path: "/auth/login",
    component: () => import("./pages/login.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import("./pages/home.vue")
  }
];
