import React from 'react'
import { Route, Routes } from 'react-router'
import { Box, CssBaseline, ThemeOptions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'

import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ApplicationProvider } from '@/core/application'
import { AppDrawer, DrawerHeader } from '@/core/layout'
import { SecurityProvider, ProtectedRoutes } from '@/core/security'
import Home from '@/features/home/Home'
import Faq from '@/features/faq/Faq'
import ContactUs from '@/features/contact-us/ContactUs'
import Welcome from '@/features/welcome/Welcome'
import { AdminUserEdit, AdminUserShow, AdminUsersList } from '@/features/admin/user'
import {
    BlogPostsAnnualAuthors,
    BlogPostsAnnualCategories,
    BlogPostsMonthlyAuthors,
    BlogPostsMonthlyCategories
} from '@/features/admin/blog-post/reports'
import FeaturedBlogs from '@/features/blog/featured-blogs/FeaturedBlogs'
import BlogPostsList from '@/features/blog/blog-posts-list/BlogPostsList'
import SignUp from './features/user/sign-up/SignUp'
import { SignIn, SignOut } from './features/user'
import MyAccount from './features/user/my-account/MyAccount'

import {
    AdminBlogPostCommentEdit,
    AdminBlogPostCommentManage,
    AdminBlogPostCommentShow,
    AdminBlogPostCommentsList,
    AdminBlogPostCreate,
    AdminBlogPostEdit,
    AdminBlogPostManage,
    AdminBlogPostShow,
    AdminBlogPostsList,
    BloggerBlogPostsList,
} from './features/admin/blog-post'
import BlogPostShow from './features/blog/blog-post-show/BlogPostShow'
import { DocumentsList } from './features/admin/document'

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        leadParagraph: true
    }
}

interface ExtendedTypographyOptions extends TypographyOptions {
    leadParagraph: React.CSSProperties
}

const theme = createTheme({
    typography: {
        leadParagraph: {
            fontSize: '1.5rem',
            fontStyle: 'italic',
        },
    } as ExtendedTypographyOptions,
} as ThemeOptions)

const App = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <SecurityProvider>
                <ThemeProvider theme={theme}>
                    <ApplicationProvider>
                        <CssBaseline />
                        <div className="App">
                            <Box
                                sx={{
                                    display: 'flex',
                                    backgroundColor: 'grey.50',
                                    flex: '1 1 100%',
                                }}
                            >
                                <AppDrawer>
                                    <Box
                                        component="main"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minHeight: '100vh',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <DrawerHeader />
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<Home />}
                                            />
                                            <Route
                                                path="/blog"
                                                element={<FeaturedBlogs />}
                                            />
                                            <Route
                                                path="/blog/:id"
                                                element={<BlogPostShow />}
                                            />
                                            <Route
                                                path="/blog-posts"
                                                element={<BlogPostsList />}
                                            />
                                            <Route
                                                path="/frequently-asked-questions"
                                                element={<Faq />}
                                            />
                                            <Route
                                                path="/contact-us"
                                                element={<ContactUs />}
                                            />
                                            <Route
                                                path="/sign-in"
                                                element={<SignIn />}
                                            />
                                            <Route
                                                path="/sign-out"
                                                element={<SignOut />}
                                            />
                                            <Route
                                                path="/sign-up"
                                                element={<SignUp />}
                                            />
                                            <Route
                                                path="/welcome"
                                                element={<Welcome />}
                                            />

                                            <Route
                                                element={<ProtectedRoutes />}
                                            >
                                                <Route
                                                    path="/my-account"
                                                    element={<MyAccount />}
                                                />

                                                <Route
                                                    path="/admin/documents/documents-list"
                                                    element={<DocumentsList />}
                                                />

                                                <Route
                                                    path="/admin/blog-posts/blogger-blog-posts-list"
                                                    element={
                                                        <BloggerBlogPostsList />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-posts-list"
                                                    element={
                                                        <AdminBlogPostsList />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-create"
                                                    element={
                                                        <AdminBlogPostCreate />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-show/:id"
                                                    element={
                                                        <AdminBlogPostShow />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-edit/:id"
                                                    element={
                                                        <AdminBlogPostEdit />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-manage/:id"
                                                    element={
                                                        <AdminBlogPostManage />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-comments-list"
                                                    element={
                                                        <AdminBlogPostCommentsList />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-comment-show/:id"
                                                    element={
                                                        <AdminBlogPostCommentShow />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-comment-edit/:id"
                                                    element={
                                                        <AdminBlogPostCommentEdit />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/blog-post-comment-manage/:id"
                                                    element={
                                                        <AdminBlogPostCommentManage />
                                                    }
                                                />

                                                <Route
                                                    path="/admin/users/users-list"
                                                    element={<AdminUsersList />}
                                                />
                                                <Route
                                                    path="/admin/users/user-show/:id"
                                                    element={<AdminUserShow />}
                                                />
                                                <Route
                                                    path="/admin/users/user-edit/:id"
                                                    element={<AdminUserEdit />}
                                                />

                                                <Route
                                                    path="/admin/blog-posts/reports/blog-posts-monthly-categories"
                                                    element={
                                                        <BlogPostsMonthlyCategories />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/reports/blog-posts-monthly-authors"
                                                    element={
                                                        <BlogPostsMonthlyAuthors />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/reports/blog-posts-annual-categories"
                                                    element={
                                                        <BlogPostsAnnualCategories />
                                                    }
                                                />
                                                <Route
                                                    path="/admin/blog-posts/reports/blog-posts-annual-authors"
                                                    element={
                                                        <BlogPostsAnnualAuthors />
                                                    }
                                                />
                                            </Route>
                                        </Routes>
                                    </Box>
                                </AppDrawer>
                            </Box>
                        </div>
                    </ApplicationProvider>
                </ThemeProvider>
            </SecurityProvider>
    )
}

export default App
