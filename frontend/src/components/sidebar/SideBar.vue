<template>
  <!-- Create a sidebar menu on the left side of the screen -->
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div class="header">
      <!-- To display different title based on sidebar is collapsed or not -->
      <span v-if="collapsed">
      </span>
      <span v-else>JobEase</span>
    </div>

    <span v-if="collapsed">
    </span>
     <!-- Display the sidebar items when it is open and navigate user based on their selection -->
    <span v-else>
        <SidebarLink to="/dashboard" icon="fas fa-home">Dashboard</SidebarLink>
        <SidebarLink to="/jobRecords" icon="fas fa-th-list">Job Records</SidebarLink>
        <SidebarLink to="/calendar" icon="fas fa-calendar-alt">Calendar</SidebarLink>
        <SidebarLink to="/resources" icon="fas fa-window-restore">Resources</SidebarLink>
        <SidebarLink to="/portfolios" icon="fas fa-columns">Portfolios</SidebarLink>
        <SidebarLink to="/resumeBuilder" icon="fas fa-tools">Resume Builder</SidebarLink>
        <SidebarLink to="/communityBlog" icon="fas fa-link">Community Blog</SidebarLink>
    </span>

    <span v-if="collapsed">
    </span>
     <!-- Display the sidebar items when it is open and navigate user based on their selection -->
    <span v-else style="position: absolute; bottom: 30px; horiz-align: center" >
        <button class="button-54" role="button" @click="doLogout">Log-out</button>
    </span>

    <!-- To rotate the collapse icon -->
    <!-- To call the toggle function on click -->
    <span class="collapse-icon" :class="{ 'rotate-180': collapsed}" @click="toggleSidebar">
      <!-- To add toggle icon -->
        <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SideBarLink.vue'
import { collapsed, doLogout, toggleSidebar, sidebarWidth } from './state'
// import router from '@/router'
export default {
  methods: {doLogout},
  props: {},
  components: { SidebarLink },
  // Set the width of the sidebar
  setup () {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
/* Global CSS section */
:root {
  --sidebar-bg-color: #D3D3D3;
  --sidebar-item-hover: #808080;
  --sidebar-item-active: #316fcd;
}
</style>

<style scoped>
    .header {
      text-align: center;
      font-weight: bold;
      font-size: 40px;
      margin-top: 40px;
      margin-bottom: 30px;
      color: darkblue;
    }
    .sidebar{
      color: #000000;
      background-color: #D3D3D3;
      float: left;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 0.5em;
      margin-bottom: 0px;
      /* For the smooth transition of the sidebar */
      transition: 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .sidebar h1 {
      height: 2.5em;
    }
    .collapse-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.75;
      transition: 0.2s linear;
      margin-right: 10px;
      margin-top: 10px;
    }
    .rotate-180 {
      transform: rotate(180deg);
      transition: 0.2s linear;
    }
    /* CSS */
    .button-54 {
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      letter-spacing: 2px;
      text-decoration: none;
      text-transform: uppercase;
      color: #000;
      cursor: pointer;
      border: 3px solid;
      padding: 0.25em 0.5em;
      box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .button-54:active {
      box-shadow: 0px 0px 0px 0px;
      top: 5px;
      left: 5px;
    }

    @media (min-width: 768px) {
      .button-54 {
        padding: 0.25em 0.75em;
      }
    }
</style>
