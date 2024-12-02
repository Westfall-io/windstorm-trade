<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

import * as defaults from '../constants.tsx'

const reqts = ref(null);
const branch = ref(null);
const commit = ref(null);
const commit_date = ref(null);
const page = ref(1);
const pages = ref(1);
const filter = ref(false);
const refreshKey = ref(0);

async function getReqts(page, filter) {
  fetch(defaults.api_addr+'/views/requirements/?size=25&page='+page.value)
    .then(response => response.json())
    .then(data => {
      reqts.value = data.results;
      branch.value = data.default_branch;
      commit.value = data.commit;
      commit_date.value = data.commit_date;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getReqts(page, filter);

function refreshData() {
  if (filter) {
    filter = false;
  } else {
    filter = true;
  }
  getReqts(page, filter);
  refreshKey++;
}

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body" :key="refreshKey">
              <div v-if="reqts!=null">
                <div v-if="branch==null">
                  <div class="wrapper wrapper--small">
                    <rux-notification open="" small="" status="critical">
                        No models were found in the database.
                    </rux-notification>
                  </div>
                </div>
                <div v-else>
                  <div class="flex">
                    <rux-card class="flex-1 pb-4">
                      <p class="text-center">
                        Branch:
                        <router-link to="/branches" tag="button">
                          {{ branch }}
                        </router-link>
                      </p>
                    </rux-card>
                    <rux-card class="flex-2 pb-4 px-3">
                      <p class="text-center">
                        Commit: {{ commit }}
                      </p>
                    </rux-card>
                    <rux-card class="flex-1 pb-4">
                      <p class="text-center">
                        Updated: {{ commit_date }}
                      </p>
                    </rux-card>
                  </div>
                  <rux-card class="w-full">
                    <div slot="header" style="display: flex; align-items: center;">
                      <rux-button @click="refreshData">
                          <rux-icon icon="filter-list" size="extra-small"></rux-icon>
                      </rux-button>
                      Requirements
                    </div>
                    <rux-table>
                      <rux-table-header>
                          <rux-table-header-row>
                            <rux-table-header-cell>Short Name</rux-table-header-cell>
                            <rux-table-header-cell>Declared Name</rux-table-header-cell>
                            <rux-table-header-cell>Qualified Name</rux-table-header-cell>
                            <rux-table-header-cell>Linked Verifications</rux-table-header-cell>
                            <rux-table-header-cell>Status</rux-table-header-cell>
                          </rux-table-header-row>
                      </rux-table-header>
                      <rux-table-body>
                        <rux-table-row v-for="reqt in reqts" :key="reqts.id" selected="false">
                            <rux-table-cell>{{ reqt.shortName }}</rux-table-cell>
                            <rux-table-cell>
                              <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                                <router-link :to="{ name: 'Requirement', params: { 'id': reqt.id }}" tag="button">
                                  {{ reqt.declaredName }}
                                </router-link>
                              </p>
                            </rux-table-cell>
                            <rux-table-cell>{{ reqt.qualifiedName }}</rux-table-cell>
                            <rux-table-cell>{{ reqt.linkedVerifications }}</rux-table-cell>
                            <rux-table-cell>
                              <div v-if="reqt.verified">
                                <rux-tag status="pass"></rux-tag>
                              </div>
                              <div v-else>
                                <rux-tag status="fail"></rux-tag>
                              </div>
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
