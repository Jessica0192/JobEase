import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'
import JobRecords from '../views/JobRecordsView.vue'
import JobRecordDetail from '../views/JobRecordDetailView.vue'
import CreateJobRecord from '../views/CreateJobRecordView.vue'
import Calendar from '../views/CalendarView.vue'
import Resources from '../views/ResourcesView.vue'
import Portfolios from '../views/PortfoliosView.vue'
import ResumeBuilder from '../views/ResumeBuilderView'
import CommunityBlog from '../views/CommunityBlogView'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
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
      path: '/create-job',
      name: 'CreateJobRecord',
      component: CreateJobRecord,
  },
  {
    path: '/job/:id',
    name: 'JobRecordDetail',
    component: JobRecordDetail,
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

