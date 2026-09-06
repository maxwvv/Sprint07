import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { RouterLinkStub } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { features } from '@/data/features'

const mountHome = () =>
  mount(Home, {
    global: { stubs: { RouterLink: RouterLinkStub } },
  })

describe('Home.vue (landing page)', () => {
  it('exibe o título principal do hero', () => {
    const wrapper = mountHome()
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('tiro no escuro')
  })

  it('renderiza um card para cada recurso da plataforma', () => {
    const wrapper = mountHome()
    const cards = wrapper.findAll('.feature-card')
    expect(cards.length).toBe(features.length)
    features.forEach((f) => {
      expect(wrapper.text()).toContain(f.title)
    })
  })

  it('mostra a seção "Como funciona" com 3 passos', () => {
    const wrapper = mountHome()
    expect(wrapper.findAll('.how__step').length).toBe(3)
  })

  it('leva o visitante ao teste vocacional pelo CTA', () => {
    const wrapper = mountHome()
    const ctas = wrapper
      .findAllComponents(RouterLinkStub)
      .filter((link) => link.props('to') === '/teste-vocacional')
    expect(ctas.length).toBeGreaterThan(0)
  })
})
