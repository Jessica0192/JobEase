import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Sidebar from '../components/sidebar/Sidebar.vue'
import Dashboard from '../views/Dashboard.vue'
import JobRecords from '../views/JobRecords.vue'
import Calendar from '../views/Calendar.vue'
import Resources from '../views/Resources.vue'
import Portfolios from '../views/Portfolios.vue'
import ResumeBuilder from '../views/ResumeBuilder'
import CommunityBlog from '../views/CommunityBlog'

Vue.use(Router)

// **This is the default code for this file
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
// **End of the code

const routes = [
  {
    // Should remove later
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'Login',
    // To not see the sidebar in login page
    meta: {sidebar: false},
    component: Login

  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard

  },
  {
    path: '/jobRecords',
    name: 'JobRecords',
    component: JobRecords

  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar

  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    component: Portfolios

  },
  {
    path: '/resumeBuilder',
    name: 'ResumeBuilder',
    component: ResumeBuilder

  },
  {
    path: '/communityBlog',
    name: 'CommunityBlog',
    component: CommunityBlog

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
