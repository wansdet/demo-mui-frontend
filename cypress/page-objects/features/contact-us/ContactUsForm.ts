/**
 * src/page-objects/contact-us/ContactUsForm.js
 * page object for the Contact Us Form
 */
export class ContactUsForm {
    getContactUsForm() {
        return cy.get('[data-testid="contact-us-form"]')
    }

    getContactUsFormText() {
        return cy.get('[data-testid="contact-us-form-text"]')
    }

    getNameInput() {
        return cy.get('[data-testid="name"]')
    }

    getEmailInput() {
        return cy.get('[data-testid="email"]')
    }

    getMessageInput() {
        return cy.get('[data-testid="message"]')
    }

    getPrivacyPolicyCheckbox() {
        return cy.get('[data-testid="privacy-policy"]')
    }

    getSendMessageButton() {
        return cy.get('[data-testid="send-message"]')
    }
}
