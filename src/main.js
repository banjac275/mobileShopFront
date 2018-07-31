import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMobileAlt, faTabletAlt, faSearch, faUsersCog,
  faCheck, faEye, faEyeSlash, faUserPlus, faCircle, faPen,
  faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { store } from './store/store'

Vue.config.productionTip = false

library.add(faMobileAlt)
library.add(faTabletAlt)
library.add(faSearch)
library.add(faShoppingCart)
library.add(faUsers)
library.add(faUsersCog)
library.add(faCheck)
library.add(faEye)
library.add(faEyeSlash)
library.add(faCircle)
library.add(faUserPlus)
library.add(faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
