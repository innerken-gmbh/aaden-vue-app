import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage'
import TablePage from '../views/TablePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
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
  routes
})

export default router
