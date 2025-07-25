import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Container, CssBaseline, Grid, Pagination } from '@mui/material'

import {
    ApplicationContext,
    API_URL_BLOG_POSTS_PUBLISHED,
    APP_NAME,
    BASE_IMAGE_ASSETS_URL,
} from '@/core/application'
import { useApiGet } from '@/core/api'
import Footer from '@/core/layout/Footer'
import { IImage } from '@/common'
import { IBlogPost } from '@/common/models/blog'
import { H3, H1 } from '@/components/data-display'
import { ImageGallery, SideBar } from '@/components/layout'
import {
    BlogAuthorsList,
    BlogCategories,
    BlogPostsCardList,
} from '@/features/blog'
import { capitalizeWord, capitalizeWords } from '@/utils/string'

const BlogPostsList = () => {
    const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([])
    const [galleryImages, setGalleryImages] = useState<IImage[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const itemsPerPage = 10
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = page * itemsPerPage
    const [searchParams] = useSearchParams()
    const apiURL = `${API_URL_BLOG_POSTS_PUBLISHED}?${searchParams.toString()}`

    function getTitle() {
        if (searchParams.get('blogCategory')) {
            return `${capitalizeWord(searchParams.get('blogCategory'))}  Blog`
        }
        if (searchParams.get('createdBy')) {
            return `${capitalizeWords(searchParams.get('createdBy'))}  Blog`
        }
        return 'Blog'
    }

    const title = getTitle()

    document.title = `${title} | ${APP_NAME}`

    const {
        data: fetchedBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(apiURL, false)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedBlogPosts) {
            setTotalPages(Math.ceil(fetchedBlogPosts.length / itemsPerPage))
        }
    }, [fetchedBlogPosts])

    useEffect(() => {
        if (fetchedBlogPosts) {
            setBlogPosts(fetchedBlogPosts)
            setPage(1)

            // TODO: Fetch gallery images from API
            setGalleryImages([])
            for (let i = 1; i < 10; i++) {
                setGalleryImages((prevState) => [
                    ...prevState,
                    {
                        url: `${BASE_IMAGE_ASSETS_URL}/300x300?text=Image ${i}`,
                        title: `Image ${i}`,
                    },
                ])
            }
        }
    }, [fetchedBlogPosts])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    const displayedBlogPosts = blogPosts.slice(startIndex, endIndex)

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value)
    }

    return (
        <>
            <CssBaseline />
            <Container
                id="blog-posts-list-container"
                maxWidth="lg"
                component="main"
                sx={{ pt: 0, pb: 8 }}
            >
                <H1
                    className="page-heading"
                    data-testid="blog-posts-list-heading"
                >
                    {title}
                </H1>
                <Grid container spacing={8}>
                    <Grid
                        data-testid="blog-posts-list-main-content"
                        size={{ xs: 12, md: 8 }}
                    >
                        <Pagination
                            count={totalPages}
                            page={page}
                            sx={{ mt: 3, mb: 3 }}
                            onChange={handlePageChange}
                        />
                        {blogPosts.length > 0 && (
                            <BlogPostsCardList blogPosts={displayedBlogPosts} />
                        )}
                        <Pagination
                            count={totalPages}
                            page={page}
                            sx={{ mt: 3, mb: 3 }}
                            onChange={handlePageChange}
                        />
                    </Grid>
                    <SideBar id="blog-posts-list-sidebar">
                        <aside>
                            <BlogCategories />
                            <BlogAuthorsList />
                            <H3 data-testid="blog-gallery">GALLERY</H3>
                            {galleryImages.length > 0 && (
                                <ImageGallery images={galleryImages} />
                            )}
                        </aside>
                    </SideBar>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default BlogPostsList
