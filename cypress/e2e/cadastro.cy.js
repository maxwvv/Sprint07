describe('Cadastro de usuário', () => {
  it('cadastra e redireciona para o login', () => {
    cy.novoUsuario().then((u) => {
      cy.visit('/cadastro')

      cy.get('input[placeholder="Nome completo"]').type(u.nome)
      cy.get('input[placeholder="E-mail"]').type(u.email)
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)

      cy.intercept('POST', '**/usuarios').as('postCadastro')
      cy.get('button[type="submit"]').click()

      cy.wait('@postCadastro').its('response.statusCode').should('eq', 201)
      cy.url().should('include', '/login')
      cy.contains('Cadastro concluído').should('be.visible')
    })
  })

  it('vai para o login pelo link do rodapé do formulário', () => {
    cy.visit('/cadastro')
    cy.contains('Já tem uma conta?').should('be.visible')
    cy.contains('a', 'Faça login').click()
    cy.url().should('include', '/login')
    cy.contains('h1', 'Entrar').should('be.visible')
  })

  it('bloqueia o envio com dados inválidos', () => {
    cy.visit('/cadastro')

    cy.get('input[placeholder="Nome completo"]').type('Ana')
    cy.get('input[placeholder="E-mail"]').type('emailinvalido.com')
    cy.get('input[placeholder="Usuário"]').type('ab')
    cy.get('input[placeholder="Senha"]').type('123')
    cy.get('button[type="submit"]').click()

    cy.contains('Informe um e-mail válido.').should('be.visible')
    cy.url().should('include', '/cadastro')
  })
})
