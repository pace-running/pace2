import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router";
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$base_url = process.env['VUE_APP_BASEURL']

Vue.use(VueRouter)
Vue.use(Vuex)

import RegistrationPage from "@/pages/registration";
import RaceStatus from "./components/RaceStatus";
import ParticipantSelfService from "./components/ParticipantSelfService"

const routes = [
    {path: '/', component: RaceStatus},
    {path: '/registration', component: RegistrationPage, name: "Registration"},
    {path: '/me', component: ParticipantSelfService},
    {path: '/datenschutz', component: () => import('./pages/datenschutz')},
    {path: '/impressum', component: () => import('./pages/impressum')},
    {path: '/login', component: () => import('./components/Login'), name: "Login"},
    {path: '/admin/finance', component: () => import('./components/Finance'), meta: {requiresAuth: true}},
    {path: '/admin/shirts', component: () => import('./components/TShirts'), meta: {requiresAuth: true}},
    {path: '/admin/participants', component: () => import('./components/ParticipantList/ParticipantList'), alias: "/admin", meta: {requiresAuth: true}},
    {path: '/admin/print', component: ()=> import('./components/Print'), meta: {requiresAuth: true}},
    {path: '/admin/settings',  component:()  => import('./components/RaceEdit'), meta: {requiresAuth: true}},
    { path: '/admin/mail', component: () => import('./components/mail/MailEditor'),meta: {requiresAuth: true} },
    {path:  '/admin/couponcodes', component: () => import('./components/Couponcodes/CouponcodeList'), meta: {requiresAuth: true}}
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
    if(to.name == "Registration") {
        if(!store.getters.raceOpen) {
            next({path: '/'})
        } else {
            next()
        }
    }
})

const store = new Vuex.Store({
    state: {
        raceOpen: false,
        onSite: false,
        shirtsEnabled: false,
        isLoggedIn: false
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        },
        onSite: state => {
            return state.onSite
        },
        raceOpen: state => {
            return state.raceOpen
        }
    },
    mutations: {
        setRaceStatus(state, status) {
            state.raceOpen = status
        },
        setOnSite(state, status) {
            state.onSite = status
        },
        setLoggedIn(state, status) {
            state.isLoggedIn = status
        },
        setShirtsEnabled(state,status) {
            state.shirtsEnabled = status
        }
    },
})

new Vue({
    vuetify,
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')
