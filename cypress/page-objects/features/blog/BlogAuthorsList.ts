/**
 * src/page-objects/blog/BlogAuthorsList.ts
 * page object for the Blog Authors List
 */
export class BlogAuthorsList {
    getBlogAuthorsListHeading() {
        return cy.get('[data-testid="blog-authors-heading"]')
    }

    getBlogAuthorsList() {
        return cy.get('[data-testid="blog-authors-list"]')
    }

    getBlogAuthorLink() {
        return cy.get('[data-test="blog-author-link"]')
    }

    getBlogAuthorButton() {
        return cy.get('[data-test="blog-author-button"]')
    }
}
