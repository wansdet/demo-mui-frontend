/**
 * src/page-objects/contact-us/ContactUs.ts
 * page object for the Contact Us page
 */
export class ContactUs {
    visit() {
        cy.visit('/contact-us')
    }

    getContactUsHeading() {
        return cy.get('[data-testid="contact-us-heading"]')
    }

    getContactsSection() {
        return cy.get('[data-testid="contacts-section"]')
    }

    getContactsHeading() {
        return cy.get('[data-testid="contacts-heading"]')
    }

    getPhoneIcon() {
        return cy.get('[data-testid="PhoneIcon"]')
    }

    getEmailIcon() {
        return cy.get('[data-testid="EmailIcon"]')
    }

    getContactsDetails() {
        return cy.get('[data-testid="contacts-details"]')
    }

    getAddressSection() {
        return cy.get('[data-testid="address-section"]')
    }

    getAddressDetails() {
        return cy.get('[data-testid="address-details"]')
    }

    getLocationOnIcon() {
        return cy.get('[data-testid="LocationOnIcon"]')
    }

    getAddressHeading() {
        return cy.get('[data-testid="address-heading"]')
    }

    getContactUsFormSection() {
        return cy.get('[data-testid="contact-us-form-section"]')
    }
}
