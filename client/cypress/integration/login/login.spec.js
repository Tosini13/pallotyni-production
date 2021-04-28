describe("News forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/login");
  });

  it("should to be able to login", () => {
    cy.contains("Log In");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get("button").contains("Login").click();
    cy.wait(1000);
  });
});
