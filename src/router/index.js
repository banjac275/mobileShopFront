import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home.vue'
import Search from '../components/pages/Search.vue'
import Phones from '../components/pages/Phones.vue'
import Tablets from '../components/pages/Tablets.vue'
import Users from '../components/pages/Users.vue'
import Cart from '../components/pages/Cart.vue'
import Login from '../components/pages/Login.vue'
import Profile from '../components/pages/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/phones',
      component: Phones
    },
    {
      path: '/tablets',
      component: Tablets
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/profile',
      component: Profile
    }
  ],
  mode: 'history'
})
