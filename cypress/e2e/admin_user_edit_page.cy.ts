import { AppDrawer, AdminFooter } from '../page-objects/core'
import { UseNotification } from '../page-objects/common/hooks'
import { SignIn } from '../page-objects/features/user'
import {
    AdminUsersList,
    AdminUserEdit,
} from '../page-objects/features/admin/user'

describe('The Admin Edit User Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const useNotification = new UseNotification()
    const signIn = new SignIn()
    const adminUsersList = new AdminUsersList()
    const adminUserEdit = new AdminUserEdit()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminUsersButton().click()
        adminUsersList.getAdminUsersContent().within(() => {
            adminUsersList.getUserEditButton().first().click()
        })
    })

    it('successfully loads Edit User page', () => {
        adminUserEdit
            .getAdminUserEditContent()
            .should('exist')
            .within(() => {
                adminUserEdit.getPageHeading().contains('User:')
                adminUserEdit.getReturnButton().should('be.visible')
                adminUserEdit.getIdLabel().contains('ID')
                adminUserEdit.getId().should('be.visible')
                adminUserEdit.getDisplayNameLabel().contains('Display name')
                adminUserEdit.getDisplayName().should('be.visible')
                adminUserEdit.getFirstNameLabel().contains('First name')
                adminUserEdit.getFirstName().should('be.visible')
                adminUserEdit.getLastNameLabel().contains('Last name')
                adminUserEdit.getLastName().should('be.visible')
                adminUserEdit.getMiddleNameLabel().contains('Middle name')
                adminUserEdit.getMiddleName().should('be.visible')
                adminUserEdit.getGenderLabel().contains('Gender')
                adminUserEdit.getGender().should('be.visible')
                adminUserEdit.getJobTitleLabel().contains('Job title')
                adminUserEdit.getJobTitle().should('be.visible')
                adminUserEdit.getRolesLabel().contains('Roles')
                adminUserEdit.getRoles().should('be.visible')
                adminUserEdit.getStatusLabel().contains('Status')
                adminUserEdit.getStatus().should('be.visible')
                adminUserEdit.getCreatedByLabel().contains('Created By')
                adminUserEdit.getCreatedBy().should('be.visible')
                adminUserEdit.getCreatedAtLabel().contains('Created')
                adminUserEdit.getCreatedAt().should('be.visible')
                adminUserEdit.getUpdatedByLabel().contains('Updated By')
                adminUserEdit.getUpdatedBy().should('be.visible')
                adminUserEdit.getUpdatedAtLabel().contains('Last updated')
                adminUserEdit.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully updates user', () => {
        adminUserEdit.getAdminUserEditContent().within(() => {
            adminUserEdit.getSubmitButton().click()
        })

        useNotification
            .getUseNotification()
            .should('exist')
            .within(() => {
                useNotification
                    .getNotificationMessage()
                    .contains('User successfully updated')
            })

        useNotification.getUseNotification().should('not.exist')
    })

    it('successfully returns to Manage Users page', () => {
        adminUserEdit.getAdminUserEditContent().within(() => {
            adminUserEdit.getReturnButton().click()
        })

        adminUsersList.getAdminUsersContent().within(() => {
            adminUsersList.getPageHeading().contains('Manage Users')
        })
    })
})
