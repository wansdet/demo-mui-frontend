/**
 * src/page-objects/faq/Faq.ts
 * page object for the FAQ page
 */
export class Faq {
    visit() {
        cy.visit('/frequently-asked-questions')
    }

    getFaqSection() {
        return cy.get('[data-testid="faq-section"]')
    }

    getFaqHeading() {
        return cy.get('[data-test="h1"]')
    }

    getFaqIntroduction() {
        return cy.get('[data-testid="faq-introduction"]')
    }

    getFaqAccordion() {
        return cy.get('[data-test="faq-accordian"]')
    }

    getFaqAccordianSummary() {
        return cy.get('[data-test="faq-accordian-summary"]')
    }

    getFaqAccordianDetails() {
        return cy.get('[data-test="faq-accordian-details"]')
    }
}
