describe('Login', () => {
  it('Access the site', () => {
    cy.visit('http://zedoingresso.com.br/');
  });

  it('Access the Login Page', () => {
    cy.contains('Logar').click();
  });

  it('Testing navigation to Register Page', () => {
    cy.get('.white').click();
    cy.go('back');
  });

  it('Testing navigation to Recover Password Page', () => {
    cy.get('.pass-recover').click();
    cy.go('back');
  });

  it('Trying to login without any data inserted', () => {
    cy.get('.login > [type="submit"]').click();
    cy.url().should('include', 'zedoingresso.com.br/login');
  });

  it('Trying to login with invalid credentials', () => {
    cy.get('.login > [name="email"]').type('ajskdhdfjkas');
    cy.get('.login > [type="submit"]').click();
    cy.url().should('include', 'zedoingresso.com.br/login');

    cy.get('[type="password"]').type('passasssasaskdjks');
    cy.get('.login > [type="submit"]').click();
    cy.url().should('include', 'zedoingresso.com.br/login');
  });

  it('Did the site show the message about invalid credentials?', () => {
    cy.get('.msg').should('be.visible');
  });

  it('Trying to login with a existing user and wrong pass', () => {
    cy.get('.login > [name="email"]')
      .clear()
      .type('contato@wilsonneto.com.br');
    cy.get('[type="password"]').type('passasssasaskdjks');
    cy.get('.login > [type="submit"]').click();
    cy.url().should('include', 'zedoingresso.com.br/login');
    cy.get('.msg').should('be.visible');
  });

  it('Trying to login with correct credentials', () => {
    cy.get('.login > [name="email"]')
      .clear()
      .type('contato@wilsonneto.com.br');
    cy.get('[type="password"]').type('123456');
    cy.get('.login > [type="submit"]').click();
    cy.url().should('not.include', 'zedoingresso.com.br/login');
  });
});
