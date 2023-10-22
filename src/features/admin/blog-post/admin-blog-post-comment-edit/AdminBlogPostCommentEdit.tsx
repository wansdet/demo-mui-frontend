import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    FormLabel,
    Grid,
    Input,
    MenuItem,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
    ApplicationContext,
    API_URL_BLOG_POST_COMMENTS,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPut } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IBlogPostCommentUpdate,
    blogPostCommentStatuses,
    blogPostCommentUpdateSchema,
} from '@/common/models/blog'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'
import { H1 } from '@/components/data-display'

const AdminBlogPostCommentEdit = () => {
    const { id } = useParams()
    const [blogPostComment, setBlogPostComment] =
        useState<IBlogPostCommentUpdate | null>(null)
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedBlogPostComment } = useApiGet<IBlogPostCommentUpdate>(
        `${API_URL_BLOG_POST_COMMENTS}/${id}`
    )
    const {
        putData: updatedBlogPostComment,
        loading: getLoading,
        error: getError,
        data: updatedBlogPostCommentData,
    } = useApiPut<IBlogPostCommentUpdate>(`${API_URL_BLOG_POST_COMMENTS}/${id}`)
    const title = 'Edit Blog Post Comment'

    document.title = `${title} | Admin | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(blogPostCommentUpdateSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

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

    const onSubmit = async (data: any) => {
        try {
            await updatedBlogPostComment(data)
            // Create the updated blogPostComment object with updatedBy and updatedAt fields
            const updatedComment: IBlogPostCommentUpdate = {
                ...blogPostComment!,
                updatedBy: updatedBlogPostCommentData?.updatedBy,
                updatedAt: updatedBlogPostCommentData?.updatedAt,
            }
            // Update the blogPostComment state
            setBlogPostComment(updatedComment)
            showNotification(
                'Blog post comment successfully updated',
                'success'
            )
        } catch (error: any) {
            // Possibly add more error codes
            if ([422].includes(error.response.status)) {
                showNotification(
                    error.response.data['hydra:description'],
                    'error'
                )
            } else {
                showNotification(
                    'Error occurred while updating blog post comment',
                    'error'
                )
            }
        }
    }

    return (
        <React.Fragment>
            {blogPostComment && (
                <React.Fragment>
                    <Container
                        data-testid="admin-blog-post-comment-edit-content"
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
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <FormInput
                                            name="id"
                                            data-testid="id"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={
                                                blogPostComment.blogPostCommentId
                                            }
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormInput
                                            data-testid="comment"
                                            name="comment"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={
                                                blogPostComment.comment
                                            }
                                            fullWidth={true}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormInput
                                            data-testid="rating"
                                            name="rating"
                                            control={control}
                                            type="number"
                                            errors={errors}
                                            defaultValue={
                                                blogPostComment.rating
                                            }
                                            fullWidth={true}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormSelect
                                            data-testid="status"
                                            name="status"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={
                                                blogPostComment.status
                                            }
                                            sx={{ my: 0 }}
                                        >
                                            {blogPostCommentStatuses.map(
                                                (statusOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            statusOption.value
                                                        }
                                                    >
                                                        {statusOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
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
                                        <ButtonSubmit
                                            data-testid="submit-button"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Submit
                                        </ButtonSubmit>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        <NotificationComponent />
                    </Container>
                    <AdminFooter />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AdminBlogPostCommentEdit
