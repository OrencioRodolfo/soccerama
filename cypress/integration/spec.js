/* eslint-disable */
describe('Soccerama', function () {
  beforeEach(function () {
    cy.visit('localhost:8080')
  })

  context('Page title, logo and redirect to sportmonks', function () {
    it('Must have "Soccerama" as the page\'s title', function () {
      cy.title().should('include', 'Soccerama')
    })

    it('Must have the "sportmonks" logo', function () {
      cy.get('.sc-fjdhpX').should('exist')
    })

    it('Must redirect to "sportmonks" site when clicked', function () {
      cy.get('.sc-jTzLTM > a').should('have.attr', 'href').and('match', /w*(\www.sportmonks\.com)w*/)
    })
  })
  
  context('Standing list and search form', function () {
    it('Must have the standing list with several rows', function () {
      cy.get('tbody').should('exist')
      cy.get('tbody').children('tr').should('have.length.above', 1)
    })
    

    it('Must have the search form with values', function () {
      cy.get('#league').should('exist').and('have.attr', 'value').and('not.equal', '')
      cy.get('#season').should('exist').and('have.attr', 'value').and('not.equal', '')
    })
  })
  
  context('Perform search changing values in the search form', function () {
    it('Must have the standing list with several rows', function () {
      cy.get(':nth-child(1) > .MuiInput-root-20 > .MuiSelect-root-15 > .MuiSelect-select-16').click().then(() => {
        return cy.get('.MuiList-root-119 > [tabindex="-1"]').click()
      }).then(() => {
        cy.get(':nth-child(2) > .MuiInput-root-20 > .MuiSelect-root-15 > .MuiSelect-select-16').click()
      }).then(() => {
        cy.get('[value="1927"]').click()
      }).then(() => {
        cy.get('tbody').children('tr').should('have.length', 1)
      })
    })
  })
  
  context('Query team squad', function () {
    it('Must open an dialog', function () {
      cy.get(':nth-child(1) > :nth-child(2) > .sc-bdVaJa').click().then(() => {
        cy.get('.MuiDialogTitle-root-151').should('exist')
      })
    })
    
    it('Must present the team logo', function () {
      cy.get(':nth-child(1) > :nth-child(2) > .sc-bdVaJa').click().then(() => {
        cy.get('.MuiDialogContent-root-152').find('img').should('exist')
      })
    })
    
    it('Must present the team squad', function () {
      cy.get(':nth-child(1) > :nth-child(2) > .sc-bdVaJa').click().then(() => {
        cy.get(':nth-child(1) .player').should('have.length.gte', 1)
      })
    })
  })
})