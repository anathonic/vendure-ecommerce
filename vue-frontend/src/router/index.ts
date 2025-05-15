import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/layout/Main.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: '/products',
                name: 'Products',
                component: () => import('@/views/Products.vue')
            },
            {
                path: '/product/:slug',
                name: 'Product',
                component: () => import('@/views/Product.vue'),
                props: true,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;