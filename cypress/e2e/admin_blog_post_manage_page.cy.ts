import { AppDrawer, AdminFooter } from '../page-objects/core'
import { UseNotification } from '../page-objects/common/hooks'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostsList,
    AdminBlogPostManage,
} from '../page-objects/features/admin/blog'

describe('The Admin Manage Blog Post Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const useNotification = new UseNotification()
    const signIn = new SignIn()
    const adminBlogPostsList = new AdminBlogPostsList()
    const adminBlogPostManage = new AdminBlogPostManage()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsButton().click()
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostManageButton().first().click()
        })
    })

    it('successfully loads Manage Blog Post page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostManage
            .getAdminBlogPostManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostManage
                    .getPageHeading()
                    .contains('Manage Blog Post')
                adminBlogPostManage.getReturnButton()
                adminBlogPostManage.getIdLabel().contains('ID')
                adminBlogPostManage.getId().should('be.visible')
                adminBlogPostManage.getTitleLabel().contains('Title')
                adminBlogPostManage.getTitle().should('be.visible')
                adminBlogPostManage.getSlugLabel().contains('Slug')
                adminBlogPostManage.getSlug().should('be.visible')
                adminBlogPostManage
                    .getBlogCategoryLabel()
                    .contains('Blog Category')
                adminBlogPostManage.getBlogCategory().should('be.visible')
                adminBlogPostManage.getContentLabel().contains('Content')
                adminBlogPostManage.getContent().should('be.visible')
                adminBlogPostManage.getStatusLabel().contains('Status')
                adminBlogPostManage.getStatus().should('be.visible')
                adminBlogPostManage.getCreatedByLabel().contains('Created By')
                adminBlogPostManage.getCreatedBy().should('be.visible')
                adminBlogPostManage.getCreatedAtLabel().contains('Created')
                adminBlogPostManage.getCreatedAt().should('be.visible')
                adminBlogPostManage.getUpdatedByLabel().contains('Updated By')
                adminBlogPostManage.getUpdatedBy().should('be.visible')
                adminBlogPostManage.getUpdatedAtLabel().contains('Last updated')
                adminBlogPostManage.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
    /*
    it('successfully update blog post', () => {
        adminBlogPostManage
            .getAdminBlogPostManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostManage.getSubmitButton().click()
            })

        useNotification
            .getUseNotification()
            .should('exist')
            .within(() => {
                useNotification
                    .getNotificationMessage()
                    .contains('Blog post successfully updated')
            })

        useNotification.getUseNotification().should('not.exist')
    })
*/
    it('successfully returns to  Manage Blog Posts page', () => {
        adminBlogPostManage.getAdminBlogPostManageContent().within(() => {
            adminBlogPostManage.getReturnButton().click()
        })

        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getPageHeading().contains('Manage Blog Posts')
        })
    })
})
