<template>
  <article class="ac-card ac-card--hover feature-card">
    <span v-if="icon" class="ac-card__icon" aria-hidden="true">{{ icon }}</span>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__text">{{ text }}</p>
    <slot />
  </article>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<style scoped>
.feature-card__title {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}
.feature-card__text {
  color: var(--ac-muted);
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
}
</style>
