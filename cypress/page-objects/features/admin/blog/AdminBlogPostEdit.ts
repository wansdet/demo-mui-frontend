/**
 * src/page-objects/admin/blog/AdminBlogPostEdit.ts
 * page object for the Admin Blog Post Edit
 */
export class AdminBlogPostEdit {
    getAdminBlogPostEditContent() {
        return cy.get('[data-testid="admin-blog-post-edit-content"]')
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

    getUpdatedByLabel() {
        return cy.get('[data-testid="updated-by-label"]')
    }

    getUpdatedBy() {
        return cy.get('[data-testid="updated-by"]')
    }

    getUpdatedAtLabel() {
        return cy.get('[data-testid="updated-at-label"]')
    }

    getUpdatedAt() {
        return cy.get('[data-testid="updated-at"]')
    }

    getSubmitButton() {
        return cy.get('[data-testid="submit-button"]')
    }
}
