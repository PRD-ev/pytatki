// https://docs.cypress.io/api/introduction/api.html

describe('Displays dashboard\'s h1', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Dashboard');
  });
});
