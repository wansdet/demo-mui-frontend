import * as yup from 'yup'

export const blogPostCreateSchema = yup.object().shape({
    title: yup
        .string()
        .max(100, 'Title is required and must be less than 100 characters')
        .required('Title is required and must be less than 100 characters'),
    slug: yup
        .string()
        .max(255, 'Slug is required and must be less than 255 characters')
        .required('Slug is required and must be less than 255 characters'),
    content: yup
        .string()
        .max(4000)
        .required(
            'Valid Content is required and must be less than 4000 characters'
        ),
    blogCategory: yup.string().required('Blog category is required'),
})

export const blogPostUpdateSchema = yup.object().shape({
    title: yup
        .string()
        .max(100, 'Title is required and must be less than 100 characters')
        .required('Title is required and must be less than 100 characters'),
    slug: yup
        .string()
        .max(255, 'Slug is required and must be less than 255 characters')
        .required('Slug is required and must be less than 255 characters'),
    content: yup
        .string()
        .max(4000)
        .required(
            'Valid Content is required and must be less than 4000 characters'
        ),
    blogCategory: yup.string().required('Blog category is required'),
    status: yup.string().required('Status is required'),
})

export const blogPostCommentCreateSchema = yup.object().shape({
    comment: yup
        .string()
        .max(255)
        .required('Comment is required and must be less than 255 characters'),
})

export const blogPostCommentUpdateSchema = yup.object().shape({
    comment: yup
        .string()
        .max(255)
        .required('Comment is required and must be less than 255 characters'),
    rating: yup
        .number()
        .min(1, 'Rating must be between 1 and 10')
        .max(10, 'Rating must be between 1 and 10')
        .notRequired(),
    status: yup.string().required('Status is required'),
})
