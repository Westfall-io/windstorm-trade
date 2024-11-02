import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Blank from './views/Blank.vue'
import Artifacts from './views/Artifacts.vue'
import Containers from './views/Containers.vue'
import Model_Commits from './views/Model_Commits.vue'
import Model_Branches from './views/Model_Branches.vue'
import Model_Branch from './views/Model_Branch.vue'
import Threads from './views/Threads.vue'
import Thread from './views/Thread.vue'
import Thread_Executions from './views/Thread_Executions.vue'
import Verifications from './views/Verifications.vue'
import Verification from './views/Verification.vue'
import Requirements from './views/Reqts.vue'
import Requirement from './views/Reqt.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/reqts',
    name: 'Requirements',
    component: Requirements,
  },
  {
    path: '/reqt/:id',
    name: 'Requirement',
    component: Requirement,
  },
  {
    path: '/verifications',
    name: 'Verifications',
    component: Verifications,
  },
  {
    path: '/verification/:id',
    name: 'Verification',
    component: Verification,
  },
  {
    path: '/threads',
    name: 'Threads',
    component: Threads,
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    component: Thread,
  },
  {
    path: '/commits',
    name: 'Commits',
    component: Model_Commits,
  },
  {
    path: '/commits/:id',
    name: 'Branch',
    component: Model_Branch,
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Model_Branches,
  },
  {
    path: '/thread-executions',
    name: 'Thread Executions',
    component: Thread_Executions,
  },
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: Artifacts,
  },
  {
    path: '/containers',
    name: 'Containers',
    component: Containers,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
