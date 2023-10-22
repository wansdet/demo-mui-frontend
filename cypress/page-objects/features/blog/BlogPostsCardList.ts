/**
 * src/page-objects/blog/BlogPostsCardList.ts
 * page object for the Blog Posts Card List
 */
export class BlogPostsCardList {
    getBlogPostsCardActionArea() {
        return cy.get('[data-test="blog-posts-card-action-area"]')
    }

    getBlogPostCardContent() {
        return cy.get('[data-test="blog-post-card-content"]')
    }

    getBlogPostCardContentHeading() {
        return cy.get('[data-test="h3"]')
    }

    getBlogPostCardContentSubTitle() {
        return cy.get('[data-test="blog-post-card-content-subtitle"]')
    }

    getBlogPostCardContentDescription() {
        return cy.get('[data-test="blog-post-card-content-description"]')
    }

    getBlogPostCardContentReadMore() {
        return cy.get('[data-test="blog-post-card-content-read-more"]')
    }
}
