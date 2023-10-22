/**
 * src/page-objects/admin/blog/reports/BlogPostsMonthlyAuthors.ts
 * page object for the Monthly Blog Posts by Authors Report
 */
export class BlogPostsMonthlyAuthors {
    getBlogPostsMonthlyAuthorsContent() {
        return cy.get('[data-testid="blog-posts-monthly-authors-content"]')
    }

    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }
}
