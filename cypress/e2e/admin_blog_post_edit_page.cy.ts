import { AppDrawer, AdminFooter } from '../page-objects/core'
import { UseNotification } from '../page-objects/common/hooks'
import { SignIn } from '../page-objects/features/user'
import {
    AdminBlogPostsList,
    AdminBlogPostEdit,
} from '../page-objects/features/admin/blog'

describe('The Admin Edit Blog Post Page', () => {
    const appDrawer = new AppDrawer()
    const adminFooter = new AdminFooter()
    const useNotification = new UseNotification()
    const signIn = new SignIn()
    const adminBlogPostsList = new AdminBlogPostsList()
    const adminBlogPostEdit = new AdminBlogPostEdit()

    beforeEach(() => {
        signIn.visit()
        signIn.getSignInContent().within(() => {
            signIn.getEmailInput().type('admin1@example.com')
            signIn.getPasswordInput().type('Demo1234')
            signIn.getSignInSubmitButton().click()
        })
        appDrawer.getAdminBlogPostsButton().click()
        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getBlogPostEditButton().first().click()
        })
    })
    /*
    it('successfully loads Edit Blog Post page', () => {
        appDrawer.getAppBar().should('be.visible')

        adminBlogPostEdit
            .getAdminBlogPostEditContent()
            .should('exist')
            .within(() => {
                adminBlogPostEdit.getPageHeading().contains('Edit Blog Post')
                adminBlogPostEdit.getReturnButton()
                adminBlogPostEdit.getIdLabel().contains('ID')
                adminBlogPostEdit.getId().should('be.visible')
                adminBlogPostEdit.getTitleLabel().contains('Title')
                adminBlogPostEdit.getTitle().should('be.visible')
                adminBlogPostEdit.getSlugLabel().contains('Slug')
                adminBlogPostEdit.getSlug().should('be.visible')
                adminBlogPostEdit
                    .getBlogCategoryLabel()
                    .contains('Blog Category')
                adminBlogPostEdit.getBlogCategory().should('be.visible')
                adminBlogPostEdit.getContentLabel().contains('Content')
                adminBlogPostEdit.getContent().should('be.visible')
                adminBlogPostEdit.getStatusLabel().contains('Status')
                adminBlogPostEdit.getStatus().should('be.visible')
                adminBlogPostEdit.getCreatedByLabel().contains('Created By')
                adminBlogPostEdit.getCreatedBy().should('be.visible')
                adminBlogPostEdit.getCreatedAtLabel().contains('Created')
                adminBlogPostEdit.getCreatedAt().should('be.visible')
                adminBlogPostEdit.getUpdatedByLabel().contains('Updated By')
                adminBlogPostEdit.getUpdatedBy().should('be.visible')
                adminBlogPostEdit.getUpdatedAtLabel().contains('Last updated')
                adminBlogPostEdit.getUpdatedAt().should('be.visible')
                adminBlogPostEdit.getSubmitButton().contains('Submit')
            })

        adminFooter.getAdminFooterContent().should('be.visible')
    })

    it('successfully update blog post', () => {
        adminBlogPostEdit
            .getAdminBlogPostEditContent()
            .should('exist')
            .within(() => {
                adminBlogPostEdit.getSubmitButton().click()
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

    it('successfully returns to  Manage Blog Posts page', () => {
        adminBlogPostEdit.getAdminBlogPostEditContent().within(() => {
            adminBlogPostEdit.getReturnButton().click()
        })

        adminBlogPostsList.getAdminBlogPostsContent().within(() => {
            adminBlogPostsList.getPageHeading().contains('Manage Blog Posts')
        })
    })
 */
})
