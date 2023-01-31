import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'

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
  }
  // ** Comment them out whenever we actually made the pages
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login

  // },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: Dashboard

  // },
  // {
  //   path: '/jobRecords',
  //   name: 'JobRecords',
  //   component: JobRecords

  // },
  // {
  //   path: '/calender',
  //   name: 'Calender',
  //   component: Calender

  // },
  // {
  //   path: '/resources',
  //   name: 'Resources',
  //   component: Resources
  // },
  // {
  //   path: '/portfolios',
  //   name: 'Portfolios',
  //   component: Portfolios

  // },
  // {
  //   path: '/resumeBuilder',
  //   name: 'ResumeBuilder',
  //   component: ResumeBuilder

  // },
  // {
  //   path: '/communityBlog',
  //   name: 'CommunityBlog',
  //   component: CommunityBlog

  // }
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
