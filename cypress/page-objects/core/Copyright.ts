/**
 * src/cypress/page-objects/core/Copyright.ts
 * Copyright page object class.
 */
export class Copyright {
    getCopyright() {
        return cy.get('[data-test="copyright"]')
    }
}
