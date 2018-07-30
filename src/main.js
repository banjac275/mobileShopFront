import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { faTabletAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
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
library.add(faUserPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
