import { AppDrawer, AdminFooter } from '../page-objects/core'
import { UseNotification } from '../page-objects/common/hooks'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostCommentsList,
    AdminBlogPostCommentEdit,
} from '../page-objects/features/admin/blog'

describe('The Admin Edit Blog Post Comment Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const useNotification = new UseNotification()
    const signIn = new SignIn()
    const adminBlogPostCommentsList = new AdminBlogPostCommentsList()
    const adminBlogPostCommentEdit = new AdminBlogPostCommentEdit()

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
                    .getBlogPostCommentEditButton()
                    .first()
                    .click()
            })
    })
    /*
    it('successfully loads Edit Blog Post Comment page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostCommentEdit
            .getAdminBlogPostCommentEditContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentEdit
                    .getPageHeading()
                    .contains('Edit Blog Post Comment')
                adminBlogPostCommentEdit.getReturnButton().should('be.visible')
                adminBlogPostCommentEdit.getIdLabel().contains('ID')
                adminBlogPostCommentEdit.getId().should('be.visible')
                adminBlogPostCommentEdit.getCommentLabel().contains('Comment')
                adminBlogPostCommentEdit.getComment().should('be.visible')
                adminBlogPostCommentEdit.getRatingLabel().contains('Rating')
                adminBlogPostCommentEdit.getRating().should('be.visible')
                adminBlogPostCommentEdit.getStatusLabel().contains('Status')
                adminBlogPostCommentEdit.getStatus().should('be.visible')
                adminBlogPostCommentEdit
                    .getCreatedByLabel()
                    .contains('Created By')
                adminBlogPostCommentEdit.getCreatedBy().should('be.visible')
                adminBlogPostCommentEdit.getCreatedAtLabel().contains('Created')
                adminBlogPostCommentEdit.getCreatedAt().should('be.visible')
                adminBlogPostCommentEdit
                    .getUpdatedByLabel()
                    .contains('Updated By')
                adminBlogPostCommentEdit.getUpdatedBy().should('be.visible')
                adminBlogPostCommentEdit
                    .getUpdatedAtLabel()
                    .contains('Last updated')
                adminBlogPostCommentEdit.getUpdatedAt().should('be.visible')
                adminBlogPostCommentEdit.getSubmitButton().contains('Submit')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully update blog post comment', () => {
        adminBlogPostCommentEdit
            .getAdminBlogPostCommentEditContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentEdit.getSubmitButton().click()
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

    it('successfully returns to  Manage Blog Post comments page', () => {
        adminBlogPostCommentEdit
            .getAdminBlogPostCommentEditContent()
            .within(() => {
                adminBlogPostCommentEdit.getReturnButton().click()
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
 */
})
