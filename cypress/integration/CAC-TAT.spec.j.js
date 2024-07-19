/// <reference types="Cypress" />






describe('Central de Atendimento ao Cliente TAT', function() {
 beforeEach(function(){
  cy.visit('./src/index.html')

 })
 

    it('verifica o título da aplicação', function() {
cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'teste teste teste teste teste teste teste teste'
      cy.get('#firstName').type('Iury')
      cy.get('#lastName').type('Amorim')
      cy.get('#email').type("teste@exemplo.com")
      //cy.get('#email-checkbox').click()
      cy.get('#open-text-area').type(longText, { delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('not.be.visible')
    })


    it('exibe mensagem de erro ao submeter o formulario com email invalido', function() {
    cy.get('#firstName').type('Iury')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type("teste@exemplo,com")
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type("teste")
    cy.contains('button', 'Enviar').click()


    cy.get('.error').should('not.be.visible')
  }) 
  
  it('campo telefone continua vazio quando preenchido com valor não numerico', function() {
    cy.get('#phone')
    .type('abcdefg')
    .should("have.value", '')



  })
  
   
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Iury')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type("teste@exemplo,com")
    //cy.get('#email-checkbox').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("teste")
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('not.be.visible')


  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    //nome
    cy.get('#firstName').type('Iury')
    .should("have.value", 'Iury')
    .clear()
    .should("have.value", '')
    //sobrenome
    cy.get('#lastName').type('Amorim')
    .should("have.value", 'Amorim')
    .clear()
    .should("have.value", '')
    //email
    cy.get('#email').type('teste@exemplo.com')
    .should("have.value", 'teste@exemplo.com')
    .clear()
    .should("have.value", '')
    //telefone
    cy.get('#phone').type('123456789')
    .should("have.value", '123456789')
    .clear()
    .should("have.value", '')

  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
cy.fillMandatoryFieldsAndSubmit()

cy.get('.success').should('not.be.visible')

  })

  it('Selecionar o produto (YouTube) pelo seu texto ', function() {
 cy.get('#product')
 .select('YouTube')
 .should("have.value", 'youtube')


  })

  it('Selecionar o produto (Mentoria) pelo seu (value) ', function() {
    cy.get('#product')
    .select('mentoria')
    .should("have.value", 'mentoria')
   
   
     })
     it('Selecionar o produto (Blog) pelo seu (indice) ', function() {
      cy.get('#product')
      .select(1)
      .should("have.value", 'blog')
     

})
it('marcar o tipo de atendimento (feedback) ', function() {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should("have.value", 'feedback')
 

})
it('marcar cada de atendimento ', function() {
  cy.get('input[type="radio"]')
  .should("have.length", 3)
  .each(function($radio) {
cy.wrap($radio).check()
cy.wrap($radio).should('be.checked')
})
  })

  it('marca ambos checkboxes, depois desmarca o último ', function() {

    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
   .should('not.be.not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures ', function() {
    //cy.get('input[type="file"]')
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  
  })
  it('seleciona um arquivo simulando um drag-and-drop ', function() {
    //cy.get('input[type="file"]')
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias ', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(function($input) {
    expect($input[0].files[0].name).to.equal('example.json')
    })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')


      }) 

      it('acessa a página da política de privacidade removendo o target e então clicando no link',function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
      }) 
      

    })