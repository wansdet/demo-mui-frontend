import { IOption, IStatus } from '@/common'

export const genderOptions: IOption[] = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
]

export const userRoles: IOption[] = [
    { value: 'ROLE_ADMIN', label: 'Admin' },
    { value: 'ROLE_USER', label: 'User' },
    { value: 'ROLE_EDITOR', label: 'Editor' },
    { value: 'ROLE_MODERATOR', label: 'Moderator' },
    { value: 'ROLE_BLOG_POST_AUTHOR', label: 'BlogPost Author' },
    { value: 'ROLE_FINANCE', label: 'Finance' },
    { value: 'ROLE_SALES_MANAGER', label: 'Sales Manager' },
    { value: 'ROLE_SALESPERSON', label: 'Salesperson' },
]

export const userStatuses: IStatus[] = [
    { value: 'pending', label: 'Pending', color: 'info' },
    { value: 'active', label: 'Active', color: 'success' },
    { value: 'on_hold', label: 'On Hold', color: 'warning' },
    { value: 'suspended', label: 'Suspended', color: 'warning' },
]
