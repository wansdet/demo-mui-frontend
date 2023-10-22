import { AppDrawer, Footer } from '../page-objects/core'
import { ContactUs, ContactUsForm } from '../page-objects/features/contact-us'

describe('The FAQ Page', () => {
    const appDrawer = new AppDrawer()
    const contactUs = new ContactUs()
    const contactUsForm = new ContactUsForm()
    const footer = new Footer()

    beforeEach(() => {
        contactUs.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        appDrawer.getAppBar().should('be.visible')

        contactUs.getContactUsHeading().contains('Contact Us')
        contactUs
            .getContactsSection()
            .should('be.visible')
            .within(() => {
                contactUs.getContactsHeading().contains('Contacts')
                contactUs.getPhoneIcon().should('be.visible')
                contactUs.getContactsDetails().contains('Phone')
                contactUs.getContactsDetails().contains('(01234) 456-7890')
                contactUs.getEmailIcon().should('be.visible')
                contactUs.getContactsDetails().contains('Email')
                contactUs.getContactsDetails().contains('demo@example.com')
            })

        contactUs
            .getAddressSection()
            .should('be.visible')
            .within(() => {
                contactUs.getLocationOnIcon().should('be.visible')
                contactUs.getAddressHeading().contains('Address')
                contactUs.getAddressDetails().contains('Demo Organisation')
                contactUs.getAddressDetails().contains('Oxford Business Park')
                contactUs.getAddressDetails().contains('Oxford')
                contactUs.getAddressDetails().contains('Oxfordshire')
                contactUs.getAddressDetails().contains('OX4 2JY')
            })

        contactUs
            .getContactUsFormSection()
            .should('be.visible')
            .within(() => {
                contactUsForm
                    .getContactUsForm()
                    .should('be.visible')
                    .within(() => {
                        contactUsForm
                            .getContactUsFormText()
                            .contains('Send us a message')
                        contactUsForm.getNameInput().should('be.visible')
                        contactUsForm.getEmailInput().should('be.visible')
                        contactUsForm.getMessageInput().should('be.visible')
                        contactUsForm
                            .getPrivacyPolicyCheckbox()
                            .should('be.visible')
                        contactUsForm
                            .getSendMessageButton()
                            .should('be.visible')
                            .contains('Send Message')
                    })
            })

        footer.getFooter().should('be.visible')
    })
})
