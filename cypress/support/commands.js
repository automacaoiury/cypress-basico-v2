Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Iury')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type("teste@exemplo.com")
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type("teste")
    cy.contains('button', 'Enviar').click()


})
