/**
 * src/page-objects/admin/blog/reports/BlogPostsAnnualCategories.ts
 * page object for the Annual Blog Posts by Categories Report
 */
export class BlogPostsAnnualCategories {
    getBlogPostsAnnualCategoriesContent() {
        return cy.get('[data-testid="blog-posts-annual-categories-content"]')
    }

    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }
}
