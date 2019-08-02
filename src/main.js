import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router/router'
Vue.use(ElementUI)

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css'

import crumbs from './components/index/crumbs.vue'
import page from './components/index/page.vue'
import grid from './components/index/grid.vue'
Vue.component('crumbs',crumbs)
Vue.component('page',page)
Vue.component('grid',grid)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: c => c(App),
    router
})