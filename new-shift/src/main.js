import Vue from 'vue'
import VueFire from 'vuefire'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import 'buefy/lib/buefy.css'

import { routes } from './routes'
import { db } from './utils/firebase'
import App from './App.vue'

Vue.use(Buefy)
Vue.use(VueFire)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
