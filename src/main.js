import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router/router'
Vue.use(ElementUI)

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'

import crumbs from './components/index/crumbs.vue'
Vue.component('crumbs',crumbs)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: c => c(App),
    router
})