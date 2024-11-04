<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import GoBack from '../components/links/GoBack.vue';
import API_Wait from '../components/links/API_Wait.vue';

import * as defaults from '../constants.tsx'

const route = useRoute();
const id = route.params.id;

const shortName = ref(null);
const declaredName = ref(null);
const qualifiedName = ref(null);
const reqtText = ref(null);
const verifications = ref(null);

const page = ref(1);
const pages = ref(1);

async function getReqt(id) {
  fetch(defaults.api_addr+'/views/requirement/'+id.toString()+'?size=10&page=1')
    .then(response => response.json())
    .then(data => {
      if (data.shortName == null) {
        shortName.value = 'None'
      } else {
        shortName.value = data.shortName;
      }
      declaredName.value=data.declaredName;
      qualifiedName.value=data.qualifiedName;
      qualifiedName.value = qualifiedName.value.replace("::", " > ");
      reqtText.value=data.text;
      verifications.value=data.verifications.results;
    });
}

getReqt(id);

</script>

<template>
  <GoBack />
  <h3 class="text-gray-700 text-3xl font-medium">Requirement Detail</h3>
  <div v-if="verifications">
    <rux-container class="w-full">
      <div class="flex flex-wrap">
        <rux-card class="w-1/4 px-4">
    			<div slot="header" style="display: flex; align-items: center;">
    				<rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
    				Short Name
    			</div>
    			<div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
    				{{ shortName }}
    			</div>
    		</rux-card>
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
      </div><br />
      <div class="flex flex-wrap">
        <rux-card class="w-full px-4">
          <div slot="header" style="display: flex; align-items: center;">
            <rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
            Requirement Text
          </div>
          <div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
            {{ reqtText }}
          </div>
        </rux-card>
      </div>

      <rux-card class="w-full mt-4 px-4">
        <div slot="header" style="display: flex; align-items: center;">
          <rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
          Linked Verifications
        </div>
        <div v-if="verifications" style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
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
              <rux-table-row v-for="v in verifications" :key="v.id" selected="false">
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
                    <div v-else>
                      <rux-tag status="fail"></rux-tag>
                    </div>
                  </rux-table-cell>
                  <rux-table-cell>
                    <div v-if="v.verified">
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
        <div v-else>
          <API_Wait />
        </div>
      </rux-card>
    </rux-container>
  </div>
</template>
