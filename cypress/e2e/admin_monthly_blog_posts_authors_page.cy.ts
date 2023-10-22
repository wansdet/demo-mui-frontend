import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import { BlogPostsMonthlyAuthors } from '../page-objects/features/admin/blog'

describe('The Monthly Blog Posts by Authors Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const blogPostsMonthlyAuthors = new BlogPostsMonthlyAuthors()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsMonthlyAuthorsButton().click()
    })

    it('successfully loads Monthly Blog Posts by Authors Report page', () => {
        appDrawer.getAppBar().should('be.visible')

        blogPostsMonthlyAuthors
            .getBlogPostsMonthlyAuthorsContent()
            .should('exist')
            .within(() => {
                blogPostsMonthlyAuthors
                    .getPageHeading()
                    .contains('Monthly Blog Posts by Authors')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
})
