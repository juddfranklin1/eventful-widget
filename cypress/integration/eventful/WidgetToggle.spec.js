/// <reference types="Cypress" />
// import WidgetToggle from '../../client/components/WidgetToggle';
// import React from 'react';
// import { mount } from 'cypress-react-unit-test';

describe('Widget toggle tab behavior', () => {
    before(()=> {
        cy.visit('/');
    });
    context('WidgetToggle', () => {
        it('should be visible', function() {
            cy.get('.eventful-toggle-tab')
                .should('be.visible');
        });
        it('should default to hidden', function() {
            cy.get('.eventful-toggle-tab a')
                .should('contain', 'show eventful')
                .get('.eventful-container')
                .should('have.class','hidden');
        });
        it('should toggle to visible', function() {
            cy.get('.eventful-toggle-tab a')
                .trigger('click')
                .should('contain', 'hide eventful')
                .trigger('click');
        });
        it('should toggle back to hidden', function() {
            cy.get('.eventful-toggle-tab a')
                .should('contain', 'show eventful');
        });
    });
});

