import { AppDrawer, Footer } from '../page-objects/core'
import {
    BlogAuthorsList,
    BlogCategoriesList,
    BlogPostsCardList,
    BlogPostsList,
} from '../page-objects/features/blog'

describe('The Blog Posts List by Categories', () => {
    const appDrawer = new AppDrawer()
    const footer = new Footer()
    const blogPostsList = new BlogPostsList()
    const blogPostsCardList = new BlogPostsCardList()
    const blogAuthorsList = new BlogAuthorsList()
    const blogCategoriesList = new BlogCategoriesList()

    beforeEach(() => {
        blogPostsList.visit()
    })

    it('successfully loads Cookery Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesCookeryButton().click()
            })

        appDrawer.getAppBar().should('be.visible')

        blogPostsList.getBlogPostsListHeading().contains('Cookery Blog')

        blogPostsList
            .getBlogPostsListMainContent()
            .should('be.visible')
            .within(() => {
                blogPostsCardList
                    .getBlogPostsCardActionArea()
                    .should('be.visible')
                    .should('have.length', 10)
                blogPostsCardList
                    .getBlogPostsCardActionArea()
                    .first()
                    .within(() => {
                        blogPostsCardList
                            .getBlogPostCardContentSubTitle()
                            .contains('Cookery')
                    })
            })

        blogCategoriesList.getBlogCategories().should('be.visible')
        blogAuthorsList.getBlogAuthorsList().should('be.visible')
        blogPostsList.getBlogGallery().should('be.visible')

        footer.getFooter().should('be.visible')
    })

    it('successfully loads Fashion Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesFashionButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Fashion Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Fashion')
                })
        })
    })

    it('successfully loads Food Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesFoodButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Food Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Food')
                })
        })
    })

    it('successfully loads Home Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesHomeButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Home Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Home')
                })
        })
    })

    it('successfully loads Leisure Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesLeisureButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Leisure Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Leisure')
                })
        })
    })

    it('successfully loads Technology Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesTechnologyButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Technology Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Technology')
                })
        })
    })

    it('successfully loads Transport Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesTransportButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Transport Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Transport')
                })
        })
    })

    it('successfully loads Travel Blog and contains the expected key elements', () => {
        blogCategoriesList
            .getBlogCategories()
            .should('be.visible')
            .within(() => {
                blogCategoriesList.getBlogCategoriesTravelButton().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Travel Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Travel')
                })
        })
    })
})
