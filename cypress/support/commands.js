/// <reference types="cypress" />

const API = 'https://6891f53f447ff4f11fbe838f.mockapi.io/api/revisao'

/**
 * Gera credenciais únicas para cada execução, evitando colisão de
 * "usuário já existe" na API de mock (que persiste entre execuções).
 */
Cypress.Commands.add('novoUsuario', () => {
  const sufixo = Date.now().toString().slice(-6)
  return cy.wrap(
    {
      nome: `Aluno Teste ${sufixo}`,
      email: `aluno${sufixo}@email.com`,
      usuario: `aluno${sufixo}`,
      senha: '123456',
    },
    { log: false },
  )
})

/** Cria o usuário diretamente na API (pré-condição para testes de login). */
Cypress.Commands.add('registrarViaApi', (usuario) => {
  return cy.request('POST', `${API}/usuarios`, usuario).its('status').should('eq', 201)
})
