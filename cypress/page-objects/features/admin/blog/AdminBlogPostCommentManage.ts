/**
 * src/page-objects/admin/blog/AdminBlogPostCommentManage.ts
 * page object for the Admin Blog Post Comment Manage
 */
export class AdminBlogPostCommentManage {
    getAdminBlogPostCommentManageContent() {
        return cy.get('[data-testid="admin-blog-post-comment-manage-content"]')
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

    getCommentLabel() {
        return cy.get('[data-testid="comment-label"]')
    }

    getComment() {
        return cy.get('[data-testid="comment"]')
    }

    getRatingLabel() {
        return cy.get('[data-testid="rating-label"]')
    }

    getRating() {
        return cy.get('[data-testid="rating"]')
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
}
