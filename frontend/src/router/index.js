import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

// Create a history that a user can go back to and construct a router object for Vue, respectively.
// To create our router
const router = new Router({
  mode: 'history',
  routes
})

// To export our router
// We can access this component from another file by simply referencing the file with any name since a function is exported by default.
export default router
