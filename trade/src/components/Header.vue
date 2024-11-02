<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
</script>

<template>
  <header
    class="border-b-4"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex" style="flex-flow: column;">
      <div style="position: relative; overflow: hidden;">
          <rux-classification-marking classification="unclassified"></rux-classification-marking>
      </div>
    </div>

    <div style="display: flex; justify-content: center;">
      <rux-global-status-bar include-icon="" menu-icon="whatshot" app-state="Alpha" app-state-color="tag1" app-domain="DigitalForge" app-name="Dashboard" app-version="0.1.0 Alpha">
      </rux-global-status-bar>
    </div>
  </header>
</template>
