import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'
import JobRecords from '../views/jobRecord/JobRecordsView.vue'
import JobRecordDetail from '../views/jobRecord/JobRecordDetailView.vue'
import CreateJobRecord from '../views/jobRecord/CreateJobRecordView.vue'
import Calendar from '../views/CalendarView.vue'
import Resources from '../views/ResourcePage/ResourcesView.vue'
import Portfolios from '../views/portfolio/PortfoliosView.vue'
import ResumeBuilder from '../views/ResumeBuilderView'
import CommunityBlog from '../views/CommunityBlogView'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: {
      needsAuth: true
    },
    // it will be called before each route is loaded, and it will check if the JWT is still valid.
    // If the JWT is expired, it will log out the user and redirect them to the login page
    beforeEnter: (to, from, next) => {
      const tokenIsValid = checkTokenExpiration();

      if (!tokenIsValid) {
        store.dispatch('logout');
      } else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      needsAuth: true
    },
    // it will be called before each route is loaded, and it will check if the JWT is still valid.
    // If the JWT is expired, it will log out the user and redirect them to the login page
    beforeEnter: (to, from, next) => {
      const tokenIsValid = checkTokenExpiration();

      if (!tokenIsValid) {
        store.dispatch('logout');
      } else {
        next();
      }
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
    path: '/jobRecords',
    name: 'JobRecords',
    component: JobRecords,
    meta: {
      needsAuth: true
    }
  },
  {
      path: '/createJob',
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
    if (localStorage.getItem('user')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// it checks the JWT's expiration time
function checkTokenExpiration() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const { exp } = decodeJwt(token);
  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
}

// decode the JWT
function decodeJwt(token) {
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
}


// To export our router
// We can access this component from another file by simply referencing the file with any name since a function is exported by default.
export default router

