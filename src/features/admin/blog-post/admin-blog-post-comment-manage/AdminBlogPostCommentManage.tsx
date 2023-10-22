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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import {
    ApplicationContext,
    API_URL_BLOG_POST_COMMENTS,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPut } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IBlogPostComment,
    blogPostCommentStatuses,
    IBlogPostTransition,
} from '@/common/models/blog'
import { ChipStatus, H1, Paragraph } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const AdminBlogPostCommentManage = () => {
    const { id } = useParams()
    const [blogPostComment, setBlogPostComment] =
        useState<IBlogPostComment | null>(null)
    const [remarks, setRemarks] = useState<string>('')
    const [rejectDialogOpen, setRejectDialogOpen] = useState<boolean>(false)
    const { showNotification, NotificationComponent } = useNotification()

    const {
        data: fetchedBlogPostComment,
        loading: getLoading,
        error: getError,
    } = useApiGet<IBlogPostComment>(`${API_URL_BLOG_POST_COMMENTS}/${id}`)

    const {
        putData: rejectBlogPostComment,
        loading: rejectLoading,
        error: rejectError,
    } = useApiPut<IBlogPostTransition>(
        `${API_URL_BLOG_POST_COMMENTS}/${id}/reject`
    )

    const title = 'Manage Blog Post Comment'

    document.title = `${title} | Admin | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedBlogPostComment) {
            setBlogPostComment(fetchedBlogPostComment)
        }
    }, [fetchedBlogPostComment])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading])

    useEffect(() => {
        if (rejectLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [rejectLoading])

    const handleBlogPostCommentReject = () => {
        // @ts-ignore
        const data: IBlogPostTransition = { remarks: remarks }
        rejectBlogPostComment(data)
            .then(() => {
                showNotification('Blog post comment rejected.', 'success')
                navigate('/admin/blog-posts/blog-post-comments-list')
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
            {blogPostComment && (
                <React.Fragment>
                    <Container
                        data-testid="admin-blog-post-comment-manage-content"
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
                        <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
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
                                        value={
                                            blogPostComment.blogPostCommentId
                                        }
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="comment"
                                        data-testid="comment-label"
                                    >
                                        Comment
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="comment"
                                        data-testid="comment"
                                        name="comment"
                                        value={blogPostComment.comment}
                                        multiline={true}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="rating"
                                        data-testid="rating-label"
                                    >
                                        Rating
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="rating"
                                        data-testid="rating"
                                        name="rating"
                                        value={blogPostComment.rating}
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
                                        statusValue={blogPostComment.status}
                                        statuses={blogPostCommentStatuses}
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
                                        value={blogPostComment.createdBy}
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
                                        value={blogPostComment.createdAt}
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
                                        value={blogPostComment.updatedBy}
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
                                        value={blogPostComment.updatedAt}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={8}>
                                    {blogPostComment.status === 'published' && (
                                        <Button
                                            data-testid="reject-button"
                                            variant="contained"
                                            color="secondary"
                                            sx={{ mt: 3 }}
                                            onClick={() =>
                                                setRejectDialogOpen(true)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                        <ConfirmDialog
                            id="reject-dialog"
                            title="Reject Blog Post Comment"
                            open={rejectDialogOpen}
                            onConfirm={handleBlogPostCommentReject}
                            onClose={() => setRejectDialogOpen(false)}
                        >
                            <Paragraph>
                                Are you sure you want to reject this blog post
                                comment?
                            </Paragraph>
                            <TextField
                                label="Remarks (Max 255 characters)"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                inputProps={{ maxLength: 255 }}
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

export default AdminBlogPostCommentManage
