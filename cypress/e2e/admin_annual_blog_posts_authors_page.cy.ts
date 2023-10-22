import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import { BlogPostsAnnualAuthors } from '../page-objects/features/admin/blog'

describe('The Annual Blog Posts by Authors Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const blogPostsAnnualAuthors = new BlogPostsAnnualAuthors()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsAnnualAuthorsButton().click()
    })

    it('successfully loads Annual Blog Posts by Authors Report page', () => {
        appDrawer.getAppBar().should('be.visible')

        blogPostsAnnualAuthors
            .getBlogPostsAnnualAuthorsContent()
            .should('exist')
            .within(() => {
                blogPostsAnnualAuthors
                    .getPageHeading()
                    .contains('Annual Blog Posts by Authors Report')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
})
