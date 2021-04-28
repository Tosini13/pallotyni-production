describe("Paragraphs forms", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  it("should to have title and tiles", () => {
    cy.contains("Parafia p.w. św. Jana Ewangelisty w Szczecinie");
    // cy.contains('NAJNOWSZE ALBUMY');
    // cy.contains('MSZE ŚW.');
    // cy.contains('NAJNOWSZE WYDARZENIA');
    // cy.contains('SPOWIEDŹ');
  });

  // it('should to have button and open create paragraph form', () => {
  //     cy.contains('About us');
  //     cy.get('button.MuiFab-root[tabindex="0"]').click();
  //     cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(1)').click();
  //     cy.get('.MuiDialog-paper form h2').contains('Create Paragraph');
  // })

  // it('should to open edit paragraph form', () => {
  //     cy.contains('About us');
  //     cy.get('button.MuiFab-root[tabindex="0"]').click();
  //     cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(2)').click();
  //     cy.get('div[edition="true"]:nth-child(3)').click();
  //     cy.get('.MuiDialog-paper form h2').contains('Edit Paragraph');
  // })

  // it('should be able to delete paragraph', () => {
  //     cy.contains('About us');
  //     cy.get('button.MuiFab-root[tabindex="0"]').click();
  //     cy.get('button.MuiFab-root[tabindex="-1"]:nth-child(3)').click();
  //     cy.get('div[edition="true"]:nth-child(3)').click();
  //     cy.get('.MuiDialog-paper h2').contains('Do you want to delete?');
  // })
});
