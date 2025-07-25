import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Container, IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'

import { ApplicationContext, API_URL_USERS, APP_NAME } from '@/core/application'
import { useApiGet, useApiDelete } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import { IUser, userStatuses } from '@/common/models/user'
import { ChipStatus, H1 } from '@/components/data-display'
import { ConfirmDialog } from '@/components/utils'

const AdminUsersList = () => {
    const [users, setUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const {
        data: fetchedUsers,
        loading: getLoading,
        error: getError,
    } = useApiGet<IUser[]>(API_URL_USERS)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 100,
        page: 0,
    })

    const title = 'Manage Users'
    document.title = `${title} | Admin | ${APP_NAME}`

    useEffect(() => {
        if (fetchedUsers) {
            // console.log('fetchedUsers:', fetchedUsers);
            setUsers(
                fetchedUsers.map((user: IUser) => ({
                    userId: user.userId,
                    username: user.displayName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    jobTitle: user.jobTitle,
                    status: user.status,
                }))
            )
        }
    }, [fetchedUsers])

    const {
        deleteData: deleteUser,
        loading: deleteUserLoading,
        error: deleteUserError,
    } = useApiDelete(
        selectedUser ? `${API_URL_USERS}/${selectedUser.userId}` : ''
    )

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    const handleShowUser = (params: any, event: any) => {
        navigate(`/admin/users/user-show/${params.id}`)
    }

    const handleEditUser = (params: any, event: any) => {
        navigate(`/admin/users/user-edit/${params.id}`)
    }

    const handleDeleteUser = (params: any, event: any) => {
        setSelectedUser(params.row)
        setConfirmDialogOpen(true)
    }

    const onDeleteUser = () => {
        setConfirmDialogOpen(false)

        if (selectedUser) {
            deleteUser()
                .then(() => {
                    showNotification('User successfully deleted', 'success')
                    // Remove the deleted user from fetchedUsers
                    if (fetchedUsers) {
                        const updatedUsers = fetchedUsers.filter(
                            (user: IUser) => user.userId !== selectedUser.userId
                        )
                        setUsers(updatedUsers)
                    }
                })
                .catch((error) => {
                    showNotification(
                        'Error occurred while deleting user',
                        'error'
                    )
                    // console.error('Error occurred while deleting user', error)
                })
        } else {
            console.warn('No user selected.')
        }
    }

    const renderUserStatus = (props: any) => {
        return (
            props.value ? (
                <ChipStatus
                    id="status"
                    statusValue={props.value}
                    statuses={userStatuses}
                    size="small"
                />
            ) : (
                ''
            )
        )
    }

    const renderUserActions = (props: any) => {
        return (
            <>
                <Tooltip
                    title={`Show user ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        data-test="user-show-btn"
                        onClick={(event) => handleShowUser(props, event)}
                    >
                        <VisibilityIcon aria-label="show" color="success" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title={`Edit user ${props.row.firstName} ${props.row.lastName}`}
                >
                    <IconButton
                        data-test="user-manage-btn"
                        onClick={(event) => handleEditUser(props, event)}
                    >
                        <EditIcon aria-label="manage" color="primary" />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    const usersDataGridColumns: any = [
        { field: 'userId', headerName: 'ID', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 2 },
        { field: 'firstName', headerName: 'First name', flex: 2 },
        { field: 'lastName', headerName: 'Last name', flex: 2 },
        { field: 'jobTitle', headerName: 'Job title', flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: renderUserStatus,
        },
        {
            field: ' ',
            headerName: 'Actions',
            flex: 2,
            renderCell: renderUserActions,
            align: 'center',
        },
    ]

    return (
        <>
            <Container
                data-testid="admin-users-list-content"
                maxWidth="lg"
                component="main"
                sx={{ pt: 8, pb: 8 }}
            >
                <H1 variant="h3" className="page-heading" data-testid="page-heading">
                    {title}
                </H1>
                <div data-test="data-grid" style={{ width: '100%' }}>
                    <DataGrid
                        data-testid="manage-users-data-table"
                        autoHeight
                        rows={users}
                        columns={usersDataGridColumns}
                        pagination
                        getRowId={(row) => row.userId}
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
                    title="Delete User"
                    open={confirmDialogOpen}
                    onConfirm={onDeleteUser}
                    onClose={() => setConfirmDialogOpen(false)}
                >
                    {selectedUser && (
                        <div>
                            <Typography
                                data-testid="delete-confirm-message"
                                variant="body1"
                                gutterBottom
                            >
                                Are you sure you want to delete this user?
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-id"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>ID: {selectedUser.userId}</strong>
                            </Typography>
                            <Typography
                                data-testid="delete-confirm-name"
                                variant="body1"
                                gutterBottom
                            >
                                <strong>
                                    {selectedUser.firstName}{' '}
                                    {selectedUser.lastName}
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

export default AdminUsersList
