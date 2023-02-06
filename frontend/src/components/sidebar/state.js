import { ref, computed } from 'vue'

// Contains the status of the sidebar
// To make the sidebar collapsable and toggle the sidebar from different pages

// Reactive variable for on and off toggling
export const collapsed = ref(false)
// Helper function to make hte process easier
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 180
export const SIDEBAR_WIDTH_COLLAPSED = 15
// This will return pixel width value for the width of the sidebar
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)
