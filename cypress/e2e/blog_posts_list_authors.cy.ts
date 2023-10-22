import { AppDrawer, Footer } from '../page-objects/core'
import {
    BlogAuthorsList,
    BlogPostsCardList,
    BlogPostsList,
} from '../page-objects/features/blog'

describe('The Blog Posts List by Categories', () => {
    const blogPostsList = new BlogPostsList()
    const blogPostsCardList = new BlogPostsCardList()
    const blogAuthorsList = new BlogAuthorsList()

    beforeEach(() => {
        blogPostsList.visit()
    })

    it('successfully loads Robert Walker Blog and contains the expected key elements', () => {
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorButton().first().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Robert Walker Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Robert Walker')
                })
        })
    })

    it('successfully loads Venessa Hall Blog and contains the expected key elements', () => {
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorButton().eq(1).click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Venessa Hall Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Venessa Hall')
                })
        })
    })

    it('successfully loads Karen Young Blog and contains the expected key elements', () => {
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorButton().eq(2).click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Karen Young Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Karen Young')
                })
        })
    })

    it('successfully loads Madeleine Allen Blog and contains the expected key elements', () => {
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorButton().eq(3).click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Madeleine Allen Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Madeleine Allen')
                })
        })
    })

    it('successfully loads Bethany Harris Blog and contains the expected key elements', () => {
        blogAuthorsList
            .getBlogAuthorsList()
            .should('be.visible')
            .within(() => {
                blogAuthorsList.getBlogAuthorButton().last().click()
            })

        blogPostsList.getBlogPostsListHeading().contains('Bethany Harris Blog')

        blogPostsList.getBlogPostsListMainContent().within(() => {
            blogPostsCardList
                .getBlogPostsCardActionArea()
                .first()
                .within(() => {
                    blogPostsCardList
                        .getBlogPostCardContentSubTitle()
                        .contains('Bethany Harris')
                })
        })
    })
})
