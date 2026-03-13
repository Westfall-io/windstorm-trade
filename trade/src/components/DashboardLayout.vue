<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="font-roboto min-h-screen pt-[120px]">
    <Header />

    <div class="flex">
      <Sidebar />

      <main class="flex-1 overflow-x-hidden bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>