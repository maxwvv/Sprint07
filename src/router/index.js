import { createRouter, createWebHistory } from 'vue-router'
import { getAuthState } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Alvo Certo — Apoio educacional e teste vocacional' },
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('@/views/Sobre.vue'),
    meta: { title: 'Sobre — Alvo Certo' },
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('@/views/Contato.vue'),
    meta: { title: 'Contato — Alvo Certo' },
  },
  {
    path: '/teste-vocacional',
    name: 'TesteVocacional',
    component: () => import('@/views/TesteVocacional.vue'),
    meta: { title: 'Teste vocacional — Alvo Certo' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: 'Login — Alvo Certo', guestOnly: true },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/views/Cadastro.vue'),
    meta: { title: 'Cadastro — Alvo Certo', guestOnly: true },
  },
  {
    path: '/paineldoaluno',
    name: 'Paineldoaluno',
    component: () => import('@/views/Paineldoaluno.vue'),
    meta: { title: 'Painel do aluno — Alvo Certo', requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Página não encontrada — Alvo Certo' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const { isAuthenticated } = getAuthState()

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'Paineldoaluno' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Alvo Certo'
})

export default router
