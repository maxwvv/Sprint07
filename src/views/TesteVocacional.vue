<template>
  <section class="ac-section">
    <div class="ac-container">
      <header class="section-head">
        <p class="ac-eyebrow">Ferramenta gratuita</p>
        <h1 class="ac-section-title">Teste vocacional</h1>
        <p class="ac-section-lead">
          Baseado no modelo RIASEC (Holland), usado por orientadores de carreira no mundo todo. Sem
          cadastro para responder.
        </p>
      </header>

      <VocationalQuiz>
        <template #result-actions>
          <RouterLink v-if="!isAuthenticated" to="/cadastro" class="ac-btn">
            Criar conta e salvar meu progresso
          </RouterLink>
          <RouterLink v-else to="/paineldoaluno" class="ac-btn"> Ir para o meu painel </RouterLink>
        </template>
      </VocationalQuiz>
    </div>
  </section>
</template>

<script setup>
import VocationalQuiz from '@/components/VocationalQuiz.vue'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()
</script>

<style scoped>
.section-head {
  max-width: 640px;
  margin-bottom: 2.5rem;
}
</style>
