<template>
  <div class="painel">
    <div class="ac-container painel__layout">
      <!-- Navegação lateral -->
      <aside class="painel__sidebar">
        <p class="painel__greeting">
          Olá,<br /><strong>{{ primeiroNome }}</strong>
        </p>

        <nav class="painel__nav" aria-label="Seções do painel">
          <button
            v-for="secao in secoes"
            :key="secao.id"
            type="button"
            class="painel__nav-btn"
            :class="{ 'is-active': ativo === secao.id }"
            :aria-current="ativo === secao.id ? 'true' : undefined"
            @click="selecionar(secao.id)"
          >
            <span aria-hidden="true">{{ secao.icon }}</span>
            {{ secao.label }}
          </button>
        </nav>

        <button type="button" class="ac-btn ac-btn--ghost painel__logout" @click="logout">
          <AppIcon name="logout" :size="18" /> Sair
        </button>
      </aside>

      <!-- Conteúdo -->
      <main class="painel__content">
        <h1 class="painel__title">{{ secaoAtual.label }}</h1>

        <!-- Técnicas de estudo -->
        <section v-if="ativo === 'tecnicas'" class="painel__section">
          <p class="painel__intro">
            Métodos com evidência para render mais em menos tempo. Comece por um só.
          </p>
          <article
            v-for="tecnica in studyTechniques"
            :key="tecnica.id"
            class="ac-card painel__tecnica"
          >
            <h2>{{ tecnica.titulo }}</h2>
            <p>{{ tecnica.descricao }}</p>
            <p class="painel__tip"><strong>Como começar:</strong> {{ tecnica.comoComecar }}</p>
            <div class="painel__video">
              <iframe
                :src="tecnica.video"
                :title="`Vídeo: ${tecnica.titulo}`"
                loading="lazy"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                "
                allowfullscreen
              ></iframe>
            </div>
          </article>
        </section>

        <!-- Escolha profissional -->
        <section v-else-if="ativo === 'escolha'" class="painel__section">
          <p class="painel__intro">Um roteiro para transformar dúvida em decisão.</p>
          <ol class="painel__checklist">
            <li v-for="(passo, i) in escolhaPassos" :key="i">
              <strong>{{ passo.titulo }}.</strong> {{ passo.texto }}
            </li>
          </ol>
        </section>

        <!-- Teste vocacional -->
        <section v-else-if="ativo === 'vocacional'" class="painel__section">
          <p class="painel__intro">
            Faça o teste interativo e depois aprofunde com as referências externas.
          </p>

          <VocationalQuiz />

          <h2 class="painel__subtitle">Outros testes de referência</h2>
          <ul class="painel__tests">
            <li v-for="teste in vocationalTests" :key="teste.nome" class="ac-card">
              <h3>
                <a :href="teste.link" target="_blank" rel="noopener noreferrer">
                  {{ teste.nome }}
                </a>
              </h3>
              <p>{{ teste.descricao }}</p>
              <span class="painel__badge">⏱ {{ teste.duracao }}</span>
            </li>
          </ul>
        </section>

        <!-- Profissões em alta -->
        <section v-else-if="ativo === 'profissoes'" class="painel__section">
          <p class="painel__intro">
            Faixas salariais de referência por grande área (valores médios de mercado).
          </p>
          <div class="painel__areas">
            <article v-for="area in careerAreas" :key="area.area" class="ac-card">
              <h2>
                <span aria-hidden="true">{{ area.icon }}</span> {{ area.area }}
              </h2>
              <ul>
                <li v-for="cargo in area.cargos" :key="cargo.nome">
                  <span>{{ cargo.nome }}</span>
                  <span class="painel__salario">{{ formatBRL(cargo.salario) }}</span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <!-- Comunidade -->
        <section v-else class="painel__section">
          <p class="painel__intro">Estudar em grupo aumenta a constância.</p>
          <ul class="painel__list">
            <li>Participe de fóruns com estudantes do país inteiro.</li>
            <li>Compartilhe resumos, mapas mentais e dicas de estudo.</li>
            <li>Crie conexões com colegas com os mesmos objetivos acadêmicos.</li>
          </ul>
          <p class="painel__soon">Espaço de comunidade em construção nesta demonstração.</p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import AppIcon from '@/components/ui/AppIcon.vue'
import VocationalQuiz from '@/components/VocationalQuiz.vue'
import { studyTechniques } from '@/data/studyTechniques'
import { vocationalTests } from '@/data/vocationalTests'
import { careerAreas, formatBRL } from '@/data/careers'

const STORAGE_KEY = 'painelSecaoAtiva'

const { usuarioLogado, logout } = useAuth()

