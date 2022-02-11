/// <reference types="Cypress" />


const baseUrl = "http://192.168.1.38:8080"


context ('Pokedex', ()=>{

    before(()=>{
        cy.visit(baseUrl)

    })

    it('checks if main buttons exist', ()=>{

        cy.get('.btn').should('have.length',2)
    })
    



})