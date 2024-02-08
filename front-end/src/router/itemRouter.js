export const itemRoutes = [
    {
        path: '/items',
        name: 'ItemList',
        component: ()=>import("@/views/ItemList.vue")
    }
]