<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const { isOpen } = useSidebar()
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <nav class="mt-4">
        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
          to="/"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Dashboard</title>
            <path fill="currentColor" d="M10 13H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1Zm0 8H4c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1Zm4 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1ZM13 8V4c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1Z"></path><metadata>cards, dashboard, format, layout, rectangle, shapes, square, web, website</metadata>
          </svg>

          <span class="mx-4">Dashboard</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Commits' ? activeClass : inactiveClass]"
          to="/commits"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="w-10 h-10"
            fill="none"
          >
            <path fill="currentColor" d="M480-280q-73 0-127.5-45.5T284-440H80v-80h204q14-69 68.5-114.5T480-680q73 0 127.5 45.5T676-520h204v80H676q-14 69-68.5 114.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
          </svg>
          <span class="mx-4">Model Commits</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Containers' ? activeClass : inactiveClass]"
          to="/containers"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-10 h-10"
            fill="none"
          >
            <title>Containers</title>
            <path fill="currentColor" fill-rule="evenodd" d="m12.68 2.245.162.071 8 4c.588.295.977.873 1.033 1.52l.007.164v8c0 .658-.343 1.264-.897 1.604l-.143.08-8 4a1.883 1.883 0 0 1-1.522.071l-.162-.071-8-4a1.882 1.882 0 0 1-1.033-1.52L2.118 16V8c0-.658.343-1.264.897-1.604l.143-.08.27-.136a1 1 0 0 1 .259-.13l7.471-3.734a1.882 1.882 0 0 1 1.356-.127l.166.056ZM4 8.179V16l7 3.5v-6.946L4 8.179Zm9 4.439 7-3.5V16l-7 3.5v-6.882ZM18.5 15a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM6 15.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1    0ZM16.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm-8.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM9.5 13a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm5.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 4 5.937 7.03l6.116 3.824 6.828-3.413L12 4Zm.5 5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 7a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm.5-1.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z">
            </path>
          </svg>
          <span class="mx-4">Containers</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Artifacts' ? activeClass : inactiveClass]"
          to="/artifacts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-10 h-10"
            fill="none"
          >
            <title>Artifacts</title>
            <path fill="currentColor" fill-rule="evenodd" d="M13.17 2c.53 0 1.04.21 1.42.59l4.82 4.83c.38.37.59.88.59 1.41V20c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20V4c0-1.1.9-2 2-2h7.17ZM9 18h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1Zm6-4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1ZM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5Z"></path>
          </svg>
          <span class="mx-4">Artifacts</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Reqts' ? activeClass : inactiveClass]"
          to="/reqts"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mission</title>
            <path fill="currentColor" fill-rule="evenodd" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm6 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Zm-6-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm2 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"></path><metadata>bullseye, monitoring, planning, target</metadata></svg>

          <span class="mx-4">Requirements</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Verifications' ? activeClass : inactiveClass]"
          to="/verifications"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Beenhere</title>
            <path fill="currentColor" fill-rule="evenodd" d="M5 1h14c1.1 0 2 .9 2 2v12.93c0 .69-.35 1.3-.88 1.66l-7.56 5.04c-.34.22-.77.22-1.11 0l-7.57-5.04c-.53-.36-.88-.97-.88-1.66L3.01 3c0-1.1.89-2 1.99-2Zm5.71 14.29L18.3 7.7a.996.996 0 0 0-.01-1.41.996.996 0 0 0-1.41 0L10 13.17l-2.88-2.88a.996.996 0 1 0-1.41 1.41l3.59 3.59c.39.39 1.02.39 1.41 0Z">
            </path>
            <metadata>approve, archive, beenhere, bookmark, check, complete, done, favorite, label, library, mark, ok, read, reading, remember, ribbon, save, select, tag, tick, validate, verified, yes</metadata>
          </svg>

          <span class="mx-4">Verifications</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Threads' ? activeClass : inactiveClass]"
          to="/threads"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Processor Alt</title>
            <path fill="currentColor" d="M15.684 2v8.882l-4.218.065-.061.005a.527.527 0 0 0-.444.402l-.01.059-.004.06V22h-1.58l.001-3.684-.003-.062a.527.527 0 0 0-.402-.45l-.06-.011-.06-.003h-3.16l-.061.003-.026.004a1.58 1.58 0 1 0 .01 1.006l.077.04h2.632V22H3.578A1.579 1.579 0 0 1 2 20.421v-5.263h2.632l.061-.004a.527.527 0 0 0 .461-.461l.004-.061V9.278a1.58 1.58 0 1 0-1.143-.035l.09.036v4.826H2V5.158h7.895l.061-.004a.527.527 0 0 0 .462-.461l.003-.061V2H12v5.263H8.842l-.061.004a.527.527 0 0 0-.462.461l-.003.061v5.88a1.58 1.58 0 1 0 1.144.035l-.091-.035V8.316h3.157l.062-.004a.527.527 0 0 0 .461-.461l.004-.062V2h2.631Zm3.158 0v8.947l.004.062c.028.241.22.433.461.461l.061.004H22v2.105h-6.842l-.061.003a.527.527 0 0 0-.462.462l-.003.061v3.248a1.58 1.58 0 1 0 1.143.035l-.09-.035v-2.721H22v2.105h-4.21l-.062.003a.527.527 0 0 0-.461.462l-.004.061V22H12V11.992l4.219-.065.06-.005a.527.527 0 0 0 .444-.402l.01-.059.004-.06V2h2.105ZM22 17.79v2.631A1.58 1.58 0 0 1 20.421 22h-2.105v-4.21H22Zm-6.842.526a.526.526 0 1 1 0 1.052.526.526 0 0 1 0-1.052ZM4.105 17.79a.526.526 0 1 1 0 1.052.526.526 0 0 1 0-1.052Zm4.737-3.158a.526.526 0 1 1 0 1.052.526.526 0 0 1 0-1.052ZM22 3.579v6.842h-2.105V2h.526A1.58 1.58 0 0 1 22 3.579ZM4.632 7.263a.526.526 0 1 1 0 1.053.526.526 0 0 1 0-1.053ZM9.368 2v2.105H2V3.58C2 2.707 2.707 2 3.579 2h5.79Z"></path>
            <metadata>chip, component, cpu, device, monitoring, motherboard</metadata>
          </svg>

          <span class="mx-4">Threads</span>
        </router-link>

        <router-link
          style="text-decoration: none; color: inherit;"
          class="flex items-center px-12 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Thread Executions' ? activeClass : inactiveClass]"
          to="/thread-executions"
        >
          <svg
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Assignment Turned In</title>
            <path fill="currentColor" fill-rule="evenodd" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1ZM6.7 13.7l2.59 2.59c.39.39 1.03.39 1.41 0l6.59-6.59a.996.996 0 1 0-1.41-1.41L10 14.17l-1.89-1.88A.996.996 0 1 0 6.7 13.7Z"></path>
          </svg>

          <span class="mx-4">Thread Executions</span>
        </router-link>


      </nav>
    </div>
  </div>
</template>
