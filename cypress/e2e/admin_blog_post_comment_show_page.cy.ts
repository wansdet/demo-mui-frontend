import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostCommentsList,
    AdminBlogPostCommentShow,
} from '../page-objects/features/admin/blog'

describe('The Admin Show Blog Post Comment Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminBlogPostCommentsList = new AdminBlogPostCommentsList()
    const adminBlogPostCommentShow = new AdminBlogPostCommentShow()

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
                    .getBlogPostCommentShowButton()
                    .first()
                    .click()
            })
    })

    it('successfully loads Show Blog Post Comment page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostCommentShow
            .getAdminBlogPostCommentShowContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentShow
                    .getPageHeading()
                    .contains('Show Blog Post Comment')
                adminBlogPostCommentShow.getReturnButton().should('be.visible')
                adminBlogPostCommentShow.getIdLabel().contains('ID')
                adminBlogPostCommentShow.getId().should('be.visible')
                adminBlogPostCommentShow.getCommentLabel().contains('Comment')
                adminBlogPostCommentShow.getComment().should('be.visible')
                adminBlogPostCommentShow.getRatingLabel().contains('Rating')
                adminBlogPostCommentShow.getRating().should('be.visible')
                adminBlogPostCommentShow.getStatusLabel().contains('Status')
                adminBlogPostCommentShow.getStatus().should('be.visible')
                adminBlogPostCommentShow
                    .getCreatedByLabel()
                    .contains('Created By')
                adminBlogPostCommentShow.getCreatedBy().should('be.visible')
                adminBlogPostCommentShow.getCreatedAtLabel().contains('Created')
                adminBlogPostCommentShow.getCreatedAt().should('be.visible')
                adminBlogPostCommentShow
                    .getUpdatedByLabel()
                    .contains('Updated By')
                adminBlogPostCommentShow.getUpdatedBy().should('be.visible')
                adminBlogPostCommentShow
                    .getUpdatedAtLabel()
                    .contains('Last updated')
                adminBlogPostCommentShow.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully returns to Manage Blog Post Comments page', () => {
        adminBlogPostCommentShow
            .getAdminBlogPostCommentShowContent()
            .within(() => {
                adminBlogPostCommentShow.getReturnButton().click()
            })
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentShow
                    .getPageHeading()
                    .contains('Manage Blog Post Comments')
            })
    })
})
