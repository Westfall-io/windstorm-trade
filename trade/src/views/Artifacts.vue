<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

const artifacts = ref(null);
const pulled = ref(false);
const page = ref(1);
const pages = ref(1);

const api_addr = ref("https://windstorm-api.digitalforge.app")
const artifact_addr = ref("https://configs.digitalforge.app")

async function getArtifacts(api_addr, page) {
  fetch(api_addr.value+'/views/artifacts/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      pulled.value = true;
      artifacts.value = data.results;
      page.value=data.page;
      pages.value=data.pages;
    });
}
console.log(api_addr.value+'/views/artifacts/?size=10&page='+page.value)
getArtifacts(api_addr, page);

function getCommitLink(artifact_addr, path, branch) {
  return artifact_addr+'/' + path + '/src/branch/' + branch
}

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body">
              <div v-if="pulled">
                <rux-card class="w-full">
                  <div slot="header" style="display: flex; align-items: center;">
                    Artifacts
                  </div>
                  <rux-table>
                    <rux-table-header>
                        <rux-table-header-row>
                          <rux-table-header-cell>Name</rux-table-header-cell>
                          <rux-table-header-cell>Default Branch</rux-table-header-cell>
                          <rux-table-header-cell>Git Link</rux-table-header-cell>
                          <rux-table-header-cell>Date Updated</rux-table-header-cell>
                        </rux-table-header-row>
                    </rux-table-header>
                    <rux-table-body>
                      <rux-table-row v-for="a in artifacts" :key="artifacts.id" selected="false">
                          <rux-table-cell>{{ a.full_name }}</rux-table-cell>
                          <rux-table-cell>{{ a.default_branch }}</rux-table-cell>
                          <rux-table-cell>
                            <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                              <a :href="getCommitLink(artifact_addr, a.full_name, a.default_branch)">
                                <rux-button size="small">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    class="w-10 h-10"
                                    fill="none"
                                  >
                                    <title>Artifacts</title>
                                    <path fill="currentColor" fill-rule="evenodd" d="M13.17 2c.53 0 1.04.21 1.42.59l4.82 4.83c.38.37.59.88.59 1.41V20c0 1.1-.9 2-2 2H5.99C4.89 22 4 21.1 4 20V4c0-1.1.9-2 2-2h7.17ZM9 18h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1s.45 1 1 1Zm6-4H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1ZM13 3.5V8c0 .55.45 1 1 1h4.5L13 3.5Z"></path>
                                  </svg>
                                </rux-button>
                              </a>
                            </p>
                          </rux-table-cell>
                          <rux-table-cell>{{ a.date_updated }}</rux-table-cell>
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
