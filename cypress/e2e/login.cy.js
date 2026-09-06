describe('Login', () => {
  it('loga com sucesso e vai para o painel do aluno', () => {
    cy.novoUsuario().then((u) => {
      cy.registrarViaApi(u)

      cy.visit('/login')
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)

      cy.intercept('GET', '**/usuarios*').as('getLogin')
      cy.get('button[type="submit"]').click()

      cy.wait('@getLogin').its('response.statusCode').should('eq', 200)
      cy.url().should('include', '/paineldoaluno')
      cy.contains('Olá,').should('be.visible')
    })
  })

  it('vai para o cadastro pelo link', () => {
    cy.visit('/login')
    cy.contains('Não possui cadastro?').should('be.visible')
    cy.contains('a', 'Clique aqui').click()
    cy.url().should('include', '/cadastro')
    cy.contains('h1', 'Criar conta').should('be.visible')
  })

  it('mostra mensagem de erro com credenciais inválidas', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Usuário"]').type('usuario-inexistente-xyz')
    cy.get('input[placeholder="Senha"]').type('senhaerrada')

    cy.intercept('GET', '**/usuarios*').as('getLogin')
    cy.get('button[type="submit"]').click()

    cy.wait('@getLogin')
    cy.contains('Usuário ou senha incorretos').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('protege o painel do aluno de acesso sem login', () => {
    cy.visit('/paineldoaluno')
    cy.url().should('include', '/login')
    cy.url().should('include', 'redirect')
  })
})
