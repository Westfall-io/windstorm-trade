<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { keycloak, logout, getUsername } from '../auth/keycloak'

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()

const isAuthenticated = computed(() => !!keycloak.authenticated)
const username = computed(() => getUsername())

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function handleLogout() {
  logout()
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <rux-classification-marking classification="unclassified"></rux-classification-marking>

    <header class="border-b border-slate-700 bg-[#071826] text-white">
      <div class="flex items-center w-full bg-[#071826]">
        <div class="flex items-center shrink-0">
          <button
            class="text-gray-300 focus:outline-none lg:hidden"
            @click="isOpen = true"
          >
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
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

        <div class="flex items-center justify-between flex-1 min-w-0 mr-0 px-0 py-0 bg-[#13283b]">
          <div class="flex-1 min-w-0">
            <rux-global-status-bar
              class="w-full"
              include-icon
              menu-icon="whatshot"
              app-state="Alpha"
              app-state-color="tag1"
              app-domain="DigitalForge"
              app-name="Dashboard"
              app-version="0.2.0 Alpha"
            />
          </div>

          <div v-if="isAuthenticated" class="relative ml-6 shrink-0 bg-[#13283b]">
            <button
              class="flex items-center gap-2 text-sm font-medium text-white bg-[#13283b] hover:text-gray-200 focus:outline-none"
              @click="toggleDropdown"
            >
              <rux-icon icon="person"></rux-icon>
              {{ username }}

              <svg
                class="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute right-0 top-full mt-2 w-40 bg-[#13283b] rounded-md shadow-lg border border-slate-600 z-50"
            >
              <button
                class="block w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-700"
                @click="handleLogout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>