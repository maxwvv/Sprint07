import { createRouter, createWebHistory } from 'vue-router'

// Certifique-se de que esses arquivos existem na pasta src/views/
import Home from '@/views/Home.vue'
import Sobre from '@/views/Sobre.vue'
import Contato from '@/views/Contato.vue'
import Login from '@/views/Login.vue'
import Cadastro from '@/views/Cadastro.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sobre', name: 'Sobre', component: Sobre },
  { path: '/contato', name: 'Contato', component: Contato },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
