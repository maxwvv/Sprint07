import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Contato from '@/views/Contato.vue'

vi.mock('@/services/api', () => ({
  default: { post: vi.fn(() => Promise.resolve({ data: {} })) },
}))

import api from '@/services/api'

describe('Contato.vue', () => {
  it('renderiza o título e o aviso de projeto demonstrativo', () => {
    const wrapper = mount(Contato)
    expect(wrapper.text()).toContain('Fale com a gente')
    expect(wrapper.text()).toContain('Projeto demonstrativo')
  })

  it('tem campos de nome, e-mail e mensagem', () => {
    const wrapper = mount(Contato)
    expect(wrapper.find('#contato-nome').exists()).toBe(true)
    expect(wrapper.find('#contato-email').exists()).toBe(true)
    expect(wrapper.find('textarea#contato-mensagem').exists()).toBe(true)
  })

  it('não envia e mostra erros de validação quando o formulário está vazio', async () => {
    const wrapper = mount(Contato)
    await wrapper.find('form').trigger('submit.prevent')

    expect(api.post).not.toHaveBeenCalled()
    expect(wrapper.findAll('.ac-error').length).toBeGreaterThan(0)
  })

  it('envia para a API quando os dados são válidos', async () => {
    const wrapper = mount(Contato)
    await wrapper.find('#contato-nome').setValue('Maxwell')
    await wrapper.find('#contato-email').setValue('max@email.com')
    await wrapper
      .find('#contato-mensagem')
      .setValue('Mensagem de teste com mais de dez caracteres.')

    await wrapper.find('form').trigger('submit.prevent')
    await Promise.resolve()

    expect(api.post).toHaveBeenCalledWith(
      '/mensagens',
      expect.objectContaining({ nome: 'Maxwell' }),
    )
  })
})
