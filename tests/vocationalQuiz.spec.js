import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import VocationalQuiz from '@/components/VocationalQuiz.vue'
import { riasecQuestions } from '@/data/riasec'

const factory = () => mount(VocationalQuiz, { global: { stubs: { RouterLink: RouterLinkStub } } })

describe('VocationalQuiz.vue', () => {
  beforeEach(() => localStorage.clear())

  it('começa na introdução e avança para as perguntas', async () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('modelo RIASEC')

    await wrapper.get('button.ac-btn').trigger('click')
    expect(wrapper.find('.quiz__progress').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe(riasecQuestions[0].texto)
  })

  it('bloqueia o avanço sem resposta e conclui mostrando um perfil', async () => {
    const wrapper = factory()
    await wrapper.get('button.ac-btn').trigger('click')

    for (let i = 0; i < riasecQuestions.length; i++) {
      const submit = wrapper.get('button[type="submit"]')
      expect(submit.attributes('disabled')).toBeDefined()

      await wrapper.get('input[type="radio"][value="4"]').setValue()
      await wrapper.get('form').trigger('submit.prevent')
    }

    expect(wrapper.text()).toContain('Seu perfil')
    expect(wrapper.text()).toContain('Áreas com mais afinidade')
    expect(JSON.parse(localStorage.getItem('resultadoVocacional'))).toHaveProperty('ranking')
  })
})
