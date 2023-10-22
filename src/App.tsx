import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import ContactUs from '@/features/contact-us/ContactUs'
import Faq from '@/features/faq/Faq'
import { MyAccount } from '@/features/user/my-account'
import { SignIn, SignOut, SignUp } from '@/features/user'
import Welcome from '@/features/welcome/Welcome'
import { BlogPostShow, BlogPostsList, FeaturedBlogs } from '@/features/blog'
import {
    AdminBlogPostsList,
    AdminBlogPostShow,
    AdminBlogPostCreate,
    AdminBlogPostEdit,
    AdminBlogPostManage,
    AdminBlogPostCommentsList,
    AdminBlogPostCommentEdit,
    AdminBlogPostCommentManage,
    AdminBlogPostCommentShow,
    BloggerBlogPostsList,
} from '@/features/admin/blog-post'
import {
    BlogPostsAnnualAuthors,
    BlogPostsAnnualCategories,
    BlogPostsMonthlyAuthors,
    BlogPostsMonthlyCategories,
} from '@/features/admin/blog-post/reports'
import {
    AdminUserEdit,
    AdminUserShow,
    AdminUsersList,
} from '@/features/admin/user'
import { DocumentsList } from '@/features/admin/document'

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

function App() {
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
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
                                                path={'/blog'}
                                                element={<FeaturedBlogs />}
                                            />
                                            <Route
                                                path={'/blog/:id'}
                                                element={<BlogPostShow />}
                                            />
                                            <Route
                                                path={'/blog-posts'}
                                                element={<BlogPostsList />}
                                            />
                                            <Route
                                                path={
                                                    '/frequently-asked-questions'
                                                }
                                                element={<Faq />}
                                            />
                                            <Route
                                                path={'/contact-us'}
                                                element={<ContactUs />}
                                            />
                                            <Route
                                                path={'/sign-in'}
                                                element={<SignIn />}
                                            />
                                            <Route
                                                path={'/sign-out'}
                                                element={<SignOut />}
                                            />
                                            <Route
                                                path={'/sign-up'}
                                                element={<SignUp />}
                                            />
                                            <Route
                                                path={'/welcome'}
                                                element={<Welcome />}
                                            />

                                            <Route
                                                element={<ProtectedRoutes />}
                                            >
                                                <Route
                                                    path={'/my-account'}
                                                    element={<MyAccount />}
                                                />

                                                <Route
                                                    path={
                                                        '/admin/documents/documents-list'
                                                    }
                                                    element={<DocumentsList />}
                                                />

                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blogger-blog-posts-list'
                                                    }
                                                    element={
                                                        <BloggerBlogPostsList />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-posts-list'
                                                    }
                                                    element={
                                                        <AdminBlogPostsList />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-create'
                                                    }
                                                    element={
                                                        <AdminBlogPostCreate />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-show/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostShow />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-edit/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostEdit />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-manage/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostManage />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-comments-list'
                                                    }
                                                    element={
                                                        <AdminBlogPostCommentsList />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-comment-show/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostCommentShow />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-comment-edit/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostCommentEdit />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/blog-post-comment-manage/:id'
                                                    }
                                                    element={
                                                        <AdminBlogPostCommentManage />
                                                    }
                                                />

                                                <Route
                                                    path={
                                                        '/admin/users/users-list'
                                                    }
                                                    element={<AdminUsersList />}
                                                />
                                                <Route
                                                    path={
                                                        '/admin/users/user-show/:id'
                                                    }
                                                    element={<AdminUserShow />}
                                                />
                                                <Route
                                                    path={
                                                        '/admin/users/user-edit/:id'
                                                    }
                                                    element={<AdminUserEdit />}
                                                />

                                                <Route
                                                    path={
                                                        '/admin/blog-posts/reports/blog-posts-monthly-categories'
                                                    }
                                                    element={
                                                        <BlogPostsMonthlyCategories />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/reports/blog-posts-monthly-authors'
                                                    }
                                                    element={
                                                        <BlogPostsMonthlyAuthors />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/reports/blog-posts-annual-categories'
                                                    }
                                                    element={
                                                        <BlogPostsAnnualCategories />
                                                    }
                                                />
                                                <Route
                                                    path={
                                                        '/admin/blog-posts/reports/blog-posts-annual-authors'
                                                    }
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
        </React.Fragment>
    )
}

export default App
