import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import users from '../components/index/users.vue'
import roles from '../components/index/roles.vue'
import rights from '../components/index/rights.vue'
import goods from '../components/index/goods/goods.vue'
import categories from '../components/index/categories.vue'
import orders from '../components/index/orders.vue'
import params from '../components/index/params.vue'

import goodsIndex from '../components/index/goods/components/index.vue'
import addgoods from '../components/index/goods/components/addgoods.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/index' },
        { path: '/login', component: login },
        {
            path: '/index',
            component: index,
            // 导航元信息  打标签
            // meta: { isLogin: true },
            // children: [
            //     { path: '/users', component: users, meta: { isLogin: true } },
            //     { path: '/roles', component: roles, meta: { isLogin: true } },
            //     { path: '/rights', component: rights, meta: { isLogin: true } },
            //     { path: '/goods', component: goods, meta: { isLogin: true } },
            //     { path: '/categories', component: categories, meta: { isLogin: true } },
            //     { path: '/orders', component: orders, meta: { isLogin: true } },
            // ]
            children: [
                { path: '/users', component: users },
                { path: '/roles', component: roles },
                { path: '/rights', component: rights },
                {
                    path: '/goods',
                    component: goods,
                    children: [
                        {
                            path: '',
                            component: goodsIndex
                        },
                        {
                            path: 'add',
                            component: addgoods
                        }
                    ]
                },
                { path: '/categories', component: categories },
                { path: '/orders', component: orders },
                { path: '/params', component: params }
            ]
        }
    ]
})

// 不用导航守卫了  用 axios 拦截
// 全局导航守卫
// router.beforeEach((to, from, next) => {

//     if (to.meta.isLogin) {
//         if (sessionStorage.getItem('token')) {
//             next()
//         } else {
//             Vue.prototype.$message.warning('请先登录')
//             router.push('/login')
//         }
//     } else {
//         next();
//     }
// })

export default router