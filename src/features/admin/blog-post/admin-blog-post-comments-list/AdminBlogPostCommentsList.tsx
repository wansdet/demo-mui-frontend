import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Container, IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'

import {
    ApplicationContext,
    API_URL_BLOG_POST_COMMENTS,
    APP_NAME,
} from '@/core/application'
import { useApiDelete, useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import { blogPostCommentStatuses, IBlogPostComment } from '@/common/models/blog'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const AdminBlogPostCommentsList = () => {
    const [blogPostComments, setBlogPostComments] = useState<any[]>([])
    const [selectedBlogPostComment, setSelectedBlogPostComment] = useState<
        any | null
    >(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const title = 'Manage Blog Post Comments'
    document.title = `${title} | Admin | ${APP_NAME}`

    const {
        data: fetchedBlogPostComments,
        loading: getLoading,
        error: getError,
    } = useApiGet<IBlogPostComment[]>(API_URL_BLOG_POST_COMMENTS)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 100,
        page: 0,
    })

    useEffect(() => {
        if (fetchedBlogPostComments) {
            setBlogPostComments(
                fetchedBlogPostComments.map(
                    (blogPostComment: IBlogPostComment) => ({
                        blogPostCommentId: blogPostComment.blogPostCommentId,
                        comment: blogPostComment.comment,
                        status: blogPostComment.status,
                        createdBy: blogPostComment.createdBy,
                        createdAt: blogPostComment.createdAt,
                    })
                )
            )
        }
    }, [fetchedBlogPostComments])

    const {
        deleteData: deleteBlogPostComment,
        loading: deleteBlogPostCommentLoading,
        error: deleteBlogPostCommentError,
    } = useApiDelete(
        selectedBlogPostComment
            ? `${API_URL_BLOG_POST_COMMENTS}/${selectedBlogPostComment.blogPostCommentId}`
            : ''
    )

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    const handleShowBlogPostComment = (params: any, event: any) => {
        navigate(`/admin/blog-posts/blog-post-comment-show/${params.id}`)
    }

    const handleManageBlogPostComment = (params: any, event: any) => {
        navigate(`/admin/blog-posts/blog-post-comment-manage/${params.id}`)
    }

    const handleDeleteBlogPostComment = (params: any, event: any) => {
        setSelectedBlogPostComment(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteBlogPostComment = () => {
        setConfirmDialogOpen(false)

        if (selectedBlogPostComment) {
            deleteBlogPostComment()
                .then(() => {
                    showNotification(
                        'Blog post comment successfully deleted',
                        'success'
                    )
                    // Remove the deleted BlogPostComment from fetchedBlogPostComments
                    if (fetchedBlogPostComments) {
                        const updatedBlogPostComments =
                            fetchedBlogPostComments.filter(
                                (BlogPostComment: IBlogPostComment) =>
                                    BlogPostComment.blogPostCommentId !==
                                    selectedBlogPostComment.blogPostCommentId
                            )
                        setBlogPostComments(updatedBlogPostComments)
                    }
                })
                .catch((error) => {
                    showNotification(
                        'Error occurred while deleting Blog post comment',
                        'error'
                    )
                })
        } else {
            console.warn('No blog post comment selected.')
        }
    }

    const renderBlogPostCommentStatus = (props: any) => (
            props.value ? (
                <ChipStatus
                    id="status"
                    statusValue={props.value}
                    statuses={blogPostCommentStatuses}
                    size="small"
                />
            ) : (
                ''
            )
        )

    const renderBlogPostCommentActions = (props: any) => {
        return (
            <>
                <Tooltip
                    title={`View blog post comment ${props.row.blogPostCommentId}`}
                >
                    <IconButton
                        data-test="blog-post-comment-show-btn"
                        onClick={(event) =>
                            handleShowBlogPostComment(props, event)
                        }
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Manage blog post comment ${props.row.blogPostCommentId}`}
                >
                    <IconButton
                        data-test="blog-post-comment-manage-btn"
                        onClick={(event) =>
                            handleManageBlogPostComment(props, event)
                        }
                    >
                        <EditIcon aria-label="manage" color="primary" />
                    </IconButton>
                </Tooltip>
                {props.row.status === 'rejected' && (
                    <Tooltip
                        title={`Delete blog post comment ${props.row.blogPostCommentId}`}
                    >
                        <IconButton
                            data-test="blog-post-comment-delete-btn"
                            onClick={(event) =>
                                handleDeleteBlogPostComment(props, event)
                            }
                        >
                            <DeleteIcon aria-label="delete" color="error" />
                        </IconButton>
                    </Tooltip>
                )}
            </>
        )
    }

    const blogPostCommentsDataGridColumns: any = [
        { field: 'blogPostCommentId', headerName: 'ID', flex: 2 },
        { field: 'comment', headerName: 'Comment', flex: 3 },
        { field: 'createdBy', headerName: 'Author', flex: 2 },
        { field: 'createdAt', headerName: 'Created At', flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: renderBlogPostCommentStatus,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderBlogPostCommentActions,
        },
    ]

    return (
        <>
            <Container
                data-testid="admin-blog-post-comments-list-content"
                maxWidth="lg"
                component="main"
                sx={{ pt: 0, pb: 8 }}
            >
                <H1 variant="h3" className="page-heading" data-testid="manage-blog-post-comments-heading">
                    {title}
                </H1>
                <div data-test="data-grid" style={{ width: '100%' }}>
                    <DataGrid
                        data-testid="manage-blog-post-comments-data-table"
                        autoHeight
                        rows={blogPostComments}
                        columns={blogPostCommentsDataGridColumns}
                        pagination
                        getRowId={(row) => row.blogPostCommentId}
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
                    title="Delete Blog Post Comment"
                    open={confirmDialogOpen}
                    onConfirm={onDeleteBlogPostComment}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    {selectedBlogPostComment && (
                        <div>
                            <Typography
                                data-testid="delete-confirm-message"
                                variant="body1"
                                gutterBottom
                            >
                                Are you sure you want to delete this blog post
                                comment?
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-id"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>
                                    ID:{' '}
                                    {selectedBlogPostComment.blogPostCommentId}
                                </strong>
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-created-by"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>
                                    {selectedBlogPostComment.createdBy}
                                </strong>
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

export default AdminBlogPostCommentsList
