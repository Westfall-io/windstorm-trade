<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import GoBack from '../components/links/GoBack.vue';
import API_Wait from '../components/links/API_Wait.vue';

const route = useRoute();
const id = route.params.id;

const tes = ref(null);
const verf_name = ref(null);
const verf_id = ref(null);

const page = ref(1);
const pages = ref(1);

async function getTES(id) {
  fetch('https://windstorm-api.westfall.io/views/thread/'+id.toString()+'?size=10&page=1')
    .then(response => response.json())
    .then(data => {
      tes.value = data.results;
      verf_name.value = data.verification.declaredName;
      verf_id.value = data.verification.id;
    });
}

getTES(id);

</script>

<template>
  <GoBack />
  <h3 class="text-gray-700 text-3xl font-medium">Thread Detail</h3>
  <div v-if="tes">
    <rux-container class="w-full">
      <div class="flex flex-wrap">
        <rux-card class="w-1/4 px-4">
    			<div slot="header" style="display: flex; align-items: center;">
    				<rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
    				Verification
    			</div>
    			<div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
            <router-link :to="{ name: 'Verification', params: { 'id': verf_id }}" tag="button">
              {{ verf_name }}
            </router-link>
    			</div>
    		</rux-card>
      </div><br />
      <rux-card class="w-full mt-4 px-4">
        <div slot="header" style="display: flex; align-items: center;">
          <rux-icon icon="star" size="26px" style="margin-right: 10px;"></rux-icon>
          Thread Executions
        </div>
        <div style="padding-top: 20px; padding-bottom: 20px; display: flex; justify-content: center;">
          <rux-table>
            <rux-table-header>
                <rux-table-header-row>
                  <rux-table-header-cell>Name</rux-table-header-cell>
                  <rux-table-header-cell>State</rux-table-header-cell>
                  <rux-table-header-cell>Changed</rux-table-header-cell>
                  <rux-table-header-cell>Date Created</rux-table-header-cell>
                  <rux-table-header-cell>Date Updated</rux-table-header-cell>
                  <rux-table-header-cell>Inputs</rux-table-header-cell>
                  <rux-table-header-cell>Outputs</rux-table-header-cell>
                </rux-table-header-row>
            </rux-table-header>
            <rux-table-body>
              <rux-table-row v-for="te in tes" :key="te.id" selected="false">
                <rux-table-cell :title=te.name style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ te.name }}</rux-table-cell>
                <rux-table-cell>
                  <div v-if="te.state=='windstorm'">
                    <rux-tag style="background: #003655; border-color: #2B659B;">Initiated</rux-tag>
                  </div>
                  <div v-else-if="te.state=='windrunner_1'">
                    <rux-tag style="background: #003655; border-color: #2B659B;">Input Build</rux-tag>
                  </div>
                  <div v-else-if="te.state=='windrunner_2'">
                    <rux-tag style="background: #003655; border-color: #2B659B;">Running</rux-tag>
                  </div>
                  <div v-else-if="te.state=='windchest_1'">
                    <rux-tag style="background: #003655; border-color: #2B659B;">Completing</rux-tag>
                  </div>
                  <div v-else-if="te.state=='windchest_2'">
                    <rux-tag status="pass"></rux-tag>
                  </div>
                  <div v-else>
                    <rux-tag status="unknown">
                    </rux-tag>
                  </div>
                </rux-table-cell>
                <rux-table-cell :title=te.source style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ te.source }}</rux-table-cell>
                <rux-table-cell :title=te.date_created style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ te.date_created }}</rux-table-cell>
                <rux-table-cell :title=te.date_updated style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">{{ te.date_updated }}</rux-table-cell>
                <rux-table-cell>
                  <div v-if="te.inputs">
                    <a :href=te.inputs download>Link</a>
                  </div>
                </rux-table-cell>
                <rux-table-cell>
                  <div v-if="te.outputs">
                    <a :href=te.outputs download>Link</a>
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
