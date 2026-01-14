import { myBike } from '../fixtures/bike'

describe('Cadastro de Anúncio', () => {
  beforeEach(() => {
    cy.gotoHomePage()
    cy.clickAdvertiseLink()
  })

  it('deve cadastrar um anúncio com sucesso', () => {
    cy.setupAdCreationMock(myBike)
    cy.fillAdForm(myBike)
    cy.submitAdForm()

    cy.url().should('include', '/sucesso')
    cy.get('h3')
      .contains('Anúncio Enviado com Sucesso!')
      .should('be.visible')

    cy.contains('Obrigado por escolher o BikeBoard para anunciar sua bicicleta')
      .should('be.visible')

    cy.contains('Seu anúncio foi enviado para nossa equipe de moderação')
      .should('be.visible')
  })

  it('deve exibir erros para todos os campos obrigatórios não preenchidos', () => {
    cy.submitAdForm()

    const expectedAlerts = [
      "Título deve ter pelo menos 10 caracteres",
      "Descrição deve ter pelo menos 30 caracteres",
      "Marca é obrigatória",
      "Modelo é obrigatório",
      "Preço mínimo é R$ 100",
      "Nome é obrigatório",
      "WhatsApp inválido (formato: 11999999999)"
    ]

    expectedAlerts.forEach(msg => {
      cy.contains(msg).should('be.visible')
    })
  })

  it('deve exibir erro quando o WhatsApp tem formato inválido', () => {
    cy.fillAdForm({ ...myBike, whatsapp: "1111" })
    cy.submitAdForm()

    cy.contains('WhatsApp inválido (formato: 11999999999)').should('be.visible')
  })

  it('deve exibir erro quando o WhatsApp tem menos de 10 dígitos', () => {
    cy.fillAdForm({ ...myBike, whatsapp: "119999999" })
    cy.submitAdForm()

    cy.contains('WhatsApp deve ter 10 ou 11 dígitos').should('be.visible')
  })

  it('deve exibir erro quando a descrição tem menos de 30 caracteres', () => {
    cy.fillAdForm({ ...myBike, description: "Bike muito bonita!" })
    cy.submitAdForm()

    cy.contains('Descrição deve ter pelo menos 30 caracteres').should('be.visible')
  })

  it('deve mostrar erro quando o preço é menor que o R$ 100', () => {
    cy.fillAdForm({ ...myBike, price: 99 })
    cy.submitAdForm()
    cy.alertMessage("Preço (R$) *", "Preço mínimo é R$ 100")
  })
})
