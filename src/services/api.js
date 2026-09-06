import axios from 'axios'

/**
 * Cliente HTTP único da aplicação.
 * A URL base vem de variável de ambiente (VITE_API_BASE_URL); o valor
 * abaixo é apenas um fallback para desenvolvimento com a API de mock.
 */
const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'https://6891f53f447ff4f11fbe838f.mockapi.io/api/revisao'

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
