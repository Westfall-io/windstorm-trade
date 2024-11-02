<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import API_Wait from '../components/links/API_Wait.vue'

const vs = ref(null);
const branch = ref(null);
const commit = ref(null);
const commit_date = ref(null);
const page = ref(1);
const pages = ref(1);

async function getVs(page) {
  fetch('https://windstorm-api.westfall.io/views/verifications/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      vs.value = data.results;
      branch.value = data.default_branch;
      commit.value = data.commit;
      commit_date.value = data.commit_date;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getVs(page);

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body">
              <div v-if="vs!=null">
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
                      Verifications
                    </div>
                    <rux-table>
                      <rux-table-header>
                          <rux-table-header-row>
                            <rux-table-header-cell>Declared Name</rux-table-header-cell>
                            <rux-table-header-cell>Qualified Name</rux-table-header-cell>
                            <rux-table-header-cell>Linked Actions</rux-table-header-cell>
                            <rux-table-header-cell>Attempted</rux-table-header-cell>
                            <rux-table-header-cell>Verified</rux-table-header-cell>
                          </rux-table-header-row>
                      </rux-table-header>
                      <rux-table-body>
                        <rux-table-row v-for="v in vs" :key="v.id" selected="false">
                            <rux-table-cell :title=v.declaredName>
                              <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                                <router-link :to="{ name: 'Verification', params: { 'id': v.id }}" tag="button">
                                  {{ v.declaredName }}
                                </router-link>
                              </p>
                            </rux-table-cell>
                            <rux-table-cell :title=v.qualifiedName>{{ v.qualifiedName }}</rux-table-cell>
                            <rux-table-cell>{{ v.linkedActions }}</rux-table-cell>
                            <rux-table-cell>
                              <div v-if="v.attempted">
                                <rux-tag status="pass"></rux-tag>
                              </div>
                              <div v-if="v.attempted==false">
                                <rux-tag status="fail"></rux-tag>
                              </div>
                              <div v-if="v.attempted==null">
                                <rux-tag status="unknown"></rux-tag>
                              </div>
                            </rux-table-cell>
                            <rux-table-cell>
                              <div v-if="v.verified">
                                <rux-tag status="pass"></rux-tag>
                              </div>
                              <div v-if="v.verified==false">
                                <rux-tag status="fail"></rux-tag>
                              </div>
                              <div v-if="v.verified==null">
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
