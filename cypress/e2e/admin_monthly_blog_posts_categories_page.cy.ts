import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import { BlogPostsMonthlyCategories } from '../page-objects/features/admin/blog'

describe('The Monthly Blog Posts by Categories Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const blogPostsMonthlyCategories = new BlogPostsMonthlyCategories()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsMonthlyCategoriesButton().click()
    })

    it('successfully loads Monthly Blog Posts by Categories Report page', () => {
        appDrawer.getAppBar().should('be.visible')

        blogPostsMonthlyCategories
            .getBlogPostsMonthlyCategoriesContent()
            .should('exist')
            .within(() => {
                blogPostsMonthlyCategories
                    .getPageHeading()
                    .contains('Monthly Blog Posts by Categories')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
})
