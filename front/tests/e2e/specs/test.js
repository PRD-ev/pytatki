// https://docs.cypress.io/api/introduction/api.html

describe('Test routes display', () => {
  it('Visits dashboard', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'dashboard');
  });
  it('Visits groups', () => {
    cy.get('a[href="/groups"]').click();
    cy.get('h1').should('contain', 'grupy');
    cy.contains('.group', 'Grupa Krzysia');
  });
  it('Visits group', () => {
    cy.get('a[href="/group"]').click();
    cy.get('h1').should('contain', 'grupa');
  });
  it('Displays "Grupa Krzysia" group', () => {
    cy.get('.pliki div').should('contain', 'Grupa Krzysia');
  });
  it('Visits settings', () => {
    cy.get('a[href="/settings"]').click();
    cy.get('h1').should('contain', 'ustawienia');
  });
  it('Edits note', () => {
    cy.get('a[href="/note"]').click();
    cy.get('.floating-button').click();
    cy.get('.ProseMirror').type('test');
    cy.get('.ProseMirror').should('contain', 'test');
  });
  it('Edits note', () => {
    cy.get('.menubar > :nth-child(12)').click();
    cy.get('.ProseMirror').should('not.contain', 'test');
  });
  it('Displays dashboard on logo click', () => {
    cy.get('.logo').click();
    cy.contains('h1', 'dashboard');
  });
});
