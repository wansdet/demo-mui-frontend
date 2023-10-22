/**
 * src/page-objects/admin/blog/reports/BlogPostsMonthlyCategories.ts
 * page object for the Monthly Blog Posts by Categories Report
 */
export class BlogPostsMonthlyCategories {
    getBlogPostsMonthlyCategoriesContent() {
        return cy.get('[data-testid="blog-posts-monthly-categories-content"]')
    }

    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }
}
