import React, { useContext, useEffect, useState } from 'react'
import { Container, CssBaseline, Grid } from '@mui/material'

import {
    ApplicationContext,
    API_URL_BLOG_POSTS_FEATURED,
    APP_NAME,
    BASE_IMAGE_ASSETS_URL,
} from '@/core/application'
import { useApiGet } from '@/core/api'
import { Footer } from '@/core/layout'
import { IImage } from '@/common'
import { IBlogPost } from '@/common/models/blog'
import { H3, H1 } from '@/components/data-display'
import { ImageGallery, SideBar } from '@/components/layout'
import {
    BlogAuthorsList,
    BlogPostsCardList,
    BlogCategories,
} from '@/features/blog'

const FeaturedBlogs = () => {
    const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([])
    const [galleryImages, setGalleryImages] = useState<IImage[]>([])
    document.title = `Blog | ${APP_NAME}`

    const {
        data: fetchedBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_POSTS_FEATURED, false)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedBlogPosts) {
            setBlogPosts(fetchedBlogPosts)

            // TODO: Fetch gallery images from API
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
    }, [getLoading])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" component="main" sx={{ pt: 0, pb: 8 }}>
                <H1 data-testid="blog-posts-list-heading">Blog</H1>
                <Grid container spacing={8}>
                    <Grid
                        data-testid="blog-posts-list-main-content"
                        item
                        xs={12}
                        md={8}
                    >
                        {blogPosts.length > 0 && (
                            <BlogPostsCardList blogPosts={blogPosts} />
                        )}
                    </Grid>
                    <SideBar>
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
        </React.Fragment>
    )
}

export default FeaturedBlogs
