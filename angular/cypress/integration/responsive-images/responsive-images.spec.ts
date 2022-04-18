/// <reference types="cypress" />

import { assertNever } from '@scullyio/scully/src/lib/utils';

describe('responsive-image optimization', () => {
  beforeEach(() => {
    cy.visit('http://localhost');

    cy.intercept({
      method: 'POST',
      url: '/api/image',
    }).as('optimize');
  });

  it('Get started brings form into view', () => {
    cy.contains('Get Started').should('be.visible');
  });

  it('Press get started should scroll to upload form', () => {
    cy.contains('Get Started').click();

    cy.contains('Upload').should('be.visible');
    cy.get('input[type=file]').isWithinViewport();
  });

  it('File upload should work', () => {
    cy.get('input[type=file]').attachFile('image_1mb.jpg');
  });

  it('File upload should fail is file is greater than 5mb', () => {
    cy.get('input[type=file]').attachFile('image_5mb.jpg');

    cy.contains('5 mb').should('be.visible');
  });

  it('Should send proper response after upload', () => {
    cy.get('input[type=file]').attachFile('image_1mb.jpg');

    // This time out is important because there is the delay between the file upload and the time at which the buttons is clickable;
    cy.wait(100);
    cy.contains('button', 'Optimize').click();

    cy.wait('@optimize').then((interception) => {
      let response = interception.response;
      assert.isDefined(response);

      assert.equal(response?.statusCode, 200);

      assert.isDefined(response?.body?.data?.placeholder);
      assert.isDefined(response?.body?.data?.id);
    });
  });

  it('File should be accessible after upload', () => {
    cy.get('input[type=file]').attachFile('image_1mb.jpg');

    cy.wait(100);
    cy.get('button')
      .contains(/optimize/i)
      .click();

    cy.wait('@optimize');

    cy.contains('a', /download/i)
      .should('exist')
      .invoke('attr', 'href')
      .then((href) => {
        cy.log(href || ' ');
        assert.isDefined(href);

        cy.request(href as string)
          .its('status')
          .should('eq', 200);
      });
  });
});
