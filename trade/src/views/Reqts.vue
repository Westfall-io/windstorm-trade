<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

import * as defaults from '../constants.tsx'

var reqts = ref(null);
var branch = ref(null);
var commit = ref(null);
var commit_date = ref(null);
var page = ref(1);
var pages = ref(1);
var filter = ref(false);
var refreshKey = ref(1);

async function getReqts(page) {
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

getReqts(page);

function refreshData(refreshKey, page) {
  console.log('Pushed')
  refreshKey.value++;
  getReqts(page);
}

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body" :key=refreshKey>
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
                      <div>
                        <rux-button size="small" @click="refreshData(refreshKey, page.value)">
                          <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"><path d="M3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7ZM11 18H13C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16H11C10.45 16 10 16.45 10 17C10 17.55 10.45 18 11 18ZM17 13H7C6.45 13 6 12.55 6 12C6 11.45 6.45 11 7 11H17C17.55 11 18 11.45 18 12C18 12.55 17.55 13 17 13Z" fill="currentColor"></path></svg>
                        </rux-button>
                      </div>
                      <div class="pl-2">
                        Requirements
                      </div>
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
