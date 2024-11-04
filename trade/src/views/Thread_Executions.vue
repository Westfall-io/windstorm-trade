<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API_Wait from '../components/links/API_Wait.vue';

import * as defaults from '../constants.tsx'

const threads = ref(null);
const page = ref(1);
const pages = ref(1);

async function getTEs(page) {
  fetch(defaults.api_addr + '/views/thread_executions/?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      threads.value = data.results;
      page.value=data.page;
      pages.value=data.pages;
    });
}

getTEs(page);

function getContainerLink(project_id, image) {
  return defaults.harbor_addr+'/harbor/projects/' + project_id + 'repositories/' + image + '/artifacts-tab'
}

function getCommitLink(path, branch) {
  return defaults.artifact_addr + '/' + path + '/commit/' + branch
}

</script>

<template>
    <rux-container>
      <div class="card m-3">
          <div class="card-body">
              <div v-if="threads!=null">
                <rux-card class="w-full">
                  <div slot="header" style="display: flex; align-items: center;">
                    Thread Executions
                  </div>
                  <rux-table>
                    <rux-table-header>
                        <rux-table-header-row>
                          <rux-table-header-cell>Thread</rux-table-header-cell>
                          <rux-table-header-cell>Source</rux-table-header-cell>
                          <rux-table-header-cell>Model Branch</rux-table-header-cell>
                          <rux-table-header-cell>Model Commit</rux-table-header-cell>
                          <rux-table-header-cell>Container Image</rux-table-header-cell>
                          <rux-table-header-cell>Container Digest</rux-table-header-cell>
                          <rux-table-header-cell>Artifact Commit</rux-table-header-cell>
                          <rux-table-header-cell>Status</rux-table-header-cell>
                          <rux-table-header-cell>Last Update</rux-table-header-cell>
                        </rux-table-header-row>
                    </rux-table-header>
                    <rux-table-body>
                      <rux-table-row v-for="t in threads" :key="t.id" selected="false">
                        <rux-table-cell :title=t.thread.declaredName style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">
                          <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                            <router-link :to="{ name: 'Thread', params: { 'id': t.thread.id }}" tag="button">
                              {{ t.thread.declaredName }}
                            </router-link>
                          </p>
                        </rux-table-cell>
                        <rux-table-cell :title=t.source style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ t.source }}</rux-table-cell>
                        <rux-table-cell :title=t.model.branch style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ t.model.branch }}</rux-table-cell>
                        <rux-table-cell :title=t.model.commit style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ t.model.commit }}</rux-table-cell>
                        <rux-table-cell :title=t.container.image style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ t.container.image }}</rux-table-cell>
                        <rux-table-cell :title=t.container.digest style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">{{t.container.digest}}</rux-table-cell>
                        <rux-table-cell :title=t.artifact.commit style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">{{t.artifact.commit}}</rux-table-cell>
                        <rux-table-cell>
                          <div v-if="t.state=='windstorm'">
                            <rux-tag style="background: #003655; border-color: #2B659B;">Initiated</rux-tag>
                          </div>
                          <div v-else-if="t.state=='windrunner_1'">
                            <rux-tag style="background: #003655; border-color: #2B659B;">Input Build</rux-tag>
                          </div>
                          <div v-else-if="t.state=='windrunner_2'">
                            <rux-tag style="background: #003655; border-color: #2B659B;">Running</rux-tag>
                          </div>
                          <div v-else-if="t.state=='windchest_1'">
                            <rux-tag style="background: #003655; border-color: #2B659B;">Completing</rux-tag>
                          </div>
                          <div v-else-if="t.state=='windchest_2'">
                            <rux-tag status="pass"></rux-tag>
                          </div>
                          <div v-else>
                            <rux-tag status="unknown">
                            </rux-tag>
                          </div>
                        </rux-table-cell>
                        <rux-table-cell :title=t.date_updated style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">{{t.date_updated}}</rux-table-cell>
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
