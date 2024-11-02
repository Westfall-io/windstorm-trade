<script setup>
import { ref } from 'vue'
import API_Wait from '../components/links/API_Wait.vue'

const models = ref(null);
const requirements = ref(null);
const threads = ref(null);

async function getModels() {
  fetch('https://windstorm-api.westfall.io/views/count_models/')
    .then(response => response.json())
    .then(data => {
      models.value=data.models;
    });
}

async function getReqts() {
  fetch('https://windstorm-api.westfall.io/views/count_requirements/')
    .then(response => response.json())
    .then(data => {
      requirements.value=data.requirements;
    });
}

async function getThreads() {
  fetch('https://windstorm-api.westfall.io/views/count_threads/')
    .then(response => response.json())
    .then(data => {
      threads.value=data.threads;
    });
}

getModels();
getReqts();
getThreads();

</script>

<template>
  <div class="flex flex-wrap -mx-6 pt-6">
    <rux-container class="px-6 pb-4">
      <div slot="header">Welcome to DigitalForge</div>
      Digitalforge is an app of apps designed to produce continuous requirement
      validation for software defined systems via the SysMLv2 standard. The
      following links should help navigate to other applications required to
      setup or build the model or continuous verification.
      <br />
      <a href="https://jupyter.westfall.io/" style="text-decoration: none;">JupyterHub -- Model Editing</a><br />
      <a href="https://models.westfall.io/" style="text-decoration: none;">Model Git -- Model Repository</a><br />
      <a href="https://artifacts.westfall.io/" style="text-decoration: none;">Artifact Git -- Artifact Repository</a><br />
      <a href="https://core.harbor.domain/" style="text-decoration: none;">Harbor -- Container Registry</a><br />
      <a href="https://storage.westfall.io/" style="text-decoration: none;">Minio -- Verification Output Artifact Storage</a>
    </rux-container>
    <br />
    <rux-container class="w-full px-6">
      <div class="flex flex-wrap">
        <rux-card class="px-6 w-1/4">
      		<div slot="header" class="text-center">Total Models</div>
          <div v-if="models!=null">
            <p class="text-center">
              {{ models }}
            </p>
          </div>
          <div v-else>
            <API_Wait />
          </div>
        </rux-card>
        <rux-card class="px-6 w-1/4">
      		<div slot="header" class="text-center">Total Requirements</div>
          <div v-if="requirements!=null">
            <p class="text-center">
              {{ requirements }}
            </p>
          </div>
          <div v-else>
            <API_Wait />
          </div>
        </rux-card>
        <rux-card class="px-6 w-1/4">
      		<div slot="header" class="text-center">Total Threads</div>
          <div v-if="threads!=null">
            <p class="text-center">
              {{ threads }}
            </p>
          </div>
          <div v-else>
            <API_Wait />
          </div>
        </rux-card>
      </div>
    </rux-container>
  </div>
</template>
