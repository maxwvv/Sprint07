<template>
  <div class="about">
    <section class="ac-section">
      <div class="ac-container">
        <header class="section-head">
          <p class="ac-eyebrow">Sobre o Alvo Certo</p>
          <h1 class="ac-section-title">Apoio de verdade para escolher o futuro</h1>
          <p class="ac-section-lead">
            Nascemos para reduzir a distância entre o estudante e a informação que ajuda a decidir o
            que estudar e que carreira seguir.
          </p>
        </header>

        <div class="grid-cards">
          <FeatureCard
            v-for="card in aboutCards"
            :key="card.title"
            :icon="card.icon"
            :title="card.title"
            :text="card.text"
          />
        </div>
      </div>
    </section>

    <section class="ac-section about__cta">
      <div class="ac-container">
        <h2 class="ac-section-title">Pronto para dar o primeiro passo?</h2>
        <p class="ac-section-lead">
          Faça o teste vocacional e veja quais áreas mais combinam com você.
        </p>
        <RouterLink to="/teste-vocacional" class="ac-btn">Fazer o teste vocacional</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import FeatureCard from '@/components/ui/FeatureCard.vue'
import { aboutCards } from '@/data/aboutCards'
</script>

<style scoped>
.section-head {
  max-width: 640px;
  margin-bottom: 2.5rem;
}
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.about__cta {
  background: var(--ac-surface);
  border-top: 1px solid var(--ac-line);
  text-align: center;
}
.about__cta .ac-section-lead {
  margin: 0 auto 1.5rem;
}
</style>
