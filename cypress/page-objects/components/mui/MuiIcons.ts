/**
 * src/cypress/page-objects/components/mui/MuiIcons.ts
 * AppDrawer page object class.
 */
export class MuiIcons {
    getCalendarTodayIcon() {
        return cy.get('[data-testid="CalendarTodayIcon"]')
    }

    getArticleIcon() {
        return cy.get('[data-testid="ArticleIcon"]')
    }

    getTopicIcon() {
        return cy.get('[data-testid="TopicIcon"]')
    }
}
