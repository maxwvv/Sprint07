<template>
  <section class="auth">
    <div class="auth__card">
      <img :src="logo" alt="Alvo Certo" class="auth__logo" width="240" height="55" />
      <h1 class="auth__title">{{ title }}</h1>
      <p class="auth__subtitle">{{ subtitle }}</p>

      <slot />

      <p class="auth__foot">
        <slot name="footer" />
      </p>
    </div>
  </section>
</template>

<script setup>
import logo from '@/assets/imagem.png'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<style scoped>
.auth {
  display: grid;
  place-items: center;
  padding: clamp(2rem, 6vw, 4rem) 1.25rem;
  background:
    radial-gradient(1200px 400px at 50% -10%, var(--ac-primary-050), transparent), var(--ac-bg);
  min-height: calc(100vh - var(--ac-header-h));
}

.auth__card {
  width: 100%;
  max-width: 440px;
  background: var(--ac-surface);
  border: 1px solid var(--ac-line);
  border-radius: var(--ac-radius-lg);
  box-shadow: var(--ac-shadow);
  padding: clamp(1.75rem, 5vw, 2.75rem);
  text-align: center;
}

.auth__logo {
  max-width: 220px;
  height: auto;
  margin-bottom: 1.25rem;
  user-select: none;
}

.auth__title {
  font-size: 1.6rem;
  margin-bottom: 0.35rem;
  color: var(--ac-primary-700);
}

.auth__subtitle {
  color: var(--ac-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.auth__foot {
  margin-top: 1.5rem;
  margin-bottom: 0;
  font-size: 0.9rem;
  color: var(--ac-muted);
}
</style>
