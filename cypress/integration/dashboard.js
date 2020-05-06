describe('Dashboard', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard')
  })

  it('Shows dashboard contents', () => {
    cy.get('h1').should('contain', 'You are now logged in')

    cy.get('.email').should('contain', 'Your email is: me@thameera.com')
  })

  it('Should log out when Logout button is clicked', () => {
    cy.get('a').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/')
    cy.getCookie('appSession').should('not.exist')
  })
})
