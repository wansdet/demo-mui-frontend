/**
 * src/page-objects/blog/BlogCategoriesList.ts
 * page object for the Blog Categories List
 */
export class BlogCategoriesList {
    getBlogCategories() {
        return cy.get('[data-testid="blog-categories"]')
    }

    getBlogCategoriesHeading() {
        return cy.get('[data-testid="blog-categories-heading"]')
    }

    getBlogCategoriesCookeryLink() {
        return cy.get('[data-testid="blog-categories-cookery-link"]')
    }

    getBlogCategoriesCookeryButton() {
        return cy.get('[data-testid="blog-categories-cookery-button"]')
    }

    getBlogCategoriesFashionLink() {
        return cy.get('[data-testid="blog-categories-fashion-link"]')
    }

    getBlogCategoriesFashionButton() {
        return cy.get('[data-testid="blog-categories-fashion-button"]')
    }

    getBlogCategoriesFoodLink() {
        return cy.get('[data-testid="blog-categories-food-link"]')
    }

    getBlogCategoriesFoodButton() {
        return cy.get('[data-testid="blog-categories-food-button"]')
    }

    getBlogCategoriesHomeLink() {
        return cy.get('[data-testid="blog-categories-home-link"]')
    }

    getBlogCategoriesHomeButton() {
        return cy.get('[data-testid="blog-categories-home-button"]')
    }

    getBlogCategoriesLeisureLink() {
        return cy.get('[data-testid="blog-categories-leisure-link"]')
    }

    getBlogCategoriesLeisureButton() {
        return cy.get('[data-testid="blog-categories-leisure-button"]')
    }

    getBlogCategoriesTechnologyLink() {
        return cy.get('[data-testid="blog-categories-technology-link"]')
    }

    getBlogCategoriesTechnologyButton() {
        return cy.get('[data-testid="blog-categories-technology-button"]')
    }

    getBlogCategoriesTransportLink() {
        return cy.get('[data-testid="blog-categories-transport-link"]')
    }

    getBlogCategoriesTransportButton() {
        return cy.get('[data-testid="blog-categories-transport-button"]')
    }

    getBlogCategoriesTravelLink() {
        return cy.get('[data-testid="blog-categories-travel-link"]')
    }

    getBlogCategoriesTravelButton() {
        return cy.get('[data-testid="blog-categories-travel-button"]')
    }
}
