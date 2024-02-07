export const memberRoutes = [
    {
        path: '/members',
        name: 'MemberList',
        component: ()=>import('@/views/MemberList.vue'),
    },
    {
        path: '/member/new',
        name: "MemberCreate",
        component: ()=>import("@/views/MemberCreate.vue"),
    },
];