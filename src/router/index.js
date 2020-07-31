import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home'),
        name: 'home',
        meta: { title: '主页', icon: 'shouye', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile'),
        meta: { title: '个人中心' }
      }
    ],
    hidden: true
  },
  {
    path: '/problem',
    component: Layout,
    redirect: '/problem/index',
    meta: { title: '题库', icon: 'list',},
    children: [
      {
        path: 'index',
        component: () => import('@/views/problem'),
        name: 'problem',
        hidden: true,
        meta: { title: '题目列表', activeMenu: '/problem'},
      },
      {
        path: 'detial/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/problem/detial'),
        name: 'problemDetial',
        meta: { title: '题目', activeMenu: '/problem', noCache: true}
      },
    ]
  },
  
  {
    path: '/contest',
    redirect: '/contest/index',
    meta: { title: '比赛', icon: 'contest2' },
    component: Layout,
    children: [
      {
        path: '/contest/index',
        component: () => import('@/views/contest'),
        name: 'contest',
        meta: { title: '比赛列表', activeMenu: '/contest'}
      },
      {
        path: 'detial/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/contest/detial'),
        name: 'contestDetial',
        meta: { title: '详情', activeMenu: '/contest', noCache: true}
      },
    ]
  },
  {
    path: '/status',
    component: Layout,
    children: [
      {
        path: '/status',
        component: () => import('@/views/status'),
        name: 'status',
        meta: { title: '评测姬', icon: 'status' }
      }
    ]
  },
  {
    path: '/rankList',
    component: Layout,
    children: [
      {
        path: '/rankList',
        component: () => import('@/views/rankList'),
        name: 'rankList',
        meta: { title: '排名', icon: 'ranklist' }
      }
    ]
  },
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
