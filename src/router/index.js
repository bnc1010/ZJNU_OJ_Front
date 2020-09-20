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
    path: '/userview',
    component: Layout,
    children: [
      {
        path: '/userview',
        name: 'OtherProflie',
        component: () => import('@/views/others-profile'),
        meta: { title: '用户查看' }
      }
    ],
    hidden: true
  },
  {
    path: '/problem',
    component: Layout,
    redirect: '/problem/index',
    meta: { title: '题库', icon: 'list' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/problem'),
        name: 'problem',
        hidden: true,
        meta: { title: '题目列表', activeMenu: '/problem' }
      },
      {
        path: 'detial/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/problem/detial'),
        name: 'problemDetial',
        meta: { title: '题目', activeMenu: '/problem', noCache: true, roles: ['editor'] }
      }
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
        hidden: true,
        meta: { title: '比赛列表', activeMenu: '/contest', noCache: true }
      },
      {
        path: 'detial/:id(\\d+)',
        hidden: true,
        component: () => import('@/views/contest/detial'),
        name: 'contestDetial',
        meta: { title: '详情', activeMenu: '/contest', noCache: true }
      }
    ]
  },
  {
    path: '/team',
    redirect: '/team/myteam',
    meta: { title: '队伍', icon: 'team' },
    component: Layout,
    children: [
      {
        path: '/team/myteam',
        component: () => import('@/views/team/myteam'),
        name: 'myteam',
        hidden: true,
        meta: { title: '我的队伍', activeMenu: '/team', noCache: true }
      },
      {
        path: '/team/all',
        hidden: true,
        component: () => import('@/views/team/allteam'),
        name: 'allteam',
        meta: { title: '所有队伍', activeMenu: '/team', noCache: true }
      }
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
        meta: { title: '评测器', icon: 'status' }
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
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/userAdmin',
    component: Layout,
    name: 'userAdmin',
    redirect: '/userAdmin/userList',
    meta: {
      roles: ['admin'],
      title: '用户管理',
      icon: 'useradmin'
    },
    children: [
      {
        path: '/userAdmin/userList',
        component: () => import('@/views/user-admin/user-list.vue'),
        name: 'users',
        meta: { title: '用户', noCache: true, roles: ['admin'] }
      },
      {
        path: '/userAdmin/roleList',
        component: () => import('@/views/user-admin/role-list.vue'),
        name: 'roles',
        meta: { title: '角色', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/ojAdmin',
    component: Layout,
    name: 'ojAdmin',
    redirect: '/ojAdmin/problem',
    meta: {
      roles: ['admin'],
      title: 'OJ管理',
      icon: 'ojadmin'
    },
    children: [
      {
        path: '/ojAdmin/problem',
        component: () => import('@/views/oj-admin/problem-admin.vue'),
        name: 'problemAdmin',
        meta: { title: '题目管理', noCache: true, roles: ['admin'] }
      },
      {
        path: '/ojAdmin/problem/edit/:id(\\d+)',
        component: () => import('@/views/oj-admin/problem-edit.vue'),
        name: 'problemEdit',
        hidden: true,
        meta: { title: '编辑题目', activeMenu: '/ojAdmin/problem', noCache: true, roles: ['admin'] }
      },
      {
        path: '/ojAdmin/problem/add',
        component: () => import('@/views/oj-admin/problem-add.vue'),
        name: 'problemAdd',
        hidden: true,
        meta: { title: '新建题目', activeMenu: '/ojAdmin/problem', noCache: true, roles: ['admin'] }
      },
      {
        path: '/ojAdmin/contest',
        component: () => import('@/views/oj-admin/contest-admin.vue'),
        name: 'contestAdmin',
        meta: { title: '比赛管理', noCache: true, roles: ['admin'] }
      },
      {
        path: '/ojAdmin/contest/add',
        component: () => import('@/views/oj-admin/contest-add.vue'),
        name: 'contestAdd',
        hidden: true,
        meta: { title: '新建比赛', activeMenu: '/ojAdmin/contest', noCache: true, roles: ['admin'] }
      },
      {
        path: '/ojAdmin/contest/edit/:id(\\d+)',
        component: () => import('@/views/oj-admin/contest-edit.vue'),
        name: 'contestEdit',
        hidden: true,
        meta: { title: '编辑比赛', activeMenu: '/ojAdmin/contest', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/systemAdmin',
    component: Layout,
    name: 'systemAdmin',
    redirect: '/systemAdmin/permissionList',
    meta: {
      roles: ['root'],
      title: '系统管理',
      icon: 'systemadmin'
    },
    children: [
      {
        path: '/systemstatus',
        component: () => import('@/views/system-admin/system-status'),
        name: 'systemstatus',
        meta: { title: '系统概览', noCache: true, roles: ['root'] }
      },
      {
        path: 'permissionList',
        component: () => import('@/views/user-admin/permission-list.vue'),
        name: 'permissions',
        meta: { title: '权限管理', noCache: true, roles: ['root'] }
      },
      {
        path: 'adminlogs',
        component: () => import('@/views/system-admin/logs.vue'),
        name: 'syatemlogs',
        meta: { title: '管理日志', noCache: true, roles: ['root'] }
      },
      {
        path: 'setting',
        component: () => import('@/views/system-admin/system-setting.vue'),
        name: 'systemsetting',
        meta: { title: '系统设置', noCache: true, roles: ['root'] }
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
