/// <reference types="cypress" />


describe('Makaronilaatikko Cypressilta Robotille', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })


  it('navigoi almamedian sivulla', () => {
    cy.visit('https://www.almamedia.fi/')
    cy.get('body').then((body) => {
      if (body.find('#almacmp-modalConfirmBtn').length > 0) {
          cy.get('#almacmp-modalConfirmBtn').click()
      }
    })
    cy.contains('Palvelut').click()
    cy.contains('Tuotteet ja palvelut').click()
    cy.get('img[alt="Kotikokki_logo_370x370"]').scrollIntoView()
    // cy.get('img[alt="Kotikokki_logo_370x370"]').click()


  })
  it.only('navigoi kotikokki.net sivulla', () => {
    cy.visit('https://www.kotikokki.net/')
    cy.get('body').then((body) => {
      if (body.find('#almacmp-modalConfirmBtn').length > 0) {
          cy.get('#almacmp-modalConfirmBtn').click()
      }
    })
    cy.get('#recipe-search-free-text').type(`makaronilaatikko`)
    cy.contains('Hae').click()
    cy.get('[type="radio"]').check('pasta')
    cy.get('form').find('[name="mainIngredients[mixedmeat]"]').check()
    cy.wait(2000)
    const link = cy.get('[data-search-element="recipe-item"]').first()
    link.click()
    cy.get('[data-view-element="add-ingredients"]').click()
    cy.get('#shoppinglist-handle').click()

    const now = new Date().getTime()
    cy.writeFile('cypress/fixtures/test.txt', 'timestamp=' + now + '\nMakaroonilaatikon Raaka-aineet:\n')
    cy.get('[data-shoppinglist-element="ingredient-name"]').each(($ingr) => {
      const ingredient = $ingr.text().replace(/[\r\n]/g, '').trim()
      cy.writeFile('cypress/fixtures/test.txt', ingredient.replaceAll(/\s+/g, ' '), { flag: 'a+' })
      cy.writeFile('cypress/fixtures/test.txt', '\n', { flag: 'a+' })})
  })
})
