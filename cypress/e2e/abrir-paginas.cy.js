describe('Navegação principal do site', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('abre a Home com o hero e a navegação', () => {
    cy.contains('h1', 'tiro no escuro')
    cy.get('header nav').should('exist')
    cy.contains('a', 'Fazer o teste vocacional').should('be.visible')
  })

  it('navega para a página Sobre', () => {
    cy.get('#primary-navigation').contains('a', 'Sobre').click()
    cy.url().should('include', '/sobre')
    cy.contains('Nossa missão')
    cy.contains('O que oferecemos')
  })

  it('navega para o Teste Vocacional', () => {
    cy.get('#primary-navigation').contains('a', 'Teste vocacional').click()
    cy.url().should('include', '/teste-vocacional')
    cy.contains('modelo RIASEC')
    cy.contains('button', 'Começar o teste').should('be.visible')
  })

  it('navega para Contato', () => {
    cy.get('#primary-navigation').contains('a', 'Contato').click()
    cy.url().should('include', '/contato')
    cy.contains('Fale com a gente')
    cy.get('#contato-email').should('exist')
  })

  it('navega para Login', () => {
    cy.get('header').contains('a', 'Entrar').click()
    cy.url().should('include', '/login')
    cy.get('input[placeholder="Usuário"]').should('exist')
    cy.get('input[placeholder="Senha"]').should('exist')
    cy.contains('Não possui cadastro?').should('exist')
  })

  it('navega para Cadastro', () => {
    cy.get('header').contains('a', 'Criar conta').click()
    cy.url().should('include', '/cadastro')
    cy.contains('Crie sua conta no Portal do Alvo Certo').should('exist')
    cy.get('input[placeholder="Nome completo"]').should('exist')
    cy.get('input[placeholder="E-mail"]').should('exist')
    cy.get('input[placeholder="Usuário"]').should('exist')
    cy.get('input[placeholder="Senha"]').should('exist')
    cy.contains('Já tem uma conta?').should('exist')
  })

  it('mostra a página 404 em rota inexistente', () => {
    cy.visit('/rota-que-nao-existe', { failOnStatusCode: false })
    cy.contains('Página não encontrada')
    cy.contains('a', 'Voltar para o início').click()
    cy.url().should('match', /\/$/)
  })
})
