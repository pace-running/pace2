import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

import Impressum from '@/pages/impressum'
import Datenschutz from '@/pages/datenschutz'
import RegistrationPage from "@/pages/registration";
import RaceStatus from "./components/RaceStatus";
import Admin from "@/pages/admin";

const routes = [
  { path: '/', component: RaceStatus},
  { path: '/registration', component: RegistrationPage},
  { path: '/datenschutz', component: Datenschutz},
  { path: '/impressum', component: Impressum},
  { path: '/admin', component: Admin},
];
const router = new VueRouter({routes})

const store = new Vuex.Store({
  state: {
    raceOpen: false
  },
  mutations: {
    setRaceStatus (state, status) {
      state.raceOpen = status
    }
  },
})

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
