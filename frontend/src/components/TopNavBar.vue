<template>
  <nav id="main-navbar"
         class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
         >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button v-if="shouldShowToggleButton"
                class="navbar-toggler"
                type="button"
                v-on:click="toggleButtonClicked"
                >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Brand -->
        <a class="navbar-brand" href="/">
            <img style="width: 150px; height: 45px" src="@/assets/logo-stacked.png">
        </a>

        <!-- Right links -->
        <ul v-if="userName" class="navbar-nav ms-auto d-flex flex-row">
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
                <label style="cursor: pointer" class="rounded-circle" loading="lazy">{{ userName }}</label>
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
</template>

<script>
import store from '@/store'

export default {
  name: 'TopNavBar',
  data() {
    return {
      showUserDropdown: false,
      userName: ''
    }
  },
  mounted() {
    this.userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
  },
  watch: {
    '$route'() {
      this.userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    }
  },
  computed: {
    shouldShowToggleButton () {
      return this.$route.meta.sidebar !== false
    }
  },
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
      location.reload()
    },
    closeNavBar() {
      document.getElementById("sidebarMenu").style.display = "none"
    },
  },
}
</script>

<style scoped>
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
