import { createRouter, createWebHistory } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '../views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import Sidebar from '../components/sidebar/SideBar.vue'
import Dashboard from '../views/DashboardView.vue'
import JobRecords from '../views/JobRecordsView.vue'
import Calendar from '../views/CalendarView.vue'
import Resources from '../views/ResourcesView.vue'
import Portfolios from '../views/PortfoliosView.vue'
import ResumeBuilder from '../views/ResumeBuilderView'
import CommunityBlog from '../views/CommunityBlogView'
import store from '@/store'

const routes = [
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: HelloWorld,
  //   meta: {
  //     needsAuth: true
  //   }
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      sidebar: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      sidebar: false
    }
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar,
    meta: {
      sidebar: false
    }
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/jobRecords',
    name: 'JobRecords',
    component: JobRecords,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    component: Portfolios,
    meta: {
      needsAuth: true
    }

  },
  {
    path: '/resumeBuilder',
    name: 'ResumeBuilder',
    component: ResumeBuilder,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/communityBlog',
    name: 'CommunityBlog',
    component: CommunityBlog,
    meta: {
      needsAuth: true
    }

  }
]

// Create a history that a user can go back to and construct a router object for Vue, respectively.
// To create our router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to, from, next) => {
  console.log(store.getters.getUserLoggedIn)
  if (to.meta.needsAuth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// To export our router
// We can access this component from another file by simply referencing the file with any name since a function is exported by default.
export default router
