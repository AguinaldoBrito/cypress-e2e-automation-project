describe('Compra', () => {
  const produto = 'Sauce Labs Backpack'

  // Localiza o card do produto na vitrine
  const cardDoProduto = () =>
    cy.contains('[data-test="inventory-item"]', produto)

  beforeEach(() => {
    cy.login()
    cy.visit('/inventory.html')
  })

  it('efetua uma compra de produto', () => {
    // Guarda o preço exibido na vitrine para conferir depois no checkout
    cardDoProduto()
      .find('[data-test="inventory-item-price"]')
      .invoke('text')
      .as('preco')

    cardDoProduto().find('button').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="inventory-item-name"]').should('have.text', produto)
    cy.get('[data-test="checkout"]').click()

    cy.fixture('cliente').then((cliente) => {
      cy.get('[data-test="firstName"]').type(cliente.nome)
      cy.get('[data-test="lastName"]').type(cliente.sobrenome)
      cy.get('[data-test="postalCode"]').type(cliente.cep)
    })
    cy.get('[data-test="continue"]').click()

    // Resumo do pedido: produto e preço devem bater com o que foi escolhido
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="inventory-item-name"]').should('have.text', produto)
    cy.get('@preco').then((preco) => {
      cy.get('[data-test="subtotal-label"]').should('contain.text', preco)
    })

    cy.get('[data-test="finish"]').click()

    cy.url().should('include', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]').should(
      'have.text',
      'Thank you for your order!'
    )
  })

  it('remove o produto do carrinho', () => {
    cardDoProduto().find('button').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

    cardDoProduto().find('button').click() // vira "Remove" e desfaz a adição
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('não avança no checkout sem preencher o nome', () => {
    cardDoProduto().find('button').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]').should(
      'contain.text',
      'First Name is required'
    )
    cy.url().should('include', '/checkout-step-one.html')
  })
})
