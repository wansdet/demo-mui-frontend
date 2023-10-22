import { AppDrawer } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostsList,
    AdminBlogPostCommentsList,
    BlogPostsMonthlyCategories,
    BlogPostsMonthlyAuthors,
    BlogPostsAnnualCategories,
    BlogPostsAnnualAuthors,
} from '../page-objects/features/admin/blog'
import { AdminUsersList } from '../page-objects/features/admin/user'

describe('The Admin )App Drawer', () => {
    const appDrawer = new AppDrawer()
    const signIn = new SignIn()
    const adminBlogPostsList = new AdminBlogPostsList()
    const adminBlogPostCommentsList = new AdminBlogPostCommentsList()
    const adminUsersList = new AdminUsersList()
    const blogPostsMonthlyCategories = new BlogPostsMonthlyCategories()
    const blogPostsMonthlyAuthors = new BlogPostsMonthlyAuthors()
    const blogPostsAnnualCategories = new BlogPostsAnnualCategories()
    const blogPostsAnnualAuthors = new BlogPostsAnnualAuthors()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
    })

    it('successfully loads Manage Blog Posts page', () => {
        appDrawer.getAdminBlogPostsButton().click()
        adminBlogPostsList
            .getAdminBlogPostsContent()
            .should('exist')
            .within(() => {
                adminBlogPostsList
                    .getPageHeading()
                    .contains('Manage Blog Posts')
            })
    })

    it('successfully loads Manage Blog Post Comments page', () => {
        appDrawer.getAdminBlogPostCommentsButton().click()
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentsList
                    .getPageHeading()
                    .contains('Manage Blog Post Comments')
            })
    })

    it('successfully loads Manage Users page', () => {
        appDrawer.getAdminUsersButton().click()
        adminUsersList
            .getAdminUsersContent()
            .should('exist')
            .within(() => {
                adminUsersList.getPageHeading().contains('Manage Users')
            })
    })

    it('successfully loads Monthly Blog Posts by Categories Report page', () => {
        appDrawer.getAdminBlogPostsMonthlyCategoriesButton().click()
        blogPostsMonthlyCategories
            .getBlogPostsMonthlyCategoriesContent()
            .should('exist')
            .within(() => {
                blogPostsMonthlyCategories
                    .getPageHeading()
                    .contains('Monthly Blog Posts by Categories')
            })
    })

    it('successfully loads Monthly Blog Posts by Authors Report page', () => {
        appDrawer.getAdminBlogPostsMonthlyAuthorsButton().click()
        blogPostsMonthlyAuthors
            .getBlogPostsMonthlyAuthorsContent()
            .should('exist')
            .within(() => {
                blogPostsMonthlyAuthors
                    .getPageHeading()
                    .contains('Monthly Blog Posts by Authors')
            })
    })

    it('successfully loads Annual Blog Posts by Categories Report page', () => {
        appDrawer.getAdminBlogPostsAnnualCategoriesButton().click()
        blogPostsAnnualCategories
            .getBlogPostsAnnualCategoriesContent()
            .should('exist')
            .within(() => {
                blogPostsAnnualCategories
                    .getPageHeading()
                    .contains('Annual Blog Posts by Categories Report')
            })
    })

    it('successfully loads Annual Blog Posts by Authors Report page', () => {
        appDrawer.getAdminBlogPostsAnnualAuthorsButton().click()
        blogPostsAnnualAuthors
            .getBlogPostsAnnualAuthorsContent()
            .should('exist')
            .within(() => {
                blogPostsAnnualAuthors
                    .getPageHeading()
                    .contains('Annual Blog Posts by Authors Report')
            })
    })
})
