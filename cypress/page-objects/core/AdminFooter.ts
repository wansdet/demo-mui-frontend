/**
 * src/cypress/page-objects/core/AdminFooter.ts
 * Admin Footer page object class.
 */
export class AdminFooter {
    getAdminFooterContent() {
        return cy.get('[data-testid="admin-footer-content"]')
    }

    getCopyright() {
        return cy.get('[data-test="copyright"]')
    }
}
