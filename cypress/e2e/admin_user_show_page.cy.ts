import { AppDrawer, AdminFooter } from '../page-objects/core'
import { SignIn } from '../page-objects/features/user'
import {
    AdminUsersList,
    AdminUserShow,
} from '../page-objects/features/admin/user'

describe('The Admin Show User Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const signIn = new SignIn()
    const adminUsersList = new AdminUsersList()
    const adminUserShow = new AdminUserShow()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminUsersButton().click()
        adminUsersList.getAdminUsersContent().within(() => {
            adminUsersList.getUserShowButton().first().click()
        })
    })

    it('successfully loads Show User page', () => {
        adminUserShow
            .getAdminUserShowContent()
            .should('exist')
            .within(() => {
                adminUserShow.getPageHeading().contains('User:')
                adminUserShow.getReturnButton().should('be.visible')
                adminUserShow.getIdLabel().contains('ID')
                adminUserShow.getId().should('be.visible')
                adminUserShow.getDisplayNameLabel().contains('Display name')
                adminUserShow.getDisplayName().should('be.visible')
                adminUserShow.getFirstNameLabel().contains('First name')
                adminUserShow.getFirstName().should('be.visible')
                adminUserShow.getLastNameLabel().contains('Last name')
                adminUserShow.getLastName().should('be.visible')
                adminUserShow.getMiddleNameLabel().contains('Middle name')
                adminUserShow.getMiddleName().should('be.visible')
                adminUserShow.getGenderLabel().contains('Gender')
                adminUserShow.getGender().should('be.visible')
                adminUserShow.getJobTitleLabel().contains('Job title')
                adminUserShow.getJobTitle().should('be.visible')
                adminUserShow.getRolesLabel().contains('Roles')
                adminUserShow.getRoles().should('be.visible')
                adminUserShow.getStatusLabel().contains('Status')
                adminUserShow.getStatus().should('be.visible')
                adminUserShow.getCreatedByLabel().contains('Created By')
                adminUserShow.getCreatedBy().should('be.visible')
                adminUserShow.getCreatedAtLabel().contains('Created')
                adminUserShow.getCreatedAt().should('be.visible')
                adminUserShow.getUpdatedByLabel().contains('Updated By')
                adminUserShow.getUpdatedBy().should('be.visible')
                adminUserShow.getUpdatedAtLabel().contains('Last updated')
                adminUserShow.getUpdatedAt().should('be.visible')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully returns to Manage Users page', () => {
        adminUserShow.getAdminUserShowContent().within(() => {
            adminUserShow.getReturnButton().click()
        })

        adminUsersList.getAdminUsersContent().within(() => {
            adminUsersList.getPageHeading().contains('Manage Users')
        })
    })
})
