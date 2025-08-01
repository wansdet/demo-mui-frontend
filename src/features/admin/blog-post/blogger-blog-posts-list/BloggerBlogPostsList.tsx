import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
    Button,
    Container,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PublishIcon from '@mui/icons-material/Publish'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'

import {
    ApplicationContext,
    API_URL_BLOG_POSTS,
    API_URL_BLOG_POSTS_AUTHOR,
    API_URL_BLOG_POSTS_EXPORT_BLOGGER,
    APP_NAME,
} from '@/core/application'
import { useApiDelete, useApiGet, useApiPost } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import { blogPostStatuses, IBlogPost } from '@/common/models/blog'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const BloggerBlogPostsList = () => {
    const [blogPosts, setBlogPosts] = useState<any[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [selectedBlogPost, setSelectedBlogPost] = useState<any | null>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const title = 'My Blog Posts'
    document.title = `${title} | Admin | ${APP_NAME}`

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 100,
        page: 0,
    })

    const {
        data: fetchedBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_POSTS_AUTHOR)

    const {
        postData: postExport,
        loading: postExportLoading,
        error: postExportError,
    } = useApiPost<any>(API_URL_BLOG_POSTS_EXPORT_BLOGGER)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    useEffect(() => {
        if (fetchedBlogPosts) {
            setBlogPosts(
                fetchedBlogPosts.map((blogPost: IBlogPost) => ({
                    blogPostId: blogPost.blogPostId,
                    title: blogPost.title,
                    content: blogPost.content,
                    status: blogPost.status,
                    createdBy: blogPost.createdBy,
                    createdAt: blogPost.createdAt,
                }))
            )
        }
    }, [fetchedBlogPosts])

    const {
        deleteData: deleteBlogPost,
        loading: deleteBlogPostLoading,
        error: deleteBlogPostError,
    } = useApiDelete(
        selectedBlogPost
            ? `${API_URL_BLOG_POSTS}/${selectedBlogPost.blogPostId}`
            : ''
    )

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    useEffect(() => {
        if (postExportLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [hideLoading, postExportLoading, showLoading])

    const handleShowBlogPost = (params: any, event: any) => {
        navigate(`/admin/blog-posts/blog-post-show/${params.id}`)
    }

    const handleEditBlogPost = (params: any, event: any) => {
        navigate(`/admin/blog-posts/blog-post-edit/${params.id}`)
    }

    const handleManageBlogPost = (params: any, event: any) => {
        navigate(`/admin/blog-posts/blog-post-manage/${params.id}`)
    }

    const handleDeleteBlogPost = (params: any, event: any) => {
        setSelectedBlogPost(params.row)
        setConfirmDialogOpen(true)
    }

    const handleBlogPostsExport = () => {
        const data = {}
        postExport(data)
            .then(() => {
                showNotification('Blog posts successfully exported', 'success')
            })
            .catch((error) => {
                showNotification(
                    'Error occurred while exporting blog posts',
                    'error'
                )
            })
    }

    const onDeleteBlogPost = () => {
        setConfirmDialogOpen(false)

        if (selectedBlogPost) {
            deleteBlogPost()
                .then(() => {
                    showNotification(
                        'Blog post successfully deleted',
                        'success'
                    )
                    // Remove the deleted BlogPost from fetchedBlogPosts
                    if (fetchedBlogPosts) {
                        const updatedBlogPosts = fetchedBlogPosts.filter(
                            (BlogPost: IBlogPost) =>
                                BlogPost.blogPostId !==
                                selectedBlogPost.blogPostId
                        )
                        setBlogPosts(updatedBlogPosts)
                    }
                })
                .catch((error) => {
                    showNotification(
                        'Error occurred while deleting blog post',
                        'error'
                    )
                })
        } else {
            console.warn('No blog post selected.')
        }
    }

    const renderBlogPostStatus = (props: any) => {
        return (
            props.value ? (
                <ChipStatus
                    id="status"
                    statusValue={props.value}
                    statuses={blogPostStatuses}
                    size="small"
                />
            ) : (
                ''
            )
        )
    }

    const renderBlogPostActions = (props: any) => {
        return (
            <>
                <Tooltip title={`View blog post ${props.row.blogPostId}`}>
                    <IconButton
                        data-test="blog-post-show-btn"
                        onClick={(event) => handleShowBlogPost(props, event)}
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                {(props.row.status === 'draft' ||
                    props.row.status === 'rejected') && (
                    <>
                        <Tooltip
                            title={`Edit blog post ${props.row.blogPostId}`}
                        >
                            <IconButton
                                data-test="blog-post-edit-btn"
                                onClick={(event) =>
                                    handleEditBlogPost(props, event)
                                }
                            >
                                <EditIcon aria-label="edit" color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={`Delete blog post ${props.row.blogPostId}`}
                        >
                            <IconButton
                                data-test="blog-post-delete-btn"
                                onClick={(event) =>
                                    handleDeleteBlogPost(props, event)
                                }
                            >
                                <DeleteIcon aria-label="delete" color="error" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </>
        )
    }

    const blogPostsDataGridColumns: any = [
        { field: 'blogPostId', headerName: 'ID', flex: 2 },
        { field: 'title', headerName: 'Title', flex: 2 },
        { field: 'createdBy', headerName: 'Author', flex: 2 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: renderBlogPostStatus,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderBlogPostActions,
        },
    ]

    return (
        <>
            <Container
                data-testid="my-blog-posts-list-content"
                maxWidth="lg"
                component="main"
                sx={{ pt: 0, pb: 8 }}
            >
                <H1 variant="h3" className="page-heading" data-testid="my-blog-posts-heading">
                    {title}
                </H1>
                <div>
                    <Button
                        id="new-blog-post-btn"
                        variant="contained"
                        onClick={() =>
                            navigate('/admin/blog-posts/blog-post-create')
                        }
                        sx={{ mr: 1 }}
                    >
                        New Blog Post
                    </Button>
                    <Button
                        id="my-blog-posts-export-btn"
                        variant="contained"
                        onClick={() => handleBlogPostsExport()}
                    >
                        <PublishIcon />
                        Export
                    </Button>
                </div>
                <div data-test="data-grid" style={{ width: '100%' }}>
                    <DataGrid
                        data-testid="my-blog-posts-data-table"
                        autoHeight
                        rows={blogPosts}
                        columns={blogPostsDataGridColumns}
                        pagination
                        getRowId={(row) => row.blogPostId}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={(model: GridPaginationModel) => {
                            setPaginationModel(model)
                        }}
                        sx={{ mt: 6, backgroundColor: 'background.paper' }}
                    />
                </div>
                <ConfirmDialog
                    id="delete-confirm-dialog"
                    title="Delete Blog Post"
                    open={confirmDialogOpen}
                    onConfirm={onDeleteBlogPost}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    {selectedBlogPost && (
                        <div>
                            <Typography
                                data-test="delete-confirm-message"
                                variant="body1"
                                gutterBottom
                            >
                                Are you sure you want to delete this blog post?
                            </Typography>
                            <Typography
                                data-test="delete-confirm-id"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>
                                    ID: {selectedBlogPost.blogPostId}
                                </strong>
                            </Typography>
                            <Typography
                                data-test="delete-confirm-created-by"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>{selectedBlogPost.createdBy}</strong>
                            </Typography>
                        </div>
                    )}
                </ConfirmDialog>
                <NotificationComponent />
            </Container>
            <AdminFooter />
        </>
    )
}

export default BloggerBlogPostsList
