import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
const routes = [{
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: () =>
            import ('../views/home.vue'),
        children: [{
            path: 'welcome',
            component: () =>
                import ('../components/welcome.vue')
        }, {
            path: 'users',
            component: () =>
                import ('../views/home/users/users')
        }, {
            path: 'rights',
            component: () =>
                import ('../views/home/power/right.vue')
        }, {
            path: 'roles',
            component: () =>
                import ('views/home/power/roles.vue')
        }, {
            path: 'categories',
            component: () =>
                import ('views/home/goods/cate.vue')
        }, {
            path: 'params',
            component: () =>
                import ('views/home/goods/params.vue')
        }, {
            path: 'goods',
            component: () =>
                import ('views/home/goods/List.vue'),
        }, {
            path: 'addgoods',
            component: () =>
                import ('views/home/goods/addGoods.vue'),
        }, {
            path: 'orders',
            component: () =>
                import ('views/home/orders/orders.vue')
        }, {
            path: 'reports',
            component: () =>
                import ('views/home/orders/report.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// to  要跳转到的页面
// from  跳转之前的页面 
// next   放行函数
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    const tokenstr = window.sessionStorage.getItem('token');
    if (!tokenstr) return next('./login');
    next();
})

export default router