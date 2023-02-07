describe('navigation', () => {
  beforeEach(() => {
    cy.clearCookie('next-auth.session-token');
  });

  it('shoud navigate to login page via `quick start` button', () => {
    cy.visit('/');

    cy.get('#quick-start').click();

    cy.url().should('include', '/auth/login');
  });

  it('shoud navigate to login page via `login` button', () => {
    cy.visit('/');

    cy.get('#login-btn').click();

    cy.url().should('include', '/auth/login');
  });

  it('shoud navigate to login page', () => {});
});
