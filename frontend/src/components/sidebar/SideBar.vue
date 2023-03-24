<!--resource: https://github.com/mdbootstrap/bootstrap-side-navbar/blob/main/basic.html -->

<template>
   <!--Main Navigation-->
  <header>
    <!-- Sidebar -->
    <nav id="sidebarMenu"
         class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <a ref="dashboard"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === dashboardPath ||
              $route.path === homePath ? 'active' : ''}`"
             @click="closeNavBar"
            >
            <SidebarLink to="/dashboard" icon="fas fa-home">Dashboard</SidebarLink>
          </a>
          <a ref="jobRecords"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === jobRecordsPath ? 'active' : ''}`"
             @click="closeNavBar"
             >
            <SidebarLink to="/jobRecords" icon="fas fa-th-list">Job Records</SidebarLink>
          </a>
          <a ref="calendar"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === calendarPath ? 'active' : ''}`"
             @click="closeNavBar"
             >
            <SidebarLink to="/calendar" icon="fas fa-calendar-alt">Calendar</SidebarLink>
          </a>
          <a ref="resources"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === resourcesPath ? 'active' : ''}`"
             @click="closeNavBar"
             >
              <SidebarLink to="/resources" icon="fas fa-window-restore">Resources</SidebarLink>
          </a>
          <a ref="portfolios"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === portfoliosPath ? 'active' : ''}`"
             @click="closeNavBar"
             >
            <SidebarLink to="/portfolios" icon="fas fa-columns">Portfolios</SidebarLink>
          </a>
          <a ref="communityBlog"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === communityBlogPath ? 'active' : ''}`"
             @click="closeNavBar"
             >
            <SidebarLink to="/communityBlog" icon="fas fa-link">Community Blog</SidebarLink>
          </a>

        </div>
      </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav id="main-navbar"
         class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
         >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
                class="navbar-toggler"
                type="button"
                v-on:click="toggleButtonClicked"
                >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Brand -->
        <a class="navbar-brand" href="#">
            <img style="width: 150px; height: 45px" src="@/assets/logo-stacked.png">
        </a>

        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
          <!-- User -->
          <li class="nav-item dropdown">
             <a
                class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                @click="toggleUserDropdown"
                aria-expanded="false"
              >
                <label class="rounded-circle" loading="lazy">{{ userName }}</label>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                v-if="showUserDropdown"
                v-bind:class="{ show: showUserDropdown }"
              >
                <li><a class="dropdown-item" href="#">My profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" @click="logout">Logout</a></li>
              </ul>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main style="margin-top: 70px; margin-left: 15px">
    <div class="container pt-4">
      <router-view/>
    </div>
  </main>
  <!--Main layout-->
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import store from '@/store'

export default {
  data() {
    return {
      showUserDropdown: false,
      homePath: this.$router.options.routes.find(route => route.name === 'Home').path,
      dashboardPath: this.$router.options.routes.find(route => route.name === 'Dashboard').path,
      jobRecordsPath: this.$router.options.routes.find(route => route.name === 'Job Records').path,
      calendarPath: this.$router.options.routes.find(route => route.name === 'Calendar').path,
      resourcesPath: this.$router.options.routes.find(route => route.name === 'Resources').path,
      portfoliosPath: this.$router.options.routes.find(route => route.name === 'Portfolios').path,
      communityBlogPath: this.$router.options.routes.find(route => route.name === 'Community Blog').path,
    };
  },
  components: { SidebarLink },
  methods: {
    toggleButtonClicked () {
      if (document.getElementById("sidebarMenu").style.display === "block") {
        this.closeNavBar()
      } else {
        document.getElementById("sidebarMenu").style.display = "block"
      }
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
    async logout () {
      await store.dispatch('logout', `${localStorage.getItem('token')}`, store.getters.getUser )
    },
    closeNavBar() {
      document.getElementById("sidebarMenu").style.display = "none"
    },
  },
  computed: {
    userName () {
      return localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : "";
    }
  }
}
</script>

<style scoped>
  body {
    background-color: #fbfbfb;
  }
  @media (min-width: 991.98px) {
    main {
      padding-left: 240px;
    }
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0; /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
  }

  @media (max-width: 991.98px) {
    .sidebar {
      width: 100%;
    }
  }
  .sidebar .active {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  .menuItem{
    width: 100%
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    display: none;
    float: right;
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: .25rem;
  }
  .dropdown-menu.show {
    display: block;
  }
  .dropdown-menu-end {
    right: 0;
    left: auto;
  }
</style>
