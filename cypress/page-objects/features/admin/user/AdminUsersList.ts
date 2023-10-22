/**
 * src/page-objects/admin/user/AdminUsersList.ts
 * page object for the Admin Users List
 */
export class AdminUsersList {
    getAdminUsersContent() {
        return cy.get('[data-testid="admin-users-list-content"]')
    }

    getPageHeading() {
        return cy.get('[data-testid="page-heading"]')
    }

    getDataGrid() {
        return cy.get('[data-test="data-grid"]')
    }

    getUserShowButton() {
        return cy.get('[data-testid="user-show-button"]')
    }

    getUserEditButton() {
        return cy.get('[data-testid="user-edit-button"]')
    }

    getUserDeleteButton() {
        return cy.get('[data-testid="user-delete-button"]')
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

    getDeleteConfirmName() {
        return cy.get('[data-testid="delete-confirm-name"]')
    }

    getDeleteCancelButton() {
        return cy.get('[data-testid="delete-confirm-dialog-cancel-button"]')
    }

    getDeleteConfirmButton() {
        return cy.get('[data-testid="delete-confirm-dialog-confirm-button"]')
    }
}
