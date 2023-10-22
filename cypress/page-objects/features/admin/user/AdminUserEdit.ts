/**
 * src/page-objects/admin/user/AdminUserEdit.ts
 * page object for the Admin User Edit
 */
export class AdminUserEdit {
    getAdminUserEditContent() {
        return cy.get('[data-testid="admin-user-edit-content"]')
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

    getDisplayNameLabel() {
        return cy.get('[data-testid="display-name-label"]')
    }

    getDisplayName() {
        return cy.get('[data-testid="display-name"]')
    }

    getFirstNameLabel() {
        return cy.get('[data-testid="first-name-label"]')
    }

    getFirstName() {
        return cy.get('[data-testid="first-name"]')
    }

    getLastNameLabel() {
        return cy.get('[data-testid="last-name-label"]')
    }

    getLastName() {
        return cy.get('[data-testid="last-name"]')
    }

    getMiddleNameLabel() {
        return cy.get('[data-testid="middle-name-label"]')
    }

    getMiddleName() {
        return cy.get('[data-testid="middle-name"]')
    }

    getGenderLabel() {
        return cy.get('[data-testid="sex-label"]')
    }

    getGender() {
        return cy.get('[data-testid="sex"]')
    }

    getEmailLabel() {
        return cy.get('[data-testid="email-label"]')
    }

    getEmail() {
        return cy.get('[data-testid="email"]')
    }

    getJobTitleLabel() {
        return cy.get('[data-testid="job-title-label"]')
    }

    getJobTitle() {
        return cy.get('[data-testid="job-title"]')
    }

    getRolesLabel() {
        return cy.get('[data-testid="roles-label"]')
    }

    getRoles() {
        return cy.get('[data-testid="roles"]')
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
