/// <reference types="cypress" />

import { assertNever } from "@scullyio/scully/src/lib/utils";

describe('responsive-image optimization', () => {
  beforeEach(() => {
    cy.visit('http://localhost');
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
  })

  it('File upload should fail is file is greater than 5mb', () => {
    cy.get('input[type=file]').attachFile('image_5mb.jpg');

    cy.contains("5 mb").should('be.visible')
  })

  // it("Should send proper response after upload" , () => {

  //   cy.intercept({
  //     method: 'POST',
  //     url: '/*',
  //   }).as('optimize')

  //   cy.get('input[type=file]').attachFile('image_1mb.jpg');
  //   cy.get('button').contains("Optimize").click();

  //   cy.wait('@optimize', {timeout: 1000000}).then((interception) => {
  //     let response = interception.response;
  //     assert.isDefined(response);

  //     assert.equal(response?.statusCode, 200);

  //     assert.isDefined(response?.body?.data?.placeholder);
  //     assert.isDefined(response?.body?.data?.id);
  //   })
  // })

});
