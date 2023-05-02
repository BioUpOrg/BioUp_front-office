describe('template spec', () => {
  it('AddPlant', () => {
   cy.visit('http://localhost:4000/')
    cy.viewport(1600, 1000)
    cy.get('[data-testid="LoginButton"]').click()
    cy.get('[data-testid="LoginEmailInput"]', { timeout: 5000 }).type("tarekayadi0@gmail.com", { force: true })
    cy.get('[data-testid="LoginPassInput"]').type("123456" ,{ force: true })
    cy.get('[data-testid="LoginButton2"]').click({ force: true })
    cy.wait(5000)
    cy.get('[data-testid="MyFarmNavButton"]').click()
    cy.wait(5000)
    cy.get('[data-testid="AddPlantButton"]').click({ force: true })
    cy.wait(5000)
    cy.contains('label', 'Name *').next().type('Carrot')
    cy.contains('label', 'scientificName').next().type('Carrot')
    cy.contains('label', 'quantity *').next().type('4')
    cy.get('[data-testid="AddPlantSubmitButton"]').click()


  })

  


})