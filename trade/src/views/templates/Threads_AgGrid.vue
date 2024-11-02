<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '@astrouxds/ag-grid-theme/dist/main.css';
import { AgGridVue } from "ag-grid-vue3";
import API_Wait from '../components/links/API_Wait.vue';

const page = ref(1);
const pages = ref(1);
const rowData2 = [];

async function getThreads(page) {
  fetch('https://windstorm-api.westfall.io/views/threads/main?size=10&page='+page.value)
    .then(response => response.json())
    .then(data => {
      page.value=data.page;
      pages.value=data.pages;
      data.results.forEach( async (result) => {
        rowData2.push({
          declaredName: result.declaredName,
          qualifiedName: result.qualifiedName,
          container: result.container,
          artifact: result.artifact,
          valid: result.valid
        });
      gridApi.value.setRowData(rowData2);

      });
    });
}

const gridApi = ref();
const gridColumnApi = ref();

const onGridReady = (params) => {
  gridApi.value = params.api;
  getThreads(page);
  gridColumnApi.value = params.columnApi;
};

const columnDefs2 = ref([
  { headerName: 'Declared Name', field: 'declaredName',
    flex: 2, resizable: true,
    tooltipField: 'declaredName'},
  { headerName: 'Qualified Name', field: 'qualifiedName',
    flex: 5, resizable: true,
    tooltipField: 'qualifiedName'},
  { headerName: 'Container', field: 'container',
    flex: 3, resizable: true,
    tooltipField: 'container'},
  { headerName: 'Artifact', field: 'artifact',
    flex: 3, resizable: true,
    tooltipField: 'artifact'},
  { headerName: 'Valid', field: 'valid',
    flex: 2, resizable: true,
    tooltipField: 'valid',
    cellRenderer: params => {
        // put the value in bold
        if (params.value) {
          return '<rux-tag status="pass"></rux-tag>';
        } else {
          return '<rux-tag status="fail"></rux-tag>';
        }


    }
  },
]);
</script>

<template>
    <h3 class="text-gray-700 text-3xl font-medium">Threads</h3>
    <div class="px-3 py-2">
        <ag-grid-vue
        id="myGrid"
        style="width: 100%; height: 600px"
        class="ag-theme-astro"
        :columnDefs="columnDefs2"
        @grid-ready="onGridReady"
        :rowData="rowData2"></ag-grid-vue>
    </div>
</template>
