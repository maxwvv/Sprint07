<template>
  <div class="quiz ac-card">
    <!-- Introdução -->
    <div v-if="stage === 'intro'" class="quiz__intro">
      <h2 class="quiz__heading">Teste vocacional — modelo RIASEC</h2>
      <p>
        São {{ questions.length }} afirmações. Para cada uma, diga o quanto ela combina com você. Ao
        final você recebe seu perfil dominante e as áreas com mais afinidade — leva cerca de 3
        minutos.
      </p>
      <button type="button" class="ac-btn" @click="start">Começar o teste</button>
      <p v-if="savedResult" class="quiz__saved">
        Você já fez o teste. Último resultado:
        <strong>{{ typeName(savedResult.top[0]) }}</strong
        >.
        <button type="button" class="quiz__link" @click="showSaved">Ver resultado</button>
      </p>
    </div>

    <!-- Perguntas -->
    <form v-else-if="stage === 'quiz'" class="quiz__form" @submit.prevent="next">
      <div class="quiz__progress">
        <div
          class="quiz__progress-track"
          role="progressbar"
          :aria-valuenow="current + 1"
          aria-valuemin="1"
          :aria-valuemax="questions.length"
          :aria-label="`Pergunta ${current + 1} de ${questions.length}`"
        >
          <span class="quiz__progress-fill" :style="{ width: `${progress}%` }"></span>
        </div>
        <span class="quiz__progress-label">{{ current + 1 }} / {{ questions.length }}</span>
      </div>

      <fieldset class="quiz__fieldset">
        <legend class="quiz__question">{{ questions[current].texto }}</legend>
        <div class="quiz__scale">
          <label
            v-for="option in scale"
            :key="option.value"
            class="quiz__option"
            :class="{ 'is-selected': answers[questions[current].id] === option.value }"
          >
            <input
              type="radio"
              :name="`q-${questions[current].id}`"
              :value="option.value"
              :checked="answers[questions[current].id] === option.value"
              @change="answers[questions[current].id] = option.value"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </fieldset>

      <div class="quiz__nav">
        <button type="button" class="ac-btn ac-btn--ghost" :disabled="current === 0" @click="prev">
          Voltar
        </button>
        <button type="submit" class="ac-btn" :disabled="!isAnswered">
          {{ current === questions.length - 1 ? 'Ver resultado' : 'Próxima' }}
        </button>
      </div>
    </form>

    <!-- Resultado -->
    <div v-else class="quiz__result">
      <p class="ac-eyebrow">Seu perfil</p>
      <h2 class="quiz__heading">
        {{ result.top.map(typeName).join(' + ') }}
      </h2>

      <ul class="quiz__types">
        <li v-for="type in result.top" :key="type">
          <strong>{{ typeName(type) }}.</strong> {{ types[type].resumo }}
        </li>
      </ul>

      <h3 class="quiz__subheading">Áreas com mais afinidade</h3>
      <ul class="quiz__areas">
        <li v-for="area in recommendedAreas" :key="area.area">
          <span aria-hidden="true">{{ area.icon }}</span>
          <div>
            <strong>{{ area.area }}</strong>
            <span class="ac-text-muted">
              {{ area.cargos.map((c) => c.nome).join(' · ') }}
            </span>
          </div>
        </li>
      </ul>

      <details class="quiz__scores">
        <summary>Ver pontuação por tipo</summary>
        <ul>
          <li v-for="type in result.ranking" :key="type">
            {{ typeName(type) }}: {{ result.scores[type] }} pts
          </li>
        </ul>
      </details>

      <div class="quiz__nav">
        <button type="button" class="ac-btn ac-btn--ghost" @click="restart">Refazer teste</button>
        <slot name="result-actions" :result="result" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { riasecQuestions, riasecTypes, answerScale, scoreRiasec } from '@/data/riasec'
import { careerAreas } from '@/data/careers'

const STORAGE_KEY = 'resultadoVocacional'

const emit = defineEmits(['finished'])

const questions = riasecQuestions
const types = riasecTypes
const scale = answerScale

const stage = ref('intro') // intro | quiz | result
const current = ref(0)
const answers = reactive({})
const result = ref(null)
const savedResult = ref(readSaved())

const progress = computed(() => Math.round((current.value / questions.length) * 100))
const isAnswered = computed(() => answers[questions[current.value].id] != null)

const recommendedAreas = computed(() => {
  if (!result.value) return []
  const top = result.value.top
  const matches = careerAreas.filter((area) => area.riasec.some((r) => top.includes(r)))
  return (matches.length ? matches : careerAreas).slice(0, 3)
})

function typeName(type) {
  return types[type]?.nome ?? type
}

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function start() {
  stage.value = 'quiz'
  current.value = 0
}

function prev() {
  if (current.value > 0) current.value -= 1
}

function next() {
  if (!isAnswered.value) return
  if (current.value < questions.length - 1) {
    current.value += 1
    return
  }
  finish()
}

function finish() {
  const computed = scoreRiasec(answers)
  result.value = computed
  stage.value = 'result'
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(computed))
    savedResult.value = computed
  } catch {
    /* localStorage indisponível — segue sem persistir */
  }
  emit('finished', computed)
}

function restart() {
  Object.keys(answers).forEach((key) => delete answers[key])
  result.value = null
  current.value = 0
  stage.value = 'quiz'
}

function showSaved() {
  result.value = savedResult.value
  stage.value = 'result'
}
</script>

<style scoped>
.quiz {
  max-width: 640px;
  margin-inline: auto;
}

.quiz__heading {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}
.quiz__subheading {
  font-size: 1.1rem;
  margin: 1.5rem 0 0.75rem;
}

.quiz__intro p,
.quiz__result p {
  color: var(--ac-muted);
}
.quiz__intro .ac-btn {
  margin-top: 0.5rem;
}
.quiz__saved {
  margin-top: 1.25rem;
  font-size: 0.9rem;
}

.quiz__progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.quiz__progress-track {
  flex: 1;
  height: 8px;
  background: var(--ac-line);
  border-radius: 999px;
  overflow: hidden;
}
.quiz__progress-fill {
  display: block;
  height: 100%;
  background: var(--ac-primary);
  transition: width 0.25s ease;
}
.quiz__progress-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ac-muted);
}

.quiz__fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}
.quiz__question {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--ac-ink);
}

.quiz__scale {
  display: grid;
  gap: 0.5rem;
}
.quiz__option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--ac-line);
  border-radius: var(--ac-radius-sm);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}
.quiz__option:hover {
  border-color: var(--ac-primary);
}
.quiz__option.is-selected {
  border-color: var(--ac-primary);
  background: var(--ac-primary-050);
}
.quiz__option input {
  accent-color: var(--ac-primary);
  width: 18px;
  height: 18px;
}

.quiz__nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

.quiz__types,
.quiz__areas {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}
.quiz__types li {
  color: var(--ac-muted);
}
.quiz__areas li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem;
  border: 1px solid var(--ac-line);
  border-radius: var(--ac-radius-sm);
}
.quiz__areas li span:first-child {
  font-size: 1.4rem;
}
.quiz__areas li div {
  display: grid;
}

.quiz__scores {
  margin-top: 1.25rem;
  font-size: 0.9rem;
}
.quiz__scores ul {
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
  color: var(--ac-muted);
}

.quiz__link {
  border: 0;
  background: none;
  color: var(--ac-primary-600);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font: inherit;
}

@media (max-width: 480px) {
  .quiz__nav {
    flex-direction: column-reverse;
  }
  .quiz__nav .ac-btn {
    width: 100%;
  }
}
</style>
