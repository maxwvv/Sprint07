describe('API — criação de usuário', () => {
  it('cria um usuário e retorna 201 com id', () => {
    cy.novoUsuario().then((u) => {
      cy.request(
        'POST',
        'https://6891f53f447ff4f11fbe838f.mockapi.io/api/revisao/usuarios',
        u,
      ).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body).to.have.property('id')
        expect(res.body.usuario).to.eq(u.usuario)
      })
    })
  })
})
