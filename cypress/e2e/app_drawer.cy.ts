import { AppDrawer } from '../page-objects/core'
import { Home } from '../page-objects/features'
import { BlogPostsList } from '../page-objects/features/blog'
import { Faq } from '../page-objects/features'
import { ContactUs } from '../page-objects/features/contact-us'
import { SignIn, SignUp } from '../page-objects/features/user'

describe('The App Drawer', () => {
    const appDrawer = new AppDrawer()
    const home = new Home()
    const blogPostsList = new BlogPostsList()
    const faq = new Faq()
    const contactUs = new ContactUs()
    const signIn = new SignIn()
    const signUp = new SignUp()

    beforeEach(() => {
        home.visit()
    })

    it('successfully loads and contains the expected elements', () => {
        // Check if the header is visible
        appDrawer
            .getAppBar()
            .should('be.visible')
            .within(() => {
                // Should exist
                appDrawer.getHomeButton().contains('Home')
                appDrawer.getBlogButton().contains('Blog')
                appDrawer.getFaqButton().contains('FAQ')
                appDrawer.getContactUsButton().contains('Contact Us')
                appDrawer.getMyAccountButton().should('not.exist')
                appDrawer.getSignUpButton().contains('Sign Up')
                appDrawer.getSignInButton().contains('Sign In')
                appDrawer.getSignOutButton().should('not.exist')
            })

        // Should not exist
        appDrawer
            .getAppDrawer()
            .should('exist')
            .within(() => {
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
                appDrawer
                    .getAdminBlogPostsAnnualAuthorsButton()
                    .should('not.exist')
            })
    })

    it('successfully loads featured blogs page when blog link clicked', () => {
        appDrawer.getBlogButton().click()

        blogPostsList.getBlogPostsListHeading().contains('Blog')
    })

    it('successfully loads FAQ page when FAQ link clicked', () => {
        appDrawer.getFaqButton().click()

        faq.getFaqHeading().contains('Frequently Asked Questions')
    })

    it('successfully loads Contact Us page when Contact Us link clicked', () => {
        appDrawer.getContactUsButton().click()

        contactUs.getContactUsHeading().contains('Contact Us')
    })

    it('successfully loads Sign up page when Sign up link clicked', () => {
        appDrawer.getSignUpButton().click()

        signUp.getSignUpHeading().contains('Sign up')
    })

    it('successfully loads Sign in page when Sign in link clicked', () => {
        appDrawer.getSignInButton().click()

        signIn.getSignInHeading().contains('Sign in')
    })
})
