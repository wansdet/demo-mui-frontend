/**
 * src/page-objects/user/SignUp.ts
 * page object for the Sign Up page
 */
export class SignUp {
    visit() {
        cy.visit('/sign-up')
    }

    getSignUpContent() {
        return cy.get('[data-testid="sign-up-content"]')
    }

    getSignUpHeading() {
        return cy.get('[data-testid="sign-up-heading"]')
    }
}
