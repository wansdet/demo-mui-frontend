import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
    Box,
    Button,
    Container,
    FormLabel,
    Grid,
    Input,
    TextField,
} from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PublishIcon from '@mui/icons-material/Publish'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
    ApplicationContext,
    API_URL_BLOG_POSTS,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPatch } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IBlogPostTransition,
    IBlogPost,
    blogPostStatuses,
    blogPostUpdateSchema,
} from '@/common/models/blog'
import { ChipStatus, H1, Paragraph } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const AdminBlogPostManage = () => {
    const { id } = useParams()
    const [blogPost, setBlogPost] = useState<IBlogPost | null>(null)
    const [remarks, setRemarks] = useState<string>('')
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [publishDialogOpen, setPublishDialogOpen] = useState(false)
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
    const { showNotification, NotificationComponent } = useNotification()

    const { data: fetchedBlogPost } = useApiGet<IBlogPost>(
        `${API_URL_BLOG_POSTS}/${id}`,
    )

    const {
        patchData: rejectBlogPost,
        loading: rejectLoading,
        error: rejectError,
    } = useApiPatch<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/reject`)

    const {
        patchData: publishBlogPost,
        loading: publishLoading,
        error: publishError,
    } = useApiPatch<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/publish`)

    const {
        patchData: archiveBlogPost,
        loading: archiveLoading,
        error: archiveError,
    } = useApiPatch<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/archive`)

    const title = 'Manage Blog Post'
    document.title = `${title} | Admin | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(blogPostUpdateSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    useEffect(() => {
        if (fetchedBlogPost) {
            setBlogPost(fetchedBlogPost)
        }
    }, [fetchedBlogPost])

    useEffect(() => {
        if (rejectLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, rejectLoading, showLoading])

    useEffect(() => {
        if (publishLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, publishLoading, showLoading])

    useEffect(() => {
        if (archiveLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [archiveLoading, hideLoading, showLoading])

    const handleBlogPostReject = () => {
        const data: IBlogPostTransition = { remarks }
        rejectBlogPost(data)
            .then(() => {
                showNotification('Blog post rejected.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error',
                    )
                }
            })
    }

    const handleBlogPostPublish = () => {
        const data: IBlogPostTransition = { remarks }
        publishBlogPost(data)
            .then(() => {
                showNotification('Blog post published.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error',
                    )
                }
            })
    }

    const handleBlogPostArchive = () => {
        const data: IBlogPostTransition = { remarks }
        archiveBlogPost(data)
            .then(() => {
                showNotification('Blog post archived.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error',
                    )
                }
            })
    }

    return (
        blogPost && (
            <>
                <Container
                    data-testid="admin-blog-post-manage-content"
                    maxWidth="md"
                    component="main"
                    sx={{ pt: 0, pb: 8 }}
                >
                    <H1
                        variant="h3"
                        className="page-heading"
                        data-testid="manage-blog-post-heading"
                    >
                        {title}
                    </H1>
                    <Button
                        id="return-btn"
                        data-testid="return-btn"
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
                        <form>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="id"
                                        data-testid="id-label"
                                    >
                                        ID
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="id"
                                        data-testid="id"
                                        name="id"
                                        value={blogPost.blogPostId}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="title"
                                        data-testid="title-label"
                                    >
                                        Title
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="title"
                                        data-testid="title"
                                        name="title"
                                        value={blogPost.title}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="slug"
                                        data-testid="slug-label"
                                    >
                                        Slug
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="slug"
                                        data-testid="slug"
                                        name="slug"
                                        value={blogPost.slug}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="blogCategory"
                                        data-testid="blog-category-label"
                                    >
                                        Blog Category
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="blogCategory"
                                        data-testid="blog-category"
                                        name="blogCategory"
                                        value={
                                            blogPost.blogCategory
                                                .blogCategoryName
                                        }
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="content"
                                        data-testid="content-label"
                                    >
                                        Content
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="content"
                                        data-testid="content"
                                        name="content"
                                        value={blogPost.content}
                                        multiline
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="status"
                                        data-testid="status-label"
                                    >
                                        Status
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <ChipStatus
                                        id="status"
                                        statusValue={blogPost.status}
                                        statuses={blogPostStatuses}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="createdBy"
                                        data-testid="created-by-label"
                                    >
                                        Created By
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="createdBy"
                                        data-testid="created-by"
                                        name="createdBy"
                                        value={blogPost.createdBy}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="createdAt"
                                        data-testid="created-at-label"
                                    >
                                        Created
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="createdAt"
                                        data-testid="created-at"
                                        name="createdAt"
                                        value={blogPost.createdAt}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="updatedBy"
                                        data-testid="updated-by-label"
                                    >
                                        Updated By
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="updatedBy"
                                        data-testid="updated-by"
                                        name="updatedBy"
                                        value={blogPost.updatedBy}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel
                                        htmlFor="updatedAt"
                                        data-testid="updated-at-label"
                                    >
                                        Last updated
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <Input
                                        id="updatedAt"
                                        data-testid="updated-at"
                                        name="updatedAt"
                                        value={blogPost.updatedAt}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }} />
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    {blogPost.status === 'submitted' && (
                                        <Button
                                            id="reject-btn"
                                            data-testid="reject-btn"
                                            variant="contained"
                                            color="error"
                                            sx={{ mt: 3, mb: 2, mr: 1 }}
                                            onClick={() =>
                                                setRejectDialogOpen(true)
                                            }
                                        >
                                            <ThumbDownIcon />
                                            Reject
                                        </Button>
                                    )}
                                    {(blogPost.status === 'submitted' ||
                                        blogPost.status === 'archived') && (
                                        <Button
                                            id="publish-btn"
                                            data-testid="publish-btn"
                                            variant="contained"
                                            color="success"
                                            sx={{ mt: 3, mb: 2, mr: 1 }}
                                            onClick={() =>
                                                setPublishDialogOpen(true)
                                            }
                                        >
                                            <PublishIcon />
                                            Publish
                                        </Button>
                                    )}
                                    {blogPost.status === 'published' && (
                                        <Button
                                            id="archive-btn"
                                            data-testid="archive-btn"
                                            variant="contained"
                                            color="warning"
                                            sx={{ mt: 3, mb: 2, mr: 1 }}
                                            onClick={() =>
                                                setArchiveDialogOpen(true)
                                            }
                                        >
                                            <ArchiveIcon />
                                            Archive
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    <ConfirmDialog
                        id="reject-blog-post-dialog"
                        title="Reject Blog Post"
                        open={rejectDialogOpen}
                        onConfirm={handleBlogPostReject}
                        onClose={() => setRejectDialogOpen(false)}
                    >
                        <Paragraph data-testid="reject-dialog-text">
                            Are you sure you want to reject this blog post?
                        </Paragraph>
                        <TextField
                            data-testid="remarks"
                            label="Remarks (Max 1000 characters)"
                            multiline
                            rows={5}
                            fullWidth
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </ConfirmDialog>
                    <ConfirmDialog
                        id="publish-blog-post-dialog"
                        title="Publish Blog Post"
                        open={publishDialogOpen}
                        onConfirm={handleBlogPostPublish}
                        onClose={() => setPublishDialogOpen(false)}
                    >
                        <Paragraph data-testid="publish-dialog-text">
                            Are you sure you want to publish this blog post?
                        </Paragraph>
                        <TextField
                            data-testid="remarks"
                            label="Remarks (Max 1000 characters)"
                            multiline
                            rows={5}
                            fullWidth
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </ConfirmDialog>
                    <ConfirmDialog
                        id="archive-blog-post-dialog"
                        title="Archive Blog Post"
                        open={archiveDialogOpen}
                        onConfirm={handleBlogPostArchive}
                        onClose={() => setArchiveDialogOpen(false)}
                    >
                        <Paragraph data-testid="archive-dialog-text">
                            Are you sure you want to archive this blog post?
                        </Paragraph>
                        <TextField
                            label="Remarks (Max 1000 characters)"
                            multiline
                            rows={5}
                            fullWidth
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </ConfirmDialog>
                    <NotificationComponent />
                </Container>
                <AdminFooter />
            </>
        )
    )
}

export default AdminBlogPostManage
