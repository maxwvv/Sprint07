import { beforeEach, vi } from 'vitest'

/**
 * Polyfill de localStorage para o ambiente de teste.
 * Alguns ambientes jsdom não expõem Storage; garantimos uma
 * implementação em memória e limpa entre os testes.
 */
function createStorage() {
  let store = {}
  return {
    getItem: vi.fn((key) => (key in store ? store[key] : null)),
    setItem: vi.fn((key, value) => {
      store[key] = String(value)
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    key: vi.fn((i) => Object.keys(store)[i] ?? null),
    get length() {
      return Object.keys(store).length
    },
  }
}

const storage = createStorage()

Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true })
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', { value: storage, configurable: true })
}

beforeEach(() => {
  storage.clear()
  vi.clearAllMocks()
})
