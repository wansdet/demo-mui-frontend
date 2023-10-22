import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, FormLabel, Grid, Input } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import {
    ApplicationContext,
    API_URL_BLOG_POSTS,
    APP_NAME,
} from '@/core/application'
import { useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import { IBlogPost, blogPostStatuses } from '@/common/models/blog'
import { ChipStatus, H1 } from '@/components/data-display'

const AdminBlogPostShow = () => {
    const { id } = useParams()
    const [blogPost, setBlogPost] = useState<IBlogPost | null>(null)
    const {
        data: fetchedBlogPost,
        loading: getLoading,
        error: getError,
    } = useApiGet<IBlogPost>(`${API_URL_BLOG_POSTS}/${id}`)
    const title = 'Show Blog Post'
    document.title = `Show Blog Post | Admin | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedBlogPost) {
            setBlogPost(fetchedBlogPost)
        }
    }, [fetchedBlogPost])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    const blogPostRolesList = (roles: (string | undefined)[]) => {
        return roles.filter((role) => role !== undefined).join(', ')
    }

    return (
        <React.Fragment>
            {blogPost && (
                <React.Fragment>
                    <Container
                        data-testid="admin-blog-post-show-content"
                        maxWidth="md"
                        component="main"
                        sx={{ pt: 0, pb: 8 }}
                    >
                        <H1 variant="h3" data-testid="page-heading">
                            {title}
                        </H1>
                        <Button
                            data-testid="return-button"
                            color="primary"
                            startIcon={<ChevronLeftIcon />}
                            sx={{ mb: 3 }}
                            onClick={() => navigate(-1)}
                        >
                            Return
                        </Button>
                        <Box
                            sx={{
                                backgroundColor: 'background.paper',
                                p: 8,
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="id"
                                        data-testid="id-label"
                                    >
                                        ID
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="id"
                                        data-testid="id"
                                        name="id"
                                        value={blogPost.blogPostId}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="title"
                                        data-testid="title-label"
                                    >
                                        Title
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="title"
                                        data-testid="title"
                                        name="title"
                                        value={blogPost.title}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="slug"
                                        data-testid="slug-label"
                                    >
                                        Slug
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="slug"
                                        data-testid="slug"
                                        name="slug"
                                        value={blogPost.slug}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="blogCategory"
                                        data-testid="blog-category-label"
                                    >
                                        Blog Category
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="blogCategory"
                                        data-testid="blog-category"
                                        name="blogCategory"
                                        value={
                                            blogPost.blogCategory
                                                .blogCategoryName
                                        }
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="content"
                                        data-testid="content-label"
                                    >
                                        Content
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="content"
                                        data-testid="content"
                                        name="content"
                                        value={blogPost.content}
                                        multiline={true}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="status"
                                        data-testid="status-label"
                                    >
                                        Status
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <ChipStatus
                                        id="status"
                                        statusValue={blogPost.status}
                                        statuses={blogPostStatuses}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="createdBy"
                                        data-testid="created-by-label"
                                    >
                                        Created By
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="createdBy"
                                        data-testid="created-by"
                                        name="createdBy"
                                        value={blogPost.createdBy}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="createdAt"
                                        data-testid="created-at-label"
                                    >
                                        Created
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="createdAt"
                                        data-testid="created-at"
                                        name="createdAt"
                                        value={blogPost.createdAt}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="updatedBy"
                                        data-testid="updated-by-label"
                                    >
                                        Updated By
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="updatedBy"
                                        data-testid="updated-by"
                                        name="updatedBy"
                                        value={blogPost.updatedBy}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="updatedAt"
                                        data-testid="updated-at-label"
                                    >
                                        Last updated
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="updatedAt"
                                        data-testid="updated-at"
                                        name="updatedAt"
                                        value={blogPost.updatedAt}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                    <AdminFooter />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AdminBlogPostShow
