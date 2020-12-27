import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueRouter)

import Impressum from '@/pages/impressum'
import RegistrationPage from "@/pages/registration";

const routes = [
  { path: '/', component: RegistrationPage},
  { path: '/impressum', component: Impressum}
];
const router = new VueRouter({routes})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
