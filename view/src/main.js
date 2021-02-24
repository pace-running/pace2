import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$base_url = process.env['VUE_APP_BASEURL']

Vue.use(VueRouter)
Vue.use(Vuex)

import Impressum from '@/pages/impressum'
import Datenschutz from '@/pages/datenschutz'
import RegistrationPage from "@/pages/registration";
import RaceStatus from "./components/RaceStatus";
import ParticipantSelfService from "./components/ParticipantSelfService"
import Login from "./components/Login";
import Finance from "./components/Finance";
import TShirts from "./components/TShirts";
import ParticipantList from "./components/ParticipantList/ParticipantList";
import RaceEdit from "./components/RaceEdit";
import Print from "./components/Print";

const routes = [
    {path: '/', component: RaceStatus},
    {path: '/registration', component: RegistrationPage},
    {path: '/me', component: ParticipantSelfService},
    {path: '/datenschutz', component: Datenschutz},
    {path: '/impressum', component: Impressum},
    {path: '/login', component: Login, name: "Login"},
    {path: '/admin/finance', component: Finance, meta: {requiresAuth: true}},
    {path: '/admin/shirts', component: TShirts, meta: {requiresAuth: true}},
    {path: '/admin/participants', component: ParticipantList, alias: "/admin", meta: {requiresAuth: true}},
    {path: '/admin/print', component: Print, meta: {requiresAuth: true}},
    {path: '/admin/settings', component: RaceEdit, meta: {requiresAuth: true}},
];
const router = new VueRouter({routes})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({name: 'Login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

const store = new Vuex.Store({
    state: {
        raceOpen: false,
        isLoggedIn: false
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        }
    },
    mutations: {
        setRaceStatus(state, status) {
            state.raceOpen = status
        },
        setLoggedIn(state, status) {
            state.isLoggedIn = status
        }
    },
})

new Vue({
    vuetify,
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')
