import { ref } from 'vue'

/** Reactive state for the application sidebar. */
const isOpen = ref(false)

/**
 * Composable that exposes the sidebar open/closed state.
 *
 * Returns a reactive `isOpen` ref that other components can read or
 * update to show/hide the responsive sidebar.
 */
export function useSidebar() {
  return {
    isOpen,
  }
}
