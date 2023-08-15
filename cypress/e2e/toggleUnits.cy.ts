/* eslint-disable eol-last */
describe('toggle units spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('[data-cy=search-input]').type('Bogota');
    cy.wait(2000);
    cy.get('[data-cy=search-result]').should('be.visible');
    cy.get('[data-cy="search-result"] > :nth-child(1)').click();
    cy.get('#unit-select').select('imperial');
    cy.get('#unit-select').select('metric');
  });
});
