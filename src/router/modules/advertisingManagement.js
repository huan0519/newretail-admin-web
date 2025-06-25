import Layout from '@/views/layout/Layout'

const advertisingManagement = {
    path: '/advertisingManagement',
    component: Layout,
    meta: {title: '方药管理', icon: 'dingdan', noCache: true, affix: false},
    children: [
        {
            path: '/advertisingManagement/advertisingPlan',
            component: () => import('@/views/advertisingManagement/advertisingPlan/index'),
            name: '方药管理',
            meta: {title: '方药管理', noCache: false, affix: false},

        },
        {
            path: '/advertisingManagement/advertisingPlan/opiModel',
            component: () => import('@/views/advertisingManagement/advertisingPlan/opiModel'),
            hidden:true,
            name: '药方增加/查看',
            meta: {title: '药方增加/查看', noCache: false, affix: false},

        }
    ]
};

export default advertisingManagement
