
<template>
  <!-- creates a clickable link for navigating between different routes in the application. -->
  <router-link :to="to" v-bind:class="{ active: isActive }" style="color: dimgrey">
     <div class="icon-container">
      <i class="icon" :class="icon" />
       <span class="icon-slot">
        <slot />
       </span>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import router from '@/router'
export default {
  props: {
    // To navigate user to the URL
    to: { type: String, required: true },
    // To display an icon beside the URL link
    icon: { type: String, required: true }
  },
  setup (props) {
    // To check if the link is active. It returns an object that has path property
    // If this path equal to "to" path passed in, then this rout is active
    const isActive = computed(() => router.path === props.to)
    return { isActive }
  }
}
</script>

<style scoped>
.icon-container {
  /*display: flex;*/
  align-items: center;
}

.icon-slot {
  padding-left: 10px; /* Add your desired padding here */
}
</style>
