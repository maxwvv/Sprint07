import { ref, computed, readonly } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const STORAGE_KEY = 'usuarioLogado'

/* ------------------------------------------------------------------ *
 * Estado singleton (escopo de módulo): compartilhado por toda a app.
 * ------------------------------------------------------------------ */
const usuarioLogado = ref(readStoredUser())
const erro = ref(null)
const carregando = ref(false)

const isAuthenticated = computed(() => usuarioLogado.value !== null)

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * GET que trata "nenhum registro" de forma uniforme.
 * A API de mock ora responde `[]` (200), ora `404` para filtros sem resultado.
 */
async function buscarUsuarios(params) {
  try {
    const { data } = await api.get('/usuarios', { params })
    return Array.isArray(data) ? data : []
  } catch (err) {
    if (err?.response?.status === 404) return []
    throw err
  }
}

function persistUser(user) {
  const publicUser = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    usuario: user.usuario,
  }
  usuarioLogado.value = publicUser
  localStorage.setItem(STORAGE_KEY, JSON.stringify(publicUser))
}

export function useAuth() {
  const router = useRouter()

  async function cadastrar({ nome, email, usuario, senha }) {
    carregando.value = true
    erro.value = null
    try {
      // Evita duplicidade de usuário antes de criar.
      const existentes = await buscarUsuarios({ usuario })
      if (existentes.some((u) => u.usuario === usuario)) {
        erro.value = 'Este nome de usuário já está em uso.'
        return false
      }

      await api.post('/usuarios', { nome, email, usuario, senha })
      await router.push({ path: '/login', query: { cadastro: 'ok' } })
      return true
    } catch (err) {
      console.error('Erro ao cadastrar:', err)
      erro.value = 'Não foi possível concluir o cadastro. Tente novamente em instantes.'
      return false
    } finally {
      carregando.value = false
    }
  }

  async function login({ usuario, senha }) {
    carregando.value = true
    erro.value = null
    try {
      // A senha NÃO é enviada na querystring (evita vazar em logs/histórico).
      // Autenticação real exige backend; aqui a checagem é feita no cliente
      // apenas porque a API de mock não possui endpoint de login.
      const data = await buscarUsuarios({ usuario })
      const encontrado = data.find((u) => u.usuario === usuario && u.senha === senha)

      if (!encontrado) {
        erro.value = 'Usuário ou senha incorretos.'
        return false
      }

      persistUser(encontrado)
      await router.push('/paineldoaluno')
      return true
    } catch (err) {
      console.error('Erro ao logar:', err)
      erro.value = 'Não foi possível fazer login. Verifique sua conexão e tente novamente.'
      return false
    } finally {
      carregando.value = false
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    usuarioLogado.value = null
    erro.value = null
    router.push('/login')
  }

  function limparErro() {
    erro.value = null
  }

  return {
    usuarioLogado: readonly(usuarioLogado),
    isAuthenticated,
    erro,
    carregando: readonly(carregando),
    cadastrar,
    login,
    logout,
    limparErro,
  }
}

/** Uso fora de componentes (ex.: guardas de rota). */
export function getAuthState() {
  return { isAuthenticated: usuarioLogado.value !== null, usuario: usuarioLogado.value }
}
