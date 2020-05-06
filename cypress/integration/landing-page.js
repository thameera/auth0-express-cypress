describe('Landing page', () => {
  it('Shows header and Login button', () => {
    cy.visit('/')

    cy.get('h1').should('contain', 'Welcome to the App')

    cy.get('a').should('have.attr', 'href', '/login')
  })
})
