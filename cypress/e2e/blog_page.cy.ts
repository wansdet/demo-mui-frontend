import { AppDrawer, Footer } from '../page-objects/core'
import { MuiIcons } from '../page-objects/components/mui'
import {
    BlogAuthorsList,
    BlogCategoriesList,
    BlogPostsCardList,
    BlogPostsList,
} from '../page-objects/features/blog'

describe('The Blog Page', () => {
    const appDrawer = new AppDrawer()
    const footer = new Footer()
    const blogPostsList = new BlogPostsList()
    const blogPostsCardList = new BlogPostsCardList()
    const blogAuthorsList = new BlogAuthorsList()
    const blogCategoriesList = new BlogCategoriesList()
    const muiIcons = new MuiIcons()

    beforeEach(() => {
        blogPostsList.visit()
    })

    it('successfully loads and contains the expected key elements', () => {
        appDrawer.getAppBar().should('be.visible')

        blogPostsList.getBlogPostsListHeading().contains('Blog')

        blogPostsList
            .getBlogPostsListMainContent()
            .should('be.visible')
            .within(() => {
                blogPostsCardList
                    .getBlogPostsCardActionArea()
                    .should('be.visible')
                    .should('have.length', 9)
            })

        blogCategoriesList.getBlogCategories().should('be.visible')
        blogAuthorsList.getBlogAuthorsList().should('be.visible')
        blogPostsList.getBlogGallery().should('be.visible')

        footer.getFooter().should('be.visible')
    })

    it('successfully loads and contains the blog posts card list key elements', () => {
        blogPostsCardList
            .getBlogPostsCardActionArea()
            .should('be.visible')
            .first()
            .within(() => {
                blogPostsCardList
                    .getBlogPostCardContent()
                    .should('be.visible')
                    .within(() => {
                        blogPostsCardList
                            .getBlogPostCardContentHeading()
                            .should('be.visible')
                        blogPostsCardList
                            .getBlogPostCardContentSubTitle()
                            .should('be.visible')
                            .within(() => {
                                muiIcons
                                    .getCalendarTodayIcon()
                                    .should('be.visible')
                                muiIcons.getArticleIcon().should('be.visible')
                                muiIcons.getTopicIcon().should('be.visible')
                            })
                        blogPostsCardList
                            .getBlogPostCardContentDescription()
                            .should('be.visible')
                        blogPostsCardList
                            .getBlogPostCardContentReadMore()
                            .should('be.visible')
                    })
            })
    })

    it('successfully loads and contains the blog categories list elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList
                    .getBlogCategoriesHeading()
                    .contains('BLOG CATEGORIES')
                blogCategoriesList
                    .getBlogCategoriesCookeryButton()
                    .contains('Cookery')
                blogCategoriesList
                    .getBlogCategoriesFashionButton()
                    .contains('Fashion')
                blogCategoriesList
                    .getBlogCategoriesFoodButton()
                    .contains('Food')
                blogCategoriesList.getBlogCategoriesHomeLink().contains('Home')
                blogCategoriesList
                    .getBlogCategoriesLeisureButton()
                    .contains('Leisure')
                blogCategoriesList
                    .getBlogCategoriesTechnologyButton()
                    .contains('Technology')
                blogCategoriesList
                    .getBlogCategoriesTransportLink()
                    .contains('Transport')
            })
    })

    it('successfully loads and contains the blog authors list elements', () => {
        blogAuthorsList.getBlogAuthorsListHeading().contains('BLOG AUTHORS')
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorLink().should('have.length', 5)
                blogAuthorsList.getBlogAuthorButton().should('have.length', 5)
                blogAuthorsList
                    .getBlogAuthorButton()
                    .first()
                    .contains('Robert Walker')
                blogAuthorsList
                    .getBlogAuthorButton()
                    .eq(1)
                    .contains('Venessa Hall')
                blogAuthorsList
                    .getBlogAuthorButton()
                    .eq(2)
                    .contains('Karen Young')
                blogAuthorsList
                    .getBlogAuthorButton()
                    .eq(3)
                    .contains('Madeleine Allen')
                blogAuthorsList
                    .getBlogAuthorButton()
                    .last()
                    .contains('Bethany Harris')
            })
    })
})
