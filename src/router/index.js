import Vue from 'vue'
import VueRouter from 'vue-router'

import { clearAllTimer } from '@/oldjs/Timer'
import BossPage from '@/views/BossPage'
import IndexPage from '@/views/IndexPage'
import FirstPage from '@/views/FirstPage/FirstPage'
import SalesPage from '@/views/SalePage/SalesPage'
import TablePage from '@/views/TablePage/TablePage'
import ReservationPage from '@/views/ReservationPage/ReservationPage.vue'
import SettingPage from '@/views/SettingPage.vue'
import { getCurrentUserId } from '@/api/firebase/user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    props: true,
    component: IndexPage,
    children: [

      {
        path: 'boss',
        name: 'boss',
        component: BossPage
      },
      {
        path: '',
        name: 'order',
        component: FirstPage,
        props: true
      },
      {
        path: '',
        name: 'reservation',
        component: ReservationPage,
        props: true
      },
      {
        path: 'sales/:password',
        name: 'sales',
        component: SalesPage,
        props: true
      },
      {
        path: 'setting',
        name: 'setting',
        component: SettingPage,
        props: true
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/LoginPage/Index'),
    children: [{
      name: 'LoginPage',
      path: '/login',
      component: () => import('@/views/LoginPage/Login')
    },
    {
      name: 'ErrorPage',
      path: '/error',
      component: () => import('@/views/LoginPage/ErrorPage')
    },
    {
      name: 'StorePage',
      path: '/store',
      component: () => import('@/views/LoginPage/StorePage')
    }]
  },
  {
    path: '/table/:id',
    name: 'table',
    props: true,
    component: TablePage
  }
]

const router = new VueRouter({
  routes
})
let count = 0
count++

router.beforeEach(async (to, from, next) => {
  count += 1
  clearAllTimer()
  if (!to.params.refresh) {
    Object.assign(to.params, { refresh: count })
  }
  if (to.name !== 'LoginPage') {
    if (!getCurrentUserId()) {
      next({ name: 'LoginPage' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
