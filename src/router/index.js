import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Friends from '../views/Friends.vue'
import Messaging from '../views/Messaging.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/messaging',
    name: 'Messaging',
    component: Messaging
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
