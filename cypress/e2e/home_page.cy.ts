import { AppDrawer, Footer } from '../page-objects/core'
import { Home } from '../page-objects/features'

describe('The Home Page', () => {
    const appDrawer = new AppDrawer()
    const home = new Home()
    const footer = new Footer()

    beforeEach(() => {
        home.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        // Check if the header is visible
        appDrawer.getAppBar().should('be.visible')

        home.getHomeSection()
            .should('be.visible')
            .within(() => {
                home.getHomeHeading().contains('Home')
                home.getHomeText().contains(
                    'This demo application is built using the following technologies:'
                )

                home.getTechnologiesList()
                    .should('be.visible')
                    .within(() => {
                        home.getTechnologiesListItem().should('have.length', 13)
                        home.getTechnologiesListItem().first().contains('React')
                        home.getTechnologiesListItem()
                            .last()
                            .contains('ESLint/Prettier/AirBNB')
                    })
            })

        // Check if the footer is visible
        footer.getFooter().should('be.visible')
    })
})
