import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

// Import Astro's base styles
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'

// Import keycloak
//import { vueKeycloak } from '@josempgon/vue-keycloak'

import { RuxStatus } from '@astrouxds/astro-web-components/dist/components/rux-status'
customElements.define('rux-status', RuxStatus)
import { RuxClassificationMarking } from '@astrouxds/astro-web-components/dist/components/rux-classification-marking'
customElements.define('rux-classification-marking', RuxClassificationMarking)
import { RuxContainer } from '@astrouxds/astro-web-components/dist/components/rux-container'
customElements.define('rux-container', RuxContainer)
import { RuxGlobalStatusBar } from '@astrouxds/astro-web-components/dist/components/rux-global-status-bar'
customElements.define('rux-global-status-bar', RuxGlobalStatusBar)
import { RuxIndeterminateProgress } from '@astrouxds/astro-web-components/dist/components/rux-indeterminate-progress.js'
customElements.define('rux-indeterminate-progress', RuxIndeterminateProgress)
import { RuxCard } from '@astrouxds/astro-web-components/dist/components/rux-card'
customElements.define('rux-card', RuxCard)
import { RuxTable } from '@astrouxds/astro-web-components/dist/components/rux-table'
import { RuxTableHeader } from '@astrouxds/astro-web-components/dist/components/rux-table-header'
import { RuxTableHeaderRow } from '@astrouxds/astro-web-components/dist/components/rux-table-header-row'
import { RuxTableHeaderCell } from '@astrouxds/astro-web-components/dist/components/rux-table-header-cell'
import { RuxTableBody } from '@astrouxds/astro-web-components/dist/components/rux-table-body'
import { RuxTableRow } from '@astrouxds/astro-web-components/dist/components/rux-table-row'
import { RuxTableCell } from '@astrouxds/astro-web-components/dist/components/rux-table-cell'

customElements.define('rux-table', RuxTable)
customElements.define('rux-table-header', RuxTableHeader)
customElements.define('rux-table-header-row', RuxTableHeaderRow)
customElements.define('rux-table-header-cell', RuxTableHeaderCell)
customElements.define('rux-table-body', RuxTableBody)
customElements.define('rux-table-row', RuxTableRow)
customElements.define('rux-table-cell', RuxTableCell)
import { RuxTag } from '@astrouxds/astro-web-components/dist/components/rux-tag.js'
customElements.define('rux-tag', RuxTag)

import { RuxIcon } from '@astrouxds/astro-web-components/dist/components/rux-icon'
import { RuxIconClose } from '@astrouxds/astro-web-components/dist/components/rux-icon-close'
customElements.define('rux-icon', RuxIcon)
customElements.define('rux-icon-close', RuxIconClose)
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
customElements.define('rux-button', RuxButton)

import { RuxNotification } from '@astrouxds/astro-web-components/dist/components/rux-notification'
customElements.define('rux-notification', RuxNotification)

const app = createApp(App)

//await vueKeycloak.install(app, {
//  config: {
//    url: process.env.VUE_APP_KEYCLOAK_ADDR+'/auth',
//    realm: process.env.VUE_APP_KEYCLOAK_REALM,
//    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
//  }
//})

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.mount('#app')
