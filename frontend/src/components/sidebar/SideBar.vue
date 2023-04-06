<!--resource: https://github.com/mdbootstrap/bootstrap-side-navbar/blob/main/basic.html -->

<template>
   <!--Main Navigation-->
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

export default {
  data() {
    return {
      homePath: this.$router.options.routes.find(route => route.name === 'Home').path,
      dashboardPath: this.$router.options.routes.find(route => route.name === 'Dashboard').path,
      jobRecordsPath: this.$router.options.routes.find(route => route.name === 'Job Records').path,
      calendarPath: this.$router.options.routes.find(route => route.name === 'Calendar').path,
      resourcesPath: this.$router.options.routes.find(route => route.name === 'Resources').path,
      portfoliosPath: this.$router.options.routes.find(route => route.name === 'Portfolios').path,
      communityBlogPath: this.$router.options.routes.find(route => route.name === 'Community Blog').path,
    };
  },
  components: {
    SidebarLink
  },
  methods: {
    closeNavBar() {
      document.getElementById("sidebarMenu").style.display = "none"
    },
  }
}
</script>

<style scoped>
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
    margin: 75px 0 0; /* Height of navbar */
    box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 6%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
    border-radius: 50px;
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

  .position-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }
</style>
