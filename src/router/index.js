import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage'
import TablePage from '../views/TablePage'
import { clearAllTimer } from '@/oldjs/Timer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    props: true,
    component: IndexPage
  },
  {
    path: '/table/:id',
    name: 'table',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TablePage
  }
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
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
