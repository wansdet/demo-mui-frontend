import { Footer, Newsletter, SocialMedia } from '../page-objects/core'
import { Home } from '../page-objects/features'

describe('The App Footer', () => {
    const home = new Home()
    const footer = new Footer()
    const newsletter = new Newsletter()
    const socialMedia = new SocialMedia()

    beforeEach(() => {
        home.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        footer
            .getFooter()
            .should('be.visible')
            .within(() => {
                footer
                    .getNewsletter()
                    .should('be.visible')
                    .within(() => {
                        newsletter.getNewsletterHeading().contains('Newsletter')
                        newsletter
                            .getNewsletterDescription()
                            .contains(
                                'By subscribing to our company newsletter'
                            )
                        newsletter
                            .getNewsletterDescription()
                            .should('be.visible')
                        newsletter.getSubscribeButton().contains('Subscribe')
                    })
                footer.getOpenHours().should('be.visible')
                footer.getContactUs().should('be.visible')
            })
        footer.getCopyright().should('be.visible')
        footer.getSocialMedia().should('be.visible')
        /*
            .within(() => {
                socialMedia.getFacebookIcon().should('be.visible')
                socialMedia.getTwitterIcon().should('be.visible')
                socialMedia.getInstagramIcon().should('be.visible')
                socialMedia.getLinkedInIcon().should('be.visible')
                socialMedia.getYouTubeIcon().should('be.visible')
                socialMedia.getWhatsAppIcon().should('be.visible')
            })
            */
    })
})
