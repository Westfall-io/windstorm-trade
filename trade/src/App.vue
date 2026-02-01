<script setup lang="ts">
// App root component that chooses which layout to render around
// the current route. The `layout` computed value reads the
// `meta.layout` field from the active route and falls back to
// the `default` layout when none is specified.
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
