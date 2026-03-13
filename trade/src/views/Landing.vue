<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { keycloak, login, logout, getUsername } from '../auth/keycloak'

const route = useRoute()
const router = useRouter()

const isAuthenticated = computed(() => !!keycloak.authenticated)
const username = computed(() => getUsername())
const loginRequired = computed(() => route.query.login === 'required')

function handleLogin() {
  login()
}

watch(
  isAuthenticated,
  (authenticated) => {
    if (authenticated) {
      router.replace('/dashboard')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="px-6 py-10 space-y-10">
    <rux-container class="w-full">
      <div slot="header">Welcome to DigitalForge</div>

      <div class="space-y-4">
        <p v-if="loginRequired" class="font-semibold">
          Please sign in to access DigitalForge.
        </p>

        <p class="text-lg">
          DigitalForge is a model-based engineering platform for developing,
          managing, and validating software-defined systems using SysML v2
          models and software-defined verification workflows.
        </p>

        <p>
          Engineers use DigitalForge to build SysML v2 models, develop
          validation workflows, collaborate through repositories, and review
          requirement and verification activity across the platform.
        </p>

        <div class="flex flex-wrap gap-3 pt-2">
          <rux-button v-if="!isAuthenticated" @click="handleLogin">
            Login with Keycloak
          </rux-button>

          <RouterLink
            v-if="isAuthenticated"
            to="/dashboard"
            style="text-decoration: none;"
          >
            <rux-button>Enter DigitalForge</rux-button>
          </RouterLink>

          <rux-button v-if="isAuthenticated" secondary @click="logout()">
            Logout
          </rux-button>
        </div>

        <p v-if="isAuthenticated" class="text-sm opacity-80">
          Signed in as {{ username }}
        </p>
      </div>
    </rux-container>
  </div>
</template>