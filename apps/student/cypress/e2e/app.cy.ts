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

  it('shoud navigate to register page', () => {
    cy.visit('/');

    cy.get('#register-btn').click();

    cy.url().should('include', '/auth/register');
  });

  it('should navigate to tutorial page', () => {
    cy.visit('/');

    cy.get('#tutorial').click();

    cy.url().should('include', '/tutorial');
  });

  it('should navigate to profile page', () => {
    cy.visit('/');

    cy.get('').click();

    cy.url().should('include', '/profile');
  });
});
