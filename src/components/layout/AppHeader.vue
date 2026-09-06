<template>
  <header class="site-header">
    <div class="ac-container site-header__inner">
      <RouterLink to="/" class="site-header__brand" @click="closeMenu">
        <img :src="logo" alt="Alvo Certo — página inicial" width="170" height="38" />
      </RouterLink>

      <button
        class="site-header__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="ac-visually-hidden">
          {{ menuOpen ? 'Fechar menu' : 'Abrir menu' }}
        </span>
        <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="24" />
      </button>

      <nav
        id="primary-navigation"
        class="site-header__nav"
        :class="{ 'is-open': menuOpen }"
        aria-label="Navegação principal"
      >
        <ul class="site-header__links">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="site-header__link" @click="closeMenu">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="site-header__actions">
          <template v-if="isAuthenticated">
            <RouterLink to="/paineldoaluno" class="ac-btn ac-btn--ghost" @click="closeMenu">
              Meu painel
            </RouterLink>
            <button type="button" class="ac-btn ac-btn--light" @click="handleLogout">Sair</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="ac-btn ac-btn--ghost" @click="closeMenu">
              Entrar
            </RouterLink>
            <RouterLink to="/cadastro" class="ac-btn" @click="closeMenu"> Criar conta </RouterLink>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AppIcon from '@/components/ui/AppIcon.vue'
import logo from '@/assets/imagem.png'

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/teste-vocacional', label: 'Teste vocacional' },
  { to: '/contato', label: 'Contato' },
]

const route = useRoute()
const { isAuthenticated, logout } = useAuth()

const menuOpen = ref(false)
const closeMenu = () => (menuOpen.value = false)

function handleLogout() {
  closeMenu()
  logout()
}

watch(() => route.fullPath, closeMenu)
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1030;
  background: var(--ac-surface);
  border-bottom: 1px solid var(--ac-line);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: var(--ac-header-h);
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
}
.site-header__brand img {
  height: 38px;
  width: auto;
}

.site-header__toggle {
  display: none;
  border: 1px solid var(--ac-line);
  background: #fff;
  border-radius: var(--ac-radius-sm);
  width: 44px;
  height: 44px;
  color: var(--ac-ink);
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.site-header__links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-header__link {
  display: inline-block;
  padding: 0.5rem 0.85rem;
  border-radius: var(--ac-radius-sm);
  font-weight: 600;
  color: var(--ac-muted);
  text-decoration: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;
}
.site-header__link:hover {
  color: var(--ac-primary-600);
  background: var(--ac-primary-050);
}
.site-header__link.router-link-active {
  color: var(--ac-primary-700);
}
.site-header__link.router-link-exact-active {
  color: var(--ac-primary-700);
  background: var(--ac-primary-050);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

@media (max-width: 860px) {
  .site-header__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .site-header__nav {
    position: absolute;
    inset: var(--ac-header-h) 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--ac-surface);
    border-bottom: 1px solid var(--ac-line);
    box-shadow: var(--ac-shadow);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
  .site-header__nav.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .site-header__links {
    flex-direction: column;
    align-items: stretch;
  }
  .site-header__link {
    padding: 0.75rem 0.85rem;
  }

  .site-header__actions {
    flex-direction: column;
  }
  .site-header__actions .ac-btn {
    width: 100%;
  }
}
</style>
