import Layout from '@/views/layout/Layout'

const commodityManagement = {
    path: '/commodityManagement',
    component: Layout,
    meta: {title: '静态字典', icon: 'shangpinguanli', noCache: true, affix: false},
    children: [
        {
            path: '/commodityManagement/productList',
            component: () => import('@/views/commodityManagement/productList/index'),
            name: '静态字典',
            meta: {title: '静态字典', noCache: false, affix: false}
        },
    ]
};

export default commodityManagement
