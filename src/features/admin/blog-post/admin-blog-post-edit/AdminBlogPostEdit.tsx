import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
    Box,
    Button,
    Container,
    FormLabel,
    Grid,
    Input,
    MenuItem,
    TextField,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PublishIcon from '@mui/icons-material/Publish'
import SaveIcon from '@mui/icons-material/Save'
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
    IBlogPost,
    blogCategories,
    blogPostStatuses,
    blogPostUpdateSchema,
    IBlogPostTransition,
} from '@/common/models/blog'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'
import { H1, Paragraph } from '@/components/data-display'
import { getBlogCategoryIRI } from '@/utils/iri/IRIUtils'
import { ConfirmDialog } from '@/components/utils'

const AdminBlogPostEdit = () => {
    const { id } = useParams()
    const [blogPost, setBlogPost] = useState<IBlogPost | null>(null)
    const [remarks, setRemarks] = useState('')
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
    const { showNotification, NotificationComponent } = useNotification()

    const { data: fetchedBlogPost } = useApiGet<IBlogPost>(
        `${API_URL_BLOG_POSTS}/${id}`,
    )

    const {
        patchData: updatedBlogPost,
        loading: getLoading,
        error: updateError,
        data: updatedBlogPostData,
    } = useApiPatch<IBlogPost>(`${API_URL_BLOG_POSTS}/${id}`)

    const {
        patchData: submitBlogPost,
        loading: submitLoading,
        error: submitError,
    } = useApiPatch<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/submit`)

    const title = 'Edit Blog Post'
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
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, getLoading, showLoading])

    useEffect(() => {
        if (submitLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, showLoading, submitLoading])

    const onSubmit = async (data: any) => {
        const formData = {
            ...data,
            blogCategory: getBlogCategoryIRI(data.blogCategory),
        }

        try {
            await updatedBlogPost(formData)
            // Create the updated blogPostComment object with updatedBy and updatedAt fields
            const updatedPost: IBlogPost = {
                ...blogPost!,
                updatedBy: updatedBlogPostData?.updatedBy,
                updatedAt: updatedBlogPostData?.updatedAt,
            }
            setBlogPost(updatedPost)
            showNotification('Blog post successfully updated', 'success')
        } catch (error: any) {
            if ([422].includes(error.response.status)) {
                showNotification(error.response.data.description, 'error')
            } else {
                showNotification(
                    'Error occurred while updating blog post',
                    'error',
                )
            }
        }
    }

    const handleBlogPostSubmit = () => {
        const formData = {
            remarks,
        }

        submitBlogPost(formData)
            .then(() => {
                showNotification('Blog post successfully submitted', 'success')
                navigate(-1)
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while submitting blog post',
                        'error',
                    )
                }
            })
    }

    return (
        blogPost && (
            <>
                <Container
                    data-testid="admin-blog-post-edit-content"
                    maxWidth="md"
                    component="main"
                    sx={{ pt: 0, pb: 8 }}
                >
                    <H1
                        variant="h3"
                        className="page-heading"
                        data-testid="edit-blog-post-heading"
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
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <FormInput
                                        id="id"
                                        data-testid="id"
                                        name="id"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={blogPost.blogPostId}
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
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
                                    <FormInput
                                        id="title"
                                        data-testid="title"
                                        name="title"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={blogPost.title}
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
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
                                    <FormInput
                                        id="slug"
                                        data-testid="slug"
                                        name="slug"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={blogPost.slug}
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
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
                                    <FormSelect
                                        id="blogCategory"
                                        data-testid="blog-category"
                                        name="blogCategory"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={
                                            blogPost.blogCategory
                                                .blogCategoryCode
                                        }
                                        sx={{ my: 0 }}
                                    >
                                        {blogCategories.map(
                                            (categoryOption) => (
                                                <MenuItem
                                                    key={categoryOption.value}
                                                    value={categoryOption.value}
                                                >
                                                    {categoryOption.label}
                                                </MenuItem>
                                            ),
                                        )}
                                    </FormSelect>
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
                                    <FormInput
                                        id="content"
                                        data-testid="content"
                                        name="content"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={blogPost.content}
                                        fullWidth
                                        multiline
                                        sx={{ m: 0, p: 0 }}
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
                                    <FormSelect
                                        id="status"
                                        data-testid="status"
                                        name="status"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={blogPost.status}
                                        sx={{ my: 0 }}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    >
                                        {blogPostStatuses.map(
                                            (statusOption) => (
                                                <MenuItem
                                                    key={statusOption.value}
                                                    value={statusOption.value}
                                                >
                                                    {statusOption.label}
                                                </MenuItem>
                                            ),
                                        )}
                                    </FormSelect>
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
                                        data-testid="createdBy"
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
                                        data-testid="createdAt"
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
                                        data-testid="updatedBy"
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
                                        data-testid="updatedAt"
                                        name="updatedAt"
                                        value={blogPost.updatedAt}
                                        fullWidth
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}></Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <ButtonSubmit
                                        id="save-btn"
                                        data-testid="save-btn"
                                        sx={{ mt: 3, mb: 2, mr: 1 }}
                                    >
                                        <SaveIcon />
                                        Save
                                    </ButtonSubmit>
                                    <Button
                                        id="submit-btn"
                                        data-testid="submit-btn"
                                        variant="contained"
                                        color="success"
                                        sx={{ mt: 3, mb: 2, mr: 1 }}
                                        onClick={() =>
                                            setSubmitDialogOpen(true)
                                        }
                                    >
                                        <PublishIcon />
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    <ConfirmDialog
                        id="submit-blog-post-dialog"
                        title="Submit Blog Post"
                        open={submitDialogOpen}
                        onConfirm={handleBlogPostSubmit}
                        onClose={() => setSubmitDialogOpen(false)}
                    >
                        <Paragraph>
                            Are you sure you want to submit this blog post?
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

export default AdminBlogPostEdit
