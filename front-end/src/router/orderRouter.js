export const orderRoutes = [
    {
        path: '/orders',
        name: 'OrderList',
        component: ()=>import("@/views/OrderList.vue")
    }
]