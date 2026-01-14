const ENABLE_MOCKS = true

Cypress.Commands.add('setupAdCreationMock', (bikeData) => {
  if (!ENABLE_MOCKS) return

  cy.intercept('POST', '**/anuncios', {
    statusCode: 201,
    body: {
      sucesso: true,
      mensagem: "Anúncio criado com sucesso!",
      anuncio: {
        id: 1,
        titulo: bikeData.title,
        descricao: bikeData.description,
        marca: bikeData.brand,
        modelo: bikeData.model,
        preco: bikeData.price,
        anoFabricacao: bikeData.year,
        nomeVendedor: bikeData.sellerName,
        whatsapp: bikeData.whatsapp,
        status: "em analise",
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      }
    }
  }).as('createAd')
})

