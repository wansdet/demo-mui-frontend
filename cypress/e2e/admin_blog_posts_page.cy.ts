import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostsList,
    AdminBlogPostShow,
    AdminBlogPostEdit,
    AdminBlogPostManage,
} from '../page-objects/features/admin/blog'

describe('The Admin Blog Posts Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminBlogPostsList = new AdminBlogPostsList()
    const adminBlogPostShow = new AdminBlogPostShow()
    const adminBlogPostEdit = new AdminBlogPostEdit()
    const adminBlogPostManage = new AdminBlogPostManage()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsButton().click()
    })

    it('successfully loads Manage Blog Posts page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostsList
            .getAdminBlogPostsContent()
            .should('exist')
            .within(() => {
                adminBlogPostsList
                    .getPageHeading()
                    .contains('Manage Blog Posts')
                adminBlogPostsList.getDataGrid().should('be.visible')
                adminBlogPostsList
                    .getBlogPostShowButton()
                    .should('have.length', 10)
                adminBlogPostsList
                    .getBlogPostManageButton()
                    .should('have.length', 10)
                /*
                adminBlogPostsList
                    .getBlogPostDeleteButton()
                    .should('have.length', 10)
                 */
                adminBlogPostsList.getDeleteConfirmDialog().should('not.exist')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully loads Manage Blog Post Show page', () => {
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostShowButton().first().click()
        })

        adminBlogPostShow
            .getAdminBlogPostShowContent()
            .should('exist')
            .within(() => {
                adminBlogPostShow.getPageHeading().contains('Show Blog Post')
            })
    })

    it('successfully loads Manage Blog Post Manage page', () => {
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostManageButton().first().click()
        })

        adminBlogPostManage
            .getAdminBlogPostManageContent()
            .should('exist')
            .within(() => {
                adminBlogPostManage
                    .getPageHeading()
                    .contains('Manage Blog Post')
            })
    })
    /*
    it('successfully displays Delete Blog Post confirm dialog', () => {
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostDeleteButton().first().click()
        })

        adminBlogPostsList
            .getDeleteConfirmDialog()
            .should('exist')
            .within(() => {
                adminBlogPostsList
                    .getDeleteConfirmDialogTitle()
                    .contains('Delete Blog Post')
                adminBlogPostsList
                    .getDeleteConfirmMessage()
                    .contains('Are you sure you want to delete this blog post?')
                adminBlogPostsList.getDeleteConfirmId().should('be.visible')
                adminBlogPostsList
                    .getDeleteConfirmCreatedBy()
                    .should('be.visible')
                adminBlogPostsList.getDeleteCancelButton().should('be.visible')
                adminBlogPostsList.getDeleteConfirmButton().should('be.visible')
            })
    })

    it('successfully cancels Delete Blog Post confirm dialog', () => {
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostDeleteButton().first().click()
        })

        adminBlogPostsList.getDeleteConfirmDialog().within(() => {
            adminBlogPostsList.getDeleteCancelButton().click()
        })

        adminBlogPostsList.getDeleteConfirmDialog().should('not.exist')
    })
 */
})
