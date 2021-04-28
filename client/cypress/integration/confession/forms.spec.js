describe("Service forms", () => {
  before(() => {
    cy.visit("localhost:3000/login");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get("button").contains("Login").click();
    cy.wait(5000);
  });

  beforeEach(() => {
    cy.visit("localhost:3000/confessions");
  });

  it("should to have button and open create service form", () => {
    cy.get("button").contains("Add").click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Create Confession");
  });

  it("should to open edit service form", () => {
    cy.get("button").contains("Edit").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper form h2").contains("Edit Confession");
  });

  it("should be able to delete paragraph", () => {
    cy.get("button").contains("Delete").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper h2").contains("Do you want to delete?");
  });
});
