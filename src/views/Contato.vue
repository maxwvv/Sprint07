<template>
  <section class="ac-section">
    <div class="ac-container contato">
      <header class="section-head">
        <p class="ac-eyebrow">Contato</p>
        <h1 class="ac-section-title">Fale com a gente</h1>
        <p class="ac-section-lead">
          Dúvidas ou sugestões sobre a plataforma? Deixe uma mensagem pelo formulário abaixo.
        </p>
      </header>

      <form class="ac-card contato__form" novalidate @submit.prevent="enviar">
        <p class="contato__demo" role="note">
          Projeto demonstrativo: a mensagem é enviada para uma API de teste (MockAPI) apenas para
          exercitar o fluxo — nenhuma caixa de entrada é monitorada.
        </p>

        <div v-if="status === 'ok'" class="contato__alert contato__alert--ok" role="status">
          Mensagem registrada com sucesso. Obrigado pelo retorno!
        </div>
        <div v-if="status === 'erro'" class="contato__alert contato__alert--erro" role="alert">
          Não foi possível enviar agora. Tente novamente em alguns instantes.
        </div>

        <AppInput
          id="contato-nome"
          v-model="form.nome"
          label="Nome"
          autocomplete="name"
          required
          :error="erros.nome"
          @blur="validarCampo('nome')"
        />
        <AppInput
          id="contato-email"
          v-model="form.email"
          label="E-mail"
          type="email"
          autocomplete="email"
          required
          :error="erros.email"
          @blur="validarCampo('email')"
        />
        <AppInput
          id="contato-mensagem"
          v-model="form.mensagem"
          label="Mensagem"
          type="textarea"
          required
          :error="erros.mensagem"
          @blur="validarCampo('mensagem')"
        />

        <button type="submit" class="ac-btn ac-btn--block" :disabled="enviando">
          {{ enviando ? 'Enviando…' : 'Enviar mensagem' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import api from '@/services/api'

const form = reactive({ nome: '', email: '', mensagem: '' })
const erros = reactive({ nome: '', email: '', mensagem: '' })
const enviando = ref(false)
const status = ref(null) // null | 'ok' | 'erro'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validarCampo(campo) {
  if (campo === 'nome') {
    erros.nome = form.nome.trim().length < 2 ? 'Informe seu nome.' : ''
  }
  if (campo === 'email') {
    erros.email = emailRegex.test(form.email.trim()) ? '' : 'Informe um e-mail válido.'
  }
  if (campo === 'mensagem') {
    erros.mensagem =
      form.mensagem.trim().length < 10 ? 'A mensagem precisa de pelo menos 10 caracteres.' : ''
  }
}

function validarTudo() {
  ;['nome', 'email', 'mensagem'].forEach(validarCampo)
  return !erros.nome && !erros.email && !erros.mensagem
}

async function enviar() {
  status.value = null
  if (!validarTudo()) return

  enviando.value = true
  try {
    await api.post('/mensagens', {
      nome: form.nome.trim(),
      email: form.email.trim(),
      mensagem: form.mensagem.trim(),
      criadoEm: new Date().toISOString(),
    })
    status.value = 'ok'
    form.nome = ''
    form.email = ''
    form.mensagem = ''
  } catch {
    status.value = 'erro'
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.contato {
  max-width: 560px;
}
.section-head {
  margin-bottom: 2rem;
}
.contato__form {
  display: grid;
  gap: 0.25rem;
}
.contato__form .ac-btn {
  margin-top: 0.75rem;
}

.contato__demo {
  margin: 0 0 1.25rem;
  padding: 0.75rem 0.9rem;
  border-radius: var(--ac-radius-sm);
  background: var(--ac-primary-050);
  color: var(--ac-primary-700);
  font-size: 0.88rem;
  line-height: 1.5;
}

.contato__alert {
  border-radius: var(--ac-radius-sm);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}
.contato__alert--ok {
  background: #e7f6ef;
  color: var(--ac-success);
}
.contato__alert--erro {
  background: #fdecec;
  color: var(--ac-danger);
}
</style>
