<script setup>
// nenhum script especial por enquanto
</script>

<template>
  <div class="bg-light text-danger" style="min-height: 100vh;">
    <!-- Banner -->
    <div
      class="bg-image rounded-bottom shadow"
      style="background-image: url('/imagem.png'); height: 250px; background-size: cover; background-position: center;"
    ></div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand bg-white shadow-sm">
      <div class="container justify-content-center">
        <ul class="navbar-nav nav-pills">
          <li class="nav-item">
            <a class="nav-link text-danger px-4" href="Home.vue">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger px-4" href="Sobre.vue">Sobre</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger px-4" href="Contato.vue">Contato</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger px-4" href="login.html">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger px-4" href="cadastro.html">Cadastro</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Conteúdo grid -->
    <div class="container my-5">
      <div class="row gy-4 justify-content-center">
        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>Quem nós somos?</h3>
            <p>Uma plataforma feita especialmente para apoiar estudantes brasileiros em sua jornada escolar, acadêmica e profissional.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>🎯 Nossa Missão</h3>
            <p>Fornecer informações de qualidade.<br />Promover o acesso ao conhecimento.<br />Incentivar o protagonismo estudantil.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>📚 O Que Oferecemos</h3>
            <p>Conteúdos para o ENEM.<br />Dicas de estudo.<br />Guias e materiais atualizados.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>👨‍🏫 Nossa Equipe</h3>
            <p>Educadores experientes.<br />Orientadores vocacionais.<br />Profissionais de tecnologia e design.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>🌟 Nossos Valores</h3>
            <p>Educação inclusiva.<br />Formação cidadã.<br />Empatia e transparência.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white bg-opacity-25 rounded-3 shadow-sm text-center" style="backdrop-filter: blur(10px);">
            <h3>🚀 Nosso Compromisso</h3>
            <p>Ambiente motivador.<br />Suporte para escolhas conscientes.<br />Apoio ao futuro profissional do estudante.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé -->
    <footer class="bg-warning text-center text-dark py-2">
      Estamos com você nessa caminhada! © 2025 Portal do Alvo Certo. Todos os direitos reservados.
    </footer>
  </div>
</template>
