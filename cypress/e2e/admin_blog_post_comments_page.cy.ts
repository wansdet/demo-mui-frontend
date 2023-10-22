import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostCommentsList,
    AdminBlogPostCommentShow,
    AdminBlogPostCommentEdit,
    AdminBlogPostCommentManage,
} from '../page-objects/features/admin/blog'

describe('The Admin Blog Post Comments Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminBlogPostCommentsList = new AdminBlogPostCommentsList()
    const adminBlogPostCommentShow = new AdminBlogPostCommentShow()
    const adminBlogPostCommentEdit = new AdminBlogPostCommentEdit()
    const adminBlogPostCommentManage = new AdminBlogPostCommentManage()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostCommentsButton().click()
    })

    it('successfully loads Manage Blog Post Comments page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentsList
                    .getPageHeading()
                    .contains('Manage Blog Post Comments')
                adminBlogPostCommentsList.getDataGrid().should('be.visible')
                adminBlogPostCommentsList
                    .getBlogPostCommentShowButton()
                    .should('have.length', 10)
                adminBlogPostCommentsList
                    .getBlogPostCommentManageButton()
                    .should('have.length', 10)
                //adminBlogPostCommentsList
                //    .getBlogPostCommentDeleteButton()
                //    .should('have.length', 10)
                adminBlogPostCommentsList
                    .getDeleteConfirmDialog()
                    .should('not.exist')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully loads Manage Blog Post Show page', () => {
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentsList
                    .getBlogPostCommentShowButton()
                    .first()
                    .click()
            })

        adminBlogPostCommentShow
            .getAdminBlogPostCommentShowContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentShow
                    .getPageHeading()
                    .contains('Show Blog Post Comment')
            })
    })

    it('successfully loads Manage Blog Post Manage page', () => {
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentsList
                    .getBlogPostCommentManageButton()
                    .first()
                    .click()
            })

        adminBlogPostCommentManage
            .getAdminBlogPostCommentManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostCommentManage
                    .getPageHeading()
                    .contains('Manage Blog Post')
            })
    })

    /*
    it('successfully displays Delete Blog Post confirm dialog', () => {
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentsList
                    .getBlogPostCommentDeleteButton()
                    .first()
                    .click()
            })

        adminBlogPostCommentsList
            .getDeleteConfirmDialog()
            .should('exist')
            .within(() => {
                adminBlogPostCommentsList
                    .getDeleteConfirmDialogTitle()
                    .contains('Delete Blog Post')
                adminBlogPostCommentsList
                    .getDeleteConfirmMessage()
                    .contains(
                        'Are you sure you want to delete this blog post comment?'
                    )
                adminBlogPostCommentsList
                    .getDeleteConfirmId()
                    .should('be.visible')
                adminBlogPostCommentsList
                    .getDeleteConfirmCreatedBy()
                    .should('be.visible')
                adminBlogPostCommentsList
                    .getDeleteCancelButton()
                    .should('be.visible')
                adminBlogPostCommentsList
                    .getDeleteConfirmButton()
                    .should('be.visible')
            })
    })

    it('successfully cancels Delete Blog Post confirm dialog', () => {
        adminBlogPostCommentsList
            .getAdminBlogPostCommentsContent()
            .within(() => {
                adminBlogPostCommentsList
                    .getBlogPostCommentDeleteButton()
                    .first()
                    .click()
            })

        adminBlogPostCommentsList.getDeleteConfirmDialog().within(() => {
            adminBlogPostCommentsList.getDeleteCancelButton().click()
        })

        adminBlogPostCommentsList.getDeleteConfirmDialog().should('not.exist')
    })
 */
})
