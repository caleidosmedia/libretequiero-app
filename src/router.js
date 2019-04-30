import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Animal from './views/Animal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/animal/:id',
      name: 'animal',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Animal,
      props: true,
    },
    {
      path: '/explora',
      name: 'explora',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Explora.vue')
    },
  ]
})
