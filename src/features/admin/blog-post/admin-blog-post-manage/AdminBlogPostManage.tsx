import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useApiGet, useApiPut } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IBlogPostTransition,
    IBlogPostUpdate,
    blogPostStatuses,
    blogPostUpdateSchema,
} from '@/common/models/blog'
import { ChipStatus, H1, Paragraph } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const AdminBlogPostManage = () => {
    const { id } = useParams()
    const [blogPost, setBlogPost] = useState<IBlogPostUpdate | null>(null)
    const [remarks, setRemarks] = useState<string>('')
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [publishDialogOpen, setPublishDialogOpen] = useState(false)
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
    const { showNotification, NotificationComponent } = useNotification()

    const { data: fetchedBlogPost } = useApiGet<IBlogPostUpdate>(
        `${API_URL_BLOG_POSTS}/${id}`
    )

    const {
        putData: rejectBlogPost,
        loading: rejectLoading,
        error: rejectError,
    } = useApiPut<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/reject`)

    const {
        putData: publishBlogPost,
        loading: publishLoading,
        error: publishError,
    } = useApiPut<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/publish`)

    const {
        putData: archiveBlogPost,
        loading: archiveLoading,
        error: archiveError,
    } = useApiPut<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/archive`)

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
    }, [rejectLoading])

    useEffect(() => {
        if (publishLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [publishLoading])

    useEffect(() => {
        if (archiveLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [archiveLoading])

    const handleBlogPostReject = () => {
        // @ts-ignore
        const data: IBlogPostTransition = { remarks: remarks }
        rejectBlogPost(data)
            .then(() => {
                showNotification('Blog post rejected.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(
                        error.response.data['hydra:description'],
                        'error'
                    )
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error'
                    )
                }
            })
    }

    const handleBlogPostPublish = () => {
        // @ts-ignore
        const data: IBlogPostTransition = { remarks: remarks }
        publishBlogPost(data)
            .then(() => {
                showNotification('Blog post published.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(
                        error.response.data['hydra:description'],
                        'error'
                    )
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error'
                    )
                }
            })
    }

    const handleBlogPostArchive = () => {
        // @ts-ignore
        const data: IBlogPostTransition = { remarks: remarks }
        archiveBlogPost(data)
            .then(() => {
                showNotification('Blog post archived.', 'success')
                navigate('/admin/blog-posts/blog-posts-list')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(
                        error.response.data['hydra:description'],
                        'error'
                    )
                } else {
                    showNotification(
                        'Error occurred while updating blog post',
                        'error'
                    )
                }
            })
    }

    return (
        <React.Fragment>
            {blogPost && (
                <React.Fragment>
                    <Container
                        data-testid="admin-blog-post-manage-content"
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
                            <form>
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
                                    <Grid item xs={12} sm={4}></Grid>
                                    <Grid item xs={12} sm={8}>
                                        {blogPost.status === 'submitted' && (
                                            <Button
                                                data-testid="reject-button"
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
                                                data-testid="publish-button"
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
                                                data-testid="archive-button"
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
                            id="reject-dialog"
                            title="Reject Blog Post"
                            open={rejectDialogOpen}
                            onConfirm={handleBlogPostReject}
                            onClose={() => setRejectDialogOpen(false)}
                        >
                            <Paragraph>
                                Are you sure you want to reject this blog post?
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
                        <ConfirmDialog
                            id="publish-dialog"
                            title="Publish Blog Post"
                            open={publishDialogOpen}
                            onConfirm={handleBlogPostPublish}
                            onClose={() => setPublishDialogOpen(false)}
                        >
                            <Paragraph>
                                Are you sure you want to publish this blog post?
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
                        <ConfirmDialog
                            id="archive-dialog"
                            title="Archive Blog Post"
                            open={archiveDialogOpen}
                            onConfirm={handleBlogPostArchive}
                            onClose={() => setArchiveDialogOpen(false)}
                        >
                            <Paragraph>
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
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AdminBlogPostManage
