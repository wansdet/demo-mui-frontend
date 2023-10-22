/**
 * src/cypress/page-objects/core/SocialMedia.ts
 * Social media page object class.
 */
export class SocialMedia {
    getFacebookIcon() {
        return cy.get('[data-testid="facebook-icon"]')
    }

    getTwitterIcon() {
        return cy.get('[data-testid="twitter-icon"]')
    }

    getInstagramIcon() {
        return cy.get('[data-testid="instagram-icon"]')
    }

    getYouTubeIcon() {
        return cy.get('[data-testid="you-tube-icon"]')
    }

    getLinkedInIcon() {
        return cy.get('[data-testid="linked-in-icon"]')
    }

    getWhatsAppIcon() {
        return cy.get('[data-testid="whats-app-icon"]')
    }
}
