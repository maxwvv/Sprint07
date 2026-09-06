describe('Fluxo completo: cadastro, login e painel do aluno', () => {
  it('cadastra pela interface, faz login e acessa o painel', () => {
    cy.novoUsuario().then((u) => {
      // 1. Cadastro pela interface
      cy.visit('/cadastro')
      cy.get('input[placeholder="Nome completo"]').type(u.nome)
      cy.get('input[placeholder="E-mail"]').type(u.email)
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/login')

      // 2. Login
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)
      cy.get('button[type="submit"]').click()

      // 3. Painel
      cy.url({ timeout: 10000 }).should('include', '/paineldoaluno')
      cy.contains('Olá,').should('be.visible')
      cy.contains(u.nome.split(' ')[0]).should('be.visible')
      cy.contains('button', 'Técnicas de estudo').should('be.visible')
    })
  })

  it('navega entre as seções e persiste a seção ativa', () => {
    cy.novoUsuario().then((u) => {
      cy.registrarViaApi(u)
      cy.visit('/login')
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/paineldoaluno')

      cy.contains('button', 'Teste vocacional').click()
      cy.contains('modelo RIASEC').should('be.visible')

      cy.reload()
      cy.contains('modelo RIASEC').should('be.visible')
    })
  })

  it('permite sair e bloqueia novo acesso ao painel', () => {
    cy.novoUsuario().then((u) => {
      cy.registrarViaApi(u)
      cy.visit('/login')
      cy.get('input[placeholder="Usuário"]').type(u.usuario)
      cy.get('input[placeholder="Senha"]').type(u.senha)
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/paineldoaluno')

      cy.get('.painel__logout').click()
      cy.url().should('include', '/login')

      cy.visit('/paineldoaluno')
      cy.url().should('include', '/login')
    })
  })
})
