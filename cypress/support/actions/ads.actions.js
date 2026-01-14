// Cypress custom commands for bike ad actions

Cypress.Commands.add('gotoHomePage', () => {
  cy.visit('/')
  cy.title().should('contain', 'BikeBoard')
})

Cypress.Commands.add('clickAdvertiseLink', () => {
  cy.get('a').contains('Anunciar Grátis').click()
  cy.url().should('include', '/cadastrar')
  cy.get('h3').contains('Anunciar Bicicleta').should('be.visible')
})

Cypress.Commands.add('fillAdForm', (bikeData) => {
  cy.get('label').contains('Título do Anúncio *').parent().find('input').type(bikeData.title)
  cy.get('label').contains('Descrição Detalhada *').parent().find('textarea').type(bikeData.description)
  
  cy.get('select').select('Caloi', { force: true }) 
  
  cy.get('label').contains('Modelo *').parent().find('input').type(bikeData.model)
  cy.get('label').contains('Preço (R$) *').parent().find('input').type(bikeData.price.toString())
  cy.get('label').contains('Ano de Fabricação *').parent().find('input').type(bikeData.year.toString())  
  cy.get('label').contains('Seu Nome *').parent().find('input').type(bikeData.sellerName)
  cy.get('label').contains('WhatsApp *').parent().find('input').type(bikeData.whatsapp)
})

Cypress.Commands.add('submitAdForm', () => {
  cy.get('button').contains('Publicar Anúncio').click()
})

Cypress.Commands.add('alertMessage', (label, message) => {
  cy.get('label').contains(label).should('be.visible')
  cy.get('label').contains(label).parent().find('p.alert-message').should('contain.text', message)
})
