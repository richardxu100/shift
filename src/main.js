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
  mode: 'history',
  routes,
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  firebase: {
    // simple syntax, bind as an array by default
    anArray: db.ref('/'),
    // can also bind to a query
    // anArray: db.ref('url/to/my/collection').limitToLast(25)
    // full syntax
    anObject: {
      source: db.ref('/'),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function() {},
    },
  },
})
