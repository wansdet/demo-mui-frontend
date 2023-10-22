/**
 * src/page-objects/admin/blog/AdminBlogCommentsList.ts
 * page object for the Admin Blog Post Comments List
 */
export class AdminBlogPostCommentsList {
    getAdminBlogPostCommentsContent() {
        return cy.get('[data-testid="admin-blog-post-comments-list-content"]')
    }
    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }

    getDataGrid() {
        return cy.get('[data-test="data-grid"]')
    }

    getBlogPostCommentShowButton() {
        return cy.get('[data-test="blog-post-comment-show-button"]')
    }

    getBlogPostCommentEditButton() {
        return cy.get('[data-test="blog-post-comment-edit-button"]')
    }

    getBlogPostCommentManageButton() {
        return cy.get('[data-test="blog-post-comment-manage-button"]')
    }

    getBlogPostCommentDeleteButton() {
        return cy.get('[data-test="blog-post-comment-delete-button"]')
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
