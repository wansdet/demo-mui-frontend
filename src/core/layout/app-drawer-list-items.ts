export interface IListItem {
    index: number
    label: string
    path: string
    icon: string
    testId: string
}

export const homeItems: IListItem[] = [
    {
        index: 0,
        label: 'Home',
        path: '/',
        icon: 'home',
        testId: 'admin-home-btn',
    },
]

export const userListItems: IListItem[] = [
    {
        index: 1,
        label: 'My Documents',
        path: '/admin/documents/documents-list',
        icon: 'list',
        testId: 'my-documents-btn',
    },
]

export const bloggerListItems: IListItem[] = [
    {
        index: 2,
        label: 'My Blog Posts',
        path: '/admin/blog-posts/blogger-blog-posts-list',
        icon: 'list',
        testId: 'blogger-blog-posts-btn',
    },
]

export const adminBlogListItems: IListItem[] = [
    {
        index: 3,
        label: 'Blog Posts',
        path: '/admin/blog-posts/blog-posts-list',
        icon: 'list',
        testId: 'admin-blog-posts-btn',
    },
    {
        index: 4,
        label: 'Blog Post Comments',
        path: '/admin/blog-posts/blog-post-comments-list',
        icon: 'list',
        testId: 'admin-blog-post-comments-btn',
    },
]

export const adminUsersListItems: IListItem[] = [
    {
        index: 5,
        label: 'Users',
        path: '/admin/users/users-list',
        icon: 'people',
        testId: 'admin-users-btn',
    },
]

export const adminReportsListItems: IListItem[] = [
    {
        index: 6,
        label: 'Monthly Blog Posts by Categories',
        path: '/admin/blog-posts/reports/blog-posts-monthly-categories',
        icon: 'bar-chart',
        testId: 'admin-blog-posts-monthly-categories-btn',
    },
    {
        index: 7,
        label: 'Monthly Blog Posts by Authors',
        path: '/admin/blog-posts/reports/blog-posts-monthly-authors',
        icon: 'bar-chart',
        testId: 'admin-blog-posts-monthly-authors-btn',
    },
    {
        index: 8,
        label: 'Annual Blog Posts by Categories',
        path: '/admin/blog-posts/reports/blog-posts-annual-categories',
        icon: 'pie-chart',
        testId: 'admin-blog-posts-annual-categories-btn',
    },
    {
        index: 9,
        label: 'Annual Blog Posts by Authors',
        path: '/admin/blog-posts/reports/blog-posts-annual-authors',
        icon: 'pie-chart',
        testId: 'admin-blog-posts-annual-authors-btn',
    },
]
