
<template>
  <!-- creates a clickable link for navigating between different routes in the application. -->
  <router-link :to="to" class="link" v-bind:class="{ active: isActive }">
    <i class="icon" :class="icon" />
    <transition name="fade">
      <span v-if="!collapsed">
        <!-- a placeholder for content in Sidebar.vue component -->
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import Router from 'vue-router'
import { collapsed } from './state'

export default {
  props: {
    // To navigate user to the URL
    to: { type: String, required: true },
    // To display an icon beside the URL link
    icon: { type: String, required: true }
  },
  setup (props) {
    const route = new Router()
    // To check if the link is active. It returns an object that has path property
    // If this path equal to "to" path passed in, then this rout is active
    const isActive = computed(() => route.path === props.to)
    return { isActive, collapsed }
  }
}
</script>

<style scoped>
/* For better transition effect */
/* When we collapse the sidebar slot is actually getting removed */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
/* This is for better start and finish animation */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.link {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: black;
  text-decoration: none;
}
.link:hover {
  background-color: var(--sidebar-item-hover);
}
.link.active {
  background-color: var(--sidebar-item-active);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
