<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

import * as defaults from '../constants.tsx'

const commits = ref(null);
const pulled = ref(false);
const branch = ref(null);
const model_path = ref(null)
const page = ref(1);
const pages = ref(1);

async function getCommits(page) {
  fetch(defaults.api_addr+'/views/model_commits/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      pulled.value = true;
      commits.value = data.results;
      branch.value = data.default_branch;
      model_path.value = defaults.model_addr+data.model_path;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getCommits(page);

function getCommitLink(model_path, commit) {
  return model_path + '/commit/' + commit
}

</script>

<template>
  <rux-container>
    <div class="card m-3">
        <div class="card-body">
            <div v-if="pulled">
              <div v-if="branch==null">
                <div class="wrapper wrapper--small">
                  <rux-notification open="" small="" status="critical">
                      No models were found in the database.
                  </rux-notification>
                </div>
              </div>
              <div v-else>
                <rux-card class="w-1/4 pb-4">
                  <p class="text-center">
                    Branch:
                    <router-link to="/branches" tag="button">
                      {{ branch }}
                    </router-link>
                  </p>
                </rux-card>
                <rux-card class="w-full">
                  <div slot="header" style="display: flex; align-items: center;">
                    Model Commits
                  </div>
                  <rux-table>
                    <rux-table-header>
                        <rux-table-header-row>
                          <rux-table-header-cell>Commit Hash</rux-table-header-cell>
                          <rux-table-header-cell>Processed</rux-table-header-cell>
                          <rux-table-header-cell>Commit Link</rux-table-header-cell>
                          <rux-table-header-cell>Commit Date</rux-table-header-cell>
                        </rux-table-header-row>
                    </rux-table-header>
                    <rux-table-body>
                      <rux-table-row v-for="c in commits" :key="commits.id" selected="false">
                          <rux-table-cell>{{ c.commit }}</rux-table-cell>
                          <rux-table-cell>
                            <div v-if="c.processed">
                              <rux-tag status="pass"></rux-tag>
                            </div>
                            <div v-else>
                              <rux-tag style="background: #003655; border-color: #2B659B;">Initiated</rux-tag>
                            </div>
                          </rux-table-cell>
                          <rux-table-cell>
                            <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                              <a :href="getCommitLink(model_path, c.commit)">
                                <rux-button size="small">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    class="w-4 h-4"
                                    fill="none"
                                  >
                                    <path fill="currentColor" d="M480-280q-73 0-127.5-45.5T284-440H80v-80h204q14-69 68.5-114.5T480-680q73 0 127.5 45.5T676-520h204v80H676q-14 69-68.5 114.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
                                  </svg>
                                </rux-button>
                              </a>
                            </p>
                          </rux-table-cell>
                          <rux-table-cell>
                            {{c.date}}
                          </rux-table-cell>
                      </rux-table-row>
                    </rux-table-body>
                  </rux-table>
                </rux-card>
              </div>
            </div>
            <div v-else>
              <API_Wait />
            </div>
        </div>
    </div>
  </rux-container>
</template>
