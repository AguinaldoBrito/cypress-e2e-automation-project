// Login reutilizável pela interface.
// Termina na página de produtos (/inventory.html), que só é acessível
// depois do login (o site não permite abrir essa URL diretamente).
//
// Uso: cy.login()            -> usuário padrão
//      cy.login('bloqueado') -> qualquer chave de cypress/fixtures/usuarios.json
Cypress.Commands.add('login', (tipo = 'padrao') => {
  cy.fixture('usuarios').then((usuarios) => {
    const { username, password } = usuarios[tipo]

    cy.visit('/')
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password, { log: false })
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })
})
