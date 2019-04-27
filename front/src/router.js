import Vue from "vue";
import Router from "vue-router";
import index from "./components/index.vue";
import signin from "./components/signin.vue";
import profil from "./components/profil.vue";


Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/profil",
      name: "profil",
      component: profil
    },
    {
      path: "/signin",
      name: "signin",
      component: signin
    }, {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});