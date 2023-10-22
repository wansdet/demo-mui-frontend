/**
 * src/page-objects/blog/BlogPostsList.ts
 * page object for the Blog Posts List
 */
export class BlogPostsList {
    visit() {
        cy.visit('/blog')
    }

    getBlogPostsListHeading() {
        return cy.get('[data-testid="blog-posts-list-heading"]')
    }

    getBlogPostsListMainContent() {
        return cy.get('[data-testid="blog-posts-list-main-content"]')
    }

    getBlogGallery() {
        return cy.get('[data-testid="blog-gallery"]')
    }
}
