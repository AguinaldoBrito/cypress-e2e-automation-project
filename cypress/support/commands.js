// Login reutilizável. Usa cy.session para fazer o login uma única vez
// e reaproveitar a sessão nos testes seguintes (mais rápido e estável).
//
// Uso: cy.login()            -> usuário padrão
//      cy.login('bloqueado') -> qualquer chave de cypress/fixtures/usuarios.json
Cypress.Commands.add('login', (tipo = 'padrao') => {
  cy.fixture('usuarios').then((usuarios) => {
    const { username, password } = usuarios[tipo]

    cy.session(['saucedemo', tipo], () => {
      cy.visit('/')
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password, { log: false })
      cy.get('[data-test="login-button"]').click()
      cy.url().should('include', '/inventory.html')
    })
  })
})
