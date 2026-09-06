import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const stub = { template: '<div />' }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: stub },
    { path: '/sobre', name: 'Sobre', component: stub },
    { path: '/contato', name: 'Contato', component: stub },
    { path: '/teste-vocacional', name: 'TesteVocacional', component: stub },
    { path: '/login', name: 'Login', component: stub },
    { path: '/cadastro', name: 'Cadastro', component: stub },
    { path: '/paineldoaluno', name: 'Paineldoaluno', component: stub },
  ],
})

describe('App.vue', () => {
  let wrapper

  beforeEach(async () => {
    localStorage.clear()
    router.push('/')
    await router.isReady()
    wrapper = mount(App, { global: { plugins: [router] } })
  })

  it('renderiza header semântico com a navegação principal', () => {
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    const navLinks = wrapper.findAll('#primary-navigation .site-header__links a')
    expect(navLinks.map((a) => a.attributes('href'))).toEqual([
      '/',
      '/sobre',
      '/teste-vocacional',
      '/contato',
    ])
  })

  it('mostra ações de visitante quando ninguém está logado', () => {
    expect(wrapper.text()).toContain('Entrar')
    expect(wrapper.text()).toContain('Criar conta')
  })

  it('renderiza um rodapé <footer> com navegação e aviso de projeto', () => {
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.find('nav[aria-label="Rodapé — navegação"]').exists()).toBe(true)
    expect(footer.text()).toContain('portfólio')
  })

  it('tem um skip link para acessibilidade', () => {
    const skip = wrapper.find('a.ac-skip-link')
    expect(skip.exists()).toBe(true)
    expect(skip.attributes('href')).toBe('#conteudo')
  })

  it('renderiza o RouterView para o conteúdo da página', () => {
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })
})
