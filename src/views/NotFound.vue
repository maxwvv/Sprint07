<template>
  <section class="ac-section notfound">
    <div class="ac-container">
      <p class="notfound__code">404</p>
      <h1 class="ac-section-title">Página não encontrada</h1>
      <p class="ac-section-lead">O endereço que você tentou acessar não existe ou foi movido.</p>
      <RouterLink to="/" class="ac-btn">Voltar para o início</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  text-align: center;
}
.notfound__code {
  font-size: clamp(3.5rem, 12vw, 6rem);
  font-weight: 800;
  color: var(--ac-primary-050);
  margin: 0;
  line-height: 1;
}
.notfound .ac-section-lead {
  margin: 0 auto 1.5rem;
}
</style>
