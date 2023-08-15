/* eslint-disable eol-last */
describe('Mocked API spec', () => {
  it('passes', () => {
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/weather*', {
      fixture: 'weather.json',
    });
    cy.visit('/');
    cy.get('[data-cy=search-input]').type('La calera');
    cy.wait(2000);
    cy.get('[data-cy=search-result]').should('be.visible');
    cy.get('[data-cy="search-result-0"]').click();
    cy.get('[data-cy="search-result-0"]').click();
    cy.get('#unit-select').select('imperial');
    cy.get('#unit-select').select('metric');
    cy.get('[data-cy=weather-icon]').should('have.attr', 'src').should('include', 'Snowy');
  });
});
