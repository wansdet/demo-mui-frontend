import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import { BlogPostsAnnualCategories } from '../page-objects/features/admin/blog'

describe('The Annual Blog Posts by Categories Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const blogPostsAnnualCategories = new BlogPostsAnnualCategories()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsAnnualCategoriesButton().click()
    })

    it('successfully loads Annual Blog Posts by Categories Report page', () => {
        appDrawer.getAppBar().should('be.visible')

        blogPostsAnnualCategories
            .getBlogPostsAnnualCategoriesContent()
            .should('exist')
            .within(() => {
                blogPostsAnnualCategories
                    .getPageHeading()
                    .contains('Annual Blog Posts by Categories Report')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
})
