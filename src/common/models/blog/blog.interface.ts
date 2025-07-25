import { IUserPublic } from '@/common/models/user'

export interface IBlogCategory {
    blogCategoryCode: string
    blogCategoryName: string
    active: boolean
    sortOrder: number
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
}

export interface IBlogPostComment {
    blogPostCommentId: string
    comment: string
    rating: number
    status: string
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
    author: IUserPublic
}

export interface IBlogPostCommentUpdate extends IBlogPostComment {
    id: number
}

export interface IBlogPostImage {
    id: number
    title: string
    filename?: string
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
}

export interface IBlogPost {
    blogPostId: string
    title?: string
    content?: string
    status: string
    slug?: string
    tags?: string
    featured?: number
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
    blogCategory: IBlogCategory
    author?: IUserPublic
    blogPostComments?: IBlogPostComment[]
    blogPostImages?: IBlogPostImage[]
}

export interface IBlogPostTransition {
    remarks: string
}

export interface IBlogPostStatusUpdate extends IBlogPost {
    title: string
    content: string
    status: string
    slug: string
    tags: string
    featured?: number
    createdAt: Date
    createdBy: string
    updatedAt?: Date
    updatedBy?: string
    blogCategory: IBlogCategory
    author: IUserPublic
    blogPostImages?: IBlogPostImage[]
}

export interface IBlogPostAuthor {
    author: string
    blogPostCount: number
}

export interface IAnnualBlogPostAuthors {
    blogPostAuthors: IBlogPostAuthor[]
    year: number
}

export interface IMonthlyBlogPostAuthor {
    blogPostAuthors: IBlogPostAuthor
    month: number
    year: number
}

export interface IBlogPostCategory {
    blogCategoryName: string
    blogPostCount: number
}

export interface IAnnualBlogPostCategories {
    blogPostCategories: IBlogPostCategory[]
    year: number
}

export interface IMonthlyBlogPostCategory {
    blogPostCategories: IBlogPostCategory[]
    month: number
    year: number
}
