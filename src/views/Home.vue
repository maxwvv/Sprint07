<template>
  <div>
    <!-- Banner com imagem -->
    <div
      class="top-banner rounded-bottom shadow-sm mb-4"
      :style="{
        backgroundImage: 'url(' + bannerImage + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px'
      }"
    ></div>

    <!-- Navegação -->
    <nav class="navbar navbar-expand bg-white shadow-sm mb-4">
      <div class="container justify-content-center">
        <a v-for="link in navLinks" :key="link.text" :href="link.href" class="nav-link text-danger px-4 fs-5 position-relative">
          {{ link.text }}
          <span class="underline"></span>
        </a>
      </div>
    </nav>

    <!-- Conteúdo -->
    <div class="container">
      <div class="row g-4 justify-content-center">
        <div v-for="(block, idx) in blocks" :key="idx" class="col-12 col-md-6 col-lg-4">
          <div
            class="glass-card p-4 rounded-3 text-center shadow"
            @mouseenter="hoverIndex = idx"
            @mouseleave="hoverIndex = null"
          >
            <h1 :class="{ 'translate-up': hoverIndex === idx }" class="transition mb-3">{{ block.title }}</h1>
            <p :class="{ 'fade-in': hoverIndex === idx }" class="transition mt-3">{{ block.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé -->
    <footer class="bg-warning text-black text-center py-3 mt-5">
      Estamos com você nessa caminhada! © 2025 Portal do Alvo Certo. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverIndex: null,
      bannerImage: require('@/assets/imagem.png'), // ajuste caminho conforme seu projeto
      navLinks: [
        { text: 'Home', href: '01.html' },
        { text: 'Sobre', href: 'sobre.html' },
        { text: 'Contato', href: 'contato.html' },
        { text: 'Login', href: 'login.html' },
        { text: 'Cadastro', href: 'cadastro.html' }
      ],
      blocks: [
        {
          title: 'Quem nós somos?',
          text: 'Uma plataforma feita especialmente para apoiar estudantes brasileiros em sua jornada escolar, acadêmica e profissional.'
        },
        {
          title: '🎯 Nossa Missão',
          text: 'Fornecer informações de qualidade.\nPromover o acesso ao conhecimento.\nIncentivar o protagonismo estudantil.'
        },
        {
          title: '📚 O Que Oferecemos',
          text: 'Conteúdos para o ENEM.\nDicas de estudo.\nGuias e materiais atualizados.'
        },
        {
          title: '👨‍🏫 Nossa Equipe',
          text: 'Educadores experientes.\nOrientadores vocacionais.\nProfissionais de tecnologia e design.'
        },
        {
          title: '🌟 Nossos Valores',
          text: 'Educação inclusiva.\nFormação cidadã.\nEmpatia e transparência.'
        },
        {
          title: '🚀 Nosso Compromisso',
          text: 'Ambiente motivador.\nSuporte para escolhas conscientes.\nApoio ao futuro profissional do estudante.'
        }
      ]
    }
  }
}
</script>

