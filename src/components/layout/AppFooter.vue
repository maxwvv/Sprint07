<template>
  <footer class="site-footer">
    <div class="ac-container site-footer__grid">
      <div class="site-footer__brand">
        <img :src="logo" alt="Alvo Certo" width="180" height="41" />
        <p>
          Orientação, ferramentas e apoio para o estudante estudar melhor e escolher o futuro com
          direção.
        </p>
      </div>

      <nav class="site-footer__col" aria-label="Rodapé — navegação">
        <h2>Navegação</h2>
        <ul>
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="site-footer__col">
        <h2>Projeto</h2>
        <ul>
          <li>
            <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
              <AppIcon name="github" :size="18" /> Código no GitHub
            </a>
          </li>
        </ul>
        <p class="site-footer__note">
          Projeto acadêmico e de portfólio. Não representa um serviço real.
        </p>
      </div>
    </div>

    <div class="ac-container site-footer__bottom">
      <p>© {{ ano }} Alvo Certo — projeto acadêmico e de portfólio.</p>
      <p>Feito com Vue 3 + Vite.</p>
    </div>
  </footer>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import logo from '@/assets/imagem.png'

// Substitua pela URL do repositório ao publicar.
const repoUrl = 'https://github.com/'

const ano = new Date().getFullYear()

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/teste-vocacional', label: 'Teste vocacional' },
  { to: '/contato', label: 'Contato' },
]
</script>

<style scoped>
.site-footer {
  background: var(--ac-primary-700);
  color: rgba(255, 255, 255, 0.85);
  padding-top: 3rem;
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2.5rem;
}

.site-footer__brand img {
  height: 41px;
  width: auto;
  margin-bottom: 1rem;
  filter: brightness(0) invert(1);
}
.site-footer__brand p {
  max-width: 40ch;
  margin: 0;
  font-size: 0.95rem;
}

.site-footer h2 {
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
}

.site-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.site-footer a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
}
.site-footer a:hover {
  color: #fff;
  text-decoration: underline;
}

.site-footer__note {
  margin: 1rem 0 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 32ch;
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  padding-block: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.85rem;
}
.site-footer__bottom p {
  margin: 0;
}

@media (max-width: 720px) {
  .site-footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .site-footer__brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
