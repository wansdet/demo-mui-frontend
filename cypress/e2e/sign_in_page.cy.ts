import { AppDrawer, Copyright } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'

describe('The Sign In Page', () => {
    const appDrawer = new AppDrawer()
    const signIn = new SignIn()
    const copyright = new Copyright()

    beforeEach(() => {
        signIn.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        // Check if the header is visible
        appDrawer.getAppBar().should('be.visible')

        signIn
            .getSignInContent()
            .should('be.visible')
            .within(() => {
                signIn.getSignInHeading().contains('Sign in')
                signIn.getSignInError().should('not.exist')
                signIn.getEmailInput().should('be.visible')
                signIn.getPasswordInput().should('be.visible')
                signIn.getRememberMeCheckbox().should('be.visible')
                signIn.getSignInSubmitButton().should('be.visible')
            })

        copyright.getCopyright().contains('demo@example.com')
    })

    it('successfully signs in user and contains the expected elements', () => {
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('user1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/')
        })

        appDrawer.getAppBar().within(() => {
            appDrawer.getMyAccountButton().contains('My Account')
            appDrawer.getSignOutButton().contains('Sign Out')
            appDrawer.getSignInButton().should('not.exist')
        })

        appDrawer.getAppDrawer().within(() => {
            appDrawer.getAdminHomeButton().should('not.exist')
            appDrawer.getAdminBlogPostsButton().should('not.exist')
            appDrawer.getAdminBlogPostCommentsButton().should('not.exist')
            appDrawer.getAdminUsersButton().should('not.exist')
            appDrawer
                .getAdminBlogPostsMonthlyCategoriesButton()
                .should('not.exist')
            appDrawer
                .getAdminBlogPostsMonthlyAuthorsButton()
                .should('not.exist')
            appDrawer
                .getAdminBlogPostsAnnualCategoriesButton()
                .should('not.exist')
            appDrawer.getAdminBlogPostsAnnualAuthorsButton().should('not.exist')
        })
    })

    it('successfully signs in administrator and contains the expected elements', () => {
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })

        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/')
        })

        appDrawer.getAppBar().within(() => {
            appDrawer.getMyAccountButton().contains('My Account')
            appDrawer.getSignOutButton().contains('Sign Out')
            appDrawer.getSignInButton().should('not.exist')
        })

        appDrawer.getAppDrawer().within(() => {
            appDrawer.getAdminHomeButton().should('be.visible')
            appDrawer.getAdminBlogPostsButton().contains('Blog Posts')
            appDrawer
                .getAdminBlogPostCommentsButton()
                .contains('Blog Post Comments')
            appDrawer.getAdminUsersButton().contains('Users')
            appDrawer
                .getAdminBlogPostsMonthlyCategoriesButton()
                .contains('Monthly Blog Posts by Categories Report')
            appDrawer
                .getAdminBlogPostsMonthlyAuthorsButton()
                .contains('Monthly Blog Posts by Authors Report')
            appDrawer
                .getAdminBlogPostsAnnualCategoriesButton()
                .contains('Annual Blog Posts by Categories Report')
            appDrawer
                .getAdminBlogPostsAnnualAuthorsButton()
                .contains('Annual Blog Posts by Authors Report')
        })
    })
})
