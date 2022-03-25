import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage'
import TablePage from '../views/TablePage'
import { clearAllTimer } from '@/oldjs/Timer'
import BossPage from '@/views/BossPage'
import FirstPage from '@/views/FirstPage'
import SalesPage from '@/views/SalesPage'

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
        path: 'sales/:password',
        name: 'sales',
        component: SalesPage,
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
