/**
 * src/cypress/page-objects/core/Footer.ts
 * Footer page object class.
 */
export class Footer {
    getFooter() {
        return cy.get('[data-testid="footer"]')
    }

    getNewsletter() {
        return cy.get('[data-testid="newsletter"]')
    }

    getOpenHours() {
        return cy.get('[data-testid="opening-hours"]')
    }

    getContactUs() {
        return cy.get('[data-testid="contact-us"]')
    }

    getCopyright() {
        return cy.get('[data-test="copyright"]')
    }

    getSocialMedia() {
        return cy.get('[data-testid="social-media"]')
    }
}
