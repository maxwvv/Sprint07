<template>
  <AuthLayout
    title="Entrar"
    subtitle="Bem-vindo de volta ao Portal do Alvo Certo, sua plataforma de apoio educacional."
  >
    <p v-if="cadastroOk" class="auth-msg auth-msg--ok" role="status">
      Cadastro concluído! Faça login para acessar seu painel.
    </p>

    <form novalidate @submit.prevent="submitLogin">
      <AppInput
        id="login-usuario"
        v-model="usuario"
        label="Usuário"
        placeholder="Usuário"
        autocomplete="username"
        required
      />
      <AppInput
        id="login-senha"
        v-model="senha"
        label="Senha"
        placeholder="Senha"
        type="password"
        autocomplete="current-password"
        required
      />

      <p v-if="erro" class="auth-msg auth-msg--erro" role="alert">{{ erro }}</p>

      <button type="submit" class="ac-btn ac-btn--block" :disabled="carregando">
        {{ carregando ? 'Entrando…' : 'Entrar' }}
      </button>
    </form>

    <template #footer>
      Não possui cadastro?
      <RouterLink to="/cadastro" class="auth-link">Clique aqui</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/components/AuthLayout.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { login, erro, carregando, limparErro } = useAuth()

const usuario = ref('')
const senha = ref('')
const cadastroOk = computed(() => route.query.cadastro === 'ok')

watch([usuario, senha], limparErro)

function submitLogin() {
  login({ usuario: usuario.value.trim(), senha: senha.value })
}
</script>

<style scoped>
.auth-msg {
  border-radius: var(--ac-radius-sm);
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.auth-msg--ok {
  background: #e7f6ef;
  color: var(--ac-success);
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
