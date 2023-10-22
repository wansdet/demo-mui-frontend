import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostsList,
    AdminBlogPostShow,
} from '../page-objects/features/admin/blog'

describe('The Admin Show Blog Post Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminBlogPostsList = new AdminBlogPostsList()
    const adminBlogPostShow = new AdminBlogPostShow()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsButton().click()
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostShowButton().first().click()
        })
    })

    it('successfully loads Show Blog Post page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostShow
            .getAdminBlogPostShowContent()
            .should('exist')
            .within(() => {
                adminBlogPostShow.getPageHeading().contains('Show Blog Post')
                adminBlogPostShow.getReturnButton()
                adminBlogPostShow.getIdLabel().contains('ID')
                adminBlogPostShow.getId().should('be.visible')
                adminBlogPostShow.getTitleLabel().contains('Title')
                adminBlogPostShow.getTitle().should('be.visible')
                adminBlogPostShow.getSlugLabel().contains('Slug')
                adminBlogPostShow.getSlug().should('be.visible')
                adminBlogPostShow
                    .getBlogCategoryLabel()
                    .contains('Blog Category')
                adminBlogPostShow.getBlogCategory().should('be.visible')
                adminBlogPostShow.getContentLabel().contains('Content')
                adminBlogPostShow.getContent().should('be.visible')
                adminBlogPostShow.getStatusLabel().contains('Status')
                adminBlogPostShow.getStatus().should('be.visible')
                adminBlogPostShow.getCreatedByLabel().contains('Created By')
                adminBlogPostShow.getCreatedBy().should('be.visible')
                adminBlogPostShow.getCreatedAtLabel().contains('Created')
                adminBlogPostShow.getCreatedAt().should('be.visible')
                adminBlogPostShow.getUpdatedByLabel().contains('Updated By')
                adminBlogPostShow.getUpdatedBy().should('be.visible')
                adminBlogPostShow.getUpdatedAtLabel().contains('Last updated')
                adminBlogPostShow.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully returns to  Manage Blog Posts page', () => {
        adminBlogPostShow.getAdminBlogPostShowContent().within(() => {
            adminBlogPostShow.getReturnButton().click()
        })

        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getPageHeading().contains('Manage Blog Posts')
        })
    })
})
