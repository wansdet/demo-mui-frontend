/**
 * src/cypress/page-objects/common/hooks/feedback/UseNotification.ts
 * useNotification page object class.
 */
export class UseNotification {
    getUseNotification() {
        return cy.get('[data-testid="use-notification"]')
    }

    getNotificationMessage() {
        return cy.get('[data-testid="notification-message"]')
    }
}
