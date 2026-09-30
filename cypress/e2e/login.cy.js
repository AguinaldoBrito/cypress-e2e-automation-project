describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('realiza login com usuário válido', () => {
    cy.fixture('usuarios').then(({ padrao }) => {
      cy.get('[data-test="username"]').type(padrao.username)
      cy.get('[data-test="password"]').type(padrao.password, { log: false })
      cy.get('[data-test="login-button"]').click()
    })

    cy.url().should('include', '/inventory.html')
    cy.get('[data-test="title"]').should('have.text', 'Products')
  })

  it('exibe erro ao informar senha inválida', () => {
    cy.fixture('usuarios').then(({ padrao }) => {
      cy.get('[data-test="username"]').type(padrao.username)
      cy.get('[data-test="password"]').type('senha_errada', { log: false })
      cy.get('[data-test="login-button"]').click()
    })

    cy.get('[data-test="error"]').should(
      'contain.text',
      'Username and password do not match'
    )
    cy.url().should('not.include', '/inventory.html')
  })

  it('bloqueia o acesso de usuário bloqueado', () => {
    cy.fixture('usuarios').then(({ bloqueado }) => {
      cy.get('[data-test="username"]').type(bloqueado.username)
      cy.get('[data-test="password"]').type(bloqueado.password, { log: false })
      cy.get('[data-test="login-button"]').click()
    })

    cy.get('[data-test="error"]').should('contain.text', 'locked out')
    cy.url().should('not.include', '/inventory.html')
  })
})
