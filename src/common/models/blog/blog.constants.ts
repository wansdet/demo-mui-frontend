import { IStatus, IOption } from '@/common'

export const blogCategories: IOption[] = [
    { value: 'COOKERY', label: 'Cookery' },
    { value: 'FASHION', label: 'Fashion' },
    { value: 'FOOD', label: 'Food' },
    { value: 'HOME', label: 'Home' },
    { value: 'LEISURE', label: 'Leisure' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'TRANSPORT', label: 'Transport' },
    { value: 'TRAVEL', label: 'Travel' },
]

export const blogPostStatuses: IStatus[] = [
    { value: 'draft', label: 'Draft', color: 'warning' },
    { value: 'submitted', label: 'Submitted', color: 'warning' },
    { value: 'rejected', label: 'Rejected', color: 'warning' },
    { value: 'published', label: 'Published', color: 'success' },
    { value: 'archived', label: 'Archived', color: 'error' },
]

export const blogPostTransitions: IStatus[] = [
    { value: 'draft', label: 'Draft', color: 'warning' },
    { value: 'submit', label: 'Submit', color: 'warning' },
    { value: 'reject', label: 'Reject', color: 'warning' },
    { value: 'publish', label: 'Publish', color: 'success' },
    { value: 'archive', label: 'Archive', color: 'error' },
]

export const blogPostCommentStatuses: IStatus[] = [
    { value: 'rejected', label: 'Rejected', color: 'warning' },
    { value: 'published', label: 'Published', color: 'success' },
]

export const blogPostCommentTransitions: IStatus[] = [
    { value: 'reject', label: 'Reject', color: 'warning' },
]
