import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminUsersList,
    AdminUserShow,
    AdminUserEdit,
} from '../page-objects/features/admin/user'

describe('The Admin Users Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminUsersList = new AdminUsersList()
    const adminUserShow = new AdminUserShow()
    const adminUserEdit = new AdminUserEdit()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminUsersButton().click()
    })

    it('successfully loads Manage Users page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminUsersList
            .getAdminUsersContent()
            .should('exist')
            .within(() => {
                adminUsersList.getPageHeading().contains('Manage Users')
                adminUsersList.getDataGrid().should('be.visible')
                adminUsersList.getUserShowButton().should('have.length', 10)
                adminUsersList.getUserEditButton().should('have.length', 10)
                // adminUsersList.getUserDeleteButton().should('have.length', 10)
                adminUsersList.getDeleteConfirmDialog().should('not.exist')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully loads User Show page', () => {
        adminUsersList.getUserShowButton().first().click()

        adminUserShow
            .getAdminUserShowContent()
            .should('exist')
            .within(() => {
                adminUserShow.getPageHeading().contains('User:')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully loads User Edit page', () => {
        adminUsersList.getUserEditButton().first().click()

        adminUserEdit
            .getAdminUserEditContent()
            .should('exist')
            .within(() => {
                adminUserEdit.getPageHeading().contains('User:')
            })
    })
    /*
    it('successfully displays Delete User confirm dialog', () => {
        adminUsersList.getUserDeleteButton().first().click()

        adminUsersList
            .getDeleteConfirmDialog()
            .should('exist')
            .within(() => {
                adminUsersList
                    .getDeleteConfirmDialogTitle()
                    .contains('Delete User')
                adminUsersList
                    .getDeleteConfirmMessage()
                    .contains('Are you sure you want to delete this user?')
                adminUsersList.getDeleteConfirmId().should('be.visible')
                adminUsersList.getDeleteConfirmName().should('be.visible')
                adminUsersList.getDeleteCancelButton().should('be.visible')
                adminUsersList.getDeleteConfirmButton().should('be.visible')
            })
    })

    it('successfully cancels Delete User confirm dialog', () => {
        adminUsersList.getUserDeleteButton().first().click()

        adminUsersList
            .getDeleteConfirmDialog()
            .should('exist')
            .within(() => {
                adminUsersList.getDeleteCancelButton().click()
            })

        adminUsersList.getDeleteConfirmDialog().should('not.exist')
    })
 */
})
