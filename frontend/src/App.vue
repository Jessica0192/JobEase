<template>
<div>
  <!-- <Sidebar/> -->
  <Sidebar v-if="shouldShowSidebar"></Sidebar>
  <!-- To make sure we are giving the page the proper width it has to use -->
  <div id="app" :style="{ 'margin-left': sidebarWidth }">
    <!-- <h1>JobEase</h1> -->
    <router-view/>
  </div>
</div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  name: 'App',
  components: { Sidebar },
  setup () {
    return { sidebarWidth }
  },
  computed: {
    shouldShowSidebar () {
      return this.$route.meta.sidebar !== false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
  text-align: center;
}
</style>
