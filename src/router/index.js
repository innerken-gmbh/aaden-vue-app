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
import MemberCardPage from '@/views/MemberPage/MemberCardPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    props: true,
    component: IndexPage,
    children: [

      {
        path: 'boss/:password',
        name: 'boss',
        component: BossPage,
        props: true
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
        path: '',
        name: 'member',
        component: MemberCardPage,
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
  next()
})
export default router
