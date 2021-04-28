describe("Service forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/services");
  });

  it("should to have button and open create service form", () => {
    cy.contains("Service");
    cy.get("button").contains("Add").click({ force: true });
    cy.get(".MuiDialog-paper form h2").contains("Create Service");
  });

  it("should to open edit service form", () => {
    cy.contains("Service");
    cy.get("button").contains("Edit").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper form h2").contains("Edit Service");
  });

  it("should be able to delete paragraph", () => {
    cy.contains("Service");
    cy.get("button").contains("Delete").click({ force: true });
    cy.get('p[selectable="true"]').first().click();
    cy.get(".MuiDialog-paper h2").contains("Do you want to delete?");
  });
});
