<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
      </span>
      <span v-else>JobEase</span>
    </h1>

    <span v-if="collapsed">
    </span>
    <span v-else>
        <SidebarLink to="/dashboard" icon="fas fa-home">Dashboard</SidebarLink>
        <SidebarLink to="/jobRecords" icon="fas fa-th-list">Job Records</SidebarLink>
        <SidebarLink to="/calendar" icon="fas fa-calendar-alt">Calendar</SidebarLink>
        <SidebarLink to="/resources" icon="fas fa-window-restore">Resources</SidebarLink>
        <SidebarLink to="/portfolios" icon="fas fa-columns">Portfolios</SidebarLink>
        <SidebarLink to="/resumeBuilder" icon="fas fa-tools">Resume Builder</SidebarLink>
        <SidebarLink to="/communityBlog" icon="fas fa-link">Community Blog</SidebarLink>
    </span>

    <span class="collapse-icon" :class="{ 'rotate-180': collapsed}" @click="toggleSidebar">
        <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup () {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<style>
:root {
    --sidebar-bg-color: #D3D3D3;
    --sidebar-item-hover: #808080;
    --sidebar-item-active: #000000;
}
</style>

<style scoped>
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
        padding: 0.75;
        transition: 0.2s linear;
    }

    .rotate-180 {
        transform: rotate(180deg);
        transition: 0.2s linear;
    }
</style>
