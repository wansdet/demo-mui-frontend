import { AppDrawer, AdminFooter } from '../page-objects/core'
import { UseNotification } from '../page-objects/common/hooks'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostCommentsList,
    AdminBlogPostCommentManage,
} from '../page-objects/features/admin/blog'

describe('The Admin Manage Blog Post Comment Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const useNotification = new UseNotification()
    const signIn = new SignIn()
    const adminBlogPostCommentsList = new AdminBlogPostCommentsList()
    const adminBlogPostCommentManage = new AdminBlogPostCommentManage()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostCommentsButton().click()
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentsList
                    .getBlogPostCommentManageButton()
                    .first()
                    .click()
            })
    })

    it('successfully loads Manage Blog Post Comment page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostCommentManage
            .getAdminBlogPostCommentManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentManage
                    .getPageHeading()
                    .contains('Manage Blog Post Comment')
                adminBlogPostCommentManage
                    .getReturnButton()
                    .should('be.visible')
                adminBlogPostCommentManage.getIdLabel().contains('ID')
                adminBlogPostCommentManage.getId().should('be.visible')
                adminBlogPostCommentManage.getCommentLabel().contains('Comment')
                adminBlogPostCommentManage.getComment().should('be.visible')
                adminBlogPostCommentManage.getRatingLabel().contains('Rating')
                adminBlogPostCommentManage.getRating().should('be.visible')
                adminBlogPostCommentManage.getStatusLabel().contains('Status')
                adminBlogPostCommentManage.getStatus().should('be.visible')
                adminBlogPostCommentManage
                    .getCreatedByLabel()
                    .contains('Created By')
                adminBlogPostCommentManage.getCreatedBy().should('be.visible')
                adminBlogPostCommentManage
                    .getCreatedAtLabel()
                    .contains('Created')
                adminBlogPostCommentManage.getCreatedAt().should('be.visible')
                adminBlogPostCommentManage
                    .getUpdatedByLabel()
                    .contains('Updated By')
                adminBlogPostCommentManage.getUpdatedBy().should('be.visible')
                adminBlogPostCommentManage
                    .getUpdatedAtLabel()
                    .contains('Last updated')
                adminBlogPostCommentManage.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })
    /*
    it('successfully update blog post comment', () => {
        adminBlogPostCommentManage
            .getAdminBlogPostCommentManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentManage.getSubmitButton().click()
            })

        useNotification
            .getUseNotification()
            .should('exist')
            .within(() => {
                useNotification
                    .getNotificationMessage()
                    .contains('Blog post comment successfully updated')
            })

        useNotification.getUseNotification().should('not.exist')
    })
*/
    it('successfully returns to  Manage Blog Post comments page', () => {
        adminBlogPostCommentManage
            .getAdminBlogPostCommentManageContent()
            .within(() => {
                adminBlogPostCommentManage.getReturnButton().click()
            })

        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentsList
                    .getPageHeading()
                    .contains('Manage Blog Post Comments')
            })
    })
})
