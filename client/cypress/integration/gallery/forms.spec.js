describe("Album forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/login");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get("button").contains("Login").click();
    cy.wait(1000);
    cy.visit("localhost:3000/gallery");
  });

  it("should to have button and open create Album form", () => {
    cy.get("button").contains("Add").click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Create Album");
  });

  it("should to open edit Album form", () => {
    cy.get("button").contains("Edit").click({ force: true });
    cy.get('img[action="true"]').first().click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Edit Album");
  });

  it("should be able to delete Album", () => {
    cy.get("button").contains("Delete").click({ force: true });
    cy.get('img[action="true"]').first().click({ force: true });
    cy.get(".MuiDialog-paper h2").contains("Do you want to delete?");
  });
});
