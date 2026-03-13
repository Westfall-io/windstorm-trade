<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiJson } from '../lib/api'

const models = ref<number | null>(null)
const requirements = ref<number | null>(null)
const threads = ref<number | null>(null)

async function getModels() {
  const data = await apiJson<{ models: number }>('/views/count_models/')
  models.value = data.models
}

async function getReqts() {
  const data = await apiJson<{ requirements: number }>('/views/count_requirements/')
  requirements.value = data.requirements
}

async function getThreads() {
  const data = await apiJson<{ threads: number }>('/views/count_threads/')
  threads.value = data.threads
}

onMounted(() => {
  getModels()
  getReqts()
  getThreads()
})

import API_Wait from '../components/links/API_Wait.vue'
import * as defaults from '../constants.tsx'

const stats = ref({
  models: null,
  requirements: null,
  threads: null,
})

const primaryApps = [
  {
    title: 'Coder',
    description:
      'Primary development environment for SysML v2 models and DigitalForge workflows. Launch a cloud workspace with a full VS Code interface to build models, automation, and validation pipelines.',
    href: 'https://coder.digitalforge.app/',
    cta: 'Open Coder',
  },
  {
    title: 'JupyterHub',
    description:
      'Notebook environments for SysML v2 analysis, scripting, and verification workflows. Use Python and other tools to interact with models, run engineering analysis, and support validation activities.',
    href: 'https://jupyter.digitalforge.app/',
    cta: 'Open JupyterHub',
  },
  {
    title: 'Models',
    description:
      'Git-based repository for storing and collaborating on SysML v2 models used across DigitalForge.',
    href: 'https://models.digitalforge.app/',
    cta: 'Open Models',
  },
  {
    title: 'Configs',
    description:
      'Repository for workflow configurations, analysis inputs, and supporting artifacts used by validation pipelines.',
    href: 'https://configs.digitalforge.app/',
    cta: 'Open Configs',
  },
]

const advancedApps = [
  {
    title: 'Harbor',
    description:
      'Container registry used by DigitalForge workflows to store execution images and analysis environments.',
    href: 'https://harbor.digitalforge.app/',
    cta: 'Open Harbor',
  },
]

async function fetchCount(endpoint, key, field) {
  try {
    const response = await fetch(`${defaults.api_addr}${endpoint}`)
    const data = await response.json()
    stats.value[key] = data[field]
  } catch (error) {
    console.error(`Failed to load ${key}:`, error)
    stats.value[key] = '—'
  }
}

async function loadStats() {
  await Promise.all([
    fetchCount('/views/count_models/', 'models', 'models'),
    fetchCount('/views/count_requirements/', 'requirements', 'requirements'),
    fetchCount('/views/count_threads/', 'threads', 'threads'),
  ])
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="px-6 py-8 space-y-8">

    <rux-container class="w-full">
      <div slot="header">Welcome to DigitalForge</div>
      <div class="space-y-4">
        <p class="text-lg">
          DigitalForge is a model-based engineering platform for developing,
          managing, and validating software-defined systems using SysML v2 models
          and software-defined verification workflows.
        </p>
        <p>
          Engineers use DigitalForge to develop SysML v2 models, build validation
          workflows, collaborate through repositories, and analyze results from
          engineering verification activities.
        </p>
      </div>
    </rux-container>

    <rux-container class="w-full">
      <div slot="header">Platform Applications</div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <rux-card
          v-for="app in primaryApps"
          :key="app.title"
          class="p-5 h-full"
        >
          <div class="space-y-3">
            <div class="text-lg font-semibold">{{ app.title }}</div>
            <p>{{ app.description }}</p>

            <a :href="app.href" style="text-decoration: none;">
              <rux-button>{{ app.cta }}</rux-button>
            </a>

          </div>
        </rux-card>

      </div>
    </rux-container>

    <rux-container class="w-full">
      <div slot="header">What You Can Do in DigitalForge</div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <rux-card class="p-4">
          <div class="font-semibold mb-2">Develop SysML v2 Models</div>
          <p>
            Create and refine system models that define architecture,
            requirements, and verification relationships.
          </p>
        </rux-card>

        <rux-card class="p-4">
          <div class="font-semibold mb-2">Build Engineering Workflows</div>
          <p>
            Develop software-defined validation workflows that evaluate models
            and system behavior.
          </p>
        </rux-card>

        <rux-card class="p-4">
          <div class="font-semibold mb-2">Collaborate Through Git</div>
          <p>
            Manage models, configurations, and workflow inputs using
            version-controlled repositories.
          </p>
        </rux-card>

        <rux-card class="p-4">
          <div class="font-semibold mb-2">Analyze Verification Results</div>
          <p>
            Review requirement threads and validation outputs produced by
            engineering workflows.
          </p>
        </rux-card>

      </div>
    </rux-container>

    <rux-container class="w-full">
      <div slot="header">Platform Snapshot</div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <rux-card class="p-6">
          <div class="text-center space-y-2">
            <div class="text-sm uppercase tracking-wide opacity-75">
              Total Models
            </div>

            <div v-if="stats.models !== null" class="text-4xl font-bold">
              {{ stats.models }}
            </div>

            <div v-else>
              <API_Wait />
            </div>
          </div>
        </rux-card>

        <rux-card class="p-6">
          <div class="text-center space-y-2">
            <div class="text-sm uppercase tracking-wide opacity-75">
              Total Requirements
            </div>

            <div v-if="stats.requirements !== null" class="text-4xl font-bold">
              {{ stats.requirements }}
            </div>

            <div v-else>
              <API_Wait />
            </div>
          </div>
        </rux-card>

        <rux-card class="p-6">
          <div class="text-center space-y-2">
            <div class="text-sm uppercase tracking-wide opacity-75">
              Total Threads
            </div>

            <div v-if="stats.threads !== null" class="text-4xl font-bold">
              {{ stats.threads }}
            </div>

            <div v-else>
              <API_Wait />
            </div>
          </div>
        </rux-card>

      </div>
    </rux-container>

    <rux-container class="w-full">
      <div slot="header">Advanced Platform Tools</div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <rux-card
          v-for="app in advancedApps"
          :key="app.title"
          class="p-5 h-full"
        >
          <div class="space-y-3">
            <div class="text-lg font-semibold">{{ app.title }}</div>

            <p>{{ app.description }}</p>

            <a :href="app.href" style="text-decoration: none;">
              <rux-button secondary>{{ app.cta }}</rux-button>
            </a>

          </div>
        </rux-card>

      </div>
    </rux-container>

  </div>
</template>