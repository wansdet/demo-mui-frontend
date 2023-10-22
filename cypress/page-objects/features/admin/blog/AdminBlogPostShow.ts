/**
 * src/page-objects/admin/blog/AdminBlogPostShow.ts
 * page object for the Admin Blog Post Show
 */
export class AdminBlogPostShow {
    getAdminBlogPostShowContent() {
        return cy.get('[data-testid="admin-blog-post-show-content"]')
    }
    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }

    getReturnButton() {
        return cy.get('[data-testid="return-button"]')
    }

    getIdLabel() {
        return cy.get('[data-testid="id-label"]')
    }

    getId() {
        return cy.get('[data-testid="id"]')
    }

    getTitleLabel() {
        return cy.get('[data-testid="title-label"]')
    }

    getTitle() {
        return cy.get('[data-testid="title"]')
    }

    getSlugLabel() {
        return cy.get('[data-testid="slug-label"]')
    }

    getSlug() {
        return cy.get('[data-testid="slug"]')
    }

    getBlogCategoryLabel() {
        return cy.get('[data-testid="blog-category-label"]')
    }

    getBlogCategory() {
        return cy.get('[data-testid="blog-category"]')
    }

    getContentLabel() {
        return cy.get('[data-testid="content-label"]')
    }

    getContent() {
        return cy.get('[data-testid="content"]')
    }

    getStatusLabel() {
        return cy.get('[data-testid="status-label"]')
    }

    getStatus() {
        return cy.get('[data-testid="status"]')
    }

    getCreatedByLabel() {
        return cy.get('[data-testid="created-by-label"]')
    }

    getCreatedBy() {
        return cy.get('[data-testid="created-by"]')
    }

    getCreatedAtLabel() {
        return cy.get('[data-testid="created-at-label"]')
    }

    getCreatedAt() {
        return cy.get('[data-testid="created-at"]')
    }

    getUpdatedBy() {
        return cy.get('[data-testid="updated-by"]')
    }

    getUpdatedByLabel() {
        return cy.get('[data-testid="updated-by-label"]')
    }

    getUpdatedAtLabel() {
        return cy.get('[data-testid="updated-at-label"]')
    }

    getUpdatedAt() {
        return cy.get('[data-testid="updated-at"]')
    }
}
