<template>
  <div>
    <header>
      <!-- Navbar -->
      <TopNavBar ref="topNavBar" />
      <!-- Navbar -->
    </header>
    <main v-if="shouldShowSidebar">
      <div>
        <Sidebar></Sidebar>
      </div>
    </main>
    <main v-else>
        <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/SideBar.vue'
import TopNavBar from '@/components/TopNavBar.vue'

export default {
  name: 'App',
  components: { TopNavBar, Sidebar },
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

main {
  height: 100vh;
}
</style>
