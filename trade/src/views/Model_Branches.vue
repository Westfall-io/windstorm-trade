<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GoBack from '../components/links/GoBack.vue';
import API_Wait from '../components/links/API_Wait.vue';

const branches = ref(null);
const defbranch = ref(null);
const model_path = ref(null)
const page = ref(1);
const pages = ref(1);

async function getBranches(page) {
  fetch('https://windstorm-api.westfall.io/views/model_branches/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      branches.value = data.results;
      defbranch.value = data.default_branch;
      model_path.value = 'https://models.westfall.io/'+data.model_path;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getBranches(page);

function getBranchLink(model_path, branch) {
  return model_path + '/src/branch/' + branch
}

</script>

<template>
    <GoBack />
    <h3 class="text-gray-700 text-3xl font-medium">Model Branches</h3>
    <rux-container>
      <div class="card m-3">
          <div class="card-body">
              <div v-if="branches">
                <rux-table>
                  <rux-table-header>
                      <rux-table-header-row>
                        <rux-table-header-cell>Branch</rux-table-header-cell>
                        <rux-table-header-cell>Latest Commit</rux-table-header-cell>
                        <rux-table-header-cell>Branch Link</rux-table-header-cell>
                        <rux-table-header-cell>Updated Date</rux-table-header-cell>
                      </rux-table-header-row>
                  </rux-table-header>
                  <rux-table-body>
                    <rux-table-row v-for="b in branches" :key="branches.id" selected="false">
                        <rux-table-cell>
                          <div class="flex" v-if="b.branch==defbranch">
                            <router-link :to="{ name: 'Branch', params: { 'id': b.branch }}" tag="button">
                              <svg
                                class="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <title>Default Branch</title>
                                <path fill="currentColor" d="m12 15.067 3.28 2.386c.52.387 1.227-.133 1.027-.746l-1.254-3.854 3.24-2.306c.534-.374.267-1.214-.386-1.214h-3.974L12.64 5.307c-.2-.614-1.067-.614-1.267 0l-1.306 4.026H6.093c-.653 0-.92.84-.386 1.214l3.24 2.306-1.254 3.854c-.2.613.507 1.12 1.027.746L12 15.067Z">
                                </path>
                              </svg>
                              {{ b.branch }}
                            </router-link>
                          </div>
                          <div v-else>
                            <router-link :to="{ name: 'Branch', params: { 'id': b.branch }}" tag="button">
                              {{ b.branch }}
                            </router-link>
                          </div>
                        </rux-table-cell>
                        <rux-table-cell>
                          {{ b.commit }}
                        </rux-table-cell>
                        <rux-table-cell>
                          <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                            <a :href="getBranchLink(model_path, b.branch)">
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
                          {{b.date}}
                        </rux-table-cell>
                    </rux-table-row>
                  </rux-table-body>
                </rux-table>
              </div>
              <div v-else>
                <API_Wait />
              </div>
          </div>
      </div>
    </rux-container>
</template>
