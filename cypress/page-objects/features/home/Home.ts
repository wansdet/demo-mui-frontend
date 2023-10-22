/**
 * src/page-objects/home/Home.ts
 * page object for the Home page
 */
export class Home {
    visit() {
        cy.visit('/')
    }

    getHomeSection() {
        return cy.get('[data-testid="home-section"]')
    }

    getHomeHeading() {
        return cy.get('[data-test="h1"]')
    }

    getHomeText() {
        return cy.get('[data-testid="home-text"]')
    }

    getTechnologiesList() {
        return cy.get('[data-testid="technologies-list"]')
    }

    getTechnologiesListItem() {
        return cy.get('[data-test="technologies-list-item"]')
    }
}
