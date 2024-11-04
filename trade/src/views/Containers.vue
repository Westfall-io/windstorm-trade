<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

const containers = ref(null);
const pulled = ref(false);
const page = ref(1);
const pages = ref(1);

const api_addr = ref("https://windstorm-api.digitalforge.app")
const artifact_addr = ref("https://configs.digitalforge.app")

async function getContainers(page) {
  fetch('https://windstorm-api.westfall.io/views/containers/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      pulled.value = true;
      containers.value = data.results;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getContainers(page);

function getContainerLink(project_id, image) {
  return 'https://core.harbor.domain/harbor/projects/' + project_id + 'repositories/' + image + '/artifacts-tab'
}

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body">
              <div v-if="pulled">
                <rux-card class="w-full">
                  <div slot="header" style="display: flex; align-items: center;">
                    Containers
                  </div>
                  <rux-table>
                    <rux-table-header>
                        <rux-table-header-row>
                          <rux-table-header-cell>Project</rux-table-header-cell>
                          <rux-table-header-cell>Image</rux-table-header-cell>
                          <rux-table-header-cell>Most Recent Tag</rux-table-header-cell>
                          <rux-table-header-cell>Date Updated</rux-table-header-cell>
                          <rux-table-header-cell>Container Link</rux-table-header-cell>
                        </rux-table-header-row>
                    </rux-table-header>
                    <rux-table-body>
                      <rux-table-row v-for="c in containers" :key="containers.id" selected="false">
                          <rux-table-cell>{{ c.project }}</rux-table-cell>
                          <rux-table-cell>{{ c.image }}</rux-table-cell>
                          <rux-table-cell>{{ c.tag }}</rux-table-cell>
                          <rux-table-cell>{{ c.date_updated }}</rux-table-cell>
                          <rux-table-cell>
                            <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                              <a :href="getContainerLink(c.project_id, c.image)">
                                <rux-button size="small">
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
                                </rux-button>
                              </a>
                            </p>
                          </rux-table-cell>
                      </rux-table-row>
                    </rux-table-body>
                  </rux-table>
                </rux-card>
              </div>
              <div v-else>
                <API_Wait />
              </div>
          </div>
      </div>
    </rux-container>
</template>
