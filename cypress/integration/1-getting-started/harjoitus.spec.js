/// <reference types="cypress" />


describe('makaronilaatikko', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })
  it('navigoi almamedian sivulla', () => {
    cy.visit('https://www.almamedia.fi/')
    cy.on('window:confirm', () => true);
    cy.contains('Palvelut').click()
    cy.contains('Tuotteet ja palvelut').click()
    cy.get('img[alt="Kotikokki_logo_370x370"]').scrollIntoView()
    cy.get('img[alt="Kotikokki_logo_370x370"]').click()
  })
  it('navigoi kotikokki.net sivulla', () => {
    cy.visit('https://www.kotikokki.net/')
    cy.wait(2000)
    cy.on('window:confirm', () => true);
    cy.get('#recipe-search-free-text').type(`makaronilaatikko`)
    cy.contains('Hae').click()
    cy.get('[type="radio"]').check('pasta')
    cy.get('form').find('[name="mainIngredients[mixedmeat]"]').check()
    cy.get('[data-search-element="recipe-item"]').first().click()
    cy.get('[data-view-element="add-ingredients"]').click()
    cy.get('#shoppinglist-handle').click()

    cy.writeFile('cypress/fixtures/test1.txt', 'Makaroonilaatikon Raaka-aineet:\n')
    cy.get('[data-shoppinglist-element="ingredient-name"]').each(($ingr) => {
      const ingredient = $ingr.text().replace(/[\r\n]/g, '').trim()
      cy.writeFile('cypress/fixtures/test1.txt', ingredient.replaceAll(/\s+/g, ' '), { flag: 'a+' })
      cy.writeFile('cypress/fixtures/test1.txt', '\n', { flag: 'a+' })})
  })
})






  // Test Shopping list
  // [Documentation]    Items in shopping list
  // [tags]      almamedia
  // Appstate    Almamedia
  // RunKeywordAndIgnoreError    ClickText   Hyväksy  timeout=5
  // ClickText   Palvelut
  // ClickText   Tuotteet ja palvelut
  // ClickText   Kotikokki.net
  // SwitchWindow  NEW
  // RunKeywordAndIgnoreError    ClickText   Salli sijainti  timeout=3
  // TypeText    Resepti tai raaka-aineen nimi...     makaroonilaatikko
  // ClickText   Hae
  // ClickText   Pastat ja nuudelit
  // ClickCheckbox   Makkara ja jauheliha  on
  // VerifyNoText    Hakuehdoillasi löytyi 0 reseptiä
  // ClickItem   Makaroonilaatikko
  // ClickText  Ostoslistalle
  // ClickItem  /ostoslista/
  // UseList            //*[@class\="ingredient-name"]
  // ${LIST}         GetList
  // FOR    ${item}    IN    @{LIST}
  //     LogToConsole    ${item}
  // END