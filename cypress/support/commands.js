import './actions/ads.actions'

Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('body').should('be.visible')
    cy.window().should('have.property', 'document')
})

Cypress.Commands.add('shouldBeVisibleWithText', (selector, text) => {
    cy.get(selector).should('be.visible').and('contain.text', text)
})
