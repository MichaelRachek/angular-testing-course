


describe('Home Page', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/courses', { fixture: 'courses.json' })
      .as('courses');
    cy.visit('/');
  });

  it('should display a list of courses', () => {
    cy.contains('All Courses');
    cy.wait('@courses');
    cy.get('mat-card').should('have.length', 9);
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-mdc-tab').should('have.length', 2);
    cy.get('.mat-mdc-tab').eq(1).click();
  });
});






















