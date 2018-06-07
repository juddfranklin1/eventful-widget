/// <reference types="Cypress" />

beforeEach(()=> {
     // root url set in cypress.json


})

describe('Widget navbar behavior', () => {
    before(()=> {
        cy.visit('/');
    })    
    context('Navbar will navigate', () => {
        
        it('should be visible', function() {
            cy.get('.eventful-toggle-tab a')
            .trigger('click'); // make sure that the toggle is triggered.

            cy.get('.eventful-navigation')
                .should('be.visible');
        });
        
        it('should have an overview tab',function(){
            cy.get('#tracker-link')
                .should('be.visible');
        });
        
        it('Overview tab should be active by default',function(){
            cy.get('#tracker-link')
                .trigger('click');
            cy.get('.eventful-navigation')
                .should('have.class','tracker');
        });
        
        it('should have an Add Tracking tab',function(){
            cy.get('#add-link')
            .should('be.visible');
        });
        
        it('Add Tracking tab should become active on click',function(){
            cy.get('#add-link')
                .trigger('click');
            cy.get('.eventful-navigation')
                .should('have.class','add');
        });
        
        it('should have an Options tab',function(){
            cy.get('#options-link')
            .should('be.visible');
        });
        
        it('Options tab should become active on click',function(){
            cy.get('#options-link')
                .trigger('click');
            cy.get('.eventful-navigation')
                .should('have.class','options');
        });

        it('Overview tab should become active on click',function(){
            cy.get('#tracker-link')
                .trigger('click');
            cy.get('.eventful-navigation')
                .should('have.class','tracker');
        });
    });
});

