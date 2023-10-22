/**
 * src/page-objects/admin/blog/reports/BlogPostsAnnualAuthors.ts
 * page object for the Annual Blog Posts by Authors Report
 */
export class BlogPostsAnnualAuthors {
    getBlogPostsAnnualAuthorsContent() {
        return cy.get('[data-testid="blog-posts-annual-authors-content"]')
    }

    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }
}
