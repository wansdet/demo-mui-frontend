import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
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

import { SecurityContext } from '@/core/security'
import {
    ApplicationContext,
    API_URL_BLOG_POSTS,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPut } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IBlogPostUpdate,
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
    const [blogPost, setBlogPost] = useState<IBlogPostUpdate | null>(null)
    const [loading, setLoading] = useState(false)
    const [remarks, setRemarks] = useState('')
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
    const { showNotification, NotificationComponent } = useNotification()

    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    const { data: fetchedBlogPost } = useApiGet<IBlogPostUpdate>(
        `${API_URL_BLOG_POSTS}/${id}`
    )

    const {
        putData: submitBlogPost,
        loading: submitLoading,
        error: submitError,
    } = useApiPut<IBlogPostTransition>(`${API_URL_BLOG_POSTS}/${id}/submit`)

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
        if (loading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [loading])

    useEffect(() => {
        if (submitLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [submitLoading])

    const onSubmit = (data: any) => {
        const formData = {
            ...data,
            blogCategory: getBlogCategoryIRI(data.blogCategory),
        }

        setLoading(true)

        Axios.put(`${API_URL_BLOG_POSTS}/${id}`, formData, { headers })
            .then((response) => {
                setLoading(false)
                setBlogPost(response.data)
                showNotification('Blog post successfully updated', 'success')
            })
            .catch((error) => {
                setLoading(false)
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

    const handleBlogPostSubmit = () => {
        const formData = {
            remarks: remarks,
        }

        submitBlogPost(formData)
            .then(() => {
                showNotification('Blog post successfully submitted', 'success')
                navigate(-1)
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
                        'Error occurred while submitting blog post',
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
                        data-testid="admin-blog-post-edit-content"
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
                                            defaultValue={blogPost.blogPostId}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormInput
                                            data-testid="title"
                                            name="title"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={blogPost.title}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormInput
                                            data-testid="slug"
                                            name="slug"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={blogPost.slug}
                                            fullWidth={true}
                                            sx={{ m: 0, p: 0 }}
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
                                        <FormSelect
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
                                                (categoryOption, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            categoryOption.value
                                                        }
                                                    >
                                                        {categoryOption.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </FormSelect>
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
                                        <FormInput
                                            data-testid="content"
                                            name="content"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={blogPost.content}
                                            fullWidth={true}
                                            multiline={true}
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
                                            defaultValue={blogPost.status}
                                            sx={{ my: 0 }}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        >
                                            {blogPostStatuses.map(
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
                                        <ButtonSubmit
                                            data-testid="submit-button"
                                            sx={{ mt: 3, mb: 2, mr: 1 }}
                                        >
                                            <SaveIcon />
                                            Save
                                        </ButtonSubmit>
                                        <Button
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
                            id="submit-dialog"
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
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AdminBlogPostEdit
