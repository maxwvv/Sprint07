<script setup>
import { RouterView, RouterLink } from 'vue-router'
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
            <RouterLink class="nav-link text-danger px-4" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-danger px-4" to="/sobre">Sobre</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-danger px-4" to="/contato">Contato</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-danger px-4" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-danger px-4" to="/cadastro">Cadastro</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Aqui aparecem as páginas: Home, Sobre, etc -->
    <RouterView />
  </div>
</template>
