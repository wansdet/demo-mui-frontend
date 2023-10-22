import { AppDrawer, Footer } from '../page-objects/core'
import { Faq } from '../page-objects/features'

describe('The FAQ Page', () => {
    const appDrawer = new AppDrawer()
    const faq = new Faq()
    const footer = new Footer()

    beforeEach(() => {
        faq.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        appDrawer.getAppBar().should('be.visible')

        faq.getFaqSection()
            .should('be.visible')
            .within(() => {
                faq.getFaqHeading().contains('Frequently Asked Questions')
                faq.getFaqIntroduction().contains(
                    'Explore our FAQ page for swift answers to common queries.'
                )

                faq.getFaqAccordion()
                    .should('be.visible')
                    .should('have.length', 10)

                faq.getFaqAccordion()
                    .first()
                    .within(() => {
                        faq.getFaqAccordianSummary().contains(
                            'Aut molestiae excepturi tempore magnam eveniet.'
                        )
                        faq.getFaqAccordianDetails().contains(
                            'Libero et incidunt aut. Recusandae cumque amet architecto cumque beatae.'
                        )
                    })

                faq.getFaqAccordion()
                    .last()
                    .within(() => {
                        faq.getFaqAccordianSummary().contains(
                            'Quod error occaecati ut omnis sunt qui voluptatibus.'
                        )
                        faq.getFaqAccordianDetails().contains(
                            'Odio ad molestiae dicta qui nihil dolores ut.'
                        )
                    })
            })

        footer.getFooter().should('be.visible')
    })
})
