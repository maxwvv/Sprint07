<template>
  <AuthLayout
    title="Criar conta"
    subtitle="Crie sua conta no Portal do Alvo Certo para começar a usar o teste vocacional e os recursos de estudo."
  >
    <form novalidate @submit.prevent="submitCadastro">
      <AppInput
        id="cad-nome"
        v-model="form.nome"
        label="Nome completo"
        placeholder="Nome completo"
        autocomplete="name"
        required
        :error="erros.nome"
        @blur="validar('nome')"
      />
      <AppInput
        id="cad-email"
        v-model="form.email"
        label="E-mail"
        placeholder="E-mail"
        type="email"
        autocomplete="email"
        required
        :error="erros.email"
        @blur="validar('email')"
      />
      <AppInput
        id="cad-usuario"
        v-model="form.usuario"
        label="Usuário"
        placeholder="Usuário"
        autocomplete="username"
        required
        :error="erros.usuario"
        @blur="validar('usuario')"
      />
      <AppInput
        id="cad-senha"
        v-model="form.senha"
        label="Senha"
        placeholder="Senha"
        type="password"
        autocomplete="new-password"
        required
        :error="erros.senha"
        @blur="validar('senha')"
      />

      <p v-if="erro" class="auth-msg auth-msg--erro" role="alert">{{ erro }}</p>

      <button type="submit" class="ac-btn ac-btn--block" :disabled="carregando">
        {{ carregando ? 'Cadastrando…' : 'Cadastrar' }}
      </button>
    </form>

    <template #footer>
      Já tem uma conta?
      <RouterLink to="/login" class="auth-link">Faça login</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { reactive } from 'vue'
import AuthLayout from '@/components/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useAuth } from '@/composables/useAuth'

const { cadastrar, erro, carregando } = useAuth()

const form = reactive({ nome: '', email: '', usuario: '', senha: '' })
const erros = reactive({ nome: '', email: '', usuario: '', senha: '' })

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar(campo) {
  if (campo === 'nome') {
    erros.nome = form.nome.trim().length < 3 ? 'Informe seu nome completo.' : ''
  }
  if (campo === 'email') {
    erros.email = emailRegex.test(form.email.trim()) ? '' : 'Informe um e-mail válido.'
  }
  if (campo === 'usuario') {
    erros.usuario =
      form.usuario.trim().length < 3 ? 'O usuário precisa de ao menos 3 caracteres.' : ''
  }
  if (campo === 'senha') {
    erros.senha = form.senha.length < 6 ? 'A senha precisa de ao menos 6 caracteres.' : ''
  }
}

function validarTudo() {
  ;['nome', 'email', 'usuario', 'senha'].forEach(validar)
  return !erros.nome && !erros.email && !erros.usuario && !erros.senha
}

function submitCadastro() {
  if (!validarTudo()) return
  cadastrar({
    nome: form.nome.trim(),
    email: form.email.trim(),
    usuario: form.usuario.trim(),
    senha: form.senha,
  })
}
</script>

<style scoped>
.auth-msg {
  border-radius: var(--ac-radius-sm);
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.auth-msg--erro {
  background: #fdecec;
  color: var(--ac-danger);
  margin-top: 0.25rem;
}
.auth-link {
  font-weight: 600;
  color: var(--ac-primary-600);
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
}
</style>
