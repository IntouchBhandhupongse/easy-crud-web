import Chance from 'chance'
const chance = new Chance();

describe('User Detail', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Should route to /users', () => {
    cy.url().should('include', '/users')
  });

  it('Has a Title', () => {
    cy.contains('User Management');
    expect(1).to.equal(1);
  });

  describe('Add Dialog', () => {
    
    beforeEach(() => {
      cy.get('#add_button').click();
    });

    it('Test Fail Case (Empty)', () => {
      cy.get('#save_bt').click();
      cy.get('button.swal2-confirm').click();
      cy.get('.swal2-title').contains('Please fill out completely and correctly.');

      // ESC
      cy.wait(500);
      cy.get('body').trigger('keydown', { keyCode: 27});
      cy.wait(500);
      cy.get('body').trigger('keyup', { keyCode: 27});
    });

    it('Test Fail Case (Forget F_Name L_Name)', () => {
      cy.get('#form_email').type("test@test.com", { force: true });
      cy.get('#form_tel').type("1111111111", { force: true });
      cy.get('#form_department').click({ force: true });
      cy.get('mat-option').contains('Developer').click();
      cy.get('#save_bt').click();
      cy.get('.swal2-title').contains('Please fill out completely and correctly.');

      // ESC
      cy.wait(500);
      cy.get('body').trigger('keydown', { keyCode: 27});
      cy.wait(500);
      cy.get('body').trigger('keyup', { keyCode: 27});
    });

    it('Test Fail Case (False Email)', () => {
      cy.get('#form_first_name').type("test", { force: true });
      cy.get('#form_last_name').type("test", { force: true });
      cy.get('#form_email').type("test@", { force: true });
      cy.get('#form_tel').type("1111111111", { force: true });
      cy.get('#form_department').click({ force: true });
      cy.get('mat-option').contains('Developer').click();
      cy.get('#save_bt').click();
      cy.get('.swal2-title').contains('Please fill out completely and correctly.');
      
      // ESC
      cy.wait(500);
      cy.get('body').trigger('keydown', { keyCode: 27});
      cy.wait(500);
      cy.get('body').trigger('keyup', { keyCode: 27});
    });

    it('Test Pass Case', () => {
      cy.get('#form_first_name').type("test", { force: true });
      cy.get('#form_last_name').type("test", { force: true });
      cy.get('#form_email').type("test@test.com", { force: true });
      cy.get('#form_tel').type("1111111111", { force: true });
      cy.get('#form_department').click({ force: true });
      cy.get('mat-option').contains('Developer').click();
      cy.get('#save_bt').click();
      cy.get('button.swal2-confirm').click();
      cy.get('.swal2-title').contains('Success');
    });
  });
});