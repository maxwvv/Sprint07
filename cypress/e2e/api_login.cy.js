describe('API — consulta de usuário para login', () => {
  const API = 'https://6891f53f447ff4f11fbe838f.mockapi.io/api/revisao'

  it('encontra o usuário recém-criado ao filtrar por "usuario"', () => {
    cy.novoUsuario().then((u) => {
      cy.request('POST', `${API}/usuarios`, u).its('status').should('eq', 201)

      cy.request({
        method: 'GET',
        url: `${API}/usuarios`,
        qs: { usuario: u.usuario },
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array').and.have.length.greaterThan(0)
        expect(res.body[0].usuario).to.eq(u.usuario)
        expect(res.body[0].senha).to.eq(u.senha)
      })
    })
  })
})
