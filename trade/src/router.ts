import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from './auth/keycloak'

import Landing from './views/Landing.vue'
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
    name: 'Landing',
    component: Landing,
    meta: { public: true, layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/reqts',
    name: 'Requirements',
    component: Requirements,
    meta: { requiresAuth: true },
  },
  {
    path: '/reqt/:id',
    name: 'Requirement',
    component: Requirement,
    meta: { requiresAuth: true },
  },
  {
    path: '/verifications',
    name: 'Verifications',
    component: Verifications,
    meta: { requiresAuth: true },
  },
  {
    path: '/verification/:id',
    name: 'Verification',
    component: Verification,
    meta: { requiresAuth: true },
  },
  {
    path: '/threads',
    name: 'Threads',
    component: Threads,
    meta: { requiresAuth: true },
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    component: Thread,
    meta: { requiresAuth: true },
  },
  {
    path: '/commits',
    name: 'Commits',
    component: Model_Commits,
    meta: { requiresAuth: true },
  },
  {
    path: '/commits/:id',
    name: 'Branch',
    component: Model_Branch,
    meta: { requiresAuth: true },
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Model_Branches,
    meta: { requiresAuth: true },
  },
  {
    path: '/thread-executions',
    name: 'Thread Executions',
    component: Thread_Executions,
    meta: { requiresAuth: true },
  },
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: Artifacts,
    meta: { requiresAuth: true },
  },
  {
    path: '/containers',
    name: 'Containers',
    component: Containers,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth/callback',
    name: 'Auth Callback',
    component: Blank,
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.public) return true
  if (!to.meta.requiresAuth) return true
  if (keycloak.authenticated) return true

  return {
    path: '/',
    query: { login: 'required' },
  }
})

export default router