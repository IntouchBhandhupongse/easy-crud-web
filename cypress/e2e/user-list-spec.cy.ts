import Chance from 'chance'
const chance = new Chance();

describe('User List', () => {
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

  describe('Filter Test', () => {

    describe('Filter Name', () => {
      it('test with TEST', () => {
        cy.get('[formcontrolname="name"]').type("test", { force: true });
        cy.get('td.mat-column-full_name').contains('test', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with in', () => {
        cy.get('[formcontrolname="name"]').type("in", { force: true });
        cy.get('td.mat-column-full_name').contains('in', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with OFF', () => {
        cy.get('[formcontrolname="name"]').type("OFF", { force: true });
        cy.get('td').not('.mat-column-full_name');
        expect(1).to.equal(1);
      });
    });

    describe('Filter Email', () => {
      it('test with TEST', () => {
        cy.get('[formcontrolname="email"]').type("test", { force: true });
        cy.get('td.mat-column-email').contains('test', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with in', () => {
        cy.get('[formcontrolname="email"]').type("in", { force: true });
        cy.get('td.mat-column-email').contains('in', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with OFF', () => {
        cy.get('[formcontrolname="email"]').type("OFF", { force: true });
        cy.get('td').not('.mat-column-email');
        expect(1).to.equal(1);
      });
    });

    describe('Filter Tel', () => {
      it('test with 081', () => {
        cy.get('[formcontrolname="tel"]').type("081", { force: true });
        cy.get('td.mat-column-tel').contains('081', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with 111', () => {
        cy.get('[formcontrolname="tel"]').type("111", { force: true });
        cy.get('td.mat-column-tel').contains('111', { matchCase: false });
        expect(1).to.equal(1);
      });

      it('test with OFF', () => {
        cy.get('[formcontrolname="tel"]').type("OFF", { force: true });
        cy.get('td').not('.mat-column-tel');
        expect(1).to.equal(1);
      });
    });

    describe('Filter Department', () => {
      it('test with Department', () => {
        cy.get('[formcontrolname="department"]').click();
        cy.get('mat-option').contains('Developer').click();
        cy.get('td.mat-column-department').contains('Developer');

        expect(1).to.equal(1);
      });
    });
  });

  describe('Button Test', () => {

    it('Clear Button', () => {
      cy.get('[formcontrolname="name"]').type("in", { force: true });
      cy.get('[formcontrolname="email"]').type("in", { force: true });
      cy.get('[formcontrolname="tel"]').type("in", { force: true });
      cy.get('[formcontrolname="department"]').type("in", { force: true });
      cy.get('#clear_button').click({ force: true });
      expect(1).to.equal(1);
      cy.get('[formcontrolname="name"]').should('not.have.value');
      cy.get('[formcontrolname="email"]').should('not.have.value');
      cy.get('[formcontrolname="tel"]').should('not.have.value');
      cy.get('[formcontrolname="department"]').should('not.have.value');
    });

    describe('Add Button', () => {
      it('Open Dialog', () => {
        cy.get('#add_button').click();
        cy.get('h2').should('contain.text','Add User');
        expect(1).to.equal(1);
      });
    });
    
    describe('Edit Button', () => {
      it('Open Dialog', () => {
        cy.get('[id^="edit_button_"]').last().click();
        cy.get('h2').should('contain.text','Edit User');
        expect(1).to.equal(1);
      });
    });

    describe('Delete Button', () => {
      it('Open Swal', () => {
        cy.get('[id^="del_button_"]').last().click();
        cy.get('.swal2-html-container').contains('1 user');
        expect(1).to.equal(1);
      });
    });

    describe('Delete List Button', () => {
      it('Open Swal', () => {
        cy.wait(1000);
        cy.get('#mat-mdc-checkbox-1-input').click();
        cy.get('#deletelist_button').click();
        cy.get('.swal2-html-container').contains('users');
        expect(1).to.equal(1);
      });
    });
  });
});