const secoes = [
  { id: 'tecnicas', icon: '📚', label: 'Técnicas de estudo' },
  { id: 'escolha', icon: '🧭', label: 'Escolha profissional' },
  { id: 'vocacional', icon: '🎯', label: 'Teste vocacional' },
  { id: 'profissoes', icon: '💼', label: 'Profissões em alta' },
  { id: 'comunidade', icon: '🌐', label: 'Comunidade' },
]

const escolhaPassos = [
  {
    titulo: 'Autoconhecimento',
    texto: 'Pergunte-se o que você gosta de fazer e quais são suas habilidades.',
  },
  {
    titulo: 'Teste vocacional',
    texto: 'Use o resultado como ponto de partida, não como veredito.',
  },
  { titulo: 'Pesquise o mercado', texto: 'Veja a empregabilidade e as tendências da área.' },
  {
    titulo: 'Converse com profissionais',
    texto: 'Entenda a rotina real de quem já atua na carreira.',
  },
  {
    titulo: 'Visite faculdades',
    texto: 'Conheça a grade e o dia a dia dos cursos que te interessam.',
  },
  {
    titulo: 'Pense no longo prazo',
    texto: 'Imagine-se daqui a 5 ou 10 anos exercendo a profissão.',
  },
]

const ativo = ref(readSecaoSalva())
const secaoAtual = computed(() => secoes.find((s) => s.id === ativo.value) ?? secoes[0])
const primeiroNome = computed(() => usuarioLogado.value?.nome?.split(' ')[0] ?? 'estudante')

function readSecaoSalva() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    return secoes.some((s) => s.id === salvo) ? salvo : 'tecnicas'
  } catch {
    return 'tecnicas'
  }
}

function selecionar(id) {
  ativo.value = id
}

watch(ativo, (id) => {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignora indisponibilidade de storage */
  }
})
</script>

<style scoped>
.painel {
  background: var(--ac-bg);
  padding-block: 2rem 3rem;
}

.painel__layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  align-items: start;
}

/* Sidebar */
.painel__sidebar {
  position: sticky;
  top: 84px;
  display: grid;
  gap: 1rem;
}
.painel__greeting {
  margin: 0;
  font-size: 1rem;
  color: var(--ac-muted);
}
.painel__greeting strong {
  font-size: 1.25rem;
  color: var(--ac-ink);
}

.painel__nav {
  display: grid;
  gap: 0.35rem;
}
.painel__nav-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 0;
  border-radius: var(--ac-radius-sm);
  background: transparent;
  color: var(--ac-muted);
  font-weight: 600;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}
.painel__nav-btn:hover {
  background: var(--ac-primary-050);
  color: var(--ac-primary-700);
}
.painel__nav-btn.is-active {
  background: var(--ac-primary);
  color: #fff;
}
.painel__logout {
  justify-self: start;
}

/* Conteúdo */
.painel__content {
  min-width: 0;
}
.painel__title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 0.5rem;
}
.painel__intro {
  color: var(--ac-muted);
  margin-bottom: 1.5rem;
}
.painel__subtitle {
  font-size: 1.25rem;
  margin: 2rem 0 1rem;
}
.painel__section {
  animation: painel-fade 0.3s ease;
}

.painel__tecnica {
  margin-bottom: 1.25rem;
}
.painel__tecnica h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.painel__tip {
  background: var(--ac-primary-050);
  border-radius: var(--ac-radius-sm);
  padding: 0.7rem 0.9rem;
  font-size: 0.92rem;
}
.painel__video {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--ac-radius-sm);
  overflow: hidden;
  margin-top: 0.75rem;
}
.painel__video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.painel__checklist,
.painel__list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
  color: var(--ac-muted);
}
.painel__checklist li strong,
.painel__list li strong {
  color: var(--ac-ink);
}
.painel__soon {
  margin: 1.25rem 0 0;
  padding: 0.75rem 0.9rem;
  border: 1px dashed var(--ac-line);
  border-radius: var(--ac-radius-sm);
  color: var(--ac-muted);
  font-size: 0.9rem;
}

.painel__tests {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}
.painel__tests h3 {
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
}
.painel__tests p {
  color: var(--ac-muted);
  margin-bottom: 0.5rem;
}
.painel__badge {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ac-primary-600);
  background: var(--ac-primary-050);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.painel__areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.painel__areas h2 {
  font-size: 1.05rem;
  margin-bottom: 0.75rem;
}
.painel__areas ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}
.painel__areas li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.95rem;
}
.painel__salario {
  font-weight: 700;
  color: var(--ac-primary-600);
  white-space: nowrap;
}

@keyframes painel-fade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 820px) {
  .painel__layout {
    grid-template-columns: 1fr;
  }
  .painel__sidebar {
    position: static;
  }
  .painel__nav {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  .painel__nav-btn {
    white-space: nowrap;
  }
}
</style>
