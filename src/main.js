import Vue from "vue"
import Vuesax from 'vuesax'
import VueRouter from "vue-router"
import routes from "./routes.js"

import 'vuesax/dist/vuesax.css'

import fullCalendar from 'vue-fullcalendar'

import VueApexCharts from 'vue-apexcharts'

import layout from "./components/layout.vue"

Vue.use(VueRouter)
Vue.use(Vuesax)
Vue.use(VueApexCharts)

Vue.component("layout", layout)
Vue.component('full-calendar', fullCalendar)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount("#app")
