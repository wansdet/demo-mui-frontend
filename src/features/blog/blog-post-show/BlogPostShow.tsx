import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Axios from 'axios'
import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CommentIcon from '@mui/icons-material/Comment'
import ArticleIcon from '@mui/icons-material/Article'
import TopicIcon from '@mui/icons-material/Topic'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { SecurityContext } from '@/core/security'
import {
    API_URL_BLOG_POST_COMMENTS,
    API_URL_BLOG_POSTS,
    APP_NAME,
    BASE_IMAGE_ASSETS_URL,
} from '@/core/application'
import { useApiGet } from '@/core/api'
import Footer from '@/core/layout/Footer'
import { IImage } from '@/common'
import { IBlogPostComment, IBlogPost } from '@/common/models/blog'
import {
    H2,
    H3,
    Heading,
    Paragraph,
    ParagraphSanitized,
    Section,
} from '@/components/data-display'
import { ImageGallery, SideBar } from '@/components/layout'
import { dateFormat } from '@/utils/date'
import useNotification from '@/common/hooks/feedback/useNotification'
import { getBlogPostIRI } from '@/utils/iri/IRIUtils'
import {
    BlogAuthor,
    BlogCategories,
    BlogPostCommentCreate,
    BlogPostCommentList,
    BlogPostSocialMedia,
} from '@/features/blog'

const BlogPostShow = () => {
    const { id } = useParams()
    const [blogPost, setBlogPost] = useState<IBlogPost | null>(null)
    const [galleryImages, setGalleryImages] = useState<IImage[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { showNotification, NotificationComponent } = useNotification()

    const {
        data: fetchedBlogPost,
        loading: getLoading,
        error: getError,
    } = useApiGet<IBlogPost>(`${API_URL_BLOG_POSTS}/${id}`, false)

    const title = 'Blog Post'
    document.title = `${title} | ${APP_NAME}`

    const navigate = useNavigate()

    const auth = useContext(SecurityContext)
    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    useEffect(() => {
        if (fetchedBlogPost) {
            setBlogPost(fetchedBlogPost)

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
    }, [fetchedBlogPost])

    const handleCommentSubmit = (formData: any) => {
        const body = {
            comment: formData.comment,
            rating: formData.rating,
            blogPost: getBlogPostIRI(id),
        }

        Axios.post(`${API_URL_BLOG_POST_COMMENTS}`, body, { headers })
            .then((response) => {
                const updatedComments: IBlogPostComment[] = [
                    ...(blogPost?.blogPostComments || []),
                    response.data,
                ]
                const updatedBlogPost: IBlogPost = {
                    ...blogPost,
                    blogPostComments: updatedComments,
                    blogPostId: blogPost?.blogPostId || '',
                    status: blogPost?.status || '',
                    blogCategory: blogPost?.blogCategory! || '',
                }
                setBlogPost(updatedBlogPost)
            })
            .catch((e) => {
                if ([422].includes(e.response.status)) {
                    showNotification(e.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while submitting blog post',
                        'error',
                    )
                }
            })
    }

    return (
        <>
            <CssBaseline />
            {blogPost && (
                <Container maxWidth="lg" sx={{ mb: 20 }}>
                    <Button
                        color="primary"
                        startIcon={<ChevronLeftIcon />}
                        sx={{ mb: 5 }}
                        onClick={() => navigate(-1)}
                    >
                        Return
                    </Button>
                    <Grid container spacing={5} sx={{ pt: 0 }}>
                        <Grid size={{ xs: 12, md: 8 }} sx={{ py: 3 }}>
                            <main>
                                <article>
                                    <Section id="blog-post-main-content">
                                        <header data-testid="blog-post-title">
                                            <Heading className="page-heading">
                                                {blogPost.title}
                                            </Heading>
                                        </header>
                                        <Typography
                                            variant="subtitle1"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            sx={{ mb: 1 }}
                                        >
                                            <CalendarTodayIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ mr: 1 }}
                                            />
                                            {dateFormat(
                                                blogPost.createdAt,
                                                'MMM D, YYYY',
                                            )}
                                            <ArticleIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ ml: 1, mr: 1 }}
                                            />
                                            {blogPost.createdBy}
                                            <TopicIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ ml: 1, mr: 1 }}
                                            />
                                            {
                                                blogPost.blogCategory
                                                    .blogCategoryName
                                            }{' '}
                                            <CommentIcon
                                                fontSize="small"
                                                color="primary"
                                                sx={{ ml: 1, mr: 1 }}
                                            />
                                            {blogPost.blogPostComments
                                                ?.length || 0}
                                        </Typography>
                                        <img
                                            src={`${BASE_IMAGE_ASSETS_URL}/600x300?text=Blog Post Image`}
                                            alt={blogPost.title}
                                            width="100%"
                                            loading="lazy"
                                            style={{
                                                height: 'auto',
                                            }}
                                        />{' '}
                                        <ParagraphSanitized
                                            data-testid="blog-post-show-lead-description"
                                            text={blogPost.content!}
                                        />
                                        <BlogPostSocialMedia />
                                        <H2 sx={{ mt: 10 }}>Comments</H2>
                                        <BlogPostCommentList
                                            comments={
                                                blogPost.blogPostComments!
                                            }
                                        />
                                        <H2>Leave a comment</H2>
                                        {/* if authenticated display add comment form otherwise display message */}
                                        {auth.user ? (
                                            <BlogPostCommentCreate
                                                onCommentSubmit={
                                                    handleCommentSubmit
                                                }
                                            />
                                        ) : (
                                            <Paragraph>
                                                You must sign in to leave a
                                                comment.
                                            </Paragraph>
                                        )}
                                    </Section>
                                </article>
                            </main>
                        </Grid>
                        <SideBar id="blog-post-sidebar">
                            <aside>
                                <BlogAuthor author={blogPost.author!} />
                                <BlogCategories />
                                <H3>GALLERY</H3>
                                {galleryImages.length > 0 && (
                                    <ImageGallery images={galleryImages} />
                                )}
                            </aside>
                        </SideBar>
                    </Grid>
                    <NotificationComponent />
                </Container>
            )}
            <Footer />
        </>
    )
}

export default BlogPostShow
