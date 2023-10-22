/**
 * src/page-objects/admin/blog/AdminBlogPostsList.ts
 * page object for the Admin Blog Posts List
 */
export class AdminBlogPostsList {
    getAdminBlogPostsContent() {
        return cy.get('[data-testid="admin-blog-posts-list-content"]')
    }
    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }

    getDataGrid() {
        return cy.get('[data-test="data-grid"]')
    }

    getBlogPostShowButton() {
        return cy.get('[data-test="blog-post-show-button"]')
    }

    getBlogPostEditButton() {
        return cy.get('[data-test="blog-post-edit-button"]')
    }

    getBlogPostManageButton() {
        return cy.get('[data-test="blog-post-manage-button"]')
    }

    getBlogPostDeleteButton() {
        return cy.get('[data-test="blog-post-delete-button"]')
    }

    getDeleteConfirmDialog() {
        return cy.get('[data-testid="delete-confirm-dialog"]')
    }

    getDeleteConfirmDialogTitle() {
        return cy.get('[data-testid="delete-confirm-dialog-title"]')
    }

    getDeleteConfirmMessage() {
        return cy.get('[data-testid="delete-confirm-message"]')
    }

    getDeleteConfirmId() {
        return cy.get('[data-testid="delete-confirm-id"]')
    }

    getDeleteConfirmCreatedBy() {
        return cy.get('[data-testid="delete-confirm-created-by"]')
    }

    getDeleteCancelButton() {
        return cy.get('[data-testid="delete-confirm-dialog-cancel-button"]')
    }

    getDeleteConfirmButton() {
        return cy.get('[data-testid="delete-confirm-dialog-confirm-button"]')
    }
}
