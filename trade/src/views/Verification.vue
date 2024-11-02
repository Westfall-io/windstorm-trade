<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import GoBack from '../components/links/GoBack.vue';
import API_Wait from '../components/links/API_Wait.vue';

const route = useRoute();
const id = route.params.id;

const declaredName = ref(null);
const qualifiedName = ref(null);

const reqt_declaredName = ref(null);
const reqt_qualifiedName = ref(null);
const reqt_id = ref(null);

const actions = ref(null);

const page = ref(1);
const pages = ref(1);

async function getV(id) {
  fetch('https://windstorm-api.westfall.io/views/verification/'+id.toString()+'?size=10&page=1')
    .then(response => response.json())
    .then(data => {
      declaredName.value=data.declaredName;
      qualifiedName.value=data.qualifiedName;
      qualifiedName.value = qualifiedName.value.replace("::", ":: ");
      reqt_declaredName.value = data.requirement.declaredName;
      reqt_qualifiedName.value = data.requirement.qualifiedName;
      reqt_qualifiedName.value = reqt_qualifiedName.value.replace("::", ":: ");
      reqt_id.value = data.requirement.id;
      actions.value=data.actions.results;
    });
}

getV(id);

</script>

<template>
  <GoBack />
  <h3 class="text-gray-700 text-3xl font-medium">Verification Detail</h3>
  <div v-if="actions">
    <rux-container class="w-full">
      <div class="flex flex-wrap">
        <rux-card class="w-1/4 px-4">
    			<div slot="header" style="display: flex; align-items: center;">
    				<rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
    				Declared Name
    			</div>
    			<div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
    				{{ declaredName }}
    			</div>
    		</rux-card>
        <rux-card class="w-1/4 px-4">
          <div slot="header" style="display: flex; align-items: center;">
            <rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
            Qualified Name
          </div>
          <div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
            {{ qualifiedName }}
          </div>
        </rux-card>
        <rux-card class="w-1/4 px-4">
    			<div slot="header" style="display: flex; align-items: center;">
    				<rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
    				Requirement Declared Name
    			</div>
    			<div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
            <router-link :to="{ name: 'Requirement', params: { 'id': reqt_id }}" tag="button">
              {{ reqt_declaredName }}
            </router-link>
    			</div>
    		</rux-card>
      </div><br />
      <rux-card class="w-full mt-4 px-4">
        <div slot="header" style="display: flex; align-items: center;">
          <rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
          Linked Threads
        </div>
        <div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
          <rux-table>
            <rux-table-header>
                <rux-table-header-row>
                  <rux-table-header-cell>Declared Name</rux-table-header-cell>
                  <rux-table-header-cell>Qualified Name</rux-table-header-cell>
                  <rux-table-header-cell>Container</rux-table-header-cell>
                  <rux-table-header-cell>Artifact</rux-table-header-cell>
                  <rux-table-header-cell>Valid</rux-table-header-cell>
                </rux-table-header-row>
            </rux-table-header>
            <rux-table-body>
              <rux-table-row v-for="t in actions" :key="t.id" selected="false">
                  <rux-table-cell :title=t.declaredName style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">
                    <p class="text-indigo-600 hover:text-indigo-900 whitespace-nowrap">
                      <router-link :to="{ name: 'Thread', params: { 'id': t.id }}" tag="button">
                        {{ t.declaredName }}
                      </router-link>
                    </p>
                  </rux-table-cell>
                  <rux-table-cell :title=t.qualifiedName style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ t.qualifiedName }}</rux-table-cell>
                  <rux-table-cell :title=t.container style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">
                    <div v-if=t.container_valid>
                      <a :href=t.container>
                        <rux-button size="small">
                          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Container</title>
                            <path fill="currentColor" fill-rule="evenodd" d="m12.68 2.245.162.071 8 4c.588.295.977.873 1.033 1.52l.007.164v8c0 .658-.343 1.264-.897 1.604l-.143.08-8 4a1.883 1.883 0 0 1-1.522.071l-.162-.071-8-4a1.882 1.882 0 0 1-1.033-1.52L2.118 16V8c0-.658.343-1.264.897-1.604l.143-.08.27-.136a1 1 0 0 1 .259-.13l7.471-3.734a1.882 1.882 0 0 1 1.356-.127l.166.056ZM4 8.179V16l7 3.5v-6.946L4 8.179Zm9 4.439 7-3.5V16l-7 3.5v-6.882ZM18.5 15a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM6 15.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1    0ZM16.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm-8.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM9.5 13a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm5.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 4 5.937 7.03l6.116 3.824 6.828-3.413L12 4Zm.5 5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 7a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm.5-1.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z">
                            </path>
                          </svg>
                        </rux-button>
                      </a>
                    </div>
                    <div v-else>
                      <rux-button size="small" disabled=true>
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <title>Container</title>
                          <path fill="currentColor" fill-rule="evenodd" d="m12.68 2.245.162.071 8 4c.588.295.977.873 1.033 1.52l.007.164v8c0 .658-.343 1.264-.897 1.604l-.143.08-8 4a1.883 1.883 0 0 1-1.522.071l-.162-.071-8-4a1.882 1.882 0 0 1-1.033-1.52L2.118 16V8c0-.658.343-1.264.897-1.604l.143-.08.27-.136a1 1 0 0 1 .259-.13l7.471-3.734a1.882 1.882 0 0 1 1.356-.127l.166.056ZM4 8.179V16l7 3.5v-6.946L4 8.179Zm9 4.439 7-3.5V16l-7 3.5v-6.882ZM18.5 15a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1ZM6 15.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1    0ZM16.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm-8.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM9.5 13a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm5.5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 4 5.937 7.03l6.116 3.824 6.828-3.413L12 4Zm.5 5.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0ZM12 7a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm.5-1.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z">
                          </path>
                        </svg>
                      </rux-button>
                    </div>
                  </rux-table-cell>
                  <rux-table-cell :title=t.artifact style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; word-wrap: break-word;">{{t.artifact}}</rux-table-cell>
                  <rux-table-cell>
                    <div v-if="t.valid">
                      <rux-tag status="pass"></rux-tag>
                    </div>
                    <div v-else>
                      <rux-tag status="fail"></rux-tag>
                    </div>
                  </rux-table-cell>
              </rux-table-row>
            </rux-table-body>
          </rux-table>
        </div>
      </rux-card>
    </rux-container>
  </div>
</template>
