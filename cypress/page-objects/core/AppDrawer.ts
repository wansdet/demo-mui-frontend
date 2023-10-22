/**
 * src/cypress/page-objects/core/AppDrawer.ts
 * AppDrawer page object class.
 */
export class AppDrawer {
    getAppBar() {
        return cy.get('[data-testid="app-bar"]')
    }

    getAppTitle() {
        return cy.get('[data-testid="app-title"]')
    }

    getHomeButton() {
        return cy.get('[data-testid="home-button"]')
    }

    getBlogButton() {
        return cy.get('[data-testid="blog-button"]')
    }

    getFaqButton() {
        return cy.get('[data-testid="faq-button"]')
    }

    getContactUsButton() {
        return cy.get('[data-testid="contact-us-button"]')
    }

    getMyAccountButton() {
        return cy.get('[data-testid="my-account-button"]')
    }

    getSignUpButton() {
        return cy.get('[data-testid="sign-up-button"]')
    }

    getSignInButton() {
        return cy.get('[data-testid="sign-in-button"]')
    }

    getSignOutButton() {
        return cy.get('[data-testid="sign-out-button"]')
    }

    getAppDrawer() {
        return cy.get('[data-testid="app-drawer"]')
    }

    getAdminHomeButton() {
        return cy.get('[data-testid="admin-home-button"]')
    }

    getAdminBlogPostsButton() {
        return cy.get('[data-testid="admin-blog-posts-button"]')
    }

    getAdminBlogPostCommentsButton() {
        return cy.get('[data-testid="admin-blog-post-comments-button"]')
    }

    getAdminUsersButton() {
        return cy.get('[data-testid="admin-users-button"]')
    }

    getAdminBlogPostsMonthlyCategoriesButton() {
        return cy.get(
            '[data-testid="admin-blog-posts-monthly-categories-button"]'
        )
    }

    getAdminBlogPostsMonthlyAuthorsButton() {
        return cy.get('[data-testid="admin-blog-posts-monthly-authors-button"]')
    }

    getAdminBlogPostsAnnualCategoriesButton() {
        return cy.get(
            '[data-testid="admin-blog-posts-annual-categories-button"]'
        )
    }

    getAdminBlogPostsAnnualAuthorsButton() {
        return cy.get('[data-testid="admin-blog-posts-annual-authors-button"]')
    }
}
