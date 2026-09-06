<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="ac-container hero__grid">
        <div class="hero__content">
          <p class="ac-eyebrow">Plataforma de apoio ao estudante</p>
          <h1 class="hero__title">
            O futuro não precisa ser<br />
            um <span class="ac-text-accent">tiro no escuro</span>.
          </h1>
          <p class="hero__lead">
            O <strong>Alvo Certo</strong> reúne teste vocacional, técnicas de estudo e um panorama
            de profissões para o estudante escolher a carreira com informação — e não no achismo.
          </p>
          <div class="hero__actions">
            <RouterLink to="/teste-vocacional" class="ac-btn ac-btn--accent">
              Fazer o teste vocacional
            </RouterLink>
            <RouterLink to="/cadastro" class="ac-btn ac-btn--ghost">
              Criar conta grátis
            </RouterLink>
          </div>
          <p class="hero__note">Gratuito · sem cartão · resultado na hora</p>
        </div>

        <div class="hero__media">
          <svg
            class="hero__art"
            viewBox="0 0 480 420"
            role="img"
            aria-label="Ilustração de um alvo com uma trajetória de crescimento acertando o centro"
          >
            <defs>
              <linearGradient id="acGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#2541b2" />
                <stop offset="1" stop-color="#162a78" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="480" height="420" rx="28" fill="url(#acGrad)" />
            <g transform="translate(300 210)">
              <circle
                r="120"
                fill="none"
                stroke="#ffffff"
                stroke-opacity="0.25"
                stroke-width="14"
              />
              <circle r="82" fill="none" stroke="#ffffff" stroke-opacity="0.45" stroke-width="14" />
              <circle r="44" fill="none" stroke="#ffffff" stroke-opacity="0.75" stroke-width="14" />
              <circle r="12" fill="#ff4d4d" />
            </g>
            <path
              d="M40 350 C 150 350, 170 150, 300 210"
              fill="none"
              stroke="#ff4d4d"
              stroke-width="8"
              stroke-linecap="round"
              stroke-dasharray="4 18"
            />
            <g fill="#ffffff">
              <circle cx="40" cy="350" r="10" />
              <circle cx="110" cy="120" r="6" fill-opacity="0.6" />
              <circle cx="420" cy="80" r="8" fill-opacity="0.5" />
              <circle cx="380" cy="360" r="6" fill-opacity="0.5" />
            </g>
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="ac-section--tight stats" aria-label="Números da plataforma">
      <div class="ac-container stats__grid">
        <div v-for="item in stats" :key="item.label" class="stats__item">
          <span class="stats__value">{{ item.value }}</span>
          <span class="stats__label">{{ item.label }}</span>
        </div>
      </div>
    </section>

    <!-- Recursos -->
    <section id="recursos" class="ac-section">
      <div class="ac-container">
        <header class="section-head">
          <p class="ac-eyebrow">O que você encontra</p>
          <h2 class="ac-section-title">Ferramentas, não só conteúdo</h2>
          <p class="ac-section-lead">
            Cada recurso existe para tirar o estudante da dúvida e colocar em ação.
          </p>
        </header>

        <div class="grid-cards">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :text="feature.text"
          />
        </div>
      </div>
    </section>

    <!-- Como funciona -->
    <section class="ac-section how">
      <div class="ac-container">
        <header class="section-head">
          <p class="ac-eyebrow">Como funciona</p>
          <h2 class="ac-section-title">Três passos até um plano com direção</h2>
        </header>

        <ol class="how__steps">
          <li v-for="step in steps" :key="step.number" class="how__step">
            <span class="how__number">{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- CTA final -->
    <section class="ac-section">
      <div class="ac-container cta">
        <h2 class="cta__title">Descubra em 3 minutos por onde começar</h2>
        <p class="cta__text">
          Responda 12 perguntas e receba seu perfil vocacional com as áreas que mais combinam com
          você.
        </p>
        <RouterLink to="/teste-vocacional" class="ac-btn ac-btn--light"> Começar agora </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import FeatureCard from '@/components/ui/FeatureCard.vue'
import { features, steps, stats } from '@/data/features'
</script>

<style scoped>
/* Hero */
.hero {
  background:
    radial-gradient(900px 500px at 100% 0%, var(--ac-primary-050), transparent 70%), var(--ac-bg);
  padding-block: clamp(2.5rem, 7vw, 5rem);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
}
.hero__title {
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1.08;
  margin: 0.5rem 0 1rem;
}
.hero__lead {
  font-size: 1.1rem;
  color: var(--ac-muted);
  max-width: 48ch;
  margin-bottom: 1.75rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.hero__note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--ac-muted);
}
.hero__art {
  width: 100%;
  height: auto;
  border-radius: var(--ac-radius-lg);
  box-shadow: var(--ac-shadow-lg);
  display: block;
}

/* Stats */
.stats {
  border-block: 1px solid var(--ac-line);
  background: var(--ac-surface);
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  text-align: center;
}
.stats__value {
  display: block;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--ac-primary);
  letter-spacing: -0.03em;
}
.stats__label {
  color: var(--ac-muted);
  font-size: 0.92rem;
}

/* Blocos genéricos */
.section-head {
  max-width: 640px;
  margin-bottom: 2.5rem;
}
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Como funciona */
.how {
  background: var(--ac-surface);
  border-block: 1px solid var(--ac-line);
}
.how__steps {
  list-style: none;
  counter-reset: step;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.how__step {
  background: var(--ac-bg);
  border: 1px solid var(--ac-line);
  border-radius: var(--ac-radius);
  padding: 1.75rem;
}
.how__number {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--ac-accent);
}
.how__step h3 {
  font-size: 1.15rem;
  margin: 0.5rem 0;
}
.how__step p {
  color: var(--ac-muted);
  margin: 0;
}

/* CTA */
.cta {
  background: linear-gradient(135deg, var(--ac-primary-600), var(--ac-primary-700));
  color: #fff;
  text-align: center;
  padding: clamp(2.5rem, 6vw, 4rem);
  border-radius: var(--ac-radius-lg);
}
.cta__title {
  color: #fff;
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  margin-bottom: 0.75rem;
}
.cta__text {
  color: rgba(255, 255, 255, 0.85);
  max-width: 52ch;
  margin: 0 auto 1.75rem;
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero__media {
    order: -1;
  }
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .how__steps {
    grid-template-columns: 1fr;
  }
}
</style>
