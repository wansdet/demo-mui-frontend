/**
 * src/page-objects/user/SignIn.ts
 * page object for the Sign In page
 */
export class SignIn {
    visit() {
        cy.visit('/sign-in')
    }

    getSignInContent() {
        return cy.get('[data-testid="sign-in-content"]')
    }

    getSignInHeading() {
        return cy.get('[data-testid="sign-in-heading"]')
    }

    getSignInError() {
        return cy.get('[data-testid="sign-in-error"]')
    }

    getEmailInput() {
        return cy.get('[data-test="email-input"]')
    }

    getPasswordInput() {
        return cy.get('[data-test="password-input"]')
    }

    getRememberMeCheckbox() {
        return cy.get('[data-testid="remember-me-checkbox"]')
    }

    getSignInSubmitButton() {
        return cy.get('[data-testid="sign-in-submit-button"]')
    }
}
