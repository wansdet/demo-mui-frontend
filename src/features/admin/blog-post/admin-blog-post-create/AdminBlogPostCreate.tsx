import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'

import {
    Box,
    Button,
    Container,
    FormLabel,
    Grid,
    MenuItem,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SecurityContext } from '@/core/security'
import {
    ApplicationContext,
    API_URL_BLOG_POSTS,
    APP_NAME,
} from '@/core/application'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import { blogCategories, blogPostCreateSchema } from '@/common/models/blog'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'
import { H1 } from '@/components/data-display'
import { getBlogCategoryIRI } from '@/utils/iri/IRIUtils'

const AdminBlogPostCreate = () => {
    const [loading, setLoading] = useState(false)
    const { showNotification, NotificationComponent } = useNotification()

    const title = 'Create Blog Post'
    document.title = `${title} | Admin | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const { authHeader } = useContext(SecurityContext)
    const headers = authHeader()

    const formOptions = { resolver: yupResolver(blogPostCreateSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    useEffect(() => {
        if (loading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, loading, showLoading])

    const onSubmit = (data: any) => {
        const formData = {
            ...data,
            blogCategory: getBlogCategoryIRI(data.blogCategory),
        }

        setLoading(true)

        Axios.post(`${API_URL_BLOG_POSTS}`, formData, { headers })
            .then((response) => {
                setLoading(false)
                const $editUrl = `/admin/blog-posts/blog-post-edit/${response.data.blogPostId}`
                navigate($editUrl)
            })
            .catch((error) => {
                setLoading(false)
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while creating blog post',
                        'error',
                    )
                }
            })
    }

    return (
        <>
            <Container
                data-testid="admin-blog-post-create-content"
                maxWidth="md"
                component="main"
                sx={{ pt: 0, pb: 8 }}
            >
                <H1 variant="h3" data-testid="page-heading">
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
                                    htmlFor="title"
                                    data-testid="title-label"
                                >
                                    Title
                                </FormLabel>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 8 }}>
                                <FormInput
                                    data-testid="title"
                                    name="title"
                                    control={control}
                                    type="text"
                                    errors={errors}
                                    defaultValue=""
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
                                    data-testid="slug"
                                    name="slug"
                                    control={control}
                                    type="text"
                                    errors={errors}
                                    defaultValue=""
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
                                    data-testid="blog-category"
                                    name="blogCategory"
                                    label=""
                                    control={control}
                                    errors={errors}
                                    defaultValue=""
                                    sx={{ my: 0 }}
                                >
                                    {blogCategories.map((categoryOption) => (
                                        <MenuItem
                                            key={categoryOption.label}
                                            value={categoryOption.value}
                                        >
                                            {categoryOption.label}
                                        </MenuItem>
                                    ))}
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
                                    data-testid="content"
                                    name="content"
                                    control={control}
                                    type="text"
                                    errors={errors}
                                    defaultValue=""
                                    fullWidth
                                    multiline
                                    rows={10}
                                    sx={{ m: 0, p: 0 }}
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
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <NotificationComponent />
            </Container>
            <AdminFooter />
        </>
    )
}

export default AdminBlogPostCreate